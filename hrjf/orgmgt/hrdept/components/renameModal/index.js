/**
 * 更名
 */
import React, {Component} from 'react';

import './index.less';

import {
    base,
    toast
} from 'nc-lightapp-front';

const {
    NCModal,
    NCButton
} = base;

const {
    Header: NCModalHeader,
    Body: NCModalBody,
    Footer: NCModalFooter
} = NCModal;

let formid = 'rename';

class RenameModal extends Component {
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

    saveVersionInfo() {
        let formCheck = this.props.form.isCheckNow(formid);
        if(!formCheck){
            return
        }
        this.props.renameDeptExecAction((res)=>{
            if (res.data === 'success') {
                toast({
                    color: 'success',
                    content: this.state.json["jf6005-000393"] /*更名成功！*/
                });
            } else {
                toast({
                    color: 'success',
                    content: this.state.json["jf6005-000393"] + this.state.json["jf6005-000508"]/*更名成功！*/
                });
            }
            this.closeInfoModal();
        })
    }

    closeInfoModal() {
        this.props.form.EmptyAllFormValue(formid);
        this.props.updateState({
            renameModalVisible: false
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
            renameModalVisible,
            form
        } = this.props;

        return (
            <NCModal
                backdrop ="static"
                show={renameModalVisible}
                size="xl"
                className="renameModal"
                onHide={this.closeInfoModal}
                onEntered={this.showHandle}
            >
                <NCModalHeader
                    closeButton={true}
                >
                    {this.state.json['jf6005-000033']}{/* 国际化处理： 变更部门名称*/}
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

export default RenameModal
