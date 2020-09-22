import CommonAction from './common'
import {getAppPageConfig} from 'src/hrpub/common/utils/utils'
export default class MainAction extends CommonAction{
    constructor(comp){
        super()
        this.comp = comp   
    }
    appConfig = {
        pagecode : '60651020p',
        appcode : '60651020'
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
                    type: 'changeAnalysis/update',
                    payload: {
                        json : json
                    } 
                })
                this.querypersonsettings()
            }
        })
    }
    didMount = () => {
        if (window.location.href.match('localhost:3006')) {
            window.location.hash = '#/ifr?page=201993135118108'
            this.appConfig = getAppPageConfig()
        }
        this.getMulitiLange()
    }
}