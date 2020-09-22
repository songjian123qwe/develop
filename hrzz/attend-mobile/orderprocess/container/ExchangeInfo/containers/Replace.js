import React, { Component } from 'react';
import '../ExchangeInfo.less'
class Replace extends Component {
    render() {
        const { order,json} = this.props
        return (
            <div className="replace">
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
                            {order.pk_shift.display}
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
            </div>
        );
    }
}

export default Replace;