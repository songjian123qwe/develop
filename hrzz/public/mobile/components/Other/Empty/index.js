import React, { Component } from 'react';
import './index.less';
import imgurl from '../../../static/images/empty.png';

/**
 * 无数据展示，图片类型、字体库类型
 * 
 * @param src [string] 图片路径，要外网地址
 * @param describe [string] 提示信息
 * 
 * <DEmpty :describe="为空说明" ></DEmpty>
 */
class DEmpty extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { describe = '暂无数据', src = imgurl, style } = this.props;
		return (
			<div class="empty-group" style={style}>
				<div>
					<img src={src} />
					<p>{describe}</p>
				</div>
			</div>
		);
	}
}

export default DEmpty;
