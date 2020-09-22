import CommonAction from './common'
export default class HeaderAction extends CommonAction{
    constructor(comp){
        super()
        this.comp = comp   
    }
    onButtonClick = () => {
        
    }
    // 下拉发生改变
    selectChange = (value) => {
        const {props} = this.comp
        const {dispatch, departPerInfo} = props
        dispatch({
            type: 'departPerInfo/update',
            payload: {
                pk_dept: value
            }
        })
        this.psndocQueryAction(departPerInfo.cuserid, departPerInfo.pageInfo, value, departPerInfo.qryStr)
    }
    // 点击导出花名册按钮
    btnClick = async () => {
        const {props} = this.comp
        const {dispatch} = props
        dispatch({
            type: 'departPerInfo/update',
            payload: {
                ncModelDis: true
            }
        })
        let res = await dispatch({
            type: 'departPerInfo/queryPsnHROrgAction',
            payload: {
                postData: {

                }
            }
        })
        if (res.success) {
            dispatch({
                type: 'departPerInfo/update',
                payload: {
                    pk_org: res.data
                }
            })
        }
    }
    // 点击搜索按钮
    searchBtnFun = () => {
        const {props} = this.comp
        const {departPerInfo} = props
        this.psndocQueryAction(departPerInfo.cuserid, departPerInfo.pageInfo, departPerInfo.pk_dept, departPerInfo.qryStr)
    }
    // 搜索输入框赋值
    searchIptChange = (e) => {
        const {props} = this.comp
        const {dispatch} = props
        dispatch({
            type: 'departPerInfo/update',
            payload: {
                qryStr: e.target.value
            }
        })
    }
    // 查询管理部门
    queryDeptByPrincipalAction = async () => {
        const {props} = this.comp
        const {dispatch, departPerInfo} = props
        let res = await dispatch({
            type: 'departPerInfo/querypersonsettings',
            payload: {
                postData: {
                    rqCode: 'querypersonsettings'
                }
            }
        })
        if (res.success) {
            let userId = res.data.userId
            let res2 = await dispatch({
                type: 'departPerInfo/queryDeptByPrincipalAction',
                payload: {
                    postData: {
                        cuserid: userId, // 1001AB100000000007XS
                        datatype: 'list'
                    }
                }
            })
            if (res2.success) {
                dispatch({
                    type: 'departPerInfo/update',
                    payload: {
                        cuserid: userId,
                        selectArr: res2.data ? res2.data : []
                    }
                })
            }
            this.psndocQueryAction(userId, departPerInfo.pageInfo, '', '')
        }
    }
    // 点击返回按钮
    backBtnClick = () => {
        const {props} = this.comp
        const {dispatch, departPerInfo} = props
        dispatch({
            type: 'departPerInfo/update',
            payload: {
                showModel: departPerInfo.copyShowModel
            }
        })
    }
    // 点击卡片翻页组件
    handlePageInfoChange = (props, flag, status) => {
        let record = {values: {pk_psnjob: {value: flag}}}
        this.showDetailInfo(record)
    }
    didMount = () => {
        this.queryDeptByPrincipalAction()
    }
}