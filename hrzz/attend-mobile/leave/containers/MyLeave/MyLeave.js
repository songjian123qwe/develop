import React, { Component } from 'react';
import {DHeader, DEmpty} from '../../../../public/mobile/components/index'
import './MyLeave.less'
import MoreCalendar from '../../../components/MoreCalendar'
import ajax from '../../../../public/mobile/utils/ajax'
import OrderItem  from './components/OrderItem/OrderItem'
import { formatTime } from '../../../../public/mobile/utils/index';
import { Toast } from 'antd-mobile';
import {editNav,timeFormate,errHandle} from '../../../utils/index' 
import {getMultiLang} from '../../../../public/mobile/utils/getMultiLang'

const url = {
    myleave : '/nccloud/hrkq/leave/QueryListMobileAction.do',
    deleteData : '/nccloud/hrkq/leave/DeleteAction.do',
}
const  backFunTime =  (time) =>{
    return new Date(timeFormate(time)).getTime()
}
class MyLeave extends Component {
    constructor(props) {
      super(props)
      this.state = {
        header:{
            name:""
        },
        dateTime:new Date(),
        yearStatus:{2018:['','','','','','','','','','','',''],2019:['','','','','','','','','','','',''],2020:['','','','','','','','','','','','']},
        yearData:[], //年数据
        nowMonthData:[], //当前月数据
        json:{}
    }
    }
    // 返回
    leftClick =  () => {
        console.log(this.props)
        this.props.history.push('/');
    }
    // 当月状态修改
    changeMonth = (year,month)=>{
        let {yearStatus }= this.state
        for (const key in yearStatus) {
                const element = yearStatus[key];
                element.forEach((el,i) => {
                    key == parseInt(year)&&parseInt(month) == i ? yearStatus[key][i]='active': yearStatus[key][i]=''
                    // key == new Date().getFullYear()&& i == new Date().getMonth()? yearStatus[key][i]=`${yearStatus[key][i]} today`:''
                });
        }
        this.setState({
            yearStatus:yearStatus,
            dateTime:new Date(parseInt(year),month+1,0)
        })
        this.getNowMonth(year,month)
    }
      // 日期css类字符串
      handleClass(year,month){
        let status = 'fill'
        let that  = this
        let curMonth = new Date().getMonth()
        let curYear =  new Date().getFullYear()
        const { dateTime } = this.state
        let active = month == dateTime.getMonth() && dateTime.getFullYear() == year ?' active':'';
        let istoday = curMonth == month&& curYear == year?' today':'';
        return `  ${status} ${istoday} ${active}`;
    }
    //我的请假单据查询
    myLeaveOrder = (time) =>{
        let year = time.getFullYear()
        let {json} = this.state
        let obj ={
            leavebegintime:formatTime(new Date(year-1,0,1,0,0,0),"yyyy-MM-dd hh:mm:ss"),
            leaveendtime:formatTime(new Date(year+1,11,31,23,59,59),"yyyy-MM-dd hh:mm:ss")
        }
        Toast.loading(json["hrzzmb-000001"],0)
        ajax({
            url: url.myleave,
            noNeedShowError: false,
            data:  obj,
            success: (result) => {
                console.log(result)
                if(result.data){
                    this.setState({
                        yearData:result.data.leave_list.rows
                    },()=>{})
                    this.handleOrder(result.data.leave_list.rows)
                } else {
                    this.setState({
                        yearData:[]
                    },()=>{})
                    this.handleOrder([])
                }
                Toast.hide()
            },
            error: (err) =>{
                Toast.hide()
                errHandle(err,json)
            }
        })
    }
    // 处理数据
    handleOrder = (orderData) => {
        let year = new Date().getFullYear()
        let myTripData = {
            [year-1]:['','','','','','','','','','','',''],
            [year]:['','','','','','','','','','','',''],
            [year+1]:['','','','','','','','','','','','']
        }
        let that = this
        orderData.forEach((item)=>{
            let timeBegin = new Date(timeFormate(item.values.begintime.value))
            let timeEnd = new Date(timeFormate(item.values.endtime.value))
            let begin ={
                year : timeBegin.getFullYear(),
                month : timeBegin.getMonth()
            }
            let end ={
                year : timeEnd.getFullYear(),
                month : timeEnd.getMonth()
            }
            myTripData[begin.year][begin.month] = 'fill'
            myTripData[end.year][end.month] = 'fill'
        })
      let month =this.state.dateTime.getMonth()
       this.setState({
        yearStatus:myTripData,
       },()=>{
         that.getNowMonth(year,month)
       }) 
    }
   
    // 获取当前月数据
    getNowMonth = (year,month) => {
        console.log(year,month)
        let beigntime = (new Date(year,month,1,0,0,0,0)).getTime()
        let endtime = (new Date(year,month+1,0,23,59,59,0)).getTime()
        const { yearData } = this.state
        const  nowMonthData =  yearData.filter(item => {
            return  beigntime <= backFunTime(item.values.endtime.value)&& backFunTime(item.values.begintime.value) <= endtime || new Date(item.values.begintime.value).getFullYear() == year-1 && new Date(item.values.endtime.value).getFullYear()==year&&backFunTime(item.values.endtime.value) >= beigntime ||  new Date(item.values.begintime.value).getFullYear() == year && new Date(item.values.endtime.value).getFullYear()== year+1 && backFunTime(item.values.begintime.value) <= endtime
          })
        this.setState({ nowMonthData:nowMonthData})
    }
    // 销假单据
    orderAfter = (order) =>{
        console.log(order)
        this.props.history.push({pathname:'/leaverevise',
            query: {
                id: order.pk_leave.value,
                status:order.leaveoffapprovestatus.value
            }
        });
       
    }
    // 请假单据
    orderBefore = (order) => {
            if(order.approvestatus.value === "-1"){
                this.props.history.push({pathname:'/',query: {
                    id: order.pk_leave.value
                }})
            } else {
                console.log(order.approvestatus)
                this.props.history.push({pathname:'/leaveorder',
                query: {
                    id: order.pk_leave.value,
                    billsource:order.billsource.value
                    // id: 'a2345678901234567890'
                }
                });
            }
    }
    // 删除单据
    orderDelete = (order) => {
        let {json} = this.state
        console.log(Toast);
        Toast.loading(json["hrzzmb-000001"],0)
        ajax({
            url: url.deleteData,
            noNeedShowError: false,
            data:  {pk:order.pk_leave.value},
            success: (result) => {
               this.myLeaveOrder(new Date(timeFormate(order.begintime.value)))
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
                        name:json["hrzzmb-000177"]
                    }
                },()=>{
                    const {header} = this.state
                    editNav(header,this.leftClick)
                    this.myLeaveOrder(new Date(parseInt(routerData.time))) 
                })
            }
        })
    }
    componentWillMount(){
        window.location.hash ='?&c=60657020&p=60657020&ar=0001Z510000000065KV7'
        let routeData = this.props.location.query
        this.setState({
            dateTime:new Date(parseInt(routeData.time))
        })
        this.getLanguage(routeData)
    }
    render() {
        const {dateTime,yearStatus,nowMonthData,header,json} = this.state
        return (
           <div className="myleave">
                <div className="header" >
                    <DHeader title={header.name} leftClick={this.leftClick}  />
                </div>
                <div className='morcalander'>
                    <MoreCalendar json={json} dateTime={dateTime} changeMonth={this.changeMonth} yearData={yearStatus}/>
                </div>
                <div className={`orderItem ${nowMonthData.length>0?"":"empty"}`}>
                    {nowMonthData.length>0?
                        nowMonthData.map((item,index)=>{
                            return <OrderItem json={json} order={item.values} orderBefore={this.orderBefore} orderAfter={this.orderAfter} orderDelete={this.orderDelete}/>
                        })
                    :<DEmpty/>}
                </div>
           </div>
        );
    }
}

export default MyLeave;
