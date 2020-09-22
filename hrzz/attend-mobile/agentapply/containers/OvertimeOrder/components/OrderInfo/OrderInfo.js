import React, { Component } from 'react';
import './OrderInfo.less'
import {formatTime} from '../../../../../../public/mobile/utils/index'

class OrderInfo extends Component {
    render() {
        const {order,json} = this.props
        console.log(order)
        return (
            <React.Fragment>
                <section className="orderContentd">
                    <div>{json["hrzzmb-000172"]}</div>
                    <div>{json["hrzzmb-000173"]}</div>
                </section>
                { order.map((bill)=>{
                    return (
                        <div className="orderInfo">
                        <section className="orderContent">
                            <div className="orderTime">
                                <div>{formatTime(new Date(parseInt(bill.overtimebegintime)),"yyyy-MM-dd hh:mm")}-{formatTime(new Date(parseInt(bill.overtimeendtime)),"hh:mm")} </div>
                            </div>
                            <div className="orderType">
                                <div>{bill.overtimetypename}</div>
                            </div>
                        </section>
                       
                        
                    </div>
                    )
               
            })}
             <div className="allTime">
                <span>{json["hrzzmb-000174"]}:</span>
                <span>{order[0].otapplylength}{json["hrzzmb-000154"]}</span>
            </div>
            {order[0].remark ? <div className="allTime">
                <span>{json["hrzzmb-000175"]}:</span>
                <span>{order[0].remark}</span>
            </div>:"" }
           
            </React.Fragment>
        );
    }
}

export default OrderInfo;