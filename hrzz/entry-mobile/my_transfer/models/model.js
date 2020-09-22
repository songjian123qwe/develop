import proFetch from '../../../public/mobile/utils/project-fetch';

// import {formatDate} from '../../../../hrpub/common/utils/utils'

// import { getAppPageConfig } from 'src/hrpub/common/utils/utils';

export default {
    name: 'exam',
    data: {
        fileData:[],
        formData:null,//第一步获取数据集合
        formDataTwo:null,//第二步获取数据集合
        newFormId:'new',
        formId:'card',
        editstate:false,//false新增
        store:null, //第一步时模板数据
        storeTwo:null,//第二步时模板数据
        urlImg:[],
        json:{},//多语
        isEdit:true,
        examine:false,
        pagecode:'60652045nccloud',//申请界面页面编码
        transType:'',//第一步修改时调配业务类型
        transMode:'',//第一步修改时调配方式
        chiocLock:false,//第一步选择弹框显示隐藏
        templateData:{},
        billid:'',
        peopleArr:[], //指派人员
        peopleListData:{content:[{uservos:[{a:1},{b:2}]}]}//审核人员列表
    },
    sync: {
        update(state, payload) {
            return {
                ...state,
                ...payload
            };
        },
        deepUpdate(state,searchParams) {
            let key = Object.keys(searchParams)
            let value = Object.values(searchParams)
            let params
            tempState = state
            let tostring = Object.prototype.toString
            key.forEach((v,k)=> {
                let ckey = key[k]
                if(tostring.call(tempState[ckey])==='[object Object]') {
                    params = Object.assign({},state[ckey],{...value[k]})
                    tempState = {
                        ...tempState,
                        [ckey]:params
                    }
                } else {
                    tempState = {
                        ...tempState,
                        [ckey]:searchParams[ckey]
                    }
                }
            })
            return {
                ...state,
                ...tempState
            }
        }
    },
    async: {
         // 提交页面初始化获取模板接口
         transApplyInitAction(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/transapply/TransApplyInitAction.do',
                data: payload.postData,
                info:payload.info
            });
        },
         // 编辑前
         transBeforeEditAction(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/transapply/TransBeforeEditAction.do',
                data: payload.postData,
                info:payload.info
            });
        },
         // 编辑后
         transAfterEditAction(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/transapply/TransAfterEditAction.do',
                data: payload.postData,
                info:payload.info
            });
        },
         // 提交
         questionCommitAction(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/transapply/TransApplyCommitAction.do',
                data: payload.postData.data,
                headers:payload.postData.headers,
                info:payload.info
            });
        },
         // 确认指派
         transApplyAssignCommitAction(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/transapply/TransApplyAssignCommitAction.do',
                data: payload.postData,
                info:payload.info
            });
        },
         // 保存校验
         transSaveCheckAction(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/transapply/TransSaveCheckAction.do',
                data: payload.postData,
                info:payload.info
            });
        },
         // 查询图片
         query(dispatch, getState, payload) {
            return proFetch({
                url:'/nccloud/platform/attachment/query.do',
                data: payload.postData,
                other:payload.info,
                info:payload.info
            });
        }
    }
}