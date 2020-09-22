import React, {Component} from 'react';
import './index.less';
import Header from "../components/Header";
import ImgSetModal from "../components/ImgSetModal";
import OrgFlow from "../components/OrgFlow";
import getOrgData from "./functions/getOrgData";
import MainTable from "../components/MainTable";
import BaseSetModal from "../components/BaseSetModal";
import getImageConf from './functions/getImageConf';
import getHistory from './functions/getHistory';
import removeHistory from "./functions/removeHistory";
import getHistoryView from "./functions/getHistoryView";
import processTemplate from "./functions/processTemplateData";
import EditHistoryModal from "../components/EditHistoryModal";
import saveOrgView from './functions/saveOrgView';
import updateHistory from "./functions/updateHistory";
import updateButtonStatus from "./functions/updateButtonStatus";
import checkCanSet from "./functions/checkCanSet";
import {formatDate, handleHash} from "src/hrpub/common/utils/utils";
import OrgRefer from "src/hrpub/common/components/referSearch/org";

@handleHash('20198162232323', '/ifr?page=20198162232323&c=60056010&p=60056010p&ar=0001Z700APPN60056010')

class OrgViewBase extends Component {
    constructor(props) {
        super(props);
        this.config = {
            pagecode: props.pagecode,
            appcode: props.appcode
        };
        this.state = {
            json: {},
            imgSetModalVisible: false,
            baseSetModalVisible: false,
            editHistoryModalVisible: false,
            saveOptionModalVisible: false,
            page: 'main',
            hasImg: false,
            imageConf: {},
            showDefaultCheck: false,
            isAfterBase: false,
            hasHistory: false,
            hisImageConf: '',
            handleData: '',
            searching: props.nodeType === 'GROUP_NODE',
            orgVal: '',
            searched: false
        };
        props.MultiInit.getMultiLang({
            moduleId: 'jf6005', domainName: 'hrjf', callback: (json, status, inlt) => {
                if (status) {
                    this.setState({json, inlt: inlt.options && inlt.options.currentLocale}, () => {
                        props.createUIDom(this.config, (data) => {
                            this.setState({
                                buttons: data.button || [],
                                context: data.context || {}
                            });
                            processTemplate.call(this, data.template);
                            props.meta.setMeta(data && data.template ? data.template : {});
                            props.button.setButtons(data && data.button ? data.button : {});
                        });
                    })//存json和inlt到页面state中并刷新页面
                }
            }
        });
        this.updateState = this.updateState.bind(this);
        this.generate = this.generate.bind(this);
        this.setImageConf = this.setImageConf.bind(this);
        this.setBaseInfo = this.setBaseInfo.bind(this);
        this.getHistory = this.getHistory.bind(this);
        this.removeHistory = this.removeHistory.bind(this);
        this.beforeGenerate = this.beforeGenerate.bind(this);
        this.openView = this.openView.bind(this);
        this.beforeSaveView = this.beforeSaveView.bind(this);
        this.saveOrgView = this.saveOrgView.bind(this);
        this.saveHistory = this.saveHistory.bind(this);
        this.tabChange = this.tabChange.bind(this);
        this.selectSaveOption = this.selectSaveOption.bind(this);
        this.orgChange = this.orgChange.bind(this);
        updateButtonStatus.call(this);
    }

    componentDidMount() {
        if (window.location.href.match('localhost:3006')) window.location.hash = `#/ifr?page=20198162232323`;
        getImageConf.call(this, (value) => {
            this.setState({
                imageConf: value
            })
        });
        if (this.props.nodeType === 'GROUP_NODE') this.getHistory();
    }

    updateState(data, callback = () => {
    }) {
        this.setState(data, callback)
    }

    // 切换各种弹窗显示隐藏，type为弹窗的显示隐藏state的key值
    toggleModal(type, visible) {
        return this.setState({
            [type]: visible
        });
    }

    getHistory() {
        if (!this.state.searched) {
            this.setState({
                searching: true
            }, () => {
                getHistory.call(this);
            })
        } else {
            getHistory.call(this);
        }
    }

    removeHistory(record, index) {
        removeHistory.call(this, record, index)
    }

    openView(record) {
        this.baseInfo = {};
        getHistoryView.call(this, record, (data, orgData, hisImageConf, scale) => {
            const rootIndex = orgData.findIndex(item => item.isRoot);
            const org_Data = orgData.splice(rootIndex, 1)[0];
            const temp_Data = orgData;
            this.setState({
                page: 'img',
                hasImg: true,
                hisImageConf: hisImageConf,
                handleData: record
            }, () => {
                updateButtonStatus.call(this);
                this.orgFlowNode.generateHistoryTree(org_Data, temp_Data, scale);
            })
        })
    }

    editHistory(record) {
        this.props.form.setAllFormValue({'orgcharthisform': {rows: [{values: record}]}});
        this.props.form.setFormStatus('orgcharthisform', 'edit');
        this.saveType = 'data';
        this.setState({
            editHistoryModalVisible: true
        })
    }

    saveHistory(info, callback) {
        if (this.saveType === 'view') {
            this.saveOrgView(info, callback);
        } else {
            updateHistory.call(this, info, callback)
        }
    }

    /*
    * 图片已经加载的时候才改变
    * */
    setImageConf(value) {
        const {page} = this.state;
        if (page === 'main') {
            this.setState({
                imageConf: value
            }, () => {
                if (this.state.showDefaultCheck) {
                    this.generate();
                }
            })
        } else {
            const oldValue = JSON.parse(JSON.stringify(this.state.hisImageConf));
            if ((!this.baseInfo.orgpk || !this.baseInfo.orgpk.refpk) && !checkCanSet(value, oldValue)) return;
            this.setState({
                hisImageConf: value
            }, () => {
                this.orgFlowNode.resetStyle(oldValue);
            })
        }
    }

    setBaseInfo(value) {
        this.baseInfo = value;
        const {display_no_dialog} = this.state.imageConf;
        if (display_no_dialog === 'Y') {
            this.generate();
        } else {
            this.setState({
                imgSetModalVisible: true,
                showDefaultCheck: true,
                isAfterBase: true
            })
        }
    }

    //生成组织机构图
    generate() {
        const {imageConf} = this.state;
        getOrgData.call(this, (orgData) => {
            this.setState({
                page: 'img',
                hasImg: true,
                hisImageConf: imageConf,
                handleData: ''
            }, () => {
                updateButtonStatus.call(this);
                this.orgFlowNode.generateTree(orgData);
            })
        });
    }

    beforeGenerate() {
        getImageConf.call(this, (value) => {
            this.setState({
                imageConf: value,
                baseSetModalVisible: true
            })
        });
    }

    beforeSaveView() {
        /*if (this.state.handleData) {
            this.setState({
                saveOptionModalVisible: true
            })
        } else {*/
        this.props.form.setAllFormValue({'orgcharthisform': {rows: [{values: {}}]}});
        this.props.form.setFormItemsValue('orgcharthisform', {
            'createdate': {
                value: formatDate(new Date()),
                display: null
            }
        });
        this.props.form.setFormStatus('orgcharthisform', 'edit');
        this.saveType = 'view';
        this.setState({
            editHistoryModalVisible: true
        })
        // }
    }

    selectSaveOption(type) {
        if (type === 'cover') {
            this.props.form.setAllFormValue({'orgcharthisform': {rows: [{values: JSON.parse(JSON.stringify(this.state.handleData))}]}});
        } else {
            this.props.form.setAllFormValue({'orgcharthisform': {rows: [{values: {}}]}});
            this.props.form.setFormItemsValue('orgcharthisform', {
                'createdate': {
                    value: formatDate(new Date()),
                    display: null
                }
            });
        }
        this.props.form.setFormStatus('orgcharthisform', 'edit');
        this.saveType = 'view';
        this.setState({
            editHistoryModalVisible: true
        })
    }

    saveOrgView(info, callback) {
        const viewData = this.orgFlowNode.getSaveData();
        //console.log(info, viewData);
        saveOrgView.call(this, info, viewData, callback);
    }

    tabChange(value) {
        this.setState({
            page: value
        }, () => {
            updateButtonStatus.call(this);
            if (value === 'main') {
                this.getHistory();
            }
        });
    }

    orgChange(value) {
        this.setState({
            orgVal: value
        }, () => {
            updateButtonStatus.call(this);
            this.getHistory();
        })
    }

    render() {
        const {
            imgSetModalVisible, baseSetModalVisible, page, showDefaultCheck, handleData,
            imageConf, hasImg, hasHistory, hisImageConf, editHistoryModalVisible,
            isAfterBase, searching, orgVal, json, inlt
        } = this.state;
        const {button, table, form, treeTableManyCol, nodeType} = this.props;
        return (
            <div className="orgView-base">
                <Header
                    json={json}
                    inlt={inlt}
                    button={button}
                    page={page}
                    hasImg={hasImg}
                    updateState={this.updateState}
                    tabChange={this.tabChange}
                    getHistory={this.getHistory}
                    generate={this.beforeGenerate}
                    saveView={this.beforeSaveView}
                />
                <div className='orgView-content'>
                    <div
                        style={{display: page === 'main' ? 'block' : 'none'}}>
                        {
                            nodeType === 'ORG_NODE' ?
                                <div className='org-refer header'>
                                    <OrgRefer getOrgData={this.orgChange} orgVal={orgVal}/>
                                </div> : null
                        }
                        <MainTable
                            json={json}
                            table={table}
                            nodeType={nodeType}
                            orgVal={orgVal}
                            searching={searching}
                            removeHistory={this.removeHistory}
                            openView={this.openView}
                            hasHistory={hasHistory}/>
                    </div>
                    <div style={{visibility: page === 'img' ? 'visible' : 'hidden'}}>
                        <OrgFlow
                            json={json}
                            inlt={inlt}
                            page={page}
                            table={table}
                            treeTableManyCol={treeTableManyCol}
                            nodeType={nodeType}
                            baseInfo={this.baseInfo}
                            imageConf={imageConf}
                            hisImageConf={hisImageConf}
                            ref={node => this.orgFlowNode = node}/>
                    </div>
                </div>
                <ImgSetModal
                    json={json}
                    baseInfo={this.baseInfo}
                    visible={imgSetModalVisible}
                    showDefaultCheck={showDefaultCheck}
                    imageConf={imageConf}
                    handleData={handleData}
                    page={page}
                    isAfterBase={isAfterBase}
                    hisImageConf={hisImageConf}
                    onClose={() => {
                        this.setState({
                            isAfterBase: false,
                            imgSetModalVisible: false
                        })
                    }}
                    onSure={this.setImageConf}
                />
                <BaseSetModal
                    json={json}
                    nodeType={nodeType}
                    orgVal={orgVal}
                    visible={baseSetModalVisible}
                    onClose={() => this.toggleModal('baseSetModalVisible', false)}
                    onSure={this.setBaseInfo}
                />
                <EditHistoryModal
                    json={json}
                    form={form}
                    visible={editHistoryModalVisible}
                    onClose={() => this.toggleModal('editHistoryModalVisible', false)}
                    onSure={this.saveHistory}
                />
                {/*<SaveOptionModal
                    json={json}
                    visible={saveOptionModalVisible}
                    onClose={() => this.toggleModal('saveOptionModalVisible', false)}
                    onSure={this.selectSaveOption}
                />*/}
            </div>
        );
    }
}

export default OrgViewBase;
