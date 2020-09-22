import CommonAction from './common'
export default class CompositionAction extends CommonAction{
    constructor(comp){
        super()
        this.comp = comp 
    }
    // 部门参照改变触发函数
    referChange = (value) => {
        const {props} = this.comp
        const {compositionAnalysis, dispatch} = props
        dispatch({
            type: 'compositionAnalysis/update',
            payload: {
                referObj: value
            }
        })
        let refpk = value.refpk
        let cuserid = compositionAnalysis.cuserid
        if (!refpk) {
            refpk = ''
        }
        this.queryStaffStaticAction(cuserid, refpk, true)
    }
    didMount = () => {
        this.querypersonsettings()
    }
}