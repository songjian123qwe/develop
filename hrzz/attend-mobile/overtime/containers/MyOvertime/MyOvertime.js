import React, { Component } from 'react';
import ajax from '../../../../public/mobile/utils/ajax'
import {DHeader,DEmpty} from '../../../../public/mobile/components/index'
import SingleCalendar from '../../../components/SingleCalendar'
import { formatTime}from "../../../../public/mobile/utils/index"
import './MyOvertime.less'
import OrderItem from './component/OrderItem/OrderItem'
import {  Toast } from 'antd-mobile';
import {editNav,errHandle} from '../../../utils/index'
import {getMultiLang} from '../../../../public/mobile/utils/getMultiLang'
import NativeObj from '../../../../public/mobile/utils/jsbridge/index'
const url = {
    myovertime : '/nccloud/hrkq/overtime/QueryListMobileAction.do',
    deleteData : '/nccloud/hrkq/overtime/DeleteAction.do',
}
class MyOvertime extends Component {
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
        json: {}
      }
    }
    linkSign = (obj) => {
        this.props.history.push({pathname:"/signin",query:obj});
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
                status:order.length>0?order[0].splitBillVOs[0].billstatus:""
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
        this.myOvertime(newTime)
    }
    // 下一个月
    nextMonth = () => {
        console.log('nextMonth')
        let objtime = this.getDate(this.state.nowDate)
        let newTime = new Date(objtime.year,objtime.month-1,1)
        this.setState({
            nowDate:newTime
        })
        this.myOvertime(newTime)
    }
    //我的加班查询
    myOvertime = (time) => {
        let {json} = this.state
        let year = time.getFullYear()
        let month = time.getMonth()
        let date = new Date(year,month+1,0).getDate()
        let obj ={
            overtimebegintime:formatTime(new Date(year,month,1,0,0,0),"yyyy-MM-dd hh:mm:ss"),
            overtimeendtime:formatTime(new Date(year,month,date,23,59,59),"yyyy-MM-dd hh:mm:ss")
        }
        Toast.loading(json["hrzzmb-000001"])
        ajax({
            url: url.myovertime,
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
                Toast.hide()
                errHandle(err,json)
            }
        })
    }
    linkOrder = (order) =>{
        console.log(order)
        this.props.history.push({pathname:"/overtimeorder",query:{id:order.instanceid,pk_diwork:order.pkotmain,status:order.billstatus,billsource:order.billsource}});
    }
    getLanguage = () => {
        getMultiLang({
            domainName: "hrzz",
            moduleId: "hrzzmb",
            other: true,
            callback: (json, status, init) => {
                this.setState({
                    json: json,
                    header:{
                        name:json["hrzzmb-000150"],
                    }
                },()=>{
                    const {header} = this.state
                    editNav(header,this.leftClick)
                })
            }
        })
    }
    registerWatch = ()=>{
        // 从小友回来进行页面刷新
        let that = this
        const {nowDate} = this.state
        NativeObj.viewWatch("",() => { 
            that.myOvertime(nowDate)
        });
    }
    componentWillMount(){
        this.getLanguage()
        this.registerWatch()
    }

    componentDidMount() {
        window.location.hash ='?&c=60657030&p=60657030&ar=0001Z510000000065KV7'
        let routerData = this.props.location.query
        let nowDate = new Date(parseInt(routerData.time))
        this.myOvertime(nowDate)
        this.setState({
            nowDate:nowDate
        })
        
    }
    
    render() {
        const {nowDate,calendarsData,nowData,totalLength,json} =this.state
        return (
            <div className="myovertime">
               <div className="header">
                    <DHeader title={this.state.header.name} leftClick={this.leftClick} type={'wide'}  />
               </div>
               <div className="overtimeBody">
                   <div className="title">
                       <div>{nowDate.getFullYear()}{json["hrzzmb-000157"]}{nowDate.getMonth()+1}{json["hrzzmb-000156"]}| {json["hrzzmb-000158"]}</div>
                       <div><span>{totalLength}</span> {json["hrzzmb-000154"]}</div>
                   </div>
                   <div className="calendarPanel">
                         <SingleCalendar nowDate={nowDate} calendarsData = {calendarsData} changeDayFun = {this.changeDay} prevMonth={this.prevMonth} nextMonth={this.nextMonth}/>
                   </div>
                    <div className="orderShow">
                        {nowData.length>0&&nowData[0].splitBillVOs?nowData[0].splitBillVOs.map((item)=>{
                            return <OrderItem order={item} lang={json} linkOrder = {this.linkOrder} linkSign={this.linkSign}/>
                        }):<DEmpty/>}
                    </div>
               </div>
            </div>
        );
    }
}

export default MyOvertime;