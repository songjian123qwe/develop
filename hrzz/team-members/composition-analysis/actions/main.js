import CommonAction from './common'
export default class MainAction extends CommonAction{
    constructor(comp){
        super()
        this.comp = comp 
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
                    type: 'compositionAnalysis/update',
                    payload: {
                        json : json
                    } 
                })
            }
        })
    }
    didMount = () => {
        if (window.location.href.match('localhost:3006')) {
            window.location.hash = '#/ifr?page=201983094513101'
        }
        this.getMulitiLange()
    }
}