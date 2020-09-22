import React, {Component} from 'react';
import './index.less';
import {base} from 'nc-lightapp-front';

const {NCModal, NCButton} = base;
const {Header: NCModalHeader, Body: NCModalBody, Footer: NCModalFooter} = NCModal;

class EditHistoryModal extends Component {
    constructor(props) {
        super(props);
        this.closeModal = this.closeModal.bind(this);
        this.beSure = this.beSure.bind(this);
    }

    beSure() {
        if (!this.props.form.isCheckNow('orgcharthisform')) {
            return;
        }
        const info = this.props.form.getAllFormValue('orgcharthisform').rows[0].values;
        this.props.onSure(info, () => {
            this.closeModal();
        });
    }

    closeModal() {
        this.props.onClose && this.props.onClose();
    }

    render() {
        const {visible, form, json} = this.props;
        return (
            <NCModal
                show={visible}
                onHide={this.closeModal}
                backdrop={'static'}
            >
                <NCModalHeader
                    closeButton={true}
                >
                    {json['jf6005-000419']}{/* 国际化处理： 组织机构图*/}
                </NCModalHeader>
                <NCModalBody>
                    {
                        form.createForm('orgcharthisform')
                    }
                </NCModalBody>
                <NCModalFooter>
                    <NCButton
                        onClick={this.beSure}
                        colors="primary"
                    >
                        {json['jf6005-000007']}{/* 国际化处理： 确认*/}
                    </NCButton>
                    <NCButton
                        shape="border"
                        onClick={this.closeModal}
                    >
                        {json['jf6005-000008']}{/* 国际化处理： 取消*/}
                    </NCButton>
                </NCModalFooter>
            </NCModal>
        );
    }
}

export default EditHistoryModal;
