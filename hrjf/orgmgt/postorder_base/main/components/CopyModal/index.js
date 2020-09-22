import React, {Component} from 'react';
import './index.less';
import {base, high, toast} from 'nc-lightapp-front';
import getTreeRoot from "../LeftTree/functions/getTreeRoot";
import Transfer from '../../../../../public/excomponents/Transfer';
import getCopyInfoData from "./functions/getCopyInfoData";
import saveCopyInfoData from "./functions/saveCopyInfoData";

const {NCModal, NCButton, NCCheckbox} = base;
const {Header: NCModalHeader, Body: NCModalBody, Footer: NCModalFooter} = NCModal;

class CopyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            includeSub: true,
            transferData: {
                rightTreeData: [],
                leftTreeData: []
            },
            selectType: 'default' // 穿梭框  从左到右的方式 'onlySelf':自己;    'default':全部包含子节点
        };
        this.getTreeData = this.getTreeData.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.containAllSub = this.containAllSub.bind(this);
        this.preStep = this.preStep.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.saveCopy = this.saveCopy.bind(this);
    }

    getTreeData() {
        const {
            pk_org
        } = this.props;

        getTreeRoot({
            pk_org,
            showDisable: false
        })
            .then((res) => {
                /*res.data.forEach(item => item.pid = 'custom_root');
                let root = [{
                    children: res.data,
                    code: '待选岗位序列',
                    id: 'custom_root',
                    innercode: null,
                    key: 'custom_root',
                    name: '待选岗位序列',
                    nodeData: {
                        nodeValue: {}
                    },
                    pid: null,
                    refname: '待选岗位序列',
                    refpk: 'custom_root',
                    title: '待选岗位序列'
                }];*/
                this.setState({
                    transferData: {
                        leftTreeData: res.data || [],
                        rightTreeData: [],
                    }
                })
            });
    }

    containAllSub(value) {
        this.setState({
            includeSub: value,
            selectType: value ? 'default' : "onlySelf"
        })
    }

    preStep() {
        this.setState((prevState) => ({
            step: prevState.step - 1
        }))
    }

    nextStep() {
        if (this.state.transferData.rightTreeData.length === 0) {
            toast({color: "danger", content: this.props.json['jf6005-000305']/*请选择要复制的岗位序列*/});
            return;
        }
        this.setState((prevState) => ({
            step: prevState.step + 1
        }));
        getCopyInfoData.call(this);
    }

    closeModal() {
        this.props.onClose && this.props.onClose();
        this.setState({
            step: 1,
            includeSub: true,
            transferData: {
                rightTreeData: [],
                leftTreeData: []
            },
            selectType: 'default' // 穿梭框  从左到右的方式 'onlySelf':自己;    'default':全部包含子节点
        });
    }

    saveCopy() {
        saveCopyInfoData.call(this);
    }

    render() {
        const {visible, editTable} = this.props;
        const {transferData, selectType, includeSub, step} = this.state;
        return (
            <NCModal
                show={visible}
                backdrop='static'
                onHide={this.closeModal}
                onEntered={this.getTreeData}
                size='xlg'
            >
                <NCModalHeader closeButton={true}>
                    {this.props.json['jf6005-000302']/*复制岗位序列*/}
                </NCModalHeader>
                <NCModalBody>
                    {step === 1 ? <div className='post-order-copy'>
                        <Transfer
                            {...this.props}
                            TransferId={'postOrderTrans'}
                            leftTreeData={transferData.leftTreeData}
                            rightTreeData={transferData.rightTreeData}
                            value={transferData}
                            title={{
                                left: this.props.json['jf6005-000303']/*待选岗位序列*/,
                                right: this.props.json['jf6005-000304']/*已选岗位序列*/
                            }}
                            selectType={selectType}
                            showSearch={false}
                        />
                        <NCCheckbox checked={includeSub}
                                    onChange={this.containAllSub}>
                            {this.props.json['jf6005-000013']} {/*包含所有下级*/}
                        </NCCheckbox>
                    </div> : <div>
                        {
                            editTable.createEditTable('copyinfo')
                        }
                    </div>}
                </NCModalBody>
                <NCModalFooter>
                    <NCButton
                        disabled={step === 1}
                        onClick={this.preStep}
                    >
                        {this.props.json['jf6005-000009']} {/*上一步*/}
                    </NCButton>
                    <NCButton
                        disabled={step === 2}
                        onClick={this.nextStep}
                    >
                        {this.props.json['jf6005-000006']} {/*下一步*/}
                    </NCButton>
                    <NCButton
                        colors="primary"
                        disabled={step === 1}
                        onClick={this.saveCopy}
                    >
                        {this.props.json['jf6005-000010']} {/*完成*/}
                    </NCButton>
                    <NCButton onClick={this.closeModal}>
                        {this.props.json['jf6005-000008']} {/*取消*/}
                    </NCButton>
                </NCModalFooter>
            </NCModal>
        );
    }
}

export default CopyModal;