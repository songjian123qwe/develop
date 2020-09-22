import {Component} from 'react'
import './index.less'
import Avatar from '../../../../public/mobile/static/images/avatar.png'
import md5 from 'md5'
export default class QueryIndex extends Component{
    constructor (props) {
        super(props)
        this.state = {
            passVal: "",
            passValCopy: "",
            showPass: false, // 是否显示密码
            listData: null,
            showHiddenIconClass: 'hr-biyan'
        }
    }
    componentDidMount () {

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
    // 点击忘记密码
    forgetPassword = () => {
        const {setShowPage, pushPageIndex, sendCode} = this.props
        setShowPage(2)
        pushPageIndex(2)
        sendCode()
    }
    // 点击确定按钮执行函数
    sureBtnHandle = () => {
        const {passVal} = this.state
        if (passVal < 6) {
            return false
        } else {
            let pwd = md5(passVal)
            const {startDate, endDate, cuserid, showList} = this.props
            showList(startDate, endDate, cuserid, pwd)
        }
    }
    // 判断按钮是否可以点击
    judgeBtnIsAble = () => {
        const {passVal} = this.state
        if (passVal.length < 6) {
            return false
        } else {
            return true
        }
    }
    render () {
        const {passValCopy, showPass, passVal, showHiddenIconClass} = this.state
        const {photoBase64, json} = this.props
        return (
            <div className="queryIndex">
                <img className="qiFir" src={!photoBase64 || photoBase64 === '' ? Avatar : photoBase64} alt=""/>
                <div className="clearFloat"></div>
                {/* 请输入工资查询密码 */}
                <div className="qiSec">{json['hrzzmb-000307']}</div>
                <div className="qiThi">
                    <input 
                        className="qitIpt"
                        type="number" value={passVal}
                        onChange={this.passwordIptChange}
                        style={{color: showPass ? '#111' : 'transparent'}}/>
                    <span className="qitClear hrfont hr-close" onClick={this.clearPassword}></span>
                    <span className={`qitHidden hrfont ${showHiddenIconClass}`} onClick={this.showHidddenPassword}></span>
                    <div style={{color: showPass ? 'transparent' : '#111'}} className="copyIptVal">{passValCopy}</div>
                </div>
                {/* 忘记密码? */}
                <div className="qiFour"><span onClick={this.forgetPassword}>{`${json['hrzzmb-000308']}?`}</span></div>
                {/* 查询 */}
                <div onClick={this.sureBtnHandle} className={`qiFive ${this.judgeBtnIsAble() ? '' : 'disabledBtn'}`}>{json['hrzzmb-000309']}</div>
            </div>
        )
    }
}