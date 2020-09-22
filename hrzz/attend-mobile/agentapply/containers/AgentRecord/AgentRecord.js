import React, { Component } from 'react';
import ajax from '../../../../public/mobile/utils/ajax'
import {DHeader,DEmpty} from '../../../../public/mobile/components/index'
import SingleCalendar from '../../../components/SingleCalendar'
import { formatTime}from "../../../../public/mobile/utils/index"
import './AgentRecord.less'
import OrderItem from './OrderItem/OrderItem'
import {  Toast } from 'antd-mobile';
import {editNav,errHandle} from '../../../utils/index'
import {getMultiLang} from '../../../../public/mobile/utils/getMultiLang'

const url = {
    myAgent : '/nccloud/hrkq/insteadapply/QueryInsteadApplyAction.do',
    deleteOvertimeData : '/nccloud/hrkq/overtime/DeleteAction.do',
    deleteLeaveData : '/nccloud/hrkq/leave/DeleteAction.do',
}
class MyAgentApply extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        header:{
            name: '',
        },
        nowDate:new Date(),
        calendarsData:[],
        nowData:[],
        orderData:[],
        totalLength:0,
        json:{}
      }
    }
   // 删除单据
   orderDelete = (order) => {
    const {json} = this.state
    Toast.loading(json["hrzzmb-000001"],0)
    let data = {}
    let urlitem = ""
    if(order.type === "1"){
        data ={pk:order.instanceid}
        urlitem = url.deleteLeaveData
    }
    if(order.type === "3"){
        data={
            pk:order.id,
            billType: "6QJB"
        }
        urlitem = url.deleteOvertimeData
    }
    ajax({
        url: urlitem,
        noNeedShowError: false,
        data: data ,
        success: (result) => {
           Toast.hide()
           let nowDate = new Date(parseInt(order.stime))
           this.myAgentApply(nowDate)
        },
        error: (err) =>{
            errHandle(err,json)
            Toast.hide()
        }
    })
}
    linkOrder = (bill) =>{
        if(bill.type === "1"){
            if(bill.approvestatus === "14"|| bill.approvestatus === "1"){
                this.props.history.push({pathname:'/',query: {
                    id: bill.instanceid,
                    billtype: "6QQJ"
                }})
            } else {
                console.log(bill.approvestatus)
                this.props.history.push({pathname:'/leaveorder',
                query: {
                    id: bill.instanceid
                }
                });
            }
        }
        if(bill.type === "3"){
            if(bill.approvestatus === "14"|| bill.approvestatus === "1"){
                this.props.history.push({pathname:'/',query: {
                    id: bill.instanceid,
                    billtype: "6QJB"
                }})
            } else {
                console.log(bill.approvestatus)
                this.props.history.push({pathname:"/overtimeorder",query:{id:bill.instanceid,pk_diwork:bill.id,status:bill.approvestatus}});
            }
        }
    }
    leftClick = () => {
        this.props.history.push("/");
    }
    getDate(nowTime){
        let objtime = {
            year: nowTime.getFullYear(),
            month: nowTime.getMonth(),
        }
        return objtime
    }
    // 点击时间组件回调
    changeDay = (data)=>{
        console.log(data)
        let {nowData,orderData} = this.state
        if(orderData.length>0){
            nowData = orderData.filter((item,index)=>{
                return formatTime(new Date(data), "yyyy-MM-dd") === item.ot_date.split(" ")[0]
            })
        } else {
            nowData = []
        }
         this.setState({
            nowData:nowData
         })
     }
     
    // 填充日历数据
    handleDateData = (yearData) =>{
        const {nowDate} = this.state
        let day = "01"
        let time = nowDate
        let curDate =  formatTime(time,"yyyy-MM-dd")
        day = this.transformString(time.getDate())
        let data = yearData
        let timeDate = {
            year :time.getFullYear(),
            month : time.getMonth(),
            day : time.getDate()

        }
        let preMonth = new Date(timeDate.year,timeDate.month,1)
        let begin = preMonth.getTime()
        let beginDate = begin - 24*3600*1000*preMonth.getDay();
        let nextMonth = (new Date(timeDate.year,timeDate.month+1,0))
        let end = nextMonth.getTime()
        let endDate  = end + 6*24*3600*1000 - 24*3600*1000*nextMonth.getDay()
        let calendars = [];
        let totalLenth = 0
        while( beginDate <= endDate ){
            let order = []
            if(data.length > 0) {
                order = data.filter((item)=>{
                    if (item.ot_date.split(" ")[0] === formatTime(new Date(beginDate),"yyyy-MM-dd")){
                        return  item.splitBillVOs[0]
                    }
                })
            }
            
            let obj = {
                timenumber: beginDate,
                status:order.length>0?order[0].splitBillVOs[0].approvestatus:""
            }
            let timelen = 0
            order.forEach((item)=>{
                timelen = timelen + Number(item.splitBillVOs[0].actuallen)
            })
            totalLenth = order.length>0? Number(totalLenth)+timelen:Number(totalLenth)
            calendars.push(obj)
            beginDate+=24*3600*1000;
        }
        this.setState({
            calendarsData : calendars,
            orderData: data,
            totalLength:totalLenth.toFixed(2)
        },()=>{
            this.changeDay(new Date(timeDate.year,timeDate.month,timeDate.day).getTime())
        })
        
    }
    // 日期数字格式化
    formatNumber = (month) =>{
        let result;
        if( month < 10 ){
        result = "0" + month.toString();
        }else{
        result = month;
        }
        return result.toString();
    }
        // 日期字符串转换
        transformString (str) {
        if (str.length < 2) {
            str = "0" + str
        } 
        return str;
    }
    //上一个月
    prevMonth = () => {
        let objtime = this.getDate(this.state.nowDate)
        let newTime = new Date(objtime.year,objtime.month+1,1)
        this.setState({
            nowDate:newTime
        })
        this.myAgentApply(newTime)
    }
    // 下一个月
    nextMonth = () => {
        console.log('nextMonth')
        let objtime = this.getDate(this.state.nowDate)
        let newTime = new Date(objtime.year,objtime.month-1,1)
        this.setState({
            nowDate:newTime
        })
        this.myAgentApply(newTime)
    }
    //我的申请查询
    myAgentApply = (time) => {
        const {json} = this.state
         let year = time.getFullYear()
        let month = time.getMonth()
        let date = new Date(year,month+1,0).getDate()
        let obj ={
            startTime:formatTime(new Date(year,month,1,0,0,0),"yyyy-MM-dd hh:mm:ss"),
            endTime:formatTime(new Date(year,month,date,23,59,59),"yyyy-MM-dd hh:mm:ss")
        }
        Toast.loading(json["hrzzmb-000001"])
        ajax({
            url: url.myAgent,
            noNeedShowError: false,
            data:  obj,
            success: (result) => {
                let yearData = result.data
                if(yearData){
                    this.setState({
                        yearData:yearData
                    },()=>{
                        this.handleDateData(yearData)
                    })
                }
                Toast.hide()
                
            },
            error: (err) =>{
                errHandle(err,json)
                Toast.hide()
            }
        })
    }
    getLanguage = (nowDate) => {
        getMultiLang({
            domainName: "hrzz",
            moduleId: "hrzzmb",
            other:true,
            datatype: true,
            callback: (json, status, init) => {
                this.setState({
                    json: json,
                    nowDate,
                    header:{
                        name:json["hrzzmb-000256"]
                    }
                },()=>{
                    this.myAgentApply(nowDate)
                    const {header} = this.state
                    editNav(header,this.leftClick)
                })
            }
        })
    }
    componentWillMount() {
        window.location.hash ='?&c=60657090&p=60657090'
        let routerData = this.props.location.query
        let nowDate = new Date(parseInt(routerData.time))
        this.getLanguage(nowDate)
    }
    
    render() {
        const {nowDate,calendarsData,nowData,json} =this.state
        let orderDatas = nowData.length>0&&nowData[0].splitBillVOs&&nowData[0].splitBillVOs.length>0?nowData[0].splitBillVOs:[]
        return (
            <div className="myovertime">
               <div className="header">
                    <DHeader title={this.state.header.name} leftClick={this.leftClick} type={'wide'}  />
               </div>
               <div className="overtimeBody">
                   <div className="calendarPanel">
                         <SingleCalendar json={json} nowDate={nowDate} calendarsData = {calendarsData} changeDayFun = {this.changeDay} prevMonth={this.prevMonth} nextMonth={this.nextMonth}/>
                   </div>
                    <div className="orderShow">
                        {JSON.stringify(json)!=="{}"&&orderDatas.length>0?orderDatas.map((item)=>{
                            return <OrderItem json={json} order={item} linkOrder = {this.linkOrder} deleteOrder ={this.orderDelete}/>
                        }):<DEmpty/>}
                    </div>
               </div>
            </div>
        );
    }
}

export default MyAgentApply;