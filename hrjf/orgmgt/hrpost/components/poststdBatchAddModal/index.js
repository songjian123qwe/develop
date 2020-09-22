/**
 * 按职务新增
 */
import React, {Component} from 'react';

import './index.less';

import {
    base,
    toast
} from 'nc-lightapp-front';
import HRDeptTreeRef from "../../../../refer/jfref/HRDeptTreeRef";
import HRTree from '../../../../public/components/hrTree/index'
import DeptRefSelAction from "../copyModal/functions/DeptRefSelAction";
import DeptQuerySelAction from "../copyModal/functions/DeptQuerySelAction";
import PostStdQueryStepAction from "./functions/PostStdQueryStepAction";
import MultiSelectPostByStdStepAction from "./functions/MultiSelectPostByStdStepAction";
import ConfirmByStdStepAction from "./functions/ConfirmByStdStepAction";
import BatchAddExecAction from "../jobBatchAddModal/functions/BatchAddExecAction";
import BatchAddCancelAction from "../jobBatchAddModal/functions/BatchAddCancelAction";
import {treeToObj} from "../../../../public/functions/treeToObj";
import {addGray} from "../jobBatchAddModal/functions/toos";
import {saveValidate} from "../../../../public/functions/orgtools";

const {
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

class PoststdBatchAddModal extends Component {
    constructor(props) {
        super(props);
        this.selectedTree = [];
        this.pk_dept = '';
        this.selDeptPks = '';
        this.state = {
            json: props.json,
            inlt: props.json,
            stepsCurrent: 0, // 选择 步骤
            pkDeptObj: null,
            searchModalValue: null,
            deptRefObj: null, //部门参照
            deptTreeData: [],
            deptTreeDataObj: null,
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
                inlt: nextprops.inlt
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
            poststdBatchAddVisible: false
        });
        this.initParam();
    }

    /**
     * 初始化参数
     */
    initParam() {
        this.props.editTable.setTableData('deptsel', {rows: []});
        this.updateState({
            stepsCurrent: 0, // 选择 步骤
            deptTreeData: [],
            deptTreeDataObj: null,
        })
    }

    /**
     * 下一步
     */
    next() {
        // 第一步
        if (this.state.stepsCurrent === 0) {
            let tableobj = this.props.editTable.getCheckedRows('deptsel');
            if (tableobj.length <= 0) {
                toast({
                    color: "danger",
                    content: this.state.json['jf6005-000377']/* 国际化处理： 请选择部门！*/
                });
                return
            }

            this.getTreeData(() => {
                let step = this.state.stepsCurrent + 1;
                this.updateState({
                    stepsCurrent: step
                });
            });
        }
        // 第二步
        if (this.state.stepsCurrent === 1) {
            if (this.selectedTree.length <= 0) {
                toast({
                    color: "danger",
                    content: this.state.json['jf6005-000389']/* 国际化处理： 请选择基准岗位！*/
                });
                return
            }
            this.multiSelectPostByStdStepAction(() => {
                let step = this.state.stepsCurrent + 1;
                this.updateState({
                    stepsCurrent: step
                });
            });
        }
        // 第三步
        if (this.state.stepsCurrent === 2) {
            let tableobj = this.props.editTable.getCheckedRows('multiSelectPostByStd');
            if (tableobj.length <= 0) {
                toast({
                    color: "danger",
                    content: this.state.json['jf6005-000386']/* 国际化处理： 请选择岗位！*/
                });
                return
            }
            this.confirmByStdStepAction(() => {
                this.props.editTable.setStatus('confirmByStdStep', 'edit');
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
        let rows = this.props.editTable.getAllRows("confirmByStdStep");
        // 检测
        if (!this.props.editTable.checkRequired("confirmByStdStep", rows)) {
            return
        }
        this.batchAddExecAction();
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
     * 获取 树的数据
     */
    getTreeData(cb) {
        PostStdQueryStepAction().then(res => {
            if (cb && typeof cb === 'function') {
                cb()
            }
            if (!res.data) return;
            if (!Array.isArray(res.data)) {
                return
            }
            this.state.deptTreeDataObj = treeToObj(res.data, 'refpk');
            // 用字体颜色区分树中的基准岗位和岗位序列
            addGray(res.data, 'pk_post');
            this.setState({
                deptTreeData: res.data
            })
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
        let searchModalValue= this.state.searchModalValue;
        if(!searchModalValue){
            searchModalValue = this.props.search.getQueryInfo(copySearchId, true);
        }
        let postData = {
            func_type: 1,
            include_child_depts: false,
            include_child_orgs: false,
            is_show_hrcanceled: false,
            logic: 'and',
            node_type: "ORG_NODE",
            oid: this.props.queryOid,
            pk_org: this.props.queryActionPkorg,
            show_all_info: false,
            show_on_job_psn: false,
            ...searchModalValue
        };
        DeptQuerySelAction(postData).then(res => {
            if (!res.data) return;
            this.setDeptselTable(res);
        })
    }

    /**
     * 设置数据
     */
    setDeptselTable(res) {
        if(res.data.deptsel){
            this.props.editTable.setTableData('deptsel', res.data.deptsel.deptsel);
            this.props.editTable.selectAllRows('deptsel', true);
        }else{
            this.props.editTable.setTableData('deptsel', {rows:[]});
        }
    }

    /**
     * 选择岗位
     */
    multiSelectPostByStdStepAction(cb) {
        let selDeptPks, selPostPks;
        selDeptPks = this.getSelDeptPks();
        selPostPks = this.selectedTree.join(',');
        MultiSelectPostByStdStepAction(selDeptPks, selPostPks).then(res => {
            if (cb && typeof cb === 'function') {
                cb();
            }
            if (!res.data) return;
            this.props.editTable.setTableData('multiSelectPostByStd', res.data.multiSelectPostByStd.multiSelectPostByStd);
        })
    }

    /**
     * 确认岗位
     */
    confirmByStdStepAction(cb) {
        let multiSelectPostByStd = {
            "areaType": "table",
            rows: []
        };

        let selectRows = this.props.editTable.getCheckedRows('multiSelectPostByStd');
        selectRows.map(item => {
            multiSelectPostByStd.rows.push(item.data)
        });
        ConfirmByStdStepAction(multiSelectPostByStd).then(res => {
            if (cb && typeof cb === 'function') {
                cb();
            }
            if (!res.data) return;
            if (res.data.autoCodeMap) {
                this.autoCodeMap = res.data.autoCodeMap;
            }
            this.props.editTable.setTableData('confirmByStdStep', res.data.confirmByStdStep.confirmByStdStep);
        })
    }

    /**
     *  批增  执行
     */
    batchAddExecAction() {
        let tableId = 'confirmByStdStep';

        let templateid = this.props.pageidObj[tableId];
        saveValidate(this.props, tableId, tableId, null, 'grid', 'editTable',templateid).then(()=>{
            let postinf = this.props.editTable.getAllData(tableId);
            BatchAddExecAction(postinf,'PostStd').then(res => {
                toast({
                    color: "success",
                    content: this.state.json['jf6005-000392']/* 国际化处理： 按基准岗位批增成功！*/
                });
                this.props.refresh();
                this.closeInfoModal();
            })
        })
    }

    /**
     * 批增  取消
     */
    batchAddCancelAction() {
        BatchAddCancelAction(this.autoCodeMap).then(res => {
            this.closeInfoModal();
        })
    }

    /**
     * 获取部门pk
     * @returns {string}
     */
    getSelDeptPks() {
        let selectRows = this.props.editTable.getCheckedRows('deptsel');
        let selDeptPkArr = [];
        selectRows.map(item => {
            if (item.data.values.hasOwnProperty('pk_dept')) {
                selDeptPkArr.push(item.data.values.pk_dept.value);
            }
        });
        return selDeptPkArr.join(',');
    }

    closeTableModel(thistableid) {
        this.props.editTable.setStatus(thistableid, 'browse')
    }

    cancel() {
        this.batchAddCancelAction()
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
            poststdBatchAddVisible,
            editTable,
            search
        } = this.props;
        const {
            stepsCurrent
        } = this.state;
        return (
            <NCModal
                backdrop="static"
                show={poststdBatchAddVisible}
                size="lg"
                className="post-poststd-add-modal"
                onHide={this.closeInfoModal}
            >
                <NCModalHeader
                    closeButton={true}
                >
                    {this.state.json['jf6005-000387']}{/* 国际化处理： 按基准岗位批增*/}
                </NCModalHeader>
                <NCModalBody>
                    <div className={'copy-modal-header'}>
                        <NCSteps current={stepsCurrent} finishStatus="success">
                            <NCStep title={this.state.json['jf6005-000025']} description=""/>{/* 国际化处理： 选择部门*/}
                            <NCStep title={this.state.json['jf6005-000388']} description=""/>{/* 国际化处理： 选择基准岗位*/}
                            <NCStep title={this.state.json['jf6005-000382']} description=""/>{/* 国际化处理： 选择需要生成的岗位*/}
                            <NCStep title={this.state.json['jf6005-000383']} description=""/>{/* 国际化处理： 设置编码和名称*/}
                        </NCSteps>
                    </div>
                    <div className={'copy-modal-warp'}>
                        <div className={'second-step'} style={{display: stepsCurrent === 0 ? '' : 'none'}}>
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
                                            "isShowDisable": false
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
                        <div className={'first-step'} style={{display: stepsCurrent === 1 ? '' : 'none'}}>
                            <div className={'job-tree'}>
                                <HRTree
                                    treeData={this.state.deptTreeData}
                                    config={
                                        {
                                            root: {
                                                title: this.state.json['jf6005-000243'],  /* 基准岗位*/
                                                key: 'null'
                                            },
                                            showLine: true,
                                            checkStrictly: false,
                                            defaultExpandAll: true,
                                            checkable: true,
                                            onCheck: (checkedKeys) => {
                                                this.selectedTree = [];
                                                checkedKeys.map(key => {
                                                    if (this.state.deptTreeDataObj.hasOwnProperty(key)) {
                                                        let values = this.state.deptTreeDataObj[key].nodeData.nodeValue;
                                                        if (values.hasOwnProperty('pk_post')) {
                                                            this.selectedTree.push(key)
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    }
                                />
                            </div>
                        </div>
                        <div className={'third-step'} style={{display: stepsCurrent === 2 ? '' : 'none'}}>
                            <div className={'table-box1'}>
                                {
                                    editTable.createEditTable('multiSelectPostByStd', {
                                        showIndex: true,
                                        cancelCustomRightMenu: true,
                                        showCheck: true,
                                        // onAfterEvent:this.onTableModelAfterEdit.bind(this)
                                    })
                                }
                            </div>
                        </div>
                        <div className={'third-step'} style={{display: stepsCurrent === 3 ? '' : 'none'}}>
                            {
                                editTable.createEditTable('confirmByStdStep', {
                                    showIndex: true,
                                    cancelCustomRightMenu: true,
                                    showCheck: false,
                                    onRowDoubleClick: (record, index, e, f) => {
                                        this.props.editTable.openModel('confirmByStdStep', 'edit', record, index);
                                    },
                                    onCloseModel: this.closeTableModel.bind(this, 'confirmByStdStep'),
                                    tableModelConfirm: this.closeTableModel.bind(this, 'confirmByStdStep'),
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

export default PoststdBatchAddModal
