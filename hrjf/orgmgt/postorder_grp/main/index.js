/**
 * Created by guobaogang on 2018/9/19.
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import 'src/hrpub/common/static/fonts/iconfont.css'
import {createPage, getBusinessInfo} from 'nc-lightapp-front';

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
let businessInfo = getBusinessInfo() || {groupId: '0001HR100000000005M3'};
ReactDOM.render(<PostOrder
        pk_org={businessInfo.groupId}
        pagecode={'60054020p'}
        appcode={'60054020'}/>,
    document.querySelector('#app'));
