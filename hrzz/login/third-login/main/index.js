import ajax from '../../login/actions/ajax';
import {getUrlParam} from '../../login/actions/tool';
import {getStoreBc, getMultiLang} from '../../login/actions/language';
import Modal from 'antd-mobile/lib/modal';
import 'antd-mobile/dist/antd-mobile.css';
import {closePage, systemLang} from '../../../public/mobile/utils';
import NativeObj from 'src/hrzz/public/mobile/utils/jsbridge';
import clearObj from './clear';

clearObj.clear();


// 进入页面清掉加密标志
localStorage.removeItem('gzip');
localStorage.removeItem('rockin');
localStorage.removeItem('rockinlog');

let code = getUrlParam('code') || '';
let redirect_uri = getUrlParam('redirect_uri');
let bcCode = getUrlParam('bcCode');
let encrypturl = getUrlParam('encrypturl');
let langCode = systemLang();


class ThirdLogin {
    constructor() {
        this.getInitData = this.getInitData.bind(this);
        this.loginSubmit = this.loginSubmit.bind(this);
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

    loginSubmit(data) {
        ajax({
            url: '/nccloud/hr/login/HRLoginVerfiyAction.do',
            data: data,
            success: (res) => {
                if(res.success) {
                    if(res.data.url) {
                        let redirectUrl = res.data.url;
                        window.location.href = /^\//.test(redirectUrl) ? redirectUrl : `/${redirectUrl}`;
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
    }

    init() {
        this.loginSubmit({
            bcCode: bcCode || '',
            code: code,
            encrypturl: encrypturl,
            langCode: langCode
        });
    }
}


let tl = new ThirdLogin();

tl.init();