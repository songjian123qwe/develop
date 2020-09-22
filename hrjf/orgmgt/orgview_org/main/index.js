/**
 * Created by guobaogang on 2019/1/2.
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import 'src/hrpub/common/static/fonts/iconfont.css'
import {createPage} from 'nc-lightapp-front';

import HomePage from '../../orgview_base/main/container';
import {getAppPageConfig} from "../../../../hrpub/common/utils/utils";

let OrgView = createPage({})(HomePage);
ReactDOM.render(<OrgView
        nodeType={'ORG_NODE'}
        pk_org={'GLOBLE00000000000000'}
        pagecode={getAppPageConfig().pagecode}
        appcode={getAppPageConfig().appcode}/>,
    document.querySelector('#app'));
