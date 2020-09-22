import {Component} from 'react'
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入折线图
import  'echarts/lib/chart/line';
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'
import ajax from '../../../../../public/mobile/utils/ajax';
import './index.less'
import {Toast} from 'antd-mobile'
import Empty from '../../../../../public/mobile/components/Other/Empty/index'
class LineChart extends Component{
    constructor (props) {
        super(props)
        this.state = {
            xAxisData: [],
            entrySeriesData: [],
            dimissionSeriesData: [],
            xAxisDataHalf: [],
            entrySeriesDataHalf: [],
            dimissionSeriesDataHalf: [],
            changeSeriesData: [],
            changeSeriesDataHalf: [],
            totalSeriseData: [],
            totalSeriseDataHalf: [],
            json: {},
            noData: false
        }
    }
    // 团队人事变动
    queryGroupTrendAction (cuserid, pk_dept, json) {
        this.setState({
            json
        })
        ajax({
			url: '/nccloud/hrzz/deptreport/QueryGroupTrendAction.do',
			data: {
                cuserid,
                pk_dept
            },
            info: {
                appcode: '60651020'
            },
			success: (result) => {
                Toast.hide()
				if (result.success) {
                    if (!result.data) {
                        this.setState({
                            noData: true
                        })
                        return false
                    } else {
                        this.setState({
                            noData: false
                        })
                    }
                    let  data = result.data
                    if (data.dimission.length === 0 && data.entry.length === 0 && data.change.length === 0 && data.total.length === 0) {
                        this.setState({
                            noData: true
                        })
                        return false
                    } else {
                        this.setState({
                            noData: false
                        })
                    }
					let monthObj = {
                        '01': json['hrzzmb-000059'],
                        '02': json['hrzzmb-000060'],
                        '03': json['hrzzmb-000061'],
                        '04': json['hrzzmb-000062'],
                        '05': json['hrzzmb-000063'],
                        '06': json['hrzzmb-000064'],
                        '07': json['hrzzmb-000065'],
                        '08': json['hrzzmb-000066'],
                        '09': json['hrzzmb-000067'],
                        '10': json['hrzzmb-000068'],
                        '11': json['hrzzmb-000069'],
                        '12': json['hrzzmb-000070']
                    }
                    let xAxisData = []
                    let entrySeriesData = []
                    let dimissionSeriesData = []
                    let changeSeriesData = []
                    let totalSeriseData = []
                    let dimission = data.dimission.reverse() // 离职数据
                    let entry = data.entry.reverse() // 入职数据
                    let change = data.change.reverse() // 调用数据
                    let total = data.total.reverse() // 总计数据
                    let entryLen = entry.length
                    for (let c =0; c < entryLen; c++) {
                        let entryItem = entry[c]
                        let month = entryItem.month
                        let count = entryItem.count
                        let dimissionItem = dimission[c]
                        let dimissionCount = dimissionItem.count
                        let changeItem = change[c]
                        let changeCount = changeItem.count
                        let totalItem = total[c]
                        let totalCount = totalItem.count
                        xAxisData.push(monthObj[month])
                        entrySeriesData.push(Number(count))
                        dimissionSeriesData.push(Number(dimissionCount))
                        changeSeriesData.push(Number(changeCount))
                        totalSeriseData.push(Number(totalCount))
                    }
                    let xAxisDataHalf = xAxisData.slice(6)
                    let entrySeriesDataHalf = entrySeriesData.slice(6)
                    let dimissionSeriesDataHalf = dimissionSeriesData.slice(6)
                    let changeSeriesDataHalf = changeSeriesData.slice(6)
                    let totalSeriseDataHalf = totalSeriseData.slice(6)
                    this.drawLineChart(xAxisDataHalf, entrySeriesDataHalf, dimissionSeriesDataHalf, changeSeriesDataHalf, totalSeriseDataHalf, json)
                    this.setState({
                        xAxisData,
                        entrySeriesData,
                        dimissionSeriesData,
                        xAxisDataHalf,
                        entrySeriesDataHalf,
                        dimissionSeriesDataHalf,
                        changeSeriesData,
                        changeSeriesDataHalf,
                        totalSeriseData,
                        totalSeriseDataHalf
                    })
				} else {
                    Toast.hide()
                }
            },
            error: (err) => {
                Toast.hide()
            }
		});
    }
    drawLineChart (xAxisData, entrySeriesData, dimissionSeriesData, changeSeriesData, totalSeriseData, json) {
        var lineEchart = echarts.init(document.querySelector('.lineChart'))
        window.onresize = lineEchart.resize
        let initialOption = {
            legend: {
                type: 'plain',
                orient: 'horizontal',
                top: 'top',
                itemWith: 8,
                itemHeight:8,
                itemGap: 10,
                data: [
                    {
                        name: json['hrzzmb-000071'], //入职
                        icon: 'circle'
                    },
                    {
                        name: json['hrzzmb-000072'], // 离职
                        icon: 'circle'
                    },
                    {
                        name: json['hrzzmb-000073'], // 调动
                        icon: 'circle'
                    },
                    {
                        name: json['hrzzmb-000074'], // 在职人数
                        icon: 'circle'
                    }
                ]
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                data: xAxisData
            },
            grid: {
                left: 40
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: json['hrzzmb-000071'], // 入职
                    data: entrySeriesData,
                    type: 'line'
                },
                {
                    name: json['hrzzmb-000072'], // 离职
                    data: dimissionSeriesData,
                    type: 'line'
                },
                {
                    name: json['hrzzmb-000073'], // 调动
                    data: changeSeriesData,
                    type: 'line'
                },
                {
                    name: json['hrzzmb-000074'], // 在职人数
                    data: totalSeriseData,
                    type: 'line'
                }
            ]
        }
        lineEchart.setOption(initialOption)
    }
    // 重新初始化折线图
    resetInitLineChart (num) {
        const {
            xAxisDataHalf, 
            entrySeriesDataHalf, 
            dimissionSeriesDataHalf,
            xAxisData,
            entrySeriesData,
            dimissionSeriesData,
            changeSeriesData,
            changeSeriesDataHalf,
            totalSeriseData,
            totalSeriseDataHalf,
            json
        } = this.state
        if (num === 6) {
            this.drawLineChart(xAxisDataHalf, entrySeriesDataHalf, dimissionSeriesDataHalf, changeSeriesDataHalf, totalSeriseDataHalf, json)
        } else {
            this.drawLineChart(xAxisData, entrySeriesData, dimissionSeriesData, changeSeriesData, totalSeriseData, json)
        }
    }
    render () {
        const {noData} = this.state
        const {json} = this.props
        let chartWidth = screen.width - 30
        return (
            <div className="lineChartCon" style={{width: `${chartWidth}px`, height: '7rem'}}>
                <div style={{width: `${chartWidth}px`, height: '7rem', display: noData ? '' : 'none'}}>
                    <Empty describe={json['hrzzmb-000086']}/>
                </div>  
                <div className="lineChart" style={{width: `${chartWidth}px`, height: '7rem', display: noData ? 'none' : ''}}>

                </div>
            </div>
        )
    }
}
export default LineChart