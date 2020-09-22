import {fixedCol,snCreateUIDom} from "../../../../hrpub/common/utils/utils";
import CommonAction from './common';
import moment from 'moment';
import canst from './constant.js'
import { getAppPageConfig } from 'src/hrpub/common/utils/utils';
import {getBusinessInfo} from 'nc-lightapp-front';
import { async } from "q";
let businessInfo = getBusinessInfo() || {};


export default class main extends CommonAction{

    constructor(comp) {
        super()
        this.comp = comp;
    }
    
    appConfig = {
        appcode:'60651110',
        pagecode:'60651110p'
    }
    // appConfig = {
    //     appcode: 'YH110201',
    //     pagecode:'YH110201nccloud'
    //     }
    // appConfig = getAppPageConfig()
    

    didMount = () => {
            this.blinkApprove()//审批中心相关
            // this.background();
            this.getTemplate()
            this.subscribe()
            this.getHeight()
            this.getLanguage('ga6013', 'hrzz', (language) => {
                this.getMultLanguage(language);
                this.initData()
            });
           this.nodeBackground()
    }
    background = () =>{
        document.querySelector('body').classList.add('workbench-black','nc-lightapp-front-black')
        var a1 = document.createElement('link')
        a1.href='/nccloud/resources/platform/nc-lightapp-front/nc-lightapp-front-black.css'
        a1.rel="stylesheet"
        document.querySelector('head').appendChild(a1);
        document.querySelector('body').classList.remove('nc-no-theme')
    }
    nodeBackground = () =>{
        const {props, action} = this.comp;
        const {dispatch,exam} = props;
        if(document.getElementsByTagName('body')[0].getAttribute('class').indexOf('nc-lightapp-front-black') > -1) {
        dispatch({
            type: 'exam/update',
            payload: {
                dark:true
            }
        });
        }
    }
    didUpdate = () => {
        
    }
    getMultLanguage = (language) =>{
        const {props, action} = this.comp;
        const {dispatch,exam} = props;
        dispatch({
            type: 'exam/update',
            payload: {
                json:language
            }
        });
    }
    /* 获取当前页面可见高度 */
	getHeight = () => {
        const {props, action} = this.comp;
        const {dispatch,exam} = props;
		let wH = window.innerHeight,
			domHeight = 0,
			gap = 140;

			domHeight += document.querySelector('header') && document.querySelector('header').clientHeight;
			domHeight += document.querySelector('.ncc-hr-pagination-wrapper')
				? document.querySelector('.ncc-hr-pagination-wrapper').clientHeight
				: 32;

        dispatch({
            type: 'exam/update',
            payload: {
                height:wH - domHeight - gap
            }
        });
	};
     // 事件订阅部分
     subscribe = () => {
        const {comp: {action}, pubSub} = this;
        pubSub.subscribe('initData',async (...args) => {
           await action.table.initData(...args);
        });
        pubSub.subscribe('toAddPage', (...args) => {
            action.formAct.toAddPage(...args);
            
        });
        pubSub.subscribe('saveItemState', (...args) => {
            action.formAct.saveItemState(...args);
            
        });
    }

        // 确认查询
    toSearch = () => {
        const {props,action} = this.comp;
        const {search,dispatch} = props;
        action.table.initData({
            queryCondition:search.getQueryInfo('query',true)
        });
        dispatch({
            type: 'exam/update',
            payload: {
                queryCondition:search.getQueryInfo('query',true)
            }
        });
        action.main.initTemplate()
    }
    initData = () =>{
        const {props,action} = this.comp;
        action.btnAct.visibleTool(false)
        setTimeout(()=>{
            this.pubSub.publish('initData', {
                pk_org: '0001AB10000000000QC5'
            });
        },500)
    }
    getTemplate = () => {
       this.getMultiTemplate(canst.templateOption)
    }
    initTemplate = () =>{
        const { props, action} = this.comp;
        const {
            exam,
            button,
            dispatch,
            meta
        } = props;
      let template = meta.getMeta();
    //   template['list'].items.map((item,index)=>{
    //       if(item.attrcode == 'opr'){
    //         template['list'].items.splice(index,1)
    //       }
    //   })
      template['list'].items.pop()
      template['list'].items.push({
        itemtype: 'customer',
        label: exam.json['ga6013-000004'],/* 国际化处理： 操作*/
        visible: true,
        fixed: 'right',
        width:'200px',
        attrcode: 'opr',
        render: (text, record, index) => {
            return (
                
                <div>
                        <If condition = {record.values.approve_state.value == "-1"}>
                            <a 
                                href="javascript:void(0)"
                                style={{marginRight:'5px',textDecoration:'none'}}
                                onClick={(e)=>action.table.batchCommit(record.values.pk_prvabroad.value)}
                            >
                               
                               {exam.json['ga6013-000018'] || '提交'}
                            </a>
                            <a 
                                href="javascript:void(0)"
                                style={{marginRight:'5px',textDecoration:'none'}}
                                onClick={action.table.editTableRow(record,index)}
                            >
                                 {exam.json['ga6013-000029'] || '修改'}
                            </a>
                            <a 
                                href="javascript:void(0)"
                                style={{marginRight:'5px',textDecoration:'none'}}
                                onClick={(e)=>action.table.batchDelete(record.values?record.values.pk_prvabroad.value:exam.billid)}
                            >
                                 {exam.json['ga6013-000030'] || '删除'}
                            </a>
                        </If>
                        <If condition = {record.values.approve_state.value !== "-1" && record.values.approve_state.value !== "1"}>
                            <a 
                                href="javascript:void(0)"
                                style={{marginRight:'5px',textDecoration:'none'}}
                                onClick={(e)=>action.table.batchBack(record.values.pk_prvabroad.value)}
                            >
                                 {exam.json['ga6013-000062'] || '收回'} 
                            </a>
                        </If>
                        <If condition = {record.values.def1.value !== "2" && record.values.def1.value !== "0" && record.values.approve_state.value !== "-1"}>
                            <a 
                                href="javascript:void(0)"
                                style={{textDecoration:'none'}}
                                onClick={(e)=>action.formAct.checkWorkflow(record)}
                            >
                                 {exam.json['ga6013-000028'] || '查看审批意见'}
                            </a>
                        </If>
                </div>
            );
        }})
    }
    attachment = () =>{
        const { props, action} = this.comp;
        const {
            exam,
            button,
            form,
            dispatch
        } = props;
        let formValue = form.getAllFormValue('card');
        // console.log(formValue)
        dispatch({
            type:'exam/update',
            payload:{
                showUploader:true,
                uploadBillstate:formValue.rows[0].values.approve_state.value,
                uploadBillid:formValue.rows[0].values.pk_prvabroad.value,
                uploadBillType:formValue.rows[0].values.pk_billtype.display,
                uploadBillCode:formValue.rows[0].values.bill_code.value
            }
        })
    }
    processTemplate = (res) => {
        const { props, action} = this.comp;
        const {
            exam,
            button,
            dispatch
        } = props;
        // 给每个字段添加查询对象
        let template = res.template
        template['list'].items.push({
            // attrcode: 'downFile',
            itemtype: 'customer',
            label:  exam.json['ga6013-000031'],/* 国际化处理： 附件管理*/
            visible: !exam.isApproved,
            fixed: 'right',
            width:'200px',
            attrcode: 'opr',
            render: (text, record, index) => {
                return (
                    <div>
                            <span className = 'downlode hrfont' onClick={(e) => {
                                console.log(record);
                                dispatch({
                                    type:'exam/update',
                                    payload:{
                                        showUploader:true,
                                        uploadBillstate:record.values.approve_state.value,
                                        uploadBillid:record.values.pk_prvabroad.value,
                                        uploadBillType:record.values.pk_billtype.display,
                                        uploadBillCode:record.values.bill_code.value
                                    }
                                })
                            }}>&#xe62f;</span>
                    </div>
                    )
                }
            })
        template['list'].items.push({
            itemtype: 'customer',
            label: exam.json['ga6013-000004'],/* 国际化处理： 操作*/
            visible: true,
            fixed: 'right',
            width:'200px',
            attrcode: 'opr',
            render: (text, record, index) => {
                return (
                    
                    <div>
                            <If condition = {record.values.approve_state.value == "-1"}>
                                <a 
                                    href="javascript:void(0)"
                                    style={{marginRight:'5px',textDecoration:'none'}}
                                    onClick={(e)=>action.table.batchCommit(record.values.pk_prvabroad.value)}
                                >
                                    {exam.json['ga6013-000018'] || '提交'}
                                </a>
                                <a 
                                    href="javascript:void(0)"
                                    style={{marginRight:'5px',textDecoration:'none'}}
                                    onClick={action.table.editTableRow(record,index)}
                                >
                                     {exam.json['ga6013-000029'] || '修改'}
                                </a>
                                <a 
                                    href="javascript:void(0)"
                                    style={{marginRight:'5px',textDecoration:'none'}}
                                    onClick={(e)=>action.table.batchDelete(record.values?record.values.pk_prvabroad.value:exam.billid)}
                                >
                                     {exam.json['ga6013-000030'] || '删除'}
                                </a>
                        </If>
                        <If condition = {record.values.approve_state.value !== "-1" && record.values.approve_state.value !== "1"}>
                            <a 
                                href="javascript:void(0)"
                                style={{marginRight:'5px',textDecoration:'none'}}
                                onClick={(e)=>action.table.batchBack(record.values.pk_prvabroad.value)}
                            >
                                {exam.json['ga6013-000062'] || '收回'} 
                            </a>
                        </If>
                        <If condition = {record.values.def1.value !== "2" && record.values.def1.value !== "0" && record.values.approve_state.value !== "-1"}>
                            <a 
                                href="javascript:void(0)"
                                style={{textDecoration:'none'}}
                                onClick={(e)=>action.formAct.checkWorkflow(record)}
                            >
                                 {exam.json['ga6013-000028'] || '查看审批意见'}
                            </a>
                        </If>
                    </div>
                   
                );
            }
        });
        template['psninfo'].items.map((items) => {
            if (items.attrcode === 'pk_psnjob') {
                items.queryCondition = {};
            }
            if (items.attrcode === 'pk_license') {
                items.queryCondition = {};
            }
            if(items.attrcode === 'lic_no'){
                items.queryCondition = {};
            }
        });
        console.log(template,'template')
        dispatch({
            type: 'exam/update',
            payload: {
               template:template
            }
        });
        return template
    }
    // 当模版获取并设置完成之后的回调函数
    afterGetTemplate = (res) => {
        this.routePage();
        // this.addDefaultSearchData(res);
    }
    // 修复从审批中心进入页面页面闪动问题
blinkApprove = () => {
    const {props, action} = this.comp;
    const {getUrlParam,dispatch,exam} = props;
    let scene = getUrlParam('scene');
    // let scene = 'approvesce'
    if (!scene && getUrlParam('status')) {
        scene = 'approvesce'
    }
    if(scene === 'approvesce') {
    dispatch({
    type: 'exam/update',
    payload: {
    cardMode: true,
    fromApprove: true
    }
    });
    } else {
    dispatch({
    type: 'exam/update',
    payload: {
    cardMode: false
    }
    });
    }
    }

    // 给查询弹窗的申请日期添加默认值
    addDefaultSearchData = (res) => {
        res.template['query'].items.map((item) => {
            if(item.attrcode === 'apply_date' && !item.initialvalue) {
                let firstValue = moment().date(1).format('YYYY-MM-DD');
                let secondValue = moment().format('YYYY-MM-DD');
                
                item.initialvalue = {
                    display: `${firstValue},${secondValue}`,
                    value: `${firstValue},${secondValue}`
                };
            }
    });

        return res;
    }
     // 根据url判断是进入到编辑页面还是进入到主页面表格
     routePage = async () => {
        const {props, action} = this.comp;
        const {getUrlParam,dispatch,exam} = props;

        let scene = getUrlParam('scene');
        // let scene = 'approvesce'
        let id = getUrlParam('id');
        // let status = getUrlParam('status');
         if (!scene && getUrlParam('status')) {
             scene = 'approvesce'
         }
        dispatch({
            type: 'exam/update',
            payload: {
                billid: id
            }
        });
        
        if(scene !== 'approvesce') {
            dispatch({
                type: 'exam/update',
                payload: {
                    cardMode: false
                }
            });
            return;
        }
        await dispatch({
            type: 'exam/update',
            payload: {
                cardMode: true,
                refValue:  {
                    refpk: businessInfo.groupId
                },
                fromApprove: true,
                // editState:true
            }
        });

        action.formAct.oneAction(id)
    }
       
      // 翻页
    turnPage = (page) => {
        const {props, action} = this.comp;
        const {
            exam,
            dispatch
        } = props;

        if(page === exam.pageInfo.pageIndex) {
            return;
        }

        let pageInfo = {
            ...exam.pageInfo,
            pageIndex: page
        }

        this.pubSub.publish('initData', {
            pageInfo: pageInfo
        });
        action.main.initTemplate()
    }

    // 改变每页显示条数
    changePageSize = (size) => {
        const {props, action} = this.comp;
        const {
            exam,
            dispatch
        } = props;

        if(size === exam.pageInfo.pageSize) {
            return;
        }

        let pageInfo = {
            ...exam.pageInfo,
            pageSize: size
        }

        this.pubSub.publish('initData', {
            pageInfo: pageInfo
        });
        action.main.initTemplate()
    }



    // 通用关闭弹窗
    closeModal = (field) => {
        return () => {
            const {props} = this.comp;
            const {dispatch,exam} = props;

            dispatch({
                type: 'exam/update',
                payload: {
                    [field]: false
                }
            });
        }
    }

}