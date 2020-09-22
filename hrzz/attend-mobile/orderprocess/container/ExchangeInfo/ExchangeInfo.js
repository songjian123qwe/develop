import React, { Component } from 'react';
import './ExchangeInfo.less'
import {Toast} from 'antd-mobile'
import {formatTime} from '../../../../public/mobile/utils/index'
import ajax from '../../../../public/mobile/utils/ajax'
import Exchange from './containers/Exchange'
import Replace from './containers/Replace'
import Tranter from './containers/Tranfer'
import {errHandle} from '../../../utils/index'
const url = {
    queryById:'/nccloud/hrkq/replacecalendar/QueryByIdMobileAction.do',
}

class ExchangeInfo extends Component {
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
                pk_replacecalendar:id
            },
            success: (result) => {
                Toast.hide()
                
                if(result.data){
                    let order = result.data.replacecalendar.replacecalendar_card.rows[0].values
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
        window.location.hash ='?&c=60657050&p=60657050'
        const {id,callback} = this.props
        this.queryById(id,callback)
    }
    
    render() {
        const {order} = this.state
        let typeChoose =  (order) => {
            const {json} = this.props
           if (order.type.value === "0") {
                return <Exchange order={order} json={json}></Exchange>
           }
           if (order.type.value === "1") {
                return <Replace order={order} json={json}></Replace>
           }
           if (order.type.value === "2") {
            return <Tranter order={order} json={json}></Tranter>
        }
        } 
        return (
            <div className="exchangeinfo">
                <div className="ordericon">
                {order.approvestatus&&order.approvestatus.value === "1"?<span className="hrfont hr-zhang- green"><i>{order.approvestatus.display}</i></span>:""}
                {order.approvestatus&&order.approvestatus.value === "0"?<span className="hrfont hr-zhang- red"><i>{order.approvestatus.display}</i></span>:""}
                </div>
                <div className="">
                   {JSON.stringify(order)!== "{}"?typeChoose(order):""}
                </div>
                
            </div>
        );
    }
}

export default ExchangeInfo;