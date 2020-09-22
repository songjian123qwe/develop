import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default {
    name: 'main',
    data: {
        language: {}, // 多语
        context: {},
        isEdit: false,
        allPeriod: [], //所有险种期间
        startPeriod: {}, //起始社保期间
        endPeriod: {}, //结束社保期间
        bmClass: [] //已选险种
    },
    sync: {
        update(state, payload) {
            return {
                ...state,
                ...payload
            };
        }
    },
    async: {
        //获取页面meta配置
        getTemplate(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/bmfile/QueryTemplate.do',
                body: payload
            });
        },
        //获取数据
        getData(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/bmfile/MyBmFileQueryAction.do',
                body: payload
            });
        }
    }
};