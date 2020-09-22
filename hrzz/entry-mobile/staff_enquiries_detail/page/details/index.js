import React from 'react';
import './index.less';
import {render} from 'src/hrzz/public/mobile/frame';
import questions from './action/action';
import mainAction from '../../actions/main';

const Questions = render({
    actions: {
        questionsAct: questions,
        mainAct: mainAction
    },
    state: {
        // 临时存储

    }
})(({props, state, action}) => {

    const {exam} = props;
    return (
        <div className="question-detail">
            {
                [action.questionsAct.question(),
                    action.questionsAct.answers()]
            }
            <div
                style={{display: exam.backQuesetion ? 'none' : ''}}
                className={exam.fabulous} onClick={action.questionsAct.fabulous}>
                <i className="hrfont hr-praise"/>{exam.buttonText}</div>
        </div>
    );

});


export default Questions;