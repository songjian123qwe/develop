/**
 * Created by shenzf on 2018/12/25.
 * 基准岗位——集团
 */
import React, {Component} from 'react';
import {createPage, getBusinessInfo} from 'nc-lightapp-front';
import {getAppPageConfig} from 'src/hrpub/common/utils/utils';
import HomePage from '../../poststd_base/main/container';
import {createBillinfoPage} from "../../../public/functions/createBillinfoPage";

let businessInfo = getBusinessInfo() || {groupId: '0001A010000000000D8G'};
let appcode = getAppPageConfig().appcode || '60054026';
let pagecode = getAppPageConfig().pagecode || '60054026p';
const props = {
    isGlb: false,
    pk_org: businessInfo.groupId,
    appcode,
    pagecode,
    ...businessInfo
};

let condition = {
    pagecodeValues: {}
};
if (window.location.href.match(/(localhost|127\.0\.0\.1):3006/g)) {
    condition.config = props;
}
createBillinfoPage(condition, HomePage, props).then(res => res = null);
