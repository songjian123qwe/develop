/**
 * Created by guobaogang on 2018/9/19.
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import 'src/hrpub/common/static/fonts/iconfont.css'
import {createPage} from 'nc-lightapp-front';

import HomePage from '../../postorder_base/main/container';
import {getAppPageConfig} from "src/hrpub/common/utils/utils";

let PostOrder = createPage({
    billinfo: [{
        billtype: 'form',
        pagecode: getAppPageConfig().appcode,
        headcode: 'baseInfo'
    }, {
        billtype: 'card',
        pagecode: getAppPageConfig().appcode,
        headcode: 'postseries_levelrelation'
    }, {
        billtype: 'card',
        pagecode: getAppPageConfig().appcode,
        headcode: 'copyinfo'
    }]
})(HomePage);
ReactDOM.render(<PostOrder
        pk_org={'GLOBLE00000000000000'}
        pagecode={'60054010p'}
        appcode={'60054010'}/>,
    document.querySelector('#app'));
