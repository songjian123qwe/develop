import './index.less'
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import proFetch from '../../../public/mobile/utils/project-fetch';
import {compatibleNavImg, hrRouter} from '../../../public/mobile/utils/index.js'
import {Modal} from 'antd-mobile';
import NativeObj from '../../../public/mobile/utils/jsbridge/index.js'
import {DEmpty, DHeader, Footer, HrNewToast, ListAll, ListBase} from '../../../public/mobile/components/index'
import {getMultiLang} from '../../../public/mobile/utils/getMultiLang'
import thirdLog from "../../../login/third-log-method";

class HandoverApproval extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'list', // 当前页面，list 列表页，detail 详情页
            listData: [], // 获取的所有数据
            listNum: '', // 当前选中的数据
            childList: [], // 选中数据要展示的内容
            date: '', // 工作交接时间
            person: '', // 工作交接人
            pk_org: '',
            billid: '',
            json: {}
        }
        this.leftClickPage2 = this.leftClickPage2.bind(this);
        this.leftClick = this.leftClick.bind(this);
        window.location.hash = '?&c=60652050&p=60652050&ar=0001Z510000000065KV7&id=0'
    }

    componentWillMount() {
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
                    this.getInfo()
                    this.editNav()
                })
            }
        })
    }

    // 修改导航的方法
    editNav() {
        let parameters = {};
        let cbs = {
            backList: this.leftClickPage2,
            closeList: this.leftClick
        };
        let that = this;
        if (this.state.page === 'list') {
            parameters = {
                leftItems: [
                    {
                        callback: 'closeList',
                        icon: compatibleNavImg(location.origin + '/nccloud/resources/hrzz/public/mobile/static/icon/zuo.png')
                    }
                ],
                centerItems: [
                    {
                        title: this.state.json['hrzzmb-000110']/* 国际化处理： 工作交接审核列表*/,
                    }
                ]
            };
            NativeObj.blockbackbutton('', () => {
                that.leftClick()
            });
        } else {
            parameters = {
                leftItems: [
                    {
                        callback: 'backList',
                        icon: compatibleNavImg(location.origin + '/nccloud/resources/hrzz/public/mobile/static/icon/zuo.png')
                    }
                ],
                centerItems: [
                    {
                        title: this.state.json['hrzzmb-000111']/* 国际化处理： 工作交接审核详情*/,
                    }
                ]
            };
            NativeObj.blockbackbutton('', () => {
                that.leftClickPage2()
            });
        }
        let data = {
            'function': 'configNavBar',
            'parameters': parameters
        };
        NativeObj.configNavBar(data, cbs);
    }

    // 返回 左上角的返回键
    leftClick() {
        let url = '/hrzz/quit-mobile/index/main/index.html';
        hrRouter.push(url);
        //hrRouter.go(-1)
    }

    leftClickPage2() {
        console.log("@@leftClickPage2")
        this.setState((prevState, props) => ({
            // listNum:'',
            page: 'list',
            childList: [],
            // date:'',
            // person:'',
        }));
        this.editNav()
    }

    // 获取单据数据
    getInfo() {
        proFetch({
            url: '/nccloud/hrzz/depthandover/DeptHandoverAuditQueryAction.do',
            data: {pk_org: ''},
            loading: false
        }).then((result) => {
            let infoData = result.data.list || [];
            let currentData = [];
            infoData.forEach((item) => {
                item.show = true;
                currentData.push(item)
            });
            this.setState({
                listData: currentData
            })
        })
    }

    // 列表list数组转为dom
    listToDom() {
        let showListNum = 0
        let contentDom = this.state.listData.map((item, index) => {
            if (item.show) {
                showListNum++
                return (
                    <div class="approval-list border-1px-tb" onClick={this.getChild.bind(this, index)}>
                        <span>{item.pk_psnjob}</span>
                        <span class="right">{item.apply_date}</span>
                    </div>
                )
            }
        })
        if (showListNum < 1) {
            return (
                <div className="empty-padding">
                    <DEmpty describe={this.state.json['hrzzmb-000086'] /* 国际化处理： 暂无数据*/}/>
                </div>)
        }
        return contentDom
    }

    // 获取子单单据详情
    getChild(num) {
        let billid = this.state.listData[num].pk_hi_stapply;
        proFetch({
            url: '/nccloud/hrzz/depthandover/DeptHandoverAuditQueryOneAction.do',
            data: {billid: billid, pk_org: ''},
            loading: false
        }).then((result) => {
            console.log(['result', result]);
            let currentData = result.data.list || [];
            // 切换组件，并更新数据
            this.setState((prevState, props) => ({
                listNum: num,
                page: 'detail',
                childList: currentData,
                date: currentData[0] ? currentData[0].handoverdate : '',
                person: currentData[0] ? currentData[0].handoverman : '',
                billid: billid
            }));
            this.editNav()
        })
    }

    // 编译list数组转为dom
    childListToDom() {
        return this.state.childList.map((item, index) => {
            return (
                <div>
                    <ListBase
                        type={''}
                        title={item.item}
                    />
                    <ListBase
                        type={''}
                        title={item.remark}
                    />
                    {/* <ListAll type={'input'} name={this.state.json['hrzzmb-000300']/-* 国际化处理： 交接说明*-/} value={item.handoverdate} disabled={true} /> */}
                    <ListAll type={'input'} name={this.state.json['hrzzmb-000107']/* 国际化处理： 接收人*/}
                             value={item.handoverman} disabled={true}/>
                    <ListAll type={'input'} name={this.state.json['hrzzmb-000108']/* 国际化处理： 交接日期*/}
                             value={item.handoverdate} disabled={true}/>
                    <div style={{'width': '100%', 'height': '10px'}}/>
                </div>
            )
        })
    }

    // 审核通过
    submit() {
        proFetch({
            url: '/nccloud/hrzz/depthandover/DeptHandoverAuditAction.do',
            data: {billid: this.state.billid, pk_org: ''},
            loading: false
        }).then((result) => {
            console.log(['result', result]);
            Modal.alert('', this.state.json['hrzzmb-000112']/* 国际化处理： 操作成功，返回上一页*/, [
                {
                    text: this.state.json['hrzzmb-000003']/* 国际化处理： 确定*/, onPress: () => {
                        let editData = this.state.listData;
                        editData[this.state.listNum].show = false;
                        this.setState((prevState, props) => ({
                            listNum: '',
                            page: 'list',
                            childList: [],
                            date: '',
                            person: '',
                            listData: editData
                        }));
                        this.editNav();
                        this.leftClick();
                    }
                },
            ])
        })
    }

    // 驳回
    reject() {
        proFetch({
            url: '/nccloud/hrzz/depthandover/DeptHandoverAuditRejectAction.do',
            data: {billid: this.state.billid, pk_org: ''},
            loading: false
        }).then((result) => {
            console.log(['result', result]);
            Modal.alert('', this.state.json['hrzzmb-000112']/* 国际化处理： 操作成功，返回上一页*/, [
                {
                    text: this.state.json['hrzzmb-000003']/* 国际化处理： 确定*/, onPress: () => {
                        let editData = this.state.listData;
                        editData[this.state.listNum].show = false;
                        this.setState((prevState, props) => ({
                            listNum: '',
                            page: 'list',
                            childList: [],
                            date: '',
                            person: '',
                            listData: editData
                        }));
                        this.editNav();
                        this.leftClick();
                    }
                },
            ])
        })
    }

    // 根据不同状态，显示不同组件
    renderDom(str) {
        let obj = {
            'list': (<div>
                <DHeader title={this.state.json['hrzzmb-000110']/* 国际化处理： 工作交接审核列表*/}
                         leftClick={this.leftClick.bind(this)}/>
                <div class="handover-listgroup">
                    {this.listToDom()}
                </div>
            </div>),
            'detail': (<div>
                <DHeader title={this.state.json['hrzzmb-000111']/* 国际化处理： 工作交接审核详情*/}
                         leftClick={this.leftClickPage2.bind(this)}/>
                <div class="handover-listgroup">
                    {this.childListToDom('delete')}
                </div>
                <Footer buttons={[{
                    type: 'brand',
                    title: this.state.json['hrzzmb-000113']/* 国际化处理： 审核*/,
                    onClick: () => {
                        this.submit()
                    }
                }, {
                    type: 'brand',
                    title: this.state.json['hrzzmb-000114']/* 国际化处理： 驳回*/,
                    onClick: () => {
                        this.reject()
                    }
                }]}/>
            </div>)
        }
        return obj[str]
    }

    render() {
        return (
            <div class="main">
                {
                    this.renderDom(this.state.page)
                }
            </div>
        )
    }
}

thirdLog(() => {
    ReactDOM.render(<HandoverApproval/>, document.getElementById('app'));
});
// ReactDOM.render(<HandoverApproval />, document.getElementById('app'));
// export default HandoverApproval