import React, { Component } from 'react';
import './TimeShow.less'
import { formatTime}from "../../../../../../public/mobile/utils/index"
import xian from "../../../../../images/tou.png"
import {timeFormate} from '../../../../../utils/index'

class OrderItem extends Component {
    render() {
        const {order,json} =this.props
        let minunit  = order.minunit
        let start_day_type = JSON.stringify(order.start_day_type) === "{}"? order.start_day_type.value:""
        let end_day_type = JSON.stringify(order.end_day_type) === "{}"? order.end_day_type.value:""
        return (
            <div className="detailReviseStatus">
                <div className="old" >
                    <section className="boxcontent">
                    <div className="box">
                    <div className="boxtime">
                            <div className="title">{json["hrzzmb-000211"]}</div>
                            <div>{formatTime(new Date(timeFormate(order.tripoffbegintime.value)),"yyyy-MM-dd")}</div>
                            <div>{formatTime(new Date(timeFormate(order.tripoffbegintime.value)),"hh:mm")}</div>
                        </div>
                        <div className="boximg">
                            <div className="timevalue">{json["hrzzmb-000044"]}{order.tripoffday.value}{minunit.display}</div>
                            <div className="xian">
                                <img src={xian} alt="xian"/>
                            </div>
                        </div>
                        <div className="boxtime">
                            <div className="title">{json["hrzzmb-000212"]}</div>
                            <div>{formatTime(new Date(timeFormate(order.tripoffendtime.value)),"yyyy-MM-dd")}</div>
                            <div>{formatTime(new Date(timeFormate(order.tripoffendtime.value)),"hh:mm")}</div>
                        </div>
                    </div>
                       
                    </section>
                </div>
            </div>
        );
    }
}

export default OrderItem;