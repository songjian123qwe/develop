import {Component} from 'react'
import ReactDOM from 'react-dom'
import './index.less'
import { DHeader } from '../../../public/mobile/components/index';
import PersonInfo from './components/person-info/index'
import {Tabs, PullToRefresh, ListView} from 'antd-mobile';
import ajax from '../../../public/mobile/utils/ajax';
import {hrRouter} from '../../../public/mobile/utils/index.js'
import NativeObj from '../../../public/mobile/utils/jsbridge/index.js'
import {getMultiLang} from "../../../public/mobile/utils/getMultiLang"
import McDialog from '../../../public/mobile/components/Dialog/index'
import {compatibleNavImg} from '../../../public/mobile/utils/index.js'
import Empty from '../../../public/mobile/components/Other/Empty/index'
import {getTeamData} from '../../getData'
function MyBody(props) {
    return (
        <div className="am-list-body my-body">
            {props.children}
        </div>
    );
}
export default class TeamMember extends Component{
    constructor (props) {
        super(props);
        const dataSource = new ListView.DataSource({  //这个dataSource有cloneWithRows方法
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            refreshing: true,
            title: '',
            cuserid: '',
            deptArr: [],
            dataSource,
            hasMore: true,
            totalPage: 1,
            pageInfo: {
                pageSize: 10,
                pageIndex: 1
            },
            dataArr: [],
            showNav: false,
            json: {},
            mobile: '',
            noData: false,
            isLoading: false,
            hasMoreFlag: true,
            lock: true
        }
    }
    componentWillMount () {
        this.getLanguage()
    }
    getLanguage = () => {
        getMultiLang({
            domainName: 'hrzz',
            moduleId: 'hrzzmb',
            callback: (json, status, init) => {
                this.setState({
                    json: json,
                    title: json['hrzzmb-000041'] // 团队成员信息
                }, () => {
                    this.initPage()
                })
            }
        })
    }
    initPage = () => {
        let myteamData = getTeamData()
		let cuserid = myteamData.cuserid
		let deptArr = myteamData.deptArr
        let showNav = JSON.parse(sessionStorage.getItem('showNav'))
        this.setState({
            showNav,
            cuserid,
			deptArr
        })
        this.editNav()
        this.psndocQuery4MobileAction(cuserid, '')
    }
    leftClick () {
        let url = '/hrzz/myteam-mobile/myteam-index/main/index.html'
        hrRouter.push(url)
    }
    editNav(){
        let title = this.state.title
        let parameters={}
		let cbs={
			teamMemberLeft: this.leftClick
		}
		parameters={
			leftItems: [
				{
					callback: 'teamMemberLeft',                 
					icon: compatibleNavImg(location.origin+'/nccloud/resources/hrzz/public/mobile/static/icon/zuo.png')
				}
			],
			centerItems: [
				{
					title: title,
				}
			]
		}
		let data = { 
			'function': 'configNavBar', 
			'parameters': parameters
		}
		NativeObj.configNavBar(data, cbs)
    }
    // 团队人员列表
    psndocQuery4MobileAction (cuserid, pk_dept, style) {
        const {pageInfo, totalPage, dataArr} = this.state
        if (style === 'refresh') {
            pageInfo.pageIndex = 1
        }
        if (pageInfo.pageIndex > totalPage) {
            this.setState({
                hasMore: false,
                hasMoreFlag: false
            })
            this.state.lock = true
            return false
        }
        ajax({
			url: '/nccloud/hrzz/deptpsn/PsndocQuery4MobileAction.do',
			data: {
                cuserid,
                pageInfo,
                pk_dept,
            },
            info: {
                appcode: '60651010'
            },
			success: (result) => {
				if (result.success) {
                    this.state.lock = true
                    let resultData = result.data
                    if (pageInfo.pageIndex === 1 && !resultData) {
                        this.setState({
                            noData: true
                        })
                        return false
                    } else {
                        this.setState({
                            noData: false
                        })
                    }
                    let resultDataArr = resultData.data
                    if (pageInfo.pageIndex === 1 && (!resultDataArr || resultDataArr.length === 0)) {
                        this.setState({
                            noData: true
                        })
                        return false
                    } else {
                        this.setState({
                            noData: false
                        })
                    }
                    let totalPage = Number(resultData.pageInfo.totalPage)
                    pageInfo.pageIndex = pageInfo.pageIndex + 1
                    if (style === 'refresh') {
                        this.setState({
                            dataSource: this.state.dataSource.cloneWithRows(resultDataArr),
                            refreshing: false,
                            totalPage,
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
		});
    }
    // 切换tab触发函数
    tabChange (tab, index) {
        const {cuserid, noData} = this.state
        if (!noData) {
            let srcrollDom = document.getElementsByClassName('am-list-view-scrollview')[0]
            srcrollDom.scrollTop = 0
        }
        let pk_dept = tab.refpk
        this.setState({
            pk_dept,
            hasMore: true
        }, function () {
            this.psndocQuery4MobileAction(cuserid, pk_dept, "refresh")
        })
    }
    // 下拉刷新触发函数
    onRefresh = () => {
        this.setState({refreshing: true})
        setTimeout(() => {
            const {cuserid, pk_dept} = this.state
            this.psndocQuery4MobileAction(cuserid, pk_dept, "refresh")
        }, 2000)
    }
    onEndReached = () => {
        const {isLoading, hasMore, cuserid, pk_dept, lock} = this.state
        if (lock) {
            this.state.lock = false
            if (isLoading && !hasMore) {
                return;
            }
            this.setState({
                isLoading: true
            })
            setTimeout(() => {
                this.psndocQuery4MobileAction(cuserid, pk_dept, "loading")
            }, 1500)
        }
    }
    // 显示人员详情
    showDetail (rowData) {
        let pk_psndoc = rowData.hashValue.pk_psndoc
        let url = '/hrzz/psn-mobile/psn-info/main/index.html?from=teamchange&pk_psndoc='+pk_psndoc + '&psntype=3'
        hrRouter.push(url)
    }
    // 显示弹窗
    showDialog = (mobile) => {
        this.setState({
            mobile
        })
        this.refs.McDialog.showDialog()
    }
    // 点击弹窗确定按钮执行函数
    rBtnFun = () => {
        this.refs.McDialog.hideDialog()
        const {mobile} = this.state
        setTimeout(() => {
            window.location.href = 'tel:'+ mobile
        }, 30)
    }
    render () {
        const {refreshing, dataSource, showNav, title, json, noData, isLoading, hasMore, hasMoreFlag} = this.state
        const {deptArr} = this.state
        const row = (rowData, sectionID, rowID) => {
            return (
                <PersonInfo showDialog={this.showDialog} json={json} showDetail={this.showDetail.bind(this, rowData)} index={Number(rowID)} personInfo={rowData} {...this.props}/>
            );
        }
        let dialogField = {
            title: json['hrzzmb-000002'],
            content: json['hrzzmb-000085'],
            rBtnText: json['hrzzmb-000003'],
            rBtnFun: this.rBtnFun
        }
        let renderContent = (
                <div className="tabCon">
                    {
                        noData? <Empty describe={json['hrzzmb-000086']}/> : <ListView
                                            key={'1'}
                                            ref="listview"
                                            dataSource={dataSource}
                                            renderRow={row}   //渲染你上边写好的那个row
                                            style={{
                                                height: '100%',
                                                width: '100%',
                                                overflow: 'auto'
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
                                            />
                    }
                </div>
            )
        return (
            <div className="teamMemberContent">
                <DHeader title={title} leftClick={this.leftClick.bind(this)}/>
                <div className="tabListCon" style={{height: showNav ? 'calc(100% - 0.88rem)' : '100%'}}>
                    <div>
                        <Tabs 
                            tabs={deptArr} 
                            onChange={this.tabChange.bind(this)}
                            renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} />}
                            >
                        </Tabs>
                    </div>
                    {renderContent}
                </div>
                <McDialog lBtnText={json['hrzzmb-000024']} isShowLeft={true} ref="McDialog" {...dialogField}/>
            </div>
        )
    }
}
ReactDOM.render(<TeamMember />, document.getElementById('app'));