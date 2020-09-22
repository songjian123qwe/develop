import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import proFetch from '../../../public/mobile/utils/project-fetch';
import NativeObj from '../../../public/mobile/utils/jsbridge/index.js'
import {hrRouter, compatibleNavImg, getAppPageConfig} from '../../../public/mobile/utils/index.js'
import {getMultiLang} from '../../../public/mobile/utils/getMultiLang'
import thirdLog from "../../../login/third-log-method";
import {Toast, Modal} from 'antd-mobile';
import './index.less'


class EnterpriseProOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibile: false, //提示弹框
            fontList: ['hrfont hr-lizhiicon_a', 'hrfont hr-lizhiicon_b', 'hrfont hr-lizhiicon_c', 'hrfont hr-lizhiicon_d', 'hrfont hr-lizhiicon_e', 'hrfont hr-Rectangle', 'hrfont hr-Information'],
            fontData: [
                // {name:'你们'},
                // {name:'你们'},
                // {name:'你们'},
                // {name:'你们'},
                // {name:'你们'},
                // {name:'你们'},
                // {name:'你们'},
                // {name:'你们'},
                // {name:'你们'}
            ], //大类列表信息
            num: 0, //点击高亮index
            textErr: '', //提示消息
            billid: '',
            json: {},
            finish: '0',
            config: getAppPageConfig(),
            iconArr: [],
            itemData: [] //分类细项

        }
    }

    componentDidMount() {
        window.location.hash = '?&c=60652050&p=60652050&ar=0001Z510000000065KV7&id=0'
        this.getMultiLangFunc()

    }

    leftClick() {
        //hrRouter.go(-1)
        let url = '/hrzz/quit-mobile/index/main/index.html';
        hrRouter.push(url);
    }

    getMultiLangFunc = () => {
        getMultiLang({
            domainName: 'hrzz',
            moduleId: 'hrzzmb',
            callback: (json, status, init) => {
                this.setState({
                    json: json
                }, () => {
                    this.editNav(this.state.json['hrzzmb-000011'])
                    this.infoData()
                    // 离职办理
                })
            }
        })
    };

    editNav(title) {
        let parameters = {};
        let cbs = {
            goBack: this.leftClick
        };
        parameters = {
            leftItems: [
                {
                    callback: 'goBack',
                    icon: compatibleNavImg(location.origin + '/nccloud/resources/hrzz/public/mobile/static/icon/zuo.png')
                }
            ],
            centerItems: [
                {
                    title: title,
                }
            ]
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
    }

    infoData = () => {
        proFetch({
            url: '/nccloud/hrzz/handover/HandoverDefDocQueryAction.do',
            info: {
                appcode: this.state.config.appcode
            },
            noNeedShowError: true,
            loading: false
        }).then((res) => {
            if (res.success) {
                if (res.data.auth === true) {
                    this.setState({
                        fontData: res.data.list,
                        finish: res.data.finish,
                        billid: res.data.billid
                    }, () => {
                        this.checkFontIcon()
                    });
                    this.change(0, res.data.list[0].pk_defdoc)()
                } else {
                    Modal.alert(this.state.json['hrzzmb-000002'], res.data.authMsg, [
                        {text: this.state.json['hrzzmb-000003'], onPress: () => this.leftClick()},
                    ])
                }
            }
        }).catch((err) => {
            Modal.alert(this.state.json['hrzzmb-000002'], err.message || err.data.message || err.data.error.message, [
                {text: this.state.json['hrzzmb-000003'], onPress: () => this.leftClick()},
            ]);
        });
    };

    // 为数据添加动画标识以及私有类名
    dataAnima = () => {
        this.state.itemData.forEach((item) => {
            item.detailClassFlag = false
            item.detailClass = 'fr detail'
            item.card = 'card'
        })
        this.setState(this.state)
    }


    checkFontIcon = () => {
        let arr = []
        for (let i = 0; i < this.state.fontData.length; i++) {
            if (i < 5) {
                arr.push(this.state.fontList[i])
            } else {
                arr.push(this.state.fontList[Math.floor(Math.random() * (7 - 1) + 1)])
            }
        }
        this.setState({
            iconArr: arr
        })
    }
    // 点击事件
    change = (idx, id) => {
        return () => {
            this.setState({
                num: idx
            });
            proFetch({
                url: '/nccloud/hrzz/handover/HandoverItemQueryAction.do',
                data: {
                    billid: this.state.billid,
                    pk_defdoc: id
                },
                info: {
                    appcode: this.state.config.appcode
                }
            }).then((res) => {
                if (res.success === true) {
                    if (res.data && res.data.list) {
                        this.setState({
                            itemData: res.data.list
                        }, () => {
                            this.dataAnima()
                        })
                    } else {
                        this.setState({
                            itemData: []
                        })
                    }

                }
            })
        }
    };

    detailChange = (idx) => {
        return () => {
            if (this.state.itemData[idx].detailClassFlag === false) {
                this.state.itemData[idx].detailClass = 'fr detail zhuan'
                this.state.itemData[idx].card = 'card height1'

            } else {
                this.state.itemData[idx].detailClass = 'fr detail zhuanhui'
                this.state.itemData[idx].card = 'card'
            }
            this.state.itemData[idx].detailClassFlag = !this.state.itemData[idx].detailClassFlag
            this.setState(this.state)
        }
    }

    // // 图标列表
    fontList() {

        let fontList = this.state.fontData.map((item, idx) => {
            return (
                <span className={this.state.num === idx ? 'click' : ''} onClick={this.change(idx, item.pk_defdoc)}>
                    <i className={this.state.iconArr[idx]}></i>
                    <p>{item.name}</p>
                </span>
            )
        })

        return (
            <div className="fontListBox" style={{display: this.state.fontData.length > 0 ? '' : 'none'}}>
                <div className={this.state.fontData.length > 5 ? 'fontListX' : 'fontList'} style={{
                    width: this.state.fontData.length > 5 ? `${1.5 * this.state.fontData.length}rem` : 'auto'
                }}>
                    {fontList}
                </div>
            </div>
        )

    }

    // 卡片详情
    cardList() {
        let cardList = this.state.itemData.map((item, idx) => {
            return (
                <div className={item.card}>
                    <p className="title clearfix">
                        <span className="circular"><i></i></span>
                        <span className="fl name">{item.itemname}</span>
                        <span className={item.detailClass}
                              onClick={this.detailChange(idx)}>{this.state.json['hrzzmb-000004']}<i
                            className="hrfont hr-right"></i></span>
                        <span
                            className="fr comp">{item.ischeck === true ? this.state.json['hrzzmb-000005'] : this.state.json['hrzzmb-000006']}</span>
                    </p>
                    <div className="content">
                        <p>{this.state.json['hrzzmb-000007']}：{item.linkman}</p>
                        <p>{this.state.json['hrzzmb-000008']}：{item.remark}</p>
                        <p>{this.state.json['hrzzmb-000009']}：{item.itemtype}</p>
                    </div>
                </div>
            )
        })

        return (
            cardList
        )


    }

    render() {
        return (
            <div className="main-quit">
                <div className="process">
                    {/* 离职流程进度 */}
                    <span className="fl">{this.state.json['hrzzmb-000012']}</span>
                    <div className="progress fl">
                        <div style={{width: `${(this.state.finish / 100) * 3}rem`}} className="progress-bar"></div>
                    </div>
                    <span className="fl">{this.state.finish || 0.00}%</span>
                </div>
                {[this.fontList(), this.cardList()]}
            </div>
        )
    }
}

thirdLog(() => {
    ReactDOM.render(<EnterpriseProOrder/>, document.getElementById('app'));
})
