/**
 * 组织版本化
 */
import React, {Component} from 'react';

import './index.less';

import {
    base
} from 'nc-lightapp-front';
import HRDeptVersionSaveAction from "../../functions/HRDeptVersionSaveAction";

const {
    NCModal,
    NCButton
} = base;

const {
    Header: NCModalHeader,
    Body: NCModalBody,
    Footer: NCModalFooter
} = NCModal;

const formid = 'dept_v_head';
const tableid = 'dept_v';

class DeptVerModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            json: props.json,
            inlt: props.inlt
        };
        this.closeInfoModal = this.closeInfoModal.bind(this);
        this.verifyOnlyInfo = this.verifyOnlyInfo.bind(this);
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

    verifyOnlyInfo() {
        let values = this.props.form.getAllFormValue(formid).rows[0].values;
        let pk_dept = this.props.pk_dept;
        let vname = values.vname.value;
        let vno = values.vno.value;
        let vstartdate = values.vstartdate.value;

        HRDeptVersionSaveAction.call(this, pk_dept, vname, vno, vstartdate)
    }

    closeInfoModal() {
        this.props.form.EmptyAllFormValue(formid);
        this.props.table.setAllTableData(tableid,{rows: []});
        this.props.updateState({
            deptVerModalVisible: false
        });
    }

    onRowDoubleClick(record, props, index, e) {

        let pk_vid = record && record.pk_vid && record.pk_vid.value || null;
        // 查询该条数据的值 显示弹窗
        this.props.orgUnitCardVersionQueryAction(pk_vid);
        this.props.updateState({
            versionInfoModalVisible: true
        })
    }

    render() {
        const {
            deptVerModalVisible,
            form,
            table
        } = this.props;
        return (
            <NCModal
                backdrop ="static"
                show={deptVerModalVisible}
                size="lg"
                className="deptVerModal"
                onHide={this.closeInfoModal}
                // onEntered={this.showHandle}
            >
                <NCModalHeader
                    closeButton={true}
                >
                    {this.state.json['jf6005-000021']}{/* 国际化处理： 版本化*/}
                </NCModalHeader>
                <NCModalBody>
                    <div className={'dept-version-warp'}>
                        <div className="org-version-header">
                            {form.createForm(formid)}
                        </div>
                        <div className="org-version-table">
                            {
                                table.createSimpleTable(tableid, {
                                    showIndex: true,
                                    cancelCustomRightMenu: true,
                                    // onRowDoubleClick: this.onRowDoubleClick.bind(this)
                                    // onAfterEvent:this.onTableModelAfterEdit.bind(this)
                                })
                            }
                        </div>
                    </div>
                </NCModalBody>
                <NCModalFooter>
                    <NCButton
                        colors="primary"
                        onClick={this.verifyOnlyInfo}
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

export default DeptVerModal
