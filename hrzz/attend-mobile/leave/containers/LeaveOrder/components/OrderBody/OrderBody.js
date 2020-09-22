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
const OrderSpecial = (props) => {
    const {keys,obj,json} = props
    return(
        <div className="detailShow">
            <span className="title">{keys == "breastfeedingleaveway"?json['hrzzmb-000290']:json['hrzzmb-000291']}</span>
            <span className="detailName">{obj.display}</span>
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
                   if(item === "leaveremark"&&order[item].value  ){
                        return <OrderContent keys={item} obj={order[item]} json={json}/>
                   }
                   if(item === "breastfeedingleaveway"&&order[item].value || item === "breastfeedingleaveday"&&order[item].value){
                       return <OrderSpecial keys={item} obj={order[item]} json={json}/>
                   }
               })}
            </div>
        );
    }
}

export default OrderBody;
