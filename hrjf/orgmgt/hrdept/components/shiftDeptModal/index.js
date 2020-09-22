/**
 * 部门内转移
 */
import React, {Component} from 'react';

import './index.less';

import {
    base,
    toast
} from 'nc-lightapp-front';

import ShiftDeptExecAction from "../../functions/ShiftDeptExecAction";

const {
    NCModal,
    NCButton
} = base;

const {
    Header: NCModalHeader,
    Body: NCModalBody,
    Footer: NCModalFooter
} = NCModal;

let formid = 'deptshift';

class ShiftDeptModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            json: props.json,
            inlt: props.inlt
        };
        this.showHandle = this.showHandle.bind(this);
        this.closeInfoModal = this.closeInfoModal.bind(this);
        this.saveVersionInfo = this.saveVersionInfo.bind(this);
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

    saveVersionInfo() {// 表单验证
        if (!this.props.form.isCheckNow(formid)) {
            return
        }
        let formdata = this.props.form.getAllFormValue(formid);
        ShiftDeptExecAction(formdata, this.props.pk_dept, this.props.pk_org)
            .then((res) => {
                if(res.success) {
                    if (res.data === 'success') {
                        toast({
                            color: 'success',
                            content: this.state.json["jf6005-000398"] /*组织内转移成功！*/
                        });
                    } else {
                        toast({
                            color: 'success',
                            content: this.state.json["jf6005-000398"] + this.state.json["jf6005-000508"]/*组织内转移成功！*/
                        });
                    }
                    this.props.refresh();
                    this.closeInfoModal();
                }
            });
    }

    closeInfoModal() {
        this.props.form.EmptyAllFormValue(formid);
        this.props.updateState({
            shiftDeptModalVisible: false
        });
    }

    showHandle() {
        // this.props.form.setFormStatus(formid, 'add');
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
            props.form.setFormItemsRequired(formid,{'vName':value.value});
            props.form.setFormItemsValue(formid,{'vName':''});
            props.form.setFormItemsDisabled(formid,{'vName':!value.value});
        }
    }

    render() {
        const {
            shiftDeptModalVisible,
            form
        } = this.props;

        return (
            <NCModal
                backdrop ="static"
                show={shiftDeptModalVisible}
                size="xl"
                className="only-info-modal"
                onHide={this.closeInfoModal}
                onEntered={this.showHandle}
            >
                <NCModalHeader
                    closeButton={true}
                >
                    {this.state.json['jf6005-000037']}{/* 国际化处理： 组织内转移*/}
                </NCModalHeader>
                <NCModalBody>
                    <div className="only-info-content">
                        {form.createForm(formid,{
                            onAfterEvent: this.onAfterFormEvent.bind(this)
                        })}
                    </div>
                </NCModalBody>
                <NCModalFooter>
                    <NCButton
                        colors="primary"
                        onClick={this.saveVersionInfo}
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
            </NCModal>
        );
    }
}

export default ShiftDeptModal
