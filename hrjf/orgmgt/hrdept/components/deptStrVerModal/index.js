/**
 * 部门结构版本化
 */
import React, {Component} from 'react';

import './index.less';

import {
    base,
    toast
} from 'nc-lightapp-front';

import saveVersionInfo from '../../functions/HRDeptStruVerCreateAction';

const {
    NCModal,
    NCButton
} = base;

const {
    Header: NCModalHeader,
    Body: NCModalBody,
    Footer: NCModalFooter
} = NCModal;

let formid = 'deptStruversion';

class DeptStrVerModal extends Component {
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
            })
        }
    }

    saveVersionInfo() {
        let formCheck = this.props.form.isCheckNow(formid);
        if (!formCheck) {
            formCheck = null;
            return false;
        }
        let values = this.props.form.getAllFormValue(formid);
        // let values = this.props.form.getAllFormValue(formid).rows[0].values;

        saveVersionInfo(values, this.props.pk_org)
            .then((res) => {
                if(res.success) {
                    toast({color: "success", content: this.state.json['jf6005-000315']});/* 国际化处理： 部门结构版本化成功！！！*/
                    this.props.updateState({
                        deptStrVerModalVisible: false
                    });
                }
            });
    }

    closeInfoModal() {
        this.props.form.EmptyAllFormValue(formid);
        this.props.updateState({
            deptStrVerModalVisible: false
        });
    }

    showHandle() {
        this.props.form.setFormStatus(formid, 'add');
    }

    render() {
        const {
            deptStrVerModalVisible,
            form
        } = this.props;

        return (
            <NCModal
                backdrop ="static"
                show={deptStrVerModalVisible}
                size="xl"
                className="deptStruversion"
                onHide={this.closeInfoModal}
                onEntered={this.showHandle}
            >
                <NCModalHeader
                    closeButton={true}
                >
                    {this.state.json['jf6005-000020']}{/* 国际化处理： 部门版本化*/}
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

export default DeptStrVerModal
