import React, {Component} from 'react';
import './index.less';
import MyForm from "../MyForm";
import getFormsData from "./functions/getFormsData";
import {base, toast} from 'nc-lightapp-front';

const {NCModal, NCButton} = base;
const {Header: NCModalHeader, Body: NCModalBody, Footer: NCModalFooter} = NCModal;

class BaseSetModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orgSys: '1',
            qryDate: '',
            orgType: '1',
            displayCanceledDept: 'N',
            displayPost: 'Y',
            orgpk: '',
            includeSubOrg: 'Y',
            displayDept: 'Y',
            displayVirtualDept: 'N',
            checked: false
        };
        this.itemChange = this.itemChange.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.beSure = this.beSure.bind(this);
    }

    beSure() {
        let errorFiled = [];
        if (!this.state.orgpk) {
            errorFiled.push(this.props.json['jf6005-000404'])
            /* 国际化处理： 节点名称*/
        }
        if (!this.state.orgSys) {
            errorFiled.push(this.props.json['jf6005-000500'])
            /* 国际化处理： 组织体系,组织体系*/
        }
        if (errorFiled.length) {
            toast({color: "danger", content: this.props.json['jf6005-000409'] + errorFiled.join()});
            /* 国际化处理： 下列字段不能为空:*/
            if (!this.state.checked) {
                this.setState({
                    checked: true
                });
            }
            return;
        }
        this.state.pk_org = this.props.orgVal && this.props.orgVal.refpk;
        this.props.onSure(this.state);
        this.closeModal();
    }

    closeModal() {
        this.props.onClose && this.props.onClose();
        setTimeout(() => {
            this.setState({
                orgSys: '1',
                qryDate: '',
                orgType: '1',
                displayCanceledDept: 'N',
                displayPost: 'Y',
                orgpk: '',
                includeSubOrg: 'Y',
                displayDept: 'Y',
                displayVirtualDept: 'N',
                checked: false
            })
        }, 200)
    }

    itemChange(data) {
        this.setState(data);
    }

    getFormData() {
        return getFormsData.call(this);
    }

    render() {
        const {visible, json} = this.props;
        const forms = this.getFormData();
        return (
            <NCModal
                show={visible}
                size="lg"
                onHide={this.closeModal}
                backdrop={'static'}
            >
                <NCModalHeader
                    closeButton={true}
                >
                    {json['jf6005-000418']}{/* 国际化处理： 生成新图设置*/}
                </NCModalHeader>
                <NCModalBody>
                    <MyForm formDatas={forms}/>
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

export default BaseSetModal;
