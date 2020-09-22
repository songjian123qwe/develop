import React, { Component } from 'react';
import './TimeShow.less'
import { formatTime}from "../../../../../../public/mobile/utils/index"
import xian from "../../../../../images/tou.png"
import {timeFormate} from '../../../../../utils/index'

class OrderItem extends Component {
    render() {
        const {order,json} =this.props
        let minunit  = order.minunit
        let start_day_type = JSON.stringify(order.leaveoff_start_day_type) !== "{}"? order.leave0ff_start_day_type.value:""
        let end_day_type = JSON.stringify(order.leaveoff_end_day_type) !== "{}"? order.leave0ff_end_day_type.value:""
        const timeForm = (time)=>{
            return  time.split(" ")[1] === "08:00:00"?json["hrzzmb-000179"]:json["hrzzmb-000180"]
        }
        return (
            <div className="detailReviseStatus">
                <div className="old" >
                    <section className="boxcontent">
                    <div className="box">
                    <div className="boxtime">
                            <div className="title">{json["hrzzmb-000211"]}</div>
                            <div>{formatTime(new Date(timeFormate(order.leaveoffshowbegindate.value || order.leaveoffbegintime.value)),"yyyy-MM-dd")}</div>
                            {minunit.value === "1"?<div>{formatTime(new Date(timeFormate(order.leaveoffshowbegindate.value || order.leaveoffbegintime.value)),"hh:mm")}</div>:minunit.value === "2"&&start_day_type&&end_day_type?<div>{timeForm(order.showbegindate.value || order.leaveoffbegintime.value)}</div>:""}
                        </div>
                        <div className="boximg">
                            <div className="timevalue">{json["hrzzmb-000044"]}{order.leaveoffday.value}{minunit.display}</div>
                            <div className="xian">
                                <img src={xian} alt="xian"/>
                            </div>
                        </div>
                        <div className="boxtime">
                            <div className="title">{json["hrzzmb-000212"]}</div>
                            <div>{formatTime(new Date(timeFormate(order.leaveoffshowenddate.value || order.leaveoffendtime.value)),"yyyy-MM-dd")}</div>
                            {minunit.value === "1"?<div>{formatTime(new Date(timeFormate(order.leaveoffshowenddate.value || order.leaveoffendtime.value)),"hh:mm")}</div>:minunit.value === "2"&&start_day_type&&end_day_type?<div>{timeForm(order.showenddate.value || order.leaveoffendtime.value)}</div>:""}
                        </div>
                    </div>
                       
                    </section>
                </div>
            </div>
        );
    }
}

export default OrderItem;