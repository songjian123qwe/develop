import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import './index.less'
import { DHeader } from '../../../public/mobile/components/index';
import DetailBlock from './components/detailBlock/index'
import NativeObj from '../../../public/mobile/utils/jsbridge/index.js'
import {hrRouter} from '../../../public/mobile/utils/index.js'
import {getMultiLang} from "../../../public/mobile/utils/getMultiLang"
import {compatibleNavImg} from '../../../public/mobile/utils/index.js'
import {getTeamData} from '../../getData'
class TeamChangeDetail extends Component{
    constructor (props) {
        super(props)
        this.state = {
            data: {},
            json: {},
            showNav: false
        }
    }
    componentWillMount () {
        let showNav = JSON.parse(sessionStorage.getItem('showNav'))
        this.setState({
            showNav
        })
        this.getLanguage()
    }
    getLanguage = () => {
        getMultiLang({
            domainName: 'hrzz',
            moduleId: 'hrzzmb',
            callback: (json, status, init) => {
                this.setState({
                    json: json
                }, () => {
                    this.initPage()
                })
            }
        })
    }
    initPage = () => {
        let myteamData = getTeamData()
        let data = myteamData.changeDetail
        let title = data.title
        this.editNav(title)
        this.setState({
            data
        })
    }
    leftClick () {
        hrRouter.go(-1)
    }
    editNav(title){
		let parameters={}
		let cbs={
			teamChangeDetailLeft: this.leftClick
		}
		parameters={
			leftItems: [
				{
					callback: 'teamChangeDetailLeft',
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
    render () {
        const {data, json, showNav} = this.state
        let title = data.title ? data.title : ''
        let cnt = data.cnt ? data.cnt : '0'
        let dataArr = data.data ? data.data : []
        let detailDomArr = dataArr.map((item, index) => {
            return <DetailBlock json={json} detailInfo={item} detailIndex={index} title={title}/>
        })
        return (
            <div className="teamChangeDetail">
                <DHeader title={title} leftClick={this.leftClick.bind(this)}/>
                <div className="detailCon" style={{height: showNav ? 'calc(100% - 0.88rem)' : '100%'}}>
                    <div className="personNum">
                        {/* 共 人 */}
                        { json['hrzzmb-000044']?`${json['hrzzmb-000044']}${cnt}${json['hrzzmb-000045']}`:null}
                    </div>
                    {detailDomArr}
                </div>
            </div>
        )
    }
}
export default TeamChangeDetail
ReactDOM.render(<TeamChangeDetail />, document.getElementById('app'));