/**
 * 曾任职人员
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

const formid = 'FormerStaff_info';
const tableid = 'FormerStaff_query';

class OutposModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            json: props.json,
            inlt: props.json
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

    closeInfoModal() {
        this.props.form.EmptyAllFormValue(formid);
        this.props.editTable.setTableData(tableid,{rows: []});
        this.props.updateState({
            outposVisible: false
        });
    }

    render() {
        const {
            outposVisible,
            form,
            editTable
        } = this.props;
        return (
            <NCModal
                show={outposVisible}
                size="lg"
                className="outposModal"
                onHide={this.closeInfoModal}
                // onEntered={this.showHandle}
            >
                <NCModalHeader
                    closeButton={true}
                >
                    {this.state.json['jf6005-000144']}{/* 国际化处理： 曾任职人员*/}
                </NCModalHeader>
                <NCModalBody>
                    <div className="org-version-header">
                        {form.createForm(formid)}
                    </div>
                    <div className="table-box">
                        {
                            editTable.createEditTable(tableid, {
                                showIndex: true,
                                cancelCustomRightMenu: true,
                                // onAfterEvent:this.onTableModelAfterEdit.bind(this)
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

export default OutposModal
