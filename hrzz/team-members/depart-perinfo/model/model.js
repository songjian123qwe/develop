import proFetch from '../../../../hrpub/common/utils/project-fetch'
import download from '../../../../hrpub/common/utils/download/download';
import {toast} from 'nc-lightapp-front';
export default {
    name: 'departPerInfo',
    data: {
        pageInfo: {
            pageIndex: 1,
            pageSize: 10,
            total: 0,
            totalPage: 1
        }, //分页信息
        json: {}, //初始多语信息
        orgValue: {},
        pk_org: '',
        cuserid: '', // 用户userid
        selectArr: [],
        showModel: 'tableList', // 展示模式
        qryStr: '', //模糊查询条件
        pk_dept: '', // 部门主键
        expand: false,
        allAreaList: [], // 详情中所有区域列表
        baseInfoPhoto: '',
        psndocForm: {}, // 基本信息变淡数据
        psnjobFormData: {}, // 组织关系表单数据
        psnorgFormData: {}, // 公国关系表单数据
        pk_psnjob: '',
        copyShowModel: 'tableList',
        paginationShow: false,
        ncModelDis: false, // 控制导出花名册弹窗显示
        radioSelectVal: 'new',
        shwoCardTable: false,
        exportValue: {}, //导出花名册参照的值 
        allpks: [],
        nowPagePks: [],
        exportBtnDis: false // 控制导出花名册按钮是否可以点击
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
        // 管理部门查询
        queryDeptByPrincipalAction(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/deptpsn/QueryDeptByPrincipalAction.do',
                body: payload.postData
            });
        },
        // 人员列表查询
        psndocQueryAction(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/deptpsn/PsndocQueryAction.do',
                body: payload.postData
            });
        },
        // 人员详情查询
        psndocInfQueryAction(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/deptpsn/PsndocInfQueryAction.do',
                body: payload.postData
            });
        },
        // 查询子集数据
        psndocLoadSubDataAction(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/deptpsn/PsndocLoadSubDataAction.do',
                body: payload.postData
            });
        },
        // 导出花名册
        doExportRoster(dispatch, getState, payload) {
            download({
                url: '/nccloud/hrzz/deptpsn/ExportPsndocAction.do',
                method: 'post',
                body: payload.postData,
                enctype: 2,
                onResult: (res) => {
                    
                },
                onError: (res) => {
                    toast({
                        color: 'danger',
                        content: payload.exportNotice // 导出失败
                    });
                }
            });
        },
        // 查询部门组织
        queryPsnHROrgAction (dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/deptpsn/QueryPsnHROrgAction.do',
                body: payload.postData
            });
        }   
    }

}