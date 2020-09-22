/**
 * 撤销
 */
import React, {Component} from 'react';

import './index.less';

import {
    base
} from 'nc-lightapp-front';
import {saveValidate} from "../../../../public/functions/orgtools";


const {
    NCModal,
    NCButton
} = base;

const {
    Header: NCModalHeader,
    Body: NCModalBody,
    Footer: NCModalFooter
} = NCModal;

let formid = 'post_cancel';

class StopDeptModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            json: props.json,
            inlt: props.json
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

        let templateid = this.props.pageidObj[formid];
        saveValidate(this.props, formid, formid, null, 'form', null, templateid).then(()=>{
            this.props.postChangeCancelExecAction(()=>{
                this.closeInfoModal();
            })
        })
    }

    closeInfoModal() {
        this.props.form.EmptyAllFormValue(formid);
        this.props.updateState({
            stopDeptModalVisible: false
        });
    }

    showHandle() {
        // this.props.form.setFormStatus(formid, 'add');
    }

    render() {
        const {
            stopDeptModalVisible,
            form
        } = this.props;

        return (
            <NCModal
                backdrop ="static"
                show={stopDeptModalVisible}
                size="xl"
                className="stopDeptModal"
                onHide={this.closeInfoModal}
                onEntered={this.showHandle}
            >
                <NCModalHeader
                    closeButton={true}
                >
                    {this.state.json['jf6005-000346']}{/* 国际化处理： 撤销*/}
                </NCModalHeader>
                <NCModalBody>
                    <div className="only-info-content">
                        {form.createForm(formid)}
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

export default StopDeptModal
