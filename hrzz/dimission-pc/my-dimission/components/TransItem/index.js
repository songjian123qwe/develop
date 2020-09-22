import React from 'react';
import './index.less';
import TransCont from '../TransCont/trans.js';
import {connect, render} from "src/hrpub/common/frame";
import TransAction from "./actions";

const Wrapper = render({
    actions: {
        transAct: TransAction
    }
})(({props, state, action}) => {
    const {main} = props;
    const {transItems = [], isEdit, transSearched, language} = main;
    return (
        <div className="dept-trans-items">
            {transItems.length > 0 ? transItems.map((content, index) => {
                return <TransCont
                    isEdit={isEdit}
                    index={index}
                    content={content}
                    language={language}
                    onChange={action.transAct.onItemChange}
                    onInsert={action.transAct.insertItem}
                    onRemove={action.transAct.removeItem}
                    onSearch = {action.transAct.openModels}
                />
            }) : transSearched && !isEdit ?
                <div className='wrapper-empty'>{language['hrzzpc-000078']}</div> : null}
        </div>
    );
});

export default connect(Wrapper);