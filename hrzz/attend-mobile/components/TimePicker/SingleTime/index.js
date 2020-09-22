import React, { Component } from 'react';
import {PickerView} from 'antd-mobile'

class SingleTime extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             time:[],
             value:[],
             numShow:2
        }
    }
    fillTime = () => {
        // const {mininterval = 0} = this.props
        let time =[]
        let hour = []
        let minute = []
        for (let index = 0; index < 24; index++) {
            let el = {
                label: index.toString().length>1?index.toString():0+index.toString(),
                value: index.toString().length>1?index.toString():0+index.toString(),
            }
            hour.push(el)
        }
        for (let index = 0; index < 60; index=index+10) {
            let el = {
                label: index.toString().length>1?index.toString():0+index.toString(),
                value: index.toString().length>1?index.toString():0+index.toString(),
            }
            minute.push(el)
            
        }
        time.push(hour)
        time.push(minute)
        this.setState({
            time:time
        })
    }
    fillNoon = () => {
        const {json}= this.props
        let time = [{
            label:json["hrzzmb-000179"],
            value:"1"
        },{
            label:json["hrzzmb-000180"],
            value:"2"
        }]
        this.setState({
            time:time
        })
    }
    onChange = (val) => {
        console.log(val)
        this.setState({
            value:val
        })
        const {hmChange = (val) => {},timeFormat} = this.props
        if(timeFormat === "dateTime"){
            hmChange(val[0]+":"+val[1])
        } else {
            hmChange(val[0])
        }
        
    }
    componentDidMount() {
        const {mininterval = 10,timeFormat,defaultTime = new Date()} = this.props
        if(timeFormat === "dateTime"){
            this.fillTime()
        } else {
            this.fillNoon()
            this.setState({
                numShow:1
            })
        }
        let value = [defaultTime.getHours().toString().length === 1?0+defaultTime.getHours().toString():defaultTime.getHours().toString(),
            defaultTime.getMinutes().toString().length===1?(Math.round(defaultTime.getMinutes()/mininterval)*mininterval).toString():(Math.round(defaultTime.getMinutes()/mininterval)*mininterval).toString()]
        console.log(defaultTime.getHours())
        if(timeFormat === "dateNoon"){
            value = defaultTime.getHours()>=18?["2"]:["1"]
        }
        this.setState({
            value:value
        })
    }
    render() {
        const {time,value,numShow} = this.state
        const {json} = this.props
        return (
            <div>
                {time.length>0?<PickerView json={json} col={numShow} data={time} cascade={false} value={value} onChange={this.onChange}/>:""}
            </div>
        );
    }
}

export default SingleTime;