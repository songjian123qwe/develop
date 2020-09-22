import { render } from 'src/hrzz/public/mobile/frame';

import main from '../actions/main';

import MyChoice from '../page/choice'

import MyApply from '../page/my_apply'

import './index.less';

const Enquiries =  render({
    actions: {
        mainAct:main,
    },
    customData: ''
})(({props, action, state}, {customData}) => {
    const {exam} = props;
    return (
        <div className="my-transfer">
            {exam.chiocLock===true?(
                <MyChoice
                    {...props}
                    main = {action.mainAct}
                />
            ):(
                <MyApply 
                    {...props}
                    main = {action.mainAct}
                />
            )}
            
            
        </div>
    )
});

export default Enquiries