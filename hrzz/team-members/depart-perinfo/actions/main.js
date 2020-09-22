import CommonAction from './common'
import {getAppPageConfig} from 'src/hrpub/common/utils/utils'
export default class MainAction extends CommonAction{
    constructor(comp){
        super()
        this.comp = comp 
    }
    appConfig = {
        pagecode : '60651010nccloud',
        appcode : '60651010'
    }

    //获取模版
    getTemplate = ()=> {
        const {props} = this.comp
        const {createUIDom,button,meta, dispatch} = props
        createUIDom(this.appConfig,(data)=>{
            meta.setMeta(data.template || [])
            button.setButtons(data.button || [])
            this.getMulitiLange()
            let template = data.template
            let gridrelation = template.gridrelation
            gridrelation.psnlist = {
                destBrowseAreaCode: 'psnform',
                destEditAreaCode: null,
                srcAreaCode: 'psnlist',
                tabRelation: ['psnlist']
            }
            let dataItems = template.psnlist.items
            this.initMeta(dataItems)
            dispatch({
                type: 'departPerInfo/update',
                payload: {
                    shwoCardTable: true
                }
            })
        })
    }
    //获取多语
    getMulitiLange = () =>{
        const {props} = this.comp
        const {MultiInit,dispatch} = props
        MultiInit.getMultiLang({
            moduleId: 'hrzzpc',
            domainName: 'hrzz',
            callback: (json,status,init) =>{
                dispatch({
                    type: 'departPerInfo/update',
                    payload: {
                        json : json
                    } 
                })
            }
        })
    }
    // 添加超链接
    initMeta = (dataItems) => {
        // 人员编码添加超链接
        dataItems.forEach((item, key) => {
            if (item.attrcode === 'pk_psndoc.code') {
                item.renderStatus = 'browse'
                item.render = (text, record, index) => {
                    return (
                        <span style={{color: '#007ace', cursor: 'pointer'}}
                              onClick={() =>{this.toCardList(record)}}>
                           {record && record.values['pk_psndoc.code'] && record.values['pk_psndoc.code'].value}
                      </span>
                    );
                };
            }
        });
    }
    // 进入卡片页面
    toCardList = (record) => {
        this.showDetailInfo(record)
    }
    didMount = () => {
        if (window.location.href.match('localhost:3006')) {
            window.location.hash = '#/ifr?page=2019820183131110'
            this.appConfig = getAppPageConfig()
        }
        this.getTemplate()
    }
}