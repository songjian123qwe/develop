import CommonAction from '../../../../hrpub/common/actions/index'
import {cacheTools} from 'nc-lightapp-front';
export default class DepartInfoCommon extends CommonAction{
    constructor(comp){
        super()
        this.comp = comp   
    }
    // 人员列表查询
    psndocQueryAction = async (cuserid, pageInfo, pk_dept, qryStr) => {
        const {props} = this.comp
        const {cardTable, dispatch} = props
        let res = await dispatch({
            type: 'departPerInfo/psndocQueryAction',
            payload: {
                postData: {
                    cuserid,
                    pageInfo,
                    pk_dept,
                    qryStr
                }
            }
        })
        if (res.success) {
            if (res.data) {
                let psnlist = res.data.psnlist
                let rows = psnlist.rows
                let allpks = psnlist.allpks
                let nowPagePks = rows.map(item => {
                    return item.values.pk_psnjob.value
                })
                cacheTools.set('allpks', nowPagePks)
                let pageInfo = psnlist.pageInfo
                cardTable.setTableData('psnlist', {rows})
                dispatch({
                    type: 'departPerInfo/update',
                    payload: {
                        pageInfo,
                        allpks,
                        nowPagePks,
                        exportBtnDis: rows.length > 0 ? false : true
                    }
                })
            } else {
                cardTable.setTableData('psnlist', {rows: []})
                dispatch({
                    type: 'departPerInfo/update',
                    payload: {
                        exportBtnDis: true
                    }
                })
            }
        }
    }
    // 查询详情接口
    showDetailInfo = async (record) => {
        const {props} = this.comp
        const {dispatch, form, cardTable, cardPagination} = props
        let result = await dispatch({
            type: 'departPerInfo/update',
            payload: {
                showModel: 'detail',
                paginationShow: true
            }
        })
        let pk_psnjob = record.values.pk_psnjob.value
        if (result.payload.paginationShow) {
            cardPagination.setCardPaginationId({id: pk_psnjob, status: 1});
        }
        let res = await dispatch({
            type: 'departPerInfo/psndocInfQueryAction',
            payload: {
                postData: {
                    pk_psnjob
                }
            }
        })
        if (res.success) {
            if (res.data) {
                let data = res.data
                let allArea = data.allArea
                let areaCodeList = data.areaCodeList
                let gridrelation = allArea.gridrelation
                let allAreaList = areaCodeList.map(item => {
                    gridrelation[item] = {
                        "srcAreaCode": item,
                        "destBrowseAreaCode": null,
                        "destEditAreaCode": null,
                        "tabRelation": [item]
                    }
                    let allAreaItem = allArea[item]
                    return {
                        code: allAreaItem.code,
                        name: allAreaItem.name,
                        moduletype: allAreaItem.moduletype
                    }
                })
                delete allArea.psnlist
                props.meta.addMeta(allArea)
                let psndocForm = data.psndocForm.bd_psndoc
                let psnjobFormData = data.psnjobForm.hi_psnjob_h
                let psnorgFormData = data.psnorgForm.hi_psnorg_h
                let baseInfoPhoto = data.image ? data.image : ''
                dispatch({
                    type: 'departPerInfo/update',
                    payload: {
                        allAreaList,
                        baseInfoPhoto,
                        pk_psnjob
                    }
                })
                form.setAllFormValue({'bd_psndoc': psndocForm})
                form.setAllFormValue({'hi_psnjob_h': psnjobFormData})
                form.setAllFormValue({'hi_psnorg_h': psnorgFormData})
                cardTable.toggleCardTable(areaCodeList, false)
            }
        }
    }
    didUpdate = () => {
        
    }
    didMount = () => {
       
    }
}