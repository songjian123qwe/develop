import '../../../public/mobile/static/style/index.less'
import './index.less'
import imgUrl from '../../img/quit.png'
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DHeader } from '../../../public/mobile/components/index'
import NativeObj from '../../../public/mobile/utils/jsbridge/index.js'
import { hrRouter, compatibleNavImg } from '../../../public/mobile/utils/index.js'
import { getMultiLang } from '../../../public/mobile/utils/getMultiLang'
import { start } from 'src/hrzz/public/mobile/frame'

import thirdLog from '../../../login/third-log-method';
// 离职模块配置数据
let RouterPage = [
    {
        name: '离职申请',
        nameCode: 'hrzzmb-000030',
        code: 'quitapply',
        color: 'blue',
        icon: 'hr-lizhishenqing',
        url: '/hrzz/dimission-mobile/dimission-application/main/index.html',
    },
    {
        name: '工作交接',
        nameCode: 'hrzzmb-000097',
        code: 'workhandover',
        color: 'orange',
        icon: 'hr-bumengongzuojiaojie',
        url: '/hrzz/quit-mobile/work_handover/main/index.html',
    },
    {
        name: '离职手续办理',
        nameCode: 'hrzzmb-000098',
        code: 'quithandover',
        color: 'green',
        icon: 'hr-lizhijiaojiedan',
        url: '/hrzz/entry-mobile/quit_order/main/index.html',
    },
    {
        name: '工作交接审核',
        nameCode: 'hrzzmb-000099',
        code: 'quitapproval',
        color: 'blue',
        icon: 'hr-gongzuojiaojieshenhe',
        url: '/hrzz/quit-mobile/approval/main/index.html',
    },
    // {
    //     name: '离职问卷调查',
    //     nameCode: 'hrzzmb-000098',
    //     code: 'quitquestionnaire',
    //     color: 'orange',
    //     icon: 'hr-lizhijiaojiedan',
    //     url: '',
    // },
    {
        name: '离职工作接收',
        nameCode: 'hrzzmb-000099',
        code: 'workreception',
        color: 'green',
        icon: 'hr-gongzuojiaojieshenhe',
        url: '/hrzz/quit-mobile/work_reception/main/index.html',
    }
]

class QuitIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            json: {}
        }
        hrRouter.setRoot()
    }
    componentDidMount () {
        console.log('componentDidMount')
        this.getMultiLangFunc()

    }
    getMultiLangFunc = () => {
        getMultiLang({
            domainName: 'hrzz',
            moduleId: 'hrzzmb',
            callback: (json, status, init) => {
                this.setState({
                    json: json,
                }, () => {
                    console.log(this.state.json)
                    this.editNav(this.state.json['hrzzmb-000072'])  /* 国际化处理： 离职*/
                })
            }
        })
    };
    // 修改导航头
    editNav (title) {
        let parameters = {};
        let cbs = {
            closePage: this.closePage
        };
        parameters = {
            leftItems: [
                {
                    callback: 'closePage',
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
            that.closePage()
        });
    }
    // 关闭页面的方法
    closePage () {
        NativeObj.closePage()
    }
    // 打开其他页面的方法
    openPage (data) {
        if (data.code === 'quitquestionnaire') {
            console.log('quitquestionnaire')
            this.openWindow()
        } else {
            hrRouter.push(data.url)
        }
    }
    // 打开新的window
    openWindow () {
        console.log('openWindow')
        NativeObj.getAppCode((data) => {
            console.log('code', data, typeof data);
            let appCode = JSON.parse(data).data.code;
            let url = 'https://ys.diwork.com/approve-app/esn/nptdyo4p/c6a3cd9c3c3541c0a03160ebf7934038?upesntype=urlWithUserCode&usercode=' + appCode
            NativeObj.openWindow(url)
        });
    }
    render () {
        let contentDom = RouterPage.map(item => {
            return (
                <div class="view-list" onClick={this.openPage.bind(this, item)}>
                    <i class={`iconfont hrfont ${item.icon} ${item.color}`}></i>
                    <p class='view-list-title'>{item.name}</p>
                </div>
            )
        })
        return (
            <div class="main" >
                <div class="banner">
                    <DHeader title={this.state.json['hrzzmb-000072']} leftClick={this.closePage.bind(this)} />
                    <img src={imgUrl} alt="" />
                    <div class="bye-text">
                        <p>{this.state.json['hrzzmb-000100']/* 国际化处理： 亲*/}</p>
                        <p>{this.state.json['hrzzmb-000101']/* 国际化处理： 你舍得离开我们的小伙伴吗？*/}</p>
                    </div>
                </div>
                <div class="view-group">
                    {
                        contentDom
                    }
                </div>
            </div>
        )
    }
}

// ReactDOM.render(<QuitIndex />, document.getElementById('app'));

thirdLog(() => {
    start({
        root: document.getElementById('app'),
        component: <QuitIndex />,
    });
});