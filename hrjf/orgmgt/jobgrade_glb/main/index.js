/**
 * Created by wanghongxiang on 2018/5/8.
 */
import React, {Component} from 'react';

import JobGrade from '../../jobgrade_base/main'
import {createPage} from 'nc-lightapp-front';
import {getAppPageConfig} from 'src/hrpub/common/utils/utils'
import {createBillinfoPage} from "../../../public/functions/createBillinfoPage";
let appConfig = getAppPageConfig()||{};
let appcode = appConfig.appcode || '60052030';
let pagecode = appConfig.pagecode || '60052030p';
let config = {
    appcode,
    pagecode,
    //nodeTitle: this.state.json['jf6005-000173'],/* 国际化处理： 职等-全局*/
    nodeType: 'GLOBE_NODE'
};

let condition = {
    pagecodeValues: {},
    config
};
createBillinfoPage(condition, JobGrade, {context: config}).then(res => res = null);
