import './index.css'
import ReactDOM from 'react-dom';
import Category from '../../organize_base/main'
import { createPage} from 'nc-lightapp-front';
import { getAppPageConfig,handleHash } from '../../../../hrpub/common/utils/utils';

let config = getAppPageConfig()
config.nodeTitle = 'i6013-000631'
config.nodeType = 'ORG_NODE'


let CategoryGlb = createPage({
    billinfo:{
        billtype: 'form',
        pagecode: config.appcode,
        headcode: 'head'
    }
})(handleHash('201981519','/ifr?page=201981519&c=60054120&p=60054120p')(Category))

ReactDOM.render(<CategoryGlb {...config}/>, document.querySelector('#app'))
