import React from 'react';

import './index.less';

import { render } from 'src/hrzz/public/mobile/frame';

import { SearchBar } from 'antd-mobile';

import questionContent from './action/action'

const Search = render({
    actions: {
        questionContent:questionContent
    },
    state: {
        // 临时存储
        selectedRows: null
    }
})(({props, state, action}) => {

    const {exam} = props;

    return (
        <div className="container">
            <div className="question-text">
                {action.questionContent.questionContent()}
            </div>
            <div
                style={{display:exam.browsing===true&&exam.urlImg.length===0?'none':''}}
            className="qusetion-img">
                {action.questionContent.questionImg()}
            </div>
            {exam.examine===true?action.questionContent.peopleList():null}
       </div>
    );

});


export default Search;