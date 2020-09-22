import proFetch from '../../../../hrpub/common/utils/project-fetch'

export default {
    name: 'compositionAnalysis',
    data: {
        json: {}, //初始多语信息
        cuserid: '', // 用户userid
        referObj: {}, // 部门参照
        compositionInfo: {},
        staffStyleOption: {
            
        },
        sexProportionOption: {},
        staffIsEmpty: true, // 员工类型构成数据是否为空
        sexProportionEmpty: true,
        hrChangeOption: {},
        hrChangeEmpty: true,
        ageStructureOption: {}, // 年龄分布
        ageStructureEmpty: true,
        corpWorkageStructureOption: {}, // 司龄分布
        corpWorkageStructureEmpty: true,
        eduStructureOption: {},
        eduStructureEmpty: true, // 学历分布
        jobGradeStructureOption: {}, // 职级分布
        jobGradeStructureEmpty: true,
        postStructureOption: {}, // 职位分布
        postStructureEmpty: true,
        workageStructureOption: {}, // 工龄分布
        workageStructureEmpty: true,
        barInitOption: {},
        pieInitOption: {},
        lineInitOption: {}
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
        // 部门人员构成分析
        queryStaffStaticAction(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/deptreport/QueryStaffStaticAction.do',
                body: payload.postData
            });
        },
        // 人员类型分析
        queryPsnTypeStructureAction(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/deptreport/QueryPsnTypeStructureAction.do',
                body: payload.postData
            });
        },
        // 团队人事变动
        queryGroupTrendAction(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/deptreport/QueryGroupTrendAction.do',
                body: payload.postData
            });
        },
        // 团队画像
        queryGroupStructureAction(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/deptreport/QueryGroupStructureAction.do',
                body: payload.postData
            });
        }
    }

}