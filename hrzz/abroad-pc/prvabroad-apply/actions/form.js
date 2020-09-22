
import { toast, promptBox, cacheTools } from 'nc-lightapp-front';
export default class FormAction {
    constructor(comp) {
        this.comp = comp;
    }


    didMount = () => {
    }

    // 进入到新增页面
    toAddPage = async () => {
        const { props, action } = this.comp;
        const { form, dispatch, exam } = props;
        // 清空数据

        form.EmptyAllFormValue('card')
        try {
            let res = await dispatch({
                type: 'exam/AddAction',
                payload: {
                    postData: {}
                }
            });
            if (res.success) {
                console.log(res)
                form.setFormStatus('card', 'add')
                action.btnAct.buttonTool(props, false)
                dispatch({
                    type: 'exam/update',
                    payload: {
                        cardMode: true,
                        editState: true,
                        page: 'add',
                        // type:res.data.form_card.card.rows[0].values.probation_type.value

                    }
                });

                // 卡片页禁用显示方法
                action.table.functionStateTool(res.data)

                // 是否禁用编码
                // if (res.data.isBillCodeEditable === true) {
                //     form.setFormItemsDisabled('card', { bill_code: false })
                // } else {
                //     form.setFormItemsDisabled('card', { bill_code: true })
                // }

                // 展开子列表
                // form.openArea('psninfo');
                // form.openArea('oldinfo');
                // form.openArea('newinfo');
                // form.openArea('execinfo');
                // form.openArea('audit_info');
                // setFormItemsValue
                // "pk_psnjob.pk_psndoc.name"res.data.form_card.card.rows[0].values.pk_psndoc
                // form.openArea('table_end_info');
                if (res.data) {
                    let card = {...res.data.form_card.card};
                    let psninfo = {...res.data.form_psninfo.psninfo}
                    let target ={...card.rows[0].values} 
                    let obj = psninfo.rows[0].values
                    for (let i in obj){
                        if(!obj[i].display || !obj[i].value){
                            obj[i] = card.rows[0].values[i]
                        }
                    }
                    Object.assign(target, psninfo.rows[0].values);
                    card.rows[0].values = {...target}
                    form.setAllFormValue({ card: card});
                }

            }
        }
        catch (e) {
            throw (e)
        }
    }

    // 保存数据
    saveItemState = async () => {

        const { props, action } = this.comp;
        const { form, dispatch, exam, cardPagination, button, meta} = props;
        let form_card = form.getAllFormValue('card')
        // let template = meta.getMeta()
        console.log(form_card);
        // console.log(template['card']);
         let plandays = form_card.rows[0].values['plandays'].value
         let reasonStr = form_card.rows[0].values['reason'].value
         let reason = 0
         if(reasonStr){
            reason = reasonStr.split('').length
            if(reasonStr.replace(/[\u0391-\uFFE5]/g,"aa")){
                reason = reasonStr.replace(/[\u0391-\uFFE5]/g,"aa").length
               }
         }
         let checkout = form.isCheckNow('card','warning');
        if(checkout){
            if(plandays < 0){
                toast({ color: 'warning', content:"回国日期不能早于启程日期"})
             }else if(reason >= 30){
                toast({ color: 'warning', content:"出国事由字符过长"})
             }
        }
        if(checkout && (plandays > 0) && (reason < 30)){
            try {
                let res = await dispatch({
                    type: 'exam/saveAction',
                    payload: {
                        postData: {
                            // opera_code: exam.page === 'add' ? '1' : '2',
                            // area_code: 'card',
                            // page_code: exam.config.pagecode,
                            form_card: form_card,
                            // pk_org: exam.refValue.refpk
                        }
                    }
                });
                if (res.success) {
                    console.log(res)
                    form.setAllFormValue({ card: res.data.form_card.card })
                    form.setFormStatus('card', 'browse')
    
                    //修改按钮状态
                    action.btnAct.functionSure(props, true, true)
    
                    button.setButtonsVisible({
                        edit: true
                    })
    
                    this.backButtonstate(false)
    
                    if (exam.page === 'add') {
    
                        // 如果为新增卡片页面，设置卡片翻页
                        exam.allpks.push(res.data.form_card.card.rows[0].values.pk_prvabroad.value)
    
                        cacheTools.set('allpks', exam.allpks)
                        dispatch({
                            type: 'exam/update',
                            payload: {
                                allpks: exam.allpks
                            }
                        });
                        cardPagination.setCardPaginationId({ id: res.data.form_card.card.rows[0].values.pk_prvabroad.value, status: 1 })
    
    
                    }
    
                    if (res.data && res.data.tip === true) {
                        toast({ color: 'info', content: res.data.tipMsg })
                    }
    
                    this.approveButton()
                    let card = res.data.form_card.card;
                    if(card.rows[0].values['approve_state'].value == '-1'){
                        button.setButtonsVisible({
                            edit: true,
                            commit:true,
                            recover:false,
                            del:true,
                            batchAdd: false,
                            search: false,
                        })
                    }else{
                        button.setButtonsVisible({
                            edit: false,
                            commit:false,
                            recover:true,
                            del:false,
                            batchAdd: false,
                            search: false,
                        })
                    }
    
                    // 保存成功
                    toast({ color: 'success', content: exam.json['ga6013-000011'] })
    
                    dispatch({
                        type: 'exam/update',
                        payload: {
                            page: '',
                            billid: res.data.form_card.card.rows[0].values.pk_prvabroad.value
                        }
                    });
                }
            }
            catch (e) {
                throw (e)
            }
        }
        
    }
    // 表单编辑前
    formBeforeEdit = async (platFormProps, formId, key = 'pk_psnjob', value, data) => {
        const { props } = this.comp;
        const { exam, dispatch, form, meta } = props;

        try {
            let postData = {
                key: key,
                pk_org: exam.refValue.refpk
            }

            // 判断是否为卡片模式
            exam.cardMode === true ? postData.form_card = form.getAllFormValue('card') : postData.form_card = form.getAllFormValue('card_batch')

            let res = await dispatch({
                type: 'exam/formEditBefore',
                payload: {
                    postData: postData

                }
            });
            let template = meta.getMeta();
            //if(res.data && res.data.refParam) {
            if (res.data) {
                template['psninfo'].items.map((items) => {
                    if('pk_license' === key){
                        if (items.attrcode === key) {
                            Object.assign(items.queryCondition,{
                                pk_psndoc: form.getAllFormValue('card').rows[0].values.pk_psndoc.value
                            },res.data.refParam);
                        }
                    }
                    if ('lic_no' === key) {
                        if (items.attrcode === key) {
                            Object.assign(items.queryCondition, {
                                // pk_org: emp.orgValue.refpk,
                                pk_psndoc: form.getAllFormValue('card').rows[0].values.pk_psndoc.value
                            }, res.data.refParam);
                        }
                    } else if ('pk_psnjob' === key) {
                        if (items.attrcode === key) {
                            Object.assign(items.queryCondition, {
                                "pk_org": emp.orgValue.refpk,
                                "GridRefActionExt": "nccloud.web.hr.ref.ga.LicensePsnRefSqlBuilder"
                            }, res.data.refParam);
                        }
                    }
                });
            }


            await new Promise((resolve, reject) => {
                meta.setMeta(template, resolve);

            });
            return true
        }
        catch (e) {
            throw (e)
            return false
        }
        return true
    }

    DateMinus=(date1,date2)=>{//date1:小日期   date2:大日期
          let sdate = new Date(date1); 
          let now = new Date(date2); 
          let days = now.getTime() - sdate.getTime(); 
          let day = parseInt(days / (1000 * 60 * 60 * 24)); 
          return day; 
    }
    // 表单编辑后
    formAfterEdit = (platFormProps, formId, key, value, preVal) => {
        const { props } = this.comp;
        const { exam, dispatch, form, meta } = props;
        let area_code = null
        let form_card = null

        if (exam.cardMode === true) {
            area_code = 'card'
            form_card = form.getAllFormValue(area_code);

        } else {
            area_code = 'card_batch'
            form_card = form.getAllFormValue(area_code);

        }
        let postData = {
            key: key,
            // area_code: area_code,
            form_card: form_card,
            // page_code: exam.cardMode === true ? exam.config.pagecode : `${exam.config.appcode}batchAdd`,
            // probationType: exam.type
        };

        dispatch({
            type: 'exam/formEditAfter',
            payload: {
                postData: postData
            }
        })
            .then((res) => {
                if (res.data && res.data.form_card) {
                    let resData = {...res.data.form_card.card};
                    if(res.data['pk_license.lic_type']){
                        // resData.areacode = "card";
                        resData.rows[0].values['pk_license.lic_type'] = {display:res.data['pk_license.lic_type'],value:res.data['pk_license.lic_type']};
                        // delete resData.areaType;
                    }
                    res.data.visible && form.setFormItemsVisible(area_code, res.data.visible)
                    res.data.disable && form.setFormItemsDisabled(area_code, res.data.disable)
                    res.data.required && form.setFormItemsRequired(area_code, res.data.required)
                    if (exam.cardMode === true) {
                        if((key == "planreturndate" && resData.rows[0].values['planbegindate'].value) || (key == "planbegindate" && resData.rows[0].values['planreturndate'].value)){
                            let beginDate = resData.rows[0].values['planbegindate'].value;
                            let returnDate = resData.rows[0].values['planreturndate'].value;
                            resData.rows[0].values['plandays'].value = this.DateMinus(beginDate,returnDate) + 1
                            // "plandays"
                        }
                        console.log(resData)
                        form.setAllFormValue({ card: resData});
                    } else {
                        form.setAllFormValue({ card_batch: res.data.form_card.card_batch })
                    }
                }
            });
    }


    // 返回主表页面
    goToBackMainPage = () => {
        const { props, action } = this.comp;
        const { exam, dispatch, button} = props;

        this.backButtonstate(false)
        dispatch({
            type: 'exam/update',
            payload: {
                cardMode: false,
                changeModdle:false,
            }
        });
        this.pubSub.publish('initData')

        action.btnAct.buttonTool(props, true)
        button.setButtonsVisible({
            del:false,
            commit:false,
            recover:false,
            attchment:false
        })
    }

    backButtonstate = (flag) => {
        const { props } = this.comp;
        const { button } = props;
        button.setButtonDisabled({
            edit: flag,
            del: flag,
            commit: flag,
            aux_function: flag, //辅助功能
            recover: flag,
            search: flag,
            refresh: flag,
            execute: flag, //执行
            print: flag, //打印
            organization: flag,//编辑情况
            sendMsg: flag,//发送通知
            out: flag,//输出
        })
    }

    // 从审批页面进入的按钮状态
    approveButton = () => {
        const { props, action } = this.comp;
        const { exam, dispatch, form, cardPagination, button } = props;
        if (exam.fromApprove === true) {
            button.setButtonsVisible({
                edit: true,
                del: false,
                commit: false,
                aux_function: false, //辅助功能
                recover: false,
                search: false,
                add: false,
                refresh: true,
                execute: false, //执行
                print: true, //打印
                organization: true,//编辑情况
                sendMsg: false,//发送通知
                out: true,//输出
            })
            button.setButtonDisabled({
                organization: false,
                out: false,
                print: false,
                refresh: false,
                edit: false
            })
        }
    }
    checkWorkflow = (record) => {
        const {props} = this.comp;
        const {dispatch} = props
        console.log(record)
        dispatch({
            type: 'exam/update',
            payload: {
                appshowFlow: true,
                appbillid: record.values.pk_prvabroad.value,
                appbilltype: record.values.pk_billtype.value
            }
        });
    };
    closeFlow = () => {
        const {props} = this.comp;
        const {dispatch} = props
        dispatch({
            type: 'exam/update',
            payload: {
                appshowFlow: false
            }
        });
    };
    // 查询单条数据
    oneAction = async (billid) => {
        const { props, action } = this.comp;
        const { exam, dispatch, form, cardPagination, button } = props;
        const { createCardPagination } = cardPagination;

        cardPagination.setCardPaginationId({ id: billid, status: 1 })


        // button.setButtonsVisible({
        //     edit: true,
        //     batchAdd: false,
        //     search: false,
        // })

        // 从审批页面进入的按钮状态
        this.approveButton()

        if (!billid) {
            this.backButtonstate(true)
            return
        }

        let postData = {
            billid: billid,
        }
        try {
            let res = await dispatch({
                type: 'exam/oneAction',
                payload: {
                    postData: postData
                }
            });
            if (res.success) {
                let approveinfo = {...res.data.form_approveinfo.approveinfo};
                let card = {...res.data.form_card.card};
                let psninfo = {...res.data.form_psninfo.psninfo}
                let target ={...card.rows[0].values} 
                let obj = psninfo.rows[0].values
                for (let i in obj){
                    if(!obj[i].display || !obj[i].value){
                        obj[i] = card.rows[0].values[i]
                    }
                }
                Object.assign(target, psninfo.rows[0].values);
                card.rows[0].values = {...target}
                form.setAllFormValue({ card: card});
                if(card.rows[0].values['approve_state'].value == '-1'){
                    button.setButtonsVisible({
                        edit: true,
                        commit:true,
                        recover:false,
                        del:true,
                        batchAdd: false,
                        search: false,
                        attchment:true
                    })
                }
                else if(card.rows[0].values['approve_state'].value == '1'){
                    button.setButtonsVisible({
                        edit: false,
                        commit:false,
                        recover:false,
                        del:false,
                        batchAdd: false,
                        search: false,
                        attchment:true
                    })
                }else{
                    button.setButtonsVisible({
                        edit: false,
                        commit:false,
                        recover:true,
                        del:false,
                        batchAdd: false,
                        search: false,
                        attchment:true
                    })
                }
                dispatch({
                    type: 'exam/update',
                    payload: {
                        billid: res.data.form_card.card.rows[0].values.pk_prvabroad.value
                    }
                });


                // form.openArea('psninfo');
                // form.openArea('oldinfo');
                // form.openArea('newinfo');
                // form.openArea('execinfo');
                // form.openArea('audit_info');
                // form.openArea('table_end_info');

            }
        }
        catch (e) {
            throw (e)
        }

    }

    //翻页

    cardPageInfo = (props, billid) => {
        this.oneAction(billid)
    }

    //修改
    editAction = () => {
        const { props, action } = this.comp;
        const { exam, dispatch, form } = props;
        action.table.editFunc()
    }
}