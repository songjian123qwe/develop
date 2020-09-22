import {Component} from 'react'
import './index.less'
import {Toast} from 'antd-mobile';
import md5 from 'md5'
import ajax from '../../../../public/mobile/utils/ajax'
export default class SetPassword extends Component{
    constructor (props) {
        super (props)
        this.state = {
            passVal: "",
            passValCopy: "",
            showPass: false, // 是否显示密码
            showHiddenIconClass: 'hr-biyan'
        }
    }
    passwordIptChange = (e) => {
        let value = e.target.value
        this.setState({
            passVal: value,
            passValCopy: this.replacePassword(value)
        })
    }
    // 根据输入数字替换成*
    replacePassword = (str) => {
        let str2 = ""
        let strLen = str.length
        for (let i = 0; i < strLen; i++) {
            str2+="*"
        }
        return str2
    }
    // 清楚密码输入里面的值
    clearPassword = () => {
        this.setState({
            passValCopy: "",
            passVal: ""
        })
    }
    // 显示隐藏密码输入框里面的值
    showHidddenPassword = () => {
        if (this.state.showPass) {
            this.setState({
                showPass: false,
                showHiddenIconClass: 'hr-biyan'
            })
        } else {
            this.setState({
                showPass: true,
                showHiddenIconClass: 'hr-zhengyan'
            })
        }
    }
    // 点击确定按钮执行函数
    determineHandle = () => {
       const {passVal} = this.state
       if (passVal.length < 6 ) {
            return false
       } else {
            // 调用二级密码的保存接口
            const {cuserid} = this.props
            let pwd = md5(passVal)
            ajax({
                url: '/nccloud/hrzz/payslip/savePwdAction.do',
                data: {
                    cuserid,
                    pwd
                },
                info: {
                    appcode: '60652510'
                },
                success: (result) => {
                    this.props.setShowPage(1)
                    this.props.pushPageIndex(1)
                },
                error: (err) => {
                    Toast.info(err.data.error.message)
                }
            })
       }
    }
    // 判断按钮是否可以点击
    judgeBtnIsAble = () => {
        const {passVal} = this.state
        if (passVal.length < 6 ) {
            return false
       } else {
           return true
       }
    }
    render () {
        const {passValCopy, showPass, passVal, showHiddenIconClass } = this.state
        const {json} = this.props
        return (
            <div className="setPassword">
                {/* 请设置查询密码 */}
                <div className="spFir">{json['hrzzmb-000318']}</div>
                {/* 请设置至少六位查询密码 */}
                <div className="spSec">{json['hrzzmb-000319']}</div>
                <div className="spThi">
                    <input 
                        className="sptIpt"
                        type="number" 
                        value={passVal} 
                        onChange={this.passwordIptChange}
                        style={{color: showPass ? '#111' : 'transparent'}}/>
                    <span className="sptClear hrfont hr-close" onClick={this.clearPassword}></span>
                    <span className={`sptHidden hrfont ${showHiddenIconClass}`} onClick={this.showHidddenPassword}></span>
                    <div style={{color: showPass ? 'transparent' : '#111'}} className="copyIptVal">{passValCopy}</div>
                </div>
                {/* 确定 */}
                <div className={`spFour ${this.judgeBtnIsAble() ? '' : 'disabledBtn'}`} onClick={this.determineHandle}>{json['hrzzmb-000003']}</div>
            </div>
        )
    }
}