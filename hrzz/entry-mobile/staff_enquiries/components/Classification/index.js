import React from 'react';

import './index.less';

import { render } from 'src/hrzz/public/mobile/frame';

import Title from '../Title'

import classHtml from './action/action'

const Classification = render({
    actions: {
        classHtml:classHtml
    },
    state: {
        // 临时存储
        selectedRows: null
    }
})(({props, state, action}) => {

    const {exam,hotProblem} = props;

    return (
       <div className="class-problems">
       {/* 问题分类 */}
           <Title
            name = {exam.json['hrzzmb-000265']}
            iconLeft = "hr-classification"
            iconRight={false}
            leftColor="rgb(31,167,240)"
           />
           <div className="class-scroll clearfix">
               {
                   action.classHtml.classHtml()
               }
           </div>
       </div>
    );

});


export default Classification;