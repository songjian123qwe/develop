/**
 * 获取url参数
 * @param {String} query 当前 url 中传递的参数
 */
import Ajax from "./ajax";

export const GetQuery = query => {
    let theRequest = {};
    if (query.indexOf("?") != -1) {
        let str = query.split("?")[1];
        if (str.indexOf("&") != -1) {
            if (str[0] == "&") {
                str = str.substr(1);
            }
            let strs = str.split("&");
            for (let i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = decodeURIComponent(
                    decodeURIComponent(strs[i].split("=")[1])
                );
            }
        } else {
            theRequest[str.split("=")[0]] = decodeURIComponent(
                decodeURIComponent(str.split("=")[1])
            );
        }
    }
    return theRequest;
};
/**
 * 将对象转换成 url 参数字符串
 * @param {Object} object 参数对象
 */
export const CreateQuery = object => {
    let arg = "";
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            const element = object[key];
            arg += `&${key}=${element}`;
        }
    }
    let defParam = arg;
    let hashParam = arg.split("");
    hashParam.splice(0, 1, "#");
    hashParam = hashParam.join("");
    let searchParam = arg.split("");
    searchParam.splice(0, 1, "?");
    searchParam = searchParam.join("");
    /**
     * defParam &开头的参数
     * hashParam #开头的参数
     * searchParam ？开头的参数
     */
    return {
        defParam,
        hashParam,
        searchParam
    };
};
/**
 * 多语校验
 * @param {String} multiLangCode
 * @param {Boolean} pages
 * @param {Object} json
 * @param {String} multiLangId
 */
export const langCheck = (multiLangCode, pages = false, json, multiLangId = "0000PUB") => {
    if (pages) {
        return (json && json[multiLangCode] && json[multiLangCode]) || "";
    }
    return (window.multiLang && window.multiLang[multiLangId] && window.multiLang[multiLangId][multiLangCode]) || "";
};
/**
 * 多语校验
 * @param {String} multiLangCode
 *
 *
 */
export const langZoneSetting = multiLangCode => {
    return window.multiZoneSettingLang
        ? window.multiZoneSettingLang[multiLangCode]
            ? window.multiZoneSettingLang[multiLangCode]
            : ""
        : "";
};
/**
 * 数字补位
 * @param {Number} num 需要补位的数字
 * @param {Number} n 需要补的位数
 * Pad(1,2) => // 01
 */
export const Pad = (num, n) => {
    let len = num.toString().length;
    while (len < n) {
        num = "0" + num;
        len++;
    }
    return num;
};
/**
 * 连续的ajax延迟
 * @param {Function} fn 需要延迟运行的的回调函数
 **/
let deferFnInterval;

export function DeferFn(fn) {
    deferFnInterval = new Date().getTime();
    setTimeout(() => {
        //停止输入0.5s后执行
        if (new Date().getTime() - deferFnInterval >= 500) {
            fn();
        }
    }, 500);
}
/**
 * 获取对应[multiLangId]模块的多语信息
 * @param {String} multiLangCode
 * @param {String} multiLangId
 */
export const langValue = (multiLangId = "0000PUB",multiLangCode) => {
    if(multiLangCode){
        return (window.multiLang && window.multiLang[multiLangId] && window.multiLang[multiLangId][multiLangCode]) || "";
    } else {
        return (window.multiLang && window.multiLang[multiLangId]) || ""
    }

};
/**数组对象去重
 * @param {Object} arr 需要去重的数组对象
 * @param {String} name 对象key值名
 */
export const arrayUnique = (arr, name) => {
    var hash = {};
    return arr.reduce(function (item, next) {
        hash[next[name]] ? "" : (hash[next[name]] = true && item.push(next));
        return item;
    }, []);
};

/**js代码深拷贝
 * @param {Object} data 需要深拷贝的对象
 */
export const getType = obj => {
    //tostring会返回对应不同的标签的构造函数
    var toString = Object.prototype.toString;
    var map = {
        "[object Boolean]": "boolean",
        "[object Number]": "number",
        "[object String]": "string",
        "[object Function]": "function",
        "[object Array]": "array",
        "[object Date]": "date",
        "[object RegExp]": "regExp",
        "[object Undefined]": "undefined",
        "[object Null]": "null",
        "[object Object]": "object"
    };
    if (obj instanceof Element) {
        return "element";
    }
    return map[toString.call(obj)];
};

export const deepClone = data => {
    var type = getType(data);
    var obj;
    if (type === "array") {
        obj = [];
    } else if (type === "object") {
        obj = {};
    } else {
        //不再具有下一层次
        return data;
    }
    if (type === "array") {
        for (var i = 0, len = data.length; i < len; i++) {
            obj.push(deepClone(data[i]));
        }
    } else if (type === "object") {
        for (var key in data) {
            obj[key] = deepClone(data[key]);
        }
    }
    return obj;
};

/**
 * 获取cookie
 */
export const getCookie = c_name => {
    //键的名字
    if (document.cookie.length > 0) {
        let c_start = document.cookie.indexOf(c_name + "="); //获取字符串的起点
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1; //获取值的起点
            let c_end = document.cookie.indexOf(";", c_start); //获取结尾处
            if (c_end == -1) c_end = document.cookie.length; //如果是最后一个，结尾就是cookie字符串的结尾
            return decodeURI(document.cookie.substring(c_start, c_end)); //截取字符串返回
        }
    }
    return "";
};

export const snCreateUIDom = (reqData, callback) => {
    Ajax({
        url: '/nccloud/platform/pub/mergerequest.do',
        data: reqData,
        success: function (res) {
            let meta = res.data;
            if (callback && typeof callback == 'function') {
                callback(meta);
            }
        }
    });
}

export function getParamByLocation(queryString, pop) {
    let result = '';
    queryString = queryString.substring(1);
    if (queryString) {
        let paramsArr = queryString.split('&');
        if (paramsArr && paramsArr instanceof Array) {
            paramsArr.forEach((item) => {
                if (item.indexOf('=') != -1 && item.split('=') && item.split('=') instanceof Array) {
                    if (item.split('=')[0] === pop) {
                        if (item.split('=')[1]) {
                            result = decodeURIComponent(item.split('=')[1]);
                        }
                    }
                }
            });
        }
    }
    return result;
}

/**
 * 防抖动函数
 * @param wait  防抖动的时间差 默认为1s （ms）
 * @returns {boolean} true：可以继续执行；  false: 不可继续进行
 */
export function debounce(wait = 1000) {
    let nowTimeStr = (new Date()).getTime();
    let url = window.location.href;
    let reg = (/\/([\w\-]+)\/main\//); //匹配 /****/main/ 中的****
    let matArr = url.match(reg);
    if(!matArr) {
        console.error(`url(${url}) doesn't contain /****/main/`);
        return true
    }
    let key = matArr[1]+'_debounce';
    let lastTime = window.sessionStorage.getItem(key);
    if(!lastTime) {
        window.sessionStorage.setItem(key, nowTimeStr+'');
        return true
    }
    let diff = nowTimeStr - lastTime;
    if(diff>wait){
        window.sessionStorage.setItem(key, nowTimeStr+'');
        return true
    }
    return false
}
