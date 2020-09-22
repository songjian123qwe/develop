/*
 * @Author: wanghmr 
 * @Date: 2019-07-08 20:03:18 
 * @Last Modified by: wanghmr
 * @Last Modified time: 2020-04-21 14:01:47
 * @const {defaultTime = new Date(),timeFormat = "dateTime",onCancel=()=>{},onConfirm = ()=>{},visible=false}
 * timeFormat ={date,dateTime,dateNoon}
 */

import React, { Component } from 'react';
import './TimePicker.less'
import SingleCalendar from './SingleCalendar/index'
import { formatTime } from '../../../public/mobile/utils/index'
import SingleTime from './SingleTime/index'
import {timeFormate} from '../../utils/index'

class TimePicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nowTime: null,
            showPanel:"1"
        }
    }
    dayChange = (time,types) =>{
       let ymd= formatTime(new Date(time),"yyyy-MM-dd")
        const {nowTime} = this.state
        let hms = formatTime(nowTime?nowTime:new Date(),"hh:mm:ss")
        const {timeFormat="dateTime"} = this.props
       
        if(timeFormat === "dateTime" || timeFormat === "dateNoon"){
            if(types){
                this.setState({
                    nowTime:new Date(timeFormate(ymd+" "+hms)),
                    showPanel:"1"
                })
            }  else {
                this.setState({
                    nowTime:new Date(timeFormate(ymd+" "+hms)),
                    showPanel:"2"
                })
            }
           
        }
        if(timeFormat === "date"){
            this.setState({
                nowTime:new Date(ymd)
            })
        }
       
    }
    showTimePanel = (num) => {
        this.setState({
            showPanel: num
        })
    }
    hmChange = (hm)=> {
        console.log(hm)
        const {nowTime} = this.state
        const {timeFormat} = this.props
        console.log(formatTime(nowTime?nowTime:new Date(),"yyyy-MM-dd")+" "+hm)
        if(timeFormat === "dateTime") {
            this.setState({
                nowTime:new Date((formatTime(nowTime?nowTime:new Date(),"yyyy-MM-dd")+" "+hm).replace(/-/g,"/"))
            })
        } else {
            let time =`${formatTime(nowTime?nowTime:new Date(),"yyyy-MM-dd")}  ${hm === "1" ? "8:00":"18:00"} `
            console.log(time)
            this.setState({
                nowTime:new Date(time.replace(/-/g,"/"))
            })
        }
      
    }
    transfromTime = (nowTime) =>{
        const {timeFormat,defaultTime,json} = this.props
        console.log(defaultTime)
        let time = nowTime?nowTime:defaultTime
        if(timeFormat === "dateTime"){
            return {
                display:formatTime(time,"yyyy-MM-dd hh:mm"),
                value:formatTime(time,"yyyy-MM-dd hh:mm:ss")
            }
        }
        if(timeFormat === "date"){
            return {
                display:formatTime(time,"yyyy-MM-dd"),
                value:formatTime(time,"yyyy-MM-dd hh:mm:ss")
            }
        }
        if(timeFormat === "dateNoon"){
            let hm = formatTime(time,"hh:mm")
            hm = hm === "08:00" || hm === json["hrzzmb-000179"] ? json["hrzzmb-000179"]:json["hrzzmb-000180"]
            return {
                display:formatTime(time,"yyyy-MM-dd")+" "+hm,
                value:formatTime(time,"yyyy-MM-dd hh:mm:ss")
            }
        }
    }
    onConf = () =>{
        const {onConfirm=()=>{},timeFormat} = this.props
        let {nowTime} = this.state
        console.log(nowTime)
        let time = this.transfromTime(nowTime)
       this.setState({
            showPanel:"1"
        })
        onConfirm(time)
       
    }
    onClose = (e) =>{
        const {onCancel=()=>{}} = this.props
        if(e.target.className.replace(/\s/g,"") === "popModal" || e.target.className.replace(/\s/g,"") === "close" ){
            onCancel()
            this.setState({
                showPanel:"1"
            })
        } else {
            e.stopPropagation()
        }
        
       
    }
    
    componentWillReceiveProps(nextProps) {
        console.log(nextProps.defaultTime)
        if(nextProps.defaultTime !== this.props.defaultTime && nextProps.timeFormat === "dateTime"||nextProps.timeFormat === "date"){
            this.setState({
                nowTime:nextProps.defaultTime
            })
        }
        if(nextProps.defaultTime !== this.props.defaultTime && nextProps.timeFormat === "dateNoon"){
            let types = formatTime(nextProps.defaultTime,"hh:mm")
            if(types === "08:00" || types === "18:00"){
                this.setState({
                    nowTime: nextProps.defaultTime
                })
            } else {
                let time = timeFormate(formatTime(nextProps.defaultTime,"yyyy-MM-dd")) + " " + "8:00" 
                this.setState({
                    nowTime: new Date(time)
                })
            }
           
        }
    }
    
    render() {
        const {nowTime,showPanel} = this.state
        const {defaultTime = new Date(),timeFormat = "dateTime",onCancel=()=>{},onConfirm = ()=>{console.log("")},visible=false,json={},min=null} = this.props
        const showTime = () => {
            if(timeFormat === "dateTime"){
                return formatTime(nowTime?nowTime:defaultTime,"hh:mm").replace(/-/g,"/")
            } 
            if(timeFormat === "dateNoon"){
                let hm = formatTime(nowTime?nowTime:defaultTime,"hh:mm")
                return hm === "08:00" ? json["hrzzmb-000179"]:json["hrzzmb-000180"]
            }
        }
        return (
            <div className={`popModal ${visible?"":"none"}`} onClick={(e)=>{this.onClose(e)}}>
                <div className="modalBody">
                    <div className="modalTitle">
                        <div className="time"><span className={showPanel === "1"?"active":""} onClick={()=>{this.showTimePanel("1")}}>{formatTime(nowTime?nowTime:defaultTime,"yyyy-MM-dd").replace(/-/g,"/")}</span><span className={showPanel === "2"?"active":""} onClick={()=>{this.showTimePanel("2")}} >{showTime()}</span></div>
                        <div className="opear">
                            <span className="close" onClick={(e)=>{this.onClose(e)}}>{json["hrzzmb-000024"]}</span>
                            <span onClick={this.onConf}>{json["hrzzmb-000003"]}</span>
                        </div>
                    </div>
                    {showPanel === "1"? <SingleCalendar json={json} ref="SingleCalendar" nowDate={nowTime?nowTime:defaultTime} changeFun = {this.dayChange} min={min}/>:<SingleTime json={json} timeFormat={timeFormat} defaultTime={nowTime?nowTime:defaultTime} hmChange={this.hmChange}/>}
                </div>
            </div>
        );
    }
}

export default TimePicker;