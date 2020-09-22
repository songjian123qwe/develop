import React from 'react';

import './index.less';

import { render } from 'src/hrzz/public/mobile/frame';

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
           <div className="class-scroll clearfix">
               {
                   action.classHtml.classHtml()
               }
           </div>
       </div>
    );

});


export default Classification;