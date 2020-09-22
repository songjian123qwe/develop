/*
 * 
 * @LastEditors: qiaoshi
 */
import axios from 'axios';
import ReactDOM from 'react-dom';
import Gzip from './gzip';
import getBusinessInfo from './getBusinessInfo';
import {getParamByLocation, GetQuery} from './utils';
import ViewModel from './viewmodel/viewmodel';
import handelExitPage from './exit.js';
import Cipher, {opaqueDecrypt} from './cipher';


import logObj from "../static/log/logfootnote"
import * as broadcastChannel from './broadcastChannel';

import persistence from './cache/persistence';
import CONFIG from './config.js';
import {getAppReqParam} from './AppUrlUtils';

const switchURL = {
    '/nccloud/platform/aes/switch.do': true,
    '/nccloud/platform/mark/switch.do': true,
    '/nccloud/platform/gzip/switch.do': true
};

// 缓存一些常量用来做多页签（tab）通信
const sscopenkey = getParamByLocation(window.location.hash, 'sscopenkey') || getParamByLocation(window.parent.location.hash, 'sscopenkey');
const urlDataC = getParamByLocation(window.location.hash, 'c') || getParamByLocation(window.parent.location.hash, 'c');
const urlDataP = getParamByLocation(window.location.hash, 'c') || getParamByLocation(window.parent.location.hash, 'c');

let {setCookie, setGlobalStore, getGlobalStore, getCookie, setGlobalStorage, getGlobalStorage, removeGlobalStorage} = ViewModel;

const DEFAULT_DELAY_TIME = 1000;


// 是否第一次加签
let isNccsignSwitch = false; //原来是 false解决登录报非法攻击
let isNccsign = false;
let encryption = true; //是否启用加密加密

// 添加一个加签处理方法 -- by bbqin
function addDataSign(data, userCode, {
    allin = false,
    headers = {}
}) {
    // console.log(data, userCode);
    if (
        typeof transSn === 'undefined' ||
        typeof transSign === 'undefined' ||
        // !userCode ||
        (headers && headers['Content-Type'] == 'multipart/form-data')  // newData.append(  这种模式 先确定下 需不需要加签操作
    ) {
        return data;
    }
    // 先加签全部数据 或者部分数据

    // 这里会影响原字符串 （编码、位数？）导致后台解析不了字符串
    if (!allin) {
        let strDataSign = data.busiParamJson + '';
        // 加签 -- bbqin
        data.sysParamJson.sn = transSn(userCode);
        data.sysParamJson.signdata = transSign(strDataSign, userCode);
    } else {
        // 加签 -- bbqin
        // data.sysParamJson.sn = transSn(userCode);
        let dataStr = JSON.stringify(data) + '';
        headers['Identifications'] = transSign(dataStr, '');
    }
    // 这里是通过对象方式注入  headers  不符合设计原则 TODO 
    return data;
}


// 此时的cookie是当前界面唯一 如果放到ajax内部  
// 多个请求的情况下 会导致前面的cookie被覆盖  所有请求用的是第二次的cookie  而加密用的cookie是第一次的
let cckk = (top && top.cookiets) || getCookie('cookiets') || Date.now(); //双cookie验证 liuxis
// 做一次 数据转型
cckk = isNaN(cckk) ? cckk : Number(cckk);

export default function Ajax({
                                 url = '/',
                                 method = 'post',
                                 data = {},
                                 info = {},
                                 async = true, //默认异步，同步false
                                 loading = true,
                                 print = false, // 针对打印接口
                                 windowContainer = window,
                                 loadingContainer,
                                 toastContainer,
                                 other,
                                 success = function (res) {
                                     console.log(res);
                                 },
                                 error = function (res, url) {
                                     console.error(res);
                                     let msgContent = JSON.stringify(res.message);
                                 },
                                 mode = '',
                                 params = {},
                                 from = '',
                                 headers = {'Content-Type': 'application/json;charset=UTF-8'},
                                 delayTime,
                                 IsGetPageData = false, //业务组请求首次渲染页面的数据
                                 isGetTemplage = true,//请求模板
                                 sysParameter,
                                 requestJSON = false
                             }) {
    let stack = [];
    let div;
    // modify by wangyang
    div = windowContainer.document.createElement('div');
    windowContainer.document.body.appendChild(div);
    div.className = 'nc-loading-hidden';

    //console.error(url,"ajax请求开始");
    typeof window.top.startAjax === 'function' && window.top.startAjax(url);

    let gziptools = new Gzip();
    // 解决 接口报错  清理本地的cookie的情况 报错 by bbqin
    //双cookie验证 --liuxis
    // let cookiets = gziptools.zip(JSON.stringify(cckk));
    setCookie('cookiets', cckk);
    top && (top.cookiets = cckk);

    let isMobileWebPage = sessionStorage.getItem('mobile-web-page');

    // 每个url都要改成/nccloud/mod
    if (!isMobileWebPage &&
        !url.includes('/mob/') &&
        url !== '/nccloud/hr/login/HRLoginVerfiyAction.do' &&
        !url.includes('hryf') &&
        url !== '/nccloud/hrhi/widget/PsndocWidgetAction.do'
    ) {
        // 每个移动端请求需要添加accessToken进行身份验证，accessToken获取通过单点登录函数
        let accessToken = localStorage.getItem('accessToken');

        if (accessToken && accessToken !== 'undefined' && accessToken !== 'null') {
            headers['accessToken'] = accessToken;
        }

        url = url.replace('/nccloud/', '/nccloud/mob/');
        url = url.substring(0, url.length - 3);

        encryption = false;
    } else {
        if (url === '/nccloud/mob/platform/mob/login') {
            encryption = false;
        } else {
            encryption = true;
        }
    }

    let {app, appcode, custom} = getAppReqParam();
    if (!appcode) {
        let {c} = GetQuery(window.location.hash);
        appcode = info.appcode ? info.appcode : c ? c : "10228888";
    }

    let busiaction = `${app || null}-${window.actionName || null}`;
    // 此处 yanggqm修改 formData上传。
    let sysParamJson = {}, newData;
    if (sysParameter) {
        sysParamJson = sysParameter;
    } else {
        sysParamJson = {
            busiaction,
            appcode,
            appCode: appcode,
            ts: new Date().getTime(),
            from,
            pagecs: cckk
        };
        if (custom) {
            sysParamJson.custom = custom;
        }
    }


    // 用户信息获取 --bbqin
    let userInfos = getBusinessInfo();
    let userCode = userInfos && userInfos.userCode ? userInfos.userCode : null;

    // contentType 
    let headersContentType = 'default';
    if (headers['Content-Type'] == 'multipart/form-data') {
        headersContentType = 'multipart/form-data';
        newData = data;

        let sysParamData = {};

        if (sysParameter) {
            sysParamData = sysParameter;
        } else {
            sysParamData = {
                sys_busiaction: `${app || null}-${window.actionName || null}`,
                sys_appcode: appcode,
                sys_ts: new Date().getTime()
            };
        }
        for (let key in sysParamData) {
            newData.append(key, sysParamData[key]);
        }
    } else {
        let strData = typeof data === 'string' ? data : JSON.stringify(data);
        newData = {
            busiParamJson: strData,
            sysParamJson
        };
    }
    // 修改结束  如要修改，请打招呼。

    //第一次请求缓存是否加密的开关
    encryption && getStoreCipherFlag(cckk);
    /**
     * 开启报错提示
     */
    let flag = true;
    let gzipFlag = false;
    let gzip = getGlobalStorage('localStorage', 'gzip');

    // 加密 bbqin
    let cipherFlag = getGlobalStorage('localStorage', 'rockin');
    let aeskey = '';
    let cckks = cckk + '';
    aeskey = opaqueDecrypt(getGlobalStorage('localStorage', 'cowboy'));
    aeskey = cckks + aeskey.substring(0, aeskey.length - cckks.length);

    // 将是否加密缓存到组件单例上
    Cipher.CipherFlag = cipherFlag === 'true';

    //异步请求
    function asyncAxios() {
        axios({
            method,
            params,
            headers,
            url,
            data: newData,
            withCredentials: true,
            transformRequest: [
                function (data) {
                    // 如果 form-data 方式提交  不进行加密压缩
                    if (headersContentType === 'multipart/form-data') {
                        return data;
                    }

                    let gData = '';

                    if (gzipFlag && encryption) {
                        gData = gziptools.zip(JSON.stringify(data));
                    } else {
                        gData = JSON.stringify(data);
                    }

                    if (!encryption) {
                        return gData
                    }

                    return Cipher.encrypt(gData, aeskey);

                }
            ],
            transformResponse: [
                function (data, headers) {
                    //处理401
                    // hideLoading(div);
                    flag = handelExitPage(headers, flag);

                    if (!encryption) {
                        return isJSON(data) ? JSON.parse(data) : data;
                    }
                    if (flag) {
                        // 先进行 解密处理 bbqin
                        data = (typeof data === 'string' && !print) ? Cipher.decrypt(data, aeskey) : data;
                        if (gzipFlag) {
                            let resData = print ? data : gziptools.unzip(data);
                            return resData;
                        } else {
                            return isJSON(data) ? JSON.parse(data) : data;
                        }
                    } else {
                        return null;
                    }

                }
            ]
        })
            .then((res) => {
                logObj.setLog({
                    request: {
                        method,
                        params,
                        headers,
                        url,
                        data: newData
                    }, success: res
                })
                if (res) {
                    typeof window.top.endAjax === 'function' && window.top.endAjax(url);
                    if (mode === 'normal') {
                        if (isGetTemplage === true) {
                            // dealSecDevTemp(res, isGetTemplage);
                            success(res);
                        } else {
                            success(res);
                        }
                        // 添加storage事件触发 by bbqin
                        broadcastChannel && broadcastChannel.broadcast(sscopenkey || 'TabBroadcast', {
                            ajaxUrl: url,
                            sscopenkey: sscopenkey,
                            ts: new Date().getTime(),
                            c: urlDataC,
                            p: urlDataP
                        });
                        // dealSecDevData(res, IsGetPageData);
                    } else {
                        if (res.data && 'code' in res.data) {
                            res.data.success = res.data.code === '1000000000';
                        }

                        if (res.data.success || res.success) {
                            if (isGetTemplage === true) {
                                // dealSecDevTemp(res.data, isGetTemplage);
                                success(res.data);
                            } else {
                                success(res.data);
                            }
                            // 添加storage事件触发 by bbqin
                            broadcastChannel && broadcastChannel.broadcast(sscopenkey || 'TabBroadcast', {
                                ajaxUrl: url,
                                sscopenkey: sscopenkey,
                                ts: new Date().getTime(),
                                c: urlDataC,
                                p: urlDataP
                            });
                            // dealSecDevData(res.data, IsGetPageData);
                        } else {
                            // throw new Error(res.data.error.message);
                            error(res)
                        }
                    }
                }
            })
            .catch((res) => {
                logObj.setLog({
                    request: {
                        method,
                        params,
                        headers,
                        url,
                        data: newData
                    }, err: res
                })
                if (flag) {
                    let data = res;
                    data = typeof data === 'string' ? Cipher.decrypt(data, aeskey) : data;
                    if (print) { // 这里就是为了捕捉 print情况下压缩了
                        data = gziptools.unzip(data);
                    }
                    error(data, url);
                }
            });
    }

    //同步请求
    function syncAxios() {
        //同步
        let requestData = JSON.stringify(newData);

        if (gzipFlag) {
            requestData = gziptools.zip(JSON.stringify(newData));
        }
        ajax({
            type: method,
            url, //添加自己的接口链接
            data: Cipher.encrypt(requestData, aeskey),
            async,
            headers,
            before() {
            },
            success(str) {
                try {
                    typeof window.top.endAjax === 'function' && window.top.endAjax(url);
                    let res = null;
                    str = typeof str === 'string' ? Cipher.decrypt(str, aeskey) : str;
                    if (gzipFlag) {
                        res = gziptools.unzip(str);
                    } else {
                        res = JSON.parse(str);
                    }

                    if (res.data && 'code' in res.data) {
                        res.success = res.data.code === '1000000000';
                    }

                    if (res.success) {
                        if (isGetTemplage === true) {
                            // dealSecDevTemp(res.data, isGetTemplage);
                            success(res);
                        } else {
                            success(res);
                        }
                        // 添加storage事件触发 by bbqin
                        broadcastChannel && broadcastChannel.broadcast(sscopenkey || 'TabBroadcast', {
                            ajaxUrl: url,
                            sscopenkey,
                            ts: new Date().getTime(),
                            c: urlDataC,
                            p: urlDataP
                        });
                    } else {
                        throw new Error(res.error.message);
                    }
                } catch (e) {
                    error(e, url);
                }
            }
        });
    }

    //请求本地缓存数据是否加密
    function getStoreCipherFlag(cckk) {
        // 标识请求过一次，或放入localStorage
        let storeCipher = localStorage.getItem('storeCipher')
        //若取不到，还未发过请求
        if (storeCipher === null) {
            let gziptools = new Gzip();
            let gzipData = {
                sysParamJson: {
                    busiaction: '查询请求流量压缩开关',
                    pagecs: cckk
                }
            };
            // add by bbqin  特殊加签
            // 为了避免headers冲突 这里要修正下 
            let gzipHeaders = headers ? {...headers} : {};
            gzipData = JSON.stringify(addDataSign(gzipData, '', {allin: true, headers: gzipHeaders}));
            ajax({
                type: 'post',
                url: '/nccloud/platform/gzip/switch.do',
                data: gzipData,
                headers: gzipHeaders,
                async: false,
                success: (res) => {
                    let gzipSwitch = false;
                    res = typeof res === 'string' ? JSON.parse(res) : res;
                    if (res && res.success) {
                        let reqData = {
                            sysParamJson: {
                                busiaction: '查询storage加密开关',
                                pagecs: cckk
                            }
                        };
                        if (res.data) {
                            gzipSwitch = true;
                        }
                        let reqHeaders = headers ? {...headers} : {};
                        reqData = JSON.stringify(addDataSign(reqData, '', {allin: true, headers: reqHeaders}));
                        ajax({
                            type: 'post',
                            url: '/nccloud/platform/localstorage/switch.do',
                            data: gzipSwitch ? gziptools.zip(reqData) : reqData,
                            async: false,
                            headers: reqHeaders,
                            success: (res) => {
                                res = gzipSwitch ? gziptools.unzip(res) : res;
                                res = typeof res === 'string' ? JSON.parse(res) : res;
                                if (res && res.success) {
                                    if (res.data) {
                                        localStorage.setItem('storeCipher', 1);
                                    } else {
                                        localStorage.setItem('storeCipher', 0);
                                    }
                                    let gzipFlag = gzipSwitch ? 1 : 0;
                                    setGlobalStorage('localStorage', 'gzip', gzipFlag);
                                }
                            }
                        })
                    }
                }
            })
        }
    }

    if (gzip === null) {
        let gzipData = {
            sysParamJson: {
                busiaction: '查询请求流量压缩开关',
                pagecs: cckk
            }
        };
        // add by bbqin  特殊加签
        // 为了避免headers冲突 这里要修正下 
        let gzipHeaders = headers ? {...headers} : {};
        gzipData = addDataSign(gzipData, '', {allin: true, headers: gzipHeaders});
        axios({
            method: 'post',
            url: '/nccloud/platform/gzip/switch.do',
            data: gzipData,
            headers: gzipHeaders,
            withCredentials: true
        })
            .then((res) => {
                logObj.setLog({
                    request: {
                        method: 'post',
                        url: '/nccloud/platform/gzip/switch.do',
                        data: gzipData,
                    }, success: res
                })
                if (res.data) {
                    if (res.data.success || res.success) {
                        if (res.data.data) {
                            setGlobalStorage('localStorage', 'gzip', 1);
                            gzipFlag = true;
                        } else {
                            setGlobalStorage('localStorage', 'gzip', 0);
                            gzipFlag = false;
                        }

                        // 加签开关获取  -- bbqin
                        let securityData = {
                            sysParamJson: {
                                busiaction: '查询请求安全加签开关',
                                pagecs: cckk
                            }
                        };
                        // add by bbqin  特殊加签
                        // 为了避免headers冲突 这里要修正下 
                        let markHeaders = headers ? {...headers} : {};
                        securityData = JSON.stringify(addDataSign(securityData, '', {
                            allin: true,
                            headers: markHeaders
                        }));
                        // 如果没有标识才去请求标识  
                        !isNccsignSwitch && ajax({
                            type: 'post',
                            url: '/nccloud/platform/mark/switch.do',
                            data: gzipFlag ? gziptools.zip(securityData) : securityData,
                            async: false,
                            withCredentials: true,
                            headers: markHeaders,
                            success(text) {
                                let handleData = gzipFlag ? gziptools.unzip(text) : text;
                                handleData = typeof handleData === 'string' ? JSON.parse(handleData) : handleData;
                                if (handleData) {
                                    isNccsignSwitch = true;
                                    if (handleData.success) {
                                        if (handleData.data) {
                                            isNccsign = true;
                                        } else {
                                            isNccsign = false;
                                        }
                                    }
                                }
                            }
                        });
                        // add by bbqin
                        newData = (isNccsign || switchURL[url]) ? addDataSign(newData, userCode, {
                            allin: true,
                            headers
                        }) : newData;

                        //执行ajax请求
                        if (async) {
                            //异步
                            asyncAxios();
                        } else {
                            //同步
                            syncAxios();
                        }
                    } else {
                        throw new Error(res.data.error);
                    }
                }
            })
            .catch((res) => {
                logObj.setLog({
                    request: {
                        method: 'post',
                        url: '/nccloud/platform/gzip/switch.do',
                        data: gzipData,
                    }, success: res
                })
                error(res, url);
            });
    } else {
        if (getGlobalStorage('localStorage', 'gzip') == '1') {
            gzipFlag = true;
        } else if (getGlobalStorage('localStorage', 'gzip') == '0') {
            gzipFlag = false;
        }

        // 加签开关获取  -- bbqin
        let securityData = {
            sysParamJson: {
                busiaction: '查询请求安全加签开关',
                pagecs: cckk
            }
        };
        // 为了避免headers冲突 这里要修正下 
        let markHeaders = headers ? {...headers} : {};
        securityData = JSON.stringify(addDataSign(securityData, '', {allin: true, headers: markHeaders}));
        // 如果没有标识才去请求标识  
        !isNccsignSwitch && ajax({
            type: 'post',
            url: '/nccloud/platform/mark/switch.do',
            data: gzipFlag ? gziptools.zip(securityData) : securityData,
            async: false,
            withCredentials: true,
            headers: markHeaders,
            success(text) {
                let handleData = gzipFlag ? gziptools.unzip(text) : text;
                handleData = typeof handleData === 'string' ? JSON.parse(handleData) : handleData;
                if (handleData) {
                    isNccsignSwitch = true;
                    if (handleData.success || handleData.message === 'success') {
                        if (handleData.data) {
                            isNccsign = true;
                        } else {
                            isNccsign = false;
                        }
                    }
                }
            }
        });
        // add by bbqin
        newData = (isNccsign || switchURL[url]) ? addDataSign(newData, userCode, {allin: true, headers}) : newData;

        //执行ajax请求
        if (async) {
            //异步
            asyncAxios();
        } else {
            //同步
            syncAxios();
        }
    }
}

function ajax(options) {

    var url = options.url || '', //请求的链接
        type = (options.type || 'get').toLowerCase(), //请求的方法,默认为get
        data = options.data, //|| JSON.stringify({}), //请求的数据
        contentType = options.contentType || '', //请求头
        dataType = options.dataType || '', //请求的类型
        async = options.async === undefined ? true : options.async, //是否异步，默认为true.
        timeOut = options.timeOut, //超时时间。
        before = options.before || function () {
        }, //发送之前执行的函数
        error = options.error || function () {
        }, //错误执行的函数
        success = options.success || function () {
        }; //请求成功的回调函数
    var timeout_bool = false, //是否请求超时
        timeout_flag = null, //超时标识
        xhr = null; //xhr对角

    // JSONP
    function createJsonp() {
        var script = document.createElement('script'),
            timeName = new Date().getTime() + Math.round(Math.random() * 1000),
            callback = 'JSONP_' + timeName;

        window[callback] = function (data) {
            clearTimeout(timeout_flag);
            document.body.removeChild(script);
            success(data);
        };
        script.src = url + (url.indexOf('?') > -1 ? '&' : '?') + 'callback=' + callback;
        script.type = 'text/javascript';
        document.body.appendChild(script);
        setTime(callback, script);
    }

    //设置请求超时
    function setTime(callback, script) {
        if (timeOut !== undefined) {
            timeout_flag = setTimeout(function () {
                if (dataType === 'jsonp') {
                    delete window[callback];
                    document.body.removeChild(script);
                } else {
                    timeout_bool = true;
                    xhr && xhr.abort();
                }
                console.log('timeout');
            }, timeOut);
        }
    }

    // XHR
    function createXHR() {
        //由于IE6的XMLHttpRequest对象是通过MSXML库中的一个ActiveX对象实现的。
        //所以创建XHR对象，需要在这里做兼容处理。
        function getXHR() {
            if (window.XMLHttpRequest) {
                return new XMLHttpRequest();
            } else {
                //遍历IE中不同版本的ActiveX对象
                var versions = ['Microsoft', 'msxm3', 'msxml2', 'msxml1'];
                for (var i = 0; i < versions.length; i++) {
                    try {
                        var version = versions[i] + '.XMLHTTP';
                        return new ActiveXObject(version);
                    } catch (e) {
                    }
                }
            }
        }

        //创建对象。
        xhr = getXHR();
        xhr.open(type, url, async);
        //设置请求头
        if (type === 'post' && !contentType) {
            //若是post提交，则设置content-Type 为application/x-www-four-urlencoded
            xhr.setRequestHeader('Content-Type', 'application/x-www-four-urlencoded;charset=UTF-8');
        } else if (contentType) {
            xhr.setRequestHeader('Content-Type', contentType);
        }
        // 添加加签参数
        if (options.headers && options.headers['Identifications']) {
            xhr.setRequestHeader('Identifications', options.headers['Identifications']);
        }

        xhr.withCredentials = true;
        //添加监听
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (timeOut !== undefined) {
                    //由于执行abort()方法后，有可能触发onreadystatechange事件，
                    //所以设置一个timeout_bool标识，来忽略中止触发的事件。
                    if (timeout_bool) {
                        return;
                    }
                    clearTimeout(timeout_flag);
                }
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                    success(xhr.responseText);
                } else {
                    error(xhr.status, xhr.statusText);
                }
            }
        };
        //发送请求
        xhr.send(type === 'get' ? null : data);
        setTime(); //请求超时
    }

    //setData();
    before();
    if (dataType === 'jsonp') {
        createJsonp();
    } else {
        createXHR();
    }
}

function isJSON(str) {
    if (typeof str == 'string') {
        try {
            var obj = JSON.parse(str);
            if (typeof obj == 'object' && obj) {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            console.log('error：' + str + '!!!' + e);
            return false;
        }
    }
    console.log('It is not a string!');
}
