/**
 * 组织版本化
 */
import React, {Component} from 'react';

import './index.less';

import {
    base,
    toast
} from 'nc-lightapp-front';

import orgVersionSaveAction from '../../functions/orgVersionSaveAction';

const {
    NCModal,
    NCButton
} = base;

const {
    Header: NCModalHeader,
    Body: NCModalBody,
    Footer: NCModalFooter
} = NCModal;

const formid = 'org_v_head';
const tableid = 'org_v';

class OrgVerModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            json: props.json,
            inlt: props.inlt
        };
        this.showHandle = this.showHandle.bind(this);
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
            },()=>{
                nextinlt = null;
                nextjson = null;
                thisjson = null;
                thisinlt = null;
            })
        }
    }

    verifyOnlyInfo() {
        let formCheck = this.props.form.isCheckNow(formid);
        if (!formCheck) {
            return false;
        }
        let values = this.props.form.getAllFormValue(formid);

        let postData = values.rows[0].values;
        //获取选中行数据
        let selectMember = this.props.treeTableManyCol.getSelectedRow('orglist');
        let pk_org = selectMember[0].values.pk_org.value;
        let paramData = {
            pk_org: pk_org,
            vstartdate: postData.vstartdate.value,
            vname: postData.vname.value,
            vno: postData.vno.value
        };
        orgVersionSaveAction(paramData).then(res => {
            toast({
                color: 'success',
                content: this.state.json['jf6005-000043']/* 国际化处理： 保存成功！！！*/
            });
            this.props.updateState({
                orgVerModalVisible: false
            });
        });
        values = null;
        postData = null;
        selectMember = null;
        pk_org = null;
        paramData = null;
    }

    closeInfoModal() {
        this.props.updateState({
            orgVerModalVisible: false
        }, () => {
            this.props.form.EmptyAllFormValue(formid);
            this.props.table.setAllTableData(tableid, {rows: []});
        });
    }

    showHandle() {
        this.props.form.setFormStatus(formid, 'add');
    }

    render() {
        const {
            orgVerModalVisible,
            form,
            table
        } = this.props;
        return (
            <NCModal
                backdrop ="static"
                show={orgVerModalVisible}
                size="lg"
                className="orgVerModal"
                onHide={this.closeInfoModal}
                onEntered={this.showHandle}
            >
                <NCModalHeader
                    closeButton={true}
                >
                    {this.state.json['jf6005-000021']}{/* 国际化处理： 版本化*/}
                </NCModalHeader>
                <NCModalBody>
                    <div className={'org-ver-warp'}>
                        <div className="orgVerHeader">
                            {form.createForm(formid)}
                        </div>
                        <div className="orgVerTable">
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

export default OrgVerModal
