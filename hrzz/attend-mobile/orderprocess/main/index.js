import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.less'
import OvertimeInfo from '../container/OvertimeInfo/OvertimeInfo'
import LeaveInfo from '../container/LeaveInfo/LeaveInfo'
import TripInfo from '../container/TripInfo/TripInfo'
import InsideInfo from '../container/InsideInfo/InsideInfo'
import OutsideInfo from '../container/OutsideInfo/OutsideInfo'
import TripoffInfo from '../container/TripoffInfo/TripoffInfo'
import LeaveoffInfo from '../container/LeaveoffInfo/LeaveoffInfo'
import ExchangeInfo from '../container/ExchangeInfo/ExchangeInfo'
import {parseQueryString} from '../../../public/mobile/utils/index'
import {editNav,errHandle} from '../../utils/index'
import ajax from '../../../public/mobile/utils/ajax'
import NativeObj from '../../../public/mobile/utils/jsbridge/index'
import {DHeader} from '../../../public/mobile/components/index';
import ApplyProcess from '../../../public/mobile/components/Module/approval_process/main/index'
import {Toast} from 'antd-mobile'
import {getMultiLang} from '../../../public/mobile/utils/getMultiLang'
import thirdLog from '../../../login/third-log-method/index'; 

console.log("ExchangeInfo",ExchangeInfo)
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
        NativeObj.closePage()
    }
    // 获取单据流程信息
    getProcess(urlData,json){
        let data = {}
        if (urlData.formKey === "overtime_apply"){
            data.billtype = "6QJB"
        }
        if (urlData.formKey === "leave_apply"){
            data.billtype = "6QQJ"
        }
        if (urlData.formKey === "businesstrip_apply"){
            data.billtype = "6QCC"
        }
        if(urlData.formKey==="attence_apply"){
            data.billtype = "6QBK"
        }
        if(urlData.formKey==="outattence_apply"){
            data.billtype = "6QWQ"
        }
        if(urlData.formKey==="leaveoff_apply"){
            data.billtype = "6QXJ"
        }
        if(urlData.formKey==="revoke_businesstrip_apply"){
            data.billtype = "6QXC"
        }
        if(urlData.formKey==="exchange_apply"){
            data.billtype = "6QTB"
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
        let recallAction = ''
        if (urlData.formKey === "overtime_apply"){
            recallAction = "/nccloud/hrkq/overtime/ReCallAction.do"
        }
        if (urlData.formKey === "leave_apply"){
            recallAction = "/nccloud/hrkq/leave/ReCallAction.do"
        }
        if (urlData.formKey === "businesstrip_apply"){
            recallAction = "/nccloud/hrkq/trip/ReCallAction.do"
        }
        if(urlData.formKey==="outattence_apply"){
            recallAction = "/nccloud/hrkq/outside/ReCallAction.do"
        }
        if(urlData.formKey==="attence_apply"){
            recallAction = "/nccloud/hrkq/attendance/ReCallAction.do"
        }
        if(urlData.formKey==="leaveoff_apply"){
            recallAction = "/nccloud/hrkq/leaveoff/ReCallAction.do"
        }
        if(urlData.formKey==="revoke_businesstrip_apply"){
            recallAction = "/nccloud/hrkq/tripoff/ReCallAction.do"
        }
        if(urlData.formKey==="exchange_apply"){
            recallAction = "/nccloud/hrkq/replacecalendar/ReCallAction.do"
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
        let urlData = parseQueryString(location.href)||{}
        console.log(urlData)
        let headname = decodeURI(decodeURI(JSON.stringify(urlData)!=="{}"&&urlData.billName?urlData.billName:""))
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
            if(urlData.formKey==="overtime_apply"){
                return <OvertimeInfo json={json} id={urlData.processInstanceId} callback={this.callback}/>
            }
            if(urlData.formKey==="leave_apply"){
                return <LeaveInfo json={json} id={urlData.processInstanceId} callback={this.callback}/>
            }
            if(urlData.formKey==="businesstrip_apply"){
                return <TripInfo json={json} id={urlData.processInstanceId} callback={this.callback}/>
            }
            if(urlData.formKey==="attence_apply"){
                return <InsideInfo json={json} id={urlData.processInstanceId} callback={this.callback}/>
            }
            if(urlData.formKey==="outattence_apply"){
                return <OutsideInfo json={json} id={urlData.processInstanceId} callback={this.callback}/>
            }
            if(urlData.formKey==="leaveoff_apply"){
                return <LeaveoffInfo json={json} id={urlData.processInstanceId} callback={this.callback}/>
            }
            if(urlData.formKey==="revoke_businesstrip_apply"){
                return <TripoffInfo json={json} id={urlData.processInstanceId} callback={this.callback}/>
            }
            if(urlData.formKey==="exchange_apply"){
                return <ExchangeInfo json={json} id={urlData.processInstanceId} callback={this.callback}></ExchangeInfo>
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

thirdLog(() => {
    ReactDOM.render(<OrderProcess/>, document.getElementById('app'));
});
