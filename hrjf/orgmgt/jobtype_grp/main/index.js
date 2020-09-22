/**
 * Created by wanghongxiang on 2018/5/8.
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import JobType from '../../jobtype_base/main'
import {high, createPage, ajax, base, getUrlParam} from 'nc-lightapp-front';

let {NCAffix, NCRow, NCCol, NCCheckbox, NCButton, NCSwitch, NCMenu, NCItem, NCIcon} = base;
let {Refer} = high;

let config = {
    appcode: '60053020',
    pagecode: '60053020p',
    //nodeTitle: this.state.json['jf6005-000217'],/* 国际化处理： 职务类别-集团*/
    nodeType: 'GROUP_NODE',
}

let JobTypeGlb = createPage({
    billinfo: [{"billtype": "grid", "pagecode": "60053020p", "bodycode": "copylist"}, {
        "billtype": "grid",
        "pagecode": "60053020p",
        "bodycode": "levelrel"
    }, {"pagecode": "60053020p", "headcode": "jobtype", "billtype": "form"}]
})(JobType)

ReactDOM.render(<JobTypeGlb context={config}/>, document.querySelector('#app'))
