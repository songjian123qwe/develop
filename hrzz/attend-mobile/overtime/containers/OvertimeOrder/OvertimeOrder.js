import React, { Component } from 'react';
import {formatTime} from '../../../.../../../public/mobile/utils/index'
import {DHeader} from '../../../../public/mobile/components/index'
import ajax from '../../../../public/mobile/utils/ajax';
import {  Toast } from 'antd-mobile';
import './OvertimeOrder.less'
import OrderInfo from './components/OrderInfo/OrderInfo'
import OrderProcess from '../../../../public/mobile/components/Module/approval_process/main/index'
import {editNav,errHandle} from '../../../utils/index'
import {getMultiLang} from '../../../../public/mobile/utils/getMultiLang'
import PopChoice from '../../../components/PopChoice/PopChoice'
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
             json:{},
             choiceData:{
                data:[],
                show:false,
                person:""
              },
              content:null
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
        this.props.history.push({pathname:"/myovertime",query:{time:time}});
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
    queryById = (pk_diwork,json) => {
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
                if(result.data.billstatus === "1"||result.data.billstatus==="5"|| result.data.billstatus==="14" ||result.data.billstatus==="12"){
                    this.setState({
                        header:{
                            name:json["hrzzmb-000167"],
                            rText: json["hrzzmb-000095"]
                        }
                    })
                }
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
     commitBill = (val=null) => {
         console.log(val);
        const {pk_overtime,orderData,json,content} = this.state
       Toast.loading(json["hrzzmb-000001"],0)
       let param = {
           pk:pk_overtime
        }
        if(val&&val.person){
            content.content[0].uservos = [...val.person]
            param.content = content
        }
       ajax({
           url: url.commitAction,
           noNeedShowError: false,
           data:param,
           success: (result) => {
            if(result.data){
                const {choiceData} = this.state
                const content = result.data.content
                const data = result.data.content.content[0].uservos
                choiceData.data = [...data]
                choiceData.show =  true
                 this.setState({
                    choiceData,
                    content
                 })

            } else {
               this.props.history.push({pathname:"/myovertime",query:{time:orderData[0].overtimebegintime}});
            }
               Toast.hide()
           },
           error:(err)=>{
                Toast.hide()
           }
       })
   }
    getLanguage = () => {
        let routerData = this.props.location.query
        getMultiLang({
            domainName: "hrzz",
            moduleId: "hrzzmb",
            other: true,
            callback: (json, status, init) => {
                if(routerData.status ===  "1" || routerData.status ===  "12" || routerData.status ===  "14" || routerData.status ===  "5"){
                    let header =  {
                        name:json["hrzzmb-000167"],
                        rText:json["hrzzmb-000095"]
                    }
                    editNav(header,this.leftClick,this.rightClick)
                    this.setState({
                        json: json,
                        header:header,
                    },()=>{
                        this.queryById(routerData.pk_diwork,json)
                    })
                } else {
                    let header ={
                        name:json["hrzzmb-000167"],
                    }
                    editNav(header,this.leftClick,this.rightClick)
                    this.setState({
                        json: json,
                        header:header
                    },()=>{
                        this.queryById(routerData.pk_diwork,json)
                    })
                }

            }
        })
    }
    componentWillMount() {
        this.getLanguage()
    }

    componentDidMount() {
        let {json} = this.state
        window.location.hash ='?&c=60657030&p=60657030&ar=0001Z510000000065KV7'
        let routerData = this.props.location.query
        this.setState({
            routerData:routerData
        })

    }
    onOk = (val) =>{
        let {choiceData} = this.state
        choiceData.show = false
        choiceData.person = [...val]
        this.setState({
            choiceData
        },()=>{
            this.commitBill(choiceData)
        })

    }
    onCancel = () =>{
        let {choiceData} = this.state
        choiceData.show = false
        this.setState({
            choiceData
        })
    }
    render() {
        const {orderData,orderStatus,processData,json,choiceData,routerData } = this.state
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
               <PopChoice showModel={choiceData.show} chData={choiceData.data} onOk={this.onOk} onCancel={this.onCancel}/>
               { orderData.length>0?<OrderInfo json={json} order = {orderData} />:""}
              {routerData.billsource === '0'? <OrderProcess processData={processData} /> : ''}
               {opearAction(orderStatus)}
            </div>
        );
    }
}

export default OvertimeOrder;