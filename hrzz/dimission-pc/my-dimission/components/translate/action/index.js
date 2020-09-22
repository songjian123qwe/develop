// import {formatDate} from "src/hrpub/common/utils/utils";
// import {toast} from 'nc-lightapp-front';

export default class TranslateAction {
    constructor(comp) {
        this.comp = comp;
        this.dispatch = this.comp.props.dispatch;
    }
    entered=()=>{
        console.log("进入");
        
    }
}