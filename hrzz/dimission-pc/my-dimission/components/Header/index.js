import React from 'react';
import './index.less';
import {render, connect} from 'src/hrpub/common/frame';
import HeaderAction from './actions/index';
import NCBackBtn from 'src/hrpub/common/components/hr-back';
import ButtonAction from "../../actions/btn";
import TableAction from "../../actions/table";
import FormAction from "../../actions/form";
import {base} from 'nc-lightapp-front';

const {NCProgressBar} = base;
const Wrapper = render({
    actions: {
        headerAct: HeaderAction,
        btnAct: ButtonAction,
        tableAct: TableAction,
        formAct: FormAction
    }
})(({props, state, action}) => {
    const {main} = props;
    const {process = 0, page, language} = main;
    return (
        <If condition={page !== 'main'}>
            <NCBackBtn onClick={action.headerAct.back}/>
            <If condition={page === 'disList'}>
                <div className="entry-process">
                    <div>{language['hrzzpc-000109']}</div>
                    <NCProgressBar style={{width: 1.4 * process}}/>
                    <div>{process}%</div>
                </div>
            </If>
        </If>
    );
});


export default connect(Wrapper);