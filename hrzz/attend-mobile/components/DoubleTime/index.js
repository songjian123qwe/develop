import React, { Component } from 'react';
import './index.less'
import imgurl from '../../images/tou.png'
import {DatePicker} from 'antd-mobile'
import {formatTime} from '../../../public/mobile/utils/index'

class DpublePicker extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         
      }
    }
    
    render() {
        const {
            startTime = '',
            endTime = '',
            unimint = 1,
            daylength = '',
            index = 0,
            startClick = (val) =>{
                console.log(val)
            },
            endClick = (val) =>{
                console.log(val)
            },
            json = {}
        } = this.props
        const translateFrom = (timeValue) =>{
           return <span className="active">{formatTime(new Date(timeValue), 'yyyy-MM-dd hh:mm')}</span>   
        }
        //时间显示
        const timeBox = (timeValue,types)=>{
                return (
                    <section className="timeChoose">
                     <h4>{types === 'start'?'开始':'结束'}</h4>
                     <div>{timeValue?translateFrom(timeValue):<span>必填</span>}<span className="icon hrfont hr-right"></span></div>
                    </section>
                )
        }
        // 时长显示
        return (
            <div className='doubleTime'>
                <div className="timeLeft">
                    <span></span>
                    <span></span>
                </div>
                <div className="timebox">
                <DatePicker
                value={startTime?new Date(parseInt(startTime)):''}
                onChange={startClick}
                >
                {timeBox(startTime,'start')}
                </DatePicker>
               
                <DatePicker
                value={endTime?new Date(endTime):''}
                onChange={endClick}
                >
                {timeBox(endTime,'end')}
                </DatePicker>
                </div>
            </div>
        );
    }
}

export default DpublePicker;