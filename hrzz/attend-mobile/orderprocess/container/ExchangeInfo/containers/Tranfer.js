import React, { Component } from 'react';
import '../ExchangeInfo.less'
class Tranfer extends Component {
    render() {
        const { order,json} = this.props
        return (
            <div className="">
                 <div className="infobox">
                        <div className="title">
                        {json["hrzzmb-000230"]}
                        </div>
                        <p className="content">
                            {order.type.display}
                        </p>
                    </div>
                    
                    <div className="infobox">
                        <div className="title">
                        {json["hrzzmb-000231"]}
                        </div>
                        <p className="content">
                            <div>{order.pk_shift.display}</div>
                            <div>{order.pk_shift_show.display?order.pk_shift_show.display:""}</div>
                        </p>
                    </div>
                    <div className="infobox">
                        <div className="title">
                          {json["hrzzmb-000233"]}
                        </div>
                        <p className="content">
                            <div>{order.pk_replace_add_shift.display}</div>
                            <div>{order.pk_replace_shift_show.display?order.pk_replace_shift_show.display:""}</div>
                        </p>
                    </div>
                   
            </div>
        );
    }
}

export default Tranfer;