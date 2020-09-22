import CommonAction from './common';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
export default class BarAction extends CommonAction {
	constructor(comp) {
		super();
		this.comp = comp;
	}
	// 柱状图初始化
	drawBarChart = () => {
		const { props } = this.comp;
		const { barId, barOption, compositionAnalysis, dispatch, title } = props;
		const { json } = compositionAnalysis;
		this.barEchart = echarts.init(document.getElementById(barId));
		let initialOption = {
			title: {
				text: title // 员工类型构成
			},
			tooltip: {
				trigger: 'axis',
				position: function(point, params, dom, rect, size) {
					// 固定在顶部
					return [ point[0], 0 ];
				},
				showDelay: 0, // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
				axisPointer: {
					type: 'none',
					label: {
						color: 'red'
					}
				}
			},
			xAxis: {
				minInterval: 1,
				data: [],
				axisLabel: {
					inside: false,
					rotate: 40,
					textStyle: {
						color: '#999'
					}
				},
				axisTick: {
					show: false
				},
				axisLine: {
					show: false
				},
				z: 10
			},
			yAxis: {
				minInterval: 1,
				axisLine: {
					show: false
				},
				axisTick: {
					show: false
				},
				axisLabel: {
					textStyle: {
						color: '#999'
					}
				}
			},
			grid: {
				left: 50
			},
			dataZoom: [
				{
					type: 'inside'
				}
			],
			series: [
				{
					type: 'bar',
					barWidth: 10,
					itemStyle: {
						normal: {
							barBorderRadius: [ 10, 10, 10, 10 ],
							color: '#22D8F4'
						}
					},
					data: []
				}
			]
		};
		let options = this.deepObjectMerge(initialOption, barOption);
		console.log(options);
		this.barEchart.setOption(options);
		dispatch({
			type: 'compositionAnalysis/update',
			payload: {
				barInitOption: initialOption
			}
		});
	};
	didMount = () => {
		this.drawBarChart();
	};
	// didUpdate = () => {
	// 	const { props } = this.comp;
	// 	const { barId, barOption, title } = props;
	// 	let initialOption = {
	// 		title: {
	// 			text: title // 员工类型构成
	// 		},
	// 		tooltip: {
	// 			trigger: 'axis',
	// 			position: function(point, params, dom, rect, size) {
	// 				// 固定在顶部
	// 				return [ point[0], 0 ];
	// 			},
	// 			showDelay: 0, // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
	// 			axisPointer: {
	// 				type: 'none',
	// 				label: {
	// 					color: 'red'
	// 				}
	// 			}
	// 		},
	// 		xAxis: {
	// 			minInterval: 1,
	// 			data: [],
	// 			axisLabel: {
	// 				inside: false,
	// 				rotate: 40,
	// 				textStyle: {
	// 					color: '#999'
	// 				}
	// 			},
	// 			axisTick: {
	// 				show: false
	// 			},
	// 			axisLine: {
	// 				show: false
	// 			},
	// 			z: 10
	// 		},
	// 		yAxis: {
	// 			minInterval: 1,
	// 			axisLine: {
	// 				show: false
	// 			},
	// 			axisTick: {
	// 				show: false
	// 			},
	// 			axisLabel: {
	// 				textStyle: {
	// 					color: '#999'
	// 				}
	// 			}
	// 		},
	// 		grid: {
	// 			left: 50
	// 		},
	// 		dataZoom: [
	// 			{
	// 				type: 'inside'
	// 			}
	// 		],
	// 		series: [
	// 			{
	// 				type: 'bar',
	// 				barWidth: 10,
	// 				itemStyle: {
	// 					normal: {
	// 						barBorderRadius: [ 10, 10, 10, 10 ],
	// 						color: '#22D8F4'
	// 					}
	// 				},
	// 				data: []
	// 			}
	// 		]
	// 	};

	// 	this.barEchart = echarts.init(document.getElementById(barId));
	// 	let options = this.deepObjectMerge(initialOption, barOption);
	// 	this.barEchart.setOption(options);
	// };
}
