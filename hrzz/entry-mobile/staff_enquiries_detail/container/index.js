import {render} from 'src/hrzz/public/mobile/frame';
import NativeObj from '../../../public/mobile/utils/jsbridge/index.js'
import main from '../actions/main';

import Detail from '../page/details'

import './index.less';

import {DButton} from '../../../public/mobile/components/index'

import {Tabs} from 'antd-mobile';

const Enquiries = render({
    actions: {
        mainAct: main
    },
    customData: ''
})(({props, action, state}, {customData}) => {
    // let jumpToHtml = (link) => {
    //     NativeObj.openWindow(link)
    // }
    const {exam} = props;
    return (
        <div className="staff-enquiries">
            {/* iframe不能加载响应头x-frame-options设置为SAMEORIGIN值的页面，设置此值导致页面资源无法在iframe框架内显示 */}
            {/* <iframe src={exam.link} className="link-answer-frame"/> */}
            {<Detail
                {...props}
                mainAct={action.mainAct}
            /> }
        </div>
    )
});

export default Enquiries