import React, {Component} from 'react';
import {isIphoneX,getDistanceTop} from '../../../../../public/mobile/utils/index.js'
import './index.less'

// 新增按钮组件,
/**
 * @param type [string] 按钮类型，brand、info、success、warning、danger、primary
 * @param position [string] 位置 top-left、top-content、top-right、bottom-left、bottom-content、bottom-right
 */
class Button extends Component {
    constructor (props) {
        super(props)
        this.state = {
            position: this.setPosition(props.position)
        }
        console.log(this.state.position)
    }
    setPosition(str){
        let proDate = {
            left: '.24rem',
            right: '.24rem',
            top: '.24rem',
            bottom: (getDistanceTop(2.42) - (isIphoneX()? 34: 0) + 'px'),
        }
        let returnObj = {}
        let arrs = !str? []: str.split('-')
        if(arrs.length === 2){
            returnObj = {
                'position': 'fixed',
                'z-index': '10',
                'top': proDate[arrs[0]],
                [arrs[1]]: proDate[arrs[1]]
            }
        }
        return returnObj
    }

    render () {
        const {
            type='danger',
            onClick=()=>{}
        } = this.props;
        return (
            <div 
                class={`info-add ${type} `}  
                style={this.state.position}
                onClick={onClick}>
                <i class="icon hrfont hr-plus02 "></i>
            </div>
        )
    }
}

export default Button