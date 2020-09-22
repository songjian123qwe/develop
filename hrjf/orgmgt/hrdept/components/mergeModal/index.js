/**
 * 部门合并
 */
import React, {Component} from 'react';

import './index.less';

import {
    base,
    promptBox
} from 'nc-lightapp-front';
import Transfer from "../../../../public/components/transferTable/Transfer";
import MergePostStepAction from "../../functions/MergePostStepAction";
import MergePsnStepAction from "../../functions/MergePsnStepAction";
import MergeDeptCancelAction from "../../functions/MergeDeptCancelAction";
import MergeDeptExecAction from "../../functions/MergeDeptExecAction";
import AddCondition from "../../../../public/functions/addCondition";


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
const formid = 'deptmerge';
const tableid = 'mergedpsninf';

class MergeModal extends Component {
    constructor(props) {
        super(props);

        // 缓存数据
        this.backupPostVO = null;
        this.mergeWrapperVO = null;
        this.savedPostVO = null; // 第三步返回第二部时得到

        // 第二部 新岗位列表数据
        this.newPostData = null; //  []  table.rows

        this.state = {
            json: props.json,
            inlt: props.inlt,
            stepsCurrent: 0, // 选择 步骤
            leftData: {rows: []}, // 第二步 穿梭框 左边的数据
            rightData: {rows: []}, // 第二步 穿梭框 右边的数据
            selectType: 'default', // 穿梭框  从左到右的方式 'onlySelf':自己;    'default':全部包含子节点
        };
        this.closeInfoModal = this.closeInfoModal.bind(this);
        this.next = this.next.bind(this);
        this.last = this.last.bind(this);
        this.complete = this.complete.bind(this);
        this.cancel = this.cancel.bind(this);
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
            })
        }
    }

    /**
     * 关闭模块
     */
    closeInfoModal() {
        this.props.updateState({
            mergeModalVisible: false
        });
        this.initParam();
    }

    /**
     * 初始化参数
     */
    initParam() {
        // 清空表单
        this.props.form.EmptyAllFormValue(formid);

        // 清空缓存数据
        this.backupPostVO = null;
        this.mergeWrapperVO = null;

        this.updateState({
            stepsCurrent: 0, // 选择 步骤
            copyModalConAllSub: false, // 第一步 是否包含所有下级
            selectType: 'default',  // 穿梭框  从左到右的方式 'onlySelf':自己;    'default':全部包含子节点
        })
    }

    /**
     * 下一步
     */
    next() {
        // 第一步    检测form表单
        if (this.state.stepsCurrent === 0) {
            // 表单验证
            if (!this.props.form.isCheckNow(formid)) {
                return
            } else {
                this.mergePostStepAction();
            }
        }
        // 第二步
        if (this.state.stepsCurrent === 1) {
            this.mergePsnStepAction();
        }
    }

    /**
     * 岗位合并 查询
     */
    mergePostStepAction() {
        let deptmerge = this.props.form.getAllFormValue(formid);
        MergePostStepAction.call(this, deptmerge)
    }

    /**
     * 人员合并 查询
     */
    mergePsnStepAction() {
        let deptmerge = this.props.form.getAllFormValue(formid);
        let takeOverpost = this.props.editTable.getAllData('mergedpostinf_r');
        MergePsnStepAction.call(this, this.backupPostVO, deptmerge, this.mergeWrapperVO, this.savedPostVO, takeOverpost)
    }

    /**
     * 上一步
     */
    last() {
        // 第三步
        if (this.state.stepsCurrent === 1) {
            this.mergeDeptCancelAction();
            this.transfer.allToLeft();
        }
        let step = this.state.stepsCurrent - 1;
        this.updateState({
            stepsCurrent: step
        });
    }

    /**
     * 合并取消 从第三步向第二步返回 或 关闭页面的时候用
     */
    mergeDeptCancelAction(callback) {
        MergeDeptCancelAction.call(this, this.backupPostVO, this.mergeWrapperVO, this.savedPostVO, callback)
        this.transfer.allToLeft();
    }

    /**
     * 完成
     */
    complete() {
        let deptmerge = this.props.form.getAllFormValue(formid);
        let mergedpsninf = this.props.editTable.getAllData(tableid);
        MergeDeptExecAction.call(this, this.backupPostVO, deptmerge, this.mergeWrapperVO, this.savedPostVO, mergedpsninf)
    }

    /**
     * 取消按钮
     */
    cancel(closeFlag = false) {
        if (this.state.stepsCurrent > 0) {
            if (closeFlag || this.state.stepsCurrent === 1) {
                // 如果是点击关闭按钮 则没有提示框
                this.transfer.allToLeft();
                this.mergeDeptCancelAction();
                this.closeInfoModal();
                return
            }
            promptBox({
                color: 'warning',               // 提示类别默认"success"， "success"/"info"/"warning"/"danger",非必输
                title: this.state.json['jf6005-000050'],                // 提示标题, 默认不同类别下分别为："已成功"/"帮助信息"/"请注意"/"出错啦",非必输/* 国际化处理： 请注意*/
                content: this.state.json['jf6005-000150'],             // 提示内容,非必输/* 国际化处理： 是否确认取消?*/
                noFooter: false,                // 是否显示底部按钮(确定、取消),默认显示(false),非必输
                noCancelBtn: false,             // 是否显示取消按钮,，默认显示(false),非必输
                beSureBtnName: this.state.json['jf6005-000036'],          // 确定按钮名称, 默认为"确定",非必输/* 国际化处理： 确定*/
                cancelBtnName: this.state.json['jf6005-000008'],         // 取消按钮名称, 默认为"取消",非必输/* 国际化处理： 取消*/
                hasCloseBtn: false,             //显示“X”按钮，默认不显示，不显示是false，显示是true
                beSureBtnClick: () => {
                    this.mergeDeptCancelAction(() => {
                        this.closeInfoModal();
                    });
                },   // 确定按钮点击调用函数,非必输
                // cancelBtnClick: functionCancel,  // 取消按钮点击调用函数,非必输
                // closeBtnClick:functionClose, //关闭按钮点击调用函数，非必输
                closeByClickBackDrop: false,//点击遮罩关闭提示框，默认是false点击不关闭,点击关闭是true
            });
            return
        }
        this.closeInfoModal();
    }

    /**
     * form 表单改变后事件
     * @param props
     * @param moduleI
     * @param key
     * @param value
     */
    onAfterFormEvent(props, moduleI, key, value) {
        // 如果   是否生成新版本  发生改变  则新版本的必输性 随之改变
        if (key === "newVer" && moduleI === formid) {
            props.form.setFormItemsRequired(formid, {'vName': value.value});
            props.form.setFormItemsValue(formid, {'vName': ''});
            props.form.setFormItemsDisabled(formid, {'vName': !value.value});
        }
    }

    /**
     * 转移组件，转移前事件
     * @returns {boolean}
     */
    onBeforeEvents() {
        return true
    }

    /**
     * 穿梭后触发的事件
     * data: {
     *     leftData,
     *     rightData
     * }
     */
    valChange(data) {
        this.newPostData = data.rightData;
        return true
    }

    tableBeforeEvents(props, tableid, item, value, index, record) {
        if (item.attrcode === 'pk_newpost') {
            let pk_newdept = record.values.pk_newdept.value;
            let meta = this.props.meta.getMeta();
            AddCondition(meta[tableid], {
                pk_dept: pk_newdept
            }, item.attrcode);
            this.props.meta.setMeta(meta);
        }
        return true
    }

    closeTableModel() {
        this.props.editTable.setStatus(tableid, 'browse')
    }

    updateState(data, cb = () => {
    }) {
        this.setState(data, cb);
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
                            colors="secondary"
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
                            colors="secondary"
                            disabled={steps !== 2}
                            // onClick={this.verifyOnlyInfo}
                        >
                            {this.state.json['jf6005-000007']}{/* 国际化处理： 确认*/}
                        </NCButton>
                        <NCButton
                            colors="secondary"
                            onClick={this.cancel}
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
                            colors="primary"
                            disabled={steps !== 2}
                            onClick={this.complete}>
                            {this.state.json['jf6005-000007']}{/* 国际化处理： 确认*/}
                        </NCButton>
                        <NCButton
                            colors="secondary"
                            onClick={this.cancel}
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
            mergeModalVisible,
            form,
            editTable,
            pk_org
        } = this.props;
        const {
            stepsCurrent,
        } = this.state;
        return (
            <NCModal
                backdrop="static"
                show={mergeModalVisible}
                size="lg"
                className="dept-merge-modal"
                onHide={this.cancel.bind(this, true)}
            >
                <NCModalHeader
                    closeButton={true}
                >
                    {this.state.json['jf6005-000028']}{/* 国际化处理： 部门合并*/}
                </NCModalHeader>
                <NCModalBody>
                    <div className={'merge-modal-header'}>
                        <NCSteps current={stepsCurrent} finishStatus="success">
                            <NCStep title={this.state.json['jf6005-000025']} description=""/>{/* 国际化处理： 选择部门*/}
                            <NCStep title={this.state.json['jf6005-000026']} description=""/>{/* 国际化处理： 合并岗位*/}
                            <NCStep title={this.state.json['jf6005-000027']} description=""/>{/* 国际化处理： 合并人员*/}
                        </NCSteps>
                    </div>
                    <div className={'merge-modal-warp'}>
                        <div className={'first-step'} style={{display: stepsCurrent === 0 ? '' : 'none'}}>
                            {form.createForm(formid, {
                                onAfterEvent: this.onAfterFormEvent.bind(this)
                            })}
                        </div>
                        <div className={'second-step'} style={{display: stepsCurrent === 1 ? '' : 'none'}}>
                            <Transfer
                                {...this.props}
                                ref = { node =>{
                                    this.transfer = node
                                }}
                                leftTransferId={'mergedpostinf_l'}
                                rightTransferId={'mergedpostinf_r'}
                                pk_org={pk_org}
                                //leftTreeData={this.state.treeData}                            // 左边table的数据 同editTable
                                leftTreeData={this.state.leftData}                            // 左边table的数据 同editTable
                                rightTreeData={this.state.rightData}                          // 右边table的数据 同editTable
                                leftTreeConfig={{
                                    showCheck: false
                                }}
                                onBeforeEvents={this.onBeforeEvents.bind(this)}// 左边table的配置 同editTable
                                rightTreeConfig={{
                                    showCheck: false
                                }}                                    // 右边table的配置 同editTable
                                title={{
                                    left: this.state.json['jf6005-000365'],//'选择原岗位',
                                    right: this.state.json['jf6005-000366']//'新岗位',
                                }}      // 左右两边title/* 国际化处理： 选择原职务,复制内容*/
                                valueChange={this.valChange.bind(this)}                 // 穿梭后触发的事件
                                disableBtns={false}                                     // 穿梭按钮是否可用
                                isCheckoutRollback={true}                               // 移动时需要调用校验和回滚
                            />
                        </div>
                        {stepsCurrent === 2 ? <div className={'third-step'}>
                            <div className="table-box" ref={node=>{this.tableBox3=node}}>
                                {
                                    editTable.createEditTable(tableid, {
                                        showIndex: true,
                                        cancelCustomRightMenu: true,
                                        onRowDoubleClick: (record, index, e, f) => {
                                            this.props.editTable.openModel(tableid, 'edit', record, index);
                                        },
                                        onCloseModel: this.closeTableModel.bind(this),
                                        onBeforeEvent: this.tableBeforeEvents.bind(this),
                                        tableModelConfirm: this.closeTableModel.bind(this),
                                    })
                                }
                            </div>
                        </div> : null}
                    </div>

                </NCModalBody>
                {this.footer()}
            </NCModal>
        );
    }
}

export default MergeModal
