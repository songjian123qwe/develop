import React from 'react';

import './index.less';

import {render} from 'src/hrzz/public/mobile/frame';

import {Button, SearchBar} from 'antd-mobile';

import {Container} from 'src/hrzz/public/hr-mobile-card/index';

import apply from './action/action'

import {DButton} from 'src/hrzz/public/mobile/components/index'

const Search = render({
    actions: {
        apply: apply
    },
    state: {
        // 临时存储
        selectedRows: null
    }
})(({props, state, action}) => {

    const {exam} = props;

    return (
        <div className="container">

            {exam.examine === true ? action.apply.peopleList() : (
                <div>
                    <Container
                        store={exam.storeTwo}
                        cardName={exam.formId}
                        data={exam.formDataTwo}
                        hideHeader={true}
                        isEdit={exam.isEdit}
                    />
                    <div className="transfer-img">
                        {exam.formDataTwo && exam.formDataTwo.rows[0] ? action.apply.questionImg() : null}
                    </div>
                    {/* 提交 */}
                    {/*<DButton title={exam.json['hrzzmb-000023']} type="submit" onClick={props.main.savaCheck}/>*/}
                    <div className="bottom-btn-group">
                        <Button className='bottom-btn-next'
                                onClick={props.main.savaCheck}
                        >{exam.json['hrzzmb-000023']}</Button>
                    </div>
                </div>
            )}
        </div>
    );

});


export default Search;