import React, { Component } from 'react';
import {DHeader, DEmpty} from '../../../../public/mobile/components/index'
import ajax from '../../../../public/mobile/utils/ajax'
import { formatTime } from '../../../../public/mobile/utils/index';
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
             rText: ""
         },
         order: {},
         json:{}
      }
    }
     // 返回
    leftClick =  () => {
        const {order} = this.state
        this.props.history.push({pathname:"/myleave",query:{time:new Date(timeFormate(order.begintime.value)).getTime()}});
    }
    rightClick =  () => {
        const  {order} = this.state
        this.props.history.push({pathname:"/leaveprocess",query:{id:order.pk_leave.value,billtype:order.billtype.value,orderType:1}});
    }
      // 获取单据信息
      QueryById(id){
        let {json} = this.state
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
                errHandle(err,json)
                Toast.hide()
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
                errHandle(err,json)
                Toast.hide()
            }
        })
    }
    getLanguage = (routerData) => {
        console.log("object",routerData.billsource === "0")
        getMultiLang({
            domainName: "hrzz",
            moduleId: "hrzzmb",
            other:true,
            datatype: true,
            callback: (json, status, init) => {
                this.setState({
                    json: json,
                    header:{
                        name:json["hrzzmb-000188"],
                        rText:routerData.billsource === "0"?json["hrzzmb-000189"]:""
                    }
                },()=>{
                    const {header} = this.state
                    editNav(header,this.leftClick,this.rightClick)
                    this.QueryById(routerData.id)
                })
            }
        })
    }
    componentWillMount() {
        window.location.hash ='?&c=60657020&p=60657020&ar=0001Z510000000065KV7&id=0'
        let routeData = this.props.location.query
        this.getLanguage(routeData)
       
    }
    componentDidMount() {
        
    }
    
    render() {
        const {header,order,json} = this.state
        return (
            <div className="leaveOrder">
                <div className="header">
                    <DHeader title={header.name} leftClick={this.leftClick} rText={header.rText} rightClick={this.rightClick}  />
                </div>
                <div className="orderDetail">
                    {JSON.stringify(order) === "{}"?"":<OrderTime order={order} json={json}/>}
                    {JSON.stringify(order) === "{}"?"":<OrderBody order={order} json={json}/>}
                    {JSON.stringify(order) === "{}"?"":<ImgShow json={json} billId={order.pk_leave.value}/>}
                </div>
                {
    order.approvestatus&&order.approvestatus.value === '3'?<div className="footer" onClick={this.recallOrder}>{json['hrzzmb-000170']}</div>:""
                }
            </div>
        );
    }
}

export default LeaveOrder;