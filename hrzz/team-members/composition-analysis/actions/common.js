import CommonAction from '../../../../hrpub/common/actions/index'
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
let dataObj = {

}
export default class CompositionAction extends CommonAction{
    constructor(comp){
        super()
        this.comp = comp   
    }
    // 查询人员信息
    querypersonsettings = async () => {
        const {props} = this.comp
        const {dispatch} = props
        let personRes = await dispatch({
            type: 'compositionAnalysis/querypersonsettings',
            payload: {
                postData: {
                    rqCode: 'querypersonsettings'
                }
            }
        })
        if (personRes.success && personRes.data) {
            let cuserid = personRes.data.userId // personRes.data.userId 1001AB100000000007XS
            dispatch({
                type: 'compositionAnalysis/update',
                payload: {
                    cuserid
                }
            })
            this.queryStaffStaticAction(cuserid, '')
        }
    }
    // 查询部门构成分析
    queryStaffStaticAction = async (cuserid, pk_dept, isRefresh) => {
        const {props} = this.comp
        const {dispatch} = props
        let staffRes = await dispatch({
            type: 'compositionAnalysis/queryStaffStaticAction',
            payload: {
                postData: {
                    cuserid,
                    pk_dept
                }
            }
        })
        if (staffRes.success && staffRes.data) {
            dispatch({
                type: 'compositionAnalysis/update',
                payload: {
                    compositionInfo: staffRes.data
                }
            })
            this.queryPsnTypeStructureAction(cuserid, pk_dept, isRefresh)
        }
    }
    deepObjectMerge = (FirstOBJ, SecondOBJ) => { // 深度合并对象
        for (var key in SecondOBJ) {
            FirstOBJ[key] = FirstOBJ[key] && FirstOBJ[key].toString() === "[object Object]" ?
                this.deepObjectMerge(FirstOBJ[key], SecondOBJ[key]) : FirstOBJ[key] = SecondOBJ[key];
        }
        return FirstOBJ;
    }
    // 返回员工类型构成图表的数据
    queryPsnTypeStructureAction = async (cuserid, pk_dept, isRefresh) => {
        const {props} = this.comp
        const {dispatch, compositionAnalysis} = props
        const {json} = compositionAnalysis
        let psnTypeRes = await dispatch({
            type: 'compositionAnalysis/queryPsnTypeStructureAction',
            payload: {
                postData: {
                    cuserid,
                    pk_dept
                }
            }
        })
        if (psnTypeRes.success && psnTypeRes.data) {
            let genderStructure = psnTypeRes.data.genderStructure // 性别分布数据
            let psnclStructure = psnTypeRes.data.psnclStructure // 人员类别分布数据
            let psnclStructureLen = psnclStructure.length
            let genderStructureLen = genderStructure.length
            let staffXAxisData = []
            let staffSeriesData = []
            let sexLegendData = []
            let sexSeriesData = []
            // 循环人员类别分布数据
            for (let a=0; a < psnclStructureLen; a++) {
                staffXAxisData.push(psnclStructure[a].name)
                staffSeriesData.push(Number(psnclStructure[a].cnt))
            }
            // 循环性别分布数据
            for (let b=0; b < genderStructureLen; b++) {
                let name = genderStructure[b].sex === "1" ? json['hrzzpc-000033'] : json['hrzzpc-000034'] // 男女
                let value = Number(genderStructure[b].cnt)
                sexLegendData.push({
                    name
                })
                sexSeriesData.push({value,name})
            }
            // 重置员工类型柱状图数据
            let staffStyleOption = {
                xAxis: {
                    data: staffXAxisData
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: staffSeriesData
                    }
                ]
            }
            if (psnclStructureLen > 0) {
                dispatch({
                    type: 'compositionAnalysis/update',
                    payload: {
                        staffStyleOption,
                        staffIsEmpty: false
                    }
                })
                dataObj.staffIsEmpty = false
            } else {
                dispatch({
                    type: 'compositionAnalysis/update',
                    payload: {
                        staffIsEmpty: true
                    }
                })
                dataObj.staffIsEmpty = true
            }
            // 重置性别比例分布图数据
            let sexProportionOption = {
                title: {
                    text: json['hrzzpc-000035'] // 性别占比
                },
                legend: {
                    data: sexLegendData
                },
                series: [
                    {
                        data: sexSeriesData
                    }
                ]
            }
            if (genderStructureLen > 0) {
                dispatch({
                    type: 'compositionAnalysis/update',
                    payload: {
                        sexProportionOption,
                        sexProportionEmpty: false
                    }
                })
                dataObj.sexProportionEmpty = false
            } else {
                dispatch({
                    type: 'compositionAnalysis/update',
                    payload: {
                        sexProportionEmpty: true
                    }
                })
                dataObj.sexProportionEmpty = true
            }
            this.queryGroupTrendAction(cuserid, pk_dept, isRefresh)
            dataObj.staffStyleOption = staffStyleOption
            dataObj.sexProportionOption = sexProportionOption
        }
    }
    // 团队人事变动
    queryGroupTrendAction = async (cuserid, pk_dept, isRefresh) => {
        const {props} = this.comp
        const {dispatch, compositionAnalysis} = props
        const {json} = compositionAnalysis
        let hrRes = await dispatch({
            type: 'compositionAnalysis/queryGroupTrendAction',
            payload: {
                postData: {
                    cuserid,
                    pk_dept
                }
            }
        })
        if (hrRes.success && hrRes.data) {
            let monthObj = {
                '01': json['hrzzpc-000036'], // 1月 ~ 12月
                '02': json['hrzzpc-000037'],
                '03': json['hrzzpc-000038'],
                '04': json['hrzzpc-000039'],
                '05': json['hrzzpc-000040'],
                '06': json['hrzzpc-000041'],
                '07': json['hrzzpc-000042'],
                '08': json['hrzzpc-000043'],
                '09': json['hrzzpc-000044'],
                '10': json['hrzzpc-000045'],
                '11': json['hrzzpc-000046'],
                '12': json['hrzzpc-000047']
            }
            let hrChangeXAxisData = []
            let entrySeriesData = []
            let dimissionSeriesData = []
            let  data = hrRes.data
            let dimission = data.dimission.reverse() // 离职数据
            let entry = data.entry.reverse() // 入职数据
            let entryLen = entry.length
            let _color_ = ['#c23531', '#2f4554']
            for (let c =0; c < entryLen; c++) {
                let entryItem = entry[c]
                let month = entryItem.month
                let count = entryItem.count
                let dimissionItem = dimission[c]
                let dimissionCount = dimissionItem.count
                hrChangeXAxisData.push(monthObj[month])
                entrySeriesData.push(Number(count))
                dimissionSeriesData.push(Number(dimissionCount))
            }
            let hrChangeOption = {
                title: {
                    text: json['hrzzpc-000048'] // 每月人事变动
                },
                color: _color_,
                tooltip: {
                    trigger: 'item',
                    textStyle: {
                        color: '#fff',
                        align: 'center'
                    },                   
                    formatter: (params, tickit, callback)=>{
                        return `${params.seriesName}<br/><span style="color:'#fff'">${params.value}</span>`
                    },
                    extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);'
                },
                legend: {
                    data: [
                        {
                            name: json['hrzzpc-000049'], // 入职人数
                            icon: 'circle'
                        },
                        {
                            name: json['hrzzpc-000050'], // 离职人数
                            icon: 'circle'
                        }
                    ]
                },
                xAxis: {
                    data: hrChangeXAxisData
                },
                series: [
                    {
                        name: json['hrzzpc-000049'], // 入职人数
                        data: entrySeriesData,
                        type: 'line',
                        smooth: true
                    },
                    {
                        name: json['hrzzpc-000050'], // 离职人数
                        data: dimissionSeriesData,
                        type: 'line',
                        smooth: true
                    }
                ]
            }
            if (entryLen > 0) {
                dispatch({
                    type: 'compositionAnalysis/update',
                    payload: {
                        hrChangeOption,
                        hrChangeEmpty: false
                    }
                })
                dataObj.hrChangeEmpty = false
            } else {
                dispatch({
                    hrChangeEmpty: true
                })
                dataObj.hrChangeEmpty = true
            }
            this.queryGroupStructureAction(cuserid, pk_dept, isRefresh)
            dataObj.hrChangeOption = hrChangeOption
        }
    }
    // 团队画像
    queryGroupStructureAction = async (cuserid, pk_dept, isRefresh) => {
        const {props} = this.comp
        const {dispatch, compositionAnalysis} = props
        const {json} = compositionAnalysis
        let groupRes = await dispatch({
            type: 'compositionAnalysis/queryGroupStructureAction',
            payload: {
                postData: {
                    cuserid,
                    pk_dept
                }
            }
        })
        if (groupRes.success && groupRes.data) {
            let data = groupRes.data
            let ageStructure = data.ageStructure // 年龄分布
            let corpWorkageStructure = data.corpWorkageStructure // 司龄分布
            let eduStructure = data.eduStructure // 学历分布
            let jobGradeStructure = data.jobGradeStructure // 职级分布
            let postStructure = data.postStructure // 职位分布
            let workageStructure = data.workageStructure // 工龄分布
            let eduStructureLen = eduStructure.length
            let jobGradeStructureLen = jobGradeStructure.length
            let postStructureLen = postStructure.length
            //年龄分布
            let ageStructureYAxisData = []
            let ageStructureSeriesData = []
            for (let ageKey in ageStructure) {
                switch (ageKey) {
                    case 'i0_25':
                        ageStructureYAxisData.push(json['hrzzpc-000051']) // 25以下
                        break;
                    case 'i26_30':
                        ageStructureYAxisData.push('26-30')
                        break;
                    case 'i31_45':
                        ageStructureYAxisData.push('31-45')
                        break;
                    case 'i46_55':
                        ageStructureYAxisData.push('46-55')
                        break;
                    case 'i55_':
                        ageStructureYAxisData.push(json['hrzzpc-000052']) // 56以上
                        break;
                    default: break;
                }
                ageStructureSeriesData.push(Number(ageStructure[ageKey]))
            }
            let ageStructureOption = {
                title: {
                    text: json['hrzzpc-000053'] // 年龄分布
                },
                xAxis: {
                    type: 'value'
                },
                yAxis: {
                    type: 'category',
                    data: ageStructureYAxisData,
                    axisLabel: {
                        formatter: function (value, index) {
                            return value
                        }
                    }
                },
                series: [
                    {
                        data: ageStructureSeriesData
                    }
                ]
            }
            // 司龄分布
            let corpWorkageYAxisData = []
            let corpWorkageSeriesData = []
            for (let corpWorkageKey in corpWorkageStructure) {
                switch (corpWorkageKey) {
                    case 'i0_1':
                        corpWorkageYAxisData.push('1')
                        break;
                    case 'i1_3':
                        corpWorkageYAxisData.push('1-3')
                        break;
                    case 'i3_5':
                        corpWorkageYAxisData.push('3-5')
                        break;
                    case 'i5_10':
                        corpWorkageYAxisData.push('5-10')
                        break;
                    case 'i10_20':
                        corpWorkageYAxisData.push('10-20')
                        break;
                    case 'i20':
                        corpWorkageYAxisData.push('20')
                        break;
                    default: break;
                }
                corpWorkageSeriesData.push(Number(corpWorkageStructure[corpWorkageKey]))
            }
            let corpWorkageStructureOption = {
                title: {
                    text: json['hrzzpc-000054'] // 司龄分布
                },
                xAxis: {
                    type: 'value'
                },
                yAxis: {
                    type: 'category',
                    data: corpWorkageYAxisData
                },
                series: [
                    {
                        data: corpWorkageSeriesData
                    }
                ]
            }
            // 学历分布
            let eduStructureLegendData = []
            let eduStructureSeriesData = []
            for (let g = 0; g < eduStructureLen; g++) {
                let eduStructureItem = eduStructure[g]
                eduStructureLegendData.push({
                    name: eduStructureItem.name
                })
                eduStructureSeriesData.push({
                    name: eduStructureItem.name,
                    value: Number(eduStructureItem.cnt)
                })
            }
            let eduStructureOption = {
                title: {
                    text: json['hrzzpc-000055'] // 学历分布
                },
                legend: {
                    data: eduStructureLegendData
                },
                series: [
                    {
                        data: eduStructureSeriesData
                    }
                ]
            }
            /** 职级分布*/
            let jobGradeLegendData = []
            let jobGradeSeriesData = []
            for (let d = 0; d < jobGradeStructureLen; d++) {
                let jobGradeStructureItem = jobGradeStructure[d]
                jobGradeLegendData.push({
                    name: jobGradeStructureItem.jobrankname
                })
                jobGradeSeriesData.push({
                    name: jobGradeStructureItem.jobrankname,
                    value: Number(jobGradeStructureItem.cnt)

                })
            }
            let jobGradeStructureOption = {
                title: {
                    text: json['hrzzpc-000056'] // 职级分布
                },
                legend: {
                    data: jobGradeLegendData
                },
                series: [
                    {
                        data: jobGradeSeriesData
                    }
                ]
            }
            // 职位分布
            let postStructureLegendData = []
            let postStructureSeriesData = []
            for (let f = 0; f < postStructureLen; f++) {
                let postStructureItem = postStructure[f]
                postStructureLegendData.push({
                    name: postStructureItem.name
                })
                postStructureSeriesData.push({
                    name: postStructureItem.name,
                    value: Number(postStructureItem.cnt)
                })
            }
            let postStructureOption = {
                title: {
                    text: json['hrzzpc-000057'] // 职位分布
                },
                legend: {
                    data: postStructureLegendData
                },
                series: [
                    {
                        data: postStructureSeriesData
                    }
                ]
            }
            // 工龄分布
            let workageYAxisData = []
            let workageSeriesData = []
            for (let workageKey in workageStructure) {
                switch (workageKey) {
                    case 'i0_1':
                        workageYAxisData.push('1')
                        break;
                    case 'i1_3':
                        workageYAxisData.push('1-3')
                        break;
                    case 'i3_5':
                        workageYAxisData.push('3-5')
                        break;
                    case 'i5_10':
                        workageYAxisData.push('5-10')
                        break;
                    case 'i10_20':
                        workageYAxisData.push('10-20')
                        break;
                    case 'i20':
                        workageYAxisData.push('20')
                        break;
                    default: break;
                }
                workageSeriesData.push(Number(workageStructure[workageKey]))
            }
            let workageStructureOption = {
                title: {
                    text: json['hrzzpc-000058'] // 工龄分布
                },
                xAxis: {
                    type: 'value'
                },
                yAxis: {
                    type: 'category',
                    data: workageYAxisData
                },
                series: [
                    {
                        data: workageSeriesData
                    }
                ]
            }
            let ageStructureEmpty = ageStructureYAxisData.length > 0 ? false : true
            let corpWorkageStructureEmpty = corpWorkageYAxisData.length > 0 ? false : true
            let eduStructureEmpty = eduStructureLen > 0 ? false : true
            let jobGradeStructureEmpty = jobGradeStructureLen > 0 ? false : true
            let postStructureEmpty = postStructureLen > 0 ? false : true
            let workageStructureEmpty = workageYAxisData.length > 0 ? false : true
            dispatch({
                type: 'compositionAnalysis/update',
                payload: {
                    ageStructureOption,
                    ageStructureEmpty,
                    corpWorkageStructureOption,
                    corpWorkageStructureEmpty,
                    eduStructureOption,
                    eduStructureEmpty,
                    jobGradeStructureOption,
                    jobGradeStructureEmpty,
                    postStructureOption,
                    postStructureEmpty,
                    workageStructureOption,
                    workageStructureEmpty
                }
            })
            dataObj.ageStructureOption = ageStructureOption
            dataObj.ageStructureEmpty = ageStructureEmpty
            dataObj.corpWorkageStructureOption = corpWorkageStructureOption
            dataObj.corpWorkageStructureEmpty = corpWorkageStructureEmpty
            dataObj.eduStructureOption = eduStructureOption
            dataObj.eduStructureEmpty = eduStructureEmpty
            dataObj.jobGradeStructureOption = jobGradeStructureOption
            dataObj.jobGradeStructureEmpty = jobGradeStructureEmpty
            dataObj.postStructureOption = postStructureOption
            dataObj.postStructureEmpty = postStructureEmpty
            dataObj.workageStructureOption = workageStructureOption
            dataObj.workageStructureEmpty = workageStructureEmpty
            if (isRefresh) {
                this.refreshEchart(compositionAnalysis)
            }
        }
    }
    // 切换部门刷新图标
    refreshEchart = (compositionAnalysis) => {
        const {barInitOption, pieInitOption, lineInitOption,json} = compositionAnalysis
        // 员工类型构成
        let staffIsEmpty = dataObj.staffIsEmpty
        if (!staffIsEmpty) {
            let staffStyleOption = dataObj.staffStyleOption
            staffStyleOption.xAxis.type = 'category'
            barInitOption.title.text = json['hrzzpc-000032']
            let optionsStaff = this.deepObjectMerge(barInitOption, staffStyleOption)
            let barEchart1 = echarts.init(document.getElementById('staffStyle'))
            barEchart1.setOption(optionsStaff, true)
        }
        // 职等分布
        let jobGradeStructureEmpty = dataObj.jobGradeStructureEmpty
        if (!jobGradeStructureEmpty) {
            let jobGradeStructureOption = dataObj.jobGradeStructureOption
            let pieEchart1 = echarts.init(document.getElementById('jobGradeStructure'))
            let optionsJobGrade = this.deepObjectMerge(pieInitOption, jobGradeStructureOption)
            pieEchart1.setOption(optionsJobGrade, true)
        }
        // 职位分布
        let postStructureEmpty = dataObj.postStructureEmpty
        if (!postStructureEmpty) {
            let postStructureOption = dataObj.postStructureOption
            let pieEchart2 = echarts.init(document.getElementById('postStructure'))
            let optionsPostStruct = this.deepObjectMerge(pieInitOption, postStructureOption)
            pieEchart2.setOption(optionsPostStruct, true)
        }
        // 年龄分布
        let ageStructureEmpty = dataObj.ageStructureEmpty
        if (!ageStructureEmpty) {
            let ageStructureOption = dataObj.ageStructureOption
            let optionsAgeStruct = this.deepObjectMerge(barInitOption, ageStructureOption)
            let barEchart2 = echarts.init(document.getElementById('ageStructure'))
            
            barEchart2.setOption(optionsAgeStruct, true)
        }
        // 司龄分布
        let corpWorkageStructureEmpty = dataObj.corpWorkageStructureEmpty
        if (!corpWorkageStructureEmpty) {
            let corpWorkageStructureOption = dataObj.corpWorkageStructureOption
            let barEchart3 = echarts.init(document.getElementById('corpWorkageStructure'))
            let optionsCorpWork = this.deepObjectMerge(barInitOption, corpWorkageStructureOption)
            barEchart3.setOption(optionsCorpWork, true)
        }
        // 工龄分布
        let workageStructureEmpty = dataObj.workageStructureEmpty
        if (!workageStructureEmpty) {
            let workageStructureOption = dataObj.workageStructureOption
            let barEchart4 = echarts.init(document.getElementById('workageStructure'))
            let optionsWorkAge = this.deepObjectMerge(barInitOption, workageStructureOption)
            barEchart4.setOption(optionsWorkAge, true)
        }
        // 每月人事变动
        let hrChangeEmpty = dataObj.hrChangeEmpty
        if (!hrChangeEmpty) {
            let hrChangeOption = dataObj.hrChangeOption
            let optionsChange = this.deepObjectMerge(lineInitOption, hrChangeOption)
            let lineEchart1 = echarts.init(document.getElementById('hrChange'))
            lineEchart1.setOption(optionsChange, true)
        }
        // 性别比例
        let sexProportionEmpty = dataObj.sexProportionEmpty
        if (!sexProportionEmpty) {
            let sexProportionOption = dataObj.sexProportionOption
            let pieEchart3 = echarts.init(document.getElementById('sexProportion'))
            let optionsSex = this.deepObjectMerge(pieInitOption, sexProportionOption)
            pieEchart3.setOption(optionsSex, true)
        }
        // 学历分布
        let eduStructureEmpty = dataObj.eduStructureEmpty
        if (!eduStructureEmpty) {
            let eduStructureOption = dataObj.eduStructureOption
            let pieEchart4 = echarts.init(document.getElementById('eduStructure'))
            let optionsEduStruct = this.deepObjectMerge(pieInitOption, eduStructureOption)
            pieEchart4.setOption(optionsEduStruct, true)
        }
    }
    didMount = () => {
        
    }
}