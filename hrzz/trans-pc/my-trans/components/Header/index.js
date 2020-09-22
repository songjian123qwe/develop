import React from 'react';
import './index.less';
import {render, connect} from '../../../../../hrpub/common/frame';
import HeaderAction from './actions/index';
import NCBackBtn from 'src/hrpub/common/components/hr-back';
import ButtonAction from "../../actions/btn";
import TableAction from "../../actions/table";

const Wrapper = render({
    actions: {
        headerAct: HeaderAction,
        btnAct: ButtonAction,
        tableAct: TableAction
    }
})(({props, state, action}) => {
    const {main} = props;
    return (
        <If condition={main.page === 'detail'}>
            <NCBackBtn onClick={action.headerAct.back}/>
        </If>
    );
});


export default connect(Wrapper);