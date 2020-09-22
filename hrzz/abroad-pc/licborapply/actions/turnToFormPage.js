import {getBusinessInfo, cacheTools} from 'nc-lightapp-front';

let businessInfo = getBusinessInfo() || {};

import Common from '../../../../hrpub/common/actions';

export default class FormAction extends Common{
    constructor(comp) {
        super();
        this.comp = comp;
    }

    // 表单进入编辑态
    toEditStatus = (formValue) => {
        const {props} = this.comp;
        const {form, emp, button} = props;

        // 表单进入编辑   
        form.setFormStatus('card', 'edit');
        // 按钮进入编辑的按钮
        this.update({addPageStatus: 'edit'});

        if(formValue) {
            form.setAllFormValue({
                card: formValue
            });
        }
        button.setButtonVisible(emp.visible_add);
        if(emp.fromApprove) {  // 是否来自于审批中心的打开
            //字段是否可以编辑
            form.setFormItemsDisabled('card', {
                bill_code: true,
                pk_psnjob: true,
                apply_date: true
            });
        }
    }

    // 进入到新增页面
    toAddPage = async () => {
        const {props} = this.comp;
        const {form, dispatch, emp} = props;
        this.clearFormValue();
        try {
            let res = await dispatch({
                type: 'emp/toAddPage',
                payload: {
                    postData: {}
                }
            });
            if(res.success) {
                await this.update({
                    page: 'add'
                });
                this.toEditStatus(res.data.formData.head.card);
                form.setFormItemsDisabled('card', {
                 'bill_code': !res.data.isBillCodeEditable,})
            }
        }
        catch(e) {
            console.log('toAddPageError', e);
        }
    }

    // 进入到修改页面 
    toEditPage = async (record) => {
        const {props} = this.comp;
        const {form, dispatch, emp} = props;

        this.clearFormValue();
        let billid = '';
        if(record) {
            billid = record.values.pk_licbor.value;
        }else{
            billid = emp.pk_licbor
        }
        let postData = {
            billid: billid,
        };
        try {
            let res = await dispatch({
                type: 'emp/getMainTableOneData',
                payload: {
                    postData: postData
                }
            });
            if(!res.success) {
                return;
            }
            if(res.data && res.data.message) {
                this.toast({
                    color: 'danger',
                    content: res.data.message
                });
                return;
            }
            
            // let oneBillData = await this.getOneBillData(selectedRows); 
            let formData = this.deepCopy(res.data.formData.head.card);
            this.update({
                page: 'edit',
                addPageHistoryData: formData ,
                pk_licbor: formData.rows[0].values.pk_licbor.value
            });
            // form.setFormItemsDisabled('card', {
            //     // bill_code: !res.data.isBillCodeEditable,
            //     pk_psnjob: true,
            //     apply_date: false
            // });
            // 表单进入编辑   
            // form.setFormStatus('card', 'edit');
            // // 按钮进入编辑的按钮
            // this.update({addPageStatus: 'edit'});
            // form.setAllFormValue({
            //     card: res.data.data.card
            // });
            this.toEditStatus(formData);
            form.setFormItemsDisabled('card', {
                'bill_code': true})
        }
        catch(e) {
        }
    }

    // 直接进入预览页面 selectedRows, formValue
    toBrowsePage = async (record) => {
        const {props} = this.comp;
        const {form, dispatch, emp, cardPagination, button} = props;

        this.clearFormValue();
        let billid = '';
        if(record) {
            billid = record.values.pk_licbor.value;
        }else{
            billid = emp.pk_licbor
        }
        let postData = {
            billid: billid,
        }

        try {
            let res = await dispatch({
                type: 'emp/getMainTableOneData',
                payload: {
                    postData: postData
                }
            })
            if(res.success){
                let formData = this.deepCopy(res.data.formData.head.card);
                // this.toBrowseStatus(res.data.data.card); // .data.head.card  ?   res.data.data.card1
                await this.update({
                    page: 'edit',
                    addPageStatus: 'browse',
                    addPageHistoryData: formData,
                    pk_licbor: formData.rows[0].values.pk_licbor.value
                }); 
                // 表单进入编辑
                form.setFormStatus('card', 'browse');
                // 填充表单的值
                form.setAllFormValue({
                    card: formData
                });
                
                const isFree = formData.rows[0].values.approve_state && formData.rows[0].values.approve_state.value === '-1';
                const isSubmit = formData.rows[0].values.approve_state && formData.rows[0].values.approve_state.value === '3';
                button.setButtonVisible({
                    add: !emp.fromApprove,
                    edit: isFree,
                    del: isFree,
                    search: false,
                    commit: isFree,
                    recover: isSubmit && !emp.fromApprove,
                    aux_function: true,   // 更多
                    save: false,
                    cancel: false,
                    attachment: true,
                    refresh: true,
                })
                // 设置当前卡片id给卡片页的翻页使用
                setTimeout(() => {
                    cardPagination.setCardPaginationId({
                        id: formData.rows[0].values.pk_licbor.value,
                        status: 1
                    });
                },1);
            }
        }catch(e){

        }
    }

    // 清空form
    clearFormValue = () => {
        const {props} = this.comp;
        const {form, dispatch, button, emp} = props;

        form.setAllFormValue({
            card: {
                rows: [{
                    values: {
                    }
                }]
            }
        });
    }

    // 获取一条数据
    // getOneBillData = async (selectedRows) => {
    //     const {props} = this.comp;
    //     const {dispatch, emp} = props;
    //     let postData = {
    //         pk_licbor: selectedRows[0].values['pk_licbor'].value,
    //         pk_org: emp.orgValue ? emp.orgValue.refpk : businessInfo.groupId
    //     };

    //     try {
    //         let res = await dispatch({
    //             type: 'emp/getOneBillData',
    //             payload: {
    //                 postData: postData
    //             }
    //         });

    //         if(res.success) {
    //             this.update({
    //                 addPageHistoryData: this.deepCopy(res.data.head.card) 
    //             });

    //             return res;
    //         }
    //     }
    //     catch(e) {
    //         console.error(e);
    //     }

    //     return false;
    // }
    // 本节点更新
    update = async (obj) => {
        const {props} = this.comp;
        const {dispatch} = props;

        await dispatch({
            type: 'emp/update',
            payload: obj
        });
    }
}