/**
 * Created by wanghongxiang on 2018/5/8.
 */
import React, {Component} from 'react';

import JobRank from '../../jobrank_base/main'
import {createPage} from 'nc-lightapp-front';
import {createBillinfoPage} from "../../../public/functions/createBillinfoPage";
import {getAppPageConfig} from 'src/hrpub/common/utils/utils';
let appcode = getAppPageConfig().appcode||'60052020';
let pagecode = getAppPageConfig().pagecode||'60052020p';
let config = {
    appcode,
    pagecode,
    //nodeTitle: this.state.json['jf6005-000174'],/* 国际化处理： 职等-集团*/
    nodeType: 'GROUP_NODE',
    org : ''
}

let condition = {
    pagecodeValues: {},
    config
};
createBillinfoPage(condition, JobRank, {context: config}).then(res => res = null);
