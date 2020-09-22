import React, { Component } from 'react';
import '../ExchangeInfo.less'
class Exchange extends Component {
   
    render() {
        const { order,json} = this.props
        return (
            <div>
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
                            <div>{order.pk_shift_show.value}</div>
                        </p>
                    </div>
                    <div className="infobox">
                        <div className="title">
                        {json["hrzzmb-000232"]}
                        </div>
                        <p className="content">
                            {order.pk_replace_psndoc.display}
                        </p>
                    </div>
                    <div className="infobox">
                        <div className="title">
                        {json["hrzzmb-000233"]}
                        </div>
                        <p className="content">
                            <div>{order.pk_replace_shift.display}</div>
                            <div>{order.pk_replace_shift_show.display}</div>
                        </p>
                       
                    </div>
            </div>
        );
    }
}

export default Exchange;