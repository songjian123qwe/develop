import React, { Component } from 'react';
import {DHeader, DEmpty} from '../../../../public/mobile/components/index'
import ajax from '../../../../public/mobile/utils/ajax'
import { formatTime } from '../../../../public/mobile/utils/index';
import OrderTime from './components/OrderTime/OrderTime'
import './TripOrder.less'
import OrderBody from './components/OrderBody/OrderBody'
import { Toast } from 'antd-mobile';
import {editNav,timeFormate,errHandle} from '../../../utils/index'
import ImgShow from '../../../components/ImgShow/index'
import {getMultiLang} from '../../../../public/mobile/utils/getMultiLang'


const url ={
    id:'/nccloud/hrkq/trip/QueryByIdAction.do',
    recallAction:'/nccloud/hrkq/trip/ReCallAction.do'
}
class TripOrder extends Component {
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
        this.props.history.push({pathname:"/mytrip",query:{time:new Date(timeFormate(order.tripbegintime.value)).getTime()}});
    }
    rightClick =  () => {
        console.log("object")
        const {order} = this.state
        this.props.history.push({pathname:"/tripprocess",query:{id:order.pk_trip.value,billtype:order.billtype.value,orderType:1}});
    }
      // 获取单据信息
      QueryById(id){
       let {json} = this.state
        Toast.loading(json["hrzzmb-000001"],0)
        ajax({
            url: url.id,
            noNeedShowError: false,
            data: {
                pk_trip:id
            },
            success: (result) => {
                console.log(result)
                this.setState({
                    order:result.data.trip.trip_card.rows[0].values
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
     recallOrder =()=>{
        const {order,json} = this.state
        Toast.loading(json["hrzzmb-000001"],0)
        ajax({
            url: url.recallAction,
            noNeedShowError: false,
            data: {
                pk:order.pk_trip.value
            },
            success: (result) => {
                console.log(result)
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
                        name:json["hrzzmb-000214"],
                        rText:routerData.billsource === "0"?json["hrzzmb-000189"]:""
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
        window.location.hash ='?&c=60657040&p=60657040&ar=0001Z510000000065KV7&id=0'
        let routeData = this.props.location.query
        this.getLanguage(routeData)
    }
    render() {
        const {header,order,json} = this.state
        console.log(json)
        return (
            <div className="tripOrder">
                <div className="header">
                    <DHeader title={header.name} leftClick={this.leftClick} rText={header.rText} rightClick={this.rightClick}  />
                </div>
                <div className="orderDetail">
                    {JSON.stringify(order) === "{}"&&json?"":<OrderTime json={json} order={order}/>}
                    {JSON.stringify(order) === "{}"&&json?"":<OrderBody json={json} order={order}/>}
                    {JSON.stringify(order) === "{}"&&json?"":<ImgShow  json={json} billId={order.pk_trip.value}/>}
                </div>
                {
                    order.approvestatus&&order.approvestatus.value === '3'?<div className="footer" onClick={this.recallOrder}>{json["hrzzmb-000170"]}</div>:""
                }
            </div>
        );
    }
}

export default TripOrder;