import React, {Component} from 'react';
import './index.less';
import Header from "../components/Header";
import LeftTree from "../components/LeftTree";
import PostInfo from "../components/PostInfo";
import SubTable from "../components/SubTable";
import toggleModal from "./functions/toggleModalVisible";
import updateButtonStatus from "./functions/updateButtonStatus";
import saveNewPost from "./functions/saveNewPost";
import updateSubButtonStatus from "../components/SubTable/functions/updateSubButtonStatus";
import CopyModal from "../components/CopyModal";
import removeLeaf from "./functions/removeLeaf";
import {THEME} from "../../../../public/theme/theme";
import {getAppPageConfig, handleHash} from "src/hrpub/common/utils/utils";

@handleHash('20198162232323', '/ifr?page=20198162232323&c=60054010&p=60054010p&ar=0001Z700APPN60054010')

class PostOrderBase extends Component {
    constructor(props) {
        super(props);
        this.config = getAppPageConfig();
        this.state = {
            json: {},
            showDisable: false,
            pk_postseries: '',
            isEditing: false,
            copyModalVisible: false
        };
        props.createUIDom(this.config, (data) => {
            this.setState({
                buttons: data.button || [],
                context: data.context || {}
            });

            //data.template = processTemplate.call(this, data.template);

            props.meta.setMeta(data && data.template ? data.template : {});
            props.button.setButtons(data && data.button ? data.button : {});
        });
        props.MultiInit.getMultiLang({
            moduleId: 'jf6005', domainName: 'hrjf', callback: (json, status, inlt) => {
                if (status) {
                    this.setState({json, inlt})//存json和inlt到页面state中并刷新页面
                }
            }
        });
        this.updateState = this.updateState.bind(this);
        this.selectTree = this.selectTree.bind(this);
        this.disabledAllArea = this.disabledAllArea.bind(this);
        this.refreshAll = this.refreshAll.bind(this);
        this.savePostInfo = this.savePostInfo.bind(this);
        this.removeLeaf = this.removeLeaf.bind(this);
        updateButtonStatus.call(this);
    }

    componentDidMount() {
        if (window.location.href.match('localhost:3006')) window.location.hash = `#/ifr?page=20198162232323`;
    }

    updateState(data, callback = () => {
    }) {
        this.setState(data, callback)
    }

    // 切换各种弹窗显示隐藏，type为弹窗的显示隐藏state的key值
    toggleModal(type, visible) {
        return toggleModal.call(this, type, visible);
    }

    //左侧树节点选择回调
    selectTree(pk) {
        this.setState({
            pk_postseries: pk
        }, () => {
            updateButtonStatus.call(this);
        });
    }

    disabledAllArea(isEditing) {
        const {syncTree, form} = this.props;
        if (!isEditing) {
            this.postInfoNode.reSearchPostInfo();
        }
        syncTree.setNodeDisable('postOrder', isEditing);
        form.setFormStatus('baseInfo', isEditing ? 'edit' : 'browse');
        if (isEditing) {
            form.setFormItemsDisabled('baseInfo', {'pk_joblevelsys': !!form.getFormItemsValue('baseInfo', 'father_pk').value})
        }
        this.setState({
            isEditing
        }, () => {
            updateButtonStatus.call(this);
            updateSubButtonStatus.call(this, form.getFormItemsValue('baseInfo', 'inheritflag').value, isEditing);
        });
    }

    refreshAll() {
        this.leftTreeNode.refreshTree(() => {
            this.postInfoNode.reSearchPostInfo();
        })
    }

    savePostInfo() {
        saveNewPost.call(this);
    }

    afterSavePost(pk, pkName) {
        if (pk === this.state.pk_postseries) {
            const pkVal = this.props.syncTree.getSyncTreeValue('postOrder', pk);
            pkVal.name = pkName;
            pkVal.refname = pkName;
            pkVal.title = pkName;
            this.disabledAllArea(false);
        } else {
            this.setState({
                pk_postseries: pk
            }, () => {
                this.refreshAll();
                this.disabledAllArea(false);
            });
        }
    }

    removeLeaf() {
        removeLeaf.call(this);
    }

    render() {
        const {DragWidthCom} = this.props;
        const {showDisable, pk_postseries, isEditing, copyModalVisible, json} = this.state;
        return (
            <div className={`postseq-base ${THEME.bgc}`}>
                <Header
                    {...this.props}
                    json={json}
                    pk_postseries={pk_postseries}
                    isEditing={isEditing}
                    updateState={this.updateState}
                    showDisable={showDisable}
                    disabledAllArea={this.disabledAllArea}
                    refreshAll={this.refreshAll}
                    savePostInfo={this.savePostInfo}
                    removeLeaf={this.removeLeaf}
                />
                <div className='postseq-content'>
                    <DragWidthCom
                        leftDom={
                            <LeftTree
                                {...this.props}
                                json={json}
                                showDisable={showDisable}
                                pk_postseries={pk_postseries}
                                onSelect={this.selectTree}
                                treeId='postOrder'
                                ref={node => this.leftTreeNode = node}
                            />
                        }
                        rightDom={<div>
                            <PostInfo
                                {...this.props}
                                json={json}
                                pk_postseries={pk_postseries}
                                isEditing={isEditing}
                                ref={node => this.postInfoNode = node}
                            />
                            <SubTable
                                {...this.props}
                                json={json}
                            />
                        </div>}     //右侧区域dom
                        defLeftWid='20%'       // 默认左侧区域宽度，px/百分百
                    />
                </div>
                <CopyModal
                    {...this.props}
                    json={json}
                    pk_postseries={pk_postseries}
                    visible={copyModalVisible}
                    refreshAll={this.refreshAll}
                    onClose={this.toggleModal('copyModalVisible', false)}
                />
            </div>
        );
    }
}

export default PostOrderBase;
