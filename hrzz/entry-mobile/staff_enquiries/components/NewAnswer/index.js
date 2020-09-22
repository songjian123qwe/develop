import React from 'react';

import './index.less';

import { render } from 'src/hrzz/public/mobile/frame';

import Title from '../Title'

import answerHtml from './action/action'

const Classification = render({
    actions: {
        answerHtml:answerHtml
    },
    state: {
        // 临时存储
        selectedRows: null
    }
})(({props, state, action}) => {

    const {exam,hotProblem} = props;

    return (
       <div className="anwer">
       {/* 最新回答 */}
           <Title
            name = {exam.json['hrzzmb-000270']}
            iconLeft = "hr-bubble2"
            iconRight={false}
            leftColor="rgb(41,197,116)"
           />
           <div className="anwer-scroll" style={props.style}>
               {
                   action.answerHtml.answerHtml()
               }
           </div>
       </div>
    );

});


export default Classification;