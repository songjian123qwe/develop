import React, {Component} from 'react';
import './index.less';
import {
    getBusinessInfo,
    promptBox,
    toast,
    cacheTools,
    cardCache
} from 'nc-lightapp-front';
import QueryAction from "./functions/QueryAction";
import getAllpks from "../../../../hrorg/functions/getAllpks";

const tableId = 'poststd_list';
let {setDefData,getDefData} = cardCache;

class TableInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            json: this.props.json
        };
    }

    componentWillReceiveProps(nextProps) {
        let thisjson = JSON.stringify(this.props.json);
        let nextjson = JSON.stringify(nextProps.json);
        if(thisjson !== nextjson){
            this.setState({
                json: nextProps.json
            })
        }
        if (nextProps.showDisable !== this.props.showDisable) {
            this.props.showDisable = nextProps.showDisable;
            this.getPostInfo();
        }
    }

    /**
     * 获取列表信息
     * @param cb
     */
    getPostInfo(cb) {
        let pk_org, showSealDataFlag, queryCondition, uiState;
        pk_org = this.props.pk_org;
        showSealDataFlag = this.props.showDisable;
        queryCondition = this.props.searchModalValue;
        if(!queryCondition){
            queryCondition = this.props.search.getQueryInfo("qt", false);
        }
        uiState = 'list';
        //清空 表格
        this.props.treeTableManyCol.emptyAllData('poststd_list');
        // 清空 缓存
        setDefData('hrjf', 'poststd', null);
        // 初始化按钮状态
        this.props.updateButtonStatus();
        QueryAction(pk_org, queryCondition, showSealDataFlag, uiState).then(res => {
            this.querySucc(res,cb);
        })
    }

    /**
     * 查询列表成功函数
     * @param res
     * @param cb
     */
    querySucc(res,cb){
        if (cb && typeof cb === 'function') {
            cb();
        }
        if (!res.data) return;
        //后台返回的是表格的数据  需要构造成树状表的数据
        let rows = res.data.dataResult.poststd_list.rows;
        rows.map(item => {

            // 完全继承来源显示 是/否
            item.values.inheritflag.display = item.values.inheritflag.value ? this.state.json['jf6005-000337'] : this.state.json['jf6005-000338']; //"是" : "否";

            // 添加refpk  ，pid 生成树状表 用
            if (!item.values.hasOwnProperty('refpk')) {
                item.values.refpk = item.values.pk_post;
            }
            /*if (!item.values.hasOwnProperty('pid')) {
                item.values.pid = item.values.pk_grade_source;
            }*/
        });
        let datas = this.props.treeTableManyCol.createNewData(rows);

        let tableData2 = [];
        datas.forEach(item=>{
            let temp = {children: []};
            for (let key in item) {
                if (key !== 'children') {
                    temp[key] = item[key]
                }
            }
            tableData2.push(temp)
        })
        //为了打印，传所有主键值
        this.props.treeTableManyCol.initTreeTableData(tableId, tableData2, 'pk_post', false);
        //为了打印，传所有主键值
        let allpkpost = getAllpks(datas, 'pk_post');
        // 设置缓存数据 详情页分页用   区分业务单元版本信息分页
        setDefData('hrjf', 'poststd.pagination.allpks', allpkpost);
        cacheTools.set('allpks', allpkpost);
    }

    updateState(data, callback = () => {
    }) {
        this.setState(data, callback)
    }

    /**
     * 单击表格
     */
    onRowClick(record, index, e) {
        // 保存 record 新增用
        setDefData('hrjf', 'poststd', record);
        let pk_post = null;
        let postcode = null; // 岗位编码  附件已用
        let enablestate = null; // 2：启用

        let flag = false;

        // 选中列表时，设置数据
        if (!record.checked) {
            flag = record.values.postFlag.value;
            pk_post = record.values.pk_post.value;
            postcode = record.values.postcode.value; // 岗位编码  附件已用
            enablestate = record.values.enablestate.value === '2'; // 2：启用
        }

        // 如果不是岗位，则下面的所有按钮皆不能用
        this.props.button.setButtonDisabled({
            edit: !flag,
            delete: !flag,
            copy: !flag,
            enable: !flag || enablestate,//  启用,
            disable: !flag || !enablestate,//  停用
            file: !pk_post, //文件管理
            print: !pk_post, //打印
            output: !postcode //打印
        });
        this.props.updateState({
            pk_post,
            postcode
        })
    }

    /**
     * 右表双击
     */
    onRowDoubleClick(record, index, e) {
        // 保存 record 新增用
        setDefData('hrjf', 'poststd', record);
        let pk_post = record.values.pk_post.value || null;
        let postFlag = record.values.postFlag.value;
        let postcode = record.values.postcode.value; // 岗位编码  附件已用
        if (!pk_post) {

            return
        }

        this.props.updateState({
            isDetail: true,
            pk_post,
            postFlag,
            postcode
        }, () => {
            //当isDetail且pk_post改变时 detail组件自动请求详情页数据
            this.props.showDetail();
            this.props.updateButtonStatus();
        })
    }

    expandEve(record) {
        if (record.hasOwnProperty('children') && record.children.length < 1) {
            let children = getDefData('org_table_tree_orglist', record.values.refpk.value);
            if (children) {
                children.forEach(item => {
                    item.children = [];
                });
                let dom = document.querySelectorAll(".table-box .u-table-scroll colgroup[id='bee-table-colgroup']");
                for (let i = 0, len = dom.length; i < len; i++) {
                    let colDom = dom[i].childNodes.item(0);
                    let colWidth = colDom.style.width;
                    colWidth = colWidth.substring(0, colWidth.length - 2);
                    colDom.style.width = colWidth - 0 + 15 + 'px';
                }
                this.props.treeTableManyCol.setChildNode(tableId, children, record);
            }
        }
        // this.props.treeTableManyCol.openRow( orglist, record.key )
    }

    collapandEve(record) {
        // this.props.treeTableManyCol.closeRow(orglist, item.key);
        this.props.treeTableManyCol.setChildNode(tableId, [], record);
    }

    render() {
        const {treeTableManyCol} = this.props;
        let {treeTableCol} = treeTableManyCol;
        const {} = this.state;
        return (
            <div className="table-info"
                 style={{display:this.props.isDetail?'none':''}}>
                <div className={'table-box'}>
                    {treeTableCol(tableId, {
                        async: true,    //数据同步加载为false,异步加载为true
                        showCheckBox: true,
                        checkboxChange: this.onRowClick.bind(this), //新增勾选onChange事件
                        checkedType: 'radio',
                        showIndex: false,
                        // ncOnRowDoubleClick: this.onRowDoubleClick.bind(this),
                        // 没有此参数 defaultExpandAll: true,   //初始化展开所有节点  ，默认参数为false,不展开
                        scrollConfig: {x: true, y: 'calc(100vh - 106px)'},
                        expandEve: this.expandEve.bind(this),//异步执行，点击加号展开子节点
                        collapandEve: this.collapandEve.bind(this),//异步执行，点击加号收起子节点
                    })}
                </div>
            </div>
        );
    }
}

export default TableInfo;
