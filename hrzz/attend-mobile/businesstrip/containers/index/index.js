import React, { Component } from 'react';
import {DHeader,DModal,BasicInput,Footer} from '../../../../public/mobile/components/index';
import Calendar from '../../../components/rmc-calendar/es/Calendar';
import ajax from '../../../../public/mobile/utils/ajax';
import {  Picker, List, Toast } from 'antd-mobile';
import { Container, CreateMeta } from 'src/hrzz/public/hr-mobile-card/index';
import {timeFormate,editNav,errHandle} from '../../../utils/index'
import {setSession,getSession,removeSession,formatTime,parseQueryString} from '../../../../public/mobile/utils/index'
import 'antd-mobile/dist/antd-mobile.css'
import './index.less'
import NativeObj from '../../../../public/mobile/utils/jsbridge/index'
import ImgUpload from '../../../components/ImgUpload/index'
import TimePicker from '../../../components/TimePicker/TimePicker'
import {getMultiLang} from '../../../../public/mobile/utils/getMultiLang'
import PopChoice from '../../../components/PopChoice/PopChoice'
import {debounce} from "../../../../public/mobile/utils/utils";

const url = {
    defaultAction:'/nccloud/hrkq/trip/DefaultAction.do',
    mergeRequest:'/nccloud/platform/pub/mergerequest.do',
    headAfterEdidtAction:'/nccloud/hrkq/trip/HeadAfterEditAction.do',
    queryById:'/nccloud/hrkq/trip/QueryByIdAction.do',
    tripType: '/nccloud/hrkq/ref/TripTypeGridRefer.do',
    saveAction: "/nccloud/hrkq/trip/SaveAction.do",
    commitAction: "/nccloud/hrkq/trip/CommitAction.do"

}
class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            header:{
                name: '',
                rText: ''
            },
            freeData:[], //自定义组件数据
            store: null,
            data: null,
            showCanlendar: false,
            dateType: 'time',
            tripType: [], // 出差类型数据
            tripTypeId: '', // 出差；类型ID
            curAttrcode: '', // 当前时间类型
            enableSubmit:true, // 提交控制
            routerData:{},
            cleartime:false,
            visible:false,
            json:{},
            choiceData:{
                data:[],
                show:false,
                person:null
              },
            content:null
        }
    }
    leftClick = ()=> {
        NativeObj.closePage()
    }
    // 我的出差
    rightClick = () => {
        let routerData= this.props.location.query
        if(routerData&&!routerData.id){
            this.setData()
        }
        this.props.history.push({pathname:"/mytrip",query:{time:new Date().getTime()}});
    }
    // 日期跳转
    dateClick = () => {
        const {store} = this.state
        let data = store.getFormData('trip_card')
        let time = timeFormate(data.rows[0].values.tripbegintime.value)
        this.props.history.push({pathname:"/mytrip",query:{time:new Date(time).getTime()}});
    }
     //设置缓存数组
     setData = () => {
        const {data,tripType,tripTypeId,dateType} = this.state
        setSession("tripData",{data:data,tripType:tripType,tripTypeId:tripTypeId,dateType:dateType})
    }
    // 获取缓存数据
    getData = () => {
        let tripData = getSession("tripData")
        if(!!tripData) {
            let {data,tripType,tripTypeId,dateType} = tripData
            this.initTemplate()
            this.setState({
                data:data,
                tripType:tripType,
                tripTypeId:tripTypeId,
                dateType:dateType
            })
        } else {
            this.initFormdata()
            this.getTripType()
        }

    }
    //出差类别
    onChangeClick = (el) => {
        this.setState({
            typeId:el[0]
        })
    }
    // 初始化模板信息
    initTemplate = () => {
        ajax({
            url: url.mergeRequest,
            data: [{
                rqUrl: '/platform/templet/querypage.do',
                rqJson: `{\n  \"pagecode\": \"60657040t\",\n  \"appcode\": \"60657040\"\n}`,
                rqCode: 'template'
            }],
            success: (result) => {
                let data = result.data.template
                data.trip_card.items.forEach((item)=>{
                    if(item.attrcode === "tripday"){
                       item.itemtype = "input"
                    }
                })
                this.handleMeta(data.trip_card)
                let getMeta = CreateMeta(data, {
                    onAfterHandle: this.onAfterHandle
                })
                const {routerData} = this.state
                const that = this
                this.setState({
                    store: getMeta
                },()=>{
                    if(JSON.stringify(routerData) !== "{}"&&routerData.id ){
                        that.state.store.setFormEditStatus(true,"edit")
                        that.state.store.setFieldProps("triptypeid", "trip_card", {disabled: true})
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
    // 日历显隐
    showCanlendar = (attrcode) => {
        this.setState({
            showCanlendar: true,
            curAttrcode: attrcode
        })
    }
    // 出差类型回调
    ontripTypeChange =(val) => {
        this.setState({
            tripTypeId: val
        })
        let name = this.state.tripType.filter((item)=>{
            return item.value == val[0]
        })
        this.setFormData('triptypeid', {display:name[0].label, value: val[0]})
        let vals = {
            key: "triptypeid",
            type: "string",
            display:name[0].label,
            value: val[0]
        }
        let model = this.contactData(vals)
        console.log(model)
        this.edidtAfterHandle(vals,model)
    }
    //数据合并
    contactData (vals) {
        let {store,freeData} = this.state
           let newValue =  freeData.filter((item)=>{
                return item.key === vals.key
            })
            if(newValue.length>0){
                freeData.map((item)=>{
                    if(item.key === vals.key){
                        freeData.forEach((item,index)=>{
                            if(item.key === vals.key){
                                freeData[index] = vals
                            }
                        })
                    }
                })
            } else {
                freeData.push(vals)
        }
        this.setState({
            freeData:freeData
        })
        let model = store.getFormData('trip_card')
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
    }
    //编辑后事件
    edidtAfterHandle = (val,model)=>{
        let {json} = this.state
        Toast.loading(json["hrzzmb-000001"],0)
        ajax({
            url: url.headAfterEdidtAction,
            noNeedShowError: false,
            data: {
                attrCode:val.key,
                formData:{model:model}
            },
            success: (result) => {
                Toast.hide()
                let data =result.data
                let minunit = data.valueMap.minunit?data.valueMap.minunit.value:''
                if(JSON.stringify(data.valueMap) !== "{}"){
                    Object.keys(data.valueMap).forEach((key)=>{
                        this.setFormData(key,data.valueMap[key])
                    })
                }
                //校验参数
                this.checkData()
                if(val.key === "triptypeid"){
                    let model = this.state.store.getFormData("trip_card")
                    this. edidtAfterHandle({key:"tripendtime"},model)
                }
            },
            error: (err) =>{
                Toast.hide()
                errHandle(err,json)
            }
        })
    }
    // 自定义组件
    handleMeta = ({items}) => {
        let { tripType, json } = this.state
        if (!items || !items.length) return
        items.forEach(item => {
            switch (item.attrcode) {
                case 'tripendtime':
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
                case 'tripbegintime':
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
                case 'triptypeid':
                item.render = ({placeholder, field, label, onChange}) => {
                    let valueData = field?[field.value]:""
                    return (<Picker
                            cols={1}
                            value={valueData}
                            okText={json['hrzzmb-000003']}
                            dismissText={json['hrzzmb-000024']}
                            onChange={this.ontripTypeChange}
                            extra= {field&&field.display?field.display:json["hrzzmb-000178"]}
                            data={tripType}>
                        <List.Item arrow="horizontal">{label}</List.Item>
                    </Picker>)
                }
            }

        })
    }
    // 初始化表单默认数据
    initFormdata = () => {
        ajax({
            url: url.defaultAction,
            noNeedShowError: false,
            data: {
                operat: 0
            },
            success: (result) => {
                Toast.hide()
                let data = result.data.trip_card
                let model = data.rows[0].values
                if(model.tripbegintime.value&&model.tripendtime.value){
                    model.tripbegintime.display = model.tripbegintime.value.slice(0,-3)
                    model.tripendtime.display = model.tripendtime.value.slice(0,-3)
                }
                this.setState({
                    data:data
                })
            },
            error: (err) =>{
                Toast.hide()
                errHandle(err,json)
            }
        })
    }
    // 初始化数据显示
    detailData =  (data)=>{
        let {json} = this.state
        let itemData = data.rows[0].values
        let tripday = itemData.tripday.value
        if(itemData.minunit.value === "1"){
            itemData.tripday ={
                display:tripday?tripday+json["hrzzmb-000154"]:"",
                value:tripday
            }
        } else {
            itemData.tripday ={
                display:tripday?tripday+json["hrzzmb-000155"]:"",
                value:tripday
            }
        }
        return data
    }
    // 获取单据信息
    queryById(id){
        let {json} = this.state
        Toast.loading(json["hrzzmb-000001"],0)
        ajax({
            url: url.queryById,
            noNeedShowError: false,
            data: {
                pk_trip:id
            },
            success: (result) => {
                if(result.data){
                    let data = result.data.trip.trip_card
                    this.setState({
                        data:  this.detailData(data)
                    },()=>{
                        this.checkData()
                        this.getTripType()
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
     //时间错误清空
     timeClear = (status) => {
        let { curAttrcode } = this.state
        if(!status){
            if(curAttrcode === "tripbegintime"){
                let vals = {
                    key: "tripendtime",
                    type: "string",
                    display:"",
                    value: ""
                }
                let model = this.contactData(vals)
                this.setFormData("tripendtime", vals)
            } else {
                let vals = {
                    key: "tripbegintime",
                    type: "string",
                    display:"",
                    value: ""
                }
                let model = this.contactData(vals)
                this.setFormData("tripbegintime", vals)
            }
        }
        this.setFormData("tripday", {})
    }
    //时间校验
    timeCheck = (date) => {
        let { data,curAttrcode,dateType } = this.state
        let value = data.rows[0].values
        if (curAttrcode === "tripbegintime" && value.tripendtime.value) {
            if(dateType === "time"){
                if (new Date(timeFormate(date.value)).getTime()<new Date(timeFormate(value.tripendtime.value)).getTime()) {
                    return true
                } else {
                    return false
                }

            } else {
                if(new Date(timeFormate(date.value)).getTime()<=new Date(timeFormate(value.tripendtime.value)).getTime()){
                    return true
                } else {
                   return false
                }
            }
        }

        if (curAttrcode === "tripendtime" && value.tripbegintime.value) {
            if(dateType === "time"){
                if(new Date(timeFormate(date.value)).getTime()>new Date(timeFormate(value.tripbegintime.value)).getTime()){
                    return true
                } else {
                    return false
                }
            }else {
                if(new Date(timeFormate(date.value)).getTime()>=new Date(timeFormate(value.tripbegintime.value)).getTime()){
                    return true
                } else {
                    return false
                }
            }
        }
    }
    // 日历回调
    onCalendarConfirm = (date) => {
        let { curAttrcode,store } = this.state
        this.onCalendarCancel();
        let vals = {
            key: curAttrcode,
            type: "string",
            display:date.display,
            value: date.value
        }

       if (this.timeCheck(date)){
        let model = this.contactData(vals)
        if(model.rows[0].values.triptypeid.value&&model.rows[0].values.tripendtime.value&&model.rows[0].values.tripbegintime.value){
            this.edidtAfterHandle(vals,model)
        }
        this.setFormData(curAttrcode, date)
       } else {
        this.setState({
            cleartime:true
        },()=>{
            this.setFormData(curAttrcode, date)
        })
       }



    }
    //设置data默认值
    setFormData = (key, {display = null, value = null}) => {
        let {data,store,curAttrcode,cleartime} = this.state
        let formate = store.getFormData("trip_card")
        data.rows[0].values = formate.rows[0].values
        if(cleartime&&curAttrcode==="tripbegintime"){
            data.rows[0].values.tripendtime = {display:"", value:""}
            data.rows[0].values.tripday = {display:"", value:""}
        }
        if(cleartime&&curAttrcode==="tripendtime"){
            data.rows[0].values.tripbegintime = {display:"", value:""}
            data.rows[0].values.tripday = {display:"", value:""}
        }
        data.rows[0].values[key] = {display, value}
        this.setState({
            data:data,
            cleartime:false
        })
        this.state.store.setFieldProps(key, 'trip_card', {display,value})
    }
    //时间组件显示隐藏
    onCalendarCancel = () => {
        this.setState({
            showCanlendar: false
        })
    }
    //保存数据
    saveBill = () => {
        if (!debounce()) return;
        const {enableSubmit,store,json} = this.state

        if(!this.checkDataValue()){
            return false
        }
        if(!enableSubmit){
            // 数据参数不全
            return
        }
        let data = store.getFormData('trip_card')
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
                this.commitBill(data.rows[0].values.pk_trip.value)
            },
            error: (err) =>{
                Toast.hide()
                errHandle(err,json)
            }
        })
    }
     //提交数据
     commitBill = (id,choice) => {
         let {json,content} = this.state
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
    // 出差类别接口
    getTripType = () =>{
        let {json} = this.state
        Toast.loading(json["hrzzmb-000001"],0)
        ajax({
            url: url.tripType,
            noNeedShowError: false,
            data:{
                pid:"",
                pageInfo:{},
                keyword:"",
                defineItems:[],
                queryCondition:{
                    isShowUnit:false,
                    isDataPowerEnable:true,
                    isDataPowerEnable:true
                }

            },
            success: (result) => {
                if(result.data){
                    let data =  result.data.rows.map((item,index)=>{
                        return {
                            value:item.refpk,
                            label:item.refname
                        }
                    })
                    this.setState({
                        tripType:data
                    },()=>{
                        this.initTemplate()
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

    //参数校验
    checkData = () =>{
        this.setState({
            enableSubmit:true
        })

    }
     //参数校验
     checkDataValue = () =>{
         let {json} = this.state
        let store = this.state.store.getFormData("trip_card")
        let tripData = store.rows[0].values
        if(!tripData.triptypeid.value ){
            Toast.info(json["hrzzmb-000205"],2)
            return false
        }
        if(!tripData.tripbegintime.value  ){
            Toast.info(json["hrzzmb-000152"],2)
            return
        }
        if(!tripData.tripendtime.value  ){
            Toast.info(json["hrzzmb-000153"],2)
            return
        }
        if(tripData.tripday.value === 0  ){
            Toast.info(json["hrzzmb-000206"],2)
            return
        }
        if(!tripData.destination.value   ){
            Toast.info(json["hrzzmb-000207"],2)
            return
        }
        return true
    }
    getLanguage = (routerData) => {
        getMultiLang({
            domainName: "hrzz",
            moduleId: "hrzzmb",
            other:true,
            datatype: true,
            callback: (json, status, init) => {
                console.log(json)

                this.setState({
                    json: json,
                    header:{
                        name:json["hrzzmb-000203"],
                        rText:json["hrzzmb-000204"]
                    }
                },()=>{
                    if(routerData&&routerData.id) {
                        removeSession("tripData")
                        this.setState({
                            routerData:routerData
                        },()=>{
                            this.queryById(routerData.id)
                        })

                    } else {
                        const {header} = this.state
                        editNav(header,this.leftClick,this.rightClick)
                        this.getData()
                    }
                })
            }
        })
    }

    componentWillMount() {
        let urlData = parseQueryString(location.href)||{}
        console.log(urlData)
        let routerData = {}
        if(urlData&&!urlData.id){
            window.location.hash ='?&c=60657040&p=60657040'
            routerData =  this.props.location.query
        } else {
            routerData = urlData
        }
        this.getLanguage(routerData)

    }

    //回调
    onConfirm = (date)=>{
        console.log(date)
        this.onClose()
        let { curAttrcode,store } = this.state
        let vals = {
            key: curAttrcode,
            type: "string",
            display:date.display,
            value: date.value
        }

       if (this.timeCheck(date)){
           this.setFormData(curAttrcode, date)
           const {data} = this.state
            if(data.rows[0].values.triptypeid.value&&data.rows[0].values.tripendtime.value&&data.rows[0].values.tripbegintime.value){
                this.edidtAfterHandle(vals,data)
            }

       } else {
        this.setState({
            cleartime:true
        },()=>{
            this.setFormData(curAttrcode, date)
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
      // 指派组件回调事件
    onOk = (val) =>{
        let {choiceData,store} = this.state
        let data = store.getFormData('trip_card')
        let id = data.rows[0].values.pk_trip.value
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
        let {store, data, tripType,enableSubmit,curAttrcode,visible,json,choiceData} = this.state
        let id = ""
        let newtime = function (dayNumber) {
            if(!dayNumber){
                return
            }
            let  now = new Date()
            let year = now.getFullYear()
            let month = now.getMonth()
            let day = now.getDate()
            let nowTime = new Date(year,month,day).getTime()
            let dayTime = 24*60*60*1000
            return  new Date(nowTime-dayNumber*dayTime)
        }
        let scheduday = data&&data.rows&&data.rows[0].values.scheduday.value ? data.rows[0].values.scheduday.value : null
        let min =  newtime(scheduday)
        let defaultDate = new Date()
        if(data){
            let value = data.rows[0].values
            let endtime = timeFormate(value.tripendtime.value?value.tripendtime.value:formatTime(new Date(),"yyyy-MM-dd hh:mm:ss"))
            let begintime = timeFormate(value.tripbegintime.value?value.tripbegintime.value:formatTime(new Date(),"yyyy-MM-dd hh:mm:ss"))
            defaultDate = new Date(curAttrcode==="tripbegintime"?begintime:endtime)
            id= value.pk_trip.value
        }
        return (
            <div className="businesstrip">
                <DHeader title={this.state.header.name} leftClick={this.leftClick} type={'wide'} rText={this.state.header.rText} rightClick={this.rightClick} />
                <PopChoice showModel={choiceData.show} chData={choiceData.data} onOk={this.onOk} onCancel={this.onCancel}/>
                {tripType&&tripType.length>0? <Container
                    hideHeader={true}
                    store={store}
                    cardName="trip_card"
                    data={data}
                    onAfterHandle={this.onAfterHandle}
                />:""}
                <TimePicker json={json} defaultTime = {new Date()} timeFormat = {"dateTime"} onCancel={this.onClose} onConfirm ={this.onConfirm} visible={visible} min={min}/>
                {!data?"":< ImgUpload json={json}  billId={id} />}
                <div className={`footer ${!enableSubmit?"":"active"}`}
                        onClick={this.saveBill}
                >{json["hrzzmb-000023"]}</div>
            </div>
        )
    }
}

export default Index;
