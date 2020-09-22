import React, {Component} from 'react';
import ReactDOM from "react-dom";
import {Container, CreateMeta} from 'src/hrzz/public/hr-mobile-card';
import './index.less';
import 'src/hrzz/public/mobile/static/style/index.less';
import proFetch from "../../../public/mobile/utils/project-fetch";
import {DHeader, Avoid, Alert} from 'src/hrzz/public/mobile/components';
import {Button, WhiteSpace, Tabs, TextareaItem} from 'antd-mobile';
import NativeObj from 'src/hrzz/public/mobile/utils/jsbridge';
import deepCopy from 'src/hrpub/common/utils/deep-copy';
import {compatibleNavImg} from "../../../public/mobile/utils";
import {getMultiLang} from "../../../public/mobile/utils/getMultiLang";
import Backlog from '../components/backlog';
import History from '../components/history';
import thirdLog from "../../../login/third-log-method";

let template = null;
const appcode = '606520F0',
    hasHeader = sessionStorage.getItem('showNav') === 'true';

class ContInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lastPage: '',
            page: 'main',
            tabKey: '0',
            detail: null,
            direction: '',
            opinion: '',
            json: {}
        };
    }

    componentWillMount() {
        window.location.hash = 'c=' + appcode;
    }

    componentDidMount() {
        this.getTemplate();
        this.getLanguage();
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
            /*if (!config.isMain) {
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

    /* 获取部门信息-管理部门查询接口 */
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
        }).then((result) => {
            if (result.success) {
                template = result.data.template;
                this.setState({});
            }
        })
    };

    checkDetail = (pk_opinion) => {
        proFetch({
            url: '/nccloud/hrzz/contopinion/ManContOpinionDetailAction.do',
            noNeedShowError: false,
            loading: false,
            data: {pk_opinion}
        }).then((result) => {
            if (result.success) {
                this.setState({
                    detail: result.data.contopiniongrid,
                    page: 'detail'
                })
            }
        })
    };

    getPage = () => {
        const {page, detail, opinion, direction, json} = this.state;
        if (page === 'main') {
            this.editNav({
                title: json['hrzzmb-000121'],
                isMain: true
            });
        } else if (page === 'opinion') {
            this.editNav({
                title: json['hrzzmb-000122']
            });
            return <div className={hasHeader ? 'has-local-header' : ''}>
                <DHeader title={json['hrzzmb-000122']}
                         leftClick={this.backToMain}/>
                <div className="info-container">
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
                </div>
            </div>
        } else {
            if (!template) return;
            this.editNav({
                title: json['hrzzmb-000127']
            });
            let store = CreateMeta(deepCopy(template), {});
            let canEdit = false;
            try {
                canEdit = !detail.rows[0].values['deptopinion'].value
            } catch (e) {

            }
            return <div className={hasHeader ? 'has-local-header' : ''}>
                <DHeader title={json['hrzzmb-000127']}
                         leftClick={this.backToMain}/>
                <div className="info-container">
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
                </div>
            </div>
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
            url: '/nccloud/hrzz/contopinion/ManContOpinionApproveAction.do',
            noNeedShowError: false,
            loading: false,
            data: {
                pk_opinion,
                deptopinion: opinion,
                deptdirection: direction
            }
        })
            .then((result) => {
                if (result.success) {
                    Alert({
                        status: 'success',
                        msg: json['hrzzmb-000094'],
                        confirmAct: () => {
                            this.historyNode.reset();
                            this.backlogNode.getBacklog();
                            this.setState({
                                page: 'main'
                            });
                        }
                    });
                }
            })
            .catch((err) => {
                Alert({
                    status: 'error',
                    msg: err.data && err.data.error && err.data.error.message
                });
            })
    };

    backToMain = () => {
        const {lastPage, page} = this.state;
        this.setState({page: page === 'opinion' ? lastPage : 'main'});
    };

    render() {
        const {page, tabKey, json} = this.state;
        const tabs = [
            {title: json['hrzzmb-000128'], key: '1'},
            {title: json['hrzzmb-000129'], key: '2'}
        ];
        return (
            <div>
                <div className={'mng-opinion ' + (hasHeader ? 'has-local-header' : '')}
                     style={{display: page === 'main' ? '' : 'none'}}
                >
                    <DHeader title={json['hrzzmb-000121']} leftClick={this.closePage}/>
                    <div className="info-container">
                        <Tabs tabs={tabs}
                              page={tabKey}
                              swipeable={false}
                              onTabClick={tab => {
                                  this.setState({
                                      tabKey: tab.key
                                  })
                              }}
                              tabBarUnderlineStyle={{
                                  borderColor: '#E14C46'
                              }}
                              tabBarActiveTextColor={'#E14C46'}
                              tabBarInactiveTextColor={'#888888'}
                        >
                            <Backlog
                                key={'1'}
                                onItemClick={this.checkDetail}
                                onAction={this.opinionAct}
                                ref={node => this.backlogNode = node}
                                json={json}
                            />
                            <History
                                key={'2'}
                                tabKey={tabKey}
                                onItemClick={this.checkDetail}
                                ref={node => this.historyNode = node}
                                json={json}
                            />
                        </Tabs>
                    </div>
                </div>
                {this.getPage()}
            </div>
        )
    }
}

thirdLog(() => {
    ReactDOM.render(<ContInfo/>, document.getElementById('app'));
});