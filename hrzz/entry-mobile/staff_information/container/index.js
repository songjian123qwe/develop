import { render } from 'src/hrzz/public/mobile/frame';

import main from '../actions/main';
import administration from '../actions/administration';

import { DEmpty } from '../../../public/mobile/components/index'

import Search from '../page/search'

import ClassificationPage from '../page/classification'

import InformationDetails from '../page/information_details'

import './index.less';

import {DButton} from '../../../public/mobile/components/index'

import { Tabs } from 'antd-mobile';

const Infomation =  render({
    actions: {
        mainAct:main,
        administration:administration 
    },
    customData: ''
})(({props, action, state}, {customData}) => {
    const {exam} = props;
    return (
        <div className="staff-enquiries">
            
            <div
                className="search-page"
                style={{display:exam.showSearch?'':'none'}}
            >
                {/* 搜索页 */}
                <Search
                    {...props}
                    administration = {action.administration}
                />
            </div>
          
            <div
                className="calss-page"
                style={{display:exam.showClassifi?'':'none'}}
            >
                {/* 分类页 */}
                <ClassificationPage
                    {...props}
                    administration = {action.administration}
                />
            </div>
            <div
                className="detail-page"
                style={{display:exam.isDetail?'':'none'}}
            >
                {/* 详情页 */}
                <InformationDetails
                    {...props}
                    // administration = {action.administration}
                />
            </div>
            
                  
        </div>
    )
});

export default Infomation