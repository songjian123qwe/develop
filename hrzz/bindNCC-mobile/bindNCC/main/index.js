import React, {Component} from 'react';
import ReactDOM from "react-dom";
import './index.less';
import 'src/hrzz/public/mobile/static/style/index.less';
import proFetch from "../../../public/mobile/utils/project-fetch";
import {DHeader, Alert} from 'src/hrzz/public/mobile/components';
import {Button, InputItem, Toast} from 'antd-mobile';
import NativeObj from 'src/hrzz/public/mobile/utils/jsbridge';
import {compatibleNavImg, systemLang} from "../../../public/mobile/utils";
import {getMultiLang} from "../../../public/mobile/utils/getMultiLang";
import {getUrlParam} from "./tool";

const hasHeader = sessionStorage.getItem('showNav') === 'true';
let code = getUrlParam('code') || '';
let bcCode = getUrlParam('bcCode');
let dataCenter = getUrlParam('dataCenter');
let langCode = systemLang();

class BindNCC extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: '',
            json: {},
            iconCode: '',
            verifCode: '',
            timer: 0,
            hasSend: false,
            errMsg: ''
        };
        this.userInfo = {};
    }

    componentDidMount() {
        this.getLanguage();
    }

    getLanguage = () => {
        getMultiLang({
            domainName: 'hrzz',
            moduleId: 'hrzzmb',
            callback: (json) => {
                this.setState({
                    json: json
                }, () => {
                    this.initPage()
                })
            }
        })
    };

    initPage = () => {
        this.editNav();
        this.getUserInfo(userInfo => {
            this.userInfo = userInfo || {};
            this.checkUserInfo()
        })
    };

    getUserInfo = (callback) => {
        /*if (hasHeader) {
            const userInfo = JSON.parse(localStorage.getItem('STOREFORINFODATA') || '{}');
            callback(userInfo);
        } else {*/
        proFetch({
            url: '/nccloud/hr/login/HRLoginVerfiyAction.do',
            noNeedShowError: true,
            loading: false,
            data: {
                operator: "init",
                bcCode: bcCode,
                code: code,
                langCode: langCode,
                dataCenter: dataCenter
            }
        })
            .then((result) => {
                if (result.success) {
                    callback(result.data)
                }
            })
            .catch((err) => {
                this.setState({
                    page: 'error',
                    errMsg: err.error && err.error.message
                })
            })
        //}
    };

    editNav = () => {
        try {
            let cbs = {
                close: () => this.closePage()
            };
            let parameters = {
                leftItems: [
                    {
                        icon: compatibleNavImg(location.origin + '/nccloud/resources/hrzz/public/mobile/static/icon/zuo.png'),
                        callback: 'close'
                    }
                ],
                centerItems: [{
                    title: this.state.json['hrzzmb-000332'],
                }],
                rightItems: []
            };
            let data = {
                'function': 'configNavBar',
                'parameters': parameters
            };
            NativeObj.configNavBar(data, cbs);
            let that = this;
            NativeObj.blockbackbutton('', () => {
                that.closePage()
            });
        } catch (e) {
        }
    };

    closePage = () => {
        NativeObj.closePage();
    };

    getVerifCode = () => {
        const {timer, iconCode, json} = this.state;
        if (timer !== 0) return;
        if (!iconCode) {
            Toast.info(json['hrzzmb-000333'], 3);
            return;
        }
        proFetch({
            url: '/nccloud/hr/login/HRLoginVerfiyAction.do',
            noNeedShowError: true,
            loading: false,
            data: {
                "operator": "send",
                "bcCode": bcCode,
                "code": code,
                "key": this.verifImgTimer,
                dataCenter: dataCenter,
                "type": "mobile",
                "countryCode": "86",
                "mobile": this.userInfo.mobile,
                "vcode": iconCode
            }
        })
            .then((result) => {
                if (result.success) {
                    this.countDown();
                }
            })
            .catch((err) => {
                Toast.fail(err.error && err.error.message, 3);
                this.getVerifImg();
            });
    };

    countDown = () => {
        let timer = 60;
        this.setState({
            timer: (timer--),
            hasSend: true
        }, () => {
            let siv = setInterval(() => {
                this.setState({timer: (timer--)}, () => {
                    if (timer === -1) {
                        clearInterval(siv);
                        this.setState({timer: 0});
                    }
                });
            }, 1000);
        })
    };

    getPage = () => {
        const {page, timer, iconCode, hasSend, verifCode, json, errMsg} = this.state;
        if (!page) return;
        if (page === 'main') {
            return <div>
                <div className="user-info">
                    <div className="custom-info">
                        <div className="user-avatar">
                            <div className="avatar-img"/>
                        </div>
                        <div className="user-name">
                            {this.userInfo.psnname}
                        </div>
                        <div className="user-id">
                            {this.userInfo.psncode}
                        </div>
                    </div>
                    <div className="relate-point"/>
                    <div className="phone-info">
                        <div className="phone-icon">
                            <div className="phone-img"/>
                        </div>
                        <div className="phone-no">
                            {this.userInfo.mobile}
                        </div>
                        <div className="phone-text">
                            {json['hrzzmb-000334']}
                        </div>
                    </div>
                </div>
                <div className="icon-verifi">
                    <div className="icon-code">
                        <InputItem
                            placeholder={json['hrzzmb-000333']}
                            clear
                            onChange={(value) => {
                                this.setState({
                                    iconCode: value
                                })
                            }}
                            value={iconCode}
                        />
                    </div>
                    <div className="icon-img" onClick={() => this.getVerifImg()}>
                        <img ref={node => this.verifImgNode = node} alt={''}/>
                    </div>
                </div>
                <div className="phone-verifi">
                    <InputItem
                        placeholder={json['hrzzmb-000335']}
                        clear
                        extra={
                            <div className='get-code'>
                                {timer === 0 ? json['hrzzmb-000336'] : `${timer}${json['hrzzmb-000337']}`}</div>
                        }
                        onExtraClick={() => this.getVerifCode()}
                        onChange={(value) => {
                            this.setState({
                                verifCode: value
                            })
                        }}
                        value={verifCode}
                    />
                </div>
                {
                    hasSend ?
                        <div className="get-code-msg">
                            {json['hrzzmb-000338']}
                        </div> : null
                }
                <div className="bind-btn">
                    <Button disabled={!verifCode} onClick={() => this.bindNCC()}>
                        {json['hrzzmb-000339']}
                    </Button>
                </div>
            </div>
        } else if (page === 'success') {
            return <div className="result-page">
                <div className="result-img success"/>
                <div className="result-text">
                    {json['hrzzmb-000340']}
                </div>
            </div>
        } else if (page === 'error') {
            return <div className="result-page">
                <div className="result-img error"/>
                <div className="result-text">
                    {errMsg}
                </div>
            </div>
        }
    };

    checkUserInfo = () => {
        if (this.userInfo.bindFlag) {
            this.setState({
                page: 'success'
            })
        } else {
            this.setState({
                page: 'main'
            }, () => {
                this.getVerifImg();
            });
        }
    };

    getVerifImg = () => {
        if (!this.verifImgNode) return;
        this.verifImgTimer = new Date().getTime() + "";
        this.verifImgNode.src = this.userInfo.imgUrl + this.verifImgTimer;
        this.setState({
            iconCode: ''
        })
    };

    bindNCC = () => {
        proFetch({
            url: '/nccloud/hr/login/HRLoginVerfiyAction.do',
            noNeedShowError: true,
            loading: false,
            data: {
                operator: "bind",
                bcCode: bcCode,
                code: code,
                dataCenter: dataCenter,
                type: "mobile",
                countryCode: "86",
                account: this.userInfo.mobile,
                tenantId: this.userInfo.tenantId,
                cuserid: this.userInfo.cuserid,
                activeCode: this.state.verifCode,
                langCode: langCode
            }
        })
            .then((result) => {
                if (result.success) {
                    this.setState({
                        page: 'success'
                    });
                }
            })
            .catch((err) => {
                Toast.fail(err.error && err.error.message, 3);
            });
    };

    render() {
        const {json} = this.state;
        return (
            <div className={'bind-ncc ' + (hasHeader ? 'has-local-header' : '')}>
                <DHeader title={json['hrzzmb-000332']} leftClick={this.closePage}/>
                <div className="info-container">
                    {this.getPage()}
                </div>
            </div>
        )
    }
}

ReactDOM.render(<BindNCC/>, document.getElementById('app'));