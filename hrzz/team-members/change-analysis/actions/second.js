import CommonAction from './common'
export default class SecondAction extends CommonAction{
    constructor(comp){
        super()
        this.comp = comp   
    }
    // 部门参照发证改变触发函数
    referChange = (value) => {
        const {props} = this.comp
        const {changeAnalysis, dispatch} = props
        dispatch({
            type: 'changeAnalysis/update',
            payload: {
                deptValue: value  
            }
        })
        let cuserid = changeAnalysis.cuserid
        let pk_dept = value.refpk
        if (!pk_dept) {
            pk_dept = ''
        }
        this.queryCountAnalyseAction(cuserid, pk_dept)
    }
    didMount = () => {
       
    }
}