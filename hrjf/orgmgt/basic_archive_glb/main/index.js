/**
 * Created by shenzf on 2018/12/25.
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import 'src/hrpub/common/static/fonts/iconfont.css'
import {createPage} from 'nc-lightapp-front';

import HomePage from '../../basic_archive_base/main/container';

const PeriodModal = createPage({})(HomePage);
const props = {
    pk_org:'GLOBLE00000000000000',
    pagecode:'60051090p',
    appcode:'60051090'
};
ReactDOM.render(<PeriodModal
        {...props}
    />,
    document.querySelector('#app'));
