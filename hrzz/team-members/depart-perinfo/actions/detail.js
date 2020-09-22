import CommonAction from './common'
export default class DetailAction extends CommonAction{
    constructor(comp){
        super()
        this.comp = comp   
    }
    // 点击楼层组件每个节点时执行函数
    clickDetailDomFun = (type) => {
        console.log(type)
    }
    // 点击收起cardTable
    onHeadAngleToggle = async (props, moduleId, value) => {
        if (value) {
            const {dispatch, departPerInfo, cardTable} = props
            let res = await dispatch({
                type: 'departPerInfo/psndocLoadSubDataAction',
                payload: {
                    postData: {
                        areaCode: moduleId,
                        pk_psnjob: departPerInfo.pk_psnjob
                    }
                }
            })
            if (res.success) {
                if (res.data) {
                    let tableData = res.data[moduleId]
                    cardTable.setTableData(moduleId, tableData)
                }
            }
        }
    }
    didUpdate = () => {
        
    }
    didMount = () => {
       
    }
}