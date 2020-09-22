import ReactDOM from 'react-dom';
import {createPage, base, ajax, toast} from 'nc-lightapp-front';
import ChildDef from 'src/hrpub/defdoc/defdoc_glb/main/'
let param = {
    defdocCond : "nccloud.web.hrjf.defdoc.sqlbuilder.HRJFDefdocSQLBuilder",
    jsonConfig :{
        moduleId :"jf6005",
        domainName :"hrjf",
        code: 'jf6005-000511'
    }
}
ReactDOM.render(<ChildDef params={param}/>, document.querySelector('#app'));