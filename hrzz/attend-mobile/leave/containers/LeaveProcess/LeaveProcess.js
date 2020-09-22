import React, { Component } from 'react';
import {DHeader, DEmpty} from '../../../../public/mobile/components/index'
import ajax from '../../../../public/mobile/utils/ajax'
import { formatTime } from '../../../../public/mobile/utils/index';
import OrderProcess from '../../../../public/mobile/components/Module/approval_process/main/index'
import './LeaveProcess.less'
import { Toast } from 'antd-mobile';
import {editNav,errHandle } from '../../../utils/index'
import {getMultiLang} from '../../../../public/mobile/utils/getMultiLang'

const url = {
    process:"/nccloud/workflow/approvalcenter/worklownoteHistoryQuery.do"
}
class LeaveOrder extends Component {
    constructor(props) {
      super(props)

      this.state = {
         header:{
             name: "",
         },
         processData:[],
         routeData:{},
         json:{}

      }
    }
     // 返回
     leftClick =  () => {
         const {orderType,id,routerData} = this.state.routeData
         console.log(routerData)
         if(orderType === 1){
            this.props.history.push({pathname:'/leaveorder',
            query: {
                id: id
            }
             });
         } else {
            this.props.history.push({pathname:'/leaverevise',
            query: routerData
             });
         }


    }
      // 获取单据流程信息
      getProcess(order,json){
        Toast.loading("加载中...",0)
        ajax({
            url: url.process,
            noNeedShowError: false,
            data: {
                billtype:order.billtype,
                billid:order.id
            },
            success: (result) => {
              console.log(result)
              Toast.hide()
              let processData  =   OrderProcess.formatData(result.data.rows.rows)
              this.setState({
                processData:processData
              })
            },
            error: (err) =>{
                Toast.hide()
                errHandle(err,json)
            }
        })
    }
    getLanguage = (routeData) => {
        getMultiLang({
            domainName: "hrzz",
            moduleId: "hrzzmb",
            other:true,
            datatype: true,
            callback: (json, status, init) => {
                this.setState({
                    json: json,
                },()=>{
                    const {header} = this.state
                    this.setState({
                        routeData:routeData,
                        header:{name:routeData.orderType === 1 ? json["hrzzmb-000192"]:json["hrzzmb-000193"]}
                    },()=>{
                         const {header} = this.state
                        editNav(header,this.leftClick)
                    })
                    this.getProcess(routeData,json)
                })
            }
        })
    }
    componentWillMount() {
        window.location.hash ='?&c=60657020&p=60657020&ar=0001Z510000000065KV7&id=0'
        let routeData = this.props.location.query
        this.getLanguage(routeData)
    }
    render() {
        const {header,processData,json} = this.state
        return (
            <div className="leaveProcess">
                <div className="header">
                    <DHeader title={header.name} leftClick={this.leftClick}   />
                </div>
                <div className="process">
                    <OrderProcess json={json} processData={processData} />
                </div>
            </div>
        );
    }
}

export default LeaveOrder;