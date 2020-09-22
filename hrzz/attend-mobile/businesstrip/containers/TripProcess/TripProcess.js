import React, { Component } from 'react';
import {DHeader, DEmpty} from '../../../../public/mobile/components/index'
import ajax from '../../../../public/mobile/utils/ajax'
import { formatTime } from '../../../../public/mobile/utils/index';
import OrderProcess from '../../../../public/mobile/components/Module/approval_process/main/index'
import './TripProcess.less'
import { Toast } from 'antd-mobile';
import  {editNav,errHandle} from '../../../utils/index'
import {getMultiLang} from '../../../../public/mobile/utils/getMultiLang'

const url = {
    process:"/nccloud/workflow/approvalcenter/worklownoteHistoryQuery.do"
}
class LeaveOrder extends Component {
    constructor(props) {
      super(props)

      this.state = {
         header:{
             name: "出差流程",
         },
         processData:[],
         routeData:{}

      }
    }
     // 返回
     leftClick =  () => {
         const {orderType,id,routerData} = this.state.routeData
         if(orderType === 1){
            this.props.history.push({pathname:'/triporder',
            query: {
                id: id
            }
             });
         } else {
            this.props.history.push({pathname:'/triprevise',
            query:  routerData
             });
         }


    }
      // 获取单据流程信息
      getProcess(order,json){
        Toast.loading("加载中...")
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
                    header:{
                        name:json["hrzzmb-000188"],
                        rText:json["hrzzmb-000189"]
                    }
                },()=>{
                    this.setState({
                        routeData:routeData,
                        header:{name:routeData.orderType === 1 ? json["hrzzmb-000215"]:json["hrzzmb-000216"]}
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
        let routeData = this.props.location.query
        this.getLanguage(routeData)

    }
    render() {
        const {header,processData} = this.state
        return (
            <div className="tripProcess">
                <div className="header">
                    <DHeader title={header.name} leftClick={this.leftClick}   />
                </div>
                <div className="process">
                    <OrderProcess processData={processData} />
                </div>
            </div>
        );
    }
}

export default LeaveOrder;