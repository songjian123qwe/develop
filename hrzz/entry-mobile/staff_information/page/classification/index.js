import React from 'react';

import './index.less';

import { render } from 'src/hrzz/public/mobile/frame';

import { SearchBar } from 'antd-mobile';

import classification from './action/action'

const Search = render({
    actions: {
        classification:classification
    },
    state: {
        // 临时存储
        selectedRows: null
    }
})(({props, state, action}) => {
    const {exam} = props;
    const {organizationPer} = exam
    return (
        <div className="class-container">
            <div className="crumbs-box">
                {action.classification.crumbs()}
            </div>
            <div className="list-content">
                {action.classification.classList()}
                {props.administration.orgInClassifyShow()}
                {props.administration.searchPeopleHtml('organizationPer')}
            </div>
       </div>
    );

});


export default Search;