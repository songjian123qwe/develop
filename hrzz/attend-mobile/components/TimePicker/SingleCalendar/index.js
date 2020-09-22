import React, { Component } from "react";
import { formatTime}from "../../../../public/mobile/utils/index"
import "./index.less"
const Week = (props) =>{
    const {weeks,calendarsData,changeDay,fill,min} = props
    return (
            <div className="grid-row">
                <Day week ={calendarsData.slice(weeks*7,(weeks+1)*7)} min ={min} weekIndex={weeks} dayClick={changeDay} />
            </div>
    )
}
const monthData  = {
    cn:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
    en:['January','February','March','April','May','June','July','August','September','October','November','December'],
    tw:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
}
const weekData = {
    cn:['日','一','二','三','四','五','六'],
    en:['Sun','Mon','Tue','Wed','Thur','Fri','Sat'],
    tw:['日','一','二','三','四','五','六'],
}
const Day = (props) => {
    const {week,dayClick,weekIndex,min} =props
    const ClassChoose = (data,index) =>{
        let nomonth = ""
        let status = ""
        let weekend = ""
        if(!data.inmonth){
           return 'grid-cell nomonth'
        }
       
        let active = data.active?" active":" ";
        return `grid-cell  ${status} ${active} ${nomonth} ${weekend} ${min&&min.getTime()>data.timenumber?'normal':''}`
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
            pdState:false, // 收起状态
            nowTime:new Date().getTime(),
            lang:'cn'
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
        const {changeFun,min} = this.props
        const {calendarsDatas} = this.state
        if(!item.inmonth || min && item.timenumber<min.getTime()){
            return 
        }
        let calendars = [...calendarsDatas]
        calendarsDatas.forEach((el,index) => {
            item.timenumber === el.timenumber ?   calendars[index].active = true : calendars[index].active = false
        })
        changeFun(item.timenumber,false)
        this.setState({
            calendarsDatas :  calendars,
            weekIndex: index,
            nowTime:item.timenumber
        })
    }

    getDate(nowTime){
        let objtime = {
            year: nowTime.getFullYear(),
            month: nowTime.getMonth(),
        }
        return objtime
    }
    prevMonth = () => {
        console.log('prevMonth')
        const {nowTime} = this.state
        const {changeFun} = this.props
        let objtime = this.getDate(new Date(nowTime))
        let newTime = new Date(objtime.year,objtime.month+1,1)
        changeFun(newTime.getTime(),true)
        this.setState({
            nowTime:newTime.getTime()
        })
        this.handleDateData(newTime)
    }
    // 下一个月
    nextMonth = () => {
        console.log('nextMonth')
        const {nowTime} = this.state
        const {changeFun} = this.props
        let objtime = this.getDate(new Date(nowTime))
        let newTime = new Date(objtime.year,objtime.month-1,1)
        changeFun(newTime.getTime(),true)
        this.setState({
            nowTime:newTime.getTime()
        })
        this.handleDateData(newTime)
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.nowDate !== this.props.nowDate){
            this.handleDateData(nextProps.nowDate)
        }
    }

    componentDidMount() {
        let lang="zh_CN"
        // 本地设置多语
        let localLang=localStorage.__localLange;
        // 获取友空间里webview的多语信息
        let nativeLang="zh_CN"
        let str=window.navigator&&window.navigator.userAgent;
        let arr=str.split("youZoneLanguage=");
        if(arr.length>1){
            nativeLang=arr[1]
        }
        let tempLang=localLang||nativeLang
        switch (tempLang){
            case 'en':
              lang='en'
            break;
            case 'zh':
              lang='cn'
            break;
            case 'tw':
              lang='tw'
            break;
            default:
              lang='cn'
            break
          }
        this.setState({
            lang:lang
        })
        console.log("tempLang",lang)
        this.handleDateData(this.props.nowDate)
        console.log(monthData[lang])
    }
    render() {
        const{
            nowDate = new Date(),changeFun =(e)=>{console.log(e)},json={},min= null}= this.props
        const {calendarsDatas,weekd,weekIndex,pdState,nowTime,lang} = this.state
        console.log(monthData[lang][new Date(nowTime).getMonth()],lang)
        return (
            <div className="calendars flextype">
            <div className="calendar-title flextype" v-if="showData">
                <div className="calendar-prev icon hrfont hr-right resive" onClick={this.nextMonth}></div>
                <div className="calendar-date">{monthData[lang][new Date(nowTime).getMonth()]}</div>
                <div className="calendar-next icon hrfont hr-right" onClick={this.prevMonth}></div>
            </div>
            <div className="calendar-grid">
                    <div className="grid-row flextype">
                        <div className="grid-cell flextype">
                            <div className="grid-text gray">{weekData[lang][0]}</div>
                        </div>
                        <div className="grid-cell flextype">
                            <div className="grid-text gray">{weekData[lang][1]}</div>
                        </div>
                        <div className="grid-cell flextype">
                            <div className="grid-text gray">{weekData[lang][2]}</div>
                        </div>
                        <div className="grid-cell flextype">
                            <div className="grid-text gray">{weekData[lang][3]}</div>
                        </div>
                        <div className="grid-cell flextype">
                            <div className="grid-text gray">{weekData[lang][4]}</div>
                        </div>
                        <div className="grid-cell flextype">
                            <div className="grid-text gray">{weekData[lang][5]}</div>
                        </div>
                        <div className="grid-cell flextype">
                            <div className="grid-text gray">{weekData[lang][6]}</div>
                        </div>
                    </div> 
                    {
                        weekd.map((item,index)=>{
                            if(!pdState){
                                return <Week weeks={item} min={min}  calendarsData = {calendarsDatas} changeDay ={this.changeDay} />
                            } else {
                                if(weekIndex === index ){
                                     return <Week weeks={item} min={min}  calendarsData = {calendarsDatas} changeDay ={this.changeDay} />
                                }
                            }
                            
                        })
                    }
                    </div>
            
        </div>
        );
    }
}

export default SingleCalenbdar;