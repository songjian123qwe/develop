import React, { Component } from 'react';
import './OrderBody.less'
const OrderContent = (props) => {
    const {keys,obj,json} = props
    return(
        <div className="detailShow">
            <span className="title">{keys == "leaveremark"?json["hrzzmb-000181"]:""}</span>
            <span className="detailName">{obj.value}</span>
        </div>
    )
}

class OrderBody extends Component {
    render() {
        const {order,json} = this.props
        console.log(order)
        return (
            <div className="orderbody">
               {Object.keys(order).map((item)=>{
                   if(item === "leaveremark"&&order[item].value || item === "filepath" ){
                        return <OrderContent json={json} keys={item} obj={order[item]}/>
                   }
               })}
            </div>
        );
    }
}

export default OrderBody;
