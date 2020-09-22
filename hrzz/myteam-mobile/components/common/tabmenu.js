import { Component } from 'react';
import { Tabs, WhiteSpace } from 'antd-mobile';

export default class MMTabmenu extends Component {
	constructor(props) {
		super(props);
	}
	onClickTab = (tab) => {
		this.props.updateState(
			{
				pk_dept: tab.refpk
			},
			() => {
				this.props.getData();
			}
		);
	};

	render() {
		const { deptArr } = this.props;
		return (
			<div>
				<WhiteSpace />
				<Tabs
					tabs={deptArr}
					renderTabBar={(props) => <Tabs.DefaultTabBar {...props} page={3} />}
					onTabClick={this.onClickTab}
					tabBarUnderlineStyle={{ border: '2px solid #E14C46' }}
					tabBarActiveTextColor="#E14C46"
				/>
				<WhiteSpace />
			</div>
		);
	}
}
