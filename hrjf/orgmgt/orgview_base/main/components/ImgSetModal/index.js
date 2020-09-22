import React, {Component} from 'react';
import './index.less';
import {base} from 'nc-lightapp-front';
import MyForm from "../MyForm";
import getTabsData from "./functions/getTabsData";
import setDefaultConf from './functions/setDefaultConf';
import {getEnableFonts} from "src/hrpub/common/utils/queryFonts";

const {NCModal, NCButton, NCTabs, NCCheckbox} = base;
const {Header: NCModalHeader, Body: NCModalBody, Footer: NCModalFooter} = NCModal;
const NCTabPane = NCTabs.NCTabPane;

class ImgSetModal extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.closeModal = this.closeModal.bind(this);
        this.beSure = this.beSure.bind(this);
        this.default = this.default.bind(this);
        this.getTabs = this.getTabs.bind(this);
        this.itemChange = this.itemChange.bind(this);
        this.fontChange = this.fontChange.bind(this);
        this.modalEnterHandle = this.modalEnterHandle.bind(this);
        this.familyList = getEnableFonts() || [];
    }

    modalEnterHandle() {
        const {imageConf, page, hisImageConf} = this.props;
        if (page === 'img') {
            this.setState(hisImageConf);
        } else {
            this.setState(imageConf);
        }

    }

    itemChange(key, value) {
        this.setState({
            [key]: value
        });
    }

    fontChange(value) {
        this.setState(value);
    }

    default() {
        setDefaultConf.call(this, false, (data) => {
            this.setState(data);
        })
    }

    beSure() {
        const {handleData, page} = this.props;
        if (!handleData || page === 'main') {
            setDefaultConf.call(this, true, () => {
                this.props.onSure(this.state);
                this.closeModal();
            })
        } else {
            this.props.onSure(this.state);
            this.closeModal();
        }
    }

    closeModal() {
        this.props.onClose && this.props.onClose();
    }

    getTabs() {
        return getTabsData.call(this);
    }

    render() {
        const {visible, showDefaultCheck, json} = this.props;
        const tabs = this.getTabs();
        return (
            <NCModal
                show={visible}
                size="lg"
                onHide={this.closeModal}
                backdrop={'static'}
                onEntered={this.modalEnterHandle}
            >
                <NCModalHeader
                    closeButton={true}
                >
                    {json['jf6005-000470']}{/* 国际化处理： 图像设置*/}
                </NCModalHeader>
                <NCModalBody>
                    <NCTabs
                        navtype="turn"
                        contenttype="moveleft"
                        tabBarPosition="top"
                    >
                        {
                            tabs.map(item =>
                                <NCTabPane tab={item.title} key={item.key}>
                                    <MyForm formDatas={item.forms}/>
                                </NCTabPane>)
                        }
                    </NCTabs>
                </NCModalBody>
                <NCModalFooter>
                    {showDefaultCheck ?
                        <div className='default-check'>
                            <NCCheckbox colors="primary"
                                        checked={this.state.display_no_dialog === 'Y'}
                                        onChange={(v) => {
                                            this.setState({
                                                display_no_dialog: v ? 'Y' : 'N'
                                            })
                                        }}>
                                {json['jf6005-000471']}{/* 国际化处理： 存为用户习惯设置并不再显示此对话框*/}
                            </NCCheckbox>
                        </div> : null}
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
                    <NCButton
                        shape="border"
                        onClick={this.default}
                    >
                        {json['jf6005-000472']}{/* 国际化处理： 恢复默认设置*/}
                    </NCButton>
                </NCModalFooter>
            </NCModal>
        );
    }
}

export default ImgSetModal;
