/**
 * Created by shenzf on 2018/12/25.
 * 基准岗位——全局
 */
import React, {Component} from 'react';
import {createPage, getBusinessInfo} from 'nc-lightapp-front';

import HomePage from '../../poststd_base/main/container';
import {createBillinfoPage} from "../../../public/functions/createBillinfoPage";
import {getAppPageConfig} from 'src/hrpub/common/utils/utils';

let appcode = getAppPageConfig().appcode || '60054025';
let pagecode = getAppPageConfig().pagecode || '60054025p';
const props = {
    isGlb: true,
    pk_org: 'GLOBLE00000000000000',
    groupId: 'GLOBLE00000000000000',
    groupName: '全局',
    appcode,
    pagecode
};

let condition = {
    pagecodeValues: {}
};
if (window.location.href.match(/(localhost|127\.0\.0\.1):3006/g)) {
    condition.config = props;
}
createBillinfoPage(condition, HomePage, props).then(res => res = null);
