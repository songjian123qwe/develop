/**
 * 组织版本化
 */
import React, {Component} from 'react';

import './index.less';

import {
    base,
    toast
} from 'nc-lightapp-front';
import AOSDeptRef from "../../../../refer/jfref/AOSDeptRef";
import HRDeptTreeRef from "../../../../refer/jfref/HRDeptTreeRef";
import SelectPostAction from "./functions/SelectPostAction";

import HRTree from '../../../../public/components/hrTree/index';
import DeptRefSelAction from "./functions/DeptRefSelAction";
import DeptQuerySelAction from "./functions/DeptQuerySelAction";
import CopyRenameStepAction from "./functions/CopyRenameStepAction";
import CopyConfirmStepAction from "./functions/CopyConfirmStepAction";
import CopyCancelAction from "./functions/CopyCancelAction";
import CopyExecAction from "./functions/CopyExecAction";
import {saveValidate} from "../../../../public/functions/orgtools";

const {
    NCCheckbox,
    NCModal,
    NCButton,
    NCStep
} = base;
const NCSteps = NCStep.NCSteps;
const {
    Header: NCModalHeader,
    Body: NCModalBody,
    Footer: NCModalFooter
} = NCModal;

const copySearchId = 'deptquery';

class CopyModal extends Component {
    constructor(props) {
        super(props);
        this.pk_dept = '';
        this.selDeptPks = '';
        this.state = {
            json: props.json,
            inlt: props.json,
            stepsCurrent: 0, // 选择 步骤
            checkStrictly: false, // 第一步 是否包含所有下级
            pkDeptObj: null,
            searchModalValue: null,
            deptRefObj: null, //部门参照
            deptTreeData: [],
            selectedTree: [],
            deptTreeConfig: {},
            transferData: {
                leftTreeData: [],
                rightTreeData: []
            }
        };
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
            this.setState({
                json: nextprops.json,
                inlt: nextprops.inlt,
                deptTreeConfig: {
                    root: {
                        title: nextprops.json['jf6005-000373'],  /* 岗位*/
                        key: 'null'
                    },
                    showLine: true,
                    checkStrictly: true,
                    defaultExpandAll: true,
                    checkable: true
                }
            })
        }
    }

    componentDidMount() {
        this.createTree();
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
        this.updateState({
            stepsCurrent: 0, // 选择 步骤
            pkDeptObj: null, // 选择源部门
            deptTreeConfig: {
                root: {
                    title: this.state.json['jf6005-000373'],  /* 岗位*/
                    key: 'null'
                },
                showLine: true,
                checkStrictly: true,
                defaultExpandAll: true,
                checkable: true
            },
            checkStrictly: false, // 第一步 是否包含所有下级
        })
    }

    /**
     * 下一步
     */
    next() {
        // 第一步
        if (this.state.stepsCurrent === 0) {
            if (this.state.selectedTree.length <= 0) {
                toast({
                    color: "danger",
                    content: this.state.json['jf6005-000376']/* 国际化处理： 请先择源岗位！*/
                });
                return
            }
            let step = this.state.stepsCurrent + 1;
            this.updateState({
                stepsCurrent: step
            });
        }
        // 第二步
        if (this.state.stepsCurrent === 1) {
            let tableobj = this.props.editTable.getCheckedRows('deptsel');
            if (tableobj.length <= 0) {
                toast({
                    color: "danger",
                    content: this.state.json['jf6005-000377']/* 国际化处理： 请先择部门！*/
                });
                return
            }
            this.copyRenameStepAction(() => {
                let step = this.state.stepsCurrent + 1;
                this.updateState({
                    stepsCurrent: step
                });
            });
        }
        // 第三步
        if (this.state.stepsCurrent === 2) {
            // let tableobj = this.props.editTable.getCheckedRows('deptsel');
            // if (tableobj.length <= 0) {
            //     toast({
            //         color: "danger",
            //         content: this.state.json['jf6005-000377']/* 国际化处理： 请先择部门！*/
            //     });
            //     return
            // }
            this.copyConfirmStepAction(() => {
                let step = this.state.stepsCurrent + 1;
                this.updateState({
                    stepsCurrent: step
                });
            });
        }
    }

    /**
     * 下一步
     */
    last() {
        let step = this.state.stepsCurrent - 1;
        this.updateState({
            stepsCurrent: step
        });
    }

    /**
     * 完成
     */
    complete() {
        let selectRows = this.props.editTable.getCheckedRows('copyConfirmStep');
        selectRows = selectRows.map(item => {
            return item.data
        });
        // 检测
        if (selectRows.length <= 0) {
            toast({
                color: "danger",
                content: this.state.json['jf6005-000386']/* 国际化处理： 请选择岗位！*/
            });
            return
        }
        if (!this.props.editTable.checkRequired('copyConfirmStep', selectRows)) {
            return
        }
        this.copyExecAction();
    }

    /**
     * 部门业务单元选择
     * @param val
     */
    hrDeptChange(val) {
        this.updateState({
            pkDeptObj: val
        }, () => {
            this.selectPostAction()
        });
    }

    /**
     * 部门参照查询
     * @param val
     */
    hrDeptTreeChange(val) {
        this.updateState({
            deptRefObj: val
        }, () => {
            this.deptRefSelAction()
        });
    }

    /**
     * 复制第一步 是否包含下级业务单元
     * @param val
     */
    containAllSub(val) {
        this.updateState({
            checkStrictly: val,
        }, () => {

        })
    }

    updateState(data, cb = () => {
    }) {
        this.setState(data, cb);
    }

    /**
     * 搜索dom点击查找
     */
    goSearch(props, searchData, type, queryInfo) {
        // searchData.conditions  []
        let data = this.props.search.getQueryInfo(copySearchId, true);

        this.updateState({
            searchModalValue: data
        }, () => {
            this.deptQuerySelAction();
            // 关闭查询区
            this.props.search.openAdvSearch(copySearchId, false);
        });
    }

    /**
     * 查询部门下岗位信息
     */
    selectPostAction() {
        let pk_dept = this.state.pkDeptObj.refpk;
        this.pk_dept = pk_dept;
        SelectPostAction(pk_dept).then(res => {
            if (!res.data) return;
            this.updateState({
                deptTreeData: res.data
            });
            // this.createTree(res.data);
        })
    }

    /**
     * 创建导航栏
     */
    createTree(deptTreeData = []) {
        this.updateState({
            deptTreeData
        })
    }

    /**
     *  部门参照查询
     */
    deptRefSelAction() {
        let selDeptPks;
        let selDeptArr = [];
        this.state.deptRefObj.map(item => {
            selDeptArr.push(item.refpk)
        });
        selDeptPks = selDeptArr.join(',');
        DeptRefSelAction(selDeptPks).then(res => {
            if (!res.data) return;
            let rows = this.props.editTable.getAllRows('deptsel');
            let nowRows = res.data.deptsel.deptsel.rows;
            let unRepeatRows = nowRows.filter(item => {
                return rows.every(item2 => {
                    return item2.values.pk_dept.value !== item.values.pk_dept.value
                })
            });
            res.data.deptsel.deptsel.rows = rows.concat(unRepeatRows);
            this.setDeptselTable(res);
        })
    }

    /**
     *  部门条件查询
     */
    deptQuerySelAction() {
        let postData = {
            conditions: [],
            func_type: 1,
            include_child_depts: false,
            include_child_orgs: false,
            is_show_hrcanceled: false,
            logic: 'and',
            node_type: "ORG_NODE",
            oid: null,
            pk_org: this.props.queryActionPkorg,
            show_all_info: false,
            show_on_job_psn: false,
            tree_node_id: ''
        };
        let searchModalValue= this.state.searchModalValue;
        if(!searchModalValue){
            searchModalValue = this.props.search.getQueryInfo(copySearchId, true);
        }
        Object.assign(postData, searchModalValue);
        DeptQuerySelAction(postData).then(res => {
            if (!res.data) return;
            this.setDeptselTable(res);
        })
    }

    /**
     * 设置数据
     */
    setDeptselTable(res) {
        this.props.editTable.setTableData('deptsel', res.data.deptsel.deptsel);
        this.props.editTable.selectAllRows('deptsel', true);
    }

    /**
     * 设置目标部门更名信息(设置替换内容)
     */
    copyRenameStepAction(cb) {
        let pk_dept, selDeptPks;
        pk_dept = this.pk_dept;
        let selectRows = this.props.editTable.getCheckedRows('deptsel');
        let selDeptPkArr = [];
        selectRows.map(item => {
            if (item.data.values.hasOwnProperty('pk_dept')) {
                selDeptPkArr.push(item.data.values.pk_dept.value);
            }
        });
        selDeptPks = selDeptPkArr.join(',');
        this.selDeptPks = selDeptPks;
        CopyRenameStepAction(pk_dept, selDeptPks).then(res => {
            if (cb && typeof cb === 'function') {
                cb();
            }
            if (!res.data) return;
            this.props.editTable.setTableData('copyRenameStep', res.data.copyRenameStep.copyRenameStep);
        })
    }

    /**
     * 确认复制岗位信息
     */
    copyConfirmStepAction(cb) {
        let copyRenameStep, pk_dept, selDeptPks, selPostPks;
        copyRenameStep = this.props.editTable.getAllData('copyRenameStep');
        pk_dept = this.pk_dept;
        selDeptPks = this.selDeptPks;
        selPostPks = this.state.selectedTree.join(',');
        CopyConfirmStepAction(copyRenameStep, pk_dept, selDeptPks, selPostPks).then(res => {
            if (cb && typeof cb === 'function') {
                cb();
            }
            if (!res.data) return;
            if (res.data.autoCodeMap) {
                this.autoCodeMap = res.data.autoCodeMap;
            }
            this.props.editTable.setTableData('copyConfirmStep', res.data.copyConfirmStep.copyConfirmStep);
        })
    }

    /**
     * 复制 取消
     */
    copyCancelAction() {
        CopyCancelAction(this.autoCodeMap).then(res => {
            this.closeInfoModal();
        })
    }

    closeTableModel(thistableid) {
        this.props.editTable.setStatus(thistableid, 'browse')
    }

    /**
     * 复制 执行
     */
    copyExecAction() {
        let tableId = 'copyConfirmStep';
        let copyConfirmStep = {
            "areaType": "table",
            rows: []
        };
        let selectRows = this.props.editTable.getCheckedRows(tableId);
        selectRows.map(item => {
            copyConfirmStep.rows.push(item.data)
        });
        let pageid = tableId;
        let templateid = this.props.pageidObj[tableId];
        saveValidate(this.props, pageid, tableId, null, 'grid', 'editTable',templateid,(cardData)=>{
            cardData.gridModel.rows = copyConfirmStep.rows;
            return cardData
        }).then(()=>{
            CopyExecAction(copyConfirmStep).then(res => {
                this.props.refresh();
                this.closeInfoModal();
            })
        })
    }

    cancel() {
        this.copyCancelAction();
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
                            colors={steps !== 3 ? "secondary" : "primary"}
                            disabled={steps !== 3}
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
                            colors={steps !== 3 ? "secondary" : "primary"}
                            disabled={steps !== 3}
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
                            colors="secondary"
                            onClick={this.next}>
                            {this.state.json['jf6005-000006']}{/* 国际化处理： 下一步*/}
                        </NCButton>
                        <NCButton
                            colors={steps !== 3 ? "secondary" : "primary"}
                            disabled={steps !== 3}
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
            case 3:
                return (
                    <NCModalFooter>
                        <NCButton
                            colors="secondary"
                            onClick={this.last}
                        >
                            {this.state.json['jf6005-000009']}{/* 国际化处理： 上一步*/}
                        </NCButton>
                        <NCButton
                            colors={steps !== 3 ? "secondary" : "primary"}
                            disabled={steps !== 3}
                            onClick={this.complete}>
                            {this.state.json['jf6005-000007']}{/* 国际化处理： 确认*/}
                        </NCButton>
                        <NCButton
                            colors="secondary"
                            onClick={this.cancel.bind(this)}
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
            editTable,
            search
        } = this.props;
        const {
            stepsCurrent
        } = this.state;
        return (
            <NCModal
                backdrop="static"
                show={copyModalVisible}
                size="lg"
                className="post-copy-modal"
                onHide={this.closeInfoModal}
            >
                <NCModalHeader
                    closeButton={true}
                >
                    {this.state.json['jf6005-000372']}{/* 国际化处理： 复制岗位*/}
                </NCModalHeader>
                <NCModalBody>
                    <div className={'copy-modal-header'}>
                        <NCSteps current={stepsCurrent} finishStatus="success">
                            <NCStep title={this.state.json['jf6005-000367']} description=""/>{/* 国际化处理： 选择岗位*/}
                            <NCStep title={this.state.json['jf6005-000368']} description=""/>{/* 国际化处理： 选择目标部门*/}
                            <NCStep title={this.state.json['jf6005-000369']} description=""/>{/* 国际化处理： 设置替换内容*/}
                            <NCStep title={this.state.json['jf6005-000370']} description=""/>{/* 国际化处理： 确认替换结果*/}
                        </NCSteps>
                    </div>
                    <div className={'copy-modal-warp'}>
                        <div className={'first-step'} style={{display: stepsCurrent === 0 ? '' : 'none'}}>

                            <div className={'chooseCopyDept'}>
                                <div>
                                    {this.state.json['jf6005-000001']}{/* 国际化处理： 选择源部门*/}
                                </div>
                                {
                                    AOSDeptRef({
                                        value: this.state.pkDeptObj,
                                        isMultiSelectedEnabled: false,
                                        onChange: this.hrDeptChange.bind(this)
                                    })
                                }
                                <NCCheckbox checked={this.state.checkStrictly} onChange={
                                    this.containAllSub.bind(this)
                                }>{this.state.json['jf6005-000013']}</NCCheckbox>{/* 国际化处理： 包含所有下级*/}
                            </div>
                            <div className={'choose-dept-tree'}>
                                <div>{this.state.json['jf6005-000371']}</div>
                                {/* 国际化处理： 选择源部门待选岗位*/}
                                <div className={'dept-tree'}>
                                    <HRTree
                                        treeData={this.state.deptTreeData}
                                        config={{
                                            root: {
                                                title: this.state.json['jf6005-000373'],  /* 岗位*/
                                                refpk: 'null',  /* 岗位*/
                                            },
                                            showLine: true,
                                            checkStrictly: !this.state.checkStrictly,
                                            defaultExpandAll: true,
                                            checkable: true,
                                            onCheck: (checkedKeys) => {
                                                let keys = Array.isArray(checkedKeys)?checkedKeys:checkedKeys.checked;
                                                let selectedTree = keys.filter(key => {
                                                    return key !== '0-0'
                                                });
                                                this.setState({
                                                    selectedTree
                                                })
                                            }
                                        }}
                                        checkedKeys={this.state.selectedTree}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={'second-step'} style={{display: stepsCurrent === 1 ? '' : 'none'}}>
                            <div className={'second-step-head'}>
                                <NCButton
                                    colors="secondary"
                                    onClick={() => {
                                        this.deptTree.click();
                                    }}
                                >
                                    {this.state.json['jf6005-000374']}{/* 国际化处理： 参照选择*/}
                                </NCButton>
                                <NCButton
                                    colors="primary"
                                    onClick={() => {
                                        this.props.search.openAdvSearch(copySearchId, true);
                                    }}
                                >
                                    {this.state.json['jf6005-000375']}{/* 国际化处理： 条件选择*/}
                                </NCButton>
                            </div>

                            {
                                HRDeptTreeRef({
                                    clickContainer: <div
                                        ref={(node) => {
                                            this.deptTree = node;
                                        }}
                                    ></div>,
                                    isMultiSelectedEnabled: true,
                                    value: this.props.deptRefObj,
                                    queryCondition: () => {
                                        return {
                                            "pk_hrorg": this.props.queryActionPkorg,
                                        }
                                    },
                                    onChange: this.hrDeptTreeChange.bind(this)
                                })
                            }

                            {/* search */}
                            <div style={{display: 'none'}}>
                                {search.NCCreateSearch(copySearchId, {
                                    clickSearchBtn: this.goSearch.bind(this),
                                    onlyShowAdvArea: false,
                                    showAdvSearchPlanBtn: true,
                                    saveSearchPlan: true,
                                    onlyShowSuperBtn: true,
                                    replaceSuperBtn: this.state.json['jf6005-000063']/* 国际化处理： 查询*/
                                })}
                            </div>

                            <div className={'table-box'}>
                                {
                                    editTable.createEditTable('deptsel', {
                                        showIndex: true,
                                        cancelCustomRightMenu: true,
                                        showCheck: true,
                                        // onAfterEvent:this.onTableModelAfterEdit.bind(this)
                                    })
                                }
                            </div>
                        </div>
                        <div className={'third-step'} style={{display: stepsCurrent === 2 ? '' : 'none'}}>
                            <div className={'table-box1'}>
                                {
                                    editTable.createEditTable('copyRenameStep', {
                                        showIndex: true,
                                        cancelCustomRightMenu: true,
                                        showCheck: false,
                                        onRowDoubleClick: (record, index, e, f) => {
                                            this.props.editTable.openModel('copyRenameStep', 'edit', record, index);
                                        },
                                        onCloseModel: this.closeTableModel.bind(this, 'copyRenameStep'),
                                        tableModelConfirm: this.closeTableModel.bind(this, 'copyRenameStep'),
                                        // onAfterEvent:this.onTableModelAfterEdit.bind(this)
                                    })
                                }
                            </div>
                        </div>
                        <div className={'third-step'} style={{display: stepsCurrent === 3 ? '' : 'none'}}>
                            {
                                editTable.createEditTable('copyConfirmStep', {
                                    showIndex: true,
                                    cancelCustomRightMenu: true,
                                    showCheck: true,
                                    onRowDoubleClick: (record, index, e, f) => {
                                        this.props.editTable.openModel('copyConfirmStep', 'edit', record, index);
                                    },
                                    onCloseModel: this.closeTableModel.bind(this, 'copyConfirmStep'),
                                    tableModelConfirm: this.closeTableModel.bind(this, 'copyConfirmStep'),
                                    // onAfterEvent:this.onTableModelAfterEdit.bind(this)
                                })
                            }
                        </div>
                    </div>

                </NCModalBody>
                {this.footer()}
            </NCModal>
        );
    }
}

export default CopyModal
