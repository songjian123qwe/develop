import 'antd-mobile/dist/antd-mobile.css';
import './index.less'
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ajax from '../../../public/mobile/utils/ajax'
import {compatibleNavImg, formatTime, hrRouter} from '../../../public/mobile/utils/index.js'
import NativeObj from '../../../public/mobile/utils/jsbridge/index.js'
import {List, Modal, SearchBar} from 'antd-mobile';
// 第一个按钮组件
import FirstGroup from '../../components/firstgroup'
import {
    AddButton,
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
import proFetch from '../../../public/mobile/utils/project-fetch';

let timer = 0;

class WorkHandover extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'first',//'none', // 0 none 没有权限，1 first 有权限没有单子，2 editable 有权限有单子，3  browse 没有编辑权,4 edit 编辑或新增 
            textarea: '', // 子单展示文本
            listNum: -1, // 子单在数组里的排序，-1位新增
            listData: [], // 子单列表
            handoverman: '', // 接收人
            handoverdate: new Date(), // 受理日期
            pk_psndoc: '', // 接收人的id
            modalText: '', // 提示弹窗显示的内容
            billid: '',
            json: {},
            coverFlag: false, // 是否显示遮罩
            referList: [],
            oriContent: [{}],//提交时候传输的模板
        };
        this.leftClickPage2 = this.leftClickPage2.bind(this);
        this.leftClick = this.leftClick.bind(this);
        this.saveList = this.saveList.bind(this);
        this.listClickFun = this.listClickFun.bind(this);
        this.searchFun = this.searchFun.bind(this);
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
    };

    // 修改导航的方法
    editNav() {
        let parameters = {};
        let cbs = {
            goBack1: this.leftClickPage2,
            goBack2: this.leftClick,
            closeRef: this.closeRef,
        };
        let that = this;
        if (this.state.coverFlag) {
            parameters = {
                leftItems: [
                    {
                        callback: 'closeRef',
                        icon: compatibleNavImg(location.origin + '/nccloud/resources/hrzz/public/mobile/static/icon/zuo.png')
                    }
                ],
                centerItems: [
                    {
                        title: this.state.json['hrzzmb-000107'], /* 国际化处理： 部门工作交接详情*/
                    }
                ]
            };
            NativeObj.blockbackbutton('', () => {
                that.closeRef()
            });
        } else {
            if (this.state.page === 'edit') {
                parameters = {
                    leftItems: [
                        {
                            callback: 'goBack1',
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
                            callback: 'goBack2',
                            icon: compatibleNavImg(location.origin + '/nccloud/resources/hrzz/public/mobile/static/icon/zuo.png')
                        }
                    ],
                    centerItems: [
                        {
                            title: this.state.json['hrzzmb-000097'], /* 国际化处理： 部门工作交接*/
                        }
                    ]
                };
                NativeObj.blockbackbutton('', () => {
                    that.leftClick()
                });
            }
        }
        let data = {
            'function': 'configNavBar',
            'parameters': parameters
        };
        NativeObj.configNavBar(data, cbs);
    }

    // 返回 左上角的返回键
    leftClick() {
        console.log("leftClick");
        let url = '/hrzz/quit-mobile/index/main/index.html';
        hrRouter.push(url);
        //hrRouter.go(-1)
    }

    leftClickPage2() {
        console.log("leftClickPage2");
        this.setState({
            listNum: '',
            page: 'editable',
        }, () => {
            this.editNav()
        })
    }

    closeRef = () => {
        this.setState({
            coverFlag: false
        }, () => {
            this.editNav();
        })
    };

    // 获取单据状态
    getInfo() {
        proFetch({
            url: '/nccloud/hrzz/depthandover/DeptHandoverQueryAction.do',
            data: {pk_org: ''},
            loading: false
        })
            .then((result) => {
                console.log(['result', result]);
                let infoData = result.data;
                let isEditable = infoData.isEditable;
                if (!infoData.auth) {
                    // 没有交接权限
                    this.setState({
                        page: 'none',
                    }, () => {
                        this.editNav()
                    });
                    Modal.alert('', infoData.authMsg, [
                        {text: this.state.json['hrzzmb-000103']/* 国际化处理：返回*/, onPress: () => this.leftClick()},
                    ])
                } else {
                    let currentData = [];
                    let length = 0;
                    let infoDataList = infoData.list || [];
                    infoDataList.forEach((item) => {
                        length++;
                        item.isEditable = isEditable;
                        currentData.push(Object.assign(item, {
                            handoverdate: new Date(item.handoverdate),
                            pk_psndoc: item.handoverman_id
                        }))
                    });
                    this.setState({
                        page: isEditable ? (length > 0 ? 'editable' : 'first') : 'browse',
                        listData: currentData,
                        handoverman: '', // 接收人
                        pk_psndoc: '',
                        handoverdate: '', // 受理日期
                        billid: infoData.billid
                    }, () => {
                        this.editNav()
                    })
                }
            })
            .catch((err) => {
                this.editNav()
            });
    }

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
        let textarea = ''
        let handoverman = ''
        let handoverdate = ''
        let pk_psndoc = ''
        if (num === -1) {
            textarea = ''
            handoverman = ''
            handoverdate = ''
            pk_psndoc = ''
        } else {
            textarea = this.state.listData[num].item || ''
            handoverman = this.state.listData[num].handoverman || ''
            handoverdate = this.state.listData[num].handoverdate || ''
            pk_psndoc = this.state.listData[num].pk_psndoc || ''
        }
        // 切换组件，并更新数据
        this.setState({
            listNum: num,
            textarea: textarea,
            handoverman: handoverman,
            handoverdate: handoverdate,
            pk_psndoc: pk_psndoc,
            page: 'edit',
        }, () => {
            this.editNav()
        })
    }

    // 编辑list数据
    saveList(data) {
        if (!this.state.textarea && this.state.textarea !== 0) {
            HrNewToast.info(this.state.json['hrzzmb-000104']/* 国际化处理： 请填写内容*/, 2, () => {
                console.log("请填写内容")
            }, true);
            return
        }
        // if (!this.state.handoverman || !this.state.handoverdate || !this.state.pk_psndoc) {
        if (!this.state.handoverman || !this.state.handoverdate) {
            HrNewToast.info('接收人或日期没有填写', 2, () => {
                console.log("接收人或日期没有填写")
            }, true);
            return
        }
        console.log(formatTime(this.state.handoverdate, 'yyyy-MM-dd'))
        let singleParam = {
            item: this.state.textarea,
            handoverman: this.state.pk_psndoc,
            handoverdate: formatTime(this.state.handoverdate, 'yyyy-MM-dd')
        }
        let params = {billid: this.state.billid, pk_org: '', formData: singleParam}
        if (this.state.handoverman && this.state.handoverdate && this.state.textarea) {
            proFetch({
                url: '/nccloud/hrzz/depthandover/DeptHandoverSaveAction.do',
                data: params,
                noNeedShowError: false,
            })
                .then((result) => {
                    console.log(['result', result]);
                    // let listData = result.data
                    this.getInfo();
                })
                .catch((err) => {
                    HrNewToast.hide();
                    console.log(err);
                    let str = err && err.data && err.data.error && err.data.error.message
                    if (!str) {
                        return
                    }
                    Modal.alert('', str, [
                        {
                            text: that.state.json['hrzzmb-000003']/* 国际化处理： 确定*/, onPress: () => {
                            }
                        },
                    ])
                });
        }
        // this.setState({
        //     listData: lists,
        //     page: 'editable',
        // }, () => {
        //     this.editNav()
        // })
    }

    // 删除list数据
    deleteList(num) {
        let lists = this.state.listData;
        console.log(lists);
        let deleteID = lists[num].pk_depthandover;
        // lists.splice(num, 1)
        proFetch({
            url: '/nccloud/hrzz/depthandover/DeptHandoverDelAction.do',
            data: {billid: deleteID},
            noNeedShowError: false,
            loading: false
        })
            .then((result) => {
                console.log(['result', result]);
                // let listData = result.data
                this.getInfo();
            })
            .catch((err) => {
                HrNewToast.hide();
                console.log(err);
                let str = err && err.data && err.data.error && err.data.error.message
                if (!str) {
                    return
                }
                Modal.alert('', str, [
                    {
                        text: that.state.json['hrzzmb-000003']/* 国际化处理： 确定*/, onPress: () => {
                        }
                    },
                ])
            })
        // this.setState((prevState, props) => ({
        //     listData: lists,
        // }));
    }

    // 编译list数组转为dom
    listToDom(type) {
        console.log(this.state.listData);
        return this.state.listData.map((item, index) => {
            return (
                <div>
                    <ListBase titleClick={!type ? () => {
                    } : this.openDetail.bind(this, index)} iconFun={this.deleteList.bind(this, index)}
                              type={type}
                              title={item.item}
                    />
                    <ListAll type={'input'} name={this.state.json['hrzzmb-000107']/* 国际化处理： 接收人*/} disabled={true}
                             value={item.handoverman}/>
                    <ListAll type={'input'} name={this.state.json['hrzzmb-000108']/* 国际化处理： 交接日期*/} disabled={true}
                             value={formatTime(item.handoverdate, 'yyyy-MM-dd')}/>
                    <div style={{'width': '100%', 'height': '10px'}}/>
                </div>
            )
        })
    }

    // 子组件相关方法
    // 多行文本框组件的回调
    editTextarea(data) {
        this.setState((prevState, props) => ({
            textarea: data
        }));
    }

    // listAll 的成功回调
    onOk(type, data) {
        if (type === 'input') {
            this.setState({
                handoverman: data
            })
        } else if (type === 'refer') {
            this.setState({
                coverFlag: true
            }, () => {
                this.editNav();
            });
            this.getList('')
        } else if (type === 'date') {
            this.setState(() => ({
                handoverdate: data,//formatTime(data,'yyyy-MM-dd')
            }))
        }
    }

    //按照pk进行筛选content中的users
    selectPks(pks) {
        let content = this.state.oriContent;
        let newUser = [];
        return new Promise((resolve, reject) => {
            if (content[0].assginUsers) {
                let users = content[0].assginUsers;
                users.map((item) => {
                    pks.map((pk) => {
                        if (pk === item.pk) {
                            newUser.push(item);
                        }
                    })
                });
                content[0].assginUsers = newUser;
                resolve(content)
            } else {
                proFetch({
                    url: '/nccloud/hrzz/depthandover/DeptHandoverSelAssginAction.do',
                    data: {billid: this.state.billid, isAssgin: false}
                })
                    .then((result) => {
                        console.log(['result', result]);
                        if (result.success) {
                            if (result.data) {
                                let resData = result.data.content[0] || {};
                                this.setState({
                                    referList: resData.assginUsers || [],
                                    oriContent: result.data.content || []
                                }, () => {

                                });
                                content = result.data.content;
                                let users = content[0].assginUsers;
                                users.map((item) => {
                                    pks.map((pk) => {
                                        if (pk === item.pk) {
                                            newUser.push(item);
                                        }
                                    })
                                });
                                content[0].assginUsers = newUser;
                                resolve(content)
                            }
                        } else {
                            if (result.error) {
                                reject(result.error.message)
                            }
                        }
                    })
            }
        })
    }

    // 提交
    submit() {
        // if (charactersToLength(this.state.handoverman, 3) > 20) {
        //     HrNewToast.info(this.state.json['hrzzmb-000105']/* 国际化处理：接收人名称过长*/
        //         , 2, () => {
        //             console.log("接收人名称过长")
        //         }, true);
        //     return false
        // }
        let that = this
        let content = [];
        if (this.state.listData < 1) {
            HrNewToast.info(this.state.json['hrzzmb-000106']/* 国际化处理： 信息填写不完整*/, 2, () => {
                console.log("信息填写不完整")
            }, true);
        } else {
            let submitData = []
            let unusualData = 0
            let pks = [];
            let listDataSource = this.state.listData
            listDataSource.forEach((item) => {
                pks.push(item.pk_psndoc)
                let param = {
                    item: item.item,
                    handoverman: item.pk_psndoc,
                    handoverdate: (typeof item.handoverdate) === 'object' ? formatTime(item.handoverdate, 'yyyy-MM-dd') : item.handoverdate
                }
                submitData.push(param)
            })
            if (unusualData > 0) {
                HrNewToast.info('缺少接收人信息', 2, () => {
                    console.log("缺少接收人信息")
                }, true);
                return
            }
            this.selectPks(pks).then((content) => {
                let params = {billid: this.state.billid, pk_org: '', content: content}
                HrNewToast.loading(this.state.json['hrzzmb-000001']/* 国际化处理： 加载中...*/, 0, () => {
                    console.log("提交中")
                }, true);
                console.log(params);
                proFetch({
                    url: '/nccloud/hrzz/depthandover/DeptHandoverCommitAction.do',
                    data: params,
                    noNeedShowError: false
                })
                    .then((result) => {
                        HrNewToast.hide();
                        Modal.alert('', this.state.json['hrzzmb-000016']/* 国际化处理： 提交成功*/, [
                            {text: this.state.json['hrzzmb-000003']/* 国际化处理： 确定*/, onPress: () => this.getInfo()},
                        ])
                    })
                    .catch((err) => {
                        HrNewToast.hide();
                        console.log(err);
                        let str = err && err.data && err.data.error && err.data.error.message
                        if (!str) {
                            return
                        }
                        Modal.alert('', str, [
                            {
                                text: that.state.json['hrzzmb-000003']/* 国际化处理： 确定*/, onPress: () => {
                                }
                            },
                        ])
                    });
            }, (err) => {
                HrNewToast.hide();
                console.log(err);
                let str = err;
                if (!str) {
                    return
                }
                Modal.alert('', str, [
                    {
                        text: that.state.json['hrzzmb-000003']/* 国际化处理： 确定*/, onPress: () => {
                        }
                    },
                ])
            });
        }
    }

    // 根据不同状态，显示不同组件
    renderDom(str = 'none') {
        let obj = {
            'none': (<div>
                <DHeader title={this.state.json['hrzzmb-000097'] /* 国际化处理： 部门工作交接*/}
                         leftClick={this.leftClick.bind(this)}/>
                <div className="empty-padding">
                    <DEmpty describe={this.state.json['hrzzmb-000086'] /* 国际化处理： 暂无数据*/}/>
                </div>
            </div>),
            'first': (<div>
                <DHeader title={this.state.json['hrzzmb-000097'] /* 国际化处理： 部门工作交接*/}
                         leftClick={this.leftClick.bind(this)}/>
                <FirstGroup firstClick={this.openDetail.bind(this, -1)}/>
            </div>),
            'editable': (<div>
                <DHeader title={this.state.json['hrzzmb-000097'] /* 国际化处理： 部门工作交接*/}
                         leftClick={this.leftClick.bind(this)}/>
                <div class="handover-listgroup">
                    {this.listToDom('delete')}
                </div>
                <AddButton
                    type={'brand'}
                    position={'bottom-right'}
                    onClick={this.openDetail.bind(this, -1)}/>
                <Footer buttons={[{
                    type: 'brand',
                    title: this.state.json['hrzzmb-000023']/* 国际化处理： 提交*/,
                    onClick: () => {
                        this.submit()
                    }
                }]}/>
            </div>),
            'browse': (<div>
                <DHeader title={this.state.json['hrzzmb-000097'] /* 国际化处理： 部门工作交接*/}
                         leftClick={this.leftClick.bind(this)}/>
                <div class="handover-listgroup">
                    {this.listToDom('')}
                </div>
            </div>),
            'edit': (<div>
                <DHeader title={this.state.json['hrzzmb-000102']/* 国际化处理： 部门工作交接详情*/}
                         leftClick={this.leftClickPage2.bind(this)}/>
                <div class="handover-listgroup">
                    <div style={{'padding': '.24rem', 'background': '#ffffff'}}>
                        <DTextarea value={this.state.textarea}
                                   placeholder={'请输入交接内容'}
                                   maxNum={60}
                                   textChange={this.editTextarea.bind(this)}/>
                    </div>
                </div>
                <ListAll type={'refer'} name={this.state.json['hrzzmb-000107']/* 国际化处理： 接收人*/} disabled={false}
                         value={this.state.handoverman} onOk={this.onOk.bind(this, 'refer')}/>
                {/* <ListAll type={'input'} name={this.state.json['hrzzmb-000107'] /* 国际化处理： 接收人*} disabled={false} value={this.state.handoverman} onChange={this.onOk.bind(this, 'input')} />  */}
                <ListAll type={'date'} name={this.state.json['hrzzmb-000108']/* 国际化处理： 交接日期*/} disabled={false}
                         value={this.state.handoverdate} onOk={this.onOk.bind(this, 'date')}/>
                <Footer buttons={[{
                    type: 'brand',
                    title: this.state.json['hrzzmb-000003']/* 国际化处理： 确定*/,
                    onClick: () => {
                        this.saveList()
                    }
                }]}/>
            </div>)
        };
        return (obj[str])
    }

    // 参照的点击事件
    listClickFun(index) {
        console.log(this.state.referList[index]);
        let {pk, name} = this.state.referList[index];
        this.setState({
            coverFlag: false,
            handoverman: name,
            pk_psndoc: pk
        }, () => {
            this.editNav();
        })
    }

    // 参照列表
    renderDomList() {
        let contentDom = this.state.referList.map((item, index) => {
            return (
                <List>
                    <List.Item onClick={() => {
                        this.listClickFun(index)
                    }}>{item.name}</List.Item>
                </List>
            )
        });
        return (
            <div class="personal-list-group">
                {contentDom}
            </div>
        )
    }

    // 异步请求
    getList(val) {
        proFetch({
            url: '/nccloud/hrzz/depthandover/DeptHandoverSelAssginAction.do',
            data: {billid: this.state.billid, isAssgin: false}
        })
            .then((result) => {
                console.log(['result', result]);
                if (result.success) {
                    if (result.data) {
                        let resData = result.data.content[0] || {};
                        this.setState({
                            referList: resData.assginUsers || [],
                            oriContent: result.data.content || []
                        }, () => {
                        })
                    }
                }
            })
    }

    searchList(value) {
        let oriList = this.state.oriContent[0].assginUsers || [];
        let reg = new RegExp(value)
        let result = []
        if (oriList.length > 0) {
            oriList.map((item, index) => {
                if (item.name.match(reg)) {
                    result.push(item)
                }
            })
        }
        this.setState({
            referList: result
        })
    }

    // 搜索的回调函数
    searchFun(val) {
        clearInterval(timer)
        timer = setTimeout(() => {
            console.log('val', val)
            this.searchList(val)
        }, 500)
    }

    // 参照遮罩
    renderDomCover() {
        if (this.state.coverFlag) {
            return (<div class="personal-list">
                <div class="personal-list-cover"/>
                <div class="personal-list-search">
                    <SearchBar
                        placeholder="请输入名称"
                        onChange={(v) => {
                            this.searchFun(v)
                        }}
                        ref={ref => this.manualFocusInst = ref}
                    />
                </div>
                {this.renderDomList()}
            </div>)
        } else {
            return ''
        }
    }

    render() {

        return (
            <div class="main">
                {this.renderDom(this.state.page)}
                {this.renderDomCover()}
            </div>
        )
    }
}

thirdLog(() => {
    ReactDOM.render(<WorkHandover/>, document.getElementById('app'));
});