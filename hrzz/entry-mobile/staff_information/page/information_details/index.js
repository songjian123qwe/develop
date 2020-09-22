import React from 'react';

import {Avoid } from 'src/hrzz/public/mobile/components';

import './index.less';

import { render } from 'src/hrzz/public/mobile/frame';

import detail from './action/action'

import { Progress } from 'antd-mobile';

const Search = render({
    actions: {
        detail:detail
    },
    state: {

    }
})(({props, state, action}) => {

    const {exam} = props;
    return (
        <div className="detail-container">
            <div className="detail-img">
                <Avoid src={exam.infoData.photo} name = {exam.name} />
                <div className='psn-name-progress'>
                        <div className='psn-name'>{exam.name}</div>
                        {/* '完整度' */}
                        <div className='psn-progress'>{exam.json['hrzzmb-000089']}：<span>{exam.countBar}</span>%</div>
                        <Progress percent={exam.countBar} position="normal"/>
                </div>
            </div>
            {exam.storeAll.map((item)=>{
                return item
            })}
       </div>
    );

});


export default Search;