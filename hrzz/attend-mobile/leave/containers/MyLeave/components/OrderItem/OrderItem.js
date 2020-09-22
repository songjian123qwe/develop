import React, { Component } from 'react';
import './OrderItem.less'
import { formatTime}from "../../../../../../public/mobile/utils/index"
import xian from "../../../../../images/tou.png"
import {orderState} from "../../../../../utils/index"
import {Modal} from 'antd-mobile'
import {timeFormate} from '../../../../../utils/index'
let alert = Modal.alert
const LeaveRoute = (props) =>{
        const {order,orderBefore,json} = props 
        return (
            <section className="btstatus" >
                <span>{json["hrzzmb-000185"]}</span>
                <div><span className="status" onClick={()=>{orderBefore(order)}} style={orderState(order.approvestatus.value).style}>{order.approvestatus.display}</span> <i class=" hrfont hr-Arrow1" ></i></div>
            </section>
        )
}
const LeaveEliminateRoute = (props) =>{
    const {order,orderAfter,json} = props 
    return (
        <section className="btdeleted">
            <span>{json["hrzzmb-000186"]}</span>
    <div onClick={()=>{orderAfter(order)}}>{JSON.stringify(order.leaveoffapprovestatus) === "{}"?<span>{json['hrzzmb-000292']}</span>:<span className="status" style={orderState(order.leaveoffapprovestatus.value).style} >{order.leaveoffapprovestatus.display}</span>}<i class=" hrfont hr-Arrow1" ></i></div>
        </section>
    )
}
class OrderItem extends Component {
    deleteOrder = () =>{
        const {order,orderDelete,json}= this.props
        alert(json["hrzzmb-000002"], json["hrzzmb-000171"], [
            { text: json["hrzzmb-000024"], onPress: () => console.log('cancel') },
            { text: json["hrzzmb-000187"], onPress: () => {orderDelete(order)} },
        ])
    }
    render() {
        const {order,orderBefore = ()=>{},orderAfter=()=>{},orderDelete=()=>{},json={}} =this.props
        return (
            <div className="detailleave">
                <div className="old">
                    <h4><span >{order.pk_leave_type.display}</span>{order.approvestatus.value == -1 ?<i className="icon hrfont hr-Dustbin_bold" onClick={this.deleteOrder}></i>:""}</h4>
                    <section className="boxcontent">
                        <div className="boxtime">
                            <div>{formatTime(new Date(timeFormate(order.begintime.value)),"yyyy-MM-dd")}</div>
                            <div>{formatTime(new Date(timeFormate(order.begintime.value)),"hh:mm")}</div>
                        </div>
                        <div className="boximg">
                            <div className="timevalue">{order.breastfeedingleaveway&&order.breastfeedingleaveway.value?json['hrzzmb-000294']:json['hrzzmb-000295']}{order.leaveday.value}{order.minunit.display}</div>
                            <div className="xian">
                                <img src={xian} alt="xian"/>
                            </div>
                        </div>
                        <div className="boxtime">
                            <div>{formatTime(new Date(timeFormate(order.endtime.value)),"yyyy-MM-dd")}</div>
                            <div>{formatTime(new Date(timeFormate(order.endtime.value)),"hh:mm")}</div>
                        </div>
                    </section>
                    <LeaveRoute order={order} json={json} orderBefore={orderBefore}/>
                    {order.approvestatus.value === "1"&&order.billsource.value === "0"?<LeaveEliminateRoute json={json} order={order} orderAfter={orderAfter}/>:""}
                </div>
            </div>
        );
    }
}

export default OrderItem;