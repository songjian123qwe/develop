import {InputItem} from 'antd-mobile'
import React from 'react'
import {isT, Maybe, ncSplit} from '../../../utils'

import './index.less'

export class InputToSpan extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let {
            children, defaultValue, classname, disabled, editable, scale,
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
                            ncSplit(isT(defaultValue, 'Object') ? Maybe.of(defaultValue).getValue(['display']) : defaultValue, scale)
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default class HrNumberItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            isFieldChange: false
        }
    }

    componentDidMount() {
        this.setState({
            inputValue: ncSplit(this.props.defaultValue, this.props.scale),
            isFieldChange: this.props.isFieldChange
        })
    }

    validate(value) {
        let {scale} = this.props;
        const re = /^([-+])?(\d+)?\.?(\d+)?$/;
        if (!re.test(value)) {
            return;
        }
        let [_value, _scale] = [value, scale];
        if (
            !Object.prototype.toString.call(scale) !== "[object Number]" &&
            !isNaN(Number(scale))
        )
            _scale = Number(scale);
        if (!scale || _scale === -1) {
            this.setState({
                inputValue: value,
                isFieldChange: true
            });
            return;
        }
        // 分割value
        let [beforePoint, afterPoint] = _value.split(".");
        if (afterPoint && afterPoint.length > _scale) {
            return;
        }
        this.setState({
            inputValue: value,
            isFieldChange: true
        });
    }

    render() {
        let props = this.props;
        let {editable, onChange, disabled, ...other} = props;
        let content = editable && (!disabled) ? (
            <InputItem
                className={"hr-input-item" + (other.showIsChangedIndicator && this.state.isFieldChange ? ' am-filed-changed' : '')}
                value={this.state.inputValue}
                onBlur={onChange.bind(this)}
                {...other}
                onChange={(value) => {
                    this.validate(value)
                }}>
                {this.props.children}
                <i style={{color: '#e14c46', display: props.required ? '' : 'none'}}>*</i>
            </InputItem>
        ) : (
            <InputToSpan {...props}>
                {this.props.children}
            </InputToSpan>
        );
        return (
            <React.Fragment>
                {
                    content
                }
            </React.Fragment>
        )
    }
}
