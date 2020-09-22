/**
 * 复制
 */
import React, {Component} from 'react';

import './index.less';

import {
    base,
    toast
} from 'nc-lightapp-front';
import CopySaveAction from "./functions/CopySaveAction";
import StdValidateAction from "../Header/functions/StdValidateAction";
import {COMMON} from "../../common/common";

const {
    NCModal,
    NCButton
} = base;
const {
    Header: NCModalHeader,
    Body: NCModalBody,
    Footer: NCModalFooter
} = NCModal;

const formid = 'copy_template';

class CopyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            json: props.json,
            inlt: props.json,
        };
        this.closeInfoModal = this.closeInfoModal.bind(this);
        this.cancel = this.cancel.bind(this);
        this.saveVersionInfo = this.saveVersionInfo.bind(this);
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
     * 关闭模块
     */
    closeInfoModal() {
        this.props.updateState({
            copyModalVisible: false
        });
        this.initParam();
    }

    /**
     * 保存
     */
    saveVersionInfo() {
        if (!this.props.form.isCheckNow(formid)) {
            return
        }
        this.copySaveAction();
    }

    /**
     * 确认保存
     */
    copySaveAction() {
        let formData = this.props.form.getAllFormValue(formid);
        let postcode = formData.rows[0].values.postcode.value;
        let postname = formData.rows[0].values.postname.value;
        CopySaveAction(this.props.pk_org, this.props.pk_post, postcode, postname).then(res => {
            toast({color: "success", content: this.state.json['jf6005-000183']});/* 国际化处理： 复制成功！*/
            // 关闭页面
            this.closeInfoModal();
            if(this.props.isDetail){
                this.props.updateState({
                    pk_post:res.data.head[COMMON.poststd_card].rows[0].values.pk_post.value
                })
            }else{
                this.props.getPostInfo();
            }
        })
    }

    cancel(){
        let pk_org = this.props.pk_org;
        let pk_post = this.props.pk_post;
        StdValidateAction(pk_org, pk_post, 6).then(res=>{

        });
        this.closeInfoModal();
    }

    /**
     * 初始化参数
     */
    initParam() {
        this.props.form.EmptyAllFormValue(formid);
    }


    updateState(data, cb = () => {
    }) {
        this.setState(data, cb);
    }

    render() {
        const {
            form,
            copyModalVisible
        } = this.props;
        return (
            <NCModal
                backdrop="static"
                show={copyModalVisible}
                size="lg"
                className="copy-modal"
                onHide={this.closeInfoModal}
                onEntered={this.showHandle}
            >
                <NCModalHeader
                    closeButton={true}
                >
                    {this.state.json['jf6005-000396']}{/* 国际化处理： 基准岗位复制*/}
                </NCModalHeader>
                <NCModalBody>
                    <div className={'form-box'}>
                        {form.createForm(formid)}
                    </div>
                </NCModalBody>
                <NCModalFooter>
                    <NCButton
                        colors="primary"
                        onClick={this.saveVersionInfo}
                    >
                        {this.state.json['jf6005-000007']}{/* 国际化处理： 确认*/}
                    </NCButton>
                    <NCButton
                        colors="secondary"
                        onClick={this.cancel}
                    >
                        {this.state.json['jf6005-000008']}{/* 国际化处理： 取消*/}
                    </NCButton>
                </NCModalFooter>
            </NCModal>
        );
    }
}

export default CopyModal
