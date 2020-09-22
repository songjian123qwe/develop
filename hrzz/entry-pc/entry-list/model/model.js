import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default {
    name: 'main',
    data: {
        language: {}, // 多语
        context: {},
        billid: '',
        selectKey: '',
        process: 0
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
        //查询左树
        getTree(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/entryflow/PCEntryFlowDefDocQueryAction.do',
                body: payload
            });
        },
        //获取所有转正信息
        getData(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/entryflow/PCEntryFlowItemQueryAction.do',
                body: payload
            });
        }
    }
};