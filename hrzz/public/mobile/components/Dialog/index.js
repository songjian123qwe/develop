import {Component} from 'react'
import './index.less'
class Dialog extends Component{
    constructor (props) {
        super(props)
        this.state = {
            showModal: false
        }
    }
    // 显示弹窗
    showDialog = () => {
        this.setState({
            showModal: true
        })
    }
    // 隐藏弹窗
    hideDialog = () => {
        this.setState({
            showModal: false
        })
    }
    render () {
        const {title = '', content='', lBtnText='', rBtnText='', lBtnFun=()=>{this.hideDialog()}, rBtnFun=()=>{}, isShowLeft=false} = this.props
        const {showModal} = this.state
        return (
            <div className="mcDialogCon" style={{display: showModal ? 'block' : 'none'}}>
                <div className="mobileDialog">
                    <div className="mobileContent">
                        <div className="mcHeader">{title}</div>
                        <div className="mcBody">{content}</div>
                        <div className="mcFooter">
                            <div className={isShowLeft ? 'mcLeftBtn' : 'mcFooterBtn'} onClick={lBtnFun} style={{display: isShowLeft ? 'block' : 'none'}}>{lBtnText}</div>
                            <div className={isShowLeft ? 'mcRightBtn' : 'mcFooterBtn'} onClick={rBtnFun}>{rBtnText}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Dialog