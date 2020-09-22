import React, { Component } from 'react';
import './OrderItem.less'
import { formatTime}from "../../../../../../public/mobile/utils/index"
import xian from "../../../../../images/tou.png"
import {timeFormate} from '../../../../../utils/index'

class OrderItem extends Component {
    render() {
        const {order,deleteFun,json} =this.props
        let minunit  = order.minunit
        console.log(order)
        return (
            <div className="detailRevise">
                {order.dr_flag.value === "1"?<div className="deleicon" ><i className="icon hrfont hr-fenzu"></i><span>{json['hrzzmb-000287']}</span></div>:""}
                <div className="old" >
                    <section className="boxcontent">
                    <div className="title">
                        <span>{json["hrzzmb-000162"]}</span> 
                        {order.approvestatus.value === "-1"&&order.dr_flag.value === "0"?<span onClick={deleteFun} className="icon hrfont hr-Dustbin_bold" ></span>:""}
                    </div>
                    <div className="box">
                    <div className="boxtime">
                            <div className="title">{json['hrzzmb-000288']}</div>
                            <div>{formatTime(new Date(timeFormate(order.tripbegintime.value)),"yyyy-MM-dd")}</div>
                            <div>{formatTime(new Date(timeFormate(order.tripbegintime.value)),"hh:mm")}</div>
                        </div>
                        <div className="boximg">
        <div className="timevalue">{json['hrzzmb-000044']}{order.tripday.value}{minunit.display}</div>
                            <div className="xian">
                                <img src={xian} alt="xian"/>
                            </div>
                        </div>
                        <div className="boxtime">
                            <div className="title">{json['hrzzmb-000289']}</div>
                            <div>{formatTime(new Date(timeFormate(order.tripendtime.value)),"yyyy-MM-dd")}</div>
                            <div>{formatTime(new Date(timeFormate(order.tripendtime.value)),"hh:mm")}</div>
                        </div>
                    </div>
                       
                    </section>
                </div>
            </div>
        );
    }
}

export default OrderItem;