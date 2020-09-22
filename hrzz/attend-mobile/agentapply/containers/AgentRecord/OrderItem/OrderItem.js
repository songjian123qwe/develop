import React, { Component } from 'react';
import { formatTime}from '../../../../../public/mobile/utils/index'
import './OrderItem.less'
class OrderItem extends Component {
  
    render() {
        const  {order,json} = this.props
        const bill = order
        const { linkOrder = (id) => {console.log(id)}, deleteOrder = (order)=>{console.log(order)}} = this.props
        const statusFont = (val) => {
            if(val === "1"|| bill.billstatus === "12"||bill.billstatus === "14"||bill.billstatus === "5"){
                return json['hrzzmb-000163']
            } else if (val === "2"){
                return json['hrzzmb-000023']
            }else if (val === "3"){
                return json["hrzzmb-000164"]
            } else if (val === "4"){
                return json["hrzzmb-000165"]
            }else if (val === "5"){
                return json["hrzzmb-000166"]
            }
        }
        return (
            <div className="itemorder">
            <div class="btitem" >
            <h4 class="bttitle"><span>{bill.applicantname}</span>-<span>{bill.type==="1"?json["hrzzmb-000176"]:json["hrzzmb-000150"]}</span>{bill.approvestatus === "1"||bill.approvestatus === "14" ?<i  onClick={()=>{deleteOrder(bill)}} class="icon hrfont hr-shanchu " ></i>:""}</h4>
            <div class="btbody">
                <div class="bttime">
                    <div class="starttime">{formatTime(new Date(parseInt(bill.stime)),'yyyy-MM-dd hh:mm')}</div>

                    <div class="endtime">{formatTime(new Date(parseInt(bill.etime)),'yyyy-MM-dd hh:mm')}</div>
                </div>
                <div class="totaltime">
                    {json["hrzzmb-000044"]}{bill.type === "3"?<span>{bill.iscalculate? bill.duration:bill.applylen}</span>:""}<span >{bill.type === "1"?bill.duration:""}</span><span>{bill.minunit === "1"?json["hrzzmb-000154"]:json["hrzzmb-000155"]}</span>
                </div>
            </div>
            <div class="btfooter">
                <div class="shenpi">{json["hrzzmb-000162"]}</div>
                <div class="btstatusd" onClick={()=>{linkOrder(bill)}} ><span>{statusFont(bill.approvestatus)}</span> <i class="icon hrfont hr-Arrow1"></i></div>
            </div>

        </div>
        </div>
        );
    }
}

export default OrderItem;