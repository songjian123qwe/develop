/**
 * 下级人员
 */
import React, {Component} from 'react';

import './index.less';

import {
    base
} from 'nc-lightapp-front';

const {
    NCModal,
    NCButton,
    NCSelect
} = base;

const {
    Header: NCModalHeader,
    Body: NCModalBody,
    Footer: NCModalFooter
} = NCModal;

const formid = 'Subordinate_info';
const tableid = 'Subordinate_query';

class JuniorModal extends Component {
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

    selectChange(value) {
        this.props.postSubordinateQuery(value)
    }

    closeInfoModal() {
        this.props.form.EmptyAllFormValue(formid);
        this.props.editTable.setTableData(tableid,{rows: []});
        this.props.updateState({
            juniorVisible: false
        });
    }

    render() {
        const {
            juniorVisible,
            form,
            editTable
        } = this.props;
        const selectDataSource = [
            {
                key: this.state.json['jf6005-000245'],//直接下级
                value: 1
            },
            {
                key: this.state.json['jf6005-000513'],//下两级
                value: 2
            },
            {
                key: this.state.json['jf6005-000514'], //下三级
                value: 3
            },
            {
                key: this.state.json['jf6005-000515'],//所有下级
                value: -1
            }
        ];
        return (
            <NCModal
                backdrop ="static"
                show={juniorVisible}
                size="lg"
                className="lowerLeverModal"
                onHide={this.closeInfoModal}
                // onEntered={this.showHandle}
            >
                <NCModalHeader
                    closeButton={true}
                >
                    {this.state.json['jf6005-000143']}{/* 国际化处理： 下级人员*/}
                </NCModalHeader>
                <NCModalBody>
                    <div className="org-version-header">
                        {form.createForm(formid)}
                    </div>

                    <div className="org-version-table">
                        <div className={'org-version-header-type'}>
                            <span className={'org-version-header-type-label'}></span>
                            <NCSelect
                                className={'org-version-header-type-select'}
                                style={{ width: 200 }}
                                placeholder="Select a person"
                                onChange={this.selectChange.bind(this)}
                                data={selectDataSource}
                                defaultValue={1}
                            />
                        </div>
                        <div className={'table-box'}>
                            {
                                editTable.createEditTable(tableid, {
                                    showIndex: true,
                                    cancelCustomRightMenu: true,
                                    // onAfterEvent:this.onTableModelAfterEdit.bind(this)
                                })
                            }
                        </div>
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

export default JuniorModal
