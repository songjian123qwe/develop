import {createPage} from 'nc-lightapp-front';
import {render} from '../../../../hrpub/common/frame';
import MainAction from '../actions/main'
import Composition from '../components/composition'
import Distribution from '../components/distribution'
import './index.less'
const CompositionAnalysis = render({
    actions: {
        mainAction: MainAction
    }
})(({props, action, state}) => { 
    return(
        <div className="compositionAnalysis nc-bill-card">
            <div className="compositionCon">
                <Composition/>
                <Distribution/>
            </div>
        </div>
    )
}) 


export default createPage({})(CompositionAnalysis);