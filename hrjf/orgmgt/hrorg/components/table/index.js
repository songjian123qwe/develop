/**
 * 业务单元版本信息
 */
import React, {Component} from 'react';

import './index.less';

import {
    base,
    cardCache,
    deepClone
} from 'nc-lightapp-front';
import getMainTableData from "../../functions/getMainTableData";
import paramMap from "../../functions/paramMap";
import getAllpks from "../../functions/getAllpks";

let {setDefData, getDefData} = cardCache;
const orglist = 'orglist';

class TableModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            json: props.json,
            tableHeight: null, // table高度
        };
    }

    componentWillReceiveProps(nextprops) {
        let nextjson = JSON.stringify(nextprops.json);
        let thisjson = JSON.stringify(this.props.json);
        if (nextjson !== thisjson) {
            this.setState({
                json: nextprops.json,
            })
        }
    }

    componentDidMount() {
        //监听 窗口的高度变化 赋值给table
        this.onWindowResize();
    }


    /**
     * 检测屏幕高度变化，修改table高度
     */
    onWindowResize = () => {
        this.setState({
            tableHeight: window.innerHeight - 106 + 'px'
        })
    };

    /**
     * 选中树表的内容
     * (record 的状态是改变前的状态)
     */
    checkboxChange(record, index, e) {
        let checkFlag = !record.checked;

        // 未启用=1,已启用=2,已停用=3
        let enabled = record.values.enablestate && record.values.enablestate.value;
        // 设置按钮禁用状态 可用
        this.props.button.setButtonDisabled({
            enable: !checkFlag || enabled === '2', // 启用
            disable: !checkFlag || enabled === '3', // 停用
            orgver: !checkFlag, // 多版本
            print: !checkFlag, // 打印
            output: !checkFlag // 输出
        });
        checkFlag = null;
        enabled = null;
    }

    getData(paramData, cb) {
        this.props.treeTableManyCol.initTreeTableData(orglist, [], 'pk_org', false);
        getMainTableData(paramData).then((result) => {

            if (!result.success) {
                return
            }
            if (cb && typeof cb === 'function') {
                cb(result)
            }
            // 设置按钮禁用状态 可用
            this.props.button.setButtonDisabled({
                orgver: true, // 多版本
            });
            if (!result.data) {
                this.props.treeTableManyCol.emptyAllData(orglist);
                return
            }
            let rows, datas, allpkorg;
            rows = result.data.orglist.rows;
            //后台返回的是表格的数据  需要构造成树状表的数据
            let tableData = this.props.treeTableManyCol.createNewData(rows);
            paramMap(tableData, ['pk_org', 'pk_fatherorg'], ['refpk', 'pid']);
            // 设置法人公司、人力资源、行政组织的display
            this.handleObjectShow(tableData);
            /*let tableData2 = {children: []};
            for (let key in tableData[0]) {
                if (key !== 'children') {
                    tableData2[key] = tableData[0][key]
                }
            }
            this.props.treeTableManyCol.initTreeTableData(orglist, [tableData2], 'pk_org', false);*/
            let finalTableData = [];
            tableData.forEach(item=>{
                let tableData2 = {children: []};
                for (let key in item) {
                    if (key !== 'children') {
                        tableData2[key] = item[key]
                    }
                }
                finalTableData.push(tableData2)
            });
            this.props.treeTableManyCol.initTreeTableData(orglist, finalTableData, 'pk_org', false);
            datas = tableData;
            //为了打印，传所有主键值
            allpkorg = getAllpks(datas);
            // 设置缓存数据 详情页分页用   区分业务单元版本信息分页
            setDefData('orgunit_allpkorg', this.props.cacheConfig.dataSource, allpkorg);

            rows = null;
            datas = null;
            allpkorg = null;
        });
    }

    /**
     * 设置法人公司、人力资源、行政组织的display
     * @param data
     */
    handleObjectShow(data) {
        if (Array.isArray(data)) {
            data.map(item => {
                if (Array.isArray(item.children)) {
                    this.handleObjectShow(item.children)
                }
                item.values.orgtype2 && (item.values.orgtype2.display = item.values.orgtype2.value ? this.state.json['jf6005-000337'] : this.state.json['jf6005-000338']); //"是" : "否";
                item.values.orgtype4 && (item.values.orgtype4.display = item.values.orgtype4.value ? this.state.json['jf6005-000337'] : this.state.json['jf6005-000338']); //"是" : "否";
                item.values.orgtype29 && (item.values.orgtype29.display = item.values.orgtype29.value ? this.state.json['jf6005-000337'] : this.state.json['jf6005-000338']); //"是" : "否";
            })
        }
    }

    expandEve(record) {
        if (record.hasOwnProperty('children') && record.children.length < 1) {
            let children = getDefData('org_table_tree_orglist', record.values.refpk.value);
            if (children) {
                children.forEach(item => {
                    item.children = [];
                });
                let dom = document.querySelectorAll(".orglist .u-table-scroll colgroup[id='bee-table-colgroup']");
                for (let i = 0, len = dom.length; i < len; i++) {
                    let colDom = dom[i].childNodes.item(0);
                    let colWidth = colDom.style.width;
                    colWidth = colWidth.substring(0, colWidth.length - 2);
                    colDom.style.width = colWidth - 0 + 15 + 'px';
                }
                this.props.treeTableManyCol.setChildNode(orglist, children, record);
            }
        }
        // this.props.treeTableManyCol.openRow( orglist, record.key )
    }

    collapandEve(record) {
        // this.props.treeTableManyCol.closeRow(orglist, item.key);
        this.props.treeTableManyCol.setChildNode(orglist, [], record);
    }

    render() {
        const {
            treeTableManyCol
        } = this.props;

        let {treeTableCol} = treeTableManyCol;
        return (
            <div className='orglist'>
                {treeTableCol(this.props.orglist, {
                    async: true,    //数据同步加载为false,异步加载为true
                    showCheckBox: true,
                    checkboxChange: this.checkboxChange.bind(this), //新增勾选onChange事件
                    checkedType: 'radio',
                    // 没有此参数 defaultExpandAll: true,   //初始化展开所有节点  ，默认参数为false,不展开
                    scrollConfig: {x: true, y: this.state.tableHeight},
                    expandEve: this.expandEve.bind(this),//异步执行，点击加号展开子节点
                    collapandEve: this.collapandEve.bind(this),//异步执行，点击加号收起子节点

                })}
            </div>
        );
    }
}

export default TableModal
