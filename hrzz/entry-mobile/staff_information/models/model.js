import proFetch from '../../../public/mobile/utils/project-fetch';

// import {formatDate} from '../../../../hrpub/common/utils/utils'

// import { getAppPageConfig } from 'src/hrpub/common/utils/utils';

export default {
    name: 'exam',
    data: {
        showSearch:true,//搜索页 /弹窗
        showClassifi:false,//分类页
        organizationData:[], //人力组织列表
        organizationSubset:[], //人力组织子集
        isSearchData:false,//是否展示搜索信息
        searchValue:'',//搜索框
        searchData:[],//搜索信息
        firstId:'',//首选组织id
        colors: ['#f99a2b', '#eead10', '#06aae1', '#89a8e0', '#0abfb5', '#00ced1', '#f99a2b','#96bc53','#00ced1','#89a8e0'],
        crumbsList:[],//面包屑
        store:null,//模板数据
        json:{},
        infoData:{},//个人信息
        storeAll:[],//所有模板数据集合
        isDetail:false,//是否显示详情页
        countBar:0,//进度条
        detailFormData:{
            areaCodeList:[],
            allArea:{}
        },//所有模板信息集合
        name:'',
        organizationPer: [] // 人员信息
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
        //  人力资源组织查询
        psnDocSearchPermOrgBaseAction(dispatch, getState, payload) {
            return proFetch({
                url: '/nccloud/hrzz/psndoc/PsnDocSearchPermOrgAction.do',
                data: payload.postData,
                info:payload.info
            });
        },
        // 搜索
        psnDocSearchPsnInfoByKeyAction(dispatch, getState, payload) {
            return proFetch({
                url:'/nccloud/hrzz/psndoc/PsnDocSearchPsnInfoByKeyAction.do.do',
                hdLoading:true, //为true时不显示loading
                data: payload.postData,
                info:payload.info,
                
            });
        },
        // 查看子组织
        psnDocSearchOrgAndDeptAction(dispatch, getState, payload) {
            return proFetch({
                url:'/nccloud/hrzz/psndoc/PsnDocSearchOrgAndDeptAction.do',
                 data: payload.postData,
                info:payload.info,
               
            });
        },
        // 员工信息模板查询
        psnDocSearchPsnInfoAction(dispatch, getState, payload) {
            return proFetch({
                url:'/nccloud/hrzz/psndoc/PsnDocSearchPsnInfoAction.do',
                 data: payload.postData,
                info:payload.info
            });
        },
        // 查看员工信息子模块
        psnDocSearchLoadSubDataAction(dispatch, getState, payload) {
            return proFetch({
                url:'/nccloud/hrzz/psndoc/PsnDocSearchLoadSubDataAction.do',
                 data: payload.postData,
                 hdLoading:true,
                info:payload.info
            });
        },
        // 
        
       
    }
}