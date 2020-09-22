import React, {Component} from 'react';
import {isIphoneX,getDistanceTop} from '../../../../../public/mobile/utils/index.js'
import {DButton} from '../../../../../public/mobile/components/index'
import './index.less'

/**
 * 固定在底部的按钮外框，自动适配iPhone X
 * 支持两种，放在按钮数据的方法
 * 1、传入数据
 * @param buttons [array]  传入按钮属性数据，推荐使用这种
    eg: <Footer buttons={[{
            type:'brand',
            title:'确定',
            onClick:() => {this.saveList()}
        }]} />
 * 2、使用children属性
    eg: <Footer children={<React.Fragment><DButton type={'brand'} title={'提交'} onClick={this.submit.bind(this)}/></React.Fragment>}/>
 */
class DFooter extends Component {
    constructor (props) {
        super(props)
        this.state={
            toTop:getDistanceTop(.98)-(isIphoneX()?34:0)
        }
    }
    componentDidMount() {
        document.addEventListener('DOMContentLoaded', () => {
            this.setState({
                toTop: getDistanceTop(.98) - (isIphoneX() ? 34 : 0)
            })
        }, false)
    }
    renderButton (arrs = []) {
        return arrs.map((item,index) => {
            return (
                <DButton 
                    type={item.type} 
                    title={item.title} 
                    spacing={index===0?'':'margin-left'}
                    onClick={() => {item.onClick()}}/>
            )
        })
    }
    render () {
        const { children,
                buttons = []
            } = this.props;

        return (
            <div class="nc-footer" 
                style={{'top':this.state.toTop+'px','bottom':'auto'}}
            >
                {children}
                {this.renderButton(buttons)}
            </div>
        )
    }
}


export default DFooter