/**
 * Created by wanghongxiang on 2019/5/27.
 */
import Axios from "axios";
import {systemLang as localeLang} from './tools';

export const getMultiLang = ({other=false,currentLocale, getUrl, moduleId, callback, environment, domainName = 'platform', needInlt = true, dataSource}) => {
    console.log("environment",environment,"domainName",domainName)
    if (getUrl) {
        return HrAjax({
            url: getUrl
        }).then((res) => {
            callback && callback(res.data);
        }, () => {
            callback && callback({})
        });
    }
    // 环境参数
    let env = 'production';
    if (window.parent && window.top.environmentmodel) {
        env = window.top.environmentmodel;
    }
    // 用来判断角色平台多语请求路径
    let isWorkbenchDev = domainName === 'workbench' && environment === 'development';
    let isWorkbenchPro = domainName === 'workbench' && environment === 'production';
    let domain = isWorkbenchDev ? '' : domainName;
    // 前缀
    let prefix = isWorkbenchDev ? '' : env == 'development' ? '/src/' : '../../../../'
    if (other){
        prefix = window.location.origin + "/nccloud/resources/"
    }
    if (isWorkbenchPro) {
        prefix = '../../../../';
    }
    console.log("isWorkbenchPro",isWorkbenchPro,prefix)
    // 路径后缀
    let suffix = `/public/lang/standard/${localeLang()}/`;
    let urls = {};
    if (!window.multiLang) window.multiLang = {}
    let url = prefix + `${domain}` + suffix + moduleId + '.json'
    let urlPub = prefix + `${domain}` + suffix + '0000PUB.json'
    console.log("urlPub",urlPub)
    Axios.get(urlPub)
        .then(function (response) {
            window.multiLang["0000PUB"] = response.data;
            Axios.get(url)
                .then(res => {
                    window.multiLang[moduleId] = res.data;
                    callback(res.data)
                })
        })
        .catch(function (error) {

            console.log(error);
        });

    // 生成urls
    // if (typeof moduleId === 'number' || typeof moduleId === 'string') {
    //     urls[domain + moduleId] = prefix + `${domain}` + suffix + moduleId + '.json'
    //
    // } else if (Array.isArray(moduleId)) {
    //     moduleId.map((item) => {
    //         urls[domain + item] = prefix + `${domain}` + suffix + item + '.json'
    //     });
    // } else {
    //     for (let [ke, value] of Object.entries(moduleId)) {
    //         if (Array.isArray(value)) {
    //             value.map((item) => {
    //                 urls[ke + item] = prefix + `${ke}` + suffix + item + '.json'
    //             });
    //         } else {
    //             urls[ke + value] = prefix + `${ke}` + suffix + value + '.json'
    //         }
    //     }
    // }

    // let tasts = Object.entries(urls).map(item => {
    //         let key = item[0],
    //             url = item[1]
    //         return new Promise((resolve, reject) => {
    //             HrAjax({
    //                 url: url,
    //                 method: 'get',
    //                 success: res => {
    //                     resolve(res)
    //                 }
    //             })
    //         })
    //
    //     })
    // return Promise.all(tasts)
}