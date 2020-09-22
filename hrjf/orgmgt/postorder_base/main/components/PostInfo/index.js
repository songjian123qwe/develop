import React, {Component} from 'react';
import './index.less';
import {base, promptBox, toast} from 'nc-lightapp-front';
import enableAction from "../../container/functions/enableAction";
import getPostInfo from "../../container/functions/getPostInfo";
import updateSubButtonStatus from "../SubTable/functions/updateSubButtonStatus";
import setJobLevel from "./functions/setJobLevel";
import {THEME} from "../../../../../public/theme/theme";

const {NCSwitch} = base;

class PostInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            enablestate: '2', //2:已启用 3：已停用
            postName: ''
        };
        this.enableOrNot = this.enableOrNot.bind(this);
        this.onAfterFormEvent = this.onAfterFormEvent.bind(this);
        this.onBeforeFormEvent = this.onBeforeFormEvent.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.pk_postseries !== this.props.pk_postseries) {
            this.getPostInfo(nextProps.pk_postseries);
        }
    }

    reSearchPostInfo() {
        this.getPostInfo(this.props.pk_postseries)
    }

    onAfterFormEvent(props, moduleId, key, value, oldValue) {
        const {editTable, form} = this.props;
        if (key === 'inheritflag') {
            //if (value.value) {
            editTable.setTableData('postseries_levelrelation', {
                rows: []
            });
            //}
            updateSubButtonStatus.call(this, value.value, true)
        } else if (key === 'father_pk') {
            if (value.value !== this.lastValue) {
                editTable.setTableData('postseries_levelrelation', {
                    rows: []
                });
            }
            if (value.value) {
                form.setFormItemsDisabled('baseInfo', {'pk_joblevelsys': true});
                setJobLevel.call(this, value.value);
            } else {
                form.setFormItemsDisabled('baseInfo', {'pk_joblevelsys': false})
            }
        } else if (key === 'pk_joblevelsys') {
            if (value.value !== this.lastValue) {
                editTable.setTableData('postseries_levelrelation', {
                    rows: []
                });
            }
        }
    }

    onBeforeFormEvent(props, moduleId, key, value, oldValue) {
        this.lastValue = value.value;
        if (key === 'father_pk' || key === 'pk_joblevelsys') {
            let that = this;
            let meta = that.props.meta.getMeta();
            meta[moduleId].items.find(item => item.attrcode === key).queryCondition = function () {
                return {
                    "pk_org": that.props.pk_org,
                    "showDisable": false
                }
            };
            that.props.meta.setMeta(meta);
        }
        return true;
    }

    getPostInfo(pk_postseries) {
        getPostInfo.call(this, pk_postseries)
    }

    enableOrNot(value) {
        const msg = value ? this.props.json['jf6005-000134'] : this.props.json['jf6005-000133'];
        const baseInfo = this.props.form.getAllFormValue('baseInfo');
        if (this.props.appcode === '60054020' && baseInfo.rows[0].values.pk_org.value === 'GLOBLE00000000000000') {
            toast({color: "danger", content: `${this.props.json['jf6005-000313']}${msg}!`/*"数据不在管控范围内，不能{}!"*/});
            return;
        }
        /* 国际化处理： 启用,停用*/
        promptBox(
            {
                color: "warning",
                title: this.props.json['jf6005-000007'] + msg, /* 国际化处理： 确认*/
                content: `${this.props.json['jf6005-000167']}${msg}?`, /* 国际化处理： 是否确认要*/
                beSureBtnClick: () => {
                    enableAction.call(this, value)
                }
            })
    }

    render() {
        const {form, isEditing, pk_postseries} = this.props;
        return (
            <div className='post-info'>
                {pk_postseries && pk_postseries !== 'custom_root' && !isEditing ?
                    <div className="enable-switch">
                        <span className={`${THEME.fontc}`}>{this.state.postName}</span>{/* 国际化处理： 启用状态*/}
                        <NCSwitch
                            checked={this.state.enablestate === '2'}
                            onChange={this.enableOrNot}
                        />
                    </div> : null}
                {
                    form.createForm('baseInfo', {
                        onBeforeEvent: this.onBeforeFormEvent,
                        onAfterEvent: this.onAfterFormEvent
                    })
                }
            </div>
        );
    }
}

export default PostInfo;
