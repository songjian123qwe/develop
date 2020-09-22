import proFetch from '../../../public/mobile/utils/project-fetch';

// import {formatDate} from '../../../../hrpub/common/utils/utils'

// import { getAppPageConfig } from 'src/hrpub/common/utils/utils';

export default {
    name: 'exam',
    data: {
        tabs : [
            { title: '常见问题'},
            { title: '我的提问' }
          ],
        showIndex:true, //首页是否显示
        showDetails:false,//详情页显示 /弹窗
        showSearch:false,//搜索页 /弹窗
        showClassifi:false,//分类页
        showHotProblem:false, //热点问题页
        share:'none',//分享弹框是否显示
        searchData:[],
        classfiList:[],//首页大分类
        classfiPageList:{
            isExistQuestion:false,
            list:[]
        },//分类页面
        json:{},
        pageFlag:false,//用于判断是问题页还是分类页 true为问题页
        crumbsList:[],//面包屑
        hotProblemList:[],//热点问题列表
        newProblemList:[],//最新问题列表
        oneQuestionDetail:{},//详情页内容
        myQuestions:[],//我的提问列表
        classColor:['#66CF7D','#48BBEE','#F5867A','#8BADE5','#ECBE6C']
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
        //  查询热点问题
        knowledgePreviewHotAction(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/knowledge/KnowledgePreviewHotAction.do',
                data: payload.postData,
                info:payload.info
            });
        },
        // 查看最新回答
        knowledgePreviewRecentUpdateAction(dispatch, getState, payload) {
            return proFetch({
                url:'/nccloud/hrzz/knowledge/KnowledgePreviewRecentUpdateAction.do',
                hdLoading:true, //为true时不显示loading
                data: payload.postData,
                info:payload.info,
                
            });
        },
        // 查看分类
        knowledgePreviewTypeByPIDAction(dispatch, getState, payload) {
            return proFetch({
                url:'/nccloud/hrzz/knowledge/KnowledgePreviewTypeByPIDAction.do',
                 hdLoading:true, //为true时不显示loading
                 data: payload.postData,
                info:payload.info,
               
            });
        },
        // 查看详情
        KnowledgePreviewOneAction(dispatch, getState, payload) {
            return proFetch({
                url:'/nccloud/hrzz/knowledge/KnowledgePreviewOneAction.do',
                 data: payload.postData,
                info:payload.info
            });
        },
        // 按分类查看所有问题
        knowledgePreviewByTypeAction(dispatch, getState, payload) {
            return proFetch({
                url:'/nccloud/hrzz/knowledge/KnowledgePreviewByTypeAction.do',
                 data: payload.postData,
                info:payload.info
            });
        },
        // 我的问题
        questionMyQuestionsAction(dispatch, getState, payload) {
            return proFetch({
                url:'/nccloud/hrzz/question/QuestionMyQuestionsAction.do',
                data: payload.postData,
                info:payload.info,
                hdLoading:true //为true时不显示loading
            });
        },
        // 点赞
        knowledgePreviewSearchByKeyAction(dispatch, getState, payload) {
            return proFetch({
                url:'/nccloud/hrzz/knowledge/KnowledgePreviewSearchByKeyAction.do',
                 data: payload.postData,
                info:payload.info
            });
        },
    }
}