import React, {Component} from 'react';
import ReactDOM from "react-dom";
import {Container, CreateMeta} from 'src/hrzz/public/hr-mobile-card';
import './index.less';
import 'src/hrzz/public/mobile/static/style/index.less';
import {DHeader, Avoid, Alert} from 'src/hrzz/public/mobile/components';
import {Button, WhiteSpace, TextareaItem} from 'antd-mobile';
import NativeObj from 'src/hrzz/public/mobile/utils/jsbridge';
import deepCopy from 'src/hrpub/common/utils/deep-copy';
import {compatibleNavImg} from "../../../public/mobile/utils";
import {getMultiLang} from "../../../public/mobile/utils/getMultiLang";
import Empty from "../../../public/mobile/components/Other/Empty";
import proFetch from "../../../public/mobile/utils/project-fetch";
import thirdLog from "../../../login/third-log-method";

let template = null;
const appcode = '606520G0',
    hasHeader = sessionStorage.getItem('showNav') === 'true';

class ContInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 'main',
            detail: null,
            direction: '',
            opinion: '',
            searched: false,
            json: {}
        };
    }

    componentWillMount() {
        window.location.hash = 'c=' + appcode;
    }

    componentDidMount() {
        this.getTemplate();
        this.getLanguage();
        this.getMyOpinion();
        //this.addBackBtn();
    }

    addBackBtn = () => {
        let that = this;
        NativeObj.backbutton('', (data) => {
            if (!data) {
                that.closePage()
            }
        })
    };

    getLanguage = () => {
        getMultiLang({
            domainName: 'hrzz',
            moduleId: 'hrzzmb',
            callback: (json, status, init) => {
                this.setState({
                    json: json
                })
            }
        })
    };

    editNav = (config = {}) => {
        try {
            let cbs = {
                goBack: () => this.backToMain(),
                close: () => this.closePage()
            };
            let parameters = {
                leftItems: !config.isMain ? [
                    {
                        icon: compatibleNavImg(location.origin + '/nccloud/resources/hrzz/public/mobile/static/icon/zuo.png'),
                        callback: 'goBack'
                    }
                ] : [
                    {
                        icon: compatibleNavImg(location.origin + '/nccloud/resources/hrzz/public/mobile/static/icon/zuo.png'),
                        callback: 'close'
                    }
                ],
                centerItems: [{
                    title: config.title,
                }],
                rightItems: []
            };
            let data = {
                'function': 'configNavBar',
                'parameters': parameters
            };
            NativeObj.configNavBar(data, cbs);
            let that = this;
            if (!config.isMain) {
                NativeObj.blockbackbutton('', () => {
                    that.backToMain()
                });
            } else {
                NativeObj.blockbackbutton('', () => {
                    that.closePage()
                });
            }
            /*let that = this;
            if (!config.isMain) {
                NativeObj.backbutton('', (data) => {
                    if (!data) {
                        that.backToMain()
                    }
                })
            } else {
                NativeObj.backbutton('', (data) => {
                    if (!data) {
                        that.closePage()
                    }
                })
            }*/
        } catch (e) {
        }
    };

    closePage = () => {
        NativeObj.closePage();
    };

    /* 获取模板信息 */
    getTemplate = () => {
        proFetch({
            url: '/nccloud/platform/pub/mergerequest.do',
            noNeedShowError: false,
            data: [{
                rqUrl: '/platform/templet/querypage.do',
                rqJson: '{pagecode: "60110313p",appcode: "60110313"}',
                rqCode: 'template'
            }],
            loading: true
        })
            .then((result) => {
                if (result.success) {
                    template = result.data.template;
                    this.setState({});
                }
            })
    };

    getMyOpinion = () => {
        proFetch({
            url: '/nccloud/hrzz/contopinion/EmpContOpinionQryAction.do',
            noNeedShowError: false,
            loading: false,
            data: {}
        })
            .then((result) => {
                if (result.success) {
                    if (result.data && result.data.contopiniongrid) {
                        this.setState({
                            detail: result.data.contopiniongrid,
                            searched: true
                        })
                    } else {
                        this.setState({
                            detail: null,
                            searched: true
                        })
                    }
                }
            })
    };

    getPage = () => {
        const {page, detail, opinion, direction, json, searched} = this.state;
        if (page === 'main') {
            this.editNav({
                title: json['hrzzmb-000121'],
                isMain: true
            });
            if (!template) return;
            let store = CreateMeta(deepCopy(template), {});
            let canEdit = false;
            try {
                canEdit = !detail.rows[0].values['psnopinion'].value
            } catch (e) {

            }
            return detail ? <React.Fragment>
                    <WhiteSpace/>
                    <Container
                        hideHeader={true}
                        isEdit={false}
                        addReferBackAct={true}
                        store={store}
                        cardName={'contopiniongrid'}
                        data={detail}
                        className={canEdit ? 'has-bottom-btn' : ''}
                    />
                    {canEdit ?
                        <div className="bottom-btn-group">
                            <Button className='bottom-btn-refuse'
                                    onClick={() => this.opinionAct('N', detail.rows[0].values['pk_opinion'].value)}
                            >{json['hrzzmb-000126']}</Button>
                            <Button className='bottom-btn-agree'
                                    onClick={() => this.opinionAct('Y', detail.rows[0].values['pk_opinion'].value)}
                            >{json['hrzzmb-000125']}</Button>
                        </div> : null}
                </React.Fragment> :
                searched ? <Empty describe={json['hrzzmb-000135']}/> : null
        } else if (page === 'opinion') {
            this.editNav({
                title: json['hrzzmb-000122']
            });
            return <React.Fragment>
                <WhiteSpace/>
                <TextareaItem
                    placeholder={opinion === "Y" ? json['hrzzmb-000123'] : json['hrzzmb-000124']}
                    rows={5}
                    count={200}
                    value={direction}
                    onChange={this.directionChange}
                />
                <div className="bottom-btn-group">
                    {opinion === "Y" ?
                        <Button className='bottom-btn-agree'
                                onClick={this.confirmOpinion}
                        >{json['hrzzmb-000125']}</Button>
                        : <Button className='bottom-btn-agree'
                                  onClick={this.confirmOpinion}
                        >{json['hrzzmb-000126']}</Button>}
                </div>
            </React.Fragment>
        }
    };

    directionChange = (value) => {
        this.setState({
            direction: value
        })
    };

    opinionAct = (opinion, pk_opinion) => {
        const {page} = this.state;
        this.setState({
            opinion,
            pk_opinion,
            lastPage: page,
            page: 'opinion',
            direction: ''
        })
    };

    confirmOpinion = () => {
        const {opinion, pk_opinion, direction, json} = this.state;
        proFetch({
            url: '/nccloud/hrzz/contopinion/EmpContOpinionAgreeAction.do',
            noNeedShowError: false,
            loading: false,
            data: {
                pk_opinion,
                psnopinion: opinion,
                psndirection: direction
            }
        })
            .then((result) => {
                if (result.success) {
                    Alert({
                        status: 'success',
                        msg: json['hrzzmb-000094'],
                        confirmAct: () => {
                            this.getMyOpinion();
                            this.setState({
                                page: 'main'
                            });
                        }
                    });
                }
            })
    };

    backToMain = () => {
        this.setState({page: 'main'});
    };

    render() {
        const {json, page} = this.state;
        return (
            <div className={hasHeader ? 'has-local-header' : ''}>
                <DHeader title={page === 'main' ? json['hrzzmb-000121'] : json['hrzzmb-000122']}
                         leftClick={this.backToMain}/>
                <div className="info-container">
                    {this.getPage()}
                </div>
            </div>
        )
    }
}

thirdLog(() => {
    ReactDOM.render(<ContInfo/>, document.getElementById('app'));
});