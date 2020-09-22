import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import './index.less'
import { DHeader } from '../../../public/mobile/components/index';
import {Tabs} from 'antd-mobile';
import EmployeesType from './components/employees-type/index'
import ajax from '../../../public/mobile/utils/ajax';
import LineChart from './components/line/index'
import NativeObj from '../../../public/mobile/utils/jsbridge/index.js'
import {hrRouter} from '../../../public/mobile/utils/index.js'
import {getMultiLang} from "../../../public/mobile/utils/getMultiLang"
import {compatibleNavImg} from '../../../public/mobile/utils/index.js'
import {Toast} from 'antd-mobile'
import {getTeamData, setTeamData} from '../../getData'
class TeamChange extends Component{
    constructor (props) {
        super(props)
        this.state = {
            selectMonthNum: 6,
            entryObj: {},
            changeObj: {},
            dismissionObj: {},
            regularObj: {},
            dataObj: {},
            title: '',
            cuserid: '',
            deptArr: [],
            json: {}
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
                    title: json['hrzzmb-000043'] // 团队人事变动
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
        this.editNav()
        this.setState({
			cuserid,
			deptArr
		}, () => {
            const {cuserid} = this.state
            this.queryAllInfo(cuserid, '')
        })
    }
    leftClick () {
        let url = '/hrzz/myteam-mobile/myteam-index/main/index.html'
        hrRouter.push(url)
    }
    editNav(){
        let parameters={}
        let title = this.state.title
		let cbs={
			teamChangeLeft: this.leftClick
		}
		parameters={
			leftItems: [
				{
					callback: 'teamChangeLeft',                 
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
    // 切换tab触发函数
    tabChange (tab, index) {
        const {cuserid} = this.state
        let pk_dept = tab.refpk
        this.setState({
            selectMonthNum: 6
        })
        this.queryAllInfo(cuserid, pk_dept)
    }
    // 切换表格展示月份数
    tabMonths (num) {
        this.setState({
            selectMonthNum: num
        })
        this.refs.linechart.resetInitLineChart(num)
    }
    // 查询所有信息
    queryAllInfo (cuserid, pk_dept) {
        this.queryEntryGroupAction(cuserid, pk_dept)
    }
    // 待入职信息
    queryEntryGroupAction (cuserid, pk_dept) {
        const {json} = this.state
        Toast.loading(json['hrzzmb-000001'], 0) // 加载中...
        ajax({
			url: '/nccloud/hrzz/deptreport/QueryEntryGroupAction.do',
			data: {
                cuserid,
                pk_dept
            },
            info: {
                appcode: '60651020'
            },
			success: (result) => {
				if (result.success) {
					this.setState({
                        entryObj: result.data
                    })
                    this.queryChangeGroupAction(cuserid, pk_dept)
				} else {
                    Toast.hide()
                }
            },
            error: () => {
                Toast.hide()
            }
		});
    }
    // 待变动信息
    queryChangeGroupAction (cuserid, pk_dept) {
        ajax({
			url: '/nccloud/hrzz/deptreport/QueryChangeGroupAction.do',
			data: {
                cuserid,
                pk_dept
            },
            info: {
                appcode: '60651020'
            },
			success: (result) => {
				if (result.success) {
					this.setState({
                        changeObj: result.data
                    })
                    this.queryDimissionGroupAction(cuserid, pk_dept)
				} else {
                    Toast.hide()
                }
            },
            error: () => {
                Toast.hide()
            }
		});
    }
    // 待离职信息
    queryDimissionGroupAction (cuserid, pk_dept) {
        ajax({
			url: '/nccloud/hrzz/deptreport/QueryDimissionGroupAction.do',
			data: {
                cuserid,
                pk_dept
            },
            info: {
                appcode: '60651020'
            },
			success: (result) => {
				if (result.success) {
					this.setState({
                        dismissionObj: result.data
                    })
                    this.queryRegGroupAction(cuserid, pk_dept)
				} else {
                    Toast.hide()
                }
            },
            error: () => {
                Toast.hide()
            }
		});
    }
    // 待转正信息
    queryRegGroupAction (cuserid, pk_dept) {
        const {json} = this.state
        ajax({
			url: '/nccloud/hrzz/deptreport/QueryRegGroupAction.do',
			data: {
                cuserid,
                pk_dept
            },
            info: {
                appcode: '60651020'
            },
			success: (result) => {
				if (result.success) {
					this.setState({
                        regularObj: result.data
                    })
                    this.refs.linechart.queryGroupTrendAction(cuserid, pk_dept, json)
				} else {
                    Toast.hide()
                }
            },
            error: () => {
                Toast.hide()
            }
		});
    }
    // 隐藏变动页显示详情页面
    showDetail (dataObj) {
        let url = '/hrzz/myteam-mobile/change-detail/main/index.html'
        hrRouter.push(url)
        let myteamData = getTeamData()
        myteamData.changeDetail = dataObj
        setTeamData(myteamData)
    }
    render () {
        const {deptArr, json} = this.state
        const {selectMonthNum, entryObj, changeObj, dismissionObj, regularObj, dataObj, title} = this.state
        let tabPanel = (
            <div className="tabPanelContent">
                <div className="tpcFirst">
                    {/* 6个月 */}
                    <div 
                        className="tpcfMonth firstMonths"
                        style={{background: selectMonthNum === 6 ? '#FCEDEC' : '#fff'}} 
                        onClick={this.tabMonths.bind(this, 6)}>
                            {json['hrzzmb-000057']}
                    </div>
                    {/* 12个月 */}
                    <div 
                        className="tpcfMonth secondMonths"
                        style={{background: selectMonthNum === 12 ? '#FCEDEC' : '#fff'}} 
                        onClick={this.tabMonths.bind(this, 12)}>
                            {json['hrzzmb-000058']}
                    </div>
                </div>
                <div className="tpcSecond">
                    <LineChart json={json} ref="linechart"/>
                </div>
                <div className="tpcThree">
                    {/* 待进入 */}
                    <EmployeesType json={json} data={entryObj} title={json['hrzzmb-000046']} showDetail={this.showDetail.bind(this)} {...this.props}/>
                    {/* 待离开 */}
                    <EmployeesType json={json} data={dismissionObj} title={json['hrzzmb-000048']} showDetail={this.showDetail.bind(this)} {...this.props}/>
                    {/* 待转正 */}
                    <EmployeesType json={json} data={regularObj} title={json['hrzzmb-000052']} showDetail={this.showDetail.bind(this)} {...this.props}/>
                    {/* 待变动 */}
                    <EmployeesType json={json} data={changeObj} title={json['hrzzmb-000050']} showDetail={this.showDetail.bind(this)} {...this.props}/>
                </div>
            </div>
        )
        return (
            <div className="teamChangeContent">
                <DHeader title={title} leftClick={this.leftClick.bind(this)}/>
                <div className="tabListCon">
                    <div>
                        <Tabs 
                            tabs={deptArr} 
                            onChange={this.tabChange.bind(this)}
                            renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} />}
                            >
                        </Tabs>
                    </div>
                    <div className="tabCon">
                        {tabPanel}
                    </div>
                </div>
            </div>
        )
    }
}
export default TeamChange
ReactDOM.render(<TeamChange />, document.getElementById('app'));
