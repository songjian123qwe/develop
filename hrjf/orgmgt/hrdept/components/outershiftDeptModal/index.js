/**
 * 跨组织转移
 */
import React, {Component} from 'react';

import './index.less';

import {
    base,
    toast
} from 'nc-lightapp-front';
import Transfer from '../../../../public/excomponents/Transfer';
import OuterShiftDeptAction from "../../functions/OuterShiftDeptAction";
import OuterShiftDeptQueryAction from "../../functions/OuterShiftDeptQueryAction";
import OuterShiftDeptExecAction from "../../functions/OuterShiftDeptExecAction";
import OuterShiftDeptInfStepAction from "../../functions/OuterShiftDeptInfStepAction";
import OuterShiftPsnInfStepAction from "../../functions/OuterShiftPsnInfStepAction";
import AddCondition from "../../../../public/functions/addCondition";
import NCSelectTag from "../../../../public/components/ncSelect";
import {THEME} from "../../../../public/theme/theme";

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

const formid = 'transrule';

class OuterShiftDeptModal extends Component {
    constructor(props) {
        super(props);
        this.transruleInf2 = null; // 在转移部门信息确认接口  获得
        this.outerShiftDeptInf = null; // 在转移人员确认接口  获得
        this.state = {
            json: props.json,
            inlt: props.inlt,
            codePrefix: '', // 编码前缀,
            namePrefix: '', // 名称前缀,
            stepsCurrent: 0, // 选择 步骤
            hrDeptVerTreeRef: '', // 第一步 选择的业务单元,
            copyModalConAllSub: false, // 第一步 是否包含所有下级
            transferData: {
                leftTreeData: [],
                rightTreeData: []
            },
            selectType: 'onlyChild', // 穿梭框  从左到右的方式 'onlySelf':自己;    'onlyChild':全部包含子节点
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
            })
        }
    }

    /**
     * 关闭模块
     */
    closeInfoModal() {
        this.props.updateState({
            outerShiftDeptModalVisible: false
        });
        this.initParam();
    }

    /**
     * 初始化参数
     */
    initParam() {
        this.transruleInf2 = null; // 在转移部门信息确认接口  获得
        this.outerShiftDeptInf = null; // 在转移人员确认接口  获得
        this.updateState({
            codePrefix: null,
            namePrefix: null,
            stepsCurrent: 0, // 选择 步骤
            hrDeptVerTreeRef: '', // 第一步 选择的业务单元,
            copyModalConAllSub: false, // 第一步 是否包含所有下级
            selectType: 'onlyChild',  // 穿梭框  从左到右的方式 'onlySelf':自己;    'onlyChild':全部包含子节点
        })
    }

    oneStepAfterFormEvent(props, moduleId, key, value, oldValue) {
        if (key === 'oldorg') {
            //原业务单元发生改变 则待选部门重新查询
            this.outerShiftDeptQueryAction(value.value)
        }
        if (key === 'neworg') {
            //目标业务单元发生改变 则目标位置发生变化
            let meta = this.props.meta.getMeta();
            AddCondition(meta.transrule, {
                pk_org: value.value
            }, 'aimdept');
            this.props.meta.setMeta(meta, () => {
                meta = null;
            });
        }
    }

    /**
     * 下一步
     */
    next() {
        // 第一步    检测form表单
        if (this.state.stepsCurrent === 0) {
            // 表单验证
            if (!this.firstStepCheck()) {
                return
            } else {
                this.outerShiftDeptInfStepAction(() => {
                    let step = this.state.stepsCurrent + 1;
                    this.updateState({
                        stepsCurrent: step
                    });
                });
            }
        }
        // 第二步
        if (this.state.stepsCurrent === 1) {
            this.outerShiftPsnInfStepAction(() => {
                let step = this.state.stepsCurrent + 1;
                this.updateState({
                    stepsCurrent: step
                });
            });
        }
    }

    /**
     * 第一步检测
     * @returns {boolean}
     */
    firstStepCheck() {
        let formCheck = this.props.form.isCheckNow(formid);
        if (!formCheck) return false;
        let treeCheck = this.state.transferData.rightTreeData.length > 0;
        if (!treeCheck) {
            toast({color: "danger", content: this.state.json['jf6005-000349']}) //待转移部门为空!
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
     * 完成
     */
    complete() {
        this.outerShiftDeptExecAction()
    }

    /**
     * 跨组织查询
     */
    outerShiftDeptAction(pk_org) {
        this.pk_org = pk_org;
        OuterShiftDeptAction(pk_org).then(res => {
            this.props.form.setFormStatus('transrule', 'edit');
            let formData = {
                transrule: {
                    rows: []
                }
            };
            if (res.data) {
                formData.transrule.rows = res.data.transrule.transrule.rows;
            }
            this.props.form.setAllFormValue(formData);
            let leftTreeData = res.data.depttree || [];
            let rightTreeData = res.data.enableHRVOs || [];
            this.setState({
                transferData: {
                    leftTreeData: leftTreeData,
                    rightTreeData: rightTreeData,
                    disabledBtns: true
                }
            });
        })
    }

    /**
     * 待选部门查询
     */
    outerShiftDeptQueryAction(pk_org) {
        OuterShiftDeptQueryAction(pk_org).then(res => {
            let leftTreeData = res.data || [];
            this.setState({
                transferData: {
                    leftTreeData: leftTreeData,
                    rightTreeData: [],
                    disabledBtns: true
                }
            });
        })
    }

    /**
     * 部门转移 确认部门岗位信息
     */
    outerShiftDeptInfStepAction(cb) {
        let selDeptPks, transrule, deptpkArr;
        let rightData = this.state.transferData.rightTreeData;
        deptpkArr = this.getkey(rightData);
        selDeptPks = deptpkArr.join(',');
        transrule = this.props.form.getAllFormValue(formid);
        OuterShiftDeptInfStepAction(selDeptPks, transrule).then(res => {
            if (cb && typeof cb === 'function') {
                cb()
            }
            // 部门岗位信息确认
            this.props.editTable.setTableData('outerShiftDept', res.data.outerShiftDept.outerShiftDept);
            this.transruleInf2 = res.data.transruleInf;
            this.userjson = JSON.parse(res.data.outerShiftDept.userjson);
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
     * 转移部门列表点击事件
     */
    transferDeptTable(props, moduleId, record, index, e) {
        let keyid = record.values.olddeptpk.value;
        this.selectPost = keyid;
        this.props.editTable.setTableData('outerShiftPost', this.userjson[keyid]["outerShiftPost"])
    }

    transferPostTableAfterEdit(props, moduleId, key, value, changedrows, record, index) {
        let data = props.editTable.getAllData(moduleId);
        this.userjson[this.selectPost]["outerShiftPost"] = data;
    }

    /**
     * 关闭 table 模块
     * @param tableid
     */
    closeTableModel(tableid) {
        this.props.editTable.setStatus(tableid, 'browse')
    }

    /**
     * 确认人员信息
     */
    outerShiftPsnInfStepAction(cb) {
        let outerShiftDept, transruleInf;
        transruleInf = this.transruleInf2;
        // outerShiftDept = {
        //     outerShiftDept: this.props.editTable.getAllData('outerShiftDept'),
        //     userjson: JSON.stringify(this.userjson)
        // };
        outerShiftDept = this.props.editTable.getAllData('outerShiftDept');
        let userjsonStr = JSON.stringify(this.userjson);
        let userjsonObj = JSON.parse(userjsonStr);
        let temp = {};
        for (let key in userjsonObj) {
            temp[key] = JSON.stringify(userjsonObj[key]);
        }
        let userjson = JSON.stringify(temp);
        outerShiftDept.rows.map(item => {
            if (item.values.hasOwnProperty('transPostVOs')) {
                delete item.values.transPostVOs
            }
        });

        OuterShiftPsnInfStepAction(outerShiftDept, transruleInf, userjson).then(res => {
            if (cb && typeof cb === 'function') {
                cb()
            }
            if (!res.data) return;
            this.outerShiftDeptInf = res.data.outerShiftDeptInf;// 确认执行用
            this.props.editTable.setTableData('outerShiftPsn', res.data["outerShiftPsn"]["outerShiftPsn"])
        })
    }

    /**
     * 跨组织转移 执行
     */
    outerShiftDeptExecAction() {
        let outerShiftDeptInf, outerShiftPsn, transruleInf;
        transruleInf = this.transruleInf2;
        outerShiftDeptInf = this.outerShiftDeptInf;
        outerShiftPsn = this.props.editTable.getAllData('outerShiftPsn');
        OuterShiftDeptExecAction(outerShiftDeptInf, outerShiftPsn, transruleInf).then(res => {
            toast({
                color: 'success',
                content: this.state.json["jf6005-000397"] /*跨组织转移成功！*/
            });
            this.props.refresh();
            this.closeInfoModal();
        })
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
                            colors={steps !== 2 ? "secondary" : "primary"}
                            disabled={steps !== 2}
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
            outerShiftDeptModalVisible,
            form,
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
                show={outerShiftDeptModalVisible}
                size="lg"
                className="outer-shift-dept-modal"
                onHide={this.closeInfoModal}
                onEntered={this.showHandle}
            >
                <NCModalHeader
                    closeButton={true}
                >
                    {this.state.json['jf6005-000029']}{/* 国际化处理： 跨组织转移*/}
                </NCModalHeader>
                <NCModalBody>
                    <div className={'outer-modal-header'}>
                        <NCSteps current={stepsCurrent} finishStatus="success">
                            <NCStep title={this.state.json['jf6005-000359']} description=""/>{/* 国际化处理： 设置部门转移规则*/}
                            <NCStep title={this.state.json['jf6005-000360']} description=""/>{/* 国际化处理： 转移部门信息确认*/}
                            <NCStep title={this.state.json['jf6005-000361']} description=""/>{/* 国际化处理： 转移人员信息确认*/}
                        </NCSteps>
                    </div>
                    <div className={'outer-modal-warp'}>
                        <div className={'first-step'} style={{display: stepsCurrent === 0 ? '' : 'none'}}>
                            <div className={'transrule'}>
                                {form.createForm(formid, {
                                    onAfterEvent: this.oneStepAfterFormEvent.bind(this)
                                })}
                                <div className={'aim-dept-pre'}>
                                    <div className={'aim-dept-code-pre'}>
                                        {/* 国际化处理： 目标部门编码前缀*/}
                                        <div className={`select-title ${THEME.labelFontc}`}>
                                            {this.state.json['jf6005-000015']}
                                        </div>
                                        <div className={'select-box'}>
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
                                                    this.props.form.setFormItemsValue('transrule', {
                                                        'aimdeptcode': {
                                                            value: val,
                                                            display: value
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
                                    <div className={'aim-dept-name-pre'}>
                                        {/* 国际化处理： 目标部门名称前缀*/}
                                        <div className={`select-title ${THEME.labelFontc}`}>
                                            {this.state.json['jf6005-000016']}
                                        </div>
                                        <div className={'select-box'}>
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
                                                    this.props.form.setFormItemsValue('transrule', {
                                                        'aimdeptname': {
                                                            value: val,
                                                            display: value
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
                                </div>
                            </div>
                            <Transfer
                                {...this.props}
                                TransferId={'disapp'}
                                title={{
                                    left: this.state.json['jf6005-000364'],
                                    right: this.state.json['jf6005-000005']
                                }}/* 国际化处理： 待选部门,已选部门*/
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
                        </div>
                        <div className={'second-step'} style={{display: stepsCurrent === 1 ? '' : 'none'}}>
                            <div className={'outer-shift-dept-box'}>
                                <div className={'outer-shift-box-title'}>
                                    {/*转移部门列表*/}
                                    {this.state.json['jf6005-000362']}
                                </div>
                                <div className={'outer-shift-box-table'}>
                                    {
                                        editTable.createEditTable('outerShiftDept', {
                                            showIndex: true,
                                            cancelCustomRightMenu: true,
                                            onRowDoubleClick: (record, index, e, f) => {
                                                this.props.editTable.openModel('outerShiftDept', 'edit', record, index);
                                            },
                                            onRowClick: this.transferDeptTable.bind(this),
                                            onCloseModel: this.closeTableModel.bind(this, 'outerShiftDept'),
                                            tableModelConfirm: this.closeTableModel.bind(this, 'outerShiftDept')
                                        })
                                    }
                                </div>

                            </div>
                            <div className={'outer-shift-post-box'}>
                                <div className={'outer-shift-box-title'}>
                                    {/*转移岗位列表*/}
                                    {this.state.json['jf6005-000363']}
                                </div>
                                <div className={'outer-shift-box-table'}>
                                    {
                                        editTable.createEditTable('outerShiftPost', {
                                            showIndex: true,
                                            cancelCustomRightMenu: true,
                                            onRowDoubleClick: (record, index, e, f) => {
                                                this.props.editTable.openModel('outerShiftPost', 'edit', record, index);
                                            },
                                            onCloseModel: this.closeTableModel.bind(this, 'outerShiftPost'),
                                            tableModelConfirm: this.closeTableModel.bind(this, 'outerShiftPost'),
                                            onAfterEvent: this.transferPostTableAfterEdit.bind(this)
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className={'third-step'} style={{display: stepsCurrent === 2 ? '' : 'none'}}>
                            <div className="table-box">
                                {
                                    editTable.createEditTable('outerShiftPsn', {
                                        showIndex: true,
                                        cancelCustomRightMenu: true,
                                        onRowDoubleClick: (record, index, e, f) => {
                                            this.props.editTable.openModel('outerShiftPsn', 'edit', record, index);
                                        },
                                        onCloseModel: this.closeTableModel.bind(this, 'outerShiftPsn'),
                                        tableModelConfirm: this.closeTableModel.bind(this, 'outerShiftPsn')
                                    })
                                }
                            </div>
                        </div>
                    </div>

                </NCModalBody>
                {this.footer()}
            </NCModal>
        );
    }
}

export default OuterShiftDeptModal
