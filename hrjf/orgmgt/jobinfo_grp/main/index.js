/**
 * Created by shenzhuang on 2018/10/12.
 */
import React, {Component} from 'react';

import JobInfo from '../../jobinfo_base/main'
import {high, createPage} from 'nc-lightapp-front';
import {getAppPageConfig} from 'src/hrpub/common/utils/utils';
import {createBillinfoPage} from "../../../public/functions/createBillinfoPage";
let appConfig = getAppPageConfig()||{};
let appcode = appConfig.appcode || '60053040';
let pagecode = appConfig.pagecode || '60053040p';
let config = {
    appcode,
    pagecode,
    //nodeTitle: this.state.json['jf6005-000204'],/* 国际化处理： 职务信息-全局*/
    nodeType: 'GROUP_NODE',
};

let condition = {
    pagecodeValues: {},
    config
};
createBillinfoPage(condition, JobInfo, {context: config}).then(res => res = null);
