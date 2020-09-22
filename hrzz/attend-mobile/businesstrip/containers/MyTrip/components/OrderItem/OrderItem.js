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
            <section className="btstatus">
                <span>{json["hrzzmb-000208"]}</span>
                <div><span className="status" onClick={()=>{orderBefore(order)}} style={orderState(order.approvestatus.value).style}>{order.approvestatus.display}</span> <i class=" hrfont hr-Arrow1" ></i></div>
            </section>
        )
}
const LeaveEliminateRoute = (props) =>{
    const {order,orderAfter,json} = props 
    return (
        <section className="btdeleted">
            <span>{json["hrzzmb-000209"]}</span>
    <div onClick={()=>{orderAfter(order)}}>{JSON.stringify(order.tripoffapprovestatus) === "{}"?<span>{json['hrzzmb-000286']}</span>:<span className="status" style={orderState(order.tripoffapprovestatus.value).style} >{order.tripoffapprovestatus.display}</span>}<i class=" hrfont hr-Arrow1" ></i></div>
        </section>
    )
}
class OrderItem extends Component {
    deleteOrder = () =>{
        const {order,orderDelete,json}= this.props
        alert(json["hrzzmb-000002"], json["hrzzmb-000171"], [
            { text: json["hrzzmb-000024"], onPress: () => console.log('cancel') },
            { text: json["hrzzmb-000003"], onPress: () => {orderDelete(order)}  },
        ])
    }
    render() {
        const {order,orderBefore = ()=>{},orderAfter=()=>{},orderDelete=()=>{},json={}} =this.props
        return (
            <div className="detail">
                <div className="old">
                    <h4><span >{order.triptypeid.display}</span>{order.approvestatus.value == -1 ?<i className="icon hrfont hr-Dustbin_bold" onClick={this.deleteOrder}></i>:""}</h4>
                    <section className="boxcontent">
                        <div className="boxtime">
                            <div>{formatTime(new Date(timeFormate(order.tripbegintime.value)),"yyyy-MM-dd")}</div>
                            <div>{formatTime(new Date(timeFormate(order.tripbegintime.value)),"hh:mm")}</div>
                        </div>
                        <div className="boximg">
                            <div className="timevalue">共{order.tripday.value}{order.minunit.display}</div>
                            <div className="xian">
                                <img src={xian} alt="xian"/>
                            </div>
                        </div>
                        <div className="boxtime">
                            <div>{formatTime(new Date(timeFormate(order.tripendtime.value)),"yyyy-MM-dd")}</div>
                            <div>{formatTime(new Date(timeFormate(order.tripendtime.value)),"hh:mm")}</div>
                        </div>
                    </section>
                    <LeaveRoute json={json} order={order} orderBefore={orderBefore}/>
                    {order.approvestatus.value === "1"&&order.billsource.value === "0"?<LeaveEliminateRoute json={json} order={order} orderAfter={orderAfter}/>:""}
                </div>
            </div>
        );
    }
}

export default OrderItem;