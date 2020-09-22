import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {DHeader} from '../../../public/mobile/components/index'
import './index.less'
import ajax from '../../../public/mobile/utils/ajax'
import NativeObj from '../../../public/mobile/utils/jsbridge/index.js'
import {PullToRefresh, ListView, Toast, Modal} from 'antd-mobile';
import {getMultiLang} from "../../../public/mobile/utils/getMultiLang"
import Empty from '../../../public/mobile/components/Other/Empty/index'
import {compatibleNavImg} from '../../../public/mobile/utils/index.js'
import {hrRouter} from '../../../public/mobile/utils/index.js'
import thirdLog from '../../../login/third-log-method';
const alert = Modal.alert,
    hasHeader = sessionStorage.getItem('showNav') === 'true';
function MyBody(props) {
    return (
        <div className="am-list-body my-body">
            {props.children}
        </div>
    );
}
class EnterpriseProList extends Component{
    constructor (props) {
        super(props);
        const dataSource = new ListView.DataSource({  //这个dataSource有cloneWithRows方法
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            title: '',
            dataSource,
            hasMore: true,
            refreshing: false,
            totalPage: 2,
            pageInfo: {
                pageSize: '10',
                pageIndex: 1
            },
            dataArr: [],
            cuserid: '',
            showPage: false,
            iframeSrc: '',
            showNav: false,
            json: {},
            noData: false,
            isLoading: true,
            hasMoreFlag: true
        }
    }
    componentDidMount () {

        this.getLanguage()
    }
    initPage = () => {
        window.location.hash = 'c=606520A0'
        this.querypersonsettings()
        this.editNav('enterpriseClose', this.closePage)
        // sessionStorage.setItem('showNav', true)
        let showNav = JSON.parse(sessionStorage.getItem('showNav'))
        this.setState({
            showNav
        })
    }
    getLanguage = () => {
        getMultiLang({
            domainName: 'hrzz',
            moduleId: 'hrzzmb',
            callback: (json, status, init) => {
                this.setState({
                    json: json,
                    title: json['hrzzmb-000036'] // 企业介绍
                }, () => {
                    this.initPage()
                })
            }
        })
    }
    editNav(callbackName, callback){
        let title = this.state.title
		let parameters={}
		let cbs={
			[callbackName]: callback
		}
		parameters={
			leftItems: [
				{
					callback: callbackName,                 
					icon: compatibleNavImg(location.origin+'/nccloud/resources/hrzz/public/mobile/static/icon/zuo.png')
				}
			],
			centerItems: [
				{
					title
				}
			]
		}
		let data = { 
			'function': 'configNavBar', 
			'parameters': parameters
		}
		NativeObj.configNavBar(data, cbs)
    }
    closePage () {
        NativeObj.closePage()
    }
    leftClick = () => {
        this.setState({
            showPage: false
        }, ()=>{
            window.scroll(0,window.scrollY)
        })
        this.editNav('enterpriseClose', this.closePage)
    }
    // 下拉刷新触发函数
    onRefresh = () => {
        this.setState({ refreshing: true});
        setTimeout(() => {
            const {cuserid} = this.state
            this.QueryOrgProFile4MobileAction(cuserid, 'refresh')
        }, 2000)
    }
    onEndReached = () => {
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        this.setState({
            isLoading: true
        })
        setTimeout(() => {
            const {cuserid} = this.state
            this.QueryOrgProFile4MobileAction(cuserid, 'loading')
        }, 1500)
    }
    // 查询人员信息
    querypersonsettings () {
        ajax({
            url: '/nccloud/platform/appregister/querypersonsettings.do',
            data: {rqCode: 'querypersonsettings'},
            info: {
                appcode: '606520A0'
            },
            success: (result) => {
                if (result.success) {
                    let cuserid = result.data.userId
                    this.setState({
                        cuserid
                    })
                    this.QueryOrgProFile4MobileAction(cuserid, 'loading')
                }
            }
        })
    }
    // 调用查询接口
    QueryOrgProFile4MobileAction (cuserid, style) {
        const {pageInfo, totalPage, dataArr, json} = this.state
        if (style === 'refresh') {
            pageInfo.pageIndex = 1
        }
        if (totalPage < pageInfo.pageIndex) {
            this.setState({
                hasMore: false,
                hasMoreFlag: false
            })
            return false
        }
        let paramObj = {
            cuserid: cuserid,
            appcode: '606520A0',
            pageInfo
        }
        ajax({
            url: '/nccloud/hrzz/orgprofile/QueryOrgProFileAction.do',
            data: paramObj,
            info: {
                appcode: '606520A0'
            },
            success: (result) => {
                if (result.success) {
                    if (!result.data) {
                        this.setState({
                            noData: true
                        })
                        return false
                    }
                    if (result.data) {
                        let data = result.data
                        let orgprolist = data.orgprolist
                        let resultDataArr = orgprolist.rows
                        if (!orgprolist || !resultDataArr || resultDataArr.length === 0) {
                            this.setState({
                                noData: true
                            })
                            return false
                        }
                        let totalPage = Number(orgprolist.pageInfo.totalPage)
                        pageInfo.pageIndex = pageInfo.pageIndex + 1
                        if (style === 'refresh') {
                            this.setState({
                                dataSource: this.state.dataSource.cloneWithRows(resultDataArr),
                                refreshing: false,
                                totalPage: 2,
                                dataArr: [...resultDataArr],
                                isLoading: false,
                                hasMoreFlag: true
                            })
                        } else {
                            let newDataArr = [...dataArr, ...resultDataArr]
                            this.setState({
                                dataSource: this.state.dataSource.cloneWithRows(newDataArr),
                                totalPage,
                                dataArr: newDataArr,
                                isLoading: false
                            })
                        }
                    }
                }
            },
            error: (err) => {
                this.setState({
                    isLoading: false,
                    noData: true
                })
                alert(json['hrzzmb-000002'], err.data.error.message, [
                    { text: json['hrzzmb-000003'], onPress: () => {}, style: 'default' }
                ])
            }
        })
    }
    // 点击节点去跳转
    clickDomToPage (profile) {
        const {json} = this.state
        if(!hasHeader){
            NativeObj.openWindow(profile);
        }else{
            Toast.loading(json['hrzzmb-000001'], 0) // 加载中...
            this.setState({
                iframeSrc: profile,
                showPage: true
            });
        }
        this.editNav('enterpriseBack', this.leftClick)
    }
    // iframe加载完毕
    iframeLoaded () {
        Toast.hide()
    }
    // h5头部调用返回方法
    leftClick2 = () => {
        if (this.state.showPage) {
            this.setState({
                showPage: false
            }, ()=>{
                window.scroll(0,window.scrollY)
            })
        } else {
            let url = '/hrzz/entry-mobile/myentry/main/index.html'
            hrRouter.push(url)
        }
    }
    render () {
        const {refreshing, dataSource, showPage, iframeSrc, title, showNav, noData, json, hasMore, isLoading, hasMoreFlag} = this.state
        const row = (rowData, sectionID, rowID) => {
            let values = rowData.values
            return (
                <div className="contentDom" key={rowID} onClick={this.clickDomToPage.bind(this, values.profile.value)}>
                    <img className="domLeft" src={values.logo.value} alt=""/>
                    <div className="domRight">
                        <span className="drText">{values.proname.value}</span>
                        <span className="hrfont hr-you"></span>
                    </div>
                </div>
            )
        }
        return (
            <div className="enterprise">
                <DHeader title={title} leftClick={this.leftClick2}/>
                <div className="contentList" style={{height: showNav ? 'calc(100% - 0.88rem)' : '100%'}}>
                    <div className="pageDom" style={{display: showPage && hasHeader ? 'block' : 'none'}}>
                        {
                            showPage && hasHeader ? <iframe id="pageIframe" className="pageIframe" scrolling="auto" src={iframeSrc} frameborder="0" onLoad={this.iframeLoaded.bind(this)}></iframe> : ''
                        }
                    </div>
                    <div className="listview" style={{display: showPage ? 'none' : 'block'}}>
                        {noData ? <Empty describe={json['hrzzmb-000086']}/> : <ListView
                                        key={'1'}
                                        ref="listview"
                                        dataSource={dataSource}
                                        renderRow={row}   //渲染你上边写好的那个row
                                        useBodyScroll={false}
                                        style={{
                                            height: '100%',
                                            width: '100%'
                                        }}
                                        renderBodyComponent={() => <MyBody />}
                                        renderFooter={() => (<div style={{textAlign: 'center', paddingTop: '5px'}}>
                                            {isLoading ? (hasMore || hasMoreFlag ? json['hrzzmb-000001'] : json['hrzzmb-000037']) : ''}
                                        </div>)}
                                        pullToRefresh={<PullToRefresh
                                            refreshing={refreshing}
                                            onRefresh={this.onRefresh}
                                        />}
                                        onEndReached={this.onEndReached}
                                        onEndReachedThreshold={10}
                                        scrollRenderAheadDistance={500}
                                        pageSize={10}    //每次下拉之后显示的数据条数
                                        />}
                    </div> 
                </div>
            </div>
        )
    }
}
thirdLog(() => {
    ReactDOM.render(<EnterpriseProList/>, document.getElementById('app'));
})