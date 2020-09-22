import moment from 'moment';
import {isEmpty,isFunction} from './index'

// 东八时区转为本地时区
export function DongbaToLocalTime(timer) {
    if (!timer) {
        return ''
    }
    //东8区，东时区记做正数
    let zoneOffset = 8;
    //算出北京时间,并转换为毫秒：
    let offset2 = timer.toDate().getTime();
    // 东八区对应得0时区时间
    let GMTDate = offset2 - zoneOffset * 60 * 60 * 1000
    //算出本地时区与0时区的时差：
    let newDateOffset = moment().toDate().getTimezoneOffset() * 60 * 1000;
    let localTime = new Date(GMTDate - newDateOffset)
    return moment(localTime)
}

// 本地时区转为东八时区
export function LocalToDongbaTime(timer) {
    if (!timer) {
        return ''
    }
    //东8区，东时区记做正数
    let zoneOffset = 8;
    //算出时差,并转换为毫秒：
    let offset2 = moment().toDate().getTimezoneOffset() * 60 * 1000;
    //算出现在的时间：
    let nowDate2 = timer.toDate().getTime();
    return moment( new Date(nowDate2 + offset2 + zoneOffset * 60 * 60 * 1000))

}
/* functionValue 是需要翻译的函数值，flag 是标识需要翻译的函数值是起始值还是结束值 */
class timeFunctionTranslaterBase{
    
    constructor(){
        Date.prototype.toLocaleDateString = function(){
            return moment(this).format('YYYY/MM/DD');
        }
    }
    //函数翻译器
    translater = (functionValue, config)=>{
        let result = functionValue;
        config = Object.assign({flag:true,format:"YYYY-MM-DD HH:mm:ss",isMultiTimeZone:true},config);
        if(typeof functionValue ==='string'&&this.timeFunctionMap.hasOwnProperty(functionValue)){
            let date =  this.timeFunctionMap[functionValue](config);
            result = this.multiTimeZone(date,config)
        }
        console.log(this.state.json['jf6005-000018'],result)/* 国际化处理： 时间函数翻译*/
        return result;
    }
    //需要翻译的函数列表
    timeFunctionMap = {
        '#day(-1)#':(config)=>this.getDay(-1,config),//  昨天
        '#day(0)#':(config)=>this.getDay(0,config),//  今天
        '#day(1)#':(config)=>this.getDay(1,config),//  明天
        '#month(-1)#' :(config)=>this.getMonth(-1,config),// 上月
        '#month(0)#':(config)=>this.getMonth(0,config),// 本月
        '#month(1)#':(config)=>this.getMonth(1,config),// 下月
        '#week(-1)#' :(config)=>this.getWeek(-1,config),//上周
        '#week(0)#':(config)=>this.getWeek(0,config),//本周
        '#week(1)#':(config)=>this.getWeek(1,config),//下周
        '#quarter(-1)#':(config)=>this.getQuarter(-1,config),//  上季
        '#quarter(0)#' :(config)=>this.getQuarter(0,config),//本季
        '#quarter(1)#':(config)=>this.getQuarter(1,config),//  下季
        '#year(-1)#' :(config)=>this.getYear(-1,config),//去年
        '#year(0)#' :(config)=>this.getYear(0,config),// 今年
        '#year(1)#' :(config)=>this.getYear(1,config),//明年
        '#lastDayOfMonth#':(config)=>this.getMonthLastDay(0,config),//  当月最后一天
        '#lastDayOfWeek#':(config)=>this.getWeekLastDay(0,config),// 本周最后一天
        '#finalDayOfLastMonth#':(config)=>this.getMonthLastDay(-1,config),// 上月最后一天 
    }
    multiTimeZone = (data,config)=>{
        let {format,isMultiTimeZone} = config
        if(isMultiTimeZone){
            return LocalToDongbaTime(moment(data)).format(format);
        }else{
            return moment(data).format(format);
        }     
    }
    getDay = (value,config)=>{
        let {flag,format,isMultiTimeZone} = config
        let oneDay = 24*60*60*1000;
        return new Date(new Date(new Date().toLocaleDateString()).getTime()+oneDay*value+(!flag?oneDay-1:0));
    }
    getMonth  = (value,config) =>{
        let {flag,format,isMultiTimeZone} = config
        var nowdays = new Date();
        var year = nowdays.getFullYear();
        var month = nowdays.getMonth()+value+(flag?0:1);
        if(month==0)
        {
            month=12;
            year=year-1;
        }
        if (month < 10) {
            month = "0" + month;
        }
        return new Date(new Date(new Date(year,month,'01').toLocaleDateString()).getTime()-(flag?0:1));
    }
    getWeek = (value,config)=>{
        let {flag,format,isMultiTimeZone} = config;
        var date = new Date();
        let  weekday= date.getDay()||7;
        let oneWeek = 7*24*60*60*1000;
        date.setDate(date.getDate()-weekday+1);
        return new Date(new Date(date.toLocaleDateString()).getTime()+oneWeek*value+(flag?0:oneWeek-1));
    }
    getQuarter = (value,config)=>{
        let {flag,format,isMultiTimeZone} = config;
        var date = new Date();
        var month = date.getMonth();
        var year = date.getFullYear();
       
        let d = 0;
        if(month <3 ){
            d = 0 +(value+(flag?0:1))*3;
            date.setMonth(d);
        }else if(2 < month && month < 6){
            d = 3+(value+(flag?0:1))*3;
            date.setMonth(d);
        }else if(5 < month && month < 9){
            d = 6+(value+(flag?0:1))*3;
            date.setMonth(d);
        }else if(8 < month && month <= 11){
            d = 9+(value+(flag?0:1))*3;
            date.setMonth(d);
        }
        if(d<0){
            year--;
        }else if(d>11){
            year++;
        }
        date.setDate(1);
        date.setFullYear(year);
        return new Date(new Date(date.toLocaleDateString()).getTime()-(flag?0:1)); 
    }
    getYear(value,config){
        let {flag,format,isMultiTimeZone} = config;
        var date = new Date();
        var year = date.getFullYear()+value+(flag?0:1);
        date.setFullYear(year);
        date.setMonth(0);
        date.setDate(1);
        return new Date(new Date(date.toLocaleDateString()).getTime()-(flag?0:1)); 
        
    }
    getWeekLastDay(value,config){
        let {flag} = config;
        var date = new Date();
        let  weekday= date.getDay()||7;
        let oneDay = 24*60*60*1000;
        let oneWeek = 7*24*60*60*1000;
        date.setDate(date.getDate()-weekday);
        return new Date(new Date(date.toLocaleDateString()).getTime()+oneWeek*(value+1)+(flag?0:oneDay-1));
    }
    getMonthLastDay(value,config){
        let {flag} = config
        var date = new Date();
        let oneDay = 24*60*60*1000;
        var year = date.getFullYear();
        var month = date.getMonth()+value+1;
        if(month>=12)
        {
            month=month-12;
            year=year+1;
        }
        if (month < 10) {
            month = "0" + month;
        }
        date.setFullYear(year);
        date.setMonth(month);
        date.setDate(1);
        return new Date(new Date(date.toLocaleDateString()).getTime()-(flag?oneDay:1)); 
    }

    

}

export function timeFunctionTranslater(functionValue,config={}){
    let regu =/^#.*#$/;
    let re = new RegExp(regu);
    if(re.test(functionValue)){
        let timeFunctionTranslater = new timeFunctionTranslaterBase();   
        return timeFunctionTranslater.translater(functionValue,config)
    }else{
        return functionValue;
    }
        
}

export function getClientHeight (){
    var scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.clientHeight;
    }
    else if (document.body) {
        scrollTop = document.body.clientHeight;
    }
    return scrollTop;
}

export function getClientWidth (){
    var scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.clientWidth;
    }
    else if (document.body) {
        scrollTop = document.body.clientWidth;
    }
    return scrollTop;
}
