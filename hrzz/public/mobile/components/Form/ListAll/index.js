import React, { Component } from 'react';
import './index.less'

import BasicInput from '../BasicInput/index.js'
import DatePicker from '../DatePicker/index.js'
import PullDown from '../PullDown/index.js'
import ReferenceList from '../ReferenceList/index.js'

// 参照类型
// checkbox: 
// datePickerNoTimeZone: 时间
// datetimepicker: 时间
// input: 
// number: 1
// refer: 参照
// select: 下拉
// textarea: 多行文本


class ListAll extends Component {

    render () {
        const {
            type = '',
            name = '',
            value = '',
            placeholder,
            disabled = false,
            data = [],
            onOk = (data) => { console.log(['ok', data]) },
            onDismiss = (data) => { console.log(['onDismiss', data]) },
            onChange = (data) => { console.log('onChange', data); },
            onBlur = (data) => { console.log('onBlur', data); },
        } = this.props;
        console.log(data)
        let iconDom = <div></div>
        switch (type) {
            case 'input':
                iconDom = <BasicInput
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    disabled={disabled}
                    onChange={onChange}
                    onBlur={onBlur} />
                break;
            case 'number':
                iconDom = <BasicInput
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    disabled={disabled}
                    onChange={onChange}
                    onBlur={onBlur} />
                break;
            case 'textarea':
                iconDom = <BasicInput
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    disabled={disabled}
                    onChange={onChange}
                    onBlur={onBlur} />
                break;
            case 'datePickerNoTimeZone':
                iconDom = <DatePicker
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    disabled={disabled}
                    onOk={onOk}
                    onDismiss={onDismiss} />
                break;
            case 'datetimepicker':
                iconDom = <DatePicker
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    disabled={disabled}
                    onOk={onOk}
                    onDismiss={onDismiss} />
                break;
            case 'date':
                iconDom = <DatePicker
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    disabled={disabled}
                    onOk={onOk}
                    onDismiss={onDismiss} />
                break;
            case 'refer':
                iconDom = <ReferenceList
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    disabled={disabled}
                    onOk={onOk}
                    onDismiss={onDismiss} />
                break;
            case 'select':
                iconDom = <PullDown
                    name={name}
                    value={value}
                    data={data}
                    placeholder={placeholder}
                    disabled={disabled}
                    onOk={onOk}
                    onDismiss={onDismiss} />
                break;
            default:
                iconDom = <div></div>
                break;
        }
        return (
            <React.Fragment>
                {
                    iconDom
                }
            </React.Fragment>
        );
    }
}


export default ListAll