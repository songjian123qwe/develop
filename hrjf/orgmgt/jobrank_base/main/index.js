/**
 * Created by wanghongxiang on 2018/5/8.
 */
import React, {Component} from 'react';
import "./index.less";

import {print, base, toast, promptBox, output, getBusinessInfo} from 'nc-lightapp-front';
import {hrAjax as ajax} from 'src/hrpub/common/utils/utils';
import {THEME} from "../../../public/theme/theme";

let {NCCheckbox} = base;

let tableid = 'baseinfo';

class JobRank extends Component {
    constructor(props) {
        super(props);
        this.config = props.context;
        this.state = {
            showMode: 'browse',
            showChangePage: false,
            tableData: [],
            tableStatus: false,
            selectedRows: [],
            inlt: [],
            json: []
        };
        this.businessInfo = '';
        this.changeTable = false
    }

    tempData = {
        tebleData: '',
        defaultData: {
        }
    };

    onSelectedFn = (props, moduleId, record, index, status) => {
        ////console.log(this.props.editTable.getCheckedRows(tableid))
        let arr = JSON.parse(JSON.stringify(this.props.editTable.getCheckedRows(tableid)));
        arr.forEach((v, index) => {
            if (v.data.status === '3') arr.splice(index, 1);
        });
        this.setState({
            selectedRows: arr
        })
    };

    // 更新界面状态
    updateShowMode(showMode) {
        var oldMode = this.state.showMode;
        this.setState({
            showMode: showMode
        }, () => {
            this.updateButtonStatus()
        });
        if (oldMode === showMode) {
            return;
        }
        if ('edit' === showMode) {
            this.props.editTable.setStatus(tableid, 'edit');
            this.props.editTable.setColEditableByKey(tableid, "enablestate", false);
            // 设置集团下全局数据不可修改
            //console.log(this.props.editTable.getAllRows(tableid))
            if (this.config.nodeType === 'GROUP_NODE') {
                const tar = this.props.editTable.getAllRows(tableid);
                if (tar.length && tar.length > 0) {
                    let toDisArray = [];
                    tar.forEach((v, index) => {
                        if (v.values.pk_org.value === "GLOBLE00000000000000") {
                            toDisArray.push(index)
                        }
                    });
                    this.props.editTable.setEditableRowByIndex(tableid, toDisArray, false)
                }
            }
        } else {
            this.props.editTable.cancelEdit(tableid);
        }
    }

    componentWillMount() {
        let callback = (json, status, inlt) => {
            if (status) {
                this.setState({json, inlt}, () => {
// this.initTemplate(this.props) //在这里可以进行ceateUIDom
                }); // 保存json和inlt到页面state中并刷新页面
                this.tempData.defaultData = {
                    "pk_org": {
                        "display": this.state.json['jf6005-000147'],/* 国际化处理： 全局*/
                        "scale": "-1",
                        "value": this.props.context.org
                    }, "enablestate": {
                        "display": this.state.json['jf6005-000110'],/* 国际化处理： 已启用*/
                        "scale": "-1",
                        "value": "2"
                    }
                }
            }
        };
        this.props.MultiInit.getMultiLang({moduleId: 'jf6005', domainName: 'hrjf', callback})

    }

    getPkorg() {
        if (this.config.nodeType === 'GROUP_NODE') {
            ajax({
                url: '/nccloud/hrjf/jobrank/JobRankAddAction.do',
                data: {},
                success: res => {
                    const pk_org = res.data && res.data.baseinfo.rows[0].values.pk_org || '';
                    this.tempData.defaultData.pk_org = pk_org

                }
            })
        }
    }

    // 统一处理按钮事件
    onBtnOperation(prop, btncode, areacode, opt) {
        switch (btncode) {
            case 'add':
                this.updateShowMode('edit');
                let len;
                let addData = this.tempData.defaultData;
                // 20190710 len必须为undefined 否则默认将新增行 不能添加到最后一行
                this.props.editTable.addRow(tableid, len, true, addData);
                // this.props.editTable.getAllRows
                break;
            case 'cancel':
                // this.props.modal.show('cancelConfirmModal');
                promptBox({
                    color: 'warning',               // 提示类别默认"success"， "success"/"info"/"warning"/"danger",非必输
                    title: this.state.json['jf6005-000097'],/* 国际化处理： 注意*/
                    content: this.state.json['jf6005-000210'],/* 国际化处理： 确认取消操作？*/
                    noFooter: false,                // 是否显示底部按钮(确定、取消),默认显示(false),非必输
                    noCancelBtn: false,             // 是否显示取消按钮,，默认显示(false),非必输
                    beSureBtnName: this.state.json['jf6005-000036'],          ///* 国际化处理： 确定*/
                    cancelBtnName: this.state.json['jf6005-000008'],         // /* 国际化处理： 取消*/
                    hasCloseBtn: true,             //显示“X”按钮，默认不显示，不显示是false，显示是true
                    beSureBtnClick: this.sureDelete,   // 确定按钮点击调用函数,非必输
                    closeByClickBackDrop: false,//点击遮罩关闭提示框，默认是true点击关闭，阻止关闭是false
                });
                break;
            case 'edit':
                this.updateShowMode('edit');
                break;
            case 'save':
                this.saveTableData();
                break;
            case 'showdisable':
                let temp = '';
                if (sessionStorage.getItem('showDisabledFlag') === null) {
                    temp = '1'
                } else {
                    temp = (sessionStorage.getItem('showDisabledFlag') === '0' ? '1' : '0')
                }
                sessionStorage.setItem('showDisabledFlag', temp);
                this.fetchTableData();
                break;
            case 'delete':
                this.onSelectedFn();
                if (!this.state.selectedRows.length) {
                    toast({color: "warning", content: this.state.json['jf6005-000205']});/* 国际化处理： 请选择要删除的条目!*/
                    return
                }
                if (this.config.nodeType === 'GROUP_NODE') {
                    //console.log(this.state.selectedRows)
                    if (this.state.selectedRows && this.state.selectedRows.some(v => {
                        if (v && v.data && v.data.values && v.data.values.pk_org.value === 'GLOBLE00000000000000') {
                            return true
                        }
                    })) {
                        toast({color: "warning", content: this.state.json['jf6005-000342']}); /* 集团节点只能维护当前登录集团的数据 */
                        return false
                    }
                }


                if (this.state.showMode === 'browse') {
                    promptBox({
                        color: 'warning',               // 提示类别默认"success"， "success"/"info"/"warning"/"danger",非必输
                        title: this.state.json['jf6005-000153'],                // 提示标题, 默认不同类别下分别为："已成功"/"帮助信息"/"请注意"/"出错啦",非必输/* 国际化处理： 确认删除*/
                        content: this.state.json['jf6005-000160'],             // 提示内容,非必输/* 国际化处理： 您确定要删除所选数据么?*/
                        noFooter: false,                // 是否显示底部按钮(确定、取消),默认显示(false),非必输
                        noCancelBtn: false,             // 是否显示取消按钮,，默认显示(false),非必输
                        beSureBtnName: this.state.json['jf6005-000036'],          // 确定按钮名称, 默认为"确定",非必输/* 国际化处理： 确定*/
                        cancelBtnName: this.state.json['jf6005-000008'],         // 取消按钮名称, 默认为"取消",非必输/* 国际化处理： 取消*/
                        hasCloseBtn: true,             //显示“X”按钮，默认不显示，不显示是false，显示是true
                        beSureBtnClick: this.functionSureDelete,   // 确定按钮点击调用函数,非必输
                        // cancelBtnClick: functionCancel,  // 取消按钮点击调用函数,非必输
                        // closeBtnClick:functionClose, //关闭按钮点击调用函数，非必输
                        closeByClickBackDrop: false,//点击遮罩关闭提示框，默认是true点击关闭，阻止关闭是false
                    })
                } else {
                    this.functionSureDelete()
                }
                // this.onSelectedFn()
                break;
            case 'refresh':
                this.fetchTableData();
                break;
            case 'copy':
                this.copyData();
                this.onSelectedFn();
                break;
            case 'print_group':
                const tar = this.props.editTable.getAllRows(tableid);
                let toDisArray = [];
                if (tar.length && tar.length > 0) {
                    tar.forEach((v, index) => {
                        toDisArray.push(v.values.pk_jobrank.value)
                    });
                    print(
                        'pdf',  //支持两类: 'html'为模板打印, 'pdf'为pdf打印
                        '/nccloud/hrjf/jobrank/JobRankPrintAction.do', //后台服务url
                        {
                            funcode: '60052010',      //小应用编码
                            nodekey: 'tbprint',     //模板节点标识 tbprint 表格打印... fmprint 表单打印
                            oids: toDisArray,    // 功能节点的数据主键   oids含有多个元素(['1001A41000000000A9LR','1001A410000000009JDD'])时为批量打印
                        }
                    )
                } else {
                    toast({color: "warning", content: this.state.json['jf6005-000206']})/* 国际化处理： 无打印数据!*/
                }
                break;
            case 'output':
                const tar1 = this.props.editTable.getAllRows(tableid);
                let toDisArray1 = [];
                if (tar1.length && tar1.length > 0) {
                    tar1.forEach((v, index) => {
                        toDisArray1.push(v.values.pk_jobrank.value)
                    });
                    output({
                        url: '/nccloud/hrjf/jobrank/JobRankPrintAction.do',
                        data: {
                            funcode: '60052010',      //小应用编码
                            nodekey: 'tbprint',     //模板节点标识
                            oids: toDisArray1,    // 功能节点的数据主键   oids含有多个元素(['1001A41000000000A9LR','1001A410000000009JDD'])时为批量打印
                            outputType: 'output',
                            filename: this.config.nodeType === 'GLOBE_NODE' ? '职等-全局' : '职等-集团'
                        }
                    })
                } else {
                    toast({color: "warning", content: this.state.json['jf6005-000206']})/* 国际化处理： 无打印数据!*/
                }
                break
        }
    }

    checkedOrNot(a, b, c, d, e, f, g, h) {
        if (c === 'enablestate') {
            // 集团不可修改全局数据
            if (this.config.nodeType === 'GROUP_NODE') {
                if (g.values.pk_org.value === "GLOBLE00000000000000") {
                    g.values.enablestate.value === '2' ? toast({
                        color: "warning",
                        content: this.state.json['jf6005-000155']
                    }) : toast({color: "warning", content: this.state.json['jf6005-000156']});/* 国际化处理： 数据不在管控范围内，不能停用!,数据不在管控范围内，不能启用!*/
                    this.props.editTable.cancelEdit(tableid);
                    return true
                }
            }
            let temp = Object.assign({}, g);
            temp.values.enablestate.value = temp.values.enablestate.value ? '3' : '2';
            ////console.log(temp)
            const url = (d ? '/nccloud/hrjf/jobrank/JobRankEnableAction.do' : '/nccloud/hrjf/jobrank/JobRankDisableAction.do');
            ajax({
                url,
                'type': 'post',
                data: {
                    model: ({
                        rows: [g]
                    })
                },
                success: res => {
                    if (res.success) {
                        toast({color: "success"});
                        this.fetchTableData()
                    }
                },
                error: err => {
                    toast({color: "warning", content: err.message.replace(/\n/g, "<br/>")})
                }
            })
        }
    }

    copyData = () => {
        if (!this.state.selectedRows.length) {
            toast({color: "warning", content: this.state.json['jf6005-000207']});/* 国际化处理： 请选中要复制的行!*/
            return
        }
        const temp = JSON.parse(JSON.stringify(this.state.selectedRows)).map(item => {
            item.data.values.pk_jobrank = {display: null, scale: "-1", value: null};
            item.data.values.enablestate = {display: this.state.json['jf6005-000110'], value: true};/* 国际化处理： 已启用*/
            item.data.selected = false;
            item.data.values.pk_org.value = this.config.nodeType === 'GLOBE_NODE' ? 'GLOBLE00000000000000' : this.businessInfo.groupId;
            item.data.values.pk_org.display = this.config.nodeType === 'GLOBE_NODE' ? this.state.json['jf6005-000147'] : this.businessInfo.groupName;
            let temp1 = {
                values: {
                    pk_jobrank: {display: null, scale: "-1", value: null},
                    enablestate: {display: this.state.json['jf6005-000110'], value: true},/* 国际化处理： 已启用*/
                    pk_org: {
                        value: this.config.nodeType === 'GLOBE_NODE' ? 'GLOBLE00000000000000' : this.businessInfo.groupId,
                        display: this.config.nodeType === 'GLOBE_NODE' ? this.state.json['jf6005-000147'] : this.businessInfo.groupName
                    },
                    jobrankorder: {
                        display: item.data.values.jobrankorder.display,
                        scale: item.data.values.jobrankorder.scale,
                        value: item.data.values.jobrankorder.value
                    },
                    jobrankcode: {
                        display: item.data.values.jobrankcode.display,
                        scale: item.data.values.jobrankcode.scale,
                        value: item.data.values.jobrankcode.value
                    },
                    jobrankname: {
                        display: item.data.values.jobrankname.display,
                        scale: item.data.values.jobrankname.scale,
                        value: item.data.values.jobrankname.value
                    },
                    jobrankdesc: {
                        display: item.data.values.jobrankdesc.display,
                        scale: item.data.values.jobrankdesc.scale,
                        value: item.data.values.jobrankdesc.value
                    }
                }
            };
            return temp1
        });
        const tempData = this.state.tableData.slice();
        this.props.editTable.setTableData(tableid, {rows: [...tempData, ...temp]});
        if (this.config.nodeType === 'GROUP_NODE') {
            const tar = this.props.editTable.getAllRows(tableid);
            if (tar.length && tar.length > 0) {
                // let toDisArray = []
                tar.forEach((v, index) => {
                    if (v.values.pk_org.value === "GLOBLE00000000000000") {
                        this.props.editTable.setEditableRowByIndex('baseinfo', index, false)
                    }
                })
            }
        }
        this.updateShowMode('edit');
        this.setState({
            selectedRows: []
        });
        this.changeTable = true;
        this.props.editTable.setStatus('baseinfo', 'edit');
        this.props.editTable.selectAllRows(tableid, false);
    };
    functionSureDelete = () => {
        const deleteArray = Object.assign([], this.state.selectedRows);
        const indexArray = deleteArray.map(item => item.index);
        this.props.editTable.deleteTableRowsByIndex(tableid, indexArray, false);
        if (this.state.showMode === 'browse') {
            this.saveTableData()
        } else {
        }
    };

    sureDelete =()=> {
        let {tableData} = this.state;
        if (this.changeTable) {
            tableData.map((item, index) => {
                if (item.status === '3') {
                    item.status = '0'
                }
            });
            this.props.editTable.selectAllRows(tableid, false);
            this.props.editTable.setTableData(tableid, {rows: tableData});
            this.setState({
                selectedRows: []
            })
        } else {
            this.props.editTable.cancelEdit(tableid)
        }
        this.changeTable = false;
        this.updateShowMode('browse');
        if (this.config.nodeType === 'GROUP_NODE') {
            const tar = this.props.editTable.getAllRows(tableid);
            let toDisArray = [];
            if (tar.length && tar.length > 0) {
                tar.forEach((v, index) => {
                    if (v.values.pk_org.value === "GLOBLE00000000000000") {
                        toDisArray.push(index)
                    }
                });
                this.props.editTable.setEditableRowByIndex(tableid, toDisArray, false)
            }
        }
    };

    saveTableData = () => {
        let data = this.props.editTable.getAllRows(tableid, true);
        if (!this.props.editTable.checkRequired(tableid, data)) {
            return false
        }
        let temp = Object.assign([], data);
        temp.forEach(item => {
            item.values.enablestate.value = item.values.enablestate.value ? '2' : '3'
        });
        let modelInfo = {
            model: ({
                rows: temp
            })
        };
        ajax({
            url: '/nccloud/hrjf/jobrank/JobRankSaveAction.do',
            type: 'post',
            data: modelInfo,
            success: res => {
                if (res.success) {
                    this.updateShowMode('browse');
                    this.fetchTableData();
                    toast({color: "success"})
                } else {
                    if (this.state.showMode === 'browse') {
                        this.sureDelete()
                    }
                }
                this.onSelectedFn()
            },
            error: rej => {
                toast({color: "warning", content: rej.message});
                if (this.state.showMode === 'browse') {
                    this.fetchTableData()
                }
            }
        })
    };

    fetchTableData() {
        ajax({
            url: '/nccloud/hrjf/jobrank/JobRankQueryAction.do',
            data: {
                'pk_org': this.props.context.org,
                'showDisable': sessionStorage.getItem('showDisabledFlag') === 'true'
            },
            success: res => {
                res.data && res.data.baseinfo.rows.forEach(item => {
                    item.values.enablestate.value = (item.values.enablestate.value === '2') ? true : false
                });
                this.setState({
                    tableData: res.data && res.data.baseinfo.rows || []
                });
                this.tempData.tebleData = res.data && res.data.baseinfo.rows || [];
                this.props.editTable.setTableData(tableid, {rows: res.data && res.data.baseinfo.rows || []});
                this.onSelectedFn();
                if (this.config.nodeType === 'GROUP_NODE') {
                    const tar = this.props.editTable.getAllRows(tableid);

                    if (tar.length && tar.length > 0) {
                        // let toDisArray = []
                        tar.forEach((v, index) => {
                            if (v.values.pk_org.value === "GLOBLE00000000000000") {
                                this.props.editTable.setEditableRowByRowId('baseinfo', v.rowid, false)
                            }
                        })
                        //this.props.editTable.setEditableRowByIndex(tableid,toDisArray,false)
                    }
                }
            }
        })
    }

    componentDidMount() {
        this.businessInfo = getBusinessInfo() || {groupId: '0001A910000000000BQB', groupName: '霍格沃茨魔法学院'};
        this.updateButtonStatus();
        this.getPkorg();
        this.pageInit();
    }

    pageInit = ()=>{
        let data = this.props.domTemplate;
        this.setState({
            buttons: data.button || [],
            context: data.context || {}
        });
        this.props.meta.setMeta(data && data.template ? data.template : {}, () => {
            this.fetchTableData()
        });
        this.props.button.setButtons(data && data.button ? data.button : {});
    };

    // 按钮是否显示，按钮是否可用
    updateButtonStatus() {
        var showMode = this.state.showMode;
        this.props.button.setButtonsVisible({
            add: true,
            edit: showMode === 'browse',
            delete: true,
            copy: showMode === 'browse',
            refresh: showMode === 'browse',
            showdisable: showMode === 'browse',
            save: showMode === 'edit',
            cancel: showMode === 'edit',
            print_group: showMode === 'browse'
        })
    }

    onCheckBoxChange(e) {
        ////console.log('thiss checkbox')
        sessionStorage.setItem('showDisabledFlag', e);
        this.fetchTableData()
    }

    render() {
        let {button, editTable} = this.props;
        let {createButtonApp} = button;
        let {createEditTable} = editTable;
        return (
            <div className={`nc-single-table jobrank ${THEME.bgCommon}`}>
                <div className="nc-singleTable-header-area">
                    <div className="title">
                        <NCCheckbox className="sn-header-checkbox"
                                    checked={sessionStorage.getItem('showDisabledFlag') === 'true'}
                                    onChange={this.onCheckBoxChange.bind(this)}
                        >
                            {this.state.json['jf6005-000130']}{/* 国际化处理： 显示停用*/}
                        </NCCheckbox>
                    </div>
                    {/* 按钮区  btn-group */}
                    <div className="header-button-area">
                        {createButtonApp({
                            area: 'list',//按钮注册中的按钮区域
                            buttonLimit: 1,
                            onButtonClick: (props, btncode) => this.onBtnOperation(props, btncode, 'list', this),
                            popContainer: document.querySelector('.header-button-area')
                        })}
                    </div>
                </div>
                <div className="nc-singleTable-table-area">
                    {/* 生成表格 */}
                    {createEditTable(tableid, {//列表区
                        useFixedHeader: true,
                        onSelected: this.onSelectedFn,                        // 左侧选择列单个选择框回调
                        onSelectedAll: this.onSelectedFn,
                        onAfterEvent: this.checkedOrNot.bind(this),				//表格状态监听
                        showIndex: true,				//显示序号
                        showCheck: true		        //显示复选框
                    })}
                </div>
            </div>
        );
    }
}

export default JobRank;
