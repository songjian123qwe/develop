import React, {Component} from 'react';
import './index.less';
import {base, high} from 'nc-lightapp-front';
import Header from "../components/Header";
import updateButtonStatus from "./functions/updateButtonStatus";
import saveNewPost from "./functions/saveNewPost";
import TableInfo from "../components/TableInfo";

const tableid = '';
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
            pk_postseries: '',
            isEditing: false,
            copyModalVisible: false
        };
        props.createUIDom(this.config, (data) => {
            this.setState({
                buttons: data.button || [],
                context: data.context || {}
            });
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
        this.disabledAllArea = this.disabledAllArea.bind(this);
        this.refreshAll = this.refreshAll.bind(this);
        this.savePostInfo = this.savePostInfo.bind(this);
        updateButtonStatus.call(this);
    }

    componentDidMount() {
        if (window.location.href.match(/(localhost|127\.0\.0\.1):3006/g)) window.location.hash = `?&c=${this.props.appcode}&p=${this.props.pagecode}&ar=0001Z700APPN${this.props.appcode}`;
    }

    updateState(data, callback = () => {
    }) {
        this.setState(data, callback)
    }

    disabledAllArea(isEditing) {
        if (!isEditing) {
            this.postInfoNode.getPostInfo();
        }

        this.props.editTable.setStatus(tableid, isEditing ? 'edit' : 'browse');
        this.setState({
            isEditing
        }, () => {
            updateButtonStatus.call(this);
        });
    }

    refreshAll() {
        this.postInfoNode.getPostInfo();
    }

    savePostInfo() {
        saveNewPost.call(this);
    }

    render() {
        const {showDisable, pk_postseries, isEditing, json} = this.state;
        return (
            <div className="postseq-base">
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
                />
                <div className='postseq-content'>
                    <TableInfo
                        {...this.props}
                        json={json}
                        showDisable={showDisable}
                        isEditing={isEditing}
                        updateState={this.updateState}
                        ref={node => this.postInfoNode = node}
                    />
                </div>
            </div>
        );
    }
}

export default BasicArchiveBase;
