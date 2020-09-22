import React, {Component} from 'react';
import './index.less'

// 头像组件,
/**
 * @param level [string] 头像大小的级别，level0-level9
 * @param src [string] 头像路径
 * @param name [string] 人员名称
 */
import {setPhotoColorByName} from '../../../utils/index.js'
class Avoid extends Component {
    constructor (props) {
        super(props)
    }

    render () {
        const {
            level = 'level5',
            src,
            name=''
        } = this.props;

        let imgGroup = null;
        if (src) {
            imgGroup = <img src={src} class={`${level}`}/>
        } else {
            imgGroup = <div class={`no-photo ${level}`} style={{background: setPhotoColorByName(name)}}>
                            {name.toString().slice(-2)}
                       </div>
        }
        return (
            <div class={`avoid-group ${level}`}>
                {imgGroup}
            </div>
        )
    }
}

export default Avoid