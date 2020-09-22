/**
 * VerModaltype: "", // "3":人力资源组织；"4":行政组织；
 * 人力资源组织/行政组织体系版本化
 */
import React, {Component} from 'react';

import './index.less';

import {
    base,
    toast
} from 'nc-lightapp-front';

import saveVersionInfo from '../../functions/saveVersionInfo';

const {
    NCModal,
    NCButton
} = base;

const {
    Header: NCModalHeader,
    Body: NCModalBody,
    Footer: NCModalFooter
} = NCModal;

let formid = 'orgStruversion';

class AosOrgVerModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            json: props.json,
            inlt: props.inlt
        };
        this.showHandle = this.showHandle.bind(this);
        this.closeInfoModal = this.closeInfoModal.bind(this);
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
            },()=>{
                nextinlt = null;
                nextjson = null;
                thisjson = null;
                thisinlt = null;
            })
        }
    }

    saveVersionInfo() {
        let values = this.props.form.getAllFormValue(formid);

        let postData = {
            model:values,
            type: this.props.verModaltype
        };

        saveVersionInfo(postData)
            .then((res) => {
                if(res.success) {
                    toast({
                        color: 'success',
                        content: this.state.json['jf6005-000333']/* 国际化处理： 版本化成功！*/
                    });
                    this.props.updateState({
                        aosOrgVerModalVisible: false
                    });
                }
            });
        values = null;
        postData = null;
    }

    closeInfoModal() {
        this.props.updateState({
            aosOrgVerModalVisible: false
        },()=>{
            this.props.form.EmptyAllFormValue(formid);
        });
    }

    showHandle() {
        this.props.form.setFormStatus(formid, 'add');
    }

    render() {
        // VerModaltype: "", // "3":人力资源组织；"4":行政组织；
        const {
            aosOrgVerModalVisible,
            form,
            verModaltype
        } = this.props;
        let title = "";
        if(verModaltype === "3"){
            title = this.state.json['jf6005-000092']/* 国际化处理： 人力资源组织体系版本化*/
        }else if(verModaltype === "4"){
            title = this.state.json['jf6005-000093']/* 国际化处理： 行政组织体系版本化*/
        }
        return (
            <NCModal
                backdrop ="static"
                show={aosOrgVerModalVisible}
                size="lg"
                className="only-info-modal"
                onHide={this.closeInfoModal}
                onEntered={this.showHandle}
            >
                <NCModalHeader
                    closeButton={true}
                >
                    {title}
                </NCModalHeader>
                <NCModalBody>
                    <div className="only-info-content">
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
                        onClick={this.closeInfoModal}
                    >
                        {this.state.json['jf6005-000008']}{/* 国际化处理： 取消*/}
                    </NCButton>
                </NCModalFooter>
            </NCModal>
        );
    }
}

export default AosOrgVerModal
