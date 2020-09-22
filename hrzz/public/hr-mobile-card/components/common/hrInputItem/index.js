import {InputItem} from 'antd-mobile'
import React from 'react'
import Wrapper from './wrapper'
import {isT, Maybe} from '../../../utils'

import './index.less'

export class InputToSpan extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let {
            children, defaultValue, classname, disabled, editable,
            isFieldChange, showIsChangedIndicator
        } = this.props;
        let disabledClass = editable && disabled ? ' hr-input-disabled' : '';
        let changedClass = isFieldChange && showIsChangedIndicator ? ' am-filed-changed' : '';
        return (
            <div className={"am-list-item am-input-item am-list-item-middle hr-input-item " + classname}>
                <div className="am-list-line">
                    <div className="am-input-label">
                        {
                            children
                        }
                    </div>
                    <div className={`am-input-control ` + disabledClass + changedClass}>
                        {
                            isT(defaultValue, 'Object') ? Maybe.of(defaultValue).getValue(['display']) : defaultValue
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default class HrInputItem extends React.Component {
    render() {
        let props = this.props
        let {editable, onChange, disabled, ...other} = props

        let content = editable && (!disabled) ? (
            <InputItem className="hr-input-item" onBlur={onChange.bind(this)} {...other}>
                {this.props.children}
                <i style={{color: '#e14c46', display: props.required ? '' : 'none'}}>*</i>
            </InputItem>
        ) : (
            <InputToSpan {...props}>
                {this.props.children}
            </InputToSpan>
        )
        return (
            <React.Fragment>
                {
                    content
                }
            </React.Fragment>
        )
    }
}
