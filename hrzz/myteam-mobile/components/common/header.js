import { Component } from 'react';
import { DHeader } from '../../../public/mobile/components/index';
import './header.less';
export default class MMHeader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			a: ''
		};
	}
	backToFrom = (event) => {
		// const { from } = this.props;
		// this.props.updateState({
		// 	componentName: from.splice(from.length - 1, 1)[0],
		// 	from
		// });
		window.history.back()
	};
	render() {
		const { title, subtitle } = this.props;
		let groupTitle = {
			src: 'http://s16.sinaimg.cn/orignal/c5c63fe5te1840bdeeb1f',
			text: 'abck',
			subtext: {
				val: 'qwqere',
				callback: () => {
					console.log('callback');
				}
			}
		};
		return (
			<header className="m-header">
				<DHeader title={title} leftClick={this.backToFrom} />
				<h3 style={{ display: !subtitle && 'none' }}>{subtitle}</h3>
			</header>
		);
	}
}
