import React, { Component } from 'react';
import './OrderItem.less'
import { formatTime}from "../../../../../../public/mobile/utils/index"
import xian from "../../../../../images/tou.png"
import {timeFormate} from '../../../../../utils/index'

class OrderItem extends Component {
    render() {
        const {order,deleteFun,json} =this.props
        let minunit  = order.minunit
        let start_day_type = JSON.stringify(order.leave_start_day_type) !== "{}"? order.leave_start_day_type.value:""
        let end_day_type = JSON.stringify(order.leave_end_day_type) !== "{}"? order.leave_end_day_type.value:""
        const Noon = (time) => {
          let val =   formatTime(new Date(timeFormate(time)),"hh:mm")
          return val === "08:00"?json['hrzzmb-000179']:json['hrzzmb-000180']
        }
        return (
            <div className="detailRevise">
                {order.dr_flag.value === "1"?<div className="deleicon" ><i className="icon hrfont hr-fenzu"></i><span>{json['hrzzmb-000287']}</span></div>:""}
                <div className="old" >
                    <section className="boxcontent">
                    <div className="title">
        <span>{json['hrzzmb-000293']}</span> 
                        {order.approvestatus.value === "-1"&&order.dr_flag.value === "0"?<span onClick={deleteFun} className="icon hrfont hr-Dustbin_bold" ></span>:""}
                    </div>
                    <div className="box">
                    <div className="boxtime">
        <div className="title">{json['hrzzmb-000288']}</div>
                            <div>{formatTime(new Date(timeFormate(order.leavebegintime.value)),"yyyy-MM-dd")}</div>
                            {minunit.value === "2"&&start_day_type&&end_day_type?<div>{Noon(order.leavebegintime.value)}</div>:minunit.value === "1"?<div>{formatTime(new Date(timeFormate(order.leavebegintime.value)),"hh:mm")}</div>:""}
                        </div>
                        <div className="boximg">
        <div className="timevalue">{json['hrzzmb-000044']}{order.leaveday.value}{minunit.display}</div>
                            <div className="xian">
                                <img src={xian} alt="xian"/>
                            </div>
                        </div>
                        <div className="boxtime">
                            <div className="title">{json['hrzzmb-000289']}</div>
                            <div>{formatTime(new Date(timeFormate(order.leaveendtime.value)),"yyyy-MM-dd")}</div>
                            {minunit.value === "2"&&start_day_type&&end_day_type?<div>{Noon(order.leaveendtime.value)}</div>:minunit.value === "1"?<div>{formatTime(new Date(timeFormate(order.leaveendtime.value)),"hh:mm")}</div>:""}
                        </div>
                    </div>
                       
                    </section>
                </div>
            </div>
        );
    }
}

export default OrderItem;