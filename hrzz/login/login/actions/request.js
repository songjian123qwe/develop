import ajax from './ajax';

import Modal from 'antd-mobile/lib/modal';

import {
    getStoreLang,
    InitMultiLang,
    getMultiLang,
    getStoreBc
} from "./language";

import {viewModel} from 'platform-login';

const { setGlobalStorage, getGlobalStorage, removeGlobalStorage } = viewModel;

export default class RequestAction {

    // 登录提交
    loginSubmit = (postData) => {
        return ajax({
            url: '/nccloud/riart/login/verfiy.do',
            data: postData
        });
    }

    // 身份验证提交
    idVerify = (postData) => {
        return ajax({
            url: '/nccloud/riart/login/forpsw.do',
            data: postData
        });
    }
    
    // 发送重置请求
    postResetPwd = (postData) => {
        return ajax({
            url: '/nccloud/riart/login/toreset.do',
            data: postData
        });
    }

    // 第一次登录后发送重置请求
    postResetFromFirstLogin = (postData) => {
        return ajax({
            url: '/nccloud/login/psw/reset.do',
            data: postData
        });
    }


    // 登录成功后的一个请求
    postSwitch = () => {
        return ajax({
            url: '/nccloud/platform/aes/switch.do',
            data: {
                sysParamJson: {
                    busiaction: getMultiLang('00055', '查询请求aes加密开关')
                }
            },
            async: false
        })
            .then((asd) => {
                asd = typeof asd === 'string' ? JSON.parse(asd) : asd;

                if (asd.data) {
                    if (asd.data.success || asd.success) {
                        if (asd.data) {
                            setGlobalStorage('localStorage','rockin', true);
                            setGlobalStorage('localStorage','rockinlog',167);
                        } else {
                            setGlobalStorage('localStorage','rockin', false);
                            setGlobalStorage('localStorage','rockinlog',171);
                        }
                    }
                }
            })
            .catch(() => {
                setGlobalStorage('localStorage','rockinlog',176);
            });
    }

    // 登录后判断是否有offer
    queryOfferCountAction = () => {
        let _hash = window.location.hash;
        window.location.hash = 'c=60652010';

        return new Promise((resolve, reject) => {
            ajax({
                url: '/nccloud/hrzz/entry/QueryOfferCountAction.do',
                method: 'post',
                info: {
                    appcode: '60652010'
                },
                success: (res) => {
                    if(/true/.test(res.data)) {
                        resolve(res.data);
                    }
                    else {
                        Modal.alert(getMultiLang('00056', '您未收到offer或已入职'), [{
                            text: getMultiLang('00032', '确定'),
                            onPress: () => {
                                closePage();
                            }
                        }]);
                        reject(res.data);
                    }
                }
            });
        })
            .finally(() => {
                // window.location.hash = _hash;
            })
    }

}