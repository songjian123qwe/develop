import CommonAction from '../../../../hrpub/common/actions/index'
export default class DepartInfoCommon extends CommonAction{
    constructor(comp){
        super()
        this.comp = comp   
    }
    // 返回带汉字的年月日
    returnFormatNowDate = () => {
        const {props} = this.comp
        const {changeAnalysis} = props
        const {json} = changeAnalysis
        let workArr = [
            json['hrzzpc-000000'], // 星期日
            json['hrzzpc-000001'], // 星期一
            json['hrzzpc-000002'], // 星期二
            json['hrzzpc-000003'], // 星期三
            json['hrzzpc-000004'], // 星期四
            json['hrzzpc-000005'], // 星期五
            json['hrzzpc-000006'] // 星期六
        ]
        let dateObj = {}
        let nowDate = new Date()
        let year = nowDate.getFullYear()
        let month = nowDate.getMonth() + 1
        let day = nowDate.getDate()
        dateObj.dateStr = year + json['hrzzpc-000007'] + month + json['hrzzpc-000008'] + day + json['hrzzpc-000009'] // 年 月 日
        dateObj.workDay = workArr[nowDate.getDay()]
        return dateObj
    }
    // 查询人员信息
    querypersonsettings = async () => {
        const {props} = this.comp
        const {dispatch} = props
        let res = await dispatch({
            type: 'changeAnalysis/querypersonsettings',
            payload: {
                postData: {
                    rqCode: 'querypersonsettings'
                }
            }
        })
        if (res.success) {
            let cuserid = res.data.userId// res.data.userId 1001AB100000000007XS
            dispatch({
                type: 'changeAnalysis/update',
                payload: {
                    cuserid
                }
            })
            this.queryCountAnalyseAction(cuserid, '')
        }
    }
    // 人员变动分析
    queryCountAnalyseAction = async (cuserid, pk_dept) => {
        const {props} = this.comp
        const {dispatch, changeAnalysis} = props
        const {json} = changeAnalysis
        let res = await dispatch({
            type: 'changeAnalysis/queryCountAnalyseAction',
            payload: {
                postData: {
                    cuserid
                }
            }
        })
        if (res.success && res.data) {
            let data = res.data
            let analysisList = []
            for (let key in data) {
                switch (key) {
                    case 'halfMonth':
                        data[key].title = json['hrzzpc-000010'] // 半个月内
                        analysisList.push(data[key])
                        break;
                    case 'month':
                        data[key].title = json['hrzzpc-000011'] // 1个月内
                        analysisList.push(data[key])
                        break;
                    case 'sevenDay':
                        data[key].title = json['hrzzpc-000012'] // 七天内
                        analysisList.push(data[key])
                        break;
                    case 'threeMonth':
                        data[key].title = json['hrzzpc-000013'] // 3个月内
                        analysisList.push(data[key])
                        break;
                    case 'threeMonthAfter':
                        data[key].title = json['hrzzpc-000014'] // 3个月后
                        analysisList.push(data[key])
                        break;
                    default:break;
                }
            }
            let analysisData = {}
            analysisData.now = data.now
            analysisData.analysisList = analysisList
            dispatch({
                type: 'changeAnalysis/update',
                payload: {
                    analysisData
                }
            })
            this.queryEntryGroupAction(cuserid, pk_dept)
        }
    }
    // 待入职信息
    queryEntryGroupAction = async (cuserid, pk_dept) => {
        const {props} = this.comp
        const {dispatch} = props
        let entryRes = await dispatch({
            type: 'changeAnalysis/queryEntryGroupAction',
            payload: {
                postData: {
                    cuserid,
                    pk_dept
                }
            }
        })
        if (entryRes.success && entryRes.data) {
            let entryList = entryRes.data.data
            dispatch({
                type: 'changeAnalysis/update',
                payload: {
                    entryList
                }
            })
            this.queryChangeGroupAction(cuserid, pk_dept)
        }
    }
    // 待变动信息
    queryChangeGroupAction = async (cuserid, pk_dept) => {
        const {props} = this.comp
        const {dispatch} = props
        let changeRes = await dispatch({
            type: 'changeAnalysis/queryChangeGroupAction',
            payload: {
                postData: {
                    cuserid,
                    pk_dept
                }
            }
        })
        if (changeRes.success && changeRes.data) {
            let changeList = changeRes.data.data
            dispatch({
                type: 'changeAnalysis/update',
                payload: {
                    changeList
                }
            })
            this.queryDimissionGroupAction(cuserid, pk_dept)
        }
    }
    // 待离职信息
    queryDimissionGroupAction = async (cuserid, pk_dept) => {
        const {props} = this.comp
        const {dispatch} = props
        let dimissionRes = await dispatch({
            type: 'changeAnalysis/queryDimissionGroupAction',
            payload: {
                postData: {
                    cuserid,
                    pk_dept
                }
            }
        })
        if (dimissionRes.success && dimissionRes.data) {
            let dimissionList = dimissionRes.data.data
            dispatch({
                type: 'changeAnalysis/update',
                payload: {
                    dimissionList
                }
            })
            this.queryRegGroupAction(cuserid, pk_dept)
        }
    }
    // 待转正信息
    queryRegGroupAction = async (cuserid, pk_dept) => {
        const {props} = this.comp
        const {dispatch} = props
        let regGroupRes = await dispatch({
            type: 'changeAnalysis/queryRegGroupAction',
            payload: {
                postData: {
                    cuserid,
                    pk_dept
                }
            }
        })
        if (regGroupRes.success && regGroupRes.data) {
            let regGroupList = regGroupRes.data.data
            dispatch({
                type: 'changeAnalysis/update',
                payload: {
                    regGroupList
                }
            })
        }
    }
    didMount = () => {
       
    }
}