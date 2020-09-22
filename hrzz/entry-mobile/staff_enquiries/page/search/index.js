import React from 'react';

import './index.less';

import {render} from 'src/hrzz/public/mobile/frame';

import {SearchBar} from 'antd-mobile';

import searchHtml from './action/action'

import {DEmpty} from '../../../../public/mobile/components/index'

const Search = render({
    actions: {
        searchHtml: searchHtml
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
                // value={'关键词搜索'}
                // 搜索
                placeholder={exam.json['hrzzmb-000273']}
                onSubmit={value => console.log(value, 'onSubmit')}
                onClear={value => console.log(value, 'onClear')}
                onFocus={() => console.log('onFocus')}
                onBlur={() => console.log('onBlur')}
                onCancel={action.searchHtml.cancel}
                showCancelButton={false}
                onChange={props.hotProblem.changeSearch}
            />
            {
                exam.searchData.length > 0 ? action.searchHtml.searchHtml() : (<DEmpty/>)
            }
        </div>
    );

});


export default Search;