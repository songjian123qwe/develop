import React from 'react';

import './index.less';

import { render } from 'src/hrzz/public/mobile/frame';

import { SearchBar } from 'antd-mobile';

import hotProblem from './action/action'

const Search = render({
    actions: {
        hotProblem:hotProblem
    },
    state: {
        // 临时存储
        selectedRows: null
    }
})(({props, state, action}) => {

    const {exam} = props;

    return (
       <div className="problem-content">
            {
                action.hotProblem.hotProblem()
            }
       </div>
    );

});


export default Search;