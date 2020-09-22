import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default {
    name: 'main',
    data: {
        language: {}, // 多语
        context: {},
        page: 'main',
        psndoc: '',
        showUploader: false,
        showFlow: false,
        isEdit: false,
        isEditable:false,
        billid: '',
        selectDoc: '',
        billtype: '',
        handleData: null,
        transMode: undefined,
        transSearched: false,
        transType: {},
        pageInfo: {
            pageSize: 10,
            pageIndex: 1,
            total: 0,
            totalPage: 1
        },
        transItems: [],
        process: 0,
        assignAppVisible: false,
        assignContent: {},
        assignRecord: {},
        isDisableUpload: false,//是否禁用附件上传功能
        transIndex:-1,
        transDisplay: false, //指派弹窗 是否显示
        transData:[],//原始树的值
        targetData:[],//右树的值
        content:[{}] //

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
        //获取所有转正信息
        getData(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/mydimissionapply/MyDimissionQueryAction.do',
                body: payload
            });
        },
        //新增
        addNew(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/mydimissionapply/MyDimissionAddAction.do',
                body: payload
            });
        },
        //修改
        editData(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/mydimissionapply/MyDimissionEditAction.do',
                body: payload
            });
        },
        //form编辑前事件
        formBeforeEdit(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/mydimissionapply/MyDimissionBeforeEditAction.do',
                body: payload
            });
        },
        //form编辑后事件
        formAfterEdit(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/mydimissionapply/MyDimissionAfterEditAction.do',
                body: payload
            });
        },
        //保存校验
        saveCheck(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/mydimissionapply/MyDimissionSaveCheckAction.do',
                body: payload
            });
        },
        //保存转正数据
        saveData(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/mydimissionapply/MyDimissionSaveAction.do',
                body: payload
            });
        },
        //取消转正数据操作
        cancel(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/mydimissionapply/MyDimissionCancelAction.do',
                body: payload
            });
        },
        //收回
        takeBack(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/mydimissionapply/MyDimissionCallbackAction.do',
                body: payload
            });
        },
        //提交
        submit(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/mydimissionapply/MyDimissionCommitAction.do',
                body: payload
            });
        },
        //删除
        delete(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/mydimissionapply/MyDimissionDeleteAction.do',
                body: payload
            });
        },
        //查看单条申请单
        checkOneBill(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/mydimissionapply/MyDimissionQueryOneAction.do',
                body: payload
            });
        },
        //查询部门工作交接
        checkDeptTrans(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/depthandover/PCDeptHandoverQueryAction.do',
                body: payload
            });
        },
        //查询部门交接项
        getTransItems(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/depthandover/PCDeptHandoverAuditQueryOneAction.do',
                body: payload
            });
        },
        //保存交接信息
        saveTransData(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/depthandover/PCDeptHandoverSaveAction.do',
                body: payload
            });
        },
        // 提交交接信息
        commitTransData(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/depthandover/PCDeptHandoverCommitAction.do',
                body: payload
            });
        },
        //离职转单左树
        getTree(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/handover/PCHandoverDefDocQueryAction.do',
                body: payload
            });
        },
        //离职转单细项
        getDisData(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/handover/PCHandoverItemQueryAction.do',
                body: payload
            });
        },
        // 指派穿梭框数据
        getTranslateData(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/depthandover/DeptHandoverSelAssginAction.do',
                body: payload
            });
        }
    }
};