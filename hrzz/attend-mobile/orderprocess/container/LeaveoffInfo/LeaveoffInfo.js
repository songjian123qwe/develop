import React, { Component } from 'react';
import './LeaveoffInfo.less'
import {Toast} from 'antd-mobile'
import {formatTime} from '../../../../public/mobile/utils/index'
import ajax from '../../../../public/mobile/utils/ajax'
import ImgShow from '../../../components/ImgShow'
import {errHandle} from '../../../utils/index'

const url = {
    queryById:'/nccloud/hrkq/leaveoff/QueryByIdAction.do',
}
class LeaveoffInfo extends Component {
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
                pk_leave:id
            },
            success: (result) => {
                Toast.hide()
                if(result.data){
                    let order = result.data.leave.leave_card.rows[0].values
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
        window.location.hash ='?&c=606570A0&p=606570A0&ar=0001Z510000000065KV7'
        const {id,callback} = this.props
        this.queryById(id,callback)
    }
    
    render() {
        const {order} = this.state
        const {json} = this.props
        return (
            <div className="ovetimeinfo">
                <div className="ordericon">
                {order.approvestatus&&order.approvestatus.value === "1"?<span className="hrfont hr-zhang- green"><i>{order.approvestatus.display}</i></span>:""}
                {order.approvestatus&&order.approvestatus.value === "0"?<span className="hrfont hr-zhang- red"><i>{order.approvestatus.display}</i></span>:""}
                </div>
                <div className="infobox">
                    <div className="title">
                        {json["hrzzmb-000159"]}
                    </div>
                    <p className="content">
                         {order.leaveoldbegintime?order.leaveoldbegintime.value.slice(5,-3):""}{json['hrzzmb-000243']}{order.leaveoldendtime?order.leaveoldendtime.value.slice(5,-3):""}
                    </p>
                </div>
                <div className="infobox">
                    <div className="title">
                        {`${json["hrzzmb-000176"]}${json["hrzzmb-000159"]}`}
                    </div>
                    <p className="content">
                        {order.leaveday?order.leaveday.value:""}{order.minunit&&order.leaveday&&order.minunit==="1"?json["hrzzmb-000154"]:json["hrzzmb-000155"]}}
                    </p>
                </div>
                <div className="infobox">
                    <div className="title">
                        {json["hrzzmb-000244"]}
                    </div>
                    <p className="content">
                         {order.leaveoffbegintime?order.leaveoffbegintime.value.slice(5,-3):""}{json['hrzzmb-000243']}{order.leaveoffendtime?order.leaveoffendtime.value.slice(5,-3):""}
                    </p>
                </div>
                <div className="infobox">
                    <div className="title">
                        {json["hrzzmb-000245"]}
                    </div>
                    <p className="content">
                        {order.leaveoffday?order.leaveoffday.value:""}{order.minunit&&order.leaveoffday&&order.minunit==="1"?json["hrzzmb-000154"]:json["hrzzmb-000155"]}
                    </p>
                </div>
                
                <div className="infobox">
                    <div className="title">
                        {json["hrzzmb-000181"]}
                    </div>
                    <p className="content">
                        {order.leaveremark?order.leaveremark.value:""}
                    </p>
                </div>
                {JSON.stringify(order) === "{}"?"":<ImgShow billId={order.pk_leave.value}/>}
                
            </div>
        );
    }
}

export default LeaveoffInfo;