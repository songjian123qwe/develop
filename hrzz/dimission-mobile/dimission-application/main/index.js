import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import {Container, CreateMeta} from '../../../public/hr-mobile-card/index';
import {initAction} from "../function/initAction";
import {COMMON} from "../util/util";
import FileComponent from "../components/file";
import NativeObj from '../../../public/mobile/utils/jsbridge/index.js';
import {hrRouter} from '../../../public/mobile/utils/index.js';
import Modal from "antd-mobile/lib/modal";
import PropTypes from "prop-types";
import resData from "./mock.json";
import {getMultiLang} from "../../../public/mobile/utils/getMultiLang";
import DFooter from "../../../public/mobile/components/Layout/Footer";
import AppointComponent from "../components/appoint";
import {getFile} from "../function/getfile";
import {compatibleNavImg} from "../../../public/mobile/utils/index";
import {debounce} from "../../../public/mobile/utils/utils";
import thirdLog from "../../../login/third-log-method";

if (new RegExp(/localhost:3006/g).test(window.location.href)) {
    sessionStorage.setItem('showNav', 'true');
}

class DimissionApplication extends Component {
    static childContextTypes = {
        referAfterAct: PropTypes.func
    };

    getChildContext() {
        return {
            referAfterAct: this.resetHeader
        };
    }

    resetHeader = () => {
        this.editNav();
    };

    constructor(props) {
        super(props);
        this.state = {
            json: {},
            store: null,
            formData: null,
            billid: null,
            peopleListData: {},
            fileArr: []// file上传
        };
    }

    componentWillMount() {

    }

    componentDidMount() {
        window.location.hash = `?&c=${COMMON.config.appcode}`;
        this.getLanguage();
    }

    getLanguage = () => {
        getMultiLang({
            domainName: 'hrzz',
            moduleId: 'hrzzmb',
            callback: (json, status, init) => {
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
        // this.setData(resData);
        initAction().then(this.setData).catch(err => {
            let message = err.data.error.message;
            Modal.alert(this.state.json['hrzzmb-000029'], message, [{
                text: this.state.json['hrzzmb-000003'],
                onPress: this.leftClick
            }]);
        })
    };

    // 返回 左上角的返回键
    leftClick = () => {
        this.updateState({
            billid: null,
            peopleListData: {}
        });
        //hrRouter.go(-1)
        let url = '/hrzz/quit-mobile/index/main/index.html';
        hrRouter.push(url);
    };

    editNav = (leftClick = null, title = null) => {
        let cbs = {
            goBack2: leftClick || this.leftClick
        };

        let parameters = {
            leftItems: [
                {
                    callback: 'goBack2',
                    icon: compatibleNavImg(window.location.origin + '/nccloud/resources/hrzz/public/mobile/static/icon/zuo.png')
                }
            ],
            centerItems: [
                {
                    title: title || this.state.json['hrzzmb-000030'],//离职申请
                }
            ],
            rightItems: []
        };
        let data = {
            'function': 'configNavBar',
            'parameters': parameters
        };
        NativeObj.configNavBar(data, cbs);
        let that = this;
        NativeObj.blockbackbutton('', () => {
            that.leftClick()
        });
    };

    setData = (res) => {
        if ((!res.success) || (!res.data)) return;
        let meta = res.data.temp.areas;
        meta[COMMON.formId].items.map(item => {
            // 添加email 字段用于 检测email值是否合法
            if (item.code === 'pk_psnjob.pk_psndoc.email') {
                item.inputType = 'email';
            }
            // 给离职类型添加条件
            if (item.code === 'pk_trnstype') {
                item.queryCondition = {
                    "GridRefActionExt": "nccloud.web.hrzz.dimissionapply.action.DimissionTransTypeRefSqlBuilder"
                };
            }
        });
        // 模拟动态获取模板与数据
        let getMeta = CreateMeta(meta, {
            onAfterHandle: this.onAfterHandle,
            panelClick: this.panelClick,
            iconClick: this.iconClick
        });
        let formData = res.data.formData[COMMON.formId];
        if (formData && formData.rows && formData.rows[0].values) {
            let pk_hi_stapply = formData.rows[0].values.pk_hi_stapply.value;
            getFile(pk_hi_stapply).then(res => {
                if (!res.success || !res.data) return;
                if (!Array.isArray(res.data)) return;
                this.updateState({
                    fileArr: res.data
                })
            })
        }
        this.updateState({
            store: getMeta,
            formData
        });
    };

    commit = () => {
        if (!debounce()) return;
        this.file.commit();
    };

    onAfterHandle = () => {

    };

    panelClick = () => {

    };

    iconClick = () => {

    };

    updateState = (obj, callback = () => {
    }) => {
        this.setState({
            ...obj
        }, () => {
            callback();
        })
    };

    render() {
        let {store, formData, billid, peopleListData, fileArr} = this.state;
        return (
            <div className={'dimission-application'}>
                {billid ? <div className={'warp'}>
                    <AppointComponent
                        json={this.state.json}
                        updateState={this.updateState}
                        leftClick={this.leftClick}
                        editNav={this.editNav}
                        initPage={this.initPage}
                        peopleListData={peopleListData}
                        billid={billid}
                    />
                </div> : <div className={'warp'}>
                    <Container
                        store={store}
                        cardName={COMMON.formId}
                        data={formData}
                        hideHeader={true}
                        isEdit={true}
                        addReferBackAct={true}
                    />
                    <FileComponent
                        json={this.state.json}
                        updateState={this.updateState}
                        leftClick={this.leftClick}
                        store={store}
                        fileArr={fileArr}
                        ref={node => {
                            this.file = node
                        }}
                    />
                    <DFooter
                        buttons={[
                            {
                                type: 'brand',
                                title: this.state.json["hrzzmb-000023"],//'提交',
                                onClick: () => {
                                    this.commit()
                                }
                            }
                        ]}
                    />
                </div>}
            </div>
        )
    }
}

thirdLog(() => {
    ReactDOM.render(<DimissionApplication/>, document.getElementById('app'));
});
