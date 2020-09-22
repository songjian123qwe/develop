import 'antd-mobile/dist/antd-mobile.css';
import './index.less'
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import proFetch from '../../../public/mobile/utils/project-fetch';
import {compatibleNavImg, formatTime, hrRouter} from '../../../public/mobile/utils/index.js'
import NativeObj from '../../../public/mobile/utils/jsbridge/index.js'
import {Modal} from 'antd-mobile';
import {
    DEmpty,
    DHeader,
    DTextarea,
    Footer,
    HrNewToast,
    ListAll,
    ListBase,
} from '../../../public/mobile/components/index'
import {getMultiLang} from '../../../public/mobile/utils/getMultiLang'
import thirdLog from "../../../login/third-log-method";
// if (new RegExp(/localhost:3006/g).test(window.location.href)) {
// sessionStorage.setItem('showNav', 'true');
//   }
class WorkReception extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'browse',//3  browse 没有编辑权,4 detail 详情 edit 编辑
            textarea: [''], // 子单展示文本
            listNum: -1, // 子单在数组里的排序，-1位新增
            listData: [], // 子单列表
            handoverman: '', // 交接人
            handoverdate: new Date(), // 申请日期
            billid: '',
            json: {},
            workReceptionFlag: 'ok',
            childList: [],
        }
        this.leftClickPage2 = this.leftClickPage2.bind(this);
        this.leftClick = this.leftClick.bind(this);
        this.saveList = this.saveList.bind(this)
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
                    this.getInfo()
                    // this.editNav()
                })
            }
        })
    }

    // approvalFlag
    approvalFlagFun() {
        let listData = this.state.listData || []
        let __workReception = localStorage.__workReception || ''
        let localWorkReception = __workReception ? JSON.parse(__workReception) : []
        let workReceptionFlag = localStorage.__workReceptionFlag

        let num = 0
        listData.forEach(ele => {
            let index = localWorkReception.findIndex((item) => {
                return ele.pk_depthandover === item.pk_depthandover
            })
            if (index < 0) {
                num++
            }
        });
        if (listData.length === 0) {
            workReceptionFlag = 'ok'
        } else if (num > 0) {
            workReceptionFlag = false
        } else if (workReceptionFlag != 'ok') {
            workReceptionFlag = false
        } else {
            workReceptionFlag = 'ok'
        }
        this.setState({
            workReceptionFlag
        })
    }

    // 修改导航的方法
    editNav() {
        let parameters = {};
        let cbs = {
            goBack3: this.leftClickPage2,
            goBack4: this.leftClick
        };
        let that = this;
        if (this.state.page === 'detail') {
            parameters = {
                leftItems: [
                    {
                        callback: 'goBack3',
                        icon: compatibleNavImg(location.origin + '/nccloud/resources/hrzz/public/mobile/static/icon/zuo.png')
                    }
                ],
                centerItems: [
                    {
                        title: this.state.json['hrzzmb-000102'], /* 国际化处理： 部门工作交接详情*/
                    }
                ]
            };
            NativeObj.blockbackbutton('', () => {
                that.leftClickPage2()
            });
        } else {
            parameters = {
                leftItems: [
                    {
                        callback: 'goBack4',
                        icon: compatibleNavImg(location.origin + '/nccloud/resources/hrzz/public/mobile/static/icon/zuo.png')
                    }
                ],
                centerItems: [
                    {
                        title: '离职工作接收'
                    }
                ]
            };
            NativeObj.blockbackbutton('', () => {
                that.leftClick()
            });
        }
        let data = {
            'function': 'configNavBar',
            'parameters': parameters
        };
        NativeObj.configNavBar(data, cbs)
    }

    // 返回 左上角的返回键
    leftClick() {
        console.log("leftClick")
        let url = '/hrzz/quit-mobile/index/main/index.html';
        hrRouter.push(url);
        //hrRouter.go(-1)
        // window.history.go(-1)
    }

    leftClickPage2() {
        console.log("leftClickPage2")
        this.setState({
            listNum: '',
            page: 'browse',
        }, () => {
            this.editNav()
        })
    }

    // 获取单据状态
    getInfo = () => {
        proFetch({
            url: '/nccloud/hrzz/depthandover/DeptHandoverAcceptQueryAction.do',
            data: {},
            loading: false
        }).then((result) => {
            console.log(['result', result]);
            if (result.success) {
                let resData = result.data || {};
                this.setState({
                    page: 'browse',
                    listData: resData.list || []
                }, () => {
                    this.editNav();
                    this.approvalFlagFun()
                })
            } else {
                this.editNav()
            }
        }).catch((err) => {
            this.editNav()
        })
    };

    // 格式化默认受理时间
    defaultDate(val) {
        if (!val) {
            return new Date()
        } else {
            return new Date(val)
        }
    }

    // 打开编辑页面
    openDetail(num) { // num 表示数组的下标，-1为新增
        console.log(num);
        let billid = this.state.listData[num].pk_hi_stapply;
        let textarea = this.state.listData[num].item || '';
        let handoverman = this.state.listData[num].handoverman || '';
        let handoverdate = this.state.listData[num].handoverdate || '';
        // 切换组件，并更新数据
        proFetch({
            url: '/nccloud/hrzz/depthandover/DeptHandoverAcceptQueryOneAction.do',
            data: {billid: billid, pk_org: ''},
            loading: false
        }).then((result) => {
            console.log(['result', result]);
            let currentData = result.data.list || [];
            // 切换组件，并更新数据
            this.setState({
                listNum: num,
                childList: currentData,
                // handoverman: handoverman,
                // handoverdate: handoverdate,
                page: 'detail',
                billid: billid
            }, () => {
                this.editNav()
            })
        })
    }

    // 接收数据
    saveList(data) {
        let that = this
        if (!this.state.textarea && this.state.textarea.length !== 0) {
            HrNewToast.info(this.state.json['hrzzmb-000229']/* 国际化处理： 请填写内容*/, 2, () => {
                console.log("请填写备注")
            }, true);
        } else {
            let commitList = []
            let textArr = this.state.textarea;
            let oriList = this.state.childList;
            oriList.map((item, index) => {
                let prams = {
                    remark: textArr[index],
                    handoverdate: item.handoverdate,
                    pk_depthandover: item.pk_depthandover
                }
                commitList.push(prams)
            })
            //    console.log(commitList)
            proFetch({
                url: '/nccloud/hrzz/depthandover/DeptHandoverAcceptAction.do',
                data: {billid: this.state.billid, formData: commitList, pk_org: ''},
                loading: false
            }).then((result) => {
                console.log(['result', result])
                Modal.alert('', this.state.json['hrzzmb-000112']/* 国际化处理： 操作成功，返回上一页*/, [
                    {
                        text: this.state.json['hrzzmb-000003']/* 国际化处理： 确定*/, onPress: () => {
                            let editData = this.state.listData
                            editData[this.state.listNum].show = false
                            this.setState((prevState, props) => ({
                                listNum: '',
                                page: 'list',
                                childList: [],
                                handoverdate: '',
                                handoverman: '',
                                listData: editData
                            }));
                            this.editNav()
                            this.leftClick()
                        }
                    },
                ])
            })
            console.log('我接收了')
        }
    }

    // 编译list数组转为dom
    listToDom(type) {
        console.log(this.state.listData)
        let showListNum = 0
        let contentDom = this.state.listData.map((item, index) => {
            showListNum++
            return (
                // <div>
                <div class="approval-list border-1px-tb" onClick={this.openDetail.bind(this, index)}>
                    <span>{item.pk_psnjob}</span>
                    <span class="right">{item.apply_date}</span>
                </div>
                // {/* <div style={{ 'width': '100%', 'height': '10px' }}></div> */}
                // </div>
            )
        })
        if (showListNum < 1) {
            return (
                <div className="empty-padding">
                    <DEmpty describe={this.state.json['hrzzmb-000086'] /* 国际化处理： 暂无数据*/}/>
                </div>)
        }
        return contentDom
    }

    // 多行文本框组件的回调
    editTextarea(index, data) {
        console.log("findIndex", index)
        console.log("findData", data)
        let oriTextArr = this.state.textarea;
        oriTextArr[index] = data
        this.setState((prevState, props) => ({
            textarea: oriTextArr
        }));
    }

    onOk(type, index, data) {
        if (type === 'date') {
            let childChangeList = this.state.childList
            childChangeList[index].handoverdate = formatTime(data, 'yyyy-MM-dd')
            this.setState(() => ({
                childList: childChangeList,//formatTime(data,'yyyy-MM-dd')
            }))
        }
    }

    childListToDom() {
        return this.state.childList.map((item, index) => {
            let str = item.handoverdate.replace(/-/g, '/');
            let currentDate = new Date(str);
            return (
                <div>
                    <ListBase
                        type={''}
                        title={item.item}
                    />
                    <div class="handover-listgroup">
                        <div style={{'padding': '.24rem', 'background': '#ffffff'}}><DTextarea
                            value={this.state.textarea[index]} placeholder={'交接说明'} maxNum={60}
                            textChange={this.editTextarea.bind(this, index)}/></div>
                    </div>
                    {/* <ListAll type={'input'} name={this.state.json['hrzzmb-000107']/-* 国际化处理： 接收人*-/} value={item.handoverman} disabled={true} /> */}
                    <ListAll type={'date'} name={this.state.json['hrzzmb-000108']/* 国际化处理： 交接日期*/} value={currentDate}
                             disabled={false} onOk={this.onOk.bind(this, 'date', index)}/>
                    <div style={{'width': '100%', 'height': '10px'}}/>
                </div>
            )
        })
    }

    // 根据不同状态，显示不同组件
    renderDom(str = 'browse') {
        let obj = {
            'browse': (<div>
                <DHeader title="部门工作接收" leftClick={this.leftClick.bind(this)}/>
                <div class="handover-listgroup">
                    {this.listToDom('')}
                </div>
                {/* <Footer buttons={[{
                    type: this.state.workReceptionFlag === 'ok' ? 'info' : 'brand',
                    title: '接收',
                    onClick: () => { this.saveList() }
                }]} /> */}
            </div>),
            'detail': (<div>
                <DHeader title="部门工作接收详情" leftClick={this.leftClickPage2.bind(this)}/>
                <div class="handover-listgroup">
                    {this.childListToDom('delete')}
                </div>
                <Footer buttons={[{
                    type: this.state.workReceptionFlag === 'ok' ? 'info' : 'brand',
                    title: '接收',
                    onClick: () => {
                        this.saveList()
                    }
                }]}/>
            </div>),
            // 'edit': (<div>
            //     <DHeader title={this.state.json['hrzzmb-000102']/* 国际化处理： 部门工作交接详情*/} leftClick={this.leftClickPage2.bind(this)} />
            //     <div class="handover-listgroup">
            //         <div style={{ 'padding': '.24rem', 'background': '#ffffff' }}>
            //             <div>{this.state.textarea}</div>
            //         </div>
            //     </div>
            //     <ListAll type={'input'} name='交接人' disabled={true} value={this.state.handoverman} />
            //     <ListAll type={'input'} name='申请日期' disabled={true} value={this.state.handoverdate} />
            // </div>)
        }
        return (obj[str])
    }

    render() {

        return (
            <div class="main">
                {this.renderDom(this.state.page)}
            </div>
        )
    }
}

thirdLog(() => {
    ReactDOM.render(<WorkReception/>, document.getElementById('app'));
});
// ReactDOM.render(<WorkReception />, document.getElementById('app'));
// export default WorkReception