/**
 * 联查部门
 */
import React, {Component} from 'react';

import './index.less';

import {
    base
} from 'nc-lightapp-front';

const {
    NCModal,
    NCButton
} = base;

const {
    Header: NCModalHeader,
    Body: NCModalBody,
    Footer: NCModalFooter
} = NCModal;

class OrgDeptModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            json: props.json,
            inlt: props.inlt
        };
        this.showHandle = this.showHandle.bind(this);
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
            },()=>{
                nextinlt = null;
                nextjson = null;
                thisjson = null;
                thisinlt = null;
            })
        }
    }

    closeInfoModal() {
        this.props.updateState({
            orgDeptModalVisible: false
        },()=>{
            this.props.editTable.setTableData('orgdept', {rows: []})
        });
    }

    showHandle() {

    }

    render() {
        const {
            orgDeptModalVisible,
            editTable
        } = this.props;
        let {createEditTable} = editTable;
        return (
            <NCModal
                backdrop ="static"
                show={orgDeptModalVisible}
                size="lg"
                className="only-info-modal"
                onHide={this.closeInfoModal}
                onEntered={this.showHandle}
            >
                <NCModalHeader
                    closeButton={true}
                >
                    {this.state.json['jf6005-000094']}{/* 国际化处理： 联查部门*/}
                </NCModalHeader>
                <NCModalBody>
                    <div className="org-version-table">
                        {
                            createEditTable('orgdept', {
                                showIndex: true,
                                cancelCustomRightMenu: true,
                                showCheck: false
                            })
                        }
                    </div>
                </NCModalBody>
                <NCModalFooter>
                    <NCButton
                        colors="secondary"
                        onClick={this.closeInfoModal}
                    >
                        {this.state.json['jf6005-000031']}{/* 国际化处理： 关闭*/}
                    </NCButton>
                </NCModalFooter>
            </NCModal>
        );
    }
}

export default OrgDeptModal
