/**
 * Created by wanghongxiang on 2019/6/12.
 */
import React from 'react'
import {Toast} from 'antd-mobile'
import {InputToSpan} from './index'
import {reactComposition, sizeof} from '../../../utils'

export default class HRInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputValue: '',
            tempValue: '',
            hasError: false,
            errorMsg: '',
            focusing: false,
            isFieldChange: false
        }
        this.validate = this.validate.bind(this)
    }

    componentDidMount() {
        this.setState({
            inputValue: this.props.defaultValue,
            isFieldChange: this.props.isFieldChange
        })
    }

    validate(value) {
        let {required, label, maxLength, onChange} = this.props
        if (this.validateLength(value, maxLength)) {
            onChange(value)
            this.setState({
                hasError: false,
                isFieldChange: true
            })
        }
        if (required) {
            if (!value) {
                this.setState({
                    inputValue: value,
                    hasError: true,
                    errorMsg: `${label}不能为空`
                })
            }
        }
    }

    /**
     * 校验字符串长度
     * @param value
     * @param meta
     * @returns {boolean}
     */
    validateLength(value, maxlength) {
        let flag = sizeof(value) <= Number(maxlength)
        /*if (!flag) {
            this.setState({
                inputValue: value.slice(0, Number(maxlength))
            })
        }*/
        if (flag) {
            this.setState({
                inputValue: value
            })
        }
        return flag

    }

    onErrorClick() {
        let {required, label} = this.props
        this.props.onErrorClick()
        Toast.info(`${this.state.errorMsg}`, 1.5);
    }

    onfocus(flag) {
        if (!flag) {
            setTimeout(() => {
                this.setState({
                    focusing: flag
                })
            }, 200)
        } else {
            this.setState({
                focusing: flag
            })
        }
    }

    clear() {
        this.setState({
            inputValue: ''
        }, () => {
            this.validate('')
        })
    }

    render() {
        // am-input-error
        let {children, required, editable, disabled, onErrorClick, ...other} = this.props
        let error = this.state.hasError ? 'am-input-error' : ''
        let focusing = this.state.focusing ? 'am-input-focus' : ''
        let content = editable ? (
            <div className={`am-list-item am-input-item am-list-item-middle hr-input-item ${error} ${focusing}`}>
                <div className="am-list-line">
                    <div className="am-input-label">
                        {children}
                        {required && <i style={{color: "rgb(225, 76, 70)"}}>*</i>}
                    </div>
                    <div className={"am-input-control" + (other.showIsChangedIndicator && this.state.isFieldChange ? ' am-filed-changed' : '')}>
                        <input
                            value={this.state.inputValue}
                            disabled={disabled}
                            {...other}
                            {
                                ...reactComposition({
                                    onChange: (event) => {
                                        var value = event.target.value
                                        if (event.reactComposition.composition === false) {
                                            this.setState({
                                                tempValue: value
                                            })
                                        }
                                        /*this.setState({
                                            inputValue: value
                                        }, () => {
                                            this.validate(value)
                                            onChange(value)
                                        })*/
                                        this.validate(value)
                                    }
                                })
                            }
                            onFocus={this.onfocus.bind(this, true)}
                            onBlur={this.onfocus.bind(this, false)}
                        />
                    </div>
                    <div className="am-input-clear" onClick={this.clear.bind(this)}>
                    </div>
                    <div className="am-input-error-extra" onClick={this.onErrorClick.bind(this)}>
                    </div>
                </div>
            </div>
        ) : (
            <InputToSpan {...this.props}>
                {this.props.children}
            </InputToSpan>
        )
        return <React.Fragment>{content}</React.Fragment>
    }
}
