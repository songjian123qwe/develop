import React, { Component } from 'react';
import {DHeader, DEmpty} from '../../../../public/mobile/components/index'
import ajax from '../../../../public/mobile/utils/ajax'
import { formatTime } from '../../../../public/mobile/utils/index';
import './ReviseLeave.less'
import DoublePicker from'../../../components/DoublePicker'
import OrderItem from './components/OrderItem/OrderItem'
import  OpearLoading from './components/OpearLoading/OpearLoading'
import {editNav,orderState,errHandle} from "../../../utils/index"
import { Toast, Modal} from 'antd-mobile';
import PopView from '../../../components/PopView'
import NativeObj from '../../../../public/mobile/utils/jsbridge/index'
import TimeShow from './components/TimeShow/TimeShow.js'
import OrderBody from './components/OrderBody/OrderBody'
import ImgShow from '../../../components/ImgShow/index'
import {getMultiLang} from '../../../../public/mobile/utils/getMultiLang'
import PopChoice from '../../../components/PopChoice/PopChoice'

const alert = Modal.alert;


const url = {
    defaultAction:'/nccloud/hrkq/leaveoff/DefaultAction.do',
    HeadAfterEditAction:'/nccloud/hrkq/leaveoff/HeadAfterEditAction.do',
    DeleteDrAction:'/nccloud/hrkq/leaveoff/DeleteDrAction.do',
    DeleteAction:'/nccloud/hrkq/leaveoff/DeleteAction.do',
    saveAction: "/nccloud/hrkq/leaveoff/SaveAction.do",
    commitAction: "/nccloud/hrkq/leaveoff/CommitAction.do",
    recallAction:'/nccloud/hrkq/leaveoff/ReCallAction.do',
    queryById:'/nccloud/hrkq/leaveoff/QueryByIdAction.do',
    
}
class ReviseLeave extends Component {
    constructor(props) {
      super(props)
      this.state = {
         header:{
             name: "",
             rText: ""
         },
         reviseLeave:{
            endtime:'',
            begintime:'',

         },
         offorder:{},
         dateType:"dateTime",
         routerData:{},
         moreOpear:false,
         enableSubmit:false, // 状态
         dataTime:{endtime:{},begintime:{}},
         listData:[
           
         ],
         json:{},
         choiceData:{
            data:[],
            show:false,
            person:null
          },
        content:null
      }
    }
     // 返回
     leftClick =  () => {
        const {offorder} = this.state
        let time = offorder.leaveoffbegintime.value
        let newtime = time?time.replace(/-/g,"/"):formatTime(new Date(),"yyyy-MM-dd").replace(/-/g,"/")
        this.props.history.push({pathname:"/myleave",query:{time:new Date(newtime).getTime()}});
    }
    rightClick =  () => {
        const {routerData,offorder} = this.state
        if (routerData.status  === "-1" || routerData.status  === "0"){
            this.setState({
                moreOpear:true
            })
        }
        if(routerData.status === "1" || routerData.status === "2" || routerData.status === "3"){
             this.props.history.push({pathname:"/leaveprocess",query:{orderType:"2",billtype:offorder.billtype.value,id:offorder.pk_leaveoff.value,routerData:routerData}});
        }
    }
    clickChange = (val) =>{
        this.setState({
            moreOpear:false
        })
        if(val === "2"){
            this.deleteFun()
        } else {
            const {routerData,offorder} = this.state
            this.props.history.push({pathname:"/leaveprocess",query:{orderType:"2",billtype:offorder.billtype.value,id:offorder.pk_leaveoff.value,routerData:routerData}});
        }
    } 
    //时间校验
    checkTimeValue = () => {
            const {offorder} = this.state
            if(offorder.leaveoffendtime.value&&offorder.leaveoffendtime.value&&Number(offorder.leaveoffday.value)>0&&!(offorder.leaveoffendtime.value === offorder.leaveendtime.value && offorder.leavebegintime.value === offorder.leaveoffbegintime.value)){
                this.setState({
                    enableSubmit:true
                })
            } else {
                this.setState({
                    enableSubmit:false
                })
            }
    }
    // 提交校验
    checkoutValue = () => {
        const {offorder,json} = this.state
        if(!offorder.leaveoffbegintime.value){
            Toast.info(json["hrzzmb-000196"],1)
            return false
        }
        if(!offorder.leaveoffendtime.value){
            Toast.info(json["hrzzmb-000197"],1)
            return false
        }
        if(offorder.dr_flag.value !== "1"&&Number(offorder.leaveoffday.value)===0){
            Toast.info(json["hrzzmb-000198"],1)
            return false
        }
        if(offorder.dr_flag.value !== "1" && offorder.leaveoffshowenddate.value == offorder.leaveendtime.value && offorder.leaveoffshowbegindate.value == offorder.leavebegintime.value ){
            Toast.info(json["hrzzmb-000199"],1)
            return false
        }

    }
    //编辑后事件
    edidtAfterHandle = (val,data)=>{
        console.log("edidtAfterHandle")
        const {json} = this.state
        let value = Object.assign({},data)
        let model = {
            areaType: "form",
            rows:[
                {
                    status:"2",
                    values:data
                }
            ]
        }
        Toast.loading(json["hrzzmb-000001s"],0)
        ajax({
            url: url.HeadAfterEditAction,
            noNeedShowError: false,
            data: {
                attrCode:val,
                formData:{model:model}
            },
            success: (result) => {
                let values = result.data.valueMap
                let data = result.data
                value.leaveoffday =values.leaveoffday
                if(data.extend&&JSON.stringify(data.extend) !== "{}"){
                    if(data.extend.endTime&&data.extend.startTime){
                        this.setState({
                            dataTime:{
                                endtime:{
                                    value:data.extend.endTime,
                                    display:data.extend.endTime
                                },
                                begintime:{
                                    value:data.extend.startTime,
                                    display:data.extend.startTime
                                }
                            }
                        })
                    }   
                   
                }
                
                this.setState({
                    offorder:value
                },()=>{
                    this.checkTimeValue()
                })
                Toast.hide()
            },
            error: (err) =>{
                Toast.hide()
                errHandle(err,json)
            }
        })
        }
    leaveOpear = ()=>{
        this.refs.OpearLoading.showOpear()
    }
    checkTime = (offorder,types) =>{
        let neworder = Object.assign({},offorder)
        const  {dateType } = this.state
        let end = offorder.leaveoffendtime.value
        let begin = offorder.leaveoffbegintime.value
        if(dateType === "dateTime"){
            if(begin&&end&&begin>=end&&types === "start"){
                neworder.leaveoffendtime = {
                    display:"",
                    value:""
                }
                neworder.leaveoffshowenddate = {
                    display:"",
                    value:""
                }
                return neworder
            } 
            if(begin&&end&&begin>=end&&types === "end") {
                neworder.leaveoffbegintime = {
                    display:"",
                    value:""
                }
                neworder.leaveoffshowbegindate = {
                    display:"",
                    value:""
                }
                return neworder
            }
            return offorder
        }
        if(dateType === "date" || dateType === "dateNoon" ){
            if(begin&&end&&begin>end&&types === "start"){
                neworder.leaveoffendtime = {
                    display:"",
                    value:""
                }
                return neworder
            }  
            if(begin&&end&&begin>end&&types === "end"){
                neworder.leaveoffbegintime = {
                    display:"",
                    value:""
                }
                return neworder
            }
            return offorder
        }
    }
    timeBackFun = (date,types)=> {
        let {offorder,dateType} = this.state
        if(types === "start"){
            offorder.leaveoffbegintime = date
            offorder.leaveoffshowbegindate = date
           
        }else {
            offorder.leaveoffendtime = date
            offorder.leaveoffshowenddate = date
        }
        let  neworder =this.checkTime(offorder,types)
        let end = neworder.leaveoffendtime.value
        let begin = neworder.leaveoffbegintime.value
        if(end&&begin){
            this.edidtAfterHandle(types === "start"?"leaveoffbegintime":"leaveoffendtime",neworder)
        } else {
            this.setState({
                offorder:neworder
            },()=>{
                this.checkTimeValue()
            })
        }
       
    }
    //显示dialog
    showDr = ()=>{
        let {json} = this.state
        const dialog = {
            content:json["hrzzmb-000200"],
            lBtnText:json["hrzzmb-000024"],
            rBtnText:json["hrzzmb-000003"]
        }
        alert('', dialog.content, [
            { text: dialog.lBtnText, onPress: () => console.log('cancel') },
            { text: dialog.rBtnText, onPress: this.deleteDrFun },
          ])
    }
    // 修改单据dr状态
    deleteDrFun = () => {
        const {offorder,json} = this.state
        Toast.loading(json["hrzzmb-000001s"],0)
        ajax({
            url: url.DeleteDrAction,
            noNeedShowError: false,
            data:{
                pk:offorder.mainid.value,
                pk_group:offorder.pk_group.value
            },
            success: (result) => {
                if(result.success === true){
                    offorder.dr_flag.value = "1"
                    offorder.leaveoffday=  {value:0,display:0}
                    offorder.leaveoffendtime =  offorder.leaveendtime
                    offorder.leaveoffbegintime =  offorder.leavebegintime
                    this.setState({
                        offorder:offorder,
                        enableSubmit:true
                    })
                }
                
                Toast.hide()
            },
            error: (result) => {
                Toast.hide()
                errHandle(err,json)
            }
        })
    }
     // 恢复请假装填
     deleteFun = () => {
        const {offorder,json} = this.state
        Toast.loading(json["hrzzmb-000001s"],0)
        ajax({
            url: url.DeleteAction,
            noNeedShowError: false,
            data:{
                pk:offorder.pk_leaveoff.value,
                pk_group:offorder.pk_group.value
            },
            success: (result) => {
                Toast.hide()
                this.leftClick()
            },
            error: (err) =>{
                Toast.hide()
                errHandle(err,json)
            }
        })
    }
    // 保存接口
    saveBill = () => {
        this.checkoutValue()
        let {offorder,enableSubmit,dataTime,json} = this.state
        console.log(dataTime)
        if(dataTime.begintime.value &&dataTime.endtime.value ){
            offorder.leaveoffbegintime = dataTime.begintime
            offorder.leaveoffendtime = dataTime.endtime
        }
        if(!enableSubmit){
            return false
        }

        let model = {
            areaType: "form",
            rows:[
                {
                    status:"2",
                    values:offorder
                }
            ]
        }
       

        ajax({
            url: url.saveAction,
            noNeedShowError: false,
            data: {
                formData:{model:model}
            },
            success: (result) => {
               this.commitBill() 
            },
            error: (err) =>{
                Toast.hide()
                errHandle(err,json)
            }
        })
    }
    // 提交接口
    commitBill = (choice) => {
        const {offorder,json,content} = this.state
        Toast.loading(json["hrzzmb-000001s"],0)
        let parm ={
            pk:offorder.pk_leaveoff.value
        }
        if(choice&&choice.person){
           content.content[0].uservos = [...choice.person]
           parm.content = content
        }
        ajax({
            url: url.commitAction,
            noNeedShowError: false,
            data: parm,
            success: (result) => {
                Toast.hide()
                if(result.data){
                    const {choiceData} = this.state
                    const content = result.data.content
                    const data = result.data.content.content[0].uservos
                    choiceData.data = [...data]
                    choiceData.show =  true
                     this.setState({
                        choiceData,
                        content
                     })
                } else {
                   this.leftClick()
                }
            },
            error: (err) =>{
                Toast.hide()
                errHandle(err,json)
            }
        })
    }
    // 查询单据信息
    queryById = (id) => {
        let {json} = this.state
        Toast.loading(json["hrzzmb-000001s"],0)
        ajax({
            url: url.queryById,
            noNeedShowError: false,
            data: {
                pk_leave:id
            },
            success: (result) => {
                Toast.hide()
               let offorder = result.data.leaveoff.leaveoff_card.rows[0].values
               if(offorder.minunit === "2"){
                    this.setState({
                        dataTime:{
                            endtime:offorder.leaveoffendtime,
                            begintime:offorder.leaveoffbegintime
                        }
                    })
                    offorder.leaveoffbegintime = offorder.leaveoffshowbegindate
                    offorder.leaveoffendtime = offorder.leaveoffshowenddate
               }
               this.setState({
                   offorder:offorder
               },()=>{
                   this.checkTimeValue()
               })
               if(offorder.dr_flag.value === "1" ){
                this.setState({
                    enableSubmit:true
                })
                }
               this.getTimeType(offorder)
            },
            error: (err) =>{
                Toast.hide()
                errHandle(err,json)
            }
        })
    }
    // 撤回单据
    recallOrder = () => {
        const {offorder,json} = this.state
        Toast.loading(json["hrzzmb-000001s"],0)
        ajax({
            url: url.recallAction,
            noNeedShowError: false,
            data: {
                pk:offorder.pk_leaveoff.value
            },
            success: (result) => {
                this.leftClick()
            },
            error: (err) =>{
                Toast.hide()
                errHandle(err,json)
            }
        })
    }
    // 获取时间类型
    getTimeType  = (offorder) => {
        if(offorder.minunit.value === "1"){
            this.setState({
                dateType:"dateTime"
            })
            }else {
                if(offorder.leave_start_day_type.value&&offorder.leave_end_day_type.value){
                    this.setState({
                        dateType:"dateNoon"
                    }) 
                } else {
                    this.setState({
                        dateType:"date"
                    })  
                }
            }
    }
    // 初始化表单默认数据
    initFormdata = (id) => {
        let  {json} = this.state
        Toast.loading(json["hrzzmb-000001s"],0)
        ajax({
            url: url.defaultAction,
            noNeedShowError: false,
            data: {
                operat: 0,
                pk_other:id,
            },
            success: (result) => {
               let offorder = result.data.leaveoff_card.rows[0].values
               if(offorder.dr_flag.value){

               }
               this.setState({
                   offorder:offorder,
                   enableSubmit:offorder.dr_flag.value === "1"?true:false
               })
               this.getTimeType(offorder)
                Toast.hide()
            },
            error: (err) =>{
                Toast.hide()
                errHandle(err,json)
            }
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
                    let {header} = this.state
                    header.name=json["hrzzmb-000194"]
                    if(!routerData.status){
                        header.rText =""
                        this.initFormdata(routerData.id)
                    }  
                    if (routerData.status === "-1" || routerData.status === "0"){
                        header.rText = json["hrzzmb-000195"]
                        this.queryById(routerData.id)
                    }
                    if(routerData.status === "1" || routerData.status === "2" || routerData.status === "3"){
                        header.rText = json["hrzzmb-000189"]
                        this.queryById(routerData.id)
                    }
                    let listData =   [{
                                label:json["hrzzmb-000189"],
                                value:"1",
                            },
                            {
                            label:json["hrzzmb-000095"],
                            value:"2",
                        }]
                    this.setState({
                        header,
                        routerData,
                        listData
                    },()=>{
                        let {header} = this.state
                        console.log(header)
                        editNav(header,this.leftClick,this.rightClick)
                    })
                })
            }
        })
    }
    
    
    componentWillMount() {
        window.location.hash ='?&c=606570A0&p=606570A0&ar=0001Z510000000065KV7'
        let routerData = this.props.location.query
        this.getLanguage(routerData)
    }
    
     // 指派组件回调事件
     onOk = (val) =>{
        let {choiceData,store} = this.state
        choiceData.show = false
        choiceData.person = [...val]
        this.setState({
            choiceData
        },()=>{
            this.commitBill(choiceData)
        })
        
    }
    onCancel = () =>{
        let {choiceData} = this.state
        choiceData.show = false
        this.setState({
            choiceData
        })
    }
    
    render() {
        const {header,offorder,dateType,enableSubmit,moreOpear,listData,json,choiceData} = this.state
        const timeFormType = (time)=>{
            console.log(time)
            if(time&&dateType === "dateNoon"){
                return time.split(" ")[1] === "08:00:00"?time.split(" ")[0] + " " +json["hrzzmb-000179"] : time.split(" ")[0] + " " +json["hrzzmb-000180"] 
            } else {
                return time
            }
        }
      
        let lengthday = JSON.stringify(offorder)!=="{}"&& (offorder.leaveoffday.value||offorder.leaveoffday.value === 0)?offorder.leaveoffday.value + offorder.minunit.display:""
        return (
            <div className="leaveRevise">
                <div className="header">
                    <DHeader title={header.name} leftClick={this.leftClick} rText={header.rText} rightClick={this.rightClick}  />
                </div>
                <PopChoice showModel={choiceData.show} chData={choiceData.data} onOk={this.onOk} onCancel={this.onCancel}/>
                <PopView status={moreOpear} data={listData} clickChange={this.clickChange}/>
                {
                        JSON.stringify(offorder) === "{}"?"": 
                        <div className="bodyShow">
                        <h4>
                            <span className="title">{offorder.pk_leave_type.display}</span>
                        { JSON.stringify(offorder) === "{}" ? "": <span className="status" style={orderState(offorder.approvestatus.value).style}>{offorder.approvestatus.display}</span> }
                        <span className="opear" onClick={this.leaveOpear}>{json["hrzzmb-000201"]}?</span></h4>
                        <OrderItem json={json} order={offorder} deleteFun = {this.showDr}/>
                       {
                           JSON.stringify(offorder) !== "{}"&&offorder.dr_flag.value === "1"?"":  <div className="xiaojia">
                           <h4>{json["hrzzmb-000202"]}</h4>
                            {offorder.approvestatus.value === "-1"?<DoublePicker json={json} dateType={dateType} dayLength={lengthday} startTime={offorder.leaveoffbegintime.value}  endTime={offorder.leaveoffendtime.value} timeBackFun = {this.timeBackFun}/>:<TimeShow json={json} order={offorder}/>}
                           
                           </div>
                       }
                    </div>
                }
                {
                    JSON.stringify(offorder) === "{}"?"":<OrderBody json={json} order={offorder}/>
                }
                 {
                    JSON.stringify(offorder) === "{}"?"":<div className="imgbox"><ImgShow json={json} billId={offorder.mainid.value}/></div>
                }
                {offorder.approvestatus&&offorder.approvestatus.value === "3"?<div onClick={this.recallOrder} className="footer active">{json["hrzzmb-000170"]}</div>:""}
                {offorder.approvestatus&&offorder.approvestatus.value === "-1"?<div className={`footer ${enableSubmit?"active":""}`} onClick={this.saveBill}>{json["hrzzmb-000023"]}</div>:""}
                <OpearLoading  ref="OpearLoading" json={json}/>
            </div>
        );
    }
}

export default ReviseLeave;