import React, {Component} from 'react';
import './index.less';
import {base} from 'nc-lightapp-front';
import getMemberDate from "./functions/getMemberData";
import viewCard from "./functions/viewCard";

const {NCModal, NCButton, NCSelect} = base;
const {Header: NCModalHeader, Body: NCModalBody, Footer: NCModalFooter} = NCModal;
const NCOption = NCSelect.NCOption;

class MemberModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            pageNum: 1,
            pageOptions: new Array(1).fill(1),
            memberList: [],
            selectedMember: ''
        };
        this.closeModal = this.closeModal.bind(this);
        this.setNodeAndSearch = this.setNodeAndSearch.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.viewCard = this.viewCard.bind(this);
    }

    setNodeAndSearch(node) {
        this.handldNode = node;
        getMemberDate.call(this, (data) => {
            this.setState({
                visible: true,
                pageNum: 1,
                pageOptions: new Array(Number(data.totalPage)).fill(1),
                memberList: data.data,
                selectedMember: ''
            })
        });
    }

    onPageChange(value) {
        if (value === this.state.pageNum) return;
        this.setState({
            pageNum: value
        }, () => {
            getMemberDate.call(this, (data) => {
                this.setState({
                    memberList: data.data,
                    selectedMember: ''
                })
            });
        })
    }

    closeModal() {
        this.setState({
            visible: false,
            pageNum: 1,
            pageOptions: new Array(1).fill(1),
            memberList: [],
            selectedMember: ''
        })
    }

    viewCard() {
        viewCard.call(this);
    }

    render() {
        const {visible, pageNum, pageOptions, memberList, selectedMember} = this.state;
        const {json} = this.props;
        return (
            <NCModal
                show={visible}
                onHide={this.closeModal}
                backdrop={'static'}
                size="lg"
            >
                <NCModalHeader
                    closeButton={true}
                >
                    {json['jf6005-000475']}{/* 国际化处理： 联查在职人员*/}
                </NCModalHeader>
                <NCModalBody>
                    <div className='member-list'>
                        {memberList.map(member => {
                            return <div
                                className={'member-card ' + (selectedMember === member ? 'selected' : '')}
                                onClick={() => {
                                    this.setState({
                                        selectedMember: member
                                    })
                                }}>
                                <div className='member-img'>
                                    {member.photo ? <img
                                        src={member.photo}
                                    /> : <i className="icon iconfont icon-yonghu"/>}
                                </div>
                                <div>
                                    <span>{json['jf6005-000505']}: </span>{/* 国际化处理： 编码*/}
                                    <span>{member.psncode}</span>
                                </div>
                                <div>
                                    <span>{json['jf6005-000504']}: </span>{/* 国际化处理： 名称*/}
                                    <span>{member.psnname}</span>
                                </div>
                                <div>
                                    <span>{json['jf6005-000378']}: </span>{/* 国际化处理： 部门*/}
                                    <span>{member.deptname}</span>
                                </div>
                                <div>
                                    <span>{json['jf6005-000373']}: </span>{/* 国际化处理： 岗位*/}
                                    <span>{member.postname}</span>
                                </div>
                                <div>
                                    <span>{json['jf6005-000476']}: </span>{/* 国际化处理： 人员类别*/}
                                    <span>{member.psntype}</span>
                                </div>
                            </div>
                        })}
                    </div>

                </NCModalBody>
                <NCModalFooter>
                    <div className='member-footer'>
                        <NCButton
                            disabled={pageNum === 1}
                            shape="border"
                            onClick={() => this.onPageChange(1)}
                        >
                            {json['jf6005-000477']}{/* 国际化处理： 首页*/}
                        </NCButton>
                        <NCButton
                            disabled={pageNum === 1}
                            shape="border"
                            onClick={() => this.onPageChange(pageNum - 1)}
                        >
                            {json['jf6005-000478']}{/* 国际化处理： 前页*/}
                        </NCButton>
                        <NCButton
                            disabled={pageNum === pageOptions.length}
                            shape="border"
                            onClick={() => this.onPageChange(pageNum + 1)}
                        >
                            {json['jf6005-000479']}{/* 国际化处理： 后页*/}
                        </NCButton>
                        <NCButton
                            disabled={pageNum === pageOptions.length}
                            shape="border"
                            onClick={() => this.onPageChange(pageOptions.length)}
                        >
                            {json['jf6005-000480']}{/* 国际化处理： 尾页*/}
                        </NCButton>
                        <div className='page-change'>
                            <span>{json['jf6005-000481']}</span>{/* 国际化处理： 转至*/}
                            <NCSelect
                                value={pageNum}
                                onChange={this.onPageChange}
                            >
                                {pageOptions.map((option, index) => (
                                    <NCOption value={index + 1}>
                                        {index + 1}
                                    </NCOption>
                                ))}
                            </NCSelect>
                            <span>/{pageOptions.length}</span>
                        </div>
                        <div className='right-button'>
                            <NCButton
                                disabled={!selectedMember}
                                onClick={this.viewCard}
                                shape="border"
                            >
                                {json['jf6005-000482']}{/* 国际化处理： 人员卡片*/}
                            </NCButton>
                            <NCButton
                                shape="border"
                                onClick={this.closeModal}
                            >
                                {json['jf6005-000031']}{/* 国际化处理： 关闭*/}
                            </NCButton>
                        </div>
                    </div>
                </NCModalFooter>
            </NCModal>
        );
    }
}

export default MemberModal;
