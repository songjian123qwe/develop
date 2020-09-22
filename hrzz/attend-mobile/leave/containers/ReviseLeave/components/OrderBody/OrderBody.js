import React, { Component } from 'react';
import './OrderBody.less'
class OrderBody extends Component {
    render() {
        const {order,json} = this.props
        console.log(order)
        return (
            <div className="leaveoffBody">
               {order.leaveremark&&order.leaveremark.value?
                 <ul className="content">
                    <li>
                        <div>{json["hrzzmb-000181"]}</div>
                        <div>{order.leaveremark.value}</div>
                    </li>
                        
                </ul>:""}
                {order.breastfeedingleaveway&&order.breastfeedingleaveway.value?
                 <ul className="content">
                    <li>
                <div>{json['hrzzmb-000290']}</div>
                        <div>{order.breastfeedingleaveway.display}</div>
                    </li>
                        
                </ul>:""}
                {order.breastfeedingleaveday&&order.breastfeedingleaveday.value?
                 <ul className="content">
                    <li>
                        <div>{json['hrzzmb-000291']}</div>
                        <div>{order.breastfeedingleaveway.display}</div>
                    </li>
                        
                </ul>:""}
            </div>
        );
    }
}

export default OrderBody;