import React, { Component } from 'react';
import { formatTime}from '../../../../../../public/mobile/utils/index'
import './OrderItem.less'
import Sign from '../sign/sign'
class OrderItem extends Component {
    render() {
        const  {order,lang,linkSign=()=>{}} = this.props
        let  showasign = (item) => {
            let sign = item.attendArray
            let now =new Date().getTime();
            let signtime = new Date(item.otdate).getTime()+(24*60*60*1000)
            
            if(item.billstatus == 4  && sign&&sign.length>0&&now>signtime && !parseInt(item.billsource)){
                return true
            } else {
                return false
            }
        }
        const bill = order
        const {linkOrder = (id) => {console.log(id)}} = this.props
        const statusFont = (val) => {
            if(val === "1"|| bill.billstatus === "12"||bill.billstatus === "14"||bill.billstatus === "5"){
                return lang['hrzzmb-000163']
            } else if (val === "2"){
                return lang['hrzzmb-000023']
            }else if (val === "3"){
                return lang["hrzzmb-000164"]
            } else if (val === "4"){
                return lang["hrzzmb-000165"]
            }else if (val === "5"){
                return lang["hrzzmb-000166"]
            }
        }
        let attendArray = bill.attendArray
        console.log(attendArray)
        return (
                <div className="overtimeBlock">
                <section className="overtimeBox">
                        <div className="overtimeItem special">
                        <div className="itemName">{bill.overtimetypename}</div>
                        <div className="itemValue"><span onClick={()=>{linkOrder(bill)}} className="statusText" to={{pathname:"/overtimeorder",query:{id:order.pk_leave}}}>{statusFont(bill.billstatus) }</span><span className="statusIcon hrfont hr-Arrow1"></span></div>
                    </div>
                    <div className="overtimeItem">
                        <div className="itemName">{lang["hrzzmb-000159"]}：</div>
                        <div className="itemValue">{formatTime(new Date(parseInt(bill.overtimebegintime)),"MM-dd hh:mm")}-{formatTime(new Date(parseInt(bill.overtimeendtime)),"MM-dd hh:mm")}</div>
                    </div>
                    <div className="overtimeItem border">
                        <div className="itemName">{lang["hrzzmb-000160"]}：</div>
                        <div className="itemValue">{parseFloat(bill.otapplylength).toFixed(2)}{lang["hrzzmb-000154"]}</div>
                    </div>
                    <div className="overtimeItem footers">
                    <i className="icon hrfont hr-clock2"></i>
                    <div >{lang["hrzzmb-000161"]}</div>
                    <div >{parseFloat(bill.actuallen).toFixed(2)}{lang["hrzzmb-000154"]}</div>
                 </div>
                </section>
               
               {bill.attendArray&&bill.attendArray.length>0 && showasign(bill) ?<Sign attendArray={attendArray} json={lang} linkSign={linkSign}></Sign>:""}
                </div>
        );
    }
}

export default OrderItem;