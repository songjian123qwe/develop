/**
 * 业务单元版本信息
 */
import React, {Component} from 'react';

import './index.less';

import {
    base,
    toast,
    cacheTools,
    cardCache
} from 'nc-lightapp-front';

let {getDefData} = cardCache;

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
            inlt: props.inlt
        };
        this.closeInfoModal = this.closeInfoModal.bind(this);
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

    /**
     * 关闭模板
     */
    closeInfoModal() {
        this.props.updateState({
            versionInfoModalVisible: false
        });
    }

    /**
     * 翻页插件 按钮点击事件
     */
    pageQueryClick = (props, val) => {
        // 查询
        this.props.orgUnitCardVersionQueryAction(val);
    };
    /**
     * 展示编辑页面的 tabs
     */
    showOrgtypeTabs(orginfoTypeTabsArr) {
        if(!Array.isArray(orginfoTypeTabsArr)) return '';
        if (orginfoTypeTabsArr.length < 1) {
            return ''
        }
        let {form} = this.props;
        const {createForm} = form;//创建表单，需要引入这个
        let defaultActiveKey = orginfoTypeTabsArr[0].id;
        return <div className="tabs-box" key={defaultActiveKey}>
            <NCTabs navtype="turn" contenttype="moveleft" defaultActiveKey={defaultActiveKey}>
                {
                    orginfoTypeTabsArr.map((item) => {
                        return <NCTabPane tab={item.name} key={item.id}>
                                {createForm(item.id)}
                                </NCTabPane>
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
        let title = this.state.json['jf6005-000331'];///* 国际化处理： 业务单元版本信息*/
        return (
            <NCModal
                backdrop ="static"
                show={versionInfoModalVisible}
                size="lg"
                className="version-info-modal"
                onHide={this.closeInfoModal}
            >
                <NCModalHeader
                    closeButton={true}
                >
                    <div>
                        <div>{title}</div>

                    </div>
                </NCModalHeader>
                <NCModalBody>
                    <div className="version-info-content">
                        <div className={'card-page'}>
                            {createCardPagination({
                                handlePageInfoChange: this.pageQueryClick
                            })}
                        </div>
                        {form.createForm('dept_info')}

                    </div>
                </NCModalBody>
            </NCModal>
        );
    }
}

export default VersionInfoModal
