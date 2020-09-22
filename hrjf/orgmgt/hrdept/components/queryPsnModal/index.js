/**
 * 联查人员
 */
import React, {Component} from 'react';

import './index.less';

import {
    base
} from 'nc-lightapp-front';
import HRDeptVersionTreeRef from "../../../../refer/jfref/HRDeptVersionTreeRef";
import Transfer from '../../../../public/excomponents/Transfer';

const {
    NCModal,
    NCButton,
} = base;

const {
    Header: NCModalHeader,
    Body: NCModalBody,
    Footer: NCModalFooter
} = NCModal;

class QueryPsnModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            json: props.json,
            inlt: props.inlt
        };
        // this.state={};
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
     * 关闭模块
     */
    closeInfoModal() {
        this.props.form.EmptyAllFormValue("deptbudget");
        this.props.editTable.setTableData('deptpsn',{rows: []});
        this.props.updateState({
            queryPsnModalVisible: false
        });
    }

    render() {
        const {
            queryPsnModalVisible,
            form,
            editTable
        } = this.props;
        let { createEditTable } = editTable;
        return (
            <NCModal
                backdrop ="static"
                show={queryPsnModalVisible}
                size="lg"
                className={'queryPsnModal'}
                onHide={this.closeInfoModal}
            >
                <NCModalHeader
                    closeButton={true}
                >
                    {this.state.json['jf6005-000032']}{/* 国际化处理： 联查人员*/}
                </NCModalHeader>
                <NCModalBody>
                    <div className={'queryPsnModalHeader'}>
                        {form.createForm("deptbudget")}
                    </div>
                    <div className={'table-box'}>
                        {createEditTable('deptpsn',{
                            cancelCustomRightMenu: true,
                        })}
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

export default QueryPsnModal
