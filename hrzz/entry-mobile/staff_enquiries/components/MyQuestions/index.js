import React from 'react';

import './index.less';

import { render } from 'src/hrzz/public/mobile/frame';

import Title from '../Title'

import { DEmpty } from 'src/hrzz/public/mobile/components/index'

import questionHtml from './action/action'

const QuestionHtml = render({
    actions: {
        questionHtml:questionHtml
    },
    state: {
        // 临时存储
        selectedRows: null
    }
})(({props, state, action}) => {

    const {exam} = props;

    return (
       <div className="question">
            {
                exam.myQuestions.length>0?action.questionHtml.questionHtml():(<DEmpty describe={exam.json['hrzzmb-000086']} />)
                
            }
       </div>
    );

});


export default QuestionHtml;