import React, { Component } from 'react';
import './index.less'

const CalendarMonth = (props) =>{
        const {status,index,year,yearMark,changeMonth,changeCalendar,monthMark,dateTime,json} = props
        const activeDay =  (index,year) =>{
           return dateTime.getFullYear() == year && dateTime.getMonth() == index ?'active':''
        }
        return (
            <div className={`grid-cell ${status} ${activeDay(index,year)} ${year==yearMark&&monthMark == index?"today":""}`}     >
                <div className="grid-text" onClick={()=>{changeMonth(year,index),changeCalendar() }}>
                    {index+1}{json["hrzzmb-000156"]}
                </div>
             </div>
        )
}
class CalendarYear extends Component {
    render () {
        const {yearData,yearMark,year,json={}} = this.props
        return (
               	 <div className="calendar-grid"  >
                	<div className={`year ${year == yearMark?"active":""}`}>{year}{json["hrzzmb-000157"]}</div>
                    <div  className="grid-row" >
                        {
                            yearData.map((item,index)=>{
                                return <CalendarMonth {...this.props} status={item} index={index} json={json} />
                            })
                        }
                    </div>
                </div>
        )
    }
}
class MoreCalendar extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         calendarStatus : false,
         year:new Date().getFullYear(),
         yearMark: new Date().getFullYear(),
         month: new Date().getMonth()+1,
         monthMark: new Date().getMonth(),
         initDate:{}
      }
    }
     //更新年月
     updateYM = (time) => {
         let obj ={
             year: time.getFullYear(),
             month: time.getMonth()
         }
        this.setState({
            year: time.getFullYear(),
            yearMark: time.getFullYear(),
            month: time.getMonth()+1,
            monthMark: time.getMonth(),
        })

     }
    changeCalendar = () =>{
        const newValue = !this.state.calendarStatus
        this.setState({
            calendarStatus:newValue
        })
    }
    updateData = (newData)=>{
        console.log(newData)
        let {initDate} = this.state
        let newValue = {}
         Object.keys(initDate).forEach((item,index)=>{
            newValue[item] = initDate[item].map((el,i)=>{
                    let nowState = el.indexOf('today')
                    let activeState = el.indexOf('active')
                    return (
                        newData[item][i]?`${newData[item][i]} ${nowState>=0?"today":""}`:`${nowState>=0?"today":""}`
                    )
            })
            
        })
        this.setState({
            initDate:newValue
        })
    }
    componentWillReceiveProps(nextProps) {
      if(nextProps.dateTime !== this.props.dateTime){
        this.updateYM(nextProps.dateTime)
      }
      if(nextProps.yearData !== this.props.yearData){
        this.updateData(nextProps.yearData)
      }
    }
    //初始化数据
    initState = (dateTime)=> {
       let  now = new Date()
       let nowTime = {
           year : now.getFullYear(),
           month : now.getMonth()
       }
       let initDate = {
           [nowTime.year-1] :[],
           [nowTime.year] :[],
           [nowTime.year+1] :[]
       }
       for (let index = 0; index < 12; index++) {
                initDate[nowTime.year-1].push("")
                index == nowTime.month ?  initDate[nowTime.year].push("today"):initDate[nowTime.year].push("")
                initDate[nowTime.year+1].push("")
       }
       console.log(initDate)
       this.setState({
           initDate:initDate
       })

    }
    componentDidMount() {
      this.initState()
    }
    
    render() {
        const {  dateTime = '',
                 changeMonth = (year,month)=>{},
                 yearData={},
                 json={}
              } = this.props
        const {calendarStatus,year,yearMark,monthMark,month,initDate} = this.state
              console.log(yearData)
        return (
            <div className='morcalendar'>
            <div className="calendar flextype">
                <div className="calendar-title flextype" >
                    <div className="calendar-date" onClick={this.changeCalendar}>{year}{json["hrzzmb-000157"]}{month}{json["hrzzmb-000156"]}<span  className={`hrfont hr-Arrow1 ${calendarStatus?"reverse":""}`} ></span></div>
                </div>
            </div>
            <div className="calendar-content"   >
            {calendarStatus? Object.keys(initDate).map((item)=>{
                return (
                    <CalendarYear year={item}  dateTime={dateTime} yearMark={yearMark} monthMark={monthMark} yearData={initDate[item]} changeMonth={changeMonth} changeCalendar={this.changeCalendar}/>
                )
            }):''}
            </div>
            </div>
        );
    }
}

export default MoreCalendar;