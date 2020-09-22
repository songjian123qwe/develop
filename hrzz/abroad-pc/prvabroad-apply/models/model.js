import proFetch from '../../../../hrpub/common/utils/project-fetch';

import {formatDate} from '../../../../hrpub/common/utils/utils'

import { getAppPageConfig } from 'src/hrpub/common/utils/utils';

if(window.location.href.match('localhost:3006') || window.location.href.match('127.0.0.1:3006')){
    window.location.hash =
    "ifr?page=ti9";
}
export default {
    name: 'exam',
    data: {
        config:getAppPageConfig(),
        refValue:{refpk:'0001AB10000000000QC5'}, //组织参照
        json:{},//多语
        temlete:{},
        dark:false,
        context:'',
        billStatus:['-1', '3'],//单据状态
        time: 'oneweek', //时间周期
        pageInfo: {
            pageIndex: 1,
            pageSize: 10,
            total: 0,
            totalPage: 1
        }, // 主页面表格的分页信息
        beginTime: "", //开始时间
        endTime: "",//结束时间
        probationType:'3',//3，全部入职1:，试用2
        cardMode:true, //是否卡片模式
        editState:false, //false 浏览态 
        // batchAddModalVisible: false, // 批量新增的弹窗显示隐藏
        // batchAddCurrentStep: 0, // 批量新增弹窗当前步骤
        billid:null,//当前卡片模式/附件下单挑数据单据id
        billtype:'',
        page:'add', // add新增
        orgStaActiveTab: 'org', // 编制情况的t当前tab
        orgStaOptions: [], // 编制情况里的下拉框内容
        orgStaOrgData: [], // 编制情况的组织编制表格数据
        orgStaDeptData: [], // 编制情况的部门情况表格数据
        orgStaOrgDimension: '', // 编制情况的编制维度
        orgSituationModalVisible:false, //编制情况弹框
        fileManagerModalVisible:false, //附件管理弹框
        approveDetail:false, //查看审批状态
        height:'',
        allpks:[],
        fromApprove:false, //是都是从审批中心跳过来的
        templateFlag: true,
        type:'',//修改时获取的试用类型
        effectTime:formatDate(new Date()),//生效日期
        // compositedisplay: false, //指派弹窗 是否显示
        // compositedata: null, //指派弹窗数据
        appshowFlow: false,
        appbillid: '',
        appbilltype: '',
        isApproved:false,
        queryCondition:{
            querycondition:{
                logic:"and",
                 conditions:[]
            },
            querytype:'tree'
        },
        showUploader:false,//展示上传组件
        uploadBillid:'',
        uploadBillType:'',
        uploadBillCode:'',
        uploadBillstate:'',
        changeModdle:false,//修改模式
        compositedisplay: false, //是否显示 指派弹窗
        compositedata: null, //指派弹窗 数据
        compositepostdata: null ,//指派弹窗确定时传到后台的数据
    },
    sync: {
        update(state, payload) {
            return {
                ...state,
                ...payload
            };
        },
        deepUpdate(state,searchParams) {
            let key = Object.keys(searchParams)
            let value = Object.values(searchParams)
            let params
            tempState = state
            let tostring = Object.prototype.toString
            key.forEach((v,k)=> {
                let ckey = key[k]
                if(tostring.call(tempState[ckey])==='[object Object]') {
                    params = Object.assign({},state[ckey],{...value[k]})
                    tempState = {
                        ...tempState,
                        [ckey]:params
                    }
                } else {
                    tempState = {
                        ...tempState,
                        [ckey]:searchParams[ckey]
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
        
       
        // 10.6.225.101:80
        // 获取主页面表格数据
        getMainTableData(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrga/myprvabroad/MyPrvAbroadQueryAction.do',
                body: payload.postData
            });
        },
        // 获取详情页页面表单数据
        oneAction(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrga/myprvabroad/MyPrvAbroadQueryOneAction.do',
                body: payload.postData
            });
        },
        // 修改
        editAction(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrga/myprvabroad/MyPrvAbroadEditAction.do',
                body: payload.postData
            });
        },
        // 新增
        AddAction(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrga/myprvabroad/MyPrvAbroadAddAction.do',
                body: payload.postData
            });
        },
        //hrga/myprvabroad/MyPrvAbroadAddAction.do
        // 编辑前
        formEditBefore(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrga/myprvabroad/MyPrvAbroadBeforeEditAction.do',
                body: payload.postData
            });
        },
        // 编辑后
        formEditAfter(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrga/myprvabroad/MyPrvAbroadAfterEditAction.do',
                body: payload.postData
            });
        },
        // 保存前校验
        saveCheckAction(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrga/prvabroad/PrvAbroadSaveCheckAction.do',
                body: payload.postData
            });
        },
        // 保存
        saveAction(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrga/myprvabroad/MyPrvAbroadSaveAction.do',
                body: payload.postData
            });
        },
        //取消新增
        cancelAction(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrga/myprvabroad/MyPrvAbroadCancelAction.do',
                body: payload.postData
            });
        },
        // 删除
        delAction(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrga/myprvabroad/MyPrvAbroadDeleteAction.do',
                body: payload.postData
            });
        },
        // 复制
        copyAction(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrga/prvabroad/PrvAbroadCopyAction.do',
                body: payload.postData
            });
        },
       
        // 提交
        batchCommit(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrga/myprvabroad/MyPrvAbroadCommitAction.do',
                body: payload.postData
            });
        },
        // 收回
        batchBack(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrga/myprvabroad/MyPrvAbroadCallbackAction.do',
                body: payload.postData
            });
        },
    }
}