import proFetch from '../../../public/mobile/utils/project-fetch';

// import {formatDate} from '../../../../hrpub/common/utils/utils'

// import { getAppPageConfig } from 'src/hrpub/common/utils/utils';

export default {
    name: 'exam',
    data: {
        tab : [],
        fileData:[],
        urlImg:[],
        json:{},//多语
        selectInfo:'',//选择默认文案
        selectValue:'',
        browsing:false,//是否为浏览态
        formData:{},
        text:'',
        examine:false,//审核弹窗是否开启
        peopleArr:[],//选择的审核人员
        billid:'',
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
         // 页面初始化获取模板接口
         questionInitAction(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/question/QuestionInitAction.do',
                data: payload.postData,
                 info:payload.info
            });
        },
         // 提交
         questionCommitAction(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/question/QuestionCommitAction.do',
                data: payload.postData.data,
                info:payload.info,
                headers:payload.postData.headers
            });
        },
         // 确认指派
         questionAssignCommitAction(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/question/QuestionAssignCommitAction.do',
                data: payload.postData,
                info:payload.info
            });
        }
    }
}