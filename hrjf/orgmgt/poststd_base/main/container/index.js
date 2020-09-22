import React, {Component} from 'react';
import './index.less';
import {base, high, toast} from 'nc-lightapp-front';
import Header from "../components/Header";
import updateButtonStatus from "./functions/updateButtonStatus";
import TableInfo from "../components/TableInfo";
import DetailPage from "../components/DetailPage";
import CopyModal from "../components/copyModal";
import AddCondition from "../../../../public/functions/addCondition";
import tableRowAddLink from "../../../../public/functions/tableRowAddLink";
import {COMMON} from "../common/common";
import {THEME} from "../../../../public/theme/theme";

const {NCUploader} = high;
const searchId = 'qt';

class BasicArchiveBase extends Component {
    constructor(props) {
        super(props);
        this.config = {
            pagecode: props.pagecode,
            appcode: props.appcode
        };
        this.state = {
            json: {},
            showDisable: false,
            isDetail: false,  // 是否是详情页
            isEditing: false, // 详情页是否是编辑态
            gridrelationTable: [], // 详情页 table子集 [{name:'zhangsan',code:'code12',moduletype:'table'}]
            showUploader: false, // 文件管理
            pk_post: null, // 岗位
            postFlag: null, // 岗位序列
            postcode: null, // 岗位编码
            pageid: null, // 页面id  从 meger的接口获取
            copyModalVisible: false, // 复制模板  false：隐藏；  true ：显示
            isNewAddFlag: false, // 新增
            searchModalValue: null,
            templatePageId: null // template模板pageid 公式校验 用
        };

        this.updateState = this.updateState.bind(this);
        this.updateButtonStatus = this.updateButtonStatus.bind(this);
        this.refreshAll = this.refreshAll.bind(this);
        this.savePostInfo = this.savePostInfo.bind(this);
        this.add = this.add.bind(this);
        this.getPostInfo = this.getPostInfo.bind(this);
        this.setDetailStatus = this.setDetailStatus.bind(this);
        this.emptyDetailPage = this.emptyDetailPage.bind(this);
        this.getDetailPostInfo = this.getDetailPostInfo.bind(this);
        this.showDetail = this.showDetail.bind(this);
        this.onHideUploader = this.onHideUploader.bind(this);
        this.getGroupList = this.getGroupList.bind(this);
        this.beforeUpload = this.beforeUpload.bind(this);

    }

    /**
     * 页面初始化
     */
    pageInit() {
        //请求模板
        this.initUIDom();
        //加载多语
        this.getMultiLang();
    }

    /**
     * 加载多语
     */
    getMultiLang() {
        let callback = (json, status, inlt) => {
            if (status) {
                this.setState({json, inlt}) // 保存json和inlt到页面state中并刷新页面
            }
        };
        this.props.MultiInit.getMultiLang({moduleId: 'jf6005', domainName: 'hrjf', callback})
    }

    /**
     * 初始化模板
     */
    initUIDom() {
        let data = this.props.domTemplate;
        let formId = COMMON.poststd_card;

        let template = data.template;
        // 添加关联项
        if (!template.formrelation) {
            template.formrelation = {}
        }
        let formRelation = template.formrelation;
        // table 子集
        let gridrelationTable = [];
        // formrelation中的模板为form 删除table等
        for (let key in formRelation) {
            let formrelationArr = formRelation[key];
            if (key === formId) {
                // 添加table 子集
                let {moduletype, name, code} = template[formId];
                gridrelationTable.push({moduletype, code, name})
            }
            let newArr = formrelationArr.filter(formKey => {
                if (key === formId && template.hasOwnProperty(formKey) && template[formKey]["moduletype"] === "table") {
                    // 添加table 子集
                    let {moduletype, name, code} = template[formKey];
                    gridrelationTable.push({moduletype, code, name})
                }
                return template.hasOwnProperty(formKey) && template[formKey]["moduletype"] === "form"
            });
            formRelation[key] = newArr;
        }

        this.setState({
            queryOid: template[searchId].oid,
            buttons: data.button || [],
            context: data.context || {},
            gridrelationTable,
            templatePageId: template.pageid || ''
        });

        gridrelationTable.map(item => {
            if (item.moduletype !== 'table') return;
            let tableId = item.code;
            if (data.template.hasOwnProperty(tableId)) {
                data.template.gridrelation[tableId] = {
                    "srcAreaCode": tableId,
                    "destBrowseAreaCode": null,
                    "destEditAreaCode": null,
                    "tabRelation": [tableId]
                };
            }
        });
        this.updateState({
            pageid: data.template.pageid
        });

        let queryCondition = {
            pk_group: this.props.pk_org,
            pk_hrorg: this.props.pk_org,
            pk_org: this.props.pk_org
        };
        let poststdCard = data.template[formId];

        // 直接上级过滤集团岗位序列/岗位序列 过滤集团岗位序列
        this.addReferCondition(poststdCard, ['pk_dept', 'pk_postseries', 'suporior'], queryCondition);
        // 所属职务全局的不显示集团的职务
        this.addReferCondition(poststdCard, 'pk_job', {
            pk_group: this.props.groupId,
            pk_org: this.props.groupId
        });

        // 列表页 的组织名称 添加超链接
        tableRowAddLink(data.template['poststd_list'], 'postname', (record, index) => {
            this.postInfoNode.onRowDoubleClick(record, index)
        }, 'value');
        this.props.meta.setMeta((data && data.template) ? data.template : {}, () => {
            this.postInfoNode.getPostInfo(this.state.searchModalValue);
        });
        this.props.button.setButtons((data && data.button) ? data.button : {});
        updateButtonStatus.call(this);
    }

    componentDidMount() {
        this.pageInit();
    }

    updateState(data, callback = () => {
    }) {
        this.setState(data, callback)
    }

    /**
     * 添加参照条件
     * @param data object        模板数据
     * @param key  string|Array  参照的 attrcode
     * @param condition  obj     参照条件
     */
    addReferCondition(data, key, condition) {
        if (!data || !key || !condition) return;
        if (typeof key === 'string') {
            AddCondition(data, {
                ...condition
            }, key);
        } else if (Array.isArray(key)) {
            key.map(val => {
                AddCondition(data, {
                    ...condition
                }, val);
            })
        }
    }

    /**
     * 更新按钮状态
     */
    updateButtonStatus() {
        updateButtonStatus.call(this);
    }

    /**
     * 刷新
     * @param type
     */
    refreshAll(type) {
        this.postInfoNode.getPostInfo(() => {
            toast({color: 'success', content: this.state.json['jf6005-000339']});//刷新成功！
        });
    }

    /**
     * 获取列表信息
     * @param cb
     */
    getPostInfo(cb) {
        this.postInfoNode.getPostInfo(cb);
    }

    /**
     * 保存 ui_state 1:保存新增；  2：保存
     */
    savePostInfo(ui_state) {
        this.detailPostInfoNode.postSaveAction(ui_state)
    }

    /**
     * 保存 ui_state 1:保存新增；  2：保存
     */
    add() {
        this.updateState({
            isNewAddFlag: true
        });
        this.detailPostInfoNode.add()
    }

    /**
     * 显示详情页
     * @param isEditing  是否编辑态
     */
    showDetail(isEditing = false) {
        this.updateState({
            isDetail: true,
            isEditing
        }, () => {
            this.getDetailPostInfo();
        })
    }

    getDetailPostInfo() {
        this.detailPostInfoNode.getDetailInfo();
    }

    /**
     * 清空详情页数据
     */
    emptyDetailPage() {
        this.detailPostInfoNode.emptyDetailPage();
    }

    /**
     * 设置详情页状态
     * @param val    'edit': 编辑态；   browse：'浏览态'
     */
    setDetailStatus(val) {
        this.detailPostInfoNode.setDetailStatus(val === 'edit');
    }

    /**
     * 搜索dom点击查找
     */
    goSearch(props, searchData, type, queryInfo) {
        let data = this.props.search.getQueryInfo(searchId, true);

        this.updateState({
            searchModalValue: {
                ...data,
                oid: this.state.queryOid
            }
        }, () => {
            this.postInfoNode.getPostInfo(() => {
                toast({color: 'success', content: this.state.json['jf6005-000401']});//查询成功！
            });
            // 关闭查询区
            this.props.search.openAdvSearch(searchId, false);
        });
    }

    /**
     * 附件的关闭点击
     */
    onHideUploader = () => {
        this.setState({
            showUploader: false,
            groupLists: []
        })
    };

    /**
     * 获取当前附件列表
     * @param list
     */
    getGroupList = (list) => {
        //要在state里面顶一个变量，用来存储列表数组
        this.setState({
            groupLists: list
        })
    };

    /**
     * 加载前事件
     */
    beforeUpload(billId, fullPath, file, fileList) {
        // 参数：单据id，当前选中分组path、当前上传文件对象，当前文件列表

        // const isJPG = file.type === 'image/jpeg';
        //
        // const isLt2M = file.size / 1024 / 1024 < 2;
        // if (!isLt2M) {
        //     alert(this.state.json['jf6005-000059'])
        //     /* 国际化处理： 上传大小小于2M*/
        // }
        // return isJPG && isLt2M;
        return true
        // 备注： return false 不执行上传  return true 执行上传
    }

    render() {
        const {
            showDisable,
            isEditing,
            isDetail,
            json,
            gridrelationTable,
            templatePageId,
            showUploader,
            searchModalValue,
            pk_post,
            pageid,
            copyModalVisible,
            isNewAddFlag
        } = this.state;
        let {search} = this.props;
        return (
            <div className={`postseq-base ${THEME.bgCommon}`}>
                {/*复制*/}
                <CopyModal
                    {...this.props}
                    json={json}
                    isDetail={isDetail}
                    getPostInfo={this.getPostInfo}
                    getDetailPostInfo={this.getDetailPostInfo}
                    copyModalVisible={copyModalVisible}
                    updateState={this.updateState}
                    updateButtonStatus={this.updateButtonStatus}
                    pk_post={pk_post}
                />
                {/* search */}
                <div style={{display: 'none'}}>
                    {search.NCCreateSearch(searchId, {
                        clickSearchBtn: this.goSearch.bind(this),
                        onlyShowAdvArea: false,
                        showAdvSearchPlanBtn: true,
                        saveSearchPlan: true,
                        onlyShowSuperBtn: true,
                        replaceSuperBtn: this.state.json['jf6005-000063']/* 国际化处理： 查询*/
                    })}
                </div>

                {/* file */}
                <div className="nc-faith-demo-div2">
                    {/* 这里是附件上传组件的使用，需要传入三个参数 */}
                    {showUploader && <NCUploader
                        disableDownload={true}
                        billId={this.state.pk_post}
                        billNo={this.state.postcode}
                        // target={target}
                        customize={{uploadTrpe: '0'}}
                        placement={'bottom'}
                        getGroupList={this.getGroupList}
                        uploadTitle={this.state.json['jf6005-000062']}/* 国际化处理： 附件管理*/
                        onHide={this.onHideUploader} // 关闭功能
                        beforeUpload={this.beforeUpload}/>
                    }
                </div>

                <Header
                    {...this.props}
                    json={json}
                    isDetail={isDetail}
                    isEditing={isEditing}
                    pageid={pageid}
                    searchId={searchId}
                    updateState={this.updateState}
                    updateButtonStatus={this.updateButtonStatus}
                    setDetailStatus={this.setDetailStatus}
                    emptyDetailPage={this.emptyDetailPage}
                    showDisable={showDisable}
                    refreshAll={this.refreshAll}
                    savePostInfo={this.savePostInfo}
                    add={this.add}
                    isNewAddFlag={isNewAddFlag}
                    getPostInfo={this.getPostInfo}
                    getDetailPostInfo={this.getDetailPostInfo}
                    showUploader={this.showUploader}
                    pk_post={pk_post}
                />
                <div className='postseq-content'>
                    <TableInfo
                        {...this.props}
                        json={json}
                        searchModalValue={searchModalValue}
                        showDisable={showDisable}
                        isEditing={isEditing}
                        isDetail={isDetail}
                        updateState={this.updateState}
                        showDetail={this.showDetail}
                        updateButtonStatus={this.updateButtonStatus}
                        setDetailStatus={this.setDetailStatus}
                        ref={node => this.postInfoNode = node}
                    />
                    {gridrelationTable && gridrelationTable.length > 0 && <DetailPage
                        {...this.props}
                        json={json}
                        pageid={pageid}
                        updateState={this.updateState}
                        updateButtonStatus={this.updateButtonStatus}
                        pk_post={pk_post}
                        isEditing={isEditing}
                        isDetail={isDetail}
                        gridrelationTable={gridrelationTable}
                        templatePageId={templatePageId}
                        isNewAddFlag={isNewAddFlag}
                        setDetailStatus={this.setDetailStatus}
                        ref={node => this.detailPostInfoNode = node}
                    />}
                </div>
            </div>
        );
    }
}

export default BasicArchiveBase;
