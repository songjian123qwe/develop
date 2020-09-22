import React, {Component} from 'react';
import {Toast} from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import '../../../static/fonts/iconfont.js'
import successPng from './img/success.png'
import loadingPng from './img/loading.png'
import failPng from './img/fail.png'
import offlinePng from './img/offline.png'
import warningPng from './img/warning.png'
import './index.less';

const customIcon = (type,iconName) => {
    let returnData = ''
    if(!!iconName){
        returnData=(
            <div class="hr-toast-svg-frame">
                <div className={`hr-toast-svg ${type === 'loading'?'hr-toast-svg-animation':''}`}>
                    <img width="40" height="40" src={[iconName]} />
                </div>
            </div>
        )
    }
    return returnData
}

class ToastDom extends Component{
    constructor (props) {
        super(props);
    }
    render () {
        let {content, type, iconName} = this.props
        return (
            <div>
                {customIcon(type, iconName)}
                <p class="hr-toast-p">{content}</p>
            </div>
        )
    }
}

// 关闭遮罩
export function hide(){
    Toast.hide()
}

export function success(content, duration, onClose, mask) {
    Toast.info(<ToastDom type={'success'} iconName={successPng} content={content}/>, duration, onClose, mask)
}

export function fail(content, duration, onClose, mask) {
    Toast.info(<ToastDom type={'fail'} iconName={failPng} content={content}/>, duration, onClose, mask)
}

export function info(content, duration, onClose, mask) {
    Toast.info(<ToastDom type={'info'} iconName={''} content={content}/>, duration, onClose, mask)
}

export function loading(content, duration, onClose, mask) {
    Toast.info(<ToastDom type={'loading'} iconName={loadingPng} content={content}/>, duration, onClose, mask)
}

export function offline(content, duration, onClose, mask) {
    Toast.info(<ToastDom type={'offline'} iconName={offlinePng} content={content}/>, duration, onClose, mask)
}

export function warning(content, duration, onClose, mask) {
    Toast.info(<ToastDom type={'warning'} iconName={warningPng} content={content}/>, duration, onClose, mask)
}

export default {
    hide,
    success,
    fail,
    info,
    loading,
    offline,
    warning
}


