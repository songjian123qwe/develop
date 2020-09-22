import {createPage} from 'nc-lightapp-front';
import {render} from '../../../../hrpub/common/frame';
import Header from '../components/header/index'
import Table from '../components/table/index'
import Detail from '../components/detail/index'
import ExportRoster from '../components/export-roster/index'
import MainActon from '../actions/main'
import './index.less'
const DepartPerInfo = render({
    actions: {
        mainActon: MainActon
    }
})(({props, action, state}) => { 
    return(
        <div className="departPerInfo nc-bill-card">
            <Header {...props}/>
            <Table {...props}/>
            <Detail {...props}/>
            <ExportRoster {...props}/>
        </div>
    )
}) 


export default createPage({
    billinfo: [
        {
            billtype: 'grid', 
            pagecode: '60651010', 
            headcode: 'psnlist'
        },
        {
            billtype: 'extcard', 
            pagecode: '60651010', 
            headcode: 'bd_psndoc',
            bodycode: [
                'hi_psnorg_h',
                'hi_psnjob_h', 
                'hi_psnjob', 
                'hi_psndoc_parttime', 
                'hi_psndoc_trial',
                'hi_psndoc_psnchg', 
                'hi_psndoc_work', 
                'hi_psndoc_edu', 
                'hi_psndoc_family',
                'hi_psndoc_ctrt',
                'hi_psndoc_agreement',
                'hi_psndoc_ass',
                'hi_psndoc_capa',
                'hi_psndoc_train',
                'hi_psndoc_cert',
                'hi_psndoc_linkman',
                'hi_psndoc_title',
                'hi_psndoc_nationduty',
                'hi_psndoc_langability',
                'hi_psndoc_enc',
                'hi_psndoc_pun',
                'hi_psndoc_partylog',
                'hi_psndoc_abroad',
                'hi_psndoc_retire',
                'hi_psndoc_speitem',
                'hi_psndoc_qulify'
            ]
        }
    ]
})(DepartPerInfo);