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
    appcode: '60053010',
    pagecode: '60053010p',
    //nodeTitle: this.state.json['jf6005-000216'],/* 国际化处理： 职务类别-全局*/
    nodeType: 'GLOBE_NODE',
    pk_org: 'GLOBLE00000000000000'
}

let JobTypeGlb = createPage({
    billinfo: [{"billtype": "grid", "pagecode": "60053010p", "bodycode": "copylist"}, {
        "billtype": "grid",
        "pagecode": "60053010p",
        "bodycode": "levelrel"
    }, {"pagecode": "60053010p", "headcode": "jobtype", "billtype": "form"}]
})(JobType)

ReactDOM.render(<JobTypeGlb context={config}/>, document.querySelector('#app'))
