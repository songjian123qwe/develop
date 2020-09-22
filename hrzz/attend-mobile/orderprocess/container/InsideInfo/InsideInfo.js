import React, { Component } from 'react';
import './InsideInfo.less'
import {Toast} from 'antd-mobile'
import {formatTime} from '../../../../public/mobile/utils/index'
import ajax from '../../../../public/mobile/utils/ajax'
import {errHandle} from '../../../utils/index'

const url = {
    queryById:'/nccloud/hrkq/attendance/QueryByIdMobileAction.do',
}
class InsideInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
             order:{}
        }
    }
        // 获取单据信息
    queryById(id,callback){
        const {json} = this.props
        Toast.loading(json["hrzzmb-000001"],0)
        ajax({
            url: url.queryById,
            noNeedShowError: false,
            data: {
                pk_attendance:id
            },
            success: (result) => {
                Toast.hide()
                
                if(result.data){
                    let order = result.data.attendance.attendance_card.rows[0].values
                    callback(order.approvestatus.value)
                    this.setState({
                        order:order
                    })
                }
            },
            error: (err) =>{
                Toast.hide()
                errHandle(err,json)
            }
        })
    }
    componentDidMount() {
        window.location.hash ='?&c=60657010&p=60657010&ar=0001Z510000000065KV7&id=0'
        const {id,callback} = this.props
        this.queryById(id,callback)
    }
    
    render() {
        const {order} = this.state
        const {json} = this.props
        const attencestatus = (status)=>{
            const {json} = this.props
            if(status === "1"){
                return <span>{json["hrzzmb-000234"]}</span>
            }
            if(status === "2"){
                return <span>{json["hrzzmb-000235"]}</span>
            }
            if(status === "3"){
                return <span>{json["hrzzmb-000236"]}</span>
            }
        }
        return (
            <div className="insideinfo">
                <div className="ordericon">
                {order.approvestatus&&order.approvestatus.value === "1"?<span className="hrfont hr-zhang- green"><i>{order.approvestatus.display}</i></span>:""}
                {order.approvestatus&&order.approvestatus.value === "0"?<span className="hrfont hr-zhang- red"><i>{order.approvestatus.display}</i></span>:""}
                </div>
                <div className="infobox">
                    <div className="title">
                        {json["hrzzmb-000237"]}
                    </div>
                    <p className="content">
                       {order.creator?order.creator.display:""}
                    </p>
                </div>
                <div className="infobox">
                    <div className="title">
                        {json["hrzzmb-000238"]}
                    </div>
                    <p className="content">
                        {order.fill_time&&order.fill_time.value?order.fill_time.value:""}
                    </p>
                </div>
                <div className="infobox">
                    <div className="title">
                    {json["hrzzmb-000239"]}
                    </div>
                    <p className="content">
                        {order.original_sign_status&&order.original_sign_status.value?attencestatus(order.original_sign_status.value):""}
                        {order.original_sign_time?order.original_sign_time.value:"无记录"}
                    </p>
                </div>
                <div className="infobox">
                    <div className="title">
                    {json["hrzzmb-000240"]}
                    </div>
                    <p className="content">
                        {order.fill_type_id?order.fill_type_id.display:""}
                    </p>
                </div>
                <div className="infobox">
                    <div className="title">
                    {json["hrzzmb-000241"]}
                    </div>
                    <p className="content">
                        {order.fill_reason?order.fill_reason.value:""}
                    </p>
                </div>
            </div>
        );
    }
}

export default InsideInfo;