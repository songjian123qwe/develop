/**
 * Created by wanghongxiang on 2019/5/22.
 */
import {InputItem} from 'antd-mobile'
import React from 'react'
import {InputToSpan} from './index'
import {isT, formatDate} from '../../../utils'

// 目前组件只支持select 和 datePicker, radio包装
export default class ListWrapper extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        // shouldChange 默认为true
        let {children, shouldChange = true} = this.props
        let {editable, value, data, format, children: child, isFieldChange, showIsChangedIndicator} = children.props
        value = isT(value, 'Array') ? value[0] : value
        let defaultValue = data ? data.find(item => item.value === value) : formatDate(value, '-', format)
        let classname = !editable && !shouldChange ? 'hr-input-span' : ''
        let content = !editable && shouldChange ? (
            <InputToSpan isFieldChange={isFieldChange}
                         showIsChangedIndicator={showIsChangedIndicator}
                         classname={classname}
                         defaultValue={defaultValue}>
                {
                    child.props.children
                }
            </InputToSpan>

        ) : (
            <div className={classname}>
                {children}
            </div>
        )
        return (
            <React.Fragment>
                {content}
            </React.Fragment>
        )
    }
}