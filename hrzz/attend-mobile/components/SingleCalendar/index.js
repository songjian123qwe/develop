import React, { Component } from "react";
import { formatTime}from "../../../public/mobile/utils/index"
import "./index.less"
import Index from "../../leave/containers/Index/Index";
const Week = (props) =>{
    const {weeks,calendarsData,changeDay,fill} = props
    return (
            <div className="grid-row">
                <Day week ={calendarsData.slice(weeks*7,(weeks+1)*7)} fillData={fill.length>0?fill.slice(weeks*7,(weeks+1)*7):[]} weekIndex={weeks} dayClick={changeDay} />
            </div>
    )
}
const Day = (props) => {
    const {week,dayClick,fillData,weekIndex} =props
    const ClassChoose = (data,index) =>{
        let nomonth = ""
        let status = ""
        let weekend = ""
        if(data.isweekend){
            weekend = "weekend"
        }
        if(!data.inmonth){
           return 'grid-cell nomonth'
        }
        if(fillData.length>0){
            if(fillData[index].status && fillData[index].status === "1"||fillData[index].status === "2" || fillData[index].status === "3" ) {
                status = "absent "
            }
            if(fillData[index].status && fillData[index].status === "4") {
                status = " fill"
            }
        }
        
        let active = data.active?" active":" ";
        let istoday = (!data.active && data.istoday)?" today":"";
        return `grid-cell  ${istoday} ${status} ${active} ${nomonth} ${weekend} `
    }
    return (
        week.map((item,index) =>{
            return (
                <div className={ClassChoose(item,index)} onClick={(el)=>{dayClick(item,weekIndex)}} >
                    <div className="grid-text">
                        <span>{item.days}</span>
                    </div>
                </div>
            )
        })
        
    )
}
class SingleCalenbdar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            weekd:[], // 周的数组
            calendarsDatas:[], // 初始化数据
            weekIndex:0, // 当前周的标记
            pdState:false // 收起状态
        }
        window.hh=this
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
    // 填充日历数据
    handleDateData = (nowDate) =>{
        let day = "01"
        let time = nowDate?nowDate:new Date()
        let curDate =  formatTime(time,"yyyy-MM-dd")
        day = this.transformString(time.getDate())
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
        let weeks = [];
        let weekIndex = -1;
        let dayIndex = 0;
        let   calendars = []
        let thisDate = beginDate;
        while( thisDate <= endDate ){
            let eachDay = {};
            let thisDay = new Date(thisDate)
            eachDay.timenumber = thisDate;
            //日期信息
            eachDay.year = (new Date(thisDate)).getFullYear();
            eachDay.month = this.formatNumber((new Date(thisDate)).getMonth() + 1);
            eachDay.days = this.formatNumber((new Date(thisDate)).getDate());
            eachDay.day = new Date(thisDate).getDay()
            //是否选中
            let curDates = eachDay.year + "-" + eachDay.month + "-" + eachDay.days;
            if( curDates == curDate ){
                eachDay.active = true;
                this.initDay = dayIndex;
            } else {
                eachDay.active = false
            }
            //是否位于考勤月范围
            if( thisDate < begin || thisDate > end ){
                eachDay.inmonth = false;
            }else{
                eachDay.inmonth = true;
            }
            //起始日期
            if( thisDate == beginDate ){
                eachDay.isbegin = true;
            }else{
                eachDay.isbegin = false;
            }
            //截止日期
            if( thisDate == endDate){
                eachDay.isend = true;
            }else{
                eachDay.isend = false;
            }
            //第几周
            if( thisDay.getDay() % 7 === 0 ){
                weekIndex ++;
                weeks.push(weekIndex);
            }
            if ( day === eachDay.days && eachDay.month === timeDate.month) {
                this.setState({
                    weekIndex:weekIndex
                })
            }
            //第几天
            dayIndex ++;
            //是否周末
            if(eachDay.day == "0" || eachDay.day == "6"){
                eachDay.isweekend = true;
            } else
            {
                eachDay.isweekend = false;
            }
            //今天
            let nowYear = (new Date()).getFullYear();
            let nowMonth = (new Date()).getMonth()+1;
            let nowDay = (new Date()).getDate();
            if( eachDay.year == nowYear && parseInt(eachDay.month) == nowMonth && parseInt(eachDay.days) == nowDay ){
                this.setState({
                    weekIndex:parseInt(dayIndex/7)
                })
                eachDay.istoday = true;
            }else{
                eachDay.istoday = false;
            }
            eachDay.week = parseInt(dayIndex/7)
            //单子数据，状态status
            eachDay.status = "";
            calendars.push(eachDay);
            thisDate += 24*3600*1000;
        }
        this.setState({
            weekd:weeks,
            calendarsDatas:calendars
        })
    }
    changeDay = (item,index) =>{
        const {calendarsDatas} = this.state
        const  {changeDayFun} = this.props
        if(!item.inmonth){
            return 
        }
        let calendars = [...calendarsDatas]
        calendarsDatas.forEach((el,index) => {
            item.timenumber === el.timenumber ?   calendars[index].active = true : calendars[index].active = false
        })
        this.setState({
            calendarsDatas :  calendars,
            weekIndex: index
        })
        changeDayFun(item.timenumber)
    }
    upload = () =>{
        let {pdState} =this.state
        this.setState({
            pdState:!pdState
        })
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.nowDate !== this.props.nowDate){
            this.handleDateData(nextProps.nowDate)
        }
    }
    componentDidMount() {
        this.handleDateData(new Date())
    }
    
    
    render() {
        const{
            prevMonth = ()=> {}, 
            nextMonth = () => {},
            calendarsData = [],
            changeDayFun = () =>{},
            dataStatus = [],
            nowDate = new Date(),
            json={}
        }= this.props
        const {calendarsDatas,weekd,weekIndex,pdState} = this.state
        return (
            <div className="calendar flextype">
            <div className="calendar-title flextype" v-if="showData">
                <div className="calendar-prev hrfont hr-left1" onClick={nextMonth}></div>
                <div className="calendar-date">{formatTime(nowDate,"yyyy-MM")}</div>
                <div className="calendar-next hrfont hr-right1" onClick={prevMonth}></div>
            </div>
            <div className="calendar-grid">
                    <div className="grid-row flextype">
                        <div className="grid-cell flextype">
                            <div className="grid-text gray">{json["hrzzmb-000228"]}</div>
                        </div>
                        <div className="grid-cell flextype">
                            <div className="grid-text">一</div>
                        </div>
                        <div className="grid-cell flextype">
                            <div className="grid-text">二</div>
                        </div>
                        <div className="grid-cell flextype">
                            <div className="grid-text">三</div>
                        </div>
                        <div className="grid-cell flextype">
                            <div className="grid-text">四</div>
                        </div>
                        <div className="grid-cell flextype">
                            <div className="grid-text">五</div>
                        </div>
                        <div className="grid-cell flextype">
                            <div className="grid-text gray">六</div>
                        </div>
                    </div> 
                    {
                        weekd.map((item,index)=>{
                            if(!pdState){
                                return <Week weeks={item} fill={calendarsData}  calendarsData = {calendarsDatas} changeDay ={this.changeDay} />
                            } else {
                                if(weekIndex === index ){
                                     return <Week weeks={item} fill={calendarsData}  calendarsData = {calendarsDatas} changeDay ={this.changeDay} />
                                }
                            }
                            
                        })
                    }
                    <div className="updown" onClick={this.upload}><span className={`hrfont ${pdState?"hr-drop-down02":"hr-up"}`}></span></div>
                    </div>
            
        </div>
        );
    }
}

export default SingleCalenbdar;