import React, { Component } from 'react';
import './OutsideInfo.less'
import {Toast} from 'antd-mobile'
import {formatTime} from '../../../../public/mobile/utils/index'
import ajax from '../../../../public/mobile/utils/ajax'
import {errHandle} from '../../../utils/index'
const url = {
    queryById:'/nccloud/hrkq/outside/QueryByIdMobileAction.do',
}
class OutsideInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
             order:{}
        }
    }
        // 获取单据信息
    queryById(id,callback){
        const {json} = this.props
        Toast.loading(json["hrzzmb-000001"],0)
        ajax({
            url: url.queryById,
            noNeedShowError: false,
            data: {
                pk_outside:id
            },
            success: (result) => {
                Toast.hide()
                if(result.data){
                    let order = result.data.outside.outside_card.rows[0].values
                    callback(order.approvestatus.value)
                    this.setState({
                        order:order
                    })
                }
            },
            error: (err) =>{
                Toast.hide()
                errHandle(err,json)
            }
        })
    }
    componentDidMount() {
        window.location.hash ='?&c=60657010&p=60657010&ar=0001Z510000000065KV7&id=0'
        const {id,callback} = this.props
        this.queryById(id,callback)
    }
    
    render() {
        const {order} = this.state
        const {json} = this.props
        return (
            <div className="ovetimeinfo">
                <div className="ordericon">
                {order.approvestatus&&order.approvestatus.value === "1"?<span className="hrfont hr-zhang- green"><i>{order.approvestatus.display}</i></span>:""}
                {order.approvestatus&&order.approvestatus.value === "0"?<span className="hrfont hr-zhang- red"><i>{order.approvestatus.display}</i></span>:""}
                </div>
                <div className="infobox">
                    <div className="title">
                        {json["hrzzmb-000246"]}
                    </div>
                    <p className="content">
                       {order.sign_time?order.sign_time.value.slice(0,-3):""}
                    </p>
                </div>
                <div className="infobox">
                    <div className="title">
                        {json["hrzzmb-000247"]}
                    </div>
                    <p className="content">
                        {order.outsideplace?order.outsideplace.value:""}
                    </p>
                </div>
                <div className="infobox">
                    <div className="title">
                        {json["hrzzmb-000248"]}
                    </div>
                    <p className="content">
                        {order.remark?order.remark.value:""}
                    </p>
                </div>
                <div className="infobox">
                    <div className="title">
                        {json["hrzzmb-000249"]}
                    </div>
                    <p className="content">
                        {order.dealReason?order.dealReason.value:""}
                    </p>
                </div>
                <div className="infobox">
                    <div className="imgtitle">{json["hrzzmb-000022"]}</div>
                    <div className="imgbox">
                        {order.fileUrlList&&order.fileUrlList.value?order.fileUrlList.value.split(",").map((item,index) => {
                            return (
                                <img url={item} key={index} />
                            )
                        }):""}
                    </div>
                </div>
            </div>
        );
    }
}

export default OutsideInfo;