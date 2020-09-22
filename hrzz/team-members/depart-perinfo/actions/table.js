import CommonAction from './common'
export default class TableAction extends CommonAction{
    constructor(comp){
        super()
        this.comp = comp   
    }
    // 计算变革高度
    getHeight = () => {
		let wH = window.innerHeight,
			gap = 180;
		return wH - gap;
    }
    //分页事件
    paginationEve = (key) => {
        const {props} = this.comp
        const {dispatch, departPerInfo} = props
        let pageInfo = departPerInfo.pageInfo
        pageInfo.pageIndex = key
        dispatch({
            type: 'departPerInfo/update',
            payload: {
                pageInfo
            }
        })
        this.psndocQueryAction(departPerInfo.cuserid, pageInfo, departPerInfo.pk_dept, departPerInfo.qryStr)
    }
    // 每页显示条数
    pageSizeSelect = (val) => {
        const {props} = this.comp
        const {dispatch, departPerInfo} = props
        let pageInfo = departPerInfo.pageInfo
        pageInfo.pageSize = val
        dispatch({
            type: 'departPerInfo/update',
            payload: {
                pageInfo
            }
        })
        this.psndocQueryAction(departPerInfo.cuserid, pageInfo, departPerInfo.pk_dept, departPerInfo.qryStr)
    }
    // 变革双击事件
    onRowDoubleClick = (props, record, index, event) => {
        this.showDetailInfo(record)
    }
    didMount = () => {
        
    }
}