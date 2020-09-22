import React, {Component} from 'react';
import './index.less';
import {base, high, toast} from 'nc-lightapp-front';
import addLine from "./functions/addLine";
import Refer from '../../../../../refer/jfref/JobLevelGridRef';

const addBtn = <button id='refer-container-button'/>;

class SubTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rowPks: []
        };
        this.onBtnOperation = this.onBtnOperation.bind(this);
        this.getQueryCondition = this.getQueryCondition.bind(this);
        this.referChange = this.referChange.bind(this);
        this.checkAddLine = this.checkAddLine.bind(this);
        this.onBeforeEvent = this.onBeforeEvent.bind(this);
        this.onAfterEvent = this.onAfterEvent.bind(this);
    }

    onBtnOperation(props, btncode, areacode, opt) {
        switch (btncode) {
            case 'delline':
                /*let selectedIndex;
                if (this.props.editTable.getCheckedRows('postseries_levelrelation').length) {
                    selectedIndex = this.props.editTable.getCheckedRows('postseries_levelrelation').map(item => item.index);
                } else {
                    selectedIndex = this.props.editTable.getClickRowIndex('postseries_levelrelation') && this.props.editTable.getClickRowIndex('postseries_levelrelation').index;
                }*/
                let selectedIndex = this.props.editTable.getCheckedRows('postseries_levelrelation').map(item => item.index);
                if (!selectedIndex.length) {
                    toast({color: "warning", content: this.props.json['jf6005-000312']});
                    break;
                }
                this.props.editTable.deleteTableRowsByIndex('postseries_levelrelation', selectedIndex, true);
                break;
            case 'addline':
                this.checkAddLine();
                break;
            default:
                break;
        }
    }

    checkAddLine() {
        const {form, syncTree, editTable} = this.props;
        const pk_joblevelsys = form.getFormItemsValue('baseInfo', 'pk_joblevelsys').value;
        if (!pk_joblevelsys) {
            toast({color: "danger", content: this.props.json['jf6005-000306']/*"请先设置职级类别"*/});
            return;
        }
        const father_pk = form.getFormItemsValue('baseInfo', 'father_pk').value;
        if (father_pk) {
            const fatherVo = syncTree.getSyncTreeValue('postOrder', father_pk);
            if (!fatherVo || !fatherVo.nodeData.nodeValue.pk_level_source || !fatherVo.nodeData.nodeValue.sourcetype) {
                toast({color: "danger", content: this.props.json['jf6005-000301']/*"上级岗位序列职级来源数据错误，请修改上级岗位序列"*/});
                return;
            }
        }
        this.setState({
                rowPks: editTable.getAllRows('postseries_levelrelation').map(item => {
                    return {
                        refpk: item.values.pk_joblevel.value
                    }
                })
            },
            document.getElementById('refer-container-button').click());
    }

    getQueryCondition() {
        const {form, syncTree, pk_org} = this.props;
        const pk_joblevelsys = form.getFormItemsValue('baseInfo', 'pk_joblevelsys').value;
        const father_pk = form.getFormItemsValue('baseInfo', 'father_pk').value;
        if (father_pk) {
            const fatherVo = syncTree.getSyncTreeValue('postOrder', father_pk);
            return {
                pk_org,
                pk_filtertype: fatherVo.nodeData.nodeValue.pk_level_source,
                intType: fatherVo.nodeData.nodeValue.sourcetype
            }
        } else {
            return {
                pk_org,
                pk_filtertype: pk_joblevelsys,
                intType: 4
            }
        }
    }

    referChange(data) {
        addLine.call(this, data)
    }

    // 点击参照前的事件
    onBeforeEvent(props, moduleId, key, value, changedrows, record, index) {
        let meta = this.props.meta.getMeta();
        if (key.attrcode === 'jobrank') {
            let editItem = meta[moduleId].items.find(item => item.attrcode === 'jobrank');
            editItem.isMultiSelectedEnabled = true;
            let param = {
                pk_org: this.props.pk_org,
                pk_joblevel: record.values.pk_joblevel.value
            };
            const father_pk = this.props.form.getFormItemsValue('baseInfo', 'father_pk').value;
            if (father_pk) {
                const fatherVo = this.props.syncTree.getSyncTreeValue('postOrder', father_pk);
                param.pk_filtertype = fatherVo.nodeData.nodeValue.pk_level_source;
                param.intType = fatherVo.nodeData.nodeValue.sourcetype;
            } else {
                param.pk_filtertype = record.values.pk_joblevel.value;
                param.intType = 4;
            }
            editItem.queryCondition = function () {
                return param;
            };
            this.props.meta.setMeta(meta);
        } else if (key.attrcode === 'defaultrank') {
            //if (!record.values.jobrank) return;
            let editItem = meta[moduleId].items.find(item => item.attrcode === 'defaultrank');
            let param = {
                pk_org: this.props.pk_org,
                filterPks: record.values.jobrank.value || 'XXXXXXX'
            };
            const father_pk = this.props.form.getFormItemsValue('baseInfo', 'father_pk').value;
            if (father_pk) {
                const fatherVo = this.props.syncTree.getSyncTreeValue('postOrder', father_pk);
                param.pk_filtertype = fatherVo.nodeData.nodeValue.pk_level_source;
                param.intType = fatherVo.nodeData.nodeValue.sourcetype;
            } else {
                param.pk_filtertype = record.values.pk_joblevel.value;
                param.intType = 4;
            }
            editItem.queryCondition = function () {
                return param;
            };
            this.props.meta.setMeta(meta);
        }
        return true;
    }

    // 点击后事件
    onAfterEvent(props, moduleId, key, value, changedrows, index, record) {
        if (key === 'jobrank') {
            if (value.length === 0) {
                this.props.editTable.setValByKeyAndIndex(moduleId, index, 'defaultrank', {
                    value: null,
                    display: null
                });
            } else if (value.length === 1) {
                this.props.editTable.setValByKeyAndIndex(moduleId, index, 'defaultrank', {
                    value: value[0].refpk,
                    display: value[0].refname
                });
            } else {
                const defaultTrankVal = this.props.editTable.getValByKeyAndIndex(moduleId, index, 'defaultrank');
                if (defaultTrankVal && defaultTrankVal.value && value.findIndex(item => item.refpk === defaultTrankVal.value) === -1) {
                    this.props.editTable.setValByKeyAndIndex(moduleId, index, 'defaultrank', {
                        value: null,
                        display: null
                    });
                }
            }
        }
    }

    render() {
        const {editTable, button} = this.props;

        return (
            <div className='post_level'>
                <div className='sub-table'>
                    {
                        editTable.createEditTable('postseries_levelrelation', {
                            showCheck: true,
                            onBeforeEvent: this.onBeforeEvent,
                            onAfterEvent: this.onAfterEvent
                        })
                    }
                </div>
                <div className='sub-button'>
                    <div style={{display: 'none'}}>
                        <Refer
                            isMultiSelectedEnabled={true}
                            isCacheable={false}
                            onChange={this.referChange}
                            queryCondition={this.getQueryCondition}
                            clickContainer={addBtn}
                            value={this.state.rowPks}
                        />
                    </div>
                    {button.createButtonApp({
                        area: 'body',
                        onButtonClick: (props, btncode) => {
                            this.onBtnOperation(props, btncode, 'body', this);
                        }
                    })}
                </div>
            </div>
        );
    }
}

export default SubTable;
