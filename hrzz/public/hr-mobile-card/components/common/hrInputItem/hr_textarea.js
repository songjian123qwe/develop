/**
 * Created by wanghongxiang on 2019/6/12.
 */
import React from 'react'
import {List, TextareaItem} from 'antd-mobile'
import {sizeof} from '../../../utils'

export default class HRTextarea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            isFieldChange: false
        }
    }

    componentDidMount() {
        this.setState({
            inputValue: this.props.defaultValue,
            isFieldChange: this.props.isFieldChange
        })
    }

    validate(value) {
        let {maxLength} = this.props;
        if (!maxLength || sizeof(value) <= Number(maxLength)) {
            //onChange(value)
            this.setState({
                inputValue: value,
                isFieldChange: true
            })
        }
    }

    render() {
        let {required, visible, label, showIsChangedIndicator} = this.props;
        return <List className={'hr-text-area '
        + (required ? 'textarea-required' : '')
        + (showIsChangedIndicator && this.state.isFieldChange ? ' am-filed-changed' : '')}
                     renderHeader={() => label}
                     style={{display: !!visible ? '' : 'none'}}>
            <TextareaItem
                {...this.props}
                value={this.state.inputValue}
                onChange={val => this.validate(val)}
                rows={3}
            />
        </List>
    }
}
