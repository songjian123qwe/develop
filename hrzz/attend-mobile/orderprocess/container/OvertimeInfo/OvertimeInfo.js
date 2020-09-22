import React, { Component } from 'react';
import './OvertimeInfo.less'
import {Toast} from 'antd-mobile'
import {formatTime} from '../../../../public/mobile/utils/index'
import ajax from '../../../../public/mobile/utils/ajax'
import {errHandle} from '../../../utils/index'
const url = {
    queryById:'/nccloud/hrkq/overtime/QueryByIdNccAction.do',
}
class OvertimeInfo extends Component {
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
                pk_overtime:id
            },
            success: (result) => {
                Toast.hide()
                console.log(result)
                if(result.data){
                    let order = result.data.overtime.overtime_card.rows[0].values
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
        window.location.hash ='?&c=60657030&p=60657030&ar=0001Z510000000065KV7'
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
                        {json["hrzzmb-000159"]}
                    </div>
                    <p className="content">
                       {order.overtimebegintime?order.overtimebegintime.value.slice(5,-3):""}{json['hrzzmb-000243']}{order.overtimeendtime?order.overtimeendtime.value.slice(5,-3):""}
                    </p>
                </div>
                <div className="infobox">
                    <div className="title">
                        {json["hrzzmb-000160"]}
                    </div>
                    <p className="content">
                        {order.otapplylength?order.otapplylength.value:""}{json["hrzzmb-000154"]}
                    </p>
                </div>
                <div className="infobox">
                    <div className="title">
                        {json["hrzzmb-000250"]}
                    </div>
                    <p className="content">
                        {order.remark?order.remark.value:""}
                    </p>
                </div>
            </div>
        );
    }
}

export default OvertimeInfo;