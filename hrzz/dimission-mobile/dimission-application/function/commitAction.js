/**
 *
 * Created by shenzaifang on 2019-05-20
 */
import {hrAjax} from "../../../public/mobile/utils/snRequestMeta";
import Cipher, {opaqueDecrypt} from "../../../public/mobile/utils/cipher";
import Gzip from "../../../public/mobile/utils/gzip";

export function commitAction(body) {
    let data = {
        url: "/nccloud/hrzz/dimission/DimissionApplyCommitAction.do",
        headers: {'Content-Type': 'multipart/form-data'},
        body
    };
    return hrAjax(data)
    /*return new Promise((resolve, reject) => {

        axios.post(data.url, data.body, {
            headers: data.headers, transformResponse: [function (data) {
                // 对 data 进行任意转换处理
                return unZip(data);
            }]
        }).then(res => {
            resolve(res)
        }).catch(reason => {
            reject(reason)
        })
    })*/
}

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
 * 获取全局 store
 * @param {String} key
 */
const getGlobalStore = key => {
    let infosFromCookie = getCookie(key);
    let infosFromLocalStorage = localStorage.getItem(key);
    if (infosFromCookie) {
        return JSON.parse(infosFromCookie);
    } else if (infosFromLocalStorage) {
        return JSON.parse(infosFromLocalStorage);
    } else {
        return null;
    }
};

function unZip(data) {
    let aeskey = opaqueDecrypt(localStorage.getItem("cowboy"));
    let gzipSwitch = getGlobalStore("gzip");
    gzipSwitch = JSON.parse(gzipSwitch);
    let gData;
    let gziptools = new Gzip();
    // 先解密 bbqin
    data =
        typeof data === "string"
            ? Cipher.decrypt(data, aeskey)
            : data;
    // 启动压缩
    if (gzipSwitch) {
        gData = gziptools.unzip(data);
    } else {
        gData = JSON.parse(data);
    }
    return gData;
}
