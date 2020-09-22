import React from 'react';

import './index.less';

import { render } from 'src/hrzz/public/mobile/frame';

import Title from '../Title'

import hotHtml from './action/action'

const HotProblems = render({
    actions: {
        hotHtml:hotHtml
    },
    state: {
        // 临时存储
        selectedRows: null
    }
})(({props, state, action}) => {

    const {exam,hotProblem} = props;

    return (
       <div className="hot-problems">
       {/* 热点问题 */}
           <Title
            name = {exam.json['hrzzmb-000269']}
            iconLeft = "hr-fire"
            iconRight={true}
            leftColor="rgb(255,106,55)"
            rightClick = {hotProblem.rightClick}
           />
           <div className="hot-scroll clearfix">
               {
                   action.hotHtml.hotHtml()
               }
           </div>
       </div>
    );

});


export default HotProblems;