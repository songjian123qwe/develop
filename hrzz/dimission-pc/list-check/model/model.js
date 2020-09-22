import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default {
    name: 'main',
    data: {
        language: {}, // 多语
        context: {},
        page: 'main'
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
        //获取所有信息
        getData(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/depthandover/PCDeptHandoverAuditQueryAction.do',
                body: payload
            });
        },
        //同意交接内容
        approve(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/depthandover/DeptHandoverAuditAction.do',
                body: payload
            });
        },
        //驳回交接内容
        reject(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/depthandover/DeptHandoverAuditRejectAction.do',
                body: payload
            });
        }
    }
};