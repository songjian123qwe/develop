import CommonAction from './common'
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入折线图
import  'echarts/lib/chart/line';
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
export default class LineAction extends CommonAction{
    constructor(comp){
        super()
        this.comp = comp   
    }
    // 饼图初始化
    drawLineInit = () => {
        const {props} = this.comp
        const {lineId, lineOption, dispatch} = props
        this.lineEchart = echarts.init(document.getElementById(lineId))
        let initialOption = {
            legend: {
                type: 'plain',
                orient: 'horizontal',
                top: 'top'
            },
            xAxis: {
                type: 'category',
                data: []
            },
            yAxis: {
                type: 'value',
                minInterval:1
            },
            series: []
        }
        let options = this.deepObjectMerge(initialOption, lineOption)
        this.lineEchart.setOption(options)
        dispatch({
            type: 'compositionAnalysis/update',
            payload: {
                lineInitOption: initialOption
            }
        })
    }
    didMount = () => {
       this.drawLineInit()
    }
}