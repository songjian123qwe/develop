import ajax from '../../login/actions/ajax';
import {getUrlParam} from '../../login/actions/tool';
import {getStoreBc, getMultiLang} from '../../login/actions/language';
import Modal from 'antd-mobile/lib/modal';
import 'antd-mobile/dist/antd-mobile.css';
import {closePage, systemLang} from '../../../public/mobile/utils';
import NativeObj from 'src/hrzz/public/mobile/utils/jsbridge';
import clearObj from '../../third-login/main/clear';

clearObj.clear();

// 进入页面清掉加密标志
localStorage.removeItem('gzip');
localStorage.removeItem('rockin');
localStorage.removeItem('rockinlog');

let code = getUrlParam('code') || '';
let pk_wf_task = getUrlParam('pk_wf_task');
let bcCode = getUrlParam('bcCode');
let encrypturl = getUrlParam('encrypturl');
let appId = getUrlParam('appId');
let langCode = systemLang();

let urlParam = getUrlParam();

class ThirdLogin  {
    constructor(props) {
        this.approveEdit = this.approveEdit.bind(this);
        this.loginSubmit = this.loginSubmit.bind(this);
        this.getInitData = this.getInitData.bind(this);
    }

    getInitData() {
        let data ={};
        data.bcCode = getStoreBc();

        return new Promise((resolve, reject) => {
            ajax({
                url: '/nccloud/riart/login/init.do',
                data: data,
                success: (res) => {
                    resolve(res);
                }
            });
        });
    }

    approveEdit() {
        let data ={
            ...urlParam,
            pk_wf_task: pk_wf_task
        };

        return new Promise((resolve, reject) => {
            ajax({
                url: '/nccloud/hrpub/approve/HRApproveEditAction.do',
                data: data,
                success: (res) => {
                    if(res.success) {
                        if(res.data.rslCode === '0') {
                            let url = res.data.url;
                            window.location.href = /^\//.test(url) ? url : `/${url}`;
                        }
                        else if(res.data.rslCode == '-1'){
                            Modal.alert('', res.data.rslMsg, [{
                                text: getMultiLang('00032', '确定'),
                                onPress: () => {
                                    NativeObj.closePage();
                                }
                            }]);
                        }
                    }
                }
            })
        });
    }

    loginSubmit(data) {
        return new Promise((resolve, reject) => {
            ajax({
                url: '/nccloud/hr/login/HRLoginVerfiyAction.do',
                data: data,
                success: (res) => {
                    if(res.success) {
                        if(res.data.url) {
                            resolve(res);
                        }
                        else if(res.data.userCode && res.data.busiCenterCode) {
                            localStorage.removeItem('accessToken');
                            ajax({
                                url: '/nccloud/mob/platform/mob/login',
                                data: {
                                    userCode: res.data.userCode,
                                    appId: appId,
                                    code: res.data.busiCenterCode
                                },
                                success: (res) => {
                                    localStorage.setItem('accessToken', res.data.data ? res.data.data : res.data);
                                    resolve(res);
                                },
                                error: (res) => {
                                    if(res.data.message === 'success') {
                                        localStorage.setItem('accessToken', res.data.data ? res.data.data : res.data);
                                    }
                                    resolve(res);
                                }
                            });
                        }
                        else if(res.data.rslCode == '-1'){
                            Modal.alert('', res.data.rslMsg, [{
                                text: getMultiLang('00032', '确定'),
                                onPress: () => {
                                    NativeObj.closePage();
                                }
                            }]);
                        }
                    }
                }
            });
        });
    }

    async init() {
        await this.loginSubmit({
            ...urlParam,
            bcCode: bcCode || '',
            code: code,
            encrypturl: encrypturl,
            langCode: langCode,
        })
        await this.approveEdit();
    }
}

let tlHr = new ThirdLogin();

tlHr.init();