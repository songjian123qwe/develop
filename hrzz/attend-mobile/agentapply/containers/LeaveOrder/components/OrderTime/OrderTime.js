import React, { Component } from 'react';
import './OrderTime.less'
import { formatTime}from "../../../../../../public/mobile/utils/index"
import xian from "../../../../../images/tou.png"
import {orderState,timeFormate} from "../../../../../utils/index"

class OrderItem extends Component {
    render() {
        const {order,orderBefore = ()=>{},orderAfter=()=>{},orderDelete=()=>{},json} =this.props
        console.log(order)
        let minunit  = order.minunit
        let start_day_type = JSON.stringify(order.start_day_type) !== "{}"? order.start_day_type.value:""
        let end_day_type = JSON.stringify(order.end_day_type) !== "{}"? order.end_day_type.value:""
        const Noon = (time) => {
          let val =   formatTime(new Date(timeFormate(time)),"hh:mm")
          console.log(val === "08:00"?json["hrzzmb-000179"]:json["hrzzmb-000180"])
          return val === "08:00"?json["hrzzmb-000179"]:json["hrzzmb-000180"]
        }
        console.log(order)
        return (
            <div className="detailOrder">
                <h4><span className="title">{order.pk_leave_type.display}</span> <span className="btn" style={orderState(order.approvestatus.value).style}>{order.approvestatus.display}</span></h4>
                <div className="old">
                    <section className="boxcontent">
                        <div className="boxtime">
                            <div className="title">{json["hrzzmb-000190"]}</div>
                            <div>{formatTime(new Date(timeFormate(order.showbegindate.value || order.begintime.value )),"yyyy-MM-dd")}</div>
                            {minunit.value === "2"&&start_day_type&&end_day_type?<div>{Noon(order.showbegindate.value || order.begintime.value)}</div>:minunit.value === "1"?<div>{formatTime(new Date(timeFormate(order.showbegindate.value || order.begintime.value)),"hh:mm")}</div>:""}
                        </div>
                        <div className="boximg">
                            <div className="timevalue">{order.breastfeedingleaveway&&order.breastfeedingleaveway.value?"每天":json["hrzzmb-000044"]}{order.breastfeedingleaveway&&order.breastfeedingleaveway.value?order.breastfeedingleaveway.value:order.leaveday.value}{order.minunit.display}</div>
                            <div className="xian">
                                <img src={xian} alt="xian"/>
                            </div>
                        </div>
                        <div className="boxtime">
                            <div className="title">{json["hrzzmb-000191"]}</div>
                            <div>{formatTime(new Date(timeFormate(order.showenddate.value || order.endtime.value)),"yyyy-MM-dd")}</div>
                            {minunit.value === "2"&&start_day_type&&end_day_type?<div>{Noon(order.showenddate.value || order.endtime.value)}</div>:minunit.value === "1"?<div>{formatTime(new Date(timeFormate(order.showenddate.value || order.endtime.value)),"hh:mm")}</div>:""}
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

export default OrderItem;