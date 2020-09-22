/**
 * 业务单元版本信息
 */
import React, {Component} from 'react';
import NCBackBtn from 'src/hrpub/common/components/hr-back';

import './index.less';

import {
    base,
    cardCache,
    promptBox,
    cacheTools,
    toast
} from 'nc-lightapp-front';
import orgTypeEnableAction from "../../functions/orgTypeEnableAction";
import UserManagerAction from "../../functions/UserManagerAction";
import {THEME} from "../../../../public/theme/theme";
import orgInfoQueryOne from "../../functions/OrgInfoQueryOneAction";
import {formatDisplayOrder} from "../../../../public/functions/orgtools";
import {COMMON} from "../../common/common";
import OrgInfoEditAction from "../../functions/orgInfoEditAction";

const {
    NCButton
} = base;
let {getDefData} = cardCache;

const {buttonGroupCard, orgtype, orgInfFormId, orgmanagers, corp, hrorg, adminorg, cacheConfig} = COMMON;

class DetailModal extends Component {
    constructor(props) {
        super(props);
        // 编辑页面选择的行
        this.selectedManagerRow = {};
        this.props.gridrelationTable.forEach(item => {
            this.selectedManagerRow[item.code] = {
                index: 0,
                row: null
            }
            // 复制页面选择的行
            this.copyManagerRow[item.code] = {
                row: null,
                index: null
            };
        });

        this.state = {
            json: props.json,
            orgDetailCard: null,
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
        let nextGrid = JSON.stringify(nextprops.gridrelationTable);
        let thisGrid = JSON.stringify(this.props.gridrelationTable);
        if (nextGrid !== thisGrid) {
            // 编辑页面选择的行
            let selectedManagerRow = {};
            let copyManagerRow = {};
            nextprops.gridrelationTable.forEach(item => {
                selectedManagerRow[item.code] = {
                    index: 0,
                    row: null
                }
                // 复制页面选择的行
                copyManagerRow[item.code] = {
                    row: null,
                    index: null
                };
            });
            this.selectedManagerRow = selectedManagerRow;
            this.copyManagerRow = copyManagerRow;
        }

    }

    componentDidMount() {

    }

    /**
     * 基本信息 编辑后事件
     */
    orgInfoOnAfterEvent(props, moduled, itemId, finalValue, oldValue, val) {

        // 组织名称改变后，如果组织简称没有值，则将组织名称的值赋值给组织简称
        if (itemId === 'name') {
            let shortName = props.form.getFormItemsValue(moduled, 'shortname');
            if (shortName.shortname && !shortName.shortname.value) {
                props.form.setFormItemsValue(moduled, {shortname: {value: val.value.name.value}})
            }
            shortName = null;
        }
    }

    /**
     * 法人公司 form 修改后触发事件
     * @param props
     * @param moduleI
     * @param key
     * @param value
     */
    onAfterFormEvent(props, moduleI, key, value) {
        // 如果选择是集团公司，则上级公司值清空，且不能编辑
        if (key === "isgroupcorp" && moduleI === corp) {
            props.form.setFormItemsValue(corp, {'pk_fatherorg': {value: '', display: null}});
            props.form.setFormItemsDisabled(corp, {'pk_fatherorg': value.value});
        }
    }

    /**
     * 只能组织停用/启用
     *  enable: 2:启用；  3：停用
     */
    orgTypeEnableAction(enable) {
        let formid, paramOrgType, msg;
        formid = this.props.orgTypeTab;
        if (formid === corp) {
            paramOrgType = "CORPORGTYPE000000000";
        }
        if (formid === hrorg) {
            paramOrgType = "HRORGTYPE00000000000";
        }
        if (formid === adminorg) {
            paramOrgType = "ADMINORGTYPE00000000";
        }
        if (enable === '2') {
            msg = this.state.json['jf6005-000108'];
            /* 国际化处理： 您确认要启用所选数据吗？*/
        } else if (enable === '3') {
            msg = this.state.json['jf6005-000109'];
            /* 国际化处理： 您确认要停用所选数据及其所有下级数据吗？*/
        }
        promptBox(
            {
                color: "warning",
                title: this.state.json['jf6005-000056'], /* 国际化处理： 提示*/
                content: msg,
                beSureBtnClick: () => {
                    let pk_org, data;
                    pk_org = getDefData('orgunit_pk_org', cacheConfig.dataSource);
                    if (pk_org.length < 1) {
                        formid = null;
                        paramOrgType = null;
                        msg = null;
                        pk_org = null;
                        data = null;
                        return;
                    }
                    data = {
                        enable: enable,
                        orgtype: paramOrgType,
                        pk_org: pk_org
                    };
                    orgTypeEnableAction(data).then(res => {

                        if (!res.success) {
                            formid = null;
                            paramOrgType = null;
                            msg = null;
                            pk_org = null;
                            data = null;
                            toast({color: "danger", content: res.message});
                            return;
                        }
                        // 刷新
                        this.getOrgInfoOneAction(pk_org);
                        this.props.updateState({
                            orgTypeEnState: enable
                        }, () => {
                            formid = null;
                            paramOrgType = null;
                            msg = null;
                            pk_org = null;
                            data = null;
                        })
                    }).catch(err => {
                        formid = null;
                        paramOrgType = null;
                        msg = null;
                        pk_org = null;
                        data = null;
                    })
                },
                cancelBtnClick: () => {
                    formid = null;
                    paramOrgType = null;
                    msg = null;
                },  // 取消按钮点击调用函数,非必输
                closeBtnClick: () => {
                    formid = null;
                    paramOrgType = null;
                    msg = null;
                } //关闭按钮点击调用函数，非必输
            }
        )
    }

    /**
     * 新增行
     */
    orgmanagersAddInfo = (tableid) => {
        let index = this.props.cardTable.getAllRows(tableid).length;
        let data;
        if ((!this.props.newAdd) && tableid !== orgmanagers) {
            data = {
                'pk_org': {
                    display: null,
                    value: this.pk_org
                }
            }
        }
        this.props.cardTable.addRow(tableid, index, data)
    };

    /**
     * 插入行
     */
    orgmanagersInsertInfo(tableid) {
        let index;
        if (this.selectedManagerRow[tableid].index || this.selectedManagerRow[tableid].index === 0) {
            index = this.selectedManagerRow[tableid].index;
        }
        let data;
        if ((!this.props.newAdd) && tableid !== orgmanagers) {
            data = {
                'pk_org': {
                    display: null,
                    value: this.pk_org
                }
            }
        }
        this.props.cardTable.addRow(tableid, index, data)
    }

    /**
     * 删除行
     */
    orgmanagersDelInfo(tableid) {
        if (this.chooseTableId !== tableid || !this.selectedManagerRow[tableid].row) {
            toast({
                color: "danger",
                content: this.state.json['jf6005-000325']/* 国际化处理： 请先选择数据！*/
            });
            return
        }
        // 当删除组织主管列表行时 添加规则
        if (tableid === orgmanagers) {
            //负责人为true的 行 不能删除，编辑。
            let values = this.selectedManagerRow[tableid].row.values;
            if (values.principalflag && values.principalflag.value) {
                toast({
                    color: "danger",
                    content: this.state.json['jf6005-000335']/* 国际化处理： 提示*/
                });
                values = null;
                return
            }
            values = null;
        }
        let _this = this;
        promptBox(
            {
                color: "warning",
                title: this.state.json['jf6005-000056'], /* 国际化处理： 提示*/
                content: this.state.json['jf6005-000057'], /* 国际化处理： 您确定要删除吗？*/
                beSureBtnClick: () => {
                    _this.props.cardTable.delRowsByIndex(tableid, _this.selectedManagerRow[tableid].index);
                    _this.selectedManagerRow[tableid] = {
                        row: null,
                        index: null
                    }
                }
            }
        )
    }

    /**
     * 复制
     */
    orgmanagersCopyInfo(tableid) {
        this.copyManagerRow[tableid].row = this.selectedManagerRow[tableid].row;
        this.copyManagerRow[tableid].index = this.selectedManagerRow[tableid].index;
        this.props.updateState({
            managerCopyFlag: '2'
        }, () => {
            toast({
                color: "success",
                content: this.state.json['jf6005-000058']/* 国际化处理： 复制成功*/
            })
        });

    }

    /**
     * 粘贴
     */
    orgmanagersPasteInfo(tableid) {
        let data = this.copyManagerRow[tableid].row;
        let index = this.selectedManagerRow[tableid].index;
        this.props.cardTable.pasteRow(tableid, data, index);
        data = null;
        index = null;
    }

    /**
     * 点击组织主管 行
     * @param record
     * @param index
     * @param e
     */
    orgmanagerRowClick(props, moduleId, record, index, e) {
        this.chooseTableId = moduleId;
        this.selectedManagerRow[moduleId].row = record;
        this.selectedManagerRow[moduleId].index = index;
    }

    /**
     * 组织主管编辑后事件
     *   当人员编码发生改变后 后面的数据都会发生改变
     * @param props 内部方法
     * @param moduleId  区域id
     * @param key   操作的键
     * @param value 当前值
     * @param changedrows   新旧值集合
     * @param record    行数据
     * @param index 当前index
     */
    magegerAfter(props, moduleId, key, value, changedrows, index, record) {
        // 如果不是组织主管 则退出
        if (moduleId !== orgmanagers) return;
        let valueKeys = Object.keys(value);
        // 当清除人员编码后 本行数据清空
        if (valueKeys.length < 1) {
            let values = record.values;
            for (let key in values) {
                let item = values[key];
                item.display = null;
                item.value = null;
            }
            props.cardTable.updateDataByIndexs(moduleId, [{
                index: index,
                data: {status: record.status, values: values}
            }]);
            valueKeys = null;
            return true
        }
        valueKeys = null;

        let values = record.values;
        for (let key in values){
            values[key].scale = null;
        }
        let model = {
            rows: [record]
        };
        let pk_org = getDefData('orgunit_pk_org', cacheConfig.dataSource);
        UserManagerAction.call(this, model, pk_org).then(res => {
            // 最后的设置的值未确定
            if (res.data[moduleId] && res.data[moduleId].rows && res.data[moduleId].rows[0] && res.data[moduleId].rows[0].values) {
                let values = res.data[moduleId].rows[0].values;
                props.cardTable.updateDataByIndexs(moduleId, [{
                    index: index,
                    data: {status: record.status, values: values}
                }]);
                values = null;
            }
        });
        model = null;
        pk_org = null;
    }

    /**
     * 查询某个组织的详情
     * @param pk_org
     * @param callback
     */
    getOrgInfoOneAction = async (pk_org, callback) => {
        if (!pk_org || pk_org.length < 1) {
            return
        }
        // 编辑 新增子集数据 时使用
        this.pk_org = pk_org;
        // 设置上一页下一页... a按钮状态
        let allpkorg = getDefData('orgunit_allpkorg', cacheConfig.dataSource);
        cacheTools.set('allpks', allpkorg);
        allpkorg = null;
        // 清空 表格数据
        this.emptyDetailPage();
        //查询 组织编码的可编辑行
        this.orgInfoEditAction(pk_org);
        await new Promise(resolve => {
            this.updateState({
                orgDetailCard: (new Date()).getTime()
            }, resolve)
        });
        orgInfoQueryOne({pk_org}).then(res => {
            this.orgInfoQueryOneSucc(res, pk_org, callback)
        })
    };

    /**
     * 查询详情返回数据处理
     * @param res
     * @param pk_org
     * @param callback
     */
    orgInfoQueryOneSucc = (res, pk_org, callback) => {
        if (!res.success) {
            return;
        }
        this.props.cardPagination.setCardPaginationId({id: pk_org, status: 1});
        let successData = res.data;
        // 设置form表单数据
        let formId = [orgInfFormId, corp, hrorg, adminorg];
        formId.forEach(formId => {
            if (!successData.hasOwnProperty(formId)) {
                return
            }
            let formData = successData[formId][formId];
            if (formId === orgInfFormId) {
                this.props.form.setAllFormValue({[orgInfFormId]: formData});
                this.props.form.setAllFormValue({[orgtype]: formData});
                return
            }
            if (formId === adminorg) {
                formatDisplayOrder(formData.rows[0].values, true);
                this.props.form.setAllFormValue({[adminorg]: formData});
                return
            }
            this.props.form.setAllFormValue({[formId]: formData})
        });

        //设置table表格数据
        this.props.gridrelationTable.forEach(item => {
            let tableId = item.code;
            if (!successData.hasOwnProperty(tableId)) {
                return
            }
            let tableData = successData[tableId][tableId];
            if (tableId === orgmanagers) {
                // 手动设置每一行的可编辑性
                tableData.rows.map(item => {
                    let values = item.values;
                    if (values.hasOwnProperty('principalflag')) {
                        let flag = values.principalflag.value;
                        if (flag) {
                            for (let key in values) {
                                values[key].disabled = 'on';
                            }
                        }
                        flag = null;
                    }
                    values = null;
                })
            }
            this.props.cardTable.setTableData(tableId, tableData);
        });

        let formDate = successData[orgInfFormId][orgInfFormId];
        this.props.setOrgTypeTabsArr(formDate);

        formDate = null;
        if (callback && typeof callback === 'function') {
            callback(res);
        }
    };

    /**
     * 清空详情页数据
     */
    emptyDetailPage() {
        // 清空组织信息
        this.props.form.EmptyAllFormValue(orgInfFormId);
        // 清空组织职能
        this.props.form.EmptyAllFormValue(orgtype);
        // 清空法人公司
        this.props.form.EmptyAllFormValue(corp);
        // 清空人力资源
        this.props.form.EmptyAllFormValue(hrorg);
        // 清空行政职能
        this.props.form.EmptyAllFormValue(adminorg);
        this.props.gridrelationTable.forEach(item => {
            this.props.cardTable.setTableData(item.code, {rows: []})
        })
    }

    /**
     * 设置detail状态
     * @param isEdit
     */
    setDetailStatus(isEdit) {
        let status = isEdit ? 'edit' : 'browse';
        this.props.form.setFormStatus(orgInfFormId, status);
        this.props.form.setFormStatus(orgtype, status);
        this.props.form.setFormStatus(corp, status);
        this.props.form.setFormStatus(hrorg, status);
        this.props.form.setFormStatus(adminorg, status);
        this.props.gridrelationTable.forEach(item => {
            this.props.cardTable.setStatus(item.code, status);
        })
    }

    /**
     * 查找详情页编码的可编辑性
     * @param pk_org
     */
    orgInfoEditAction(pk_org) {
        let postData = {
            pk_org
        };
        OrgInfoEditAction(postData).then(res => {
            if (!res.success || res.data) {
                return
            }
            // 设置编码的可编辑性
            if (res.data.hasOwnProperty('isCodeEditable')) {
                this.props.form.setFormItemsDisabled(orgInfFormId, {code: !res.data.isCodeEditable});
            }
            if (res.data.autoGeneratedCode) {
                this.props.autoGeneratedCode = res.data.autoGeneratedCode;
            }
        });
        postData = null;
    }

    /**
     * 更新state对象
     * @param data
     * @param callback
     */
    updateState(data, callback = () => {
    }) {
        this.setState(data, callback);
    }

    render() {
        const {
            button,
            cardPagination,
            form,
            cardTable,
        } = this.props;

        let {createButtonApp} = button;
        const {createCardPagination} = cardPagination;
        const {createForm} = form;//创建表单，需要引入这个
        const {createCardTable} = cardTable;
        return (
            <div className={'pageDetail'} style={{display: this.props.showOrgDetailPage ? '' : 'none'}}>
                {/*头部*/}
                <div className="topFixed">
                    <div className={'header'}>
                        <NCBackBtn onClick={this.props.backButtonClick}
                                   title={this.state.json['jf6005-000022']}/>
                        {/* 国际化处理： 返回*/}
                        <div className={'btn-group'} style={{display: this.props.showOrgDetailPFBtn ? '' : 'none'}}>
                            <NCButton
                                colors="primary"
                                onClick={this.props.saveOneOrgEditInfo}
                            >
                                {this.state.json['jf6005-000066']}{/* 国际化处理： 保存*/}
                            </NCButton>
                            <NCButton
                                colors="secondary"
                                onClick={this.props.cancleOneOrgEditInfo}
                            >
                                {this.state.json['jf6005-000008']}{/* 国际化处理： 取消*/}
                            </NCButton>
                        </div>
                        <div key={this.state.orgDetailCard} className="btn-group"
                             style={{display: this.props.showOrgDetailPFBtn ? 'none' : ''}}>
                            {
                                createButtonApp({
                                    area: buttonGroupCard,
                                    onButtonClick: (props, btncode) => {
                                        this.props.onButtonClick(props, btncode, buttonGroupCard, this);
                                    },
                                    popContainer: document.querySelector('.header-button-area')
                                })
                            }
                            {createCardPagination({
                                handlePageInfoChange: this.props.pageQueryClick
                            })}
                        </div>
                    </div>
                </div>
                {/*详情*/}
                <div className="editContent">
                    <div className={`editWarp ${THEME.bgc}`}>
                        <div className={`editWarpTitle ${THEME.fontc}`}>{this.state.json['jf6005-000131']}</div>
                        {/* 国际化处理： 组织基本信息*/}
                        {
                            createForm(orgInfFormId, {
                                onAfterEvent: this.orgInfoOnAfterEvent.bind(this),
                                expandArr: ['orgver', 'orgauditinfo'],
                            })
                        }
                    </div>

                    {/* 国际化处理： 组织职能*/}
                    <div className={`editWarp ${THEME.bgc}`}>
                        <div className={`editWarpTitle ${THEME.fontc}`}>{this.state.json['jf6005-000132']}</div>
                        <div>
                            {
                                createForm(orgtype, {
                                    onAfterEvent: this.props.orgTypeOnAfterEvent
                                })
                            }
                        </div>
                        <div className="tabs-box orgtype"
                             style={{display: this.props.orgTypeTabsArr.length > 0 ? '' : 'none'}}>
                            <div className={'addInfoBtn'}
                                 style={{display: this.props.showOrgDetailPFBtn ? 'none' : ''}}>
                                <NCButton
                                    colors="secondary"
                                    onClick={this.orgTypeEnableAction.bind(this, "3")}
                                    disabled={this.props.orgTypeEnState !== '2'}
                                >
                                    {this.state.json['jf6005-000133']}{/* 国际化处理： 停用*/}
                                </NCButton>
                                <NCButton
                                    colors="secondary"
                                    onClick={this.orgTypeEnableAction.bind(this, "2")}
                                    disabled={this.props.orgTypeEnState === '2'}
                                >
                                    {this.state.json['jf6005-000134']}{/* 国际化处理： 启用*/}
                                </NCButton>
                            </div>
                            <div className={'tabNav'}>
                                {this.props.showOrgtypeTabs()}
                            </div>
                            <div className={'tabsContent'}>
                                <div style={{display: this.props.orgTypeTab === corp ? '' : 'none'}}>
                                    {
                                        createForm(corp, {
                                            expandArr: ['corpotherinfo', 'corpcontactinfo'],
                                            onAfterEvent: this.onAfterFormEvent.bind(this)
                                        })
                                    }
                                </div>
                                <div style={{display: this.props.orgTypeTab === hrorg ? '' : 'none'}}>
                                    {
                                        // 人力资源
                                        createForm(hrorg)
                                    }
                                </div>
                                <div style={{display: this.props.orgTypeTab === adminorg ? '' : 'none'}}>
                                    {
                                        // 行政组织
                                        createForm(adminorg)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`editWarp ${THEME.bgc}`}>

                        {/* 国际化处理： 组织主管*/}
                        <div className="tabs-box">
                            {this.props.gridrelationTable.length > 0 && this.props.gridrelationTable.map(item => {
                                return createCardTable(item.code, {
                                    onRowClick: this.orgmanagerRowClick.bind(this),
                                    pageSize: 1000,
                                    hideColSet: () => {
                                        return true
                                    },//隐藏设置按钮
                                    hideSwitch: () => {
                                        return false
                                    },//隐藏全表展开按钮
                                    tableHead: () => {
                                        return <div className={'addInfoBtn'}
                                                    style={{display: this.props.showOrgDetailPFBtn ? '' : 'none'}}>
                                            <NCButton
                                                colors="secondary"
                                                onClick={this.orgmanagersAddInfo.bind(this, item.code)}
                                            >
                                                {this.state.json['jf6005-000083']} {/*国际化处理： 新增行*/}
                                            </NCButton>
                                            <NCButton
                                                colors="secondary"
                                                onClick={this.orgmanagersInsertInfo.bind(this, item.code)}
                                            >
                                                {this.state.json['jf6005-000084']} {/*国际化处理： 插入行*/}
                                            </NCButton>
                                            <NCButton
                                                colors="default"
                                                onClick={this.orgmanagersDelInfo.bind(this, item.code)}
                                            >
                                                {this.state.json['jf6005-000085']} {/*国际化处理： 删除行*/}
                                            </NCButton>

                                            <NCButton
                                                colors="secondary"
                                                onClick={this.orgmanagersCopyInfo.bind(this, item.code)}
                                                disabled={true}
                                            >
                                                {this.state.json['jf6005-000086']} {/*国际化处理： 复制行*/}
                                            </NCButton>
                                            <NCButton
                                                colors="secondary"
                                                onClick={this.orgmanagersPasteInfo.bind(this, item.code)}
                                                disabled={true}
                                            >
                                                {this.state.json['jf6005-000087']} {/*国际化处理： 粘贴行*/}
                                            </NCButton>
                                        </div>
                                    },
                                    onAfterEvent: this.magegerAfter.bind(this)
                                })
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DetailModal
