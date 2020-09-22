import CommonAction from './common'
import {toast} from 'nc-lightapp-front';
export default class ExportAction extends CommonAction{
    constructor(comp){
        super()
        this.comp = comp   
    }
    // 导出花名册弹窗关闭函数
    exportModalClose = () => {
        const {props} = this.comp
        const {dispatch} = props
        dispatch({
            type: 'departPerInfo/update',
            payload: {
                ncModelDis: false
            }
        })
    }
    // 导出花名册组织改变触发函数
    personReferChange = (value) => {
        const {props} = this.comp
        const {dispatch} = props
        dispatch({
            type: 'departPerInfo/update',
            payload: {
                exportValue: value
            }
        })
    }
    // 导出花名册弹窗单选按钮改变触发函数
    exportRadioChange = (value) => {
        const {props} = this.comp
        const {dispatch} = props
        dispatch({
            type: 'departPerInfo/update',
            payload: {
                radioSelectVal: value
            }
        })
    }
    // 点击确定导出花名册
    exportRoster = async () => {
        const {props} = this.comp
        const {dispatch, departPerInfo} = props
        const {exportValue, radioSelectVal, nowPagePks, allpks, json} = departPerInfo
        if (!exportValue.refpk) {
            toast({
                color: 'warning',
                content: json['hrzzpc-000068'] // 请选择花名册！
            })
            return false
        }
        let exportPks = nowPagePks.join(',')
        if (radioSelectVal === 'all') {
            exportPks = allpks.join(',')
        }
        let paramObj = {
            allpks: exportPks,
            pk_rpt_def: exportValue.refpk ? exportValue.refpk : ''
        }
        let exportRes = await dispatch({
            type: 'departPerInfo/doExportRoster',
            payload: {
                postData: {
                    data: JSON.stringify(paramObj)
                },
                exportNotice: json['hrzzpc-000108']
            }
        })
        dispatch({
            type: 'departPerInfo/update',
            payload: {
                ncModelDis: false
            }
        })
    }
    didMount = () => {
        
    }
}