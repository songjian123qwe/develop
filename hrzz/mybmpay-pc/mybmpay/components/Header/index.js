import React from 'react';
import './index.less';
import {render, connect} from 'src/hrpub/common/frame';
import HeaderAction from './actions/index';
import ButtonAction from "../../actions/btn";
import TableAction from "../../actions/table";
import BmStartPeriodRef from '../../../../refer/basic/BmPeriodRef';
import BmEndPeriodRef from '../../../../refer/basic/BmPeriodRef';
import BmClassRef from '../../../../refer/basic/BmClassRef';

const Wrapper = render({
    actions: {
        btnAct: ButtonAction,
        headerAct: HeaderAction,
        tableAct: TableAction
    }
})(({props, state, action}) => {
    const {main} = props;
    const {startPeriod, endPeriod, bmClass, language} = main;
    return (
        <div className="org-header-middle-content">
            <BmStartPeriodRef
                onChange={action.headerAct.startPeriodChange}
                value={startPeriod}
                placeholder={language['hrzzpc-000134']}
                refName={language['hrzzpc-000134']}
            />
            <BmEndPeriodRef
                onChange={action.headerAct.endPeriodChange}
                value={endPeriod}
                placeholder={language['hrzzpc-000135']}
                refName={language['hrzzpc-000135']}
            />
            <BmClassRef
                onChange={action.headerAct.bmClassChange}
                queryCondition={() => {
                    return {
                        starttime: startPeriod.refpk,
                        endtime: endPeriod.refpk
                    };
                }}
                value={bmClass}
            />
        </div>
    );

});


export default connect(Wrapper);