/**
 * 业务单元版本信息
 */
import React, {Component} from 'react';

import './index.less';

import {
    base
} from 'nc-lightapp-front';

const {
    NCModal,
    NCTabs
} = base;
const NCTabPane = NCTabs.NCTabPane;

const {
    Header: NCModalHeader,
    Body: NCModalBody
} = NCModal;

class VersionInfoModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            json: props.json,
            inlt: props.inlt,
            selectedTab: null
        };
        this.closeInfoModal = this.closeInfoModal.bind(this);
    }

    componentWillReceiveProps(nextprops) {
        let nextjson = JSON.stringify(nextprops.json);
        let thisjson = JSON.stringify(this.props.json);
        let nextinlt = JSON.stringify(nextprops.inlt);
        let thisinlt = JSON.stringify(this.props.inlt);
        let nextTabs = JSON.stringify(nextprops.orginfoTypeTabsArr);
        let thisTabs = JSON.stringify(this.props.orginfoTypeTabsArr);
        if (nextjson !== thisjson || nextinlt !== thisinlt || nextTabs !== thisTabs) {
            this.setState({
                selectedTab: nextprops.orginfoTypeTabsArr[0] ? nextprops.orginfoTypeTabsArr[0].id : null,
                json: nextprops.json,
                inlt: nextprops.inlt,
            }, () => {
                nextinlt = null;
                nextjson = null;
                thisjson = null;
                thisinlt = null;
                thisTabs = null;
                nextTabs = null;
            })
        }
    }

    /**
     * 关闭模板
     */
    closeInfoModal() {
        this.props.updateState({
            versionInfoModalVisible: false
        });
        this.setState({
            selectedTab: null
        })
    }

    /**
     * 翻页插件 按钮点击事件
     */
    pageQueryClick = (props, val) => {
        // 查询
        this.props.orgUnitCardVersionQueryAction(val);
    };

    onTabClick(key) {
        this.setState({
            selectedTab: key
        });
    }

    /**
     * 展示编辑页面的 tabs
     */
    showOrgtypeTabs(orginfoTypeTabsArr) {
        if (!Array.isArray(orginfoTypeTabsArr)) return '';
        if (orginfoTypeTabsArr.length < 1) {
            return ''
        }
        let defaultActiveKey = orginfoTypeTabsArr[0].id;
        return <div className="tabs-box" key={defaultActiveKey}>
            <NCTabs navtype="turn" contenttype="moveleft" defaultActiveKey={defaultActiveKey}
                    onChange={this.onTabClick.bind(this)}>
                {
                    orginfoTypeTabsArr.map((item) => {
                        return <NCTabPane tab={item.name} key={item.id}></NCTabPane>
                    })
                }
            </NCTabs>
        </div>
    }

    render() {
        const {
            versionInfoModalVisible,
            form,
            cardPagination
        } = this.props;
        const {createCardPagination} = cardPagination;
        const {createForm} = form;//创建表单，需要引入这个
        return (
            <NCModal
                backdrop="static"
                show={versionInfoModalVisible}
                size="lg"
                className="version-info-modal"
                onHide={this.closeInfoModal}
            >
                <NCModalHeader
                    closeButton={true}
                >
                    <div>
                        {/*国际化处理： 业务单元版本信息*/}
                        <div>{this.state.json['jf6005-000331']}</div>
                    </div>
                </NCModalHeader>
                <NCModalBody>
                    <div className="version-info-content">
                        <div className={'card-page'}>
                            {createCardPagination({
                                handlePageInfoChange: this.pageQueryClick
                            })}
                        </div>
                        {form.createForm('org_baseinfo')}
                        <div className={'version-info-content-tabs'}>
                            {this.showOrgtypeTabs(this.props.orginfoTypeTabsArr)}
                            <div style={{display: this.state.selectedTab === 'org_corp' ? '' : 'none'}}>
                                {createForm('org_corp')}
                            </div>
                            <div style={{display: this.state.selectedTab === 'org_hrorg' ? '' : 'none'}}>
                                {createForm('org_hrorg')}
                            </div>
                            <div style={{display: this.state.selectedTab === 'org_adminorg' ? '' : 'none'}}>
                                {createForm('org_adminorg')}
                            </div>
                        </div>

                    </div>
                </NCModalBody>
            </NCModal>
        );
    }
}

export default VersionInfoModal
