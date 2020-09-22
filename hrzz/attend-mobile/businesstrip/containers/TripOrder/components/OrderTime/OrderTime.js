import React, { Component } from 'react';
import './OrderTime.less'
import { formatTime}from "../../../../../../public/mobile/utils/index"
import xian from "../../../../../images/tou.png"
import {orderState,timeFormate} from "../../../../../utils/index"

class OrderItem extends Component {

    render() {
        const {order,orderBefore = ()=>{},orderAfter=()=>{},orderDelete=()=>{},json={}} =this.props
        return (
            <div className="details">
                <h4><span className="title">{order.triptypeid.display}</span> <span className="btn" style={orderState(order.approvestatus.value).style}>{order.approvestatus.display}</span></h4>
                <div className="old">
                    <section className="boxcontent">
                        <div className="boxtime">
                            <div className="title">{json["hrzzmb-000190"]}</div>
                            <div>{formatTime(new Date(timeFormate(order.tripbegintime.value)),"yyyy-MM-dd")}</div>
                            <div>{formatTime(new Date(timeFormate(order.tripbegintime.value)),"hh:mm")}</div>
                        </div>
                        <div className="boximg">
                            <div className="timevalue">{json["hrzzmb-000044"]}{order.tripday.value}{order.minunit.display}</div>
                            <div className="xian">
                                <img src={xian} alt="xian"/>
                            </div>
                        </div>
                        <div className="boxtime">
                            <div className="title">{json["hrzzmb-000191"]}</div>
                            <div>{formatTime(new Date(timeFormate(order.tripendtime.value)),"yyyy-MM-dd")}</div>
                            <div>{formatTime(new Date(timeFormate(order.tripendtime.value)),"hh:mm")}</div>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

export default OrderItem;