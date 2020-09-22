import proFetch from '../../../../hrpub/common/utils/project-fetch'

export default {
    name: 'changeAnalysis',
    data: {
        json: {}, //初始多语信息
        analysisData: {
            now: {},
            analysisList: []
        },
        cuserid: '', // 用户userid
        entryList: [], // 入职信息列表
        changeList: [], // 变动信息列表
        dimissionList: [], // 离职信息列表
        regGroupList: [], // 转正信息列表
        deptValue: {}
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
        // 查询人员信息
        querypersonsettings(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/platform/appregister/querypersonsettings.do',
                body: payload.postData
            });
        },
        // 人员变动分析
        queryCountAnalyseAction(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/deptreport/QueryCountAnalyseAction.do',
                body: payload.postData
            });
        },
        // 待入职信息
        queryEntryGroupAction(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/deptreport/QueryEntryGroupAction.do',
                body: payload.postData
            });
        },
        // 待变动信息
        queryChangeGroupAction(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/deptreport/QueryChangeGroupAction.do',
                body: payload.postData
            });
        },
        // 待离职信息
        queryDimissionGroupAction(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/deptreport/QueryDimissionGroupAction.do',
                body: payload.postData
            });
        },
        // 待转正信息
        queryRegGroupAction(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/deptreport/QueryRegGroupAction.do',
                body: payload.postData
            });
        }
    }

}