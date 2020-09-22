import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DHeader } from '../../../public/mobile/components/index';
import './index.less';
import ajax from '../../../public/mobile/utils/ajax';
import NativeObj from '../../../public/mobile/utils/jsbridge/index.js'
import {Toast} from 'antd-mobile'
import {hrRouter} from '../../../public/mobile/utils/index.js';
import {getMultiLang} from "../../../public/mobile/utils/getMultiLang"
import {compatibleNavImg} from '../../../public/mobile/utils/index.js'
import thirdLog from '../../../login/third-log-method';
import {setTeamData} from '../../getData'
class MyTeamIndex extends Component {
	constructor(props) {
		super(props);
		this.state = {
			componentName: 'index',
			pk_dept: '',
			from: [],
			title: '',
			json: {}
		};
		hrRouter.setRoot()
	}
	componentWillMount() {
		this.getLanguage()
	}
	getLanguage = () => {
        getMultiLang({
            domainName: 'hrzz',
            moduleId: 'hrzzmb',
            callback: (json, status, init) => {
                this.setState({
                    json: json,
                    title: json['hrzzmb-000039'] // 我的团队
                }, () => {
                    this.initPage()
                })
            }
        })
    }
	initPage = () => {
		this.editNav()
		window.location.hash = 'c=60651010';
		this.getCuserId();
		//sessionStorage.setItem('showNav', false)
	}
	closePage () {
		NativeObj.closePage()
	}
	editNav(){
		let title = this.state.title
		let parameters={}
		let cbs={
			teamIndexLeft: this.closePage
		}
		parameters={
			leftItems: [
				{
					callback: 'teamIndexLeft',                 
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
	updateState = (data, callback = () => {}) => {
		this.setState(data, callback);
	};
	/* 获取当前用户参数,返回的cuserid要作为获取部门信息的参数 */
	getCuserId = () => {
		const {json} = this.state
		Toast.loading(json['hrzzmb-000001'], 0) // 加载中...
		ajax({
			url: '/nccloud/platform/appregister/querypersonsettings.do',
			data: { rqCode: 'querypersonsettings' },
			success: (result) => {
				Toast.hide()
				if (result.success) {
					let cuserid = result.data.userId
					this.getDepartment(cuserid);
				} else {
					Toast.hide()
				}
			},
			error: () => {
                Toast.hide()
            }
		});
	};
	/* 获取部门信息-管理部门查询接口 */
	getDepartment = (cuserid) => {
		const {json} = this.state
		Toast.loading(json['hrzzmb-000001'], 0) // 加载中...
		ajax({
			url: '/nccloud/hrzz/deptpsn/QueryDeptByPrincipalAction.do',
			data: {
				cuserid,
				datatype: 'list'
			},
			info: {
				appcode: '60651010'
			},
			success: (result) => {
				Toast.hide()
				// if (result.success) {
					// 这里应该写获取部门信息后的数据处理逻辑
					let deptArr = []
					deptArr.push({
						name: json['hrzzmb-000040'], // 全部
						refpk: '',
						title: json['hrzzmb-000040']  // 全部
					});
					let myteamData = {}
					myteamData.cuserid = cuserid
					if (result.data) {
						let deptDataArr = result.data.map((item) => {
							return {
								name: item.hashValue.name,
								refpk: item.hashValue.pk_dept,
								title: item.hashValue.name
							};
						});
						deptArr = [...deptArr, ...deptDataArr]
					}
					myteamData.deptArr = deptArr
					setTeamData(myteamData)
				// } else {
				// 	Toast.hide()
				// }
			},
			error: () => {
                Toast.hide()
            }
		});
	};
	leftClick () {
        window.history.go(-1)
    }
	clickToModule(type) {
		const { from } = this.state;
		from.push('index');
		this.setState({
			componentName: type,
			from
		});
		let url = ''
		switch (type) {
			case 'teamMember':
				url = '/hrzz/myteam-mobile/myteam-member/main/index.html#c=60651010' 
				break;
			case 'teamChange':
				url = '/hrzz/myteam-mobile/myteam-change/main/index.html#c=60651020'
				break;
			case 'teamPicture':
				url = '/hrzz/myteam-mobile/myteam-picture/main/index.html#c=60651030'
				break;
			default:
				break;
		}
		hrRouter.push(url)
	}
	render() {
		const {title, json} = this.state
		return (
			<div className="myteam">
				<div className="indexCon">
					<DHeader title={title} leftClick={this.leftClick.bind(this)} />
					<div className="btnCon">
						{/* 团队成员信息 */}
						<div className="memberBtn btnMargin" onClick={this.clickToModule.bind(this, 'teamMember')}>
							{json['hrzzmb-000041']}
						</div>
						{/* 团队画像 */}
						<div className="memberBtn btnMargin" onClick={this.clickToModule.bind(this, 'teamPicture')}>
							{json['hrzzmb-000042']}
						</div>
						{/* 团队人事变动 */}
						<div className="memberBtn" onClick={this.clickToModule.bind(this, 'teamChange')}>
							{json['hrzzmb-000043']}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
thirdLog(() => {
	ReactDOM.render(<MyTeamIndex />, document.getElementById('app'));
})

