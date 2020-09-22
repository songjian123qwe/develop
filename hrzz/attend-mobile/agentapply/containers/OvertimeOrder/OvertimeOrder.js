import React, { Component } from 'react';
import {formatTime} from '../../../.../../../public/mobile/utils/index'
import {DHeader} from '../../../../public/mobile/components/index'
import ajax from '../../../../public/mobile/utils/ajax';
import {  Toast } from 'antd-mobile';
import './OvertimeOrder.less'
import OrderInfo from './components/OrderInfo/OrderInfo'
import OrderProcess from '../../../../public/mobile/components/Module/approval_process/main/index'
import {getMultiLang} from '../../../../public/mobile/utils/getMultiLang'
import {editNav,errHandle} from '../../../utils/index'
import {Modal} from 'antd-mobile'
let alert = Modal.alert
const url = {
    deleteData : '/nccloud/hrkq/overtime/DeleteAction.do',
    queryById : '/nccloud/hrkq/overtime/QueryByIdAction.do',
    recallAction:'/nccloud/hrkq/overtime/ReCallAction.do',
    commitAction: "/nccloud/hrkq/overtime/CommitAction.do",
    process:"/nccloud/workflow/approvalcenter/worklownoteHistoryQuery.do"
}

class OvertimeOrder extends Component {
    constructor(props) {
        super(props)

        this.state = {
             header:{
                 name:"",
                 rText: ''
             },
             routerData:{},
             processData:[],
             orderData:[],
             orderStatus:"",
             pk_overtime:"",
             pk_diwork:"",
             json:{}

        }
    }
    rightClick = () => {
        const  {routerData,json} = this.state
        alert(json["hrzzmb-000002"], json["hrzzmb-000171"], [
            { text: json["hrzzmb-000024"], onPress: () => console.log('cancel') },
            { text: json["hrzzmb-000003"], onPress: () => {this.deleteFun(routerData.id)}  },
        ])

    }
    leftClick = () => {
       const {orderData} = this.state
       let time = orderData[0].overtimebegintime
        this.props.history.push({pathname:"/agentrecord",query:{time:time}});
    }
    // 获取单据流程信息
    getProcess(){
        const {pk_overtime} = this.state
        ajax({
            url: url.process,
            noNeedShowError: false,
            data: {
                billtype:"6QJB",
                billid:pk_overtime
            },
            success: (result) => {
                console.log(result)
              let processData  =   OrderProcess.formatData(result.data.rows.rows)
              console.log(processData)
              this.setState({
                processData:processData
              })
            },
            error:(err)=>{
                Toast.hide()
           }
        })
    }
     // 撤回单据
     recallOrder = () => {
        const {routerData,json} = this.state
        Toast.loading(json["hrzzmb-000001"])
        ajax({
            url: url.recallAction,
            noNeedShowError: false,
            data: {
                pk:routerData.id
            },
            success: (result) => {
               this.leftClick()
               Toast.hide()
            },
            error:(err)=>{
                Toast.hide()
           }
        })
    }
    // 查询单据
    queryById = (pk_diwork) => {
        const {json} = this.state
        Toast.loading(json["hrzzmb-000001"])
       ajax({
           url: url.queryById,
           noNeedShowError: false,
           data:  {
               pk_diwork:pk_diwork
            },
           success: (result) => {
               let order = result.data.splitvolist

               this.setState({
                    orderStatus:result.data.billstatus,
                    orderData:order,
                    pk_overtime:result.data.instanceid,
                    pk_diwork:result.data.id,
               },()=> {
                console.log(result.data.billstatus)
                if(result.data.billstatus !== "1"){
                    this.getProcess()
                }
               })
               Toast.hide()
           },
           error: (err) =>{
            Toast.hide()
            errHandle(err,json)
        }
       })
    }

    // 删除单据
    deleteFun = () => {
        const {routerData,header,json} = this.state
        Toast.loading(json["hrzzmb-000001"])
        if(!header.rText){
            return false
        }
       ajax({
           url: url.deleteData,
           noNeedShowError: false,
           data:  {
            // pk_diwork:routerData.pk_diwork,
            pk:routerData.id,
            billType: "6QJB"
           },
           success: (result) => {
               this.leftClick()
           },
           error: (err) =>{
               Toast.hide()
               errHandle(err,json)
           }
       })
    }
    //编辑单据
    editBill = () => {
        const {routerData} = this.state
        console.log(routerData)
        this.props.history.push({pathname:'/',query: {
            id: routerData.id
        }})

    }
     //提交数据
     commitBill = () => {
        const {pk_overtime,orderData,json} = this.state
       Toast.loading(json["hrzzmb-000001"],0)
       ajax({
           url: url.commitAction,
           noNeedShowError: false,
           data: {
               pk:pk_overtime
           },
           success: (result) => {
               this.props.history.push({pathname:"/agentrecord",query:{time:orderData[0].overtimebegintime}});
               Toast.hide()
           },
           error:(err)=>{
                Toast.hide()
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
                this.queryById(routerData.pk_diwork)
                const {header} = this.state
                editNav(header,this.leftClick,this.rightClick)
            })
        }
    })
}
    componentWillMount() {
        window.location.hash ='?&c=60657030&p=60657030&ar=0001Z510000000065KV7'
        let routerData = this.props.location.query
        this.setState({
            routerData:routerData
        })
        this.getLanguage(routerData)
    }

    render() {
        const {orderData,orderStatus,processData,json} = this.state
        const opearAction = (status) => {
            if(status === "1"|| status === "5"||status === "12"||status === "14"){
                return (
                    <div className="footer active"
                    >
                        <div onClick={this.editBill}>{json["hrzzmb-000169"]}</div>
                        <div onClick={this.commitBill}>{json["hrzzmb-000023"]}</div>
                    </div>
                )
            } else if(status === "2"){
                return (
                    <div className="footer active" onClick={this.recallOrder}>{json["hrzzmb-000170"]}</div>
                )
            }

        }
        return (
            <div className="overtimeOrder">
               <div className="header">
                    <DHeader title={this.state.header.name} leftClick={this.leftClick} type={'wide'} rText={this.state.header.rText} rightClick={this.rightClick}  />
               </div>
               { orderData.length>0?<OrderInfo json={json} order = {orderData} />:""}
               <OrderProcess json={json} processData={processData} />
               {opearAction(orderStatus)}
            </div>
        );
    }
}

export default OvertimeOrder;