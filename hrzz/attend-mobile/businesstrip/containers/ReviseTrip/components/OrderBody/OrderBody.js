import React, { Component } from 'react';
import './OrderBody.less'
const OrderContent = (props) => {
    const {keys,value,json} = props
    console.log(keys,value)
    return(
        <div className="detailShow">
            {keys === "remark"?<span className="title">{json['hrzzmb-000218']}</span>:""} 
            {keys === "handover"?<span className="title">{json['hrzzmb-000219']}</span>:""} 
            {keys === "cost"?<span className="title">{json['hrzzmb-000220']}</span>:""} 
            {keys === "destination"?<span className="title">{json['hrzzmb-000221']}</span>:""} 
            <div className="detailName">{value}</div>
        </div>
    )
}
class OrderBody extends Component {
    render() {
        const {order,json} = this.props
        console.log(order)
        return (
            <div className="leaveoffBody">
                <div className="content">
                {Object.keys(order).map((item)=>{
                   if(item === "remark"&&order[item].value || item === "filepath"&&order[item].value ||item==="handover"&&order[item].value||item==="cost"&&order[item].value || item === "destination"&&order[item].value ){
                    let value = item==="cost" ? order[item].value+"元" : order[item].value
                    return <OrderContent keys={item} value={value} json={json}/>
                   }
               })}
                </div>
            </div>
        );
    }
}

export default OrderBody;