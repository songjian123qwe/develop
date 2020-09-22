import React, {Component} from 'react'
import './index.less'
import DefeatHead from '../../../../../public/mobile/static/images/avatar.png'
import {Toast} from 'antd-mobile'
class PersonInfo extends Component{
    constructor(props){
        super(props)
        this.state = {
            
        }
    }
    // 拨打电话
    callPhone (mobile, e) {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        const {json} = this.props
        if (mobile === '') {
            Toast.info(json['hrzzmb-000075'], 2) // 暂无电话信息！
            return false
        }
        this.props.showDialog(mobile)
    }
    // 显示详情
    showDetail () {
        this.props.showDetail()
    }
    render () {
        const {index, personInfo} = this.props
        let hashValue = personInfo.hashValue
        let deptname = hashValue.deptname
        let psnclname = hashValue.psnclname
        let psnname = hashValue.psnname
        let mobile = hashValue.mobile ? hashValue.mobile : ''
        let previewphoto = hashValue.previewphoto ? hashValue.previewphoto : DefeatHead
        return (
            <div className="teamPersonInfo" style={{marginRight: index%2 === 0 ? '0.1rem' : '0rem'}} onClick={this.showDetail.bind(this)}>
                <div className="tpFirst">
                    <img className="tpfPhoto" src={previewphoto} alt=""/>
                    <div className="tpfInfo">
                        <div className="tpfiName">{psnname}</div>
                        <div className="tpfiJob">{psnclname}</div>
                        <div className="tpfiLevel">{deptname}</div>
                    </div>
                </div>
                <div className="tpSecond">
                    <div className="hrfont hr-bubble"></div>
                    <div className="hrfont hr-phone1" onClick={this.callPhone.bind(this, mobile)}></div>
                </div>
            </div>
        )
    }
}
export default PersonInfo