import React from 'react'

import render from '../../../../../hrpub/common/frame/render';

import {connect} from '../../../../../hrpub/common/store';

import formAct from '../../actions/form'

import { base } from 'nc-lightapp-front';

let { NCSelect, NCRow, NCCol, NCCheckbox, NCButton, NCSwitch, NCMenu,NCItem, NCIcon } = base;


const CardView = render({
    actions: {
        formAct:formAct
    }
})(({props, action, state}) => {
    const { form } = props;
    return (
        <div>
            {form.createForm('card', {
                onBeforeEvent: action.formAct.formBeforeEdit,
                onAfterEvent: action.formAct.formAfterEdit
            })}
        </div>
        
    );

});
export default connect(CardView);