import React, {Component} from 'react';
import './index.less'

// 按钮组件,
/**
 * @param type [string] 按钮类型，brand、info、success、warning、danger、primary
 * @param title [string] 按钮文案
 * @param spacing [string]  间距 margin-right,margin-left,
 */
class Button extends Component {
    constructor (props) {
        super(props)
    }

    render () {
        const {
            type='info',
            title='',
            spacing='',
            onClick=()=>{}
        } = this.props;
        return (
            <div class={`btn ${type} ${spacing}`} onClick={onClick}>
                {title}
            </div>
        )
    }
}

export default Button