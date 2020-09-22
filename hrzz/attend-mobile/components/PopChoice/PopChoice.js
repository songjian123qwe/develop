import React, { Component } from 'react';
import {   List, Checkbox  } from 'antd-mobile';
import './PopChoice.less'
const CheckboxItem = Checkbox.CheckboxItem;

class PopChoice extends Component {
    constructor(props) {
        super(props);
        this.state ={
            choicePerson:[]
        }
    }
    onSure = () =>{
        const {onOk} = this.props
        const {choicePerson} = this.state
        onOk(choicePerson)
    }
    onChange = (val,index) =>{
        let {choicePerson} = this.state
        const {chData} = this.props
        let userpk = chData[index].userpk
        let newArr = choicePerson.map(item=>{
            return item.userpk
        })
        let unm = newArr.indexOf(userpk)
        if(unm>=0){
            choicePerson.splice(unm,1)
        } else {
            choicePerson.push(val)
        }
        this.setState({
            choicePerson
        })
    }
    render() {
        const {chData=[],onCancel= ()=>{console.log("取消")}, showModel=false, popTitle="请指派审核人员", onOk=()=>{console.log("ok"); },json={}} = this.props
        return (
             <div style={showModel?{"display":"block"}:{"display":"none"}} className="popModel"  >  
                <div className="pop">
                <div className="popTitle">
                    <div onClick={onCancel}>{JSON.stringify(json) !== "{}"?json['hrzzmb-000024']:"取消"}</div>
                    <div>{popTitle}</div>
                    <div onClick={this.onSure}>{JSON.stringify(json) !== "{}"?json['hrzzmb-000003']:"确定"}</div>
                </div>
               
                <List >
                    {chData.map((item,index) => (
                    <CheckboxItem key={index} onChange={()=>{this.onChange(item,index)}}>
                        {item.username}
                    </CheckboxItem>
                    ))}
                </List>
                </div>
                <div className="popBg"></div>
            </div>
        );
    }
}

export default PopChoice;