import React, { Component } from 'react';
import {DHeader, DEmpty} from '../../../../public/mobile/components/index'
import ajax from '../../../../public/mobile/utils/ajax'
import OrderTime from './components/OrderTime/OrderTime'
import './LeaveOrder.less'
import { Toast } from 'antd-mobile';
import OrderBody from './components/OrderBody/OrderBody'
import {editNav,timeFormate,errHandle} from '../../../utils/index'
import ImgShow from '../../../components/ImgShow/index'
import {getMultiLang} from '../../../../public/mobile/utils/getMultiLang'

const url ={
    id:'/nccloud/hrkq/leave/QueryByIdAction.do',
    recallAction:'/nccloud/hrkq/leave/ReCallAction.do'
    
}
class LeaveOrder extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         header:{
             name: "",
         },
         order: {},
         json:{}
      }
    }
     // 返回
    leftClick =  () => {
        const {order} = this.state
        this.props.history.push({pathname:"/agentrecord",query:{time:new Date(timeFormate(order.begintime.value)).getTime()}});
    }
      // 获取单据信息
      QueryById(id){
          const {json} = this.state
        Toast.loading(json["hrzzmb-000001"],0)
        ajax({
            url: url.id,
            noNeedShowError: false,
            data: {
                pk_leave:id
            },
            success: (result) => {
                console.log(result)
                this.setState({
                    order:result.data.leave.leave_card.rows[0].values
                })
                Toast.hide()
            },
            error: (err) =>{
                Toast.hide()
                errHandle(err,json)
            }
        })
    }
     // 撤回单据
     recallOrder = () => {
        const {order,json} = this.state
        Toast.loading(json["hrzzmb-000001"],0)
        ajax({
            url: url.recallAction,
            noNeedShowError: false,
            data: {
                pk:order.pk_leave.value
            },
            success: (result) => {
                this.leftClick()
                Toast.hide()
            },
            error: (err) =>{
                Toast.hide()
                errHandle(err,json)
            }
        })
    }
    getLanguage = (routerData) => {
        getMultiLang({
            domainName: "hrzz",
            moduleId: "hrzzmb",
            other:true,
            datatype: true,
            callback: (json, status, init) => {
                this.setState({
                    json: json,
                    header:{
                        name:json["hrzzmb-000258"],
                    }
                },()=>{
                    this.QueryById(routerData.id)
                    const {header} = this.state
                    editNav(header,this.leftClick,this.rightClick)
                })
            }
        })
    }
    componentWillMount() {
        window.location.hash ='?&c=60657020&p=60657020&ar=0001Z510000000065KV7&id=0'
        let routeData = this.props.location.query
        this.getLanguage(routeData)
    }

    render() {
        const {header,order,json} = this.state
        return (
            <div className="leaveOrder">
                <div className="header">
                    <DHeader title={header.name} leftClick={this.leftClick} rText={header.rText} rightClick={this.rightClick}  />
                </div>
                <div className="orderDetail">
                    {JSON.stringify(order) === "{}"?"":<OrderTime json={json} order={order}/>}
                    {JSON.stringify(order) === "{}"?"":<OrderBody json={json} order={order}/>}
                    {JSON.stringify(order) === "{}"?"":<ImgShow  json={json} billId={order.pk_leave.value}/>}
                </div>
                {
                    order.approvestatus&&order.approvestatus.value === '3'?<div className="footer" onClick={this.recallOrder}>{json["hrzzmb-000170"]}</div>:""
                }
            </div>
        );
    }
}

export default LeaveOrder;