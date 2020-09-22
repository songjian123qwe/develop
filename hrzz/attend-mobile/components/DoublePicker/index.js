import React, { Component } from 'react';
import './index.less'
import imgurl from '../../images/tou.png'
import TimePicker from '../TimePicker/TimePicker'
import { formatTime} from '../../../public/mobile/utils/index'
const timeHandle = (timeValue,type,format,json) => {
    let data = timeValue.split(' ')
    // const {json} = this.props
    if(type === 'yymmdd'){
        return data[0]
    } else {
        if(format === 'dateTime'){
            return <div>{data[1].substring(0,5)}</div>
        }
        if(format === 'dateNoon'&&data[1] === "08:00:00"){
            return <div>{json["hrzzmb-000179"]}</div>
        }
        if(format === 'dateNoon'&&data[1] === "18:00:00"){
            return <div>{json["hrzzmb-000180"]}</div>
        }
        if(format === 'date'){
            return ""
        }
    }
}
//时间显示
const timeBox = (timeValue,types,formatTime,showCanlendar,json)=>{
    if(timeValue){
        return (
            <section className="timeChoose" onClick={()=>{
                showCanlendar(types)
            }}>
             <h4>{types === 'start'?json["hrzzmb-000211"]:json["hrzzmb-000212"]}</h4>
             <div>{timeHandle(timeValue,'yymmdd',formatTime,json)}</div>
             {timeHandle(timeValue, types === "time"?"hhmm":types === "date"?"":"Noon",formatTime,json)}
            </section>
        )
        
    } else {
        return (
            <section className="timeChoose" onClick={()=>{
                showCanlendar(types)
            }}>
                 <h4>{types === 'start'?json["hrzzmb-000211"]:json["hrzzmb-000212"]}</h4>
                <div className="chooseWarn">{json["hrzzmb-000178"]}</div>
            </section>
        )
    }
   
}
class DpublePicker extends Component {
    constructor(props) {
      super(props)
      this.state = {
        canlendarStatus: false,
        dateType: 'dateTime',
        curAttrcode: '', // 当前时间类型
      }
    }
    // 日历回调
    onConfirm = (date) => {
       const {curAttrcode} = this.state
       const {timeBackFun,dateType,json} = this.props
       this.onClose();
       let time =date
       if(JSON.stringify!=="{}"&&dateType === "date"){
        time.value = date.value.split(" ")[0] + " 00:00:00"
       }
       if(JSON.stringify!=="{}"&&dateType === "dateNoon"){
        time.value = `${date.value.split(" ")[0]} ${date.display.split(" ")[1] === json["hrzzmb-000179"]?"08:00:00":"18:00:00"}`
       }
       timeBackFun(time,curAttrcode)
     }
     // 显示
     onShow = (attrcode) =>{
        this.setState({
            visible:true,
            curAttrcode:attrcode
        })
    }
     //关闭
     onClose = ()=>{
        const {visible} = this.state
        this.setState({
            visible:false,
        })
    }
    render() {
        const {
            startTime = '',
            endTime = '',
            dateType = 'dateTime',
            dayLength = 0,
            defaultDate = new Date(),
            index = 0,
            miunit = 1,
            timeBackFun = (date,types) => {
                console.log(date,types)
            },
            json = {}
            
        } = this.props
        console.log(dateType)
        const {visible} = this.state
        
        // 时长显示
        return (
           
            <div className='doublePicker'>
                {timeBox(startTime,'start',dateType,this.onShow,json)}
                <TimePicker json={json} defaultTime = {new Date()} timeFormat = {dateType} onCancel={this.onClose} onConfirm ={this.onConfirm} visible={visible}/>
                <div className="timeMidle">
                    {dayLength?<div ><span>{dayLength}</span></div>:''}
                    <img src={imgurl} alt="箭头"/>
                </div>
                {timeBox(endTime,'end',dateType,this.onShow,json)}
            </div>
        );
    }
}

export default DpublePicker;