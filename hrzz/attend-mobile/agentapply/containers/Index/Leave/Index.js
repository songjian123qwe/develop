import React, { Component } from 'react';
import ajax from '../../../../../public/mobile/utils/ajax';
import {  Picker, List,Toast } from 'antd-mobile';
import { Container, CreateMeta } from 'src/hrzz/public/hr-mobile-card/index';
import 'antd-mobile/dist/antd-mobile.css'
import {timeFormate,errHandle} from '../../../../utils/index'
import {setSession,getSession,removeSession,formatTime,} from '../../../../../public/mobile/utils/index'
import './index.less'
import ImgUpload from '../../../../components/ImgUpload/index'
import TimePicker from '../../../../components/TimePicker/TimePicker'
import PopChoice from '../../../../components/PopChoice/PopChoice'
import {debounce} from "../../../../../public/mobile/utils/utils";

const url = {
    defaultAction:'/nccloud/hrkq/insteadapply/LeaveAddDefaultAction.do',
    mergeRequest:'/nccloud/platform/pub/mergerequest.do',
    headAfterEditAction:'/nccloud/hrkq/insteadapply/LeaveHeadAfterEditAction.do',
    queryById:'/nccloud/hrkq/insteadapply/QueryByIdAction.do',
    leaveType: '/nccloud/hrkq/ref/LeaveTypeGridRefer.do',
    saveAction: "/nccloud/hrkq/leave/SaveAction.do",
    commitAction: "/nccloud/hrkq/leave/CommitAction.do"

}
let leave = []
class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            freeData:[], //自定义组件数据
            store: null,
            data: null,
            showCanlendar: false,
            dateType: 'dateTime',
            leaveType: [], // 请假类型数据
            leaveTypeId: '', // 请假；类型ID
            curAttrcode: '', // 当前时间类型
            enableSubmit:false, // 提交控制
            routerData:{},
            cleartime:false,
            visible:false,
            imgrequire:false,
            dataTime:{endtime:{},begintime:{}},
            minunit:null,
            isattachment:null,
            attachmentExcessHour:null,
            attachmentExcessDay:null,
            isrequire:false,
            dataitem:null,
            choiceData:{
                data:[],
                show:false,
                person:null
              },
            content:null,
            leaveTypeData:null,
            feedStatus: false
        }
    }
    // 日期跳转
    dateClick = () => {
        const {store,data} = this.state
        let {rightClick} = this.props
        let time = timeFormate(data.rows[0].values.begintime.value)
        rightClick(time)
    }
    //请假类别
    onChangeClick = (el) => {
        this.setState({
            typeId:el[0]
        })
    }
    // 初始化模板信息
    initTemplate = () => {
        const {json} = this.props
        Toast.loading(json["hrzzmb-000001"],0)
        ajax({
            url: url.mergeRequest,
            noNeedShowError: false,
            data: [{
                rqUrl: '/platform/templet/querypage.do',
                rqJson: `{\n  \"pagecode\": \"60657090t\",\n  \"appcode\": \"60657090\"\n}`,
                rqCode: 'template'
            }],
            success: (result) => {
                let data = result.data.template
                data.leaveinstead_card.items.forEach((item)=>{
                    if(item.attrcode === "leaveday"||item.attrcode === "vacationquota"){
                       item.itemtype = "input"
                    }
                    if(item.attrcode === "pk_psndoc"){
                     item.queryCondition = function (){
                         return {
                             'GridRefActionExt':'nccloud.web.hrkq.insteadapply.sqlbuilder.InsteadApplySqlBuilder',
                             "appCode":"60657090"
                         }
                     }
                    }
                })
                let item = data.leaveinstead_card.items
                this.handleMeta(data.leaveinstead_card)
                let getMeta = CreateMeta(data, {
                    onAfterHandle: this.onAfterHandle
                })
                const {routerData} = this.state
                const that = this
                this.setState({
                    store: getMeta,
                    dataitem:item
                },()=>{
                    if(JSON.stringify(routerData) !== "{}"&&routerData.id ){
                        that.state.store.setFormEditStatus(true,"edit")
                        const {data} = this.state
                        if(data.rows[0].values.breastfeedingleaveway && data.rows[0].values.breastfeedingleaveway.value){
                               this.feedOpear()
                           }
                    } else {
                        that.state.store.setFormEditStatus(true,"add")
                    }
                })

                Toast.hide()
            },
            error: (err) =>{
                Toast.hide()
                errHandle(err,json)
            }
        })
    }
     // 哺乳假设置
     feedOpear() {
        this.state.store.setFieldProps("breastfeedingleaveway", "leaveinstead_card", {visible: true})
        this.state.store.setFieldProps("breastfeedingleaveday", "leaveinstead_card", {visible: true})
        this.state.store.setFieldProps("leaveday", "leaveinstead_card", {visible: false})
        // this.setFormData("breastfeedingleaveway",{value:1})
        // this.setFormData("breastfeedingleaveday",{value:1})
        this.setFormData("leaveday",{value:1})
    }
    // 请假类型回调
    onLeaveTypeChange =(val) => {
        let leaveType = []
        this.setState({
            leaveTypeId: val
        },()=>{
            console.log(this.state.leaveType)
            leaveType =  this.state.leaveType
        })
        let leaveTypes = this.state.leaveTypeData.filter((item)=>{
            return item.refpk == val[0]
        })
        this.setFormData('pk_leave_type', {display:leaveTypes[0].refname, value: leaveTypes[0].refpk})
        let feedMark = false
        if(leaveTypes[0].refcode === '8'){
            this.setState({
                dateType: 'date',
                feedStatus: true
            },()=>{
                this.feedOpear()
                this.timeEditAfter()
                this.checkData()
            })
            feedMark = true
        } else {
            this.state.store.setFieldProps("breastfeedingleaveway", "leaveinstead_card", {visible: false})
            this.state.store.setFieldProps("breastfeedingleaveday", "leaveinstead_card", {visible: false})
            this.state.store.setFieldProps("leaveday", "leaveinstead_card", {visible: true})
            this.setState({
                feedStatus: false
            })
           feedMark = false
        }
        let vals = {
            key: "pk_leave_type",
            type: "string",
            display:leaveTypes[0].refname,
            value: val[0]
        }
        let model = this.contactData(vals)
        this.edidtAfterHandle(vals,model,feedMark)
        this.timeCheck()
    }
    //数据合并
    contactData (vals) {
        let {store,freeData} = this.state
           let newValue =  freeData.filter((item)=>{
                return item.key === vals.key
            })
            if(newValue.length>0){
                freeData.forEach((item,index)=>{
                    if(item.key === vals.key){
                        freeData[index] = vals
                    }
                })
            } else {
                freeData.push(vals)
                this.setState({
                    freeData:freeData
                })

        }
        let model = store.getFormData('leaveinstead_card')
        Object.keys(model.rows[0].values).forEach((item)=>{
           const keyValue =   model.rows[0].values[item]
           for (let index = 0; index < freeData.length; index++) {
               const element = freeData[index];
               if(element.key === item ){
                  keyValue.value = element.value
                  keyValue.display = element.display
               }

           }
        })
        return model
    }
    onAfterHandle = (val) => {
        console.log(val, '***formAfterEvent***')
        if(val.key === "pk_psndoc"){
            this.setFormData("",{})
            this.getLeaveType(val.value)
        }
    }
    //编辑后事件
    edidtAfterHandle = (val,model,feedMark)=>{
        const {json} = this.props
        Toast.loading(json["hrzzmb-000001"],0)
        ajax({
            url: url.headAfterEditAction,
            noNeedShowError: false,
            data: {
                attrCode:val.key,
                formData:{model:model}
            },
            success: (result) => {
                Toast.hide()
                let data =result.data
                let minunit = data.valueMap.minunit?data.valueMap.minunit.value:''
                let mintime = data.extend.minTime
                let isattachment = data.extend.isattachment
                let attachmentExcessHour = data.extend.attachmentExcessHour
                let attachmentExcessDay = data.extend.attachmentExcessDay
                let leaveday = data.valueMap.leaveday?data.valueMap.leaveday.value:""
                if(val.key === "pk_leave_type"){
                    this.setState({
                        minunit,
                        isattachment,
                        attachmentExcessHour,
                        attachmentExcessDay
                    })
                }
                if((leaveday || leaveday === 0)){
                    let {minunit,isattachment,attachmentExcessHour,attachmentExcessDay} = this.state
                    console.log(minunit,isattachment,attachmentExcessHour,attachmentExcessDay)
                    if(isattachment === "1"&&(minunit === "1"&&attachmentExcessHour<=leaveday ||minunit === "2"&&attachmentExcessDay<=leaveday )){
                        this.setState({
                            isrequire:true
                        })
                    } else {
                        this.setState({
                            isrequire:false
                        })
                    }

                }
                if(JSON.stringify(data.valueMap) !== "{}"){
                    Object.keys(data.valueMap).forEach((key)=>{
                        this.setFormData(key,data.valueMap[key])
                    })
                }
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
                if(feedMark){
                    return false
                }
                if(minunit === "1"){
                    this.setState({
                        dateType:"dateTime"
                    },()=>{
                        this.timeEditAfter()
                    })
                } else {
                    if(minunit === "2") {
                        this.setState({
                            dateType:"date"
                        },()=>{
                            this.timeEditAfter()
                        })
                    }
                    if(minunit === "2"&& mintime && mintime === "1"){
                        console.log("dateNoon")
                        this.setState({
                            dateType:"dateNoon"
                        },()=>{
                            this.timeEditAfter()
                        })
                    }

                }

                //校验参数
                this.checkData()
                Toast.hide()
                let fromdata = model.rows[0].values
                if(val.key === "pk_leave_type" && fromdata.begintime.value&&fromdata.endtime.value){
                    let model = this.state.store.getFormData("leaveinstead_card")
                    this.edidtAfterHandle({key:"endtime"},model)
                }
            },
            error: (err) =>{
                Toast.hide()
                errHandle(err,json)
            }
        })
    }
    //时间转化函数互转函数
    translateTime = (types,data,timeType) => {
        const {json} = this.props
        if(types === "dateTime"){
            return {
                display:data.value?data.value.slice(0,-3):"",
                value:data.value
            }
        }
        if(types === "date"){
            return {
                display:data.value?data.value.split(" ")[0]:"",
                value:data.value
            }
        }
        if(types === "dateNoon"){
            if(data.display&&data.display.length === 10 ){
                if(timeType === "end"){
                    return {
                        display:data.value?data.value.split(" ")[0] + " " + json["hrzzmb-000180"]:"" ,
                        value:data.value?data.value.split(" ")[0] + " " + "18:00:00":""
                    }
                } else {
                    return {
                        display:data.value?data.value.split(" ")[0] + " " + json["hrzzmb-000179"] :"",
                        value:data.value?data.value.split(" ")[0] + " " + "08:00:00":""
                    }
                }
            } else {
                if(data.value){
                    let datas = new Date(data.value.replace(/-/g,"/")).getHours()
                    let name = datas>=12?json["hrzzmb-000180"]:json["hrzzmb-000179"]
                    let time = datas>=12?"18:00:00":"08:00:00"
                    return {
                        display:data.value?data.value.split(" ")[0] + " " + name :"",
                        value:data.value?data.value.split(" ")[0] + " " + time:""
                    }
                } else {
                    return {
                        display:"",
                        value:""
                    }
                }


            }
        }
    }
    //设置上下午
    setDateType = (data) =>{
        const {json} = this.props
        let typeValue ={}
        if(data.display.split(" ")[1] === json["hrzzmb-000179"]){
            typeValue.display="1"
            typeValue.value="1"
        } else{
            typeValue.display="2"
            typeValue.value="2"
        }
        return typeValue
    }
    //时间编辑后处理
    timeEditAfter = () => {
        const {dateType,data} = this.state
        let datas = data.rows[0].values
        if(datas.begintime.value){
            let begin = this.translateTime(dateType,datas.begintime,"begin")
            if (dateType === "dateNoon"){
                this.setFormData('start_day_type', this.setDateType(begin))
            } else {
                this.setFormData('start_day_type', {})
            }
            this.setFormData('begintime', begin)
        }
        if(datas.endtime.value){
            let end = this.translateTime(dateType,datas.endtime,"end")
            if (dateType === "dateNoon"){
                this.setFormData('end_day_type', this.setDateType(end))
            } else{
                this.setFormData('start_day_type', {})
            }
            this.setFormData('endtime', end)
        }

    }
    // 自定义组件
    handleMeta = ({items},leaveType=this.state.leaveType) => {
        const {json} = this.props
        if (!items || !items.length) return
        items.forEach(item => {
            switch (item.attrcode) {
                case 'endtime':
                item.render = ({placeholder, field, label, onChange}) => {
                    return (
                        <List.Item
                            arrow="horizontal"
                            onClick={this.onShow.bind(this, item.attrcode)}
                            extra={field&&field.display?field.display:json["hrzzmb-000153"]}>
                            {label}
                        </List.Item>
                    )
                }
                break;
                case 'begintime':
                item.render = ({placeholder, field, label, onChange}) => {
                    return (
                        <List.Item
                            arrow="horizontal"
                            onClick={this.onShow.bind(this, item.attrcode)}
                            extra={field&&field.display?field.display:json["hrzzmb-000152"]}>
                            {label}
                        </List.Item>
                    )
                }
                break;
                case 'pk_leave_type':
                item.render = ({ field, label}) => {
                    let valueData = field?[field.value]:""
                    return (<Picker
                            cols={1}
                            value={valueData}
                            onChange={this.onLeaveTypeChange}
                            extra= {field&&field.display?field.display:json["hrzzmb-000178"]}
                            data={leaveType}>
                        <List.Item arrow="horizontal">{label}</List.Item>
                    </Picker>)
                }
            }

        })
    }
    // 初始化表单默认数据
    initFormdata = () => {
        const {json} = this.state
        ajax({
            url: url.defaultAction,
            noNeedShowError: false,
            data: {
                operat: 0
            },
            success: (result) => {
                if(result.data){
                    let data = result.data.leaveinstead_card
                    let model = data.rows[0].values
                   if(model.begintime.value&&model.endtime.value){
                    model.begintime.display = model.begintime.value.slice(0,-3)
                    model.endtime.display = model.endtime.value.slice(0,-3)
                   }
                    this.setState({
                        data:result.data.leaveinstead_card
                    })
                    // this.state.store.setFormEditStatus(true,"add")
                }

                Toast.hide()
            },
            error: (err) =>{
                Toast.hide()
                errHandle(err,json)
            }
        })
    }
    //初始化数据显示
    detailData =  (data)=>{
        const {json} = this.props
        let itemData = data.rows[0].values
        let leaveday = itemData.leaveday.value
        if (itemData.breastfeedingleaveway) {
            this.setState({
                dateType:"date",
            })
            return data
        }
        if(itemData.minunit.value === "1"){
            itemData.leaveday.display =leaveday+json["hrzzmb-000154"]
            this.setState({
                dateType:"dateTime"
            })
        } else {
           itemData.leaveday.display=leaveday+json["hrzzmb-000155"]
           let end =  itemData.end_day_type.value
           let begin = itemData.start_day_type.value
           let begintime  = itemData.begintime.value
           let endtime = itemData.endtime.value
            if(end&&begin){
                itemData.begintime.display= `${showbegindate.split(" ")[0]} ${begin==="1"?json["hrzzmb-000179"]:json["hrzzmb-000180"]} `
                itemData.endtime.display= `${showenddate.split(" ")[0]} ${end==="1"?json["hrzzmb-000179"]:json["hrzzmb-000180"]} `
                this.setState({
                    dateType:"dateNoon"
                })
            } else {
                itemData.begintime.display= showbegindate.split(" ")[0]
                itemData.endtime.display= showenddate.split(" ")[0]
                this.setState({
                    dateType:"date"
                })
            }
        }
        return data
    }
    // 获取单据信息
    queryById(id){
        const {json} = this.props
        Toast.loading(json["hrzzmb-000001"],0)
        ajax({
            url: url.queryById,
            noNeedShowError: false,
            data: {
                billtype:"6QQJ",
                pk:id
            },
            success: (result) => {
                if(result.data){
                let data = result.data.leave.leaveinstead_card
                this.setState({
                    dataTime:{
                        endtime:data.rows[0].values.endtime,
                        begintime:data.rows[0].values.begintime
                    },
                    data:this.detailData(data)
                },()=>{
                    this.checkData()
                    this.getLeaveType()
                })
                }
                Toast.hide()
            },
            error: (err) =>{
                Toast.hide()
                errHandle(err,json)
            }
        })
    }
    leaveTypeSplit = (data) => {
        const {json} = this.props
        let datetype = data.split(' ')
        if(datetype[1] === json["hrzzmb-000179"]){
            return "1"
        } else {
            return "2"
        }
    }
    //时间错误清空
    timeClear = (status) => {
        let { curAttrcode } = this.state
        if(!status){
            if(curAttrcode === "begintime"){
                let vals = {
                    key: "endtime",
                    type: "string",
                    display:"",
                    value: ""
                }
                let model = this.contactData(vals)
                this.setFormData("endtime", vals)
            } else {
                let vals = {
                    key: "begintime",
                    type: "string",
                    display:"",
                    value: ""
                }
                let model = this.contactData(vals)
                this.setFormData("begintime", vals)
            }
        }
        let val = {
            key:"leaveday",
            display:"",
            value:""
        }
        let model = this.contactData(val)
        this.setFormData("leaveday", {})
    }
    //时间校验
    timeCheck = (date) => {
        let { data,curAttrcode,dateType } = this.state
        let value = data.rows[0].values
        if (curAttrcode === "begintime" && value.endtime.value) {
            if(dateType === "time"){
                if (new Date(timeFormate(date.value)).getTime()<new Date(timeFormate(value.endtime.value)).getTime()) {
                    return true
                } else {
                    return false
                }

            } else {
                if(new Date(timeFormate(date.value)).getTime()<=new Date(timeFormate(value.endtime.value)).getTime()){
                    return true
                } else {
                    return false
                }
            }
        }

        if (curAttrcode === "endtime" && value.begintime.value) {
            if(dateType === "time"){
                if(new Date(timeFormate(date.value)).getTime()>new Date(timeFormate(value.begintime.value)).getTime()){
                    return true
                } else {
                    return false
                }
            }else {
                if(new Date(timeFormate(date.value)).getTime()>=new Date(timeFormate(value.begintime.value)).getTime()){
                    return true
                } else {
                    return false
                }
            }
        }
    }

    //设置data默认值
    setFormData = (key, {display = null, value = null}) => {
        let {data,store,curAttrcode,cleartime} = this.state
        console.log(key, display,value,data.rows[0].values)
        let formate = store.getFormData("leaveinstead_card")
        data.rows[0].values.pk_psndoc = formate.rows[0].values.pk_psndoc
        data.rows[0].values.leaveremark = formate.rows[0].values.leaveremark
        if(cleartime&&curAttrcode==="begintime"){
            data.rows[0].values.endtime = {display:"", value:""}
            data.rows[0].values.leaveday = {display:"", value:""}
        }
        if(cleartime&&curAttrcode==="endtime"){
            data.rows[0].values.begintime = {display:"", value:""}
            data.rows[0].values.leaveday = {display:"", value:""}
        }
        if(data.rows[0].values.minunit.value === "2"){
            if(key === "begintime"){
                data.rows[0].values.showbegindate = {display, value}
            }
            if(key === "endtime"){
                data.rows[0].values.showenddate = {display, value}
            }
        }
        if(data.rows[0].values.minunit.value === "1"){
            data.rows[0].values.showbegindate = {display:"", value:""}
            data.rows[0].values.showenddate = {display:"", value:""}
        }
        if(key){
            data.rows[0].values[key] = {display, value}
        }
        this.setState({
            data:data,
            cleartime:false
        })
        this.state.store.setFieldProps(key, 'leaveinstead_card', {display,value})
        if(key === "vacationquota"){
            if(value){
                this.state.store.setFieldProps('vacationquota', 'leaveinstead_card', {visible: true})
            } else{
                this.state.store.setFieldProps('vacationquota', 'leaveinstead_card', {visible: false})
            }
        }
        if (!key) {
            data.rows[0].values.pk_leave_type = {display:"", value:""}
            data.rows[0].values.showbegindate = {display:"", value:""}
            data.rows[0].values.showenddate = {display:"", value:""}
            data.rows[0].values.begintime = {display:"", value:""}
            data.rows[0].values.endtime = {display:"", value:""}
            data.rows[0].values.leaveday = {display:"", value:""}
        }

    }
    //保存数据
    saveBill = () => {
        if (!debounce()) return;
        const {enableSubmit,store,dataTime,feedStatus} = this.state
        const {json} = this.props
        this.checkDataValue()
        if(!enableSubmit){
            // 数据参数不全
            return
        }
        let data = store.getFormData('leaveinstead_card')
        if (!feedStatus) {
            data.rows[0].values.breastfeedingleaveway = {}
            data.rows[0].values.breastfeedingleaveday = {}
        } else {
            data.rows[0].values.leaveday.value = data.rows[0].values.breastfeedingleaveday.value
        }
        if(data.rows[0].values.minunit.value === "2"&&dataTime.endtime.value&&dataTime.begintime.value){
            data.rows[0].values.endtime = dataTime.endtime
            data.rows[0].values.begintime = dataTime.begintime
        }
        if (data.rows[0].values.minunit.value === "1"){
            data.rows[0].values.showenddate =  data.rows[0].values.endtime
            data.rows[0].values.showbegindate =data.rows[0].values.begintime
        }
        let formData = {
            model: data
        }
        ajax({
            url: url.saveAction,
            noNeedShowError: false,
            data: {
                formData
            },
            success: (result) => {
                let data = store.getFormData('leaveinstead_card')
               this.commitBill(data.rows[0].values.pk_leave.value)
            },
            error: (err) =>{
                Toast.hide()
                errHandle(err,json)
            }
        })
    }
     //提交数据
     commitBill = (id,choice={}) => {
        const {json} = this.props
        const {store,content} = this.state
        Toast.loading(json["hrzzmb-000001"],0)
        let param = {
            pk:id
        }
        if(choice&&choice.person){
            content.content[0].uservos = [...choice.person]
            param.content = content
        }
        ajax({
            url: url.commitAction,
            noNeedShowError: false,
            data: param,
            success: (result) => {
                Toast.hide()
                console.log(result)
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
                    this.dateClick()
                }
            },
            error: (err) =>{
                Toast.hide()
                errHandle(err,json)
            }
        })
    }
    // 请假类别接口
    getLeaveType = (pk_psndoc) =>{
        const {json} = this.props
        Toast.loading(json["hrzzmb-000001"],0)
        ajax({
            url: url.leaveType,
            noNeedShowError: false,
            data:{
                pid:"",
                pageInfo:{},
                keyword:"",
                defineItems:[],
                queryCondition:{
                    pk_psndoc:pk_psndoc,
                    isShowUnit:false,
                    isDataPowerEnable:true,
                    isDataPowerEnable:true
                }

            },
            success: (result) => {
                let {dataitem,store} = this.state
                console.log(result.data)
                if(result.data){
                    let data =  result.data.rows.map((item,index)=>{
                        return {
                            value:item.refpk,
                            label:item.refname
                        }
                    })
                    this.setState({
                        leaveType:data,
                        leaveTypeData:result.data.rows
                    },()=>{
                        if(!pk_psndoc){
                            this.initTemplate()
                        } else {
                            this.handleMeta({items:dataitem},data)
                            this.setState({
                                store,
                            })
                        }

                    })
                }
                Toast.hide()
            },
            error: (err) =>{
                Toast.hide()
                errHandle(err,json)
            }
        })
    }
      //设置缓存数组
      setData = () => {
        const {data,leaveType,leaveTypeId,dateType} = this.state
        setSession("leaveData",{data:data,leaveType:leaveType,leaveTypeId:leaveTypeId,dateType:dateType})
    }
     // 获取缓存数据
     getData = () => {
        let leavedata = getSession("leaveData")
        if(!!leavedata) {
            let {data,leaveType,leaveTypeId,dateType} = leavedata
            this.initTemplate()
            this.setState({
                data:data,
                leaveType:leaveType,
                leaveTypeId:leaveTypeId,
                dateType:dateType
            })
        } else {
            this.initFormdata()
            this.getLeaveType()
        }
    }
    //参数校验
    checkData = () =>{
        const {data,isattachment,imgrequire,feedStatus} = this.state
        let leaveData = data.rows[0].values
        let condition =  Object.keys(leaveData).every((item)=>{
            if(item==="pk_leave_type" ||  item==="leaveday"||item==="endtime"||item==="begintime"){
                return feedStatus&&item==="leaveday" ? true : leaveData[item].value
            } else {
                return true
            }
        })
        if(condition&&isattachment === "1"){
            condition = imgrequire
        }
        this.setState({
            enableSubmit:condition
        })

    }
    //参数校验
    checkDataValue = () =>{
        const {json} = this.props
        const {data,isattachment,imgrequire} = this.state
        console.log(isattachment,imgrequire)
        let leaveData = data.rows[0].values
        if(!leaveData.pk_leave_type.value ){
            Toast.info(json["hrzzmb-000182"],2)
            return
        }
        if(!leaveData.begintime.value  ){
            Toast.info(json["hrzzmb-000152"],2)
            return
        }
        if(!leaveData.endtime.value  ){
            Toast.info(json["hrzzmb-000153"],2)
            return
        }
        if(leaveData.leaveday.value === 0 ){
            Toast.info(json["hrzzmb-000183"],2)
            return
        }
        if(isattachment === "1"){
            if(!imgrequire){
                Toast.info(json["hrzzmb-000184"],2)
                return
            }
        }
    }

    componentWillMount() {
        console.log(this.props)
        let routerData = this.props.routerData
        console.log()
        if(!routerData){
            this.getData()
        }
    }

    // 初始化数据
    componentWillReceiveProps(nextProps){
        let routerData =nextProps.routerData
        if(routerData&&routerData.id) {
            removeSession("leaveData")
            this.setState({
                routerData:routerData
            },()=>{
                this.queryById(routerData.id)
            })
        }
    }
      //关闭
      onClose = ()=>{
        const {visible} = this.state
        this.setState({
            visible:false,
        })
    }
    // 显示
    onShow = (attrcode) =>{
        this.setState({
            visible:true,
            curAttrcode:attrcode
        })
    }
    // 回调
    onConfirm = (date) => {
        let { curAttrcode,dateType,data } = this.state
        // 时间校验清空操作
        this.onClose();
        let vals = {
            key: curAttrcode,
            type: "string",
            display:date.display,
            value: date.value
        }
        if(this.timeCheck(date)){
            this.setFormData(curAttrcode, date)
            const {data} = this.state
            console.log(data)
            if(data.rows[0].values.pk_leave_type.value){
            this.edidtAfterHandle(vals,data)
            }
            this.setState({
                cleartime:false
            }, ()=>{
                if(dateType === "dateNoon"){
                    let leaveTypeDay  =  this.leaveTypeSplit(date.display)
                    let  key = curAttrcode === "begintime"?"start_day_type":"end_day_type"
                     let vald ={
                          value: leaveTypeDay,
                      }
                      this.setFormData(key,vald)
                  }
            })
        } else {
            this.setState({
                cleartime:true
            },()=>{
                this.setFormData(curAttrcode, date)
            })
        }
    }
    callback = (num) =>{
       this.setState({
        imgrequire:num>0
       },()=>{
        this.checkData()
       })

    }
     // 指派组件回调事件
     onOk = (val) =>{
        let {choiceData,store} = this.state
        let data = store.getFormData('leaveinstead_card')
        let id = data.rows[0].values.pk_leave.value
        choiceData.show = false
        choiceData.person = [...val]
        this.setState({
            choiceData
        },()=>{
            this.commitBill(id,choiceData)
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
        let {choiceData,store, data, dateType, leaveType,enableSubmit,curAttrcode,routerData,visible,isrequire} = this.state
        let defaultDate = new Date()
        let {json} = this.props
        let id=""
        if(data){
            let value = data.rows[0].values
            let endtime = timeFormate(value.endtime.value?value.endtime.value:formatTime(new Date(),"yyyy-MM-dd hh:mm:ss"))
            let begintime = timeFormate(value.begintime.value?value.begintime.value:formatTime(new Date(),"yyyy-MM-dd hh:mm:ss"))
            defaultDate = new Date(curAttrcode==="begintime"?begintime:endtime)
            id= value.pk_leave.value
        }
        return (
            <div className="insteadleave">
                {leaveType.length>0? <Container
                    hideHeader={true}
                    store={store}
                    cardName="leaveinstead_card"
                    data={data}
                    onAfterHandle={this.onAfterHandle}
                />:""}
                <PopChoice showModel={choiceData.show} chData={choiceData.data} onOk={this.onOk} onCancel={this.onCancel}/>
                {!data?"":<ImgUpload billId={id} isrequire={isrequire} isRequest={routerData&&!!routerData.id} json={json} callback={this.callback}/>}
                <TimePicker json={json} defaultTime = {defaultDate} timeFormat = {dateType} onCancel={this.onClose} onConfirm ={this.onConfirm} visible={visible}/>
                <div className={`footer ${!enableSubmit?"":"active"}`}
                        onClick={this.saveBill}
                >{json["hrzzmb-000023"]}</div>
            </div>
        )
    }
}

export default Index;
