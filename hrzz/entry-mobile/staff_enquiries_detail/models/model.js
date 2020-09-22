import proFetch from '../../../public/mobile/utils/project-fetch';

// import {formatDate} from '../../../../hrpub/common/utils/utils'

// import { getAppPageConfig } from 'src/hrpub/common/utils/utils';

export default {
    name: 'exam',
    data: {
        share: 'none',//分享弹框是否显示
        oneQuestionDetail: {},//详情页内容
        fileData: [],//图片列表
        fabulous: '',
        buttonText: '',
        html: '',
        json: {},
        link: '',
        backQuesetion: false //是否是从我的问题跳过来的
    },
    sync: {
        update(state, payload) {
            return {
                ...state,
                ...payload
            };
        },
        deepUpdate(state, searchParams) {
            let key = Object.keys(searchParams)
            let value = Object.values(searchParams)
            let params
            tempState = state
            let tostring = Object.prototype.toString
            key.forEach((v, k) => {
                let ckey = key[k]
                if (tostring.call(tempState[ckey]) === '[object Object]') {
                    params = Object.assign({}, state[ckey], {...value[k]})
                    tempState = {
                        ...tempState,
                        [ckey]: params
                    }
                } else {
                    tempState = {
                        ...tempState,
                        [ckey]: searchParams[ckey]
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

        // 查看详情
        KnowledgePreviewOneAction(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/knowledge/KnowledgePreviewOneAction.do',
                data: payload.postData,
                info: payload.info
            });
        },
        // 图片列表
        query(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/platform/attachment/query.do',
                data: payload.postData,
                info: payload.info
            });
        },
        // 点赞
        knowledgeSupportAction(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/knowledge/KnowledgeSupportAction.do',
                data: payload.postData,
                info: payload.info
            });
        },
        // 查看详情
        questionPreviewOneAction(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/question/QuestionPreviewOneAction.do',
                data: payload.postData,
                info: payload.info
            });
        },


    }
}