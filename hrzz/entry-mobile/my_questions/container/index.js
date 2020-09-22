import { render } from 'src/hrzz/public/mobile/frame';

import main from '../actions/main';

import MyQuestion from '../page/question'

import './index.less';

import {DButton} from '../../../public/mobile/components/index'

import { Tabs } from 'antd-mobile';

const Enquiries =  render({
    actions: {
        mainAct:main,
    },
    customData: ''
})(({props, action, state}, {customData}) => {
    const {exam} = props;
    return (
        <div className="my-question">
           <MyQuestion
                {...props}
                main = {action.mainAct}

            />
            <div
                style={{display:exam.browsing===true?'none':''}}
            >
            {/* 提交 */}
                <DButton type="submit" title={exam.json['hrzzmb-000023']} onClick={action.mainAct.submit} />
            </div>
            
        </div>
    )
});

export default Enquiries