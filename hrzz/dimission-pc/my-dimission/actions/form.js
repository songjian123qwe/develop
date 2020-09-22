import React from "react";
import {promptBox, toast} from 'nc-lightapp-front';
import handlePks from './handleAllpks';
import deepcopy from 'src/hrpub/common/utils/deep-copy';

export default class FormAction {
    constructor(comp) {
        this.comp = comp;
        this.dispatch = this.comp.props.dispatch;
    }

    tabBtnClick = (btnCode, record) => {
        switch (btnCode) {
            case 'submit':
                this.submit(record);
                break;
            case 'takeBack':
                this.takeBack(record);
                break;
            case 'edit':
                this.edit(record);
                break;
            case 'delete':
                this.delete(record);
                break;
            case 'checkWorkflow':
                this.checkWorkflow(record);
                break;
            case 'deptTrans':
                this.showDeptTrans(record);
                break;
            case 'disList':
                this.showDisList(record);
                break;
            default:
                break;
        }
    };

    add = async () => {
        const {props, action} = this.comp;
        const {modal, main, dispatch} = props;
        const {page, isEdit} = main;
        if (page === 'transItem') {
            action.transAct.addItem();
            if (!isEdit) {
                await dispatch({
                    type: 'main/update',
                    payload: {
                        isEdit: true
                    }
                });
                action.btnAct.updateBtnStatus();
            }
        } else {
            modal.show('selectType');
        }
    };

    confirmAdd = async (param) => {
        const {props, action} = this.comp;
        const {dispatch, form, meta} = props;
        const {transType} = param;

        let res = await dispatch({
            type: 'main/addNew',
            payload: {transType: transType.refpk}
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
                    transType: transType.refpk,
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
            if (res.data.form && res.data.form.head) {
                form.setAllFormValue({card: res.data.form.head.card})
            }
        }
    };

    edit = async (record) => {
        const {props, action} = this.comp;
        const {dispatch, form, meta, main} = props;
        const {page} = main;
        if (page === 'transItem') {
            await dispatch({
                type: 'main/update',
                payload: {
                    isEdit: true
                }
            });
            action.btnAct.updateBtnStatus();
        } else {
            let res = await dispatch({
                type: 'main/editData',
                payload: {
                    "billid": record.pk_hi_stapply.value,
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
                        isEdit: true,
                        transMode: res.data.form.head.card.rows[0].values.stapply_mode.value
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
                if (res.data.form && res.data.form.head) {
                    form.setAllFormValue({card: res.data.form.head.card})
                }
            }
        }
    };

    save = async () => {
        const {props, action} = this.comp;
        const {dispatch, form, main} = props;
        const {language, page, transItems, billid} = main;
        if (page === 'transItem') {
            let index = transItems.findIndex(item => !item.handoverman || !item.item || !item.handoverdate);
            if (index > -1) {
                toast({color: 'error', content: language['hrzzpc-000140']});
                return;
            }
            let transResult = deepcopy(transItems)
            let saveItem = [];
            transResult.map((item,index)=>{
                if(!item.pk_group || !item.pk_depthandover || !item.checkdate){
                    saveItem.push(item)
                }
            }) 
            
            saveItem.map(item=>{
                item.handoverman = item.handoverman_id
            })
            console.log(saveItem);
            let res = await dispatch({
                type: 'main/saveTransData',
                payload: {
                    billid,
                    formData: saveItem
                }
            });
            if (res.success) {
                await dispatch({
                    type: 'main/update',
                    payload: {
                        isEdit: false
                    }
                });
                action.btnAct.updateBtnStatus();
            }
        } else{
            if (!form.isCheckNow('card')) return;
            let formData = form.getAllFormValue('card');
            let status = form.getFormStatus('card');
            let postData = {
                model: formData,
                //opera_code: status === 'add' ? '1' : '2'
            };
    
            let res = await dispatch({
                type: 'main/saveCheck',
                payload: postData
            });
            if (res.success) {
                if (res.data && res.data.confirmMsg) {
                    promptBox({
                        color: "warning",
                        title: language['hrzzpc-000074'],
                        content: res.data.confirmMsg,
                        beSureBtnClick: () => {
                            if (res.data && res.data.warningMsg) {
                                toast({color: 'warning', content: language['hrzzpc-000080']});
                            }
                            this.confirmSave();
                        }
                    });
                } else {
                    if (res.data && res.data.warningMsg) {
                        toast({color: 'warning', content: language['hrzzpc-000080']});
                    }
                    this.confirmSave();
                }
            }
        }
        
    };

    confirmSave = async () => {
        const {props, action} = this.comp;
        const {dispatch, form, main, cardPagination} = props;
        const {language} = main;
        let formData = form.getAllFormValue('card');
        let status = form.getFormStatus('card');
        let postData = {
            model: formData,
            //opera_code: status === 'add' ? '1' : '2'
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
                    handleData: res.data.head.card.rows[0].values
                }
            });
            form.setFormStatus('card', 'browse');
            form.setAllFormValue({card: res.data.head.card});
            const billId = res.data.head.card.rows[0].values.pk_hi_stapply.value;
            handlePks.add(billId);
            cardPagination.setCardPaginationId({
                id: billId,
                status: 2
            });
            //action.tableAct.getData();
            action.btnAct.updateBtnStatus();
        }
    };
    //按照pk进行筛选content中的users
    selectPks =(pks)=>{
        const {props, action} = this.comp;
        const {dispatch, main} = props;
        const {language, page, transItems, billid} = main;
        let newUser = []
        let content = []
        return new Promise(async(resolve,reject)=>{
            let res = await dispatch({
                type: 'main/getTranslateData',
                payload: {billid:billid,isAssgin:false }
            });
            if (res.success) {
                    console.log(res)
                    if(res.data){
                        let resData = res.data.content[0] || {}
                            // this.setState({
                            //     referList: resData.assginUsers || [],
                            //     oriContent:res.data.content || []
                            // }, () => {
                                   
                            // })
                            content = res.data.content;
                            let users = content[0].assginUsers;
                            users.map((item)=>{
                                pks.map((pk)=>{
                                    if(pk === item.pk){
                                        newUser.push(item);
                                    }
                                })
                            })
                            content[0].assginUsers = newUser
                            resolve(content) 
                        }
                    }
                    else{
                        if(res.error){
                            console.log();
                            reject(res.error.message)
                        }
                    }
        }) 
    }
    submit = async (record) => {
        const {props, action} = this.comp;
        const {dispatch, main} = props;
        const {language, page, transItems, billid} = main;
        if (page === 'transItem') {
            let index = transItems.findIndex(item => !item.handoverman || !item.item || !item.handoverdate);
            if (index > -1) {
                toast({color: 'error', content: language['hrzzpc-000140']});
                return;
            }
            if(transItems.length < 1){
                toast({color: 'error', content: language['hrzzpc-000167'] || "请先新增交接项！"});
                return;
            }
            let pks = []
            transItems.map(item=>{
                pks.push(item.handoverman_id)
            })
            let resultItems = deepcopy(transItems)
           this.selectPks(pks).then(async(content)=>{
            resultItems.map(item=>{
                item.handoverman = item.handoverman_id
            })
                let res = await dispatch({
                    type: 'main/commitTransData',
                    payload: {
                        billid,
                        formData: resultItems,
                        content:content
                    }
                });
                if (res.success) {
                    await dispatch({
                        type: 'main/update',
                        payload: {
                            isEditable:res.data.isEditable,
                            isEdit: false
                        }
                    });
                    action.btnAct.updateBtnStatus();
                }
            })
            
        } else {
            promptBox({
                color: "warning",
                title: language['hrzzpc-000074'],
                content: language['hrzzpc-000097'],
                beSureBtnClick: async () => {
                    let postData = {
                        billids: [record.pk_hi_stapply.value]
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
        }

    };

    assignApp = async (assignInfo, callback) => {
        const {props, action} = this.comp;
        const {dispatch, main} = props;
        const {page, language, assignRecord} = main;
        let postData = {
            billids: [assignRecord.pk_hi_stapply.value],
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
                    billids: [record.pk_hi_stapply.value]
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
                    billids: [record.pk_hi_stapply.value]
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
                            id: record.pk_hi_stapply.value,
                            status: 1
                        });
                        handlePks.remove(record.pk_hi_stapply.value);
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
                const {props, action} = this.comp;
                const {main} = props;
                const {page} = main;
                if (page === 'transItem') {
                    console.log("部门交接部分");
                    
                    await this.dispatch({
                        type: 'main/update',
                        payload: {
                            isEdit: false,
                            transSearched: false
                        }
                    });
                    action.btnAct.updateBtnStatus();
                    // action.transAct.getTransItems();
                    action.transAct.handleDeptTrans();
                } else {
                    let formData = form.getAllFormValue('card');
                    let res = await this.dispatch({
                        type: 'main/cancel',
                        payload: {model: formData}
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
                                }
                            });
                            action.btnAct.updateBtnStatus();
                        }
                    }
                }
            }
        });
    };

    // 表单编辑前
    formBeforeEdit = async (platFormProps, formId, key, value, data) => {
        const {props} = this.comp;
        const {dispatch, form, meta, main} = props;
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
            model: formData,
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
            model: formData
        };

        let res = await dispatch({
            type: 'main/formAfterEdit',
            payload: postData
        });
        if (res.success) {
            if (res.data.form && res.data.form.head) {
                res.data.visible && form.setFormItemsVisible(area_code, res.data.visible);
                res.data.disable && form.setFormItemsDisabled(area_code, res.data.disable);
                res.data.required && form.setFormItemsRequired(area_code, res.data.required);
                form.setAllFormValue({card: res.data.form.head.card});
            }
        }
    };

    fileManage = (record) => {
        this.dispatch({
            type: 'main/update',
            payload: {
                showUploader: true,
                psndoc: record.pk_hi_stapply.value,
                isDisableUpload: !(record.workflow_state && record.workflow_state.value === '-1')
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
                billid: record.pk_hi_stapply.value,
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

    showDeptTrans = async (record) => {
        const {action, props} = this.comp;
        //我的离职页面不能看到hr提交的离职记录，部门工作交接按钮不和单据关联
        /*const {main} = props;
        const {page} = main;
        await this.dispatch({
            type: 'main/update',
            payload: {
                page: 'transItem',
                //billid: record.pk_hi_stapply.value,
                transItems: [],
                lastPage: page
            }
        });
        action.btnAct.updateBtnStatus();
        action.transAct.getTransItems();*/
        action.transAct.handleDeptTrans();
    };

    showDisList = async (record) => {
        const {action, props} = this.comp;
        const {main} = props;
        const {page} = main;
        await this.dispatch({
            type: 'main/update',
            payload: {
                page: 'disList',
                billid: record.pk_hi_stapply.value,
                lastPage: page
            }
        });
        action.btnAct.updateBtnStatus();
        action.disAct.getTreeData();
    };

    checkOneBill = async (record) => {
        const {props, action} = this.comp;
        const {dispatch, cardPagination, form} = props;
        let res = await dispatch({
            type: 'main/checkOneBill',
            payload: {
                billid: record.pk_hi_stapply.value
            }
        });
        if (res.success) {
            await dispatch({
                type: 'main/update',
                payload: {
                    page: 'detail',
                    isEdit: false,
                    handleData: res.data.form.head.card.rows[0].values
                }
            });
            cardPagination.setCardPaginationId({
                id: res.data.form.head.card.rows[0].values.pk_hi_stapply.value,
                status: 1
            });
            form.setFormStatus('card', 'browse');
            form.openArea('psninfo');
            form.openArea('oldinfo');
            form.openArea('newinfo');
            /*form.openArea('execinfo');
            form.openArea('audit_info');
            form.openArea('table_end_info');*/
            form.setAllFormValue({card: res.data.form.head.card});
            action.btnAct.updateBtnStatus();
        }
    };

    refresh = async () => {
        const {props, action} = this.comp;
        const {dispatch, main, form} = props;
        const {handleData} = main;
        if (handleData && handleData.pk_hi_stapply && handleData.pk_hi_stapply.value) {
            let res = await dispatch({
                type: 'main/checkOneBill',
                payload: {
                    billid: handleData.pk_hi_stapply.value
                }
            });
            if (res.success) {
                await dispatch({
                    type: 'main/update',
                    payload: {
                        handleData: res.data.form.head.card.rows[0].values
                    }
                });
                form.setAllFormValue({card: res.data.form.head.card});
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
                        handleData: res.data.form.head.card.rows[0].values
                    }
                });
                form.setAllFormValue({card: res.data.form.head.card});
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