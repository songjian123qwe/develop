
import Cookie from './cookie';

import {Cipher, viewModel} from 'platform-login';

import {
    getStoreLang,
    InitMultiLang,
    getMultiLang,
    getStoreBc
} from "./language";

import Toast from 'antd-mobile/lib/toast';
import Modal from 'antd-mobile/lib/modal';

import {
    insertString,
    uuidv4,
    confirm,
    getUrlParam
} from './tool';

import RSAUtils from "./rsa/security.js";

import RequestAction from './request';
import IdVerifyAction from './identityVerify';

const { setGlobalStorage, getGlobalStorage, removeGlobalStorage } = viewModel;
const { opaqueEncrypt, opaqueDecrypt} = Cipher;

let busiCenterCode = getUrlParam('bccode');

class MainAction {
    constructor(c) {
        this.c = c;

        this.loginUserNameInput = null;
    }

    extend = [Cookie, RequestAction, IdVerifyAction]

    didMount = () => {
        const {
            props: {
                data: {
                    codeVerfiy
                }
            }
        } = this.c;

        this.setCookie("busiCenterCode", busiCenterCode);

        let userId = this.getCookie("userloginid");

        if(userId && userId !== 'null' && userId !== 'undefined') {
            this.update({
                userName: userId,
                codeVerify: codeVerfiy
            });
        }
        this.update({
            codeVerify: codeVerfiy
        });
        this.getPageHeight();
    }

    // 获取页面的高度
    getPageHeight = () => {
        if(window.getComputedStyle) {
            let app = document.getElementById('login_div');
            let height = window.getComputedStyle(app).height.replace('px', '');

            this.update({
                pageHeight: height
            });
        }
    }

    // 跳转到
    turnToPage = (page, from) => {    
        return () => {
            if(page === 'id-verify' && from === 'main') {
                this.update({
                    userName: '',
                    email: ''
                });
            }
            this.update({
                currentPage: page
            });
        }
    }

    // 存储userName输入框的实例
    setLoginUserNameRef = (ref) => {
        this.loginUserNameInput = ref;
    }

    update = (data, cb) => {
        this.c.setState({
            ...data
        }, cb);
    }

    // 输入用户名密码的时候
    onChangeInput = (field) => {
        return (value, e) => {
            this.update({
                [field]: value
            });
        }
    }

    // 点击登录提交
    onLogin = async (e, postData, agreementstatus) => {
        const {state, props} = this.c;
        const {
            userName,
            password
        } = state;
        const {
            data
        } = props;

        if(!data.exponent) {
            Toast.fail(getMultiLang("00043","安全日志数据源异常，请联系环境管理员处理"));
            return;
        }

        if(!userName || !password) {
            return;
        }

        let opt = this.makeLoginOption(postData);
        agreementstatus && (opt.postData['agreementstatus'] = agreementstatus);
        let res = await this.loginSubmit(opt.postData); 

        if(res.success) {
            this.loginSuccess(res, opt);
        }
    }

    renderLink = () => {
        const {props} = this.c;
        const {data} = props;

        if(data.langCode=="english"){
            return <div><a href="https://cdn.yonyoucloud.com/pro/yht/cas/doc/registerAgreement.cdn.html?locale=en" target="_blank" className="link-proto">{getMultiLang("00068","《用友云注册协议》和")}</a><br/><a href="https://cdn.yonyoucloud.com/pro/yht/cas/doc/privacyAgreement.cdn.html?locale=en" target="_blank" className="link-proto">{getMultiLang("00069","《用友云隐私条款》")}</a></div>
        }else if(data.langCode=="tradchn"){
            return <div><a href="https://cdn.yonyoucloud.com/pro/yht/cas/doc/registerAgreement.cdn.html" target="_blank" className="link-proto">{getMultiLang("00068","《用友云注册协议》和")}</a><br/><a href="https://cdn.yonyoucloud.com/pro/yht/cas/doc/privacyAgreement.cdn.html" target="_blank" className="link-proto">{getMultiLang("00069","《用友云隐私条款》")}</a></div>
        }else{
            return <div><a href="https://cdn.yonyoucloud.com/pro/yht/cas/doc/registerAgreement.cdn.html" target="_blank" className="link-proto">{getMultiLang("00068","《用友云注册协议》和")}</a><br/><a href="https://cdn.yonyoucloud.com/pro/yht/cas/doc/privacyAgreement.cdn.html" target="_blank" className="link-proto">{getMultiLang("00069","《用友云隐私条款》")}</a></div>
        }
    }

    // 弹出协议
    alertAgreement = (postData) => {
        const {
            props
        } = this.c;

        let agreementAlert = Modal.alert(
            getMultiLang("00066","服务协议及隐私权政策："), 
            (
                <div>
                    {getMultiLang("00067", "在您使用NC Cloud用友云服务之前，您需要通过点击同意的形式在线签署以下协议，协议内容：")}
                    {this.renderLink()}
                    <div>
                        {getMultiLang("00070","请您务必仔细阅读、充分理解协议中的条款内容后再点击同意。")}
                    </div>
                    <div>
                        {getMultiLang("00071","一旦您开始使用用友云服务，将被视为对本声明和政策的接受和认可")}
                    </div>
                </div>
            ),
            [{
                text: getMultiLang("00014", "取消"),
                onPress: () => {
                    agreementAlert.close();
                }
            }, {
                text: getMultiLang("00072", "同意并继续"),
                onPress: () => {
                    this.onLogin(null, postData, '1.0');
                    agreementAlert.close();
                }
            }]
        );
    }

    // 登录请求成功的函数
    loginSuccess = async (res, opt) => {
        const {
            props: {
                data: {
                    codeVerfiy
                }
            }
        } = this.c;
        let { data } = res;

        let rslCode = data.rslCode;

        let cowboy = opt.cowboy;
        let aeskeyCahe = opt.aeskeyCahe;

        setGlobalStorage('localStorage','cowboy', cowboy || opaqueEncrypt(aeskeyCahe));

        await this.postSwitch();

        // 登录成功
        if(rslCode === '0') {
            this.queryOfferCountAction()
                .then((res) => {
                    if(res) {
                        sessionStorage.setItem('showNav', true)
                        this.setCookie("busiCenterCode", busiCenterCode);
                        window.location = "/nccloud/resources/hrzz/entry-mobile/myentry/main/index.html";
                    }
                });
        }
        // 登录失败
        else if(rslCode === '1' || rslCode === '-1') {
            Toast.fail(data.rslMsg || data.rslMsg);
        }
        // 首次登录需要重置密码
        else if (rslCode === '2') {
            this.update({
                currentPage: 'first-login',
                showVerifyCode: false,
                dsName: data.dsName
            });
        }
        // 需要确认在登录的状态
        else if(rslCode === '3' || rslCode === '5') {
            confirm(data.rslMsg, () => {
                if(rslCode === '3') {
                    opt.postData['notips'] = 1
                }
                else if(rslCode === '5') {
                    opt.postData['forcelogin'] = 1;
                }

                this.onLogin(null, opt.postData)
            }, getMultiLang);
        }
        // 需要确认协议
        else if(rslCode === '9') {
            this.alertAgreement(opt.postData);
        }
    }

    // 拼接登录参数
    makeLoginOption = (postData) => {
        const {state, props} = this.c;
        const {
            userName,
            password
        } = state;
        const {
            data,
            langCode
        } = props;

        if(!postData) {
            postData = {
                ...data,
                busiCenterCode: busiCenterCode,
                langCode: langCode,
                timezone: insertString(new Date().toString().substring(25,33), 6, ":"),
                userCode: userName,
                userPWD: ''
            };
        }

        let key = RSAUtils.getKeyPair(data.exponent, '', data.modulus);
        let aeskeyCahe = uuidv4();
        let cowboy = getGlobalStorage('localStorage','cowboy');

        aeskeyCahe = cowboy ? opaqueDecrypt(cowboy) : aeskeyCahe;

        let aeskey = RSAUtils.encryptedString(key, aeskeyCahe);

        postData['userPWD'] = RSAUtils.encryptedString(key, password);
        postData['aeskey'] = aeskey;

        // 重置 aes 请求 --bbqin
        localStorage.removeItem('rockin');
        localStorage.removeItem('rockinlog');

        this.update({
            encryptionPWD: postData['userPWD']
        });

        return {
            postData: postData,
            key: key,
            aeskeyCahe: aeskeyCahe,
            cowboy: cowboy,
            aeskey: aeskey
        };
    }

    // input框聚焦就改变程password，为了解决自动填充密码问题
    focusChangeInputType = (field) => {
        return () => {
            this.update({
                inputType: {
                    ...this.c.state.inputType,
                    [field]: 'password'
                }
            });
        }
    }
}

export default MainAction;