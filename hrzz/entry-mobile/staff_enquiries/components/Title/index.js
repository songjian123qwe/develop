import React from 'react';

import './index.less';

import { render } from 'src/hrzz/public/mobile/frame';

import title from './action/title';


const Title = render({
    actions: {
         titleAct: title
    },
    state: {
        // 临时存储
        selectedRows: null
    }
})(({props, state, action}) => {
    const {
        iconLeft,
        name,
        iconRight = '',
        leftColor,
        rightColor,
        rightClick,
    } = props;

    return (
       <div className="title-box">
            <i 
                style={{color:leftColor}}
                className={`hrfont icon-left ${iconLeft}`}
            ></i>
            <span>{name}</span>
            <i
                style={{display:iconRight?'':'none'}} 
                className={`hrfont icon-right ${iconRight}`}
                onClick = {action.titleAct.iconClick}
            >...</i>
       </div>
    );

});


export default Title;