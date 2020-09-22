import { Component } from 'react';
import { DHeader } from '../../../public/mobile/components/index';
import MMTabmenu from '../../components/common/tabmenu';
import MMContent from './content';
import './index.less';
import NativeObj from '../../../public/mobile/utils/jsbridge/index.js';
import { hrRouter } from '../../../public/mobile/utils/index.js';
import { getMultiLang } from '../../../public/mobile/utils/getMultiLang';
import { compatibleNavImg } from '../../../public/mobile/utils/index.js';
import ajax from 'src/hrzz/public/mobile/utils/ajax';
import { Toast } from 'antd-mobile';
import {getTeamData} from '../../getData'
export default class TeamPicture extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			subtitle: '',
			cuserid: '',
			deptArr: [],
			json: {},
			drawData: {},
			pk_dept: ''
		};
	}
	updateState = (states, callback) => {
		this.setState(states, callback);
	};
	componentWillMount() {
		this.getLanguage();
	}
	getLanguage = () => {
		getMultiLang({
			domainName: 'hrzz',
			moduleId: 'hrzzmb',
			callback: (json, status, init) => {
				this.setState(
					{
						json: json,
						title: json['hrzzmb-000042'] // 团队画像
					},
					() => {
						this.initPage();
					}
				);
			}
		});
	};
	initPage = () => {
		let myteamData = getTeamData()
		let cuserid = myteamData.cuserid;
		let deptArr = myteamData.deptArr;
		this.setState({
			cuserid,
			deptArr
		});
		this.getQueryGroupStructure();
		this.editNav();
	};
	/* 请求图标数据 */
	getQueryGroupStructure = () => {
		const { json, cuserid, pk_dept } = this.state;
		Toast.loading(json['hrzzmb-000001'], 0); // 加载中...
		ajax({
			url: '/nccloud/hrzz/deptreport/QueryGroupStructureAction.do',
			data: {
				cuserid,
				pk_dept
			},
			info: {
				appcode: '60651030'
			},
			success: (result) => {
				Toast.hide();
				this.setState({
					drawData: result.data
				});
			},
			error: (err) => {
				Toast.hide();
			}
		});
	};
	leftClick = () => {
		let url = '/hrzz/myteam-mobile/myteam-index/main/index.html'
        hrRouter.push(url)
	};
	editNav = () => {
		let title = this.state.title;
		let parameters = {};
		let cbs = {
			teamPictureLeft: this.leftClick
		};
		parameters = {
			leftItems: [
				{
					callback: 'teamPictureLeft',
					icon: compatibleNavImg(
						location.origin + '/nccloud/resources/hrzz/public/mobile/static/icon/zuo.png'
					)
				}
			],
			centerItems: [
				{
					title: title
				}
			]
		};
		let data = {
			function: 'configNavBar',
			parameters: parameters
		};
		NativeObj.configNavBar(data, cbs);
	};
	render() {
		const { cuserid, deptArr, title, json, drawData } = this.state;
		return (
			<div className="team-picture">
				<DHeader title={title} leftClick={this.leftClick} />
				<MMTabmenu
					{...this.props}
					{...this.state}
					updateState={this.updateState}
					getData={this.getQueryGroupStructure}
				/>
				<MMContent json={json} cuserid={cuserid} deptArr={deptArr} drawData={drawData} />
			</div>
		);
	}
}
ReactDOM.render(<TeamPicture />, document.getElementById('app'));
