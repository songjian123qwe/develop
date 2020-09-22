import {Component} from 'react'
import './index.less'
import ajax from '../../../../public/mobile/utils/ajax'
import {Toast} from 'antd-mobile';
export default class extends Component{
    constructor (props) {
        super(props)
        this.state = {
            iptIndex: 0,
            iptArr: [0,0,0,0,0,0],
            isClick: false,
            sendTime: 60,
            val0: '',
            val1: '',
            val2: '',
            val3: '',
            val4: '',
            val5: '',
            email: ''
        }
    }
    // 循环生成input
    returnForInput = () => {
        const {iptArr, iptIndex} = this.state
        return iptArr.map((item, index) => {
            return <input 
                    type="number"
                    maxlength="1"
                    value={this.state[`val${index}`]}
                    id={`code${index}`} 
                    onChange={this.codeIptChange} 
                    className={`codeIpt ${index < iptIndex || index === iptIndex ? 'border1' : 'border2'}`}
                    style={{
                        marginRight: index < 5 ? '0.2rem' : '0rem'
                    }}/>
        })
    }
    codeIptChange = (e) => {
        let id = e.target.id
        let value = e.target.value
        if (value.length > 1) {
            value = value.slice(0, 1)
        }
        let idLen = id.length
        let number = Number(id.substring(idLen - 1))
        if (value !== '') {
            if (number < 5) {
                let ipt = document.getElementById(`code${number + 1}`)
                ipt.focus()
                this.setState({
                    iptIndex: number + 1
                })
            }
        } else {
            if (number > 0) {
                let ipt = document.getElementById(`code${number - 1}`)
                ipt.focus()
                this.setState({
                    iptIndex: number - 1
                })
            }
        }
        this.setState({
            [`val${number}`]: value
        })
    }
    // 点击重新发送触发函数
    resendCode = () => {
        if (!this.state.isClick) {
            this.queryCheckAction()
            this.setState({
                isClick: true
            })
            let timer = setInterval(() => {
                if (this.state.sendTime > 0) {
                    this.setState({
                        sendTime: --this.state.sendTime
                    })
                } else {
                    clearInterval(timer)
                    this.setState({
                        isClick: false,
                        sendTime: 60
                    })
                }
            }, 1000)
        }
    }
    // 调用重新发送验证码的接口
    queryCheckAction = () => {
        const {cuserid} = this.props
        ajax({
            url: '/nccloud/hrzz/payslip/QueryCheckAction.do',
            data: {
                cuserid,
                forgetFlg: 0
            },
            info: {
                appcode: '60652510'
            },
            success: (result) => {
                let email = result.data.email
                this.setState({
                    email
                })
            },
            error: (err) => {
                Toast.info(err.data.error.message)
            }
        })
    }
    // 点击下一步执行函数
    nextBtnHandle = () => {
        const {val0, val1, val2, val3, val4, val5} = this.state
        const {cuserid} = this.props
        if (val0 === '' || val1 === '' || val3 === '' || val4 === '' || val5 === '') {
            return false
        }else {
            
            let veritycode = val0 + val1 + val2 + val3 + val4 + val5
            ajax({
                url: '/nccloud/hrzz/payslip/CheckVeritycodeAction.do',
                data: {
                    cuserid,
                    veritycode
                },
                info: {
                    appcode: '60652510'
                },
                success: (result) => {
                    this.setState({
                        val0: '',
                        val1: '',
                        val2: '',
                        val3: '',
                        val4: '',
                        val5: ''
                    })
                    this.props.setShowPage(3)
                    this.props.pushPageIndex(3)
                },
                error: (err) => {
                    Toast.info(err.data.error.message)
                }
            })
        }
    }
    // 判断按钮是否可以点击
    judgeBtnIsAble = () => {
        const {val0, val1, val2, val3, val4, val5} = this.state
        if (val0 === '' || val1 === '' || val2 === '' || val3 === '' || val4 === '' || val5 === '') {
            return false
        } else {
            return true
        }
    }
    render () {
        const {isClick, sendTime, email} = this.state
        const {json} = this.props
        return (
            <div className="input-code">
                {/* 请输入邮箱验证码 */}
                <div className="icFir">{json['hrzzmb-000303']}</div>
                <div className="icSec">
                    {/* 验证码已发送至 */}
                    <span>{json['hrzzmb-000304']}</span>
                    <span>{email}</span>
                </div> 
                <div className="icThi">
                    {
                        this.returnForInput()
                    }
                </div>
                {/* 后重新发送 重新发送 */}
                <div className={`icFour ${isClick ? 'icFourClicked' : ''}`} onClick={this.resendCode}>{isClick ? `${sendTime}s${json['hrzzmb-000305']}` : json['hrzzmb-000306']}</div>
                {/* 下一步 */}
                <div className={`icFive ${this.judgeBtnIsAble() ? '' : 'disabledBtn'}`} onClick={this.nextBtnHandle}>{json['hrzzmb-000096']}</div>
            </div>
        )
    }
}