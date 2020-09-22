import CONFIG from './config.js';
const aeskey = '4fa8959db7b4423a99f056e299914128';
import { encrypt, decrypt } from './cipher';
import ViewModel from './viewmodel/viewmodel';
let { setGlobalStorage, getGlobalStorage } = ViewModel;

//将sessionStorage里的值,做加密处理

export function getAppUrl() {
    let pageid = '', pageKey = '', pageStore = '';
    if (top.location.hash.split('?') && top.location.hash.split('?')[1]) {
        pageid = top.location.hash.split('?')[1].split("=")[1];
        pageKey = top.location.hash.split('?')[1].split("=")[0];
    }

    //修改参数存放store
    //let storeCipher = getGlobalStorage('localStorage', 'storeCipher') == '0' ? false : true;
    let session = getGlobalStorage('sessionStorage', 'NCCAPPURL');
    // if (storeCipher) {
    //     session = session && decrypt(session, aeskey);
    // }
    session = session && JSON.parse(session);
    pageStore = session && session[pageid];
    if (
        pageKey === "page" &&
        pageStore
    ) {
        return {
            pageid: pageid,
            pageurl: pageStore
        }
    } else {
        return {
            pageid: '',
            pageurl: ''
        }
    }
}

export function setAppUrl(key, newParams) {

    //let storeCipher = getGlobalStorage('localStorage', 'storeCipher') == '0' ? false : true;
    let session = getGlobalStorage('sessionStorage', 'NCCAPPURL');
    // if (storeCipher && session) {
    //     session = decrypt(session, aeskey);
    // }
    session = session && JSON.parse(session);

    if (session) {
        session[key] = newParams;
    } else {
        session = {
            [key]: newParams
        }
    }

    session = JSON.stringify(session);

    // if (storeCipher) {
    //     session = encrypt(session, aeskey); 
    // }

    setGlobalStorage('sessionStorage', 'NCCAPPURL', session);
}


export function getAppReqParam() {
    let app = '', appcode = '', custom = '', ssc_templetid = '', pagecode = '';

    let appN = window.parent.location.hash.split('?');
    appN = appN && appN[1];

    if (CONFIG.isPageModal && window.parent === top) {
        appN = getAppUrl().pageurl;
    }

    if (appN) {
        let appPrams = appN.split('&');
        if (appPrams && appPrams instanceof Array) {
            appPrams.forEach((item) => {
                if (item.indexOf('=') != -1 && item.split('=') && item.split('=') instanceof Array) {
                    if (item.split('=')[0] === 'n') {
                        if (item.split('=')[1]) {
                            app = decodeURIComponent(decodeURIComponent(item.split('=')[1]));
                        }
                    }
                    if (item.split('=')[0] === 'c') {
                        if (item.split('=')[1]) {
                            appcode = decodeURIComponent(decodeURIComponent(item.split('=')[1]));
                        }
                    }
                    if (item.split('=')[0] === 'p') {
                        if (item.split('=')[1]) {
                            pagecode = decodeURIComponent(decodeURIComponent(item.split('=')[1]));
                        }
                    }
                    if (item.split('=')[0] === 'custom') {
                        if (item.split('=')[1]) {
                            custom = decodeURIComponent(decodeURIComponent(item.split('=')[1]));
                        }
                    }
                    if (item.split('=')[0] === 'ssc_templetid') {
                        if (item.split('=')[1]) {
                            ssc_templetid = decodeURIComponent(decodeURIComponent(item.split('=')[1]));
                        }
                    }
                }
            });
        }
    }

    return {
        app: app,
        appcode: appcode,
        pagecode: pagecode,
        custom: custom,
        ssc_templetid: ssc_templetid
    }


    // if (!appcode) {
    // 	if (window.parent && window.parent.parent) {
    // 		//嵌套两层iframe
    // 		appcode = getParamByLocation(window.parent.location.hash, 'c');
    // 	}
    // }
    // if (!custom) {
    // 	if (window.parent && window.parent.parent) {
    // 		//嵌套两层iframe
    // 		custom = getParamByLocation(window.parent.location.hash, 'custom');
    // 	}
    // }

}




