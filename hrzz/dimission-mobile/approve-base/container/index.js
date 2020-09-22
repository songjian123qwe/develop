import React, {Component} from 'react';
import './index.less';
import {Container, CreateMeta} from '../../../public/hr-mobile-card/index';
import {initAction} from "../function/initAction";
import {addQueryCondition, getUrlParam} from "../util/util";
import NativeObj from '../../../public/mobile/utils/jsbridge/index.js';
import Modal from "antd-mobile/lib/modal";
import PropTypes from "prop-types";
import DFooter from "../../../public/mobile/components/Layout/Footer";
import resData from "./mock.json";
import {getMultiLang} from "../../../public/mobile/utils/getMultiLang";
import {commitAction} from "../function/commitAction";
import {afterAction} from "../function/afterEditAction";
import {compatibleNavImg} from "../../../public/mobile/utils/index";
import {beforeAction} from "../function/beforeEditAction";
import {saveCheck} from "../function/saveCheck";
import {debounce} from "../../../public/mobile/utils/utils";
import {COMMON as dimiCommon} from "../../dimission-approve/common/const";

if (new RegExp(/(localhost|127\.0\.0\.1):3006/g).test(window.location.href)) {
    sessionStorage.setItem('showNav', 'true');
}

let COMMON;

class ApproveComponent extends Component {
    static propTypes = {
        COMMON: PropTypes.object
    };

    static childContextTypes = {
        referAfterAct: PropTypes.func
    };

    getChildContext() {
        return {
            referAfterAct: this.resetHeader
        };
    }

    resetHeader = () => {
        this.editNav();
    };

    constructor(props) {
        super(props);
        this.pk_group = null;
        this.state = {
            json: [],
            store: null,
            formData: null,
            canEdit: true
        };
        COMMON = props.COMMON;
    }

    componentDidMount() {
        let hash = window.location.hash || window.location.search;
        if (!hash) {
            window.location.hash = `?&c=${COMMON.config.appcode}`;
        } else {
            if (hash.charAt(0) !== "#") {
                hash = '#' + hash;
            }
            if (hash.indexOf('?') === -1) {
                hash += '?'
            }
            if (!getUrlParam('c')) {
                hash += `&c=${COMMON.config.appcode}`
            }
            window.location.hash = hash;
        }
        this.getLanguage();
    }

    /**
     * 获取多语文件
     */
    getLanguage = () => {
        getMultiLang({
            domainName: 'hrzz',
            moduleId: 'hrzzmb',
            callback: (json, status, init) => {
                this.setState({
                    json: json
                }, () => {
                    this.initPage();
                })
            }
        })
    };

    initPage = () => {
        this.editNav();
        // this.setData(resData);
        // return;
        let billid;
        if (new RegExp(/(localhost|127\.0\.0\.1):3006/g).test(window.location.href)) {
            billid = COMMON.billid;
        } else {
            billid = getUrlParam('billid');
        }

        if (!billid) {
            // 弹窗提示未获取到单据id
            Modal.alert(
                this.state.json['hrzzmb-000029'],//失败
                this.state.json['hrzzmb-000116'],//未获取到单据id
                [{
                    text: this.state.json['hrzzmb-000003'], //确定
                    onPress: this.leftClick
                }]
            );
            return
        }
        initAction(billid, COMMON)
            .then(this.setData)
            .catch(err => {
                let message = err.data.error.message;
                Modal.alert(
                    this.state.json['hrzzmb-000029'],//失败
                    message,
                    [{
                        text: this.state.json['hrzzmb-000003'],//确定
                        onPress: this.leftClick
                    }]
                );
            })
    };

    /**
     * 返回 左上角的返回键
     */
    leftClick() {
        NativeObj.closePage();
    }

    editNav() {
        let cbs = {
            goBack2: this.leftClick
        };

        let parameters = {
            leftItems: [
                {
                    callback: 'goBack2',
                    icon: compatibleNavImg(window.location.origin + '/nccloud/resources/hrzz/public/mobile/static/icon/zuo.png')
                }
            ],
            centerItems: [
                {
                    title: this.state.json[COMMON.title],//离职审批
                }
            ],
            rightItems: []
        };
        let data = {
            'function': 'configNavBar',
            'parameters': parameters
        };
        NativeObj.configNavBar(data, cbs)
    }

    setData = (res) => {
        if ((!res.success) || (!res.data)) return;

        let formData = res.data.formData[COMMON.formId];
        let meta = res.data.template;

        if(COMMON.config.appcode === dimiCommon.config.appcode){
            // 离职审批 处理meta
            meta[COMMON.formId].items.map(item => {
                let queryCondition = {};
                this.pk_group = res.data.pk_group;
                if (item.code === 'newpk_dept') {
                    queryCondition = {
                        "TreeRefActionExt": "nccloud.web.hrhi.pub.sqlbuilder.DeptRefSqlBuilder",
                        "pk_org": res.data.pk_org,
                        "pk_group": res.data.formData[COMMON.formId].rows[0].values.newpk_org.value
                    };
                }
                if (item.code === 'newpk_org') {
                    queryCondition = {
                        "TreeRefActionExt": "nccloud.web.hrhi.psndoc.sqlbuilder.PsndocOrgRefSqlBuilder",
                        "pk_group": this.pk_group,
                        "pk_org": res.data.pk_org,
                    };
                }
                if (!item.hasOwnProperty('queryCondition')) {
                    item.queryCondition = {};
                }
                Object.assign(item.queryCondition || {}, queryCondition)
            });
        }

        // 模拟动态获取模板与数据
        let store = CreateMeta(meta, {
            onAfterHandle: this.onAfterHandle,
            onBeforeHandle: this.onBeforeHandle
        });
        let canEdit = true;
        if(res.data.hasOwnProperty('canEdit')){
            canEdit = !!res.data.canEdit;
        }
        this.updateState({
            store,
            formData,
            canEdit
        },()=>{
            this.state.store.setFormEditStatus(canEdit)
        });
    };

    save = () => {
        if (!debounce()) return;
        let check = this.state.store.checkAllFields(COMMON.formId);
        if (!check) return;
        let formData = this.state.store.getFormData(COMMON.formId);
        if (COMMON.hasOwnProperty('saveCheckUrl') && COMMON.saveCheckUrl) {
            this.saveCheck(formData, COMMON);
        } else {
            this.commit(formData, COMMON)
        }

    };

    saveCheck = (formData, COMMON) => {
        saveCheck(formData, COMMON)
            .then(res => {
                if (!res.success) return;
                this.commit(formData, COMMON)
            })
    };

    commit = (formData, COMMON) => {
        commitAction(formData, COMMON)
            .then(res => {
                if (res.success) {
                    Modal.alert(
                        this.state.json["hrzzmb-000035"], //成功
                        this.state.json["hrzzmb-000134"], //保存成功
                        [
                            {
                                text: this.state.json['hrzzmb-000003'], // 确定
                                onPress: () => {
                                    NativeObj.closePage();
                                }
                            }
                        ]
                    );
                } else {
                    let message = res.message || res.error.message;
                    Modal.alert(
                        this.state.json['hrzzmb-000029'], //失败
                        message
                    )
                }
            })
            .catch(err => {
                let message = err.data.error.message;
                Modal.alert(
                    this.state.json['hrzzmb-000029'],//失败
                    message,
                    [{
                        text: this.state.json['hrzzmb-000003'],//确定
                        onPress: this.leftClick
                    }]
                );
            })
    };

    cancel = () => {
        NativeObj.closePage();
    };

    /**
     * 编辑后事件
     * @param record
     */
    onAfterHandle = (record) => {
        if (!COMMON.hasEvent||!COMMON.afterEditUrl) return;
        let formId = COMMON.formId;
        let postData = this.state.store.getFormData(formId);
        if(COMMON.config.appcode === dimiCommon.config.appcode){
            if (record.key === 'oldpk_org') {
                let oldpk_dept = this.state.store.getFieldProps(formId, 'oldpk_dept').queryCondition;
                this.state.store.setFieldProps('oldpk_dept', formId, {
                    queryCondition: Object.assign(oldpk_dept, {
                        pk_org: record.value
                    })
                })
            }
            if (record.key === 'newpk_org') {
                let newpk_dept = this.state.store.getFieldProps(formId, 'newpk_dept').queryCondition;
                this.state.store.setFieldProps('newpk_dept', formId, {
                    queryCondition: Object.assign(newpk_dept, {
                        pk_org: record.value
                    })
                })
            }
        }
        afterAction(record.key, postData, COMMON)
            .then(res => {
                //设置form
                let {formData, visible, disable, required} = res.data;
                this.setFormItemsVisible(formId, visible);
                this.setFormItemsDisabled(formId, disable);
                this.setFormItemsRequired(formId, required);

                this.updateState({
                    formData: formData[formId]
                }, () => {
                    this.state.store.setFormEditStatus(true)
                });
            })
            .catch(err => {
                let message = err.data.error.message;
                Modal.alert(
                    this.state.json['hrzzmb-000029'],//失败
                    message,
                    [{
                        text: this.state.json['hrzzmb-000003'],//确定
                        onPress: () => {

                        }
                    }]
                );
            })
    };

    /**
     * 编辑前事件
     * @param key
     * @param record
     */
    onBeforeHandle = async (key, record) => {
        if (!COMMON.hasEvent||!COMMON.beforeEditUrl) return true;
        let formId = COMMON.formId;
        let formData = this.state.store.getFormData(formId);
        let flag = await beforeAction(key, formData, COMMON)
            .then(res => {
                this.state.store.setFieldProps(key, formId, {queryCondition: res.data.refParam});
                return true
            })
            .catch(err => {
                let message = err.data.error.message;
                Modal.alert(
                    this.state.json['hrzzmb-000029'],//失败
                    message,
                    [{
                        text: this.state.json['hrzzmb-000003'],//确定
                        onPress: () => {

                        }
                    }]
                );
                return false;
            });
        return flag
    };

    setFormItemsVisible(formId, data) {
        if (typeof data !== 'object') {
            return
        }
        for (let key in data) {
            this.state.store.setFieldProps(key, formId, {visible: data[key]})
        }
    }

    setFormItemsDisabled(formId, data) {
        if (typeof data !== 'object') {
            return
        }
        for (let key in data) {
            this.state.store.setFieldProps(key, formId, {disabled: data[key]})
        }
    }

    setFormItemsRequired(formId, data) {
        if (typeof data !== 'object') {
            return
        }
        for (let key in data) {
            this.state.store.setFieldProps(key, formId, {required: data[key]})
        }
    }

    updateState = (obj, callback = () => {
    }) => {
        this.setState({
            ...obj
        }, () => {
            callback();
        })
    };

    render() {
        let {store, formData, canEdit} = this.state;
        let style = {};
        (!canEdit) && (style.paddingBottom = 0);
        return (
            <div className={'dimission-approve'}>
                <div className={'warp'} style={style}>
                    {store&&<Container
                        store={store}
                        cardName={COMMON.formId}
                        data={formData}
                        hideHeader={true}
                        isEdit={true}
                    />}

                    {canEdit && <DFooter
                        buttons={[
                            {
                                type: 'brand',
                                title: this.state.json["hrzzmb-000117"],//'保存',
                                onClick: () => {
                                    this.save()
                                }
                            },
                            {
                                type: 'gray10',
                                title: this.state.json["hrzzmb-000024"],//'取消',
                                onClick: () => {
                                    this.cancel()
                                }
                            }
                        ]}
                    />}
                </div>
            </div>
        )
    }
}

export default ApproveComponent
