import { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/legendScroll';
import 'echarts/lib/component/title';
import Empty from '../../../public/mobile/components/Other/Empty/index';
// console.log(echarts);
export default class MMHeader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			color: [
				'#c23531',
				'#2f4554',
				'#61a0a8',
				'#d48265',
				'#91c7ae',
				'#749f83',
				'#ca8622',
				'#bda29a',
				'#6e7074',
				'#546570',
				'#c4ccd3'
			],
			eduEmpty: false, // 学历数据空
			ageEmpty: false, // 年龄数据空
			postEmpty: false, // 职位数据空
			jobEmpty: false, // 职级数据空
			corpEmpty: false // 工作年限数据空
		};
	}
	componentDidUpdate(prevProps, prevState, snapshot) {
		const { drawData } = this.props;
		if (prevProps.drawData && !Object.is(prevProps.drawData, drawData)) {
			this.getQueryGroupStructure();
		}
	}
	getQueryGroupStructure = () => {
		const { drawData } = this.props;
		if (JSON.stringify(drawData) === '{}') return;
		this.drawEdu(drawData.eduStructure);
		this.drawAge(drawData.ageStructure);
		this.drawPost(drawData.postStructure);
		this.drawJobgrade(drawData.jobGradeStructure);
		this.drawAgeOfCorpWork(drawData.corpWorkageStructure, drawData.workageStructure);
	};
	drawEdu = (data) => {
		if (!Array.isArray(data)) {
			throw 'Data Type Error!';
		} else {
			const { json } = this.props;
			let _color_ = this.state.color;
			let title = json['hrzzmb-000076']; // 学历分布
			let _data_ = data.filter((item, index) => item.cnt !== '0').map((item, index) => {
				return {
					value: item.cnt,
					name: item.name
				};
			});
			if (_data_.length) {
				this.setState(
					{
						eduEmpty: false
					},
					() => {
						let dom = document.querySelector('.chart-edu .draw');
						let chart = echarts.init(dom);
						chart.setOption({
							title: {
								text: title
							},
							legend: {
								type: 'scroll',
								selectedMode: false,
								bottom: 0
							},
							color: _color_,
							series: [
								{
									name: title,
									type: 'pie',
									radius: [ '30%', '50%' ],
									avoidLabelOverlap: false,
									label: {
										normal: {
											show: false,
											position: 'center',
											formatter: '{d}% {c}人 \n{hr|}\n {b|{b} } ',
											rich: {
												b: {
													lineHeight: 20,
													fontWeight: 'bold'
												},
												hr: {
													borderColor: '#aaa',
													width: '100%',
													borderWidth: 0.5,
													height: 0,
													align: 'right'
												}
											}
										},
										emphasis: {
											show: true
										}
									},
									labelLine: {
										normal: {
											show: false
										}
									},
									data: _data_
								}
							]
						});
					}
				);
			} else {
				this.setState({
					eduEmpty: true
				});
			}
		}
	};
	drawAge = (data) => {
		if (JSON.stringify(data) !== '{}') {
			this.setState(
				{
					ageEmpty: false
				},
				() => {
					const { json } = this.props;
					let dom = document.querySelector('.chart-age .draw');
					let chart = echarts.init(dom);
					let _color_ = [ '#98ACB4', '#00CDB5' ];
					let title = json['hrzzmb-000077']; // 年龄分布
					let _data_ = [];
					for (let key in data) {
						let _arr_key_ = key.split('_');
						let _res_ = {};
						if (_arr_key_[0].replace(/i/, '') == 0) {
							_res_ = {
								value: data[key],
								name: `${json['hrzzmb-000078']}${_arr_key_[1]}` // 小于
							};
						} else if (_arr_key_[1].replace(/i/, '') == 0) {
							_res_ = {
								value: data[key],
								name: `${json['hrzzmb-000079']}${_arr_key_[0].replace(/i/, '')}` // 大于
							};
						} else {
							_res_ = {
								value: data[key],
								name: `${_arr_key_[0].replace(/i/, '')}-${_arr_key_[1]}`
							};
						}
						_data_.push(_res_);
					}
					_data_.reverse();
					chart.setOption({
						title: {
							text: title
						},
						grid: {
							left: '10%',
							containLabel: true
						},
						xAxis: {
							show: false
						},
						yAxis: {
							type: 'category',
							inverse: true,
							data: _data_.map((item) => item.name)
						},
						series: [
							{
								name: title,
								type: 'bar',
								barMaxWidth: 40,
								data: _data_.map((item, index) => {
									return {
										value: item.value,
										label: {
											show: item.value != 0 ? true : false
										},
										itemStyle: {
											color: _color_[index % 2]
										}
									};
								})
							}
						]
					});
				}
			);
		} else {
			this.setState({
				ageEmpty: true
			});
		}
	};
	drawPost = (data) => {
		if (!Array.isArray(data)) {
			throw 'Data Type Error!';
		} else {
			const { json } = this.props;
			let _color_ = this.state.color;
			let title = json['hrzzmb-000120']; // 职位分布
			let _data_ = data.filter((item, index) => item.cnt !== '0').map((item, index) => {
				item.name = item.name.length > 7 ? item.name.substring(0, 7) + '...' : item.name;
				return {
					value: item.cnt,
					name: item.name
				};
			});
			if (_data_.length) {
				this.setState(
					{
						postEmpty: false
					},
					() => {
						let dom = document.querySelector('.chart-post .draw');
						let chart = echarts.init(dom);
						chart.setOption({
							title: {
								text: title
							},
							legend: {
								type: 'scroll',
								selectedMode: false,
								bottom: 0
							},
							color: _color_,
							series: [
								{
									name: title,
									type: 'pie',
									radius: [ '30%', '50%' ],
									avoidLabelOverlap: false,
									label: {
										normal: {
											show: false,
											position: 'center',
											formatter: '{d}% {c}人 \n{hr|}\n {b|{b} } ',
											rich: {
												b: {
													lineHeight: 20,
													fontWeight: 'bold'
												},
												hr: {
													borderColor: '#aaa',
													width: '100%',
													borderWidth: 0.5,
													height: 0,
													align: 'right'
												}
											}
										},
										emphasis: {
											show: true
										}
									},
									labelLine: {
										normal: {
											show: false
										}
									},
									data: _data_
								}
							]
						});
					}
				);
			} else {
				this.setState({
					postEmpty: true
				});
			}
		}
	};
	drawJobgrade = (data) => {
		if (!Array.isArray(data)) {
			throw 'Data Type Error!';
		} else {
			let _data_ = data.filter((item) => item.cnt !== '0');
			if (_data_.length) {
				this.setState(
					{
						jobEmpty: false
					},
					() => {
						const { json } = this.props;
						let dom = document.querySelector('.chart-jobgrade .draw');
						let chart = echarts.init(dom);
						let _color_ = [ '#98ACB4', '#FFBB37' ];
						let title = json['hrzzmb-000081']; // 职级分布

						chart.setOption({
							title: {
								text: title
							},
							xAxis: {
								type: 'category',
								inverse: true,
								data: _data_.map((item) => item.jobrankname)
							},
							yAxis: {
								show: false
							},
							series: [
								{
									name: title,
									type: 'bar',
									barMaxWidth: 40,
									data: _data_.map((item, index) => {
										return {
											value: item.cnt,
											label: {
												show: item.cnt != 0 ? true : false
											},
											itemStyle: {
												color: _color_[index % 2]
											}
										};
									})
								}
							]
						});
					}
				);
			} else {
				this.setState({
					jobEmpty: true
				});
			}
		}
	};
	drawAgeOfCorpWork = (dtcorp, dtwork) => {
		if (JSON.stringify(dtcorp) === '{}' && JSON.stringify(dtwork) === '{}') {
			this.setState({
				corpEmpty: true
			});
		} else {
			this.setState(
				{
					corpEmpty: false
				},
				() => {
					const { json } = this.props;
					let dom = document.querySelector('.chart-ageofcorpwork .draw');
					let chart = echarts.init(dom);
					let _color_ = [ '#FF7F7A', '#98ACB4' ];
					let title = json['hrzzmb-000082']; // 工作年限分布
					let _data_corp_ = [],
						_data_work_ = [];
					for (let key in dtcorp) {
						// if (!key.includes('_')) key = key + '_';
						let _arr_key_ = key.split('_');
						let _res_ = {};
						if (_arr_key_[0].replace(/i/, '') == 0) {
							_res_ = {
								value: dtcorp[key],
								name: `<${_arr_key_[1]}`
							};
						} else if (!_arr_key_[1]) {
							_res_ = {
								value: dtcorp[key],
								name: `>${_arr_key_[0].replace(/i/, '')}`
							};
						} else {
							_res_ = {
								value: dtcorp[key],
								name: `${_arr_key_[0].replace(/i/, '')}-${_arr_key_[1]}`
							};
						}
						_res_.label = {
							show: dtcorp[key] != 0 ? true : false
						};
						_data_corp_.push(_res_);
					}
					for (let key in dtwork) {
						// if (!key.includes('_')) key = key + '_0';
						let _arr_key_ = key.split('_');
						let _res_ = {};
						if (_arr_key_[0].replace(/i/, '') == 0) {
							_res_ = {
								value: dtwork[key],
								name: `<${_arr_key_[1]}`
							};
						} else if (!_arr_key_[1]) {
							_res_ = {
								value: dtwork[key],
								name: `>${_arr_key_[0].replace(/i/, '')}`
							};
						} else {
							_res_ = {
								value: dtwork[key],
								name: `${_arr_key_[0].replace(/i/, '')}-${_arr_key_[1]}`
							};
						}
						_res_.label = {
							show: dtwork[key] != 0 ? true : false
						};
						_data_work_.push(_res_);
					}
					_data_corp_.reverse();
					_data_work_.reverse();
					chart.setOption({
						color: _color_,
						title: {
							text: title,
							textStyle: {
								width: '50%'
							}
						},
						legend: {
							bottom: 0,
							data: [ json['hrzzmb-000083'], json['hrzzmb-000084'] ] // 司龄分布 工龄分布
						},
						xAxis: {
							type: 'category',
							inverse: true,
							data: _data_corp_.length
								? _data_corp_.map((item) => item.name)
								: _data_work_.map((item) => item.name)
						},
						yAxis: {
							show: false
						},
						series: [
							{
								name: json['hrzzmb-000083'], // 司龄分布
								type: 'bar',
								barMaxWidth: 40,
								data: _data_corp_
							},
							{
								name: json['hrzzmb-000084'], // 工龄分布
								type: 'bar',
								barMaxWidth: 40,
								data: _data_work_
							}
						]
					});
				}
			);
		}
	};
	render() {
		const { json } = this.props;
		const { ageEmpty, eduEmpty, jobEmpty, postEmpty, corpEmpty } = this.state;
		let _w_ = screen.width - 68,
			_h_ = document.querySelector('.chart') ? document.querySelector('.chart').clientHeight - 16 : 0;
		return (
			<section className="m-body">
				<div className="chart chart-edu">
					<div
						className="draw"
						style={{ width: `${_w_}px`, height: `${_h_}px`, display: !eduEmpty ? 'block' : 'none' }}
					/>
					<Empty
						style={{ display: eduEmpty ? 'flex' : 'none' }}
						describe={json['hrzzmb-000076'] + json['hrzzmb-000086']}
					/>
				</div>
				<div className="chart chart-age">
					<div
						className="draw"
						style={{ width: `${_w_}px`, height: `${_h_}px`, display: !ageEmpty ? 'block' : 'none' }}
					/>
					<Empty
						style={{ display: ageEmpty ? 'flex' : 'none' }}
						describe={json['hrzzmb-000077'] + json['hrzzmb-000086']}
					/>
				</div>
				<div className="chart chart-post">
					<div
						className="draw"
						style={{ width: `${_w_}px`, height: `${_h_}px`, display: !postEmpty ? 'block' : 'none' }}
					/>
					<Empty
						style={{ display: postEmpty ? 'flex' : 'none' }}
						describe={json['hrzzmb-000080'] + json['hrzzmb-000086']}
					/>
				</div>
				<div className="chart chart-jobgrade">
					<div
						className="draw"
						style={{ width: `${_w_}px`, height: `${_h_}px`, display: !jobEmpty ? 'block' : 'none' }}
					/>
					<Empty
						style={{ display: jobEmpty ? 'flex' : 'none' }}
						describe={json['hrzzmb-000081'] + json['hrzzmb-000086']}
					/>
				</div>
				<div className="chart chart-ageofcorpwork">
					<div
						className="draw"
						style={{ width: `${_w_}px`, height: `${_h_}px`, display: !corpEmpty ? 'block' : 'none' }}
					/>
					<Empty
						style={{ display: corpEmpty ? 'flex' : 'none' }}
						describe={json['hrzzmb-000082'] + json['hrzzmb-000086']}
					/>
				</div>
			</section>
		);
	}
}
