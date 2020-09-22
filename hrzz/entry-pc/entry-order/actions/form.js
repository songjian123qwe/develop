import React from "react";
import {promptBox, toast} from 'nc-lightapp-front';
import handlePks from './handleAllpks';

export default class FormAction {
    constructor(comp) {
        this.comp = comp;
        this.dispatch = this.comp.props.dispatch;
    }

    tabBtnClick = (btnCode, record) => {
        switch (btnCode) {
            case 'commit':
                this.submit(record);
                break;
            case 'recover':
                this.takeBack(record);
                break;
            case 'edit':
                this.edit(record);
                break;
            case 'del':
                this.delete(record);
                break;
            case 'check_flow':
                this.checkWorkflow(record);
                break;
            default:
                break;
        }
    };

    add = async () => {
        const {props, action} = this.comp;
        const {dispatch, form, meta} = props;

        let res = await dispatch({
            type: 'main/addNew',
            payload: {}
        });
        if (res.success) {
            const template = meta.getMeta();
            let allArea = ['card'];
            if (template.formrelation) {
                allArea = allArea.concat(template.formrelation['card'] || [])
            }
            allArea.forEach(area => {
                if (res.data[area]) template[area] = res.data[area];
            });
            meta.setMeta(template);
            form.setFormStatus('card', 'add');
            await dispatch({
                type: 'main/update',
                payload: {
                    page: 'detail',
                    isEdit: true,
                    handleData: null
                }
            });
            action.btnAct.updateBtnStatus();
            // 是否禁用编码
            form.setFormItemsDisabled('card', {bill_code: !res.data.isBillCodeEditable, pk_psnjob: true});

            form.openArea('psninfo');
            form.openArea('oldinfo');
            form.openArea('newinfo');
            /*form.openArea('execinfo');
            form.openArea('audit_info');
            form.openArea('table_end_info');*/
            if (res.data.formData) {
                form.setAllFormValue({card: res.data.formData.card})
            }
        }
    };

    edit = async (record) => {
        const {props, action} = this.comp;
        const {dispatch, form, meta} = props;

        let res = await dispatch({
            type: 'main/editData',
            payload: {
                "area_code": "card",
                "billid": record.pk_hi_regapply.value,
                "page_code": "60092040nccloud",
                "isapprove": false
            }
        });
        if (res.success) {
            const template = meta.getMeta();
            let allArea = ['card'];
            if (template.formrelation) {
                allArea = allArea.concat(template.formrelation['card'] || [])
            }
            allArea.forEach(area => {
                if (res.data[area]) template[area] = res.data[area];
            });
            meta.setMeta(template);
            form.setFormStatus('card', 'edit');
            await dispatch({
                type: 'main/update',
                payload: {
                    page: 'detail',
                    isEdit: true
                }
            });
            action.btnAct.updateBtnStatus();
            // 是否禁用编码
            form.setFormItemsDisabled('card', {bill_code: !res.data.isBillCodeEditable, pk_psnjob: true});

            form.openArea('psninfo');
            form.openArea('oldinfo');
            form.openArea('newinfo');
            /*form.openArea('execinfo');
            form.openArea('audit_info');
            form.openArea('table_end_info');*/
            if (res.data.formData) {
                form.setAllFormValue({card: res.data.formData.card})
            }
        }
    };

    save = async () => {
        const {props, action} = this.comp;
        const {dispatch, form, main, cardPagination} = props;
        const {language} = main;
        if (!form.isCheckNow('card')) return;
        let formData = form.getAllFormValue('card');
        let status = form.getFormStatus('card');
        let postData = {
            formData: formData,
            area_code: 'card',
            page_code: '60092040nccloud',
            probationType: '1',
            opera_code: status === 'add' ? '1' : '2'
        };

        let res = await dispatch({
            type: 'main/saveData',
            payload: postData
        });
        if (res.success) {
            toast({color: 'success', content: language['hrzzpc-000080']});
            await dispatch({
                type: 'main/update',
                payload: {
                    isEdit: false,
                    handleData: res.data.formData.card.rows[0].values
                }
            });
            form.setFormStatus('card', 'browse');
            form.setAllFormValue({card: res.data.formData.card});
            const billId = res.data.formData.card.rows[0].values.pk_hi_regapply.value;
            handlePks.add(billId);
            cardPagination.setCardPaginationId({
                id: billId,
                status: 2
            });
            //action.tableAct.getData();
            action.btnAct.updateBtnStatus();
        }
    };

    submit = (record) => {
        const {props, action} = this.comp;
        const {dispatch, main} = props;
        const {language, page} = main;
        promptBox({
            color: "warning",
            title: language['hrzzpc-000074'],
            content: language['hrzzpc-000097'],
            beSureBtnClick: async () => {
                let postData = {
                    billids: [record.pk_hi_regapply.value]
                };
                let res = await dispatch({
                    type: 'main/submit',
                    payload: postData
                });
                if (res.success) {
                    if (res.data && res.data.errorMsg) {
                        toast({color: 'error', content: res.data.errorMsg});
                    } else {
                        if (res.data && res.data.content) {
                            this.dispatch({
                                type: 'main/update',
                                payload: {
                                    assignAppVisible: true,
                                    assignContent: res.data.content,
                                    assignRecord: record
                                }
                            });
                        } else {
                            toast({color: 'success', content: language['hrzzpc-000080']});
                            if (page === 'main') {
                                action.tableAct.getData();
                            } else {
                                this.checkOneBill(record);
                            }
                        }
                    }
                }
            }
        });
    };

    assignApp = async (assignInfo, callback) => {
        const {props, action} = this.comp;
        const {dispatch, main} = props;
        const {page, language, assignRecord} = main;
        let postData = {
            billids: [assignRecord.pk_hi_regapply.value],
            content: assignInfo
        };
        let res = await dispatch({
            type: 'main/submit',
            payload: postData
        });
        if (res.success) {
            if (res.data && res.data.errorMsg) {
                toast({color: 'error', content: res.data.errorMsg});
            } else {
                toast({color: 'success', content: language['hrzzpc-000080']});
                if (page === 'main') {
                    action.tableAct.getData();
                } else {
                    this.checkOneBill(assignRecord);
                }
                callback && callback();
            }
        }
    };

    takeBack = (record) => {
        const {props, action} = this.comp;
        const {dispatch, main} = props;
        const {language, page} = main;
        promptBox({
            color: "warning",
            title: language['hrzzpc-000074'],
            content: language['hrzzpc-000096'],
            beSureBtnClick: async () => {
                let postData = {
                    billids: [record.pk_hi_regapply.value]
                };
                let res = await dispatch({
                    type: 'main/takeBack',
                    payload: postData
                });
                if (res.success) {
                    if (res.data && res.data.errorMsg) {
                        toast({color: 'error', content: res.data.errorMsg});
                    } else {
                        toast({color: 'success', content: language['hrzzpc-000080']});
                        if (page === 'main') {
                            action.tableAct.getData();
                        } else {
                            this.checkOneBill(record);
                        }
                    }
                }
            }
        });
    };

    delete = (record) => {
        const {props, action} = this.comp;
        const {dispatch, main, cardPagination} = props;
        const {page, language} = main;
        promptBox({
            color: "warning",
            title: language['hrzzpc-000074'],
            content: language['hrzzpc-000095'],
            beSureBtnClick: async () => {
                let postData = {
                    billids: [record.pk_hi_regapply.value]
                };
                let res = await dispatch({
                    type: 'main/delete',
                    payload: postData
                });
                if (res.success) {
                    toast({color: 'success', content: language['hrzzpc-000080']});
                    if (page === 'main') {
                        action.tableAct.getData();
                    } else {
                        const nextPk = cardPagination.getNextCardPaginationId({
                            id: record.pk_hi_regapply.value,
                            status: 1
                        });
                        handlePks.remove(record.pk_hi_regapply.value);
                        this.pageQueryClick(null, nextPk);
                    }
                }
            }
        });
    };

    cancel = () => {
        const {props: {main: {language, handleData}, form}} = this.comp;
        promptBox({
            color: "warning",
            title: language['hrzzpc-000074'],
            content: language['hrzzpc-000081'],
            beSureBtnClick: async () => {
                const {action} = this.comp;
                let formData = form.getAllFormValue('card');
                let res = await this.dispatch({
                    type: 'main/cancel',
                    payload: {formData}
                });
                if (res.success) {
                    await this.dispatch({
                        type: 'main/update',
                        payload: {
                            isEdit: false
                        }
                    });
                    form.setFormStatus('card', 'browse');
                    if (handleData) {
                        this.checkOneBill(handleData);
                    } else {
                        await this.dispatch({
                            type: 'main/update',
                            payload: {
                                page: 'main',
                                handleData: null
                            }
                        });
                        action.btnAct.updateBtnStatus();
                    }
                }
            }
        });
    };

    // 表单编辑前
    formBeforeEdit = async (platFormProps, formId, key, value, data) => {
        const {props} = this.comp;
        const {dispatch, form, meta} = props;
        const template = meta.getMeta();
        let allArea = ['card'], targetItem = null;
        if (template.formrelation) {
            allArea = allArea.concat(template.formrelation['card'] || [])
        }
        allArea.some(area => {
            targetItem = template[area].items.find(item => item.attrcode === key);
            if (targetItem) {
                return true;
            }
        });
        if (!targetItem || targetItem.itemtype !== 'refer') return true;
        let formData = form.getAllFormValue('card');
        let postData = {
            key: key,
            formData
        };
        let res = await dispatch({
            type: 'main/formBeforeEdit',
            payload: postData
        });
        if (res.success) {
            if (res.data && res.data.refParam) {
                if (targetItem) {
                    targetItem.queryCondition = {
                        ...targetItem.queryCondition,
                        ...res.data.refParam
                    };
                    meta.setMeta(template);
                }
            }
            return true;
        }
    };

    // 表单编辑后
    formAfterEdit = async (platFormProps, formId, key, value, preVal) => {
        const {props} = this.comp;
        const {dispatch, form} = props;
        let area_code = 'card';
        let formData = form.getAllFormValue('card');

        let postData = {
            key: key,
            formData: formData,
            area_code: 'card',
            page_code: '60092040nccloud',
            probationType: '1'
        };

        let res = await dispatch({
            type: 'main/formAfterEdit',
            payload: postData
        });
        if (res.success) {
            if (res.data && res.data.formData) {
                res.data.visible && form.setFormItemsVisible(area_code, res.data.visible);
                res.data.disable && form.setFormItemsDisabled(area_code, res.data.disable);
                res.data.required && form.setFormItemsRequired(area_code, res.data.required);
                form.setAllFormValue({card: res.data.formData.card});
            }
        }
    };

    fileManage = (record) => {
        this.dispatch({
            type: 'main/update',
            payload: {
                showUploader: true,
                psndoc: record.pk_hi_regapply.value,
                isDisableUpload: !(record.approve_state && record.approve_state.value === '-1')
            }
        });
    };

    closeFileManage = () => {
        this.dispatch({
            type: 'main/update',
            payload: {
                showUploader: false,
                psndoc: ''
            }
        });
    };

    checkWorkflow = (record) => {
        this.dispatch({
            type: 'main/update',
            payload: {
                showFlow: true,
                billid: record.pk_hi_regapply.value,
                billtype: record.transtype.value || record.pk_billtype.value
            }
        });
    };

    closeFlow = () => {
        this.dispatch({
            type: 'main/update',
            payload: {
                showFlow: false
            }
        });
    };

    checkOneBill = async (record) => {
        const {props, action} = this.comp;
        const {dispatch, cardPagination, form} = props;
        let res = await dispatch({
            type: 'main/checkOneBill',
            payload: {
                billid: record.pk_hi_regapply.value
            }
        });
        if (res.success) {
            await dispatch({
                type: 'main/update',
                payload: {
                    page: 'detail',
                    isEdit: false,
                    handleData: res.data.formData.card.rows[0].values
                }
            });
            cardPagination.setCardPaginationId({
                id: res.data.formData.card.rows[0].values.pk_hi_regapply.value,
                status: 1
            });
            form.setFormStatus('card', 'browse');
            form.openArea('psninfo');
            form.openArea('oldinfo');
            form.openArea('newinfo');
            /*form.openArea('execinfo');
            form.openArea('audit_info');
            form.openArea('table_end_info');*/
            form.setAllFormValue({card: res.data.formData.card});
            action.btnAct.updateBtnStatus();
        }
    };

    refresh = async () => {
        const {props, action} = this.comp;
        const {dispatch, main, form} = props;
        const {handleData} = main;
        if (handleData && handleData.pk_hi_regapply && handleData.pk_hi_regapply.value) {
            let res = await dispatch({
                type: 'main/checkOneBill',
                payload: {
                    billid: handleData.pk_hi_regapply.value
                }
            });
            if (res.success) {
                await dispatch({
                    type: 'main/update',
                    payload: {
                        handleData: res.data.formData.card.rows[0].values
                    }
                });
                form.setAllFormValue({card: res.data.formData.card});
                action.btnAct.updateBtnStatus();
            }
        }
    };

    pageQueryClick = async (lastProps, billId) => {
        const {props, action} = this.comp;
        const {dispatch, form} = props;
        if (billId) {
            let res = await dispatch({
                type: 'main/checkOneBill',
                payload: {
                    billid: billId
                }
            });
            if (res.success) {
                await dispatch({
                    type: 'main/update',
                    payload: {
                        handleData: res.data.formData.card.rows[0].values
                    }
                });
                form.setAllFormValue({card: res.data.formData.card});
                action.btnAct.updateBtnStatus();
            }
        } else {
            /*await dispatch({
                type: 'main/update',
                payload: {
                    handleData: null
                }
            });
            form.EmptyAllFormValue('card');
            action.btnAct.updateBtnStatus();*/
            await this.dispatch({
                type: 'main/update',
                payload: {
                    page: 'main',
                    handleData: null
                }
            });
            action.btnAct.updateBtnStatus();
            action.tableAct.getData();
        }
    }
}