import React, { Component } from 'react';
import './OrderBody.less'
const OrderContent = (props) => {
    const {keys,value,json} = props
   
    return(
        <div className="detailShow">
            {keys === "remark"?<span className="title">{json["hrzzmb-000218"]}</span>:""} 
            {keys === "handover"?<span className="title">{json["hrzzmb-000219"]}</span>:""} 
            {keys === "cost"?<span className="title">{json["hrzzmb-000220"]}</span>:""} 
            {keys === "destination"?<span className="title">{json["hrzzmb-000221"]}</span>:""} 
            <span className="detailName">{value}</span>
        </div>
    )
}

class OrderBody extends Component {
    render() {
        const {order,json} = this.props
        return (
            <div className="orderbody">
               {Object.keys(order).map((item)=>{
                   if(item === "remark"&&order[item].value || item === "filepath"&&order[item].value ||item==="handover"&&order[item].value||item==="cost"&&order[item].value || item === "destination"&&order[item].value ){
                    let value = item==="cost" ? order[item].value+json["hrzzmb-000217"] : order[item].value
                    return <OrderContent json={json} keys={item} value={value}/>
                   }
               })}
            </div>
        );
    }
}

export default OrderBody;
