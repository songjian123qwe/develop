import React from 'react';

import './index.less';

import { render } from 'src/hrzz/public/mobile/frame';

import { SearchBar } from 'antd-mobile';

import questions from './action/action'

import { DEmpty } from '../../../../public/mobile/components/index'

const Questions = render({
    actions: {
        questionsAct:questions
    },
    state: {
        // 临时存储
        fabulous: "button",
        buttonText:'赞一个'
    }
})(({props, state, action}) => {

    const {exam} = props;
    return (
       <div className="question-detail">
            {
                [action.questionsAct.question(),
                action.questionsAct.answers()]
            }
            <div className={state.fabulous} onClick={action.questionsAct.fabulous}><i className="hrfont hr-praise"></i>{state.buttonText}</div>
       </div>
    );

});


export default Questions;