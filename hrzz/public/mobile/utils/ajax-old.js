import React, {Component} from "react";
import viewModel from './viewmodel/viewmodel';
import Axios from "axios";
import Notice from "../components/Notice/Toast";
import Modal from "antd-mobile/lib/modal";
import Gzip from "./gzip";
import {GetQuery, langCheck} from "./utils";
import Cipher, {encrypt, decrypt, jsonToEncrypt, opaqueEncrypt, opaqueDecrypt} from "./cipher";
import NativeObj from "./jsbridge/index"
import logObj from "../static/log/logfootnote"
const {getGlobalStorage, setGlobalStorage} = viewModel
Axios.defaults.headers.post["Content-Type"] = "application/json";

/**
 * 获取 Cookie
 * @param {String} key
 */
const getCookie = key => {
    let cookies = document.cookie;
    let allCookies = cookies.split("; ").reduce((o, item) => {
        let arr = item.split("=");
        let firstIndex = item.indexOf("=");
        o[item.substring(0, firstIndex)] = item.substring(firstIndex + 1);
        return o;
    }, {});
    if (key) return allCookies[key];
    return allCookies;
};
/**
 * 设置 Cookie
 * @param {String} key
 * @param {Object} value
 * @param {String} day
 */
const setCookie = (key, value, path, domain, day) => {
    value = JSON.stringify(value);
    let expires = "",
        setPath,
        setdomain;
    if (day) {
        let d = new Date();
        d.setDate(d.getDate() + day);
        expires = "; expires=" + d.toUTCString();
    }
    if (path) {
        setPath = `; path=${path}`;
    } else {
        setPath = "; path=/nccloud";
    }
    if (domain) {
        setdomain = `; setdomain=${domain}`;
        document.cookie = key + "=" + value + expires + setPath + setdomain;
    } else {
        document.cookie = key + "=" + value + expires + setPath;
    }
};

let LOGOUT = false;
// 此时的cookie是当前界面唯一 如果放到ajax内部
// 多个请求的情况下 会导致前面的cookie被覆盖  所有请求用的是第二次的cookie  而加密用的cookie是第一次的
let cckk = getCookie("cookiets") || Date.now(); //双cookie验证 liuxis
// 做一次 数据转型
cckk = isNaN(cckk) ? cckk : Number(cckk);
setCookie("cookiets", cckk);
// let ts = Date.parse(new Date());

let aeskey = opaqueDecrypt(localStorage.getItem("cowboy"));
/**
 * ajax请求方法
 */
const Ajax = params => {
    // 解决 接口报错 清理本地的cookie的情况 报错 by bbqin
    setCookie("cookiets", cckk);
    // 刷新一下  bbqin
    aeskey = opaqueDecrypt(localStorage.getItem("cowboy"));
    let tss = cckk + "";
    aeskey = tss + aeskey.substring(0, aeskey.length - tss.length);
    // 加密 bbqin
    let cipherFlag = localStorage.getItem("rockin");
    // 将是否加密缓存到组件单例上
    Cipher.CipherFlag = cipherFlag === "true";
    return AjaxPromise(params);
};

/**
 * 同步处理 是否启用压缩
 */
const AjaxPromise = params => {
    let gzipSwitch = getGlobalStorage("local", "gzip")/1;
    if (gzipSwitch !== null) {
        caSecurity(params);
    } else {
        Axios({
            url: `/nccloud/platform/gzip/switch.do`,
            method: "post",
            data: {
                sysParamJson: {
                    busiaction: `${langCheck("0000PUB-000078")}-${langCheck(
                        "0000PUB-000079"
                    )}` /* 国际化处理： 流量压缩,查询*/,
                    ts: new Date().getTime(),
                    pagecs: cckk
                }
            },
            async: false
        })
            .then(res => {
                logObj.setLog({request:params, success: res})
                if (res.status === 200) {
                    let {
                        data: {
                            success: successStatus,
                            error: errorStatus,
                            data
                        }
                    } = res;
                    if (successStatus) {
                        setGlobalStorage("local", "gzip", data ? 1 : 0);
                        caSecurity(params);
                    } else {
                        Notice({status: "error", msg: errorStatus.message, mark: `${errorStatus.message}workbenchTip`});
                    }
                }
            })
            .catch(error => {
                logObj.setLog({request:params, err: error})
            });
    }
};
/**
 * ca 安全 加签       是否是有请求数据的才进行加签
 */
const caSecurity = params => {
    // 获取压缩标识
    let gzipSwitch = getGlobalStorage("local", "gzip")/1;
    // 获取加签标识
    // let isNccSign = getGlobalStore("isNccSign");
    // 默认加签
    let isNccSign = true;
    // gzipSwitch = gzipSwitch;
    let reqData = JSON.stringify({
        sysParamJson: {
            busiaction: langCheck(
                "0000PUB-000071"
            ),/* 国际化处理： 查询请求安全加签开关*/
            pagecs: cckk
        }
    });
    let gziptools;
    if (gzipSwitch) {
        gziptools = new Gzip();
        reqData = gziptools.zip(reqData);
    }
    if (isNccSign !== null) {
        AjaxMain(params);
    } else {
        // ***************************************************
        // 此处逻辑不执行，要求一定启用加签功能
        Axios({
            url: `/nccloud/platform/security/switch.do`,
            method: "post",
            data: reqData,
            async: false,
            transformResponse: [
                function (data, headers) {
                    // 对 data 进行任意转换处理
                    let gData;
                    // 是否启动压缩
                    if (gzipSwitch) {
                        gData = gziptools.unzip(data);
                    } else {
                        gData = JSON.parse(data);
                    }
                    return gData;
                }
            ]
        })
            .then(res => {
                logObj.setLog({request:params, success: res})
                if (res.status === 200) {
                    let {
                        data: {
                            success: successStatus,
                            error: errorStatus,
                            data
                        }
                    } = res;
                    if (successStatus) {
                        setGlobalStorage("local", "isNccSign", data);
                        AjaxMain(params);
                    } else {
                        Notice({status: "error", msg: errorStatus.message, mark: `${errorStatus.message}workbenchTip`});
                    }
                }
            })
            .catch(error => {
                logObj.setLog({request:params, err: error})
            });
        // *****************************************************
    }
};
/**
 * Ajax 主要函数
 * @param {String} url 请求地址
 * @param {Object} data 请求数据
 * @param {String} method 请求方法 get/post
 * @param {Boolen} switchKey 是否启用压缩
 * @param {Boolen} loading 是否开启loading
 * @param {Object} info 请求描述对象 name - 发起请求的应用名称  action - 发起请求的动作
 * @param {Function} success 请求成功回调
 */
const AjaxMain = params => {
    let {
        url,
        data,
        method = "post",
        switchKey = false,
        loading = false,
        loadingMsg = langCheck("0000PUB-000279"),
        info = {name: "", action: ""},
        success = res => {
            // console.log(res);
        },
        error = res => {

        },
        noNeedShowError = true
    } = params;
    let userInfos = window.GETBUSINESSINFO ? window.GETBUSINESSINFO() : null;
    let userCode = userInfos && userInfos.userCode ? userInfos.userCode : null;
    let {c} = GetQuery(window.location.hash);
    let appcode = info.appcode ? info.appcode : c ? c : "10228888";
    let div;
    let gzipSwitch = getGlobalStorage("local", "gzip")/1;
    // gzipSwitch = JSON.parse(gzipSwitch);
    let gziptools = new Gzip();
    data = {
        busiParamJson: JSON.stringify(data),
        sysParamJson: {
            busiaction: `${info.name}-${info.action}`,
            appcode: appcode,
            ts: new Date().getTime(),
            pagecs: cckk
        }
    };
    // 加签
    if (data.busiParamJson) {
        // 加签标识获取  -- bbqin
        // 这里会影响原字符串 （编码、位数？）导致后台解析不了字符串
        let strDataSign = data.busiParamJson + "";
        // 加签 -- bbqin
        userCode && (data.sysParamJson.sn = transSn(userCode));
        userCode &&
        (data.sysParamJson.signdata = transSign(strDataSign, userCode));
    }
    // 判断当前是否为退出操作
    if (url.indexOf("logout") !== -1) {
        LOGOUT = true;
    }
    /**
     * 请求loading
     */
    if (loading) {
        Notice({status: "loading", msg: loadingMsg});
    }
    /**
     * 开启报错提示
     */
    let flag = true;
    Axios({
        url,
        data,
        method,
        validateStatus: function (status) {
            if (status === 200 && url.indexOf("logout.do") > -1) {
                flag = false;
                // 登出的时候清理一下aeskey cowboy by bbqin
                localStorage.removeItem('cowboy');
                exitPage("/nccloud");
            } else {
                return status < 500;
            }
        },
        transformRequest: [
            function (data) {
                // 不压缩
                let gData = JSON.stringify(data);
                // 启动压缩
                if (!switchKey && gzipSwitch) {
                    gData = gziptools.zip(gData);
                }
                return Cipher.encrypt(gData, aeskey);
            }
        ],
        transformResponse: [
            function (data, headers) {
                // 是否存在contentpath 只有401时可能存在
                if (headers.contentpath) {
                    // 是否打开新页签，如果打开将其关闭
                    if (
                        window.newwindow &&
                        window.newwindow.location.origin == "null"
                    ) {
                        window.newwindow.close();
                    }
                    // 用户离线状态，并返回到登录页
                    if (headers.redirect === "REDIRECT") {
                        flag = false;
                        SpecialTip(
                            headers.redirectstatus,
                            exitPage,
                            headers.contentpath
                        );
                        // 鉴权提示
                    } else if (headers.authorize === "FALSE") {
                        Notice({
                            status: "error",
                            msg: langCheck(
                                "0000PUB-000072"
                            ) /* 国际化处理： 该请求未配置鉴权信息*/
                        });
                        return false;
                    } else {
                        exitPage(headers.contentpath);
                    }
                }
                if (headers.environmentmodel) {
                    window.environmentmodel = headers.environmentmodel;
                }
                // 对 data 进行任意转换处理
                let gData;
                // 先解密 bbqin
                data =
                    typeof data === "string"
                        ? Cipher.decrypt(data, aeskey)
                        : data;
                // 启动压缩
                if (!switchKey && gzipSwitch) {
                    gData = gziptools.unzip(data);
                } else {
                    gData = JSON.parse(data);
                }
                return gData;
            }
        ]
    })
        .then(res => {
            logObj.setLog({request:params, success: res})
            if (loading) {
                Notice({status: 'close'})
            }
            if (res.status === 200) {
                let {
                    data: {success: successStatus = true, error: errorStatus}
                } = res;
                if (successStatus) {
                    success(res.data);
                } else {
                    error(res);
                    !noNeedShowError && Notice({status: "error", msg: errorStatus.message});
                }
                if (loading) {
                    // Notice({status: 'loading'})
                }
            }
        })
        .catch(error => {
            logObj.setLog({request:params, err: error})
            if (loading) {
                Notice({status: 'close'})
            }
            let number = error.number;
            console.log(number);
            // -2147467259 -未指名错误   -2147024891 -拒绝访问错误
            if (number === -2147467259 || number === -2147024891) {
                return;
            }
            if (flag) {
                if (error.message === "") {
                    error.message = langCheck(
                        "0000PUB-000073"
                    ); /* 国际化处理： 未知类型错误！*/
                }
                // Notice({ status: "error", msg: error.message });
            }
        });
};
/**
 * 强制退出提示
 * @param {Function} callback 回调
 * @param {String} status 状态
 * @param {String} paramData 参数数据
 */
const SpecialTip = (status, callback, paramData) => {
    Modal.alert(langCheck("0000PUB-000074"), switchStatus(status), [
        {
            text: langCheck('0000PUB-000001'),
            onPress: () => {
                try {
                    NativeObj.closePage();
                }catch (e) {
                    window.history.go(-1);
                }
            }
        }
    ]);
};
window.SpecialTip = SpecialTip;
/**
 * 状态选择
 */
const switchStatus = status => {
    switch (status) {
        case "0":
            // return langCheck("0000PUB-000075");
            return langCheck("0000PUB-000278"); //未检测到登陆状态，返回重新进入
        case "1":
            return langCheck("0000PUB-000076"); //有人强制登陆,您已被踢出系统！
        case "2":
            return langCheck("0000PUB-000077"); //管理员在系统监视器进行了强制踢出操作！你已被踢出系统!
    }
};
/**
 * 退出页面
 */
const exitPage = hrefString => {
    window.location.href = hrefString;
};
export default Ajax;
