import React, { Component } from 'react';
import {DHeader} from '../../../../public/mobile/components/index';
import {   List, Picker} from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css'
import './index.less'
import {editNav} from '../../../utils/index'
import {parseQueryString} from '../../../../public/mobile/utils/index'
import NativeObj from '../../../../public/mobile/utils/jsbridge/index'
import Leave from './Leave/index'
import Overtime from './Overtime/index'
import PropTypes from "prop-types";
import {getMultiLang} from '../../../../public/mobile/utils/getMultiLang'
const url = {
    defaultAction:'/nccloud/hrkq/overtime/DefaultAction.do',
    mergeRequest:'/nccloud/platform/pub/mergerequest.do',
    queryById:'/nccloud/hrkq/overtime/QueryByIdNccAction.do',
    saveAction: "/nccloud/hrkq/overtime/SaveAction.do",
    commitAction: "/nccloud/hrkq/overtime/CommitAction.do"
}
class Index extends Component {
    static childContextTypes = {
        referAfterAct: PropTypes.func
    };

    constructor(props) {
        super(props)
        this.state = {
            header:{
                name: '',
                rText: ''
            },
            agentType:[
               
            ],
            dataType:"leave",
            valueData:["leave"],
            routerData:{},
            json:{}
        }
    }
    getChildContext() {
        return {
            referAfterAct: this.resetHeader
        };
    }

    resetHeader = () => {
        const {header,json} = this.state;
        this.setState({
            header:{
                name:json["hrzzmb-000255"],
                rText:json["hrzzmb-000256"]
            },
        },()=>{
            editNav(header,this.leftClick,this.rightClick)
        })
        
    };
    leftClick = () => {
        NativeObj.closePage()
    }
    rightClick = (time) => {
        let nowTime = typeof time === "strign"?time : new Date().getTime()
        this.props.history.push({pathname:"/agentrecord",query:{time:nowTime}});
    }
    makesure = (val) => {
        console.log("v",val)
        this.setState({
            valueData:val,
            dataType:val[0]
        })
    }
    getLanguage = () => {
        getMultiLang({
            domainName: 'hrzz',
            moduleId: 'hrzzmb',
            other:true,
            callback: (json, status, init) => {
                this.setState({
                    json: json,
                    header:{
                        name:json["hrzzmb-000255"],
                        rText:json["hrzzmb-000256"]
                    },
                    agentType:[
                        {
                            label:json["hrzzmb-000176"],
                            value:"leave"
                        },
                        {
                            label:json["hrzzmb-000150"],
                            value:"overtime"
                        }
                    ]
                },()=>{
                    const {header} = this.state
                    editNav(header,this.leftClick,this.rightClick)
                })
            }
        })
    }
    componentWillMount(){
        this.getLanguage()
        let urlData = parseQueryString(location.href)||{}
        let routerData = {}
        let valueData = ["leave"]
        let dataType = "leave"
        console.log(urlData)
        if(urlData&&!urlData.id){
            window.location.hash ='?&c=60657090&p=60657090'
            routerData =  this.props.location?this.props.location.query :{}
        } else {
            routerData = urlData
        }
        console.log("routerData",routerData)
        if(routerData&&routerData.billtype){
            valueData = routerData.billtype === "6QQJ"?["leave"]:["overtime"]
            dataType = routerData.billtype === "6QQJ"?"leave":"overtime"
        }
        this.setState({
            routerData:routerData,
            valueData:valueData,
            dataType:dataType
        })
      
    }
    render() {
        let { data,agentType,dataType,valueData,routerData,json} = this.state
        let id = data&&data.rows[0].values.pk_overtime?data.rows[0].values.pk_overtime.value:""
        return (
            <div className="agentapply">
                <DHeader title={this.state.header.name} leftClick={this.leftClick} type={'wide'} rText={this.state.header.rText} rightClick={this.rightClick} />
                <div className="agentBody">
                        <div className="auto">
                        <List style={{ backgroundColor: 'white' }} className="picker-list">
                            <Picker data={agentType} cols={1} value={valueData} className="forss" onOk={this.makesure} okText={json["hrzzmb-000003"]} dismissText={json["hrzzmb-000024"]}> 
                                <List.Item arrow="horizontal">{json["hrzzmb-000257"]}</List.Item>
                            </Picker>
                        </List>
                        </div>
                        {dataType === "leave" ?<Leave routerData={routerData} rightClick = {this.rightClick} json={json}></Leave>:<Overtime routerData={routerData} rightClick = {this.rightClick} json={json}></Overtime>}
                </div>
            </div>
        )
    }
}

export default Index;
