import CommonAction from './common'
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legendScroll'
export default class PieAction extends CommonAction{
    constructor(comp){
        super()
        this.comp = comp   
    }
    // 饼图初始化
    drawPieInit = () => {
        const {props} = this.comp
        const {pieId, pieOption, dispatch} = props
        this.pieEchart = echarts.init(document.getElementById(pieId))
        let initialOption = {
            tooltip: {
                trigger: 'item',
                formatter: "{b}: ({d}%)"
            },
            legend: {
                type: 'scroll',
                orient: 'horizontal',
                icon: 'circle',
                itemWidth: 10,
                itemHeight: 10,
                itemGap: 5,
                bottom: 0,
                data:[]
            },
            series: [
                {
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '15',
                                fontWeight: 'bold'
                            },
                            formatter: (params) => {
                                let parmasName = params.name
                                if (parmasName.length > 7) {
                                    parmasName = parmasName.substring(0, 7) + '...'
                                }
                                return parmasName
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[
                        
                    ]
                }
            ]
        }
        let options = this.deepObjectMerge(initialOption, pieOption)
        this.pieEchart.setOption(options)
        dispatch({
            type: 'compositionAnalysis/update',
            payload: {
                pieInitOption: initialOption
            }
        })
    }
    didMount = () => {
       this.drawPieInit()
    }
}