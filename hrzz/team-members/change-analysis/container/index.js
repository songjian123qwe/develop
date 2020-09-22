import {createPage} from 'nc-lightapp-front';
import {render} from '../../../../hrpub/common/frame';
import MainAction from '../actions/main'
import './index.less'
import FirstContent from '../components/firstcontent/index'
import SecondContent from '../components/secondcontent/index'
const ChangeAnalysis = render({
    actions: {
        mainAction: MainAction
    }
})(({props, action, state}) => { 
    return(
        <div className="changeAnalysis nc-bill-card">
            <div className="changeAnalysisCon">
                <FirstContent/>
                <SecondContent/>
            </div>
        </div>
    )
}) 


export default createPage({})(ChangeAnalysis);