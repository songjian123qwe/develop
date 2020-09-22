import React, {Component} from 'react';
import './index.less'
import InsideInfo from './containers/InsideInfo/InsideInfo'
import {parseQueryString} from '../../../../public/mobile/utils/index'
import {editNav,errHandle} from '../../../utils/index'
import ajax from '../../../../public/mobile/utils/ajax'
import NativeObj from '../../../../public/mobile/utils/jsbridge/index'
import {DHeader} from '../../../../public/mobile/components/index';
import ApplyProcess from '../../../../public/mobile/components/Module/approval_process/main/index'
import {Toast} from 'antd-mobile'
import {getMultiLang} from '../../../../public/mobile/utils/getMultiLang'

let url ={
    orderProcess:"/nccloud/workflow/approvalcenter/worklownoteHistoryQuery.do"
}
class OrderProcess extends Component{
    constructor (props) {
        super(props);
        this.state = {
            header:{},
            urlData:{},
            processData:{},
            orderStatus:"",
            json:{}
        }
    }
    leftClick = () => {
        let {urlData} = this.state
        let time = parseInt(urlData.time)
        this.props.history.push({pathname:"/myovertime",query:{time:new Date(time).getTime()}});
    }
    // 获取单据流程信息
    getProcess(urlData,json){
        let data = {}
       
        if(urlData.formKey==="attence_apply"){
            data.billtype = "6QBK"
        }
        data.billid=urlData.processInstanceId
        ajax({
            url: url.orderProcess,
            noNeedShowError: false,
            data: data,
            success: (result) => {
                console.log(result)
                if(result.data){
                     let processData  =   ApplyProcess.formatData(result.data.rows.rows)
                        console.log(processData)
                        this.setState({
                        processData:processData
                        })
                }
             
            },
            error:(err)=>{
                Toast.hide()
                errHandle(err,json)
           }
        })
    }
    //撤回
    recall = ()=> {
        const {urlData} = this.state
        if(urlData.formKey==="attence_apply"){
            recallAction = "/nccloud/hrkq/attendance/ReCallAction"
        }
        Toast.loading("加载中...",0)
        ajax({
            url: recallAction,
            noNeedShowError: false,
            data: {
                pk:urlData.processInstanceId
            },
            success: (result) => {
                Toast.hide()
                console.log(result)
                NativeObj.closePage()
            },
            error:(err)=>{
                Toast.hide()
           }
        })

    }
    callback = (status) => {
        this.setState({
            orderStatus:status
        })
    }
    getLanguage = (routerData) => {
        getMultiLang({
            domainName: "hrzz",
            moduleId: "hrzzmb",
            other:true,
            datatype: true,
            callback: (json, status, init) => {
                this.setState({
                    json: json,
                },()=>{
                    this.getProcess(routerData,json)
                })
            }
        })
    }
   
    componentWillMount() {
        let urlData = this.props.location.query
        console.log(urlData)
        let headname = urlData.billName
        let header={
            name:headname,
        }
        this.setState({
            header:header
        },()=>{
            editNav(header,this.leftClick)
        })
        this.setState({
            urlData:urlData
        },()=>{
            this.getLanguage(urlData)
        })
       
    }

    render () {
        const typeChoose = (urlData) =>{
            const {json} = this.state
            if(urlData.formKey==="attence_apply"){
                return <InsideInfo json={json} id={urlData.processInstanceId} callback={this.callback}/>
            }
        }
        const {urlData,processData,orderStatus,json} = this.state
        return (

            <div className="orderprocess">
                <DHeader title={this.state.header.name} leftClick={this.leftClick} type={'wide'}  />
                {typeChoose(urlData)}
                <div className="process">
                   {JSON.stringify(processData)!=="{}"?<div>{json["hrzzmb-000229"]}</div>:""}
                   {JSON.stringify(processData)!=="{}"?<ApplyProcess processData={processData}/>:""} 
                </div>
                {orderStatus === "3"?<div className="footer" onClick={this.recall}>{json["hrzzmb-000170"]}</div>:""}
            </div>
        )
    }
}

export default OrderProcess;
