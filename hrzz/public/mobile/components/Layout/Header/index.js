import React, { Component } from 'react';
import './index.less';
/**
 * 
 * 
 * @param type  [string] 导航类型，控制左中右3块的间距 'narrow',//narrow middle wide
 * @param headerstyle [object] 自定义修改样式

 * @param title  [string] 标题
 * @param groupTitle [object] 组合标题,如图文,链接等
 * @param titlestyle [object]] 标题样式
 * @param contentClick [function] 标题对应的回调函数

 * @param lIcon [string] 标题图标一 'hr-zuo',
 * @param lIcon2 [string] 标题图标二
 * @param lText [string] 左侧标题
 * @param leftstyle [object]] 左侧标题样式
 * @param leftClick [function] 左侧标题对应的回调函数

 * @param rIcon [string] 右侧图标一
 * @param rIcon2 [string] 标题图标二
 * @param rText [string] 右侧标题
 * @param rightstyle [object]] 右侧标题样式
 * @param rightClick [function] 右侧标题对应的回调函数
 * 
 *  eg:
 *  <DHeader 
 *      title={'企业宣传'} 
 *      leftClick={this.leftClick.bind(this)}
 *  />
 * leftClic对应左侧所有按钮的回调，在回调中通过e.target.className进行区分
 * 
 */
class DHeader extends Component {
	constructor(props) {
		super(props);
	}
	
	createGroupTitle = () => {
		const { groupTitle } = this.props;
		console.log(groupTitle.subtext.callback);
		return (
			<div className="group-title">
				<img width={60} src={groupTitle.src} />
				<h4>{groupTitle.text}</h4>
				<span onClick={groupTitle.subtext.callback}>{groupTitle.subtext.val}</span>
			</div>
		);
	};
	render() {
		let sessionShow = sessionStorage.getItem('showNav');
		let showNav = false;
		let groupTitleHtml = '';
		// console.log(this.props.groupTitle);
		if (sessionShow == 'true' || sessionShow == '1') {
			showNav = true;
		} else {
			showNav = false;
		}
		if (this.props.groupTitle) {
			groupTitleHtml = this.createGroupTitle();
		}
		// console.log(this.createGroupTitle())
		const {
			type = 'narrow', //narrow middle wide
			headerstyle = {},

			title = '',
			titlestyle = {},
			contentClick = () => {},

			lIcon = 'hr-zuo',
			lIcon2 = '',
			lText = '',
			leftstyle = {},
			leftClick = () => {},

			rIcon = '',
			rIcon2 = '',
			rText = '',
			rightstyle = {},
			rightClick = () => {}
		} = this.props;
		return (
			<div className={`nc-m-header ${showNav ? '' :'nc-m-header-hide'}`} style={headerstyle}>
				<div class={`h-left ${type}`} style={leftstyle} onClick={leftClick}>
					<i class={`iconfont hrfont  leftbtn1 ${lIcon}`} />
					<h4 class="lefttext">{lText}</h4>
					<i class={`iconfont hrfont leftbtn2 ${lIcon2}`} />
				</div>
				<div class={`h-middle ${type}`}>{groupTitleHtml !== '' ? groupTitleHtml : title}</div>
				<div class={`h-right ${type}`} style={rightstyle} onClick={rightClick}>
					<i class={`iconfont hrfont rightbtn1 ${rIcon}`} />
					<h4 class="righttext">{rText}</h4>
					<i class={`iconfont hrfont rightbtn2 ${rIcon2}`} />
				</div>
			</div>
		);
	}
}

export default DHeader;
