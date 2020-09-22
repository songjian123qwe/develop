/**
 * Created by wanghongxiang on 2018/5/8.
 */
import React, {Component} from 'react';

import JobRank from '../../jobrank_base/main'
import {createPage} from 'nc-lightapp-front';
import {getAppPageConfig} from 'src/hrpub/common/utils/utils'
import {createBillinfoPage} from "../../../public/functions/createBillinfoPage";
let appcode = getAppPageConfig().appcode||'60052010';
let pagecode = getAppPageConfig().pagecode||'60052010p';
let config = {
    appcode,
    pagecode,
    //nodeTitle: this.state.json['jf6005-000173'],/* 国际化处理： 职等-全局*/
    nodeType: 'GLOBE_NODE',
    org: 'GLOBLE00000000000000'
};

let condition = {
    pagecodeValues: {},
    config
};
createBillinfoPage(condition, JobRank, {context: config}).then(res => res = null);
