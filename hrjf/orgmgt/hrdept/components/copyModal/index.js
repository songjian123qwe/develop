/**
 * 组织版本化
 */
import React, {Component} from 'react';

import './index.less';

import {
    base,
    toast
} from 'nc-lightapp-front';
import AddRefer from 'src/hrpub/common/components/hr-refer/ReferLoader';
import Transfer from '../../../../public/excomponents/Transfer';
import CopyDeptQueryDeptAction from "../../functions/CopyDeptQueryDeptAction";
import CopyDeptAdjustStepAction from "../../functions/CopyDeptAdjustStepAction";
import CopyDeptConfirmStepAction from "../../functions/CopyDeptConfirmStepAction";
import CopyDeptExecAction from "../../functions/CopyDeptExecAction";
import AddCondition from "../../../../public/functions/addCondition";
import CopyDeptQueryCodeAction from "../../functions/CopyDeptQueryCodeAction";
import NCSelectTag from "../../../../public/components/ncSelect";
import {THEME} from "../../../../public/theme/theme";
import {saveValidate} from "../../../../public/functions/orgtools";

const {
    NCCheckbox,
    NCModal,
    NCButton,
    NCStep,
    NCDatePicker
} = base;
const NCSteps = NCStep.NCSteps;
const {
    Header: NCModalHeader,
    Body: NCModalBody,
    Footer: NCModalFooter
} = NCModal;

class CopyModal extends Component {
    constructor(props) {
        super(props);
        this.codePrefixType = ''; // 编码前缀
        this.namePrefixType = ''; // 名称前缀
        this.state = {
            json: props.json,
            inlt: props.inlt,
            stepsCurrent: 0, // 选择 步骤
            sourceUnit: '', // 选择的源部门所在业务单元,
            targetUnit: '', // 选择的目标业务单元,
            copyModalConAllSub: false, // 第一步 是否包含所有下级
            isCopyPostInfo: false, // 是否同时复制岗位信息
            transferData: {
                leftTreeData: [],
                rightTreeData: []
            },
            selectType: 'onlySelf', // 穿梭框  从左到右的方式 'onlySelf':自己;    'default':全部包含子节点
            dateValue: null, //目标部门成立时间
            namePrefix: '',
            codePrefix: ''
        };
        let now = new Date();
        let dateValue = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
        this.setState({
            dateValue
        });
        this.closeInfoModal = this.closeInfoModal.bind(this);
        this.next = this.next.bind(this);
        this.last = this.last.bind(this);
        this.complete = this.complete.bind(this);
    }

    componentWillReceiveProps(nextprops) {
        let nextjson = JSON.stringify(nextprops.json);
        let thisjson = JSON.stringify(this.props.json);
        let nextinlt = JSON.stringify(nextprops.inlt);
        let thisinlt = JSON.stringify(this.props.inlt);
        if (nextjson !== thisjson || nextinlt !== thisinlt) {
            let now = new Date();
            let dateValue = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
            this.setState({
                json: nextprops.json,
                inlt: nextprops.inlt,
                dateValue
            })
        }
    }

    /**
     * 关闭模块
     */
    closeInfoModal() {
        this.props.updateState({
            copyModalVisible: false
        });
        this.initParam();
    }

    /**
     * 初始化参数
     */
    initParam() {
        this.codePrefixType = ''; // 编码前缀
        this.namePrefixType = ''; // 名称前缀

        this.updateState({
            stepsCurrent: 0, // 选择 步骤
            sourceUnit: '', // 源部门业务单元,
            targetUnit: '', // 目标部门业务单元,
            codePrefix: '', // 编码前缀,
            namePrefix: '', // 名称前缀,
            copyModalConAllSub: false, // 第一步 是否包含所有下级
            isCopyPostInfo: false, // 是否同时复制岗位信息
            transferData: {
                leftTreeData: [],
                rightTreeData: []
            },
            selectType: 'onlySelf',  // 穿梭框  从左到右的方式 'onlySelf':自己;    'default':全部包含子节点
        })
    }

    /**
     * 下一步
     */
    next() {
        if (this.state.stepsCurrent === 0) {
            // 表单验证
            if (!this.firstStepCheck()) {
                return
            } else {
                this.copyDeptAdjustStepAction(() => {
                    let step = this.state.stepsCurrent + 1;
                    this.updateState({
                        stepsCurrent: step
                    });
                });
            }
        }
        if (this.state.stepsCurrent === 1) {
            if (this.state.targetUnit && this.state.targetUnit.length > 0) {
                this.copyDeptConfirmStepAction();
            }
            let stepsCurrent = this.state.stepsCurrent + 1;

            this.updateState({
                stepsCurrent,
            }, () => {
                let clientH = this.tableBox1.clientHeight;
                if (clientH < 130) {
                    this.tableBox1.style.height = '130px';
                    this.tableBox2.style.height = '130px'
                }
            });
        }
    }

    /**
     * 第一步检测
     * @returns {boolean}
     */
    firstStepCheck() {
        let treeCheck = this.state.transferData.rightTreeData.length > 0;
        if (!treeCheck) {
            toast({color: "danger", content: this.state.json['jf6005-000350']}) //选择要复制的部门
        }
        return treeCheck
    }

    /**
     * 上一步
     */
    last() {
        let step = this.state.stepsCurrent - 1;
        this.updateState({
            stepsCurrent: step
        });
    }

    /**
     * 转移部门列表点击事件
     */
    transferDeptTable(props, moduleId, record, index, e) {
        let keyid = record.values.pk_org.value;
        this.selectPost = keyid;
        this.props.editTable.setTableData('targetDept', this.userjson[keyid]['targetDept'])
    }

    emptyTargetTable() {
        this.userjson = null;
        this.props.editTable.setTableData('targetDept', {rows: []});
        this.props.editTable.setTableData('targetOrg', {rows: []});
    }

    transferPostTableAfterEdit(props, moduleId, key, value, changedrows, record, index) {
        let data = props.editTable.getAllData(moduleId);
        this.userjson[this.selectPost]["targetDept"] = data;
    }

    onTableAfterEdit(props, moduleId, key, value, changedrows, index, record) {
        if (record.values.hasOwnProperty('targetDeptVOs')) {
            delete record.values.targetDeptVOs
        }
        let model = {
            rows: [record]
        };
        CopyDeptQueryCodeAction.call(this, model, record.values.pk_dept.value, record.values.pk_org.value, moduleId, index);
    }

    transferPostTableBeforeEdit(moduleId, record, index) {
        let meta = this.props.meta.getMeta();
        // 目标业务单元  目标位置部门名称 参照条件
        AddCondition(meta[moduleId], {
            pk_org: record.values.pk_org.value,
            isShowDisbleOrg: false
        }, 'pk_dept');

        this.props.meta.setMeta(meta, () => {
            meta = null;
        });

        return true
    }

    /**
     * 关闭 table 模块
     * @param tableid
     */
    closeTableModel(tableid) {
        this.props.editTable.setStatus(tableid, 'browse')
    }

    /**
     * 完成
     */
    complete() {
        if (!this.state.targetUnit) {
            toast({color: "danger", content: this.state.json['jf6005-000507']}); //请选择目标业务单元!
            return
        }

        let tableId = 'targetOrg';
        let pageid = tableId;
        let templateid = this.props.pageidObj[tableId];
        saveValidate(this.props, pageid, tableId, null, 'grid', 'editTable',templateid).then(() => {
            this.copyDeptExecAction();
        })
    }

    /**
     * 源部门业务单元选择
     * @param val
     */
    sourceUnitChange(val) {
        this.updateState({
            sourceUnit: val
        }, () => {
            this.copyDeptQueryDeptAction()
        });
    }

    /**
     * 目标部门业务单元选择
     * @param val
     */
    targetUnitChange(val) {
        let valStr = JSON.stringify(val);
        let targetUnit = JSON.stringify(this.state.targetUnit);
        //解决触发两次targetUnitChange事件
        if (valStr === targetUnit) {
            // 当参照为多选时 清除值 会触发两次targetUnit事件
            return
        }
        this.updateState({
            targetUnit: val
        }, () => {
            this.copyDeptConfirmStepAction();
        });
    }

    /**
     * 复制第一步 是否包含下级业务单元
     * @param val
     */
    containAllSub(val) {
        this.updateState({
            copyModalConAllSub: val,
            selectType: val ? 'onlyChild' : "onlySelf"
        }, () => {

        })
    }

    /**
     * 复制第一步 是否包含下级业务单元
     * @param val
     */
    copyPostInfoChange(val) {
        this.updateState({
            isCopyPostInfo: val
        }, () => {

        })
    }

    updateState(data, cb = () => {
    }) {
        this.setState(data, cb);
    }

    /**
     * 目标部门编码前缀 改变
     * @param val
     */
    codePrefixChange(val) {
        this.codePrefixType = val;
    }

    /**
     * 目标部门名称前缀 改变
     * @param val
     */
    namePrefixChange(val) {
        this.namePrefixType = val;
    }

    handelDateChange(v) {
        this.updateState({
            dateValue: v
        })
    }

    /**
     * 复制部门待选部门查询
     */
    copyDeptQueryDeptAction() {
        CopyDeptQueryDeptAction(this.state.sourceUnit.refpk).then(res => {
            if (!res.data) return;
            this.updateState({
                transferData: {
                    leftTreeData: res.data,
                    rightTreeData: []
                }
            })
        })
    }

    /**
     * 复制规则设置
     */
    copyDeptAdjustStepAction(cb) {
        let selDeptPks = this.getkey(this.state.transferData.rightTreeData).join(',');
        CopyDeptAdjustStepAction(selDeptPks).then(res => {
            if (cb && typeof cb === 'function') {
                cb();
            }
            if (!res.data) return;
            this.props.editTable.setTableData('deptAdjust', res.data.deptAdjust.deptAdjust);
        })
    }

    getkey(data) {
        let arr = [];

        function getdept(data) {
            if (Array.isArray(data)) {
                data.map(item => {
                    arr.push(item.nodeData.nodeValue.pk_dept);
                    if (item.hasOwnProperty('children')) {
                        getdept(item.children);
                    }
                })
            }
        }

        getdept(data);
        return arr;
    }

    /**
     * 部门复制规则目标部门设置
     */
    copyDeptConfirmStepAction(cb) {
        let codePrefixType, createDate, namePrefixType, deptAdjust, selOrgPks;
        codePrefixType = this.codePrefixType;
        createDate = this.state.dateValue;
        namePrefixType = this.namePrefixType;
        deptAdjust = this.props.editTable.getAllData('deptAdjust');
        let selOrgPksArr = [];
        this.state.targetUnit.map(item => {
            selOrgPksArr.push(item.refpk)
        });
        selOrgPks = selOrgPksArr.join(',');
        //  清空列表
        this.emptyTargetTable();
        CopyDeptConfirmStepAction(codePrefixType, createDate, namePrefixType, deptAdjust, selOrgPks).then(res => {
            if (cb && typeof cb === 'function') {
                cb();
            }
            if (!res.data) return;
            this.props.editTable.setTableData('targetOrg', res.data.targetOrg.targetOrg);
            this.userjson = JSON.parse(res.data.targetOrg.userjson);
        })
    }

    /**
     * 完成执行
     */
    copyDeptExecAction() {
        let selDeptPks, targetOrg, userjson, copyPosts;

        let selOrgPksArr = [];
        this.state.targetUnit.map(item => {
            selOrgPksArr.push(item.refpk)
        });
        selDeptPks = this.getkey(this.state.transferData.rightTreeData).join(',');

        targetOrg = this.props.editTable.getAllData('targetOrg');
        targetOrg.rows.map(item => {
            if (item.values.hasOwnProperty('targetDeptVOs')) {
                delete item.values.targetDeptVOs;
            }
        });

        let userjsonStr = JSON.stringify(this.userjson);
        let userjsonObj = JSON.parse(userjsonStr);
        let temp = {};
        for (let key in userjsonObj) {
            temp[key] = JSON.stringify(userjsonObj[key]);
        }
        userjson = JSON.stringify(temp);
        copyPosts = this.state.isCopyPostInfo;
        CopyDeptExecAction(selDeptPks, targetOrg, userjson, copyPosts).then(res => {
            this.props.refresh();
            this.closeInfoModal()
        })
    }

    footer() {
        let steps = this.state.stepsCurrent;
        switch (steps) {
            case 0:
                return (
                    <NCModalFooter>
                        <NCButton
                            colors="secondary"
                            onClick={this.next}
                        >
                            {this.state.json['jf6005-000006']}{/* 国际化处理： 下一步*/}
                        </NCButton>
                        <NCButton
                            colors={steps !== 2 ? "secondary" : "primary"}
                            disabled={steps !== 2}
                            // onClick={this.verifyOnlyInfo}
                        >
                            {this.state.json['jf6005-000007']}{/* 国际化处理： 确认*/}
                        </NCButton>
                        <NCButton
                            colors="secondary"
                            onClick={this.closeInfoModal}
                        >
                            {this.state.json['jf6005-000008']}{/* 国际化处理： 取消*/}
                        </NCButton>
                    </NCModalFooter>
                );
            case 1:
                return (
                    <NCModalFooter>
                        <NCButton
                            colors="secondary"
                            onClick={this.last}
                        >
                            {this.state.json['jf6005-000009']}{/* 国际化处理： 上一步*/}
                        </NCButton>
                        <NCButton
                            colors="secondary"
                            onClick={this.next}>
                            {this.state.json['jf6005-000006']}{/* 国际化处理： 下一步*/}
                        </NCButton>
                        <NCButton
                            colors={steps !== 2 ? "secondary" : "primary"}
                            disabled={steps !== 2}
                            // onClick={this.verifyOnlyInfo}
                        >
                            {this.state.json['jf6005-000007']}{/* 国际化处理： 确认*/}
                        </NCButton>
                        <NCButton
                            colors="secondary"
                            onClick={this.closeInfoModal}
                        >
                            {this.state.json['jf6005-000008']}{/* 国际化处理： 取消*/}
                        </NCButton>
                    </NCModalFooter>
                );
            case 2:
                return (
                    <NCModalFooter>
                        <NCButton
                            colors="secondary"
                            onClick={this.last}
                        >
                            {this.state.json['jf6005-000009']}{/* 国际化处理： 上一步*/}
                        </NCButton>
                        <NCButton
                            colors={steps !== 2 ? "secondary" : "primary"}
                            disabled={steps !== 2}
                            onClick={this.complete}>
                            {this.state.json['jf6005-000007']}{/* 国际化处理： 确认*/}
                        </NCButton>
                        <NCButton
                            colors="secondary"
                            onClick={this.closeInfoModal}
                        >
                            {this.state.json['jf6005-000008']}{/* 国际化处理： 取消*/}
                        </NCButton>
                    </NCModalFooter>
                );
            default:
                return <div></div>
        }
    }

    render() {
        const {
            copyModalVisible,
            editTable
        } = this.props;
        const {
            stepsCurrent
        } = this.state;
        const selectBeforeData = [
            {
                key: this.state.json['jf6005-000351'],//目标业务单元编码
                value: '$1$'
            },
            {
                key: this.state.json['jf6005-000352'],//"目标业务单元中上级部门编码",
                value: '$2$'
            }
        ];
        const selectAfterData = [
            {
                key: this.state.json['jf6005-000353'],//"目标业务单元名称",
                value: '$1$'
            },
            {
                key: this.state.json['jf6005-000354'],//"目标业务单元简称",
                value: '$2$'
            },
            {
                key: this.state.json['jf6005-000355'],//"目标业务单元中上级部门名称",
                value: '$3$'
            }
        ];
        return (
            <NCModal
                backdrop="static"
                show={copyModalVisible}
                size="lg"
                className="dept-copy-modal"
                onHide={this.closeInfoModal}
                onEntered={this.showHandle}
            >
                <NCModalHeader
                    closeButton={true}
                >
                    {this.state.json['jf6005-000011']}{/* 国际化处理： 部门复制*/}
                </NCModalHeader>
                <NCModalBody>
                    <div className={'copy-modal-header'}>
                        <NCSteps current={stepsCurrent} finishStatus="success">
                            <NCStep title={this.state.json['jf6005-000001']} description=""/>{/* 国际化处理： 选择源部门*/}
                            <NCStep title={this.state.json['jf6005-000002']} description=""/>{/* 国际化处理： 复制规则设置*/}
                            <NCStep title={this.state.json['jf6005-000003']} description=""/>{/* 国际化处理： 目标部门设置*/}
                        </NCSteps>
                    </div>
                    <div className={'copy-modal-warp'}>
                        {stepsCurrent === 0 ? <div className={'first-step'}>

                            <div className={'chooseCopyDept'}>
                                <div className={`${THEME.fontc}`}>
                                    {this.state.json['jf6005-000356']}{/* 国际化处理： 源部门所在业务单元*/}
                                </div>
                                <AddRefer
                                    {...{
                                        refcode: '/uapbd/refer/org/AdminOrgDefaultTreeRef/index',
                                        value: this.state.sourceUnit,
                                        onChange: this.sourceUnitChange.bind(this),
                                        queryCondition: () => {
                                            return {
                                                "TreeRefActionExt": "nccloud.web.hr.sqlbuilder.HRPrimaryOrgSQLBuilder",
                                                controlType: 2,
                                                isShowDisable: false
                                            }
                                        }
                                    }}
                                />
                                <NCCheckbox checked={this.state.copyModalConAllSub} onChange={
                                    this.containAllSub.bind(this)
                                }>{this.state.json['jf6005-000013']}</NCCheckbox>{/* 国际化处理： 包含所有下级*/}
                            </div>
                            <Transfer
                                {...this.props}
                                TransferId={'disapp'}
                                title={{
                                    left: this.state.json['jf6005-000004'],
                                    right: this.state.json['jf6005-000005']
                                }}/* 国际化处理： 请选择源部门,已选部门*/
                                leftTreeData={this.state.transferData.leftTreeData}
                                rightTreeData={this.state.transferData.rightTreeData}
                                value={this.state.transferData}
                                // disableBtns={true}
                                // searchValue={this.state.searchValue}
                                // leftSearch= {(val) =>{
                                //     console.log('sssss',val)
                                // }}
                                // treeType="VRFusion"
                                // onlySelf
                                selectType={this.state.selectType}
                            />
                        </div> : null}
                        <div className={'second-step'} style={{display: stepsCurrent === 1 ? "" : "none"}}>
                            <div className={'second-step-head'}>
                                {/* 国际化处理： 待复制部门列表*/}
                                <div className={`second-step-table-title ${THEME.fontc}`}>
                                    {this.state.json['jf6005-000014']}
                                </div>
                                <div className="table-box">
                                    {
                                        editTable.createEditTable('deptAdjust', {
                                            showIndex: false,
                                            cancelCustomRightMenu: true,
                                            onRowDoubleClick: (record, index, e, f) => {
                                                this.props.editTable.openModel('deptAdjust', 'edit', record, index);
                                            },
                                            onCloseModel: this.closeTableModel.bind(this, 'deptAdjust'),
                                            tableModelConfirm: this.closeTableModel.bind(this, 'deptAdjust'),
                                            height: 150,
                                            // onAfterEvent:this.onTableModelAfterEdit.bind(this)
                                        })
                                    }
                                </div>
                            </div>
                            <div className={'second-step-foot'}>
                                <div className={'second-step-foot-select'}>
                                    {/* 国际化处理： 目标部门编码前缀*/}
                                    <div className={`second-step-foot-select-title ${THEME.fontc}`}>
                                        {this.state.json['jf6005-000015']}
                                    </div>
                                    <div className={'second-step-foot-input-select'}>
                                        <NCSelectTag
                                            showSearch={true}
                                            className={'second-step-foot-select-input'}
                                            style={{width: '100%'}}
                                            placeholder=" "
                                            value={this.state.codePrefix}
                                            onChange={(val) => {
                                                this.codePrefixType = val;
                                                let value = val;
                                                selectBeforeData.map(item => {
                                                    if (item.value === val) {
                                                        value = item.key
                                                    }
                                                });
                                                this.setState({
                                                    codePrefix: value
                                                });
                                            }}
                                            // onChange={this.codePrefixChange.bind(this)}
                                            data={selectBeforeData}
                                        />
                                    </div>
                                </div>
                                <div className={'second-step-foot-select'}>
                                    {/* 国际化处理： 目标名称编码前缀*/}
                                    <div className={`second-step-foot-select-title ${THEME.fontc}`}>
                                        {this.state.json['jf6005-000016']}
                                    </div>
                                    <div className={'second-step-foot-input-select'}>
                                        <NCSelectTag
                                            className={'second-step-foot-select-input'}
                                            style={{width: '100%'}}
                                            value={this.state.namePrefix}
                                            onChange={(val) => {
                                                this.namePrefixType = val;
                                                let value = val;
                                                selectAfterData.map(item => {
                                                    if (item.value === val) {
                                                        value = item.key
                                                    }
                                                });
                                                this.updateState({
                                                    namePrefix: value
                                                });
                                            }}
                                            // onChange={this.namePrefixChange.bind(this)}
                                            data={selectAfterData}
                                        />
                                    </div>

                                </div>
                                <div className={'second-step-foot-select'}>
                                    {/* 国际化处理： 目标部门成立时间*/}
                                    <div className={`second-step-foot-select-title ${THEME.fontc}`}>
                                        {this.state.json['jf6005-000017']}
                                    </div>
                                    <NCDatePicker
                                        value={this.state.dateValue}
                                        onChange={this.handelDateChange.bind(this)}
                                    >
                                    </NCDatePicker>
                                </div>
                            </div>
                        </div>
                        <div className={'third-step'} style={{display: stepsCurrent === 2 ? "" : "none"}}>
                            <div className={'choose-target-unit'}>
                                <div className={THEME.fontc}>
                                    {this.state.json['jf6005-000357']}{/* 国际化处理： 选择目标业务单元*/}
                                </div>
                                <AddRefer
                                    {...{
                                        refcode: '/uapbd/refer/org/AdminOrgDefaultTreeRef/index',
                                        isMultiSelectedEnabled: true,
                                        value: this.state.targetUnit,
                                        onChange: this.targetUnitChange.bind(this),
                                        queryCondition: () => {
                                            return {
                                                "TreeRefActionExt": "nccloud.web.hr.sqlbuilder.HRPrimaryOrgSQLBuilder",
                                                controlType: 2,
                                                isShowDisable: false
                                            }
                                        }
                                    }}
                                />
                                <NCCheckbox checked={this.state.isCopyPostInfo} onChange={
                                    this.copyPostInfoChange.bind(this)
                                }>{this.state.json['jf6005-000358']}</NCCheckbox>{/* 国际化处理： 是否同事复制岗位信息*/}
                            </div>
                            <div className={'third-step-tables'}>
                                <div className={'third-step-table-box'}>
                                    {/* 国际化处理： 目标业务单元列表*/}
                                    <div className={`third-step-table-title ${THEME.fontc}`}>
                                        {this.state.json['jf6005-000018']}
                                    </div>
                                    <div className="table-box" ref={node => this.tableBox1 = node}>
                                        {
                                            editTable.createEditTable('targetOrg', {
                                                showIndex: true,
                                                cancelCustomRightMenu: true,
                                                onRowDoubleClick: (record, index, e, f) => {
                                                    this.transferPostTableBeforeEdit('targetOrg', record, index);
                                                    this.props.editTable.openModel('targetOrg', 'edit', record, index);
                                                },
                                                onRowClick: this.transferDeptTable.bind(this),
                                                onCloseModel: this.closeTableModel.bind(this, 'targetOrg'),
                                                tableModelConfirm: this.closeTableModel.bind(this, 'targetOrg'),
                                                height: 100,
                                                onAfterEvent: this.onTableAfterEdit.bind(this),
                                                onBeforeEvent: (props, moduleId, item, index, value, record) => {
                                                    this.transferPostTableBeforeEdit('targetOrg', record, index);
                                                    return true
                                                }
                                            })
                                        }
                                    </div>
                                </div>
                                <div className={'third-step-table-box'}>
                                    {/* 国际化处理： 目标部门列表*/}
                                    <div className={`third-step-table-title ${THEME.fontc}`}>
                                        {this.state.json['jf6005-000019']}
                                    </div>
                                    <div className="table-box" ref={node => this.tableBox2 = node}>
                                        {
                                            editTable.createEditTable('targetDept', {
                                                showIndex: true,
                                                cancelCustomRightMenu: true,
                                                onRowDoubleClick: (record, index, e, f) => {
                                                    this.props.editTable.openModel('targetDept', 'edit', record, index);
                                                },
                                                onCloseModel: this.closeTableModel.bind(this, 'targetDept'),
                                                tableModelConfirm: this.closeTableModel.bind(this, 'targetDept'),
                                                height: 100,
                                                onAfterEvent: this.transferPostTableAfterEdit.bind(this)
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </NCModalBody>
                {this.footer()}
            </NCModal>
        );
    }
}

export default CopyModal
