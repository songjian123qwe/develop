
import React, {Component} from 'react';

import './index.less';

import Base from 'src/hrpub/common/components/reportQuery/components/BusiBaseComponent';

import ReportQuery from '../action';
import ButtonAction from 'src/hrpub/common/components/reportQuery/action/button';
import SimRepAction from 'src/hrpub/common/components/reportQuery/action/simpleReport';
import QueryConditionAction from 'src/hrpub/common/components/reportQuery/action/queryCondition';


import {createPage} from 'nc-lightapp-front';


class ContainerPage extends Base {
    constructor(props) {
        super(props);

        // 装载action
        this.loadActions();
    }

    // 配置actions
    actions = {
        ReportQuery: ReportQuery,
        ButtonAction: ButtonAction,
        simRep: SimRepAction,
        QCAction: QueryConditionAction
    }

    componentDidMount() {

    }

    render() {
       return this.renderOrganization();
    }
}

export default createPage({})(ContainerPage);
