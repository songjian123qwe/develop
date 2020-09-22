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
        billid: '',
        billtype: '',
        handleData: null,
        transMode: undefined,
        transType: {},
        pageInfo: {
            pageSize: 10,
            pageIndex: 1,
            total: 0,
            totalPage: 1
        },
        assignAppVisible: false,
        assignContent: {},
        assignRecord: {}
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
                url: '/nccloud/hrzz/mytransapply/MyTransQueryAction.do',
                body: payload
            });
        },
        //新增
        addNew(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/mytransapply/MyTransAddAction.do',
                body: payload
            });
        },
        //修改
        editData(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/mytransapply/MyTransEditAction.do',
                body: payload
            });
        },
        //form编辑前事件
        formBeforeEdit(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/mytransapply/MyTransBeforeEditAction.do',
                body: payload
            });
        },
        //form编辑后事件
        formAfterEdit(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/mytransapply/MyTransAfterEditAction.do',
                body: payload
            });
        },
        //保存转正数据
        saveCheck(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/mytransapply/MyTransSaveCheckAction.do',
                body: payload
            });
        },
        //保存转正数据
        saveData(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/mytransapply/MyTransSaveAction.do',
                body: payload
            });
        },
        //取消转正数据操作
        cancel(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/mytransapply/MyTransCancelAction.do',
                body: payload
            });
        },
        //收回
        takeBack(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/mytransapply/MyTransCallbackAction.do',
                body: payload
            });
        },
        //提交
        submit(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/mytransapply/MyTransCommitAction.do',
                body: payload
            });
        },
        //删除
        delete(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/mytransapply/MyTransDeleteAction.do',
                body: payload
            });
        },
        //查看单条申请单
        checkOneBill(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/mytransapply/MyTransQueryOneAction.do',
                body: payload
            });
        }
    }
};