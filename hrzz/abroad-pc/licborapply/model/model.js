import { hrAjax as proFetch } from 'src/hrpub/common/utils/utils';
import moment from 'moment';

export default {
    name: 'emp',
    data: {
        orgValue: {refpk:'0001AB100000000005EP'}, // 人力资源组织
        language: {}, // 多语
        context: {}, // 上下文
        pageInfo: {
            pageIndex: 1,
            pageSize: 10,
            total: 0,
            totalPage: 1
        }, // 主页面表格的分页信息
        orderStatus: ['-1', '3'], // 订单状态
        orderTimeRange: 'oneWeek', // 订单时间范围
        orderBeginTime: '', // 订单开始时间
        orderEndTime: '', // 订单结束时间
        page: 'main', // 当前页面， main主页面，add新增页面，edit修改页面
        // tableSelectAll: false, // 是否选中了全部表格
        addPageStatus: 'edit', // 新增页面的状态，edit编辑态，browse浏览态
        fileManagerModalVisible: false, // 附件管理弹显示显示隐藏
        fileManagerBillId: '', // 传递给附件管理的id
        isDisableUpload: false,
        fromApprove: false, // 是否来自于审批中心的打开
        approveBillType: '', // 审批详情弹窗的billType
        approveBillId: '', // 审批详情弹窗的billId
        approveModalVisible: false, // 审批详情弹窗的显示和隐藏
        showOrgRefer: false, // 是否显示组织参照
        pageHeight: 0, // 获取页面高度
        addPageHistoryData: null, // 卡片页面编辑前数据
        pk_licbor: '', // 单据ID
        templateFlag: false,
        compositedisplay: false, // 指派
        compositedata: [], // 
        queryCondition:{
            querycondition:{
                logic:"and",
                 conditions:[]
            },
            querytype:'tree'
        },
        dark: false, // 暗夜黑
        // 首页显示的按钮
        visible_main: {
            add: true,
            edit: false,
            del: false,
            search: true,
            commit: false,
            recover: false,
            aux_function: true,   // 更多
            save: false,
            cancel: false,
            refresh: true,
            attachment: false
        },
        // 浏览页面的按钮
        visible_add: {
            add: false,
            edit: false,
            del: false,
            search: false,
            commit: false,
            recover: false,
            aux_function: false,   // 更多
            save: true,
            cancel: true,
            refresh: false,
            attachment: false
        }

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
        // 获取主页面表格数据
        getMainTableData(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrga/mylicensebor/LicborapplyQueryAction.do',
                body: payload.postData
            });
        },
        // 跳转到新增页面
        toAddPage(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrga/mylicensebor/LicborapplyAddAction.do',
                body: payload.postData
            });
        },
        // 删除
        deleteTableRows(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrga/mylicensebor/LicborapplyDeleteAction.do',
                body: payload.postData
            });
        },
        // 编辑前
        formEditBefore(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrga/mylicensebor/LicborapplyBeforeEditAction.do',
                body: payload.postData,
                loading: false
            });
        },
        // 编辑后
        formEditAfter(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrga/mylicensebor/LicborapplyAfterEditAction.do',
                body: payload.postData,
                loading: false
            });
        },
        // 保存
        addPageSave(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrga/mylicensebor/LicborapplySaveAction.do',
                body: payload.postData
            });
        },
        // 提交单据
        submitBill(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrga/mylicensebor/LicborapplyCommitAction.do',
                body: payload.postData
            });
        },
        // 收回单据
        callbackBill(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrga/mylicensebor/LicborapplyCallBackAction.do',
                body: payload.postData
            });
        },
        // 查询单个  // 详情修改
        getMainTableOneData(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrga/mylicensebor/LicborapplyQueryOneAction.do',
                body: payload.postData
            });
        },
        // // 修改单据
        // editBill(dispatch, getState, payload) {
        //     return proFetch({
        //         url: '/nccloud/hrga/licensebor/LicenseborEditAction.do',
        //         body: payload.postData
        //     });
        // },
        // 获取一条数据
        // getOneBillData(dispatch, getState, payload) {
        //     return proFetch({
        //         // url: '/nccloud/hrga/licensebor/EntryQueryOneAction.do',
        //         url: '/nccloud/hrga/licensebor/LicenseborQueryAction.do',
        //         body: payload.postData
        //     });
        // },
        // 复制一条数据
        // copyOneBill(dispatch, getState, payload) {
        //     return proFetch({
        //         url: '/nccloud/hrga/licensebor/LicenseborCopyAction.do',
        //         body: payload.postData
        //     });
        // },
        //取消
        cancelAdd(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrga/mylicensebor/LicborapplyCancelAction.do',
                body: payload.postData
            });
        },
        // 联查人员卡片
        jointPsnCard(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrhi/psndoc/PsndocCardReptQueryAction.do',
                body: payload.postData
            });
        },

    }
};