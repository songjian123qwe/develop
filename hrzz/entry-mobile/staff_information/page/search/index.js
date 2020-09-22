import React from 'react';

import './index.less';

import { render } from 'src/hrzz/public/mobile/frame';

import { SearchBar } from 'antd-mobile';

import searchHtml from './action/action'

import { DEmpty } from '../../../../public/mobile/components/index'

const Search = render({
    actions: {
        searchHtml:searchHtml
    },
    state: {
        // 临时存储
        selectedRows: null
    }
})(({props, state, action}) => {

    const {exam} = props;
    return (
       <div className="search-bar">
            <SearchBar
                value={exam.searchValue}
                placeholder={exam.json['hrzzmb-000273']} //搜索
                onSubmit={value => console.log(value, 'onSubmit')}
                onClear={value => console.log(value, 'onClear')}
                onFocus={() => console.log('onFocus')}
                onBlur={action.searchHtml.onblur}
                onCancel={action.searchHtml.cancel}
                // showCancelButton
                onChange={props.administration.changeSearch}
            />
            {
                !exam.isSearchData&&exam.organizationData.length>0?action.searchHtml.organizationHtml():props.administration.searchPeopleHtml()
            }
            {/* (<DEmpty/>) */}
       </div>
    );

});


export default Search;