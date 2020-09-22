import React, {Component} from 'react';
import './index.less';
import {base} from 'nc-lightapp-front';

const {NCModal, NCButton} = base;
const {Header: NCModalHeader, Body: NCModalBody, Footer: NCModalFooter} = NCModal;

class SaveOptionModal extends Component {
    constructor(props) {
        super(props);
        this.closeModal = this.closeModal.bind(this);
        this.onSure = this.onSure.bind(this);
    }

    onSure(type) {
        this.props.onSure(type);
        this.closeModal();
    }

    closeModal() {
        this.props.onClose();
    }

    render() {
        const {visible} = this.props;
        return (
            <NCModal
                show={visible}
                onHide={this.closeModal}
                backdrop={'static'}
                size="sm"
                className='save-option-modal'
            >
                <NCModalHeader
                    closeButton={true}
                >
                    提示/* 国际化处理： 提示*/
                </NCModalHeader>
                <NCModalBody>
                    <div>
                        {json['jf6005-000494']}？/* 国际化处理： 您想覆盖原版本还是另存新版本*/
                    </div>
                </NCModalBody>
                <NCModalFooter>
                    <NCButton
                        colors='primary'
                        onClick={() => this.onSure('cover')}
                    >
                        {json['jf6005-000495']}/* 国际化处理： 覆盖原版本*/
                    </NCButton>
                    <NCButton
                        shape="border"
                        onClick={() => this.onSure('new')}
                    >
                        {json['jf6005-000496']}/* 国际化处理： 另存新版本*/
                    </NCButton>
                    <NCButton
                        shape="border"
                        onClick={this.closeModal}
                    >
                        取消/* 国际化处理： 取消*/
                    </NCButton>
                </NCModalFooter>
            </NCModal>
        );
    }
}

export default SaveOptionModal;
