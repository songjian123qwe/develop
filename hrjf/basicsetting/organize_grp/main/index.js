import './index.css'
import ReactDOM from 'react-dom';
import Category from '../../organize_base/main'
import { createPage} from 'nc-lightapp-front';
import { getAppPageConfig,handleHash } from '../../../../hrpub/common/utils/utils';


let config = getAppPageConfig()
config.nodeTitle = 'i6013-000630'
config.nodeType = 'GROUP_NODE'

let CategoryGrp = createPage({
    billinfo:{
        billtype: 'form',
        pagecode: config.appcode,
        headcode: 'head'
    }
// })(handleHash('201981519','/ifr?page=201981519&c=60054110&p=60054110p')(Category))
})(handleHash('201981519','/ifr?page=201981519&c=60054110&p=60054110p')(Category))

ReactDOM.render(<CategoryGrp {...config}/>, document.querySelector('#app'))
