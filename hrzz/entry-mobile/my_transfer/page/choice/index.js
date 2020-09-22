import React from 'react';

import './index.less';

import {render} from 'src/hrzz/public/mobile/frame';

import {Button, SearchBar} from 'antd-mobile';

import {Container} from 'src/hrzz/public/hr-mobile-card/index';

import choic from './action/action'

import {DButton} from 'src/hrzz/public/mobile/components/index'

const Search = render({
    actions: {
        choic: choic
    },
    state: {
        // 临时存储
        selectedRows: null
    }
})(({props, state, action}) => {

    const {exam} = props;
    return (
        <div className="container">
            <Container
                store={exam.store}
                cardName={exam.newFormId}
                data={exam.formData}
                hideHeader={true}
                isEdit={true}
            />
            {/* 下一步 */}
            {/*<DButton type="submit" title={exam.json['hrzzmb-000096']} onClick={action.choic.nextStep}  />*/}
            <div className="bottom-btn-group">
                <Button className='bottom-btn-next'
                        onClick={action.choic.nextStep}
                >{exam.json['hrzzmb-000096']}</Button>
            </div>
        </div>
    );

});


export default Search;