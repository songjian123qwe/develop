import React, {Component} from 'react';
import './index.less';
import {base, toast} from 'nc-lightapp-front';
import MyForm from "../MyForm";
import getFormsData from "./functions/getFormsData";

const {NCModal, NCButton} = base;
const {Header: NCModalHeader, Body: NCModalBody, Footer: NCModalFooter} = NCModal;

class AddNewModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            orgType: '',
            name: '',
            code: '',
            display_text: '',
            checked: false
        };
        this.closeModal = this.closeModal.bind(this);
        this.beSure = this.beSure.bind(this);
        this.getForms = this.getForms.bind(this);
        this.itemChange = this.itemChange.bind(this);
        this.modalEnterHandle = this.modalEnterHandle.bind(this);
    }

    modalEnterHandle() {
        const {oldInfo} = this.props;
        if (oldInfo) {
            const orgType = oldInfo.getOrgType();
            const id = oldInfo.getId();
            const {code, name, display_text} = oldInfo.getInfo();
            this.setState({
                id,
                orgType,
                name,
                code,
                display_text
            })
        }
    }

    itemChange(key, value) {
        this.setState({
            [key]: value
        });
    }

    beSure() {
        const {json} = this.props;
        let errorFiled = [];
        if (!this.state.code) {
            errorFiled.push(json['jf6005-000403'])
            /* 国际化处理： 节点编码*/
        }
        if (!this.state.name) {
            errorFiled.push(json['jf6005-000404'])
            /* 国际化处理： 节点名称*/
        }
        if (!this.state.orgType) {
            errorFiled.push(json['jf6005-000405'])
            /* 国际化处理： 节点类型*/
        }
        if (errorFiled.length) {
            toast({color: "danger", content: json['jf6005-000409'] + errorFiled.join()});
            /* 国际化处理： 下列字段不能为空:*/
            if (!this.state.checked) {
                this.setState({
                    checked: true
                });
            }
            return;
        }
        this.props.onSure(this.state);
        this.closeModal();
    }

    closeModal() {
        this.props.onClose && this.props.onClose();
        this.setState({
            id: '',
            orgType: '',
            name: '',
            code: '',
            display_text: '',
            checked: false
        });
    }

    getForms() {
        return getFormsData.call(this);
    }

    render() {
        const {visible, oldInfo, json} = this.props;
        const forms = this.getForms();
        return (
            <NCModal
                show={visible}
                onHide={this.closeModal}
                onEntered={this.modalEnterHandle}
                backdrop={'static'}
            >
                <NCModalHeader
                    closeButton={true}
                >
                    {!oldInfo ? json['jf6005-000060'] : json['jf6005-000410']}{/* 国际化处理： 新增节点,编辑节点,新增节点*/}
                </NCModalHeader>
                <NCModalBody>
                    <MyForm formDatas={forms}/>
                </NCModalBody>
                <NCModalFooter>
                    <NCButton
                        onClick={this.beSure}
                        colors='primary'
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

export default AddNewModal;
