import React, { Component } from 'react';
import {DHeader,DModal,BasicInput,Footer} from '../../../../public/mobile/components/index';
import Calendar from '../../../components/rmc-calendar/es/Calendar';
import ajax from '../../../../public/mobile/utils/ajax';
import {   List,  Toast } from 'antd-mobile';
import { Container, CreateMeta } from 'src/hrzz/public/hr-mobile-card/index';
import 'antd-mobile/dist/antd-mobile.css'
import './index.less'
import {timeFormate,editNav,errHandle} from '../../../utils/index'
import TimePicker from '../../../components/TimePicker/TimePicker'
import {getSession,setSession,removeSession,parseQueryString} from '../../../../public/mobile/utils/index'
import NativeObj from '../../../../public/mobile/utils/jsbridge/index'
import {getMultiLang} from '../../../../public/mobile/utils/getMultiLang'
import PopChoice from '../../../components/PopChoice/PopChoice'
const url = {
    defaultAction:'/nccloud/hrkq/overtime/DefaultAction.do',
    mergeRequest:'/nccloud/platform/pub/mergerequest.do',
    queryById:'/nccloud/hrkq/overtime/QueryByIdNccAction.do',
    saveAction: "/nccloud/hrkq/overtime/SaveAction.do",
    commitAction: "/nccloud/hrkq/overtime/CommitAction.do",
    headAfterEditAction:'/nccloud/hrkq/overtime/HeadAfterEditAction.do',
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
            templateData:{}, //模板数据
            curAttrcode: '', // 当前时间类型
            enableSubmit:false, // 提交控制
            status:false,
            visible:false,
            json:{},
            choiceData:{
                data:[],
                show:false,
                person:null
            },
            content:null,
            needRequired:{},
            durationObject:{}
        }
    }
    leftClick = () => {
        NativeObj.closePage()
    }
    rightClick = () => {
        let nowTime = new Date().getTime()
        this.props.history.push({pathname:"/myovertime",query:{time:nowTime}});
    }
    //编辑后事件
    edidtAfterHandle = (val,model)=>{
        const {json} = this.state
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
                let data  = result.data
                this.setFormData("otapplylength",data.valueMap.otapplylength)
                this.setState({
                    durationObject:data.extend.durationObject
                })
            },
            error: (err) =>{
                this.setFormData("otapplylength",{display:'',value:''})
                this.setState({
                    durationObject:data.extend.durationObject
                })
                errHandle(err, json)
                Toast.hide()
            }
        })
    }
    // 日期跳转
    dateClick = () => {
        const {store} = this.state
        let data = store.getFormData('overtime_card')
        let time = timeFormate(data.rows[0].values.overtimebegintime.value)
        this.props.history.push({pathname:"/myovertime",query:{time:new Date(time).getTime()}});
    }
    // 初始化模板信息
    initTemplate = () => {
        let {json,needRequired} = this.state
        Toast.loading(json["hrzzmb-000001"],0)
        ajax({
            url: url.mergeRequest,
            noNeedShowError: false,
            data: [{
                rqUrl: '/platform/templet/querypage.do',
                rqJson: `{\n  \"pagecode\": \"60657030p\",\n  \"appcode\": \"60657030\"\n}`,
                rqCode: 'template'
            }],
            success: (result) => {
                let data = result.data.template
                Toast.hide()
                data.overtime_card.items.forEach((item)=>{
                    if(item.required){
                        needRequired[item.attrcode] = item.label
                    }
                    if(item.attrcode === "otapplylength"){
                        item.itemtype = "input"
                    }
                })
                this.handleMeta(data.overtime_card)

                let getMeta = CreateMeta(data, {
                    onAfterHandle: this.onAfterHandle
                })
                const {routerData} = this.state
                const that = this
                this.setState({
                    templateData:data,
                    store: getMeta
                },()=>{
                    if(JSON.stringify(routerData) &&routerData.id){
                        that.state.store.setFormEditStatus(true,"edit")
                    } else {
                        that.state.store.setFormEditStatus(true,"add")
                    }
                })

            },
            error: (err) =>{
                Toast.hide()
                errHandle(err,json)
            }
        })
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

        let model = store.getFormData('overtime_card')
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
        let model = this.state.data
        if(val.key === "isallnight"){
            this.setFormData("isallnight",val)
        }
        if (val.key === 'remark' && val.value.length>=200) {
            Toast.info("加班理由限制不能超过200个字",1)
        }
    }
    //获取时长
    // getTimeLength = (vals,model) => {
    // if(date.key === "overtimeendtime"){
    //     let begintime = timeFormate(model.rows[0].values.overtimebegintime.value)
    //     let endtime = timeFormate(date.value)
    //     console.log(begintime,endtime)
    //     let timelength = (new Date(endtime).getTime()  - new Date(begintime).getTime())/(60*60*1000)
    //     return timelength.toFixed(2)
    // } else {
    //     let endtime = timeFormate(model.rows[0].values.overtimeendtime.value)
    //     let begintime = timeFormate(date.value)
    //     console.log(begintime,endtime)
    //     let timelength = (new Date(endtime).getTime()  - new Date(begintime).getTime())/(60*60*1000)
    //     return timelength.toFixed(2)
    // }
    // this.edidtAfterHandle(vals,model)


    // }
    // 自定义组件
    handleMeta = ({items}) => {
        let {json} = this.state
        if (!items || !items.length) return
        items.forEach(item => {
            switch (item.attrcode) {
                case 'overtimeendtime':
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
                case 'overtimebegintime':
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
            }

        })
    }
    // 初始化表单默认数据
    initFormdata = () => {
        let {json} = this.state
        ajax({
            url: url.defaultAction,
            noNeedShowError: false,
            data: {
                operat: 0
            },
            success: (result) => {
                Toast.hide()
                result.data.overtime_card.rows[0].values.isallnight.value = "N"
                this.setState({
                    data:result.data.overtime_card
                })
                // this.state.store.setFormEditStatus(true,"add")
            },
            error: (err) =>{
                Toast.hide()
                errHandle(err,json)
            }
        })
    }
    // 获取单据信息
    queryById(id){
        let {json} = this.state
        Toast.loading(json["hrzzmb-000001"],0)
        ajax({
            url: url.queryById,
            noNeedShowError: false,
            data: {
                pk_overtime:id
            },
            success: (result) => {
                Toast.hide()
                let data = result.data.overtime.overtime_card
                let  val = data.rows[0].values.otapplylength.value
                data.rows[0].values.otapplylength = {
                    display:val?val+json["hrzzmb-000154"]:"",
                    value:val
                }
                this.setState({
                    data:data
                },()=>{
                    this.initTemplate()
                })
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
            if(curAttrcode === "overtimebegintime"){
                let vals = {
                    key: "overtimeendtime",
                    type: "string",
                    display:"",
                    value: ""
                }
                let model = this.contactData(vals)
                this.setFormData("overtimeendtime", vals)
                this.state.store.setFieldProps("isallnight", "overtime_card", {visible: false})
                this.setFormData("otapplylength",{
                    display:"",
                    value:""
                })
            } else {
                let vals = {
                    key: "overtimebegintime",
                    type: "string",
                    display:"",
                    value: ""
                }
                let model = this.contactData(vals)
                this.setFormData("overtimebegintime", vals)
                this.state.store.setFieldProps("isallnight", "overtime_card", {visible: false})
                this.setFormData("otapplylength",{
                    display:"",
                    value:""
                })
            }
        }
    }
    // 通宵显示
    isAllnight = (beginValue,endValue)=> {
        console.log(beginValue,endValue)
        let begin = new Date(timeFormate(beginValue))
        let end = new Date(timeFormate(endValue))
        let beginData = {
            month:begin.getMonth(),
            day: begin.getDate()
        }
        let endData = {
            month:end.getMonth(),
            day: end.getDate()
        }
        if(beginData.month === endData.month && endData.day - beginData.day >= 1){
            this.state.store.setFieldProps("isallnight", "overtime_card", {visible: true})
        } else {
            this.state.store.setFieldProps("isallnight", "overtime_card", {visible: false})
        }

    }
    //时间校验
    timeCheck = (date) => {
        let { data,curAttrcode } = this.state
        let value = data.rows[0].values
        if (curAttrcode === "overtimebegintime" && value.overtimeendtime.value) {
            if (new Date(timeFormate(date.value)).getTime()<new Date(timeFormate(value.overtimeendtime.value)).getTime()) {
                this.isAllnight(date.value,value.overtimeendtime.value)
            } else {
                this.timeClear(false)
            }
        }

        if (curAttrcode === "overtimeendtime" && value.overtimebegintime.value) {
            if(new Date(timeFormate(date.value)).getTime()>new Date(timeFormate(value.overtimebegintime.value)).getTime()){
                this.isAllnight(value.overtimebegintime.value,date.value)
            } else {
                this.timeClear(false)
            }
        }
    }
    //设置data默认值
    setFormData = (key, {display = null, value = null}) => {
        // let vals = {
        //     key: key,
        //     display:display,
        //     value: value
        // }
        const {data} = this.state
        let form = this.state.store.getFormData("overtime_card")
        console.log(form)
        data.rows[0].values.remark = form.rows[0].values.remark
        data.rows[0].values[key] = {display,value}
        // let formData =  this.contactData(vals)
        data.rows[0].values[key] = {display, value}
        this.setState({
            data:data
        })
    }
    //保存数据
    saveBill = () => {
        const {enableSubmit,store,json, durationObject} = this.state
        if(!this.checkData()){
            this.warnToast()
            // 数据参数不全
            return
        }
        let data = store.getFormData('overtime_card')
        let isallnight = data.rows[0].values.isallnight.value
        if(isallnight){
            isallnight === "N"? data.rows[0].values.isallnight.value = false:data.rows[0].values.isallnight.value = true
        }
        let formData = {
            model: data
        }
        Toast.loading(json["hrzzmb-000001"],0)
        ajax({
            url: url.saveAction,
            noNeedShowError: false,
            data: {
                durationObject,
                formData
            },
            success: (result) => {
                Toast.hide()
                if(this.state.status){
                    this.commitForm()
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
    //提交数据
    commitBill = () => {
        this.setState({
            status:true
        })
        this.saveBill()
    }
    commitForm = (val) =>{
        const {store,json,content} = this.state
        let data = store.getFormData('overtime_card')
        let id = data.rows[0].values.pk_overtime.value
        Toast.loading(json["hrzzmb-000001"],0)
        let param = {
            pk:id
        }
        if(val&&val.person){
            content.content[0].uservos = [...val.person]
            param.content = content
        }
        ajax({
            url: url.commitAction,
            noNeedShowError: false,
            data:param,
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
    //参数校验
    checkData = () =>{
        const {data,needRequired,store} = this.state
        if(!data){
            return
        }
        let overtimeData = store.getFormData('overtime_card').rows[0].values
        let condition =  Object.keys(overtimeData).every((item)=>{
            if(needRequired[item]){
                return !!overtimeData[item].value
            } else {
                return true
            }
        })
        return condition

    }
    warnToast = () => {
        const {data,json,needRequired,store} = this.state
        let overtimeData = store.getFormData('overtime_card').rows[0].values
        if (!overtimeData.overtimebegintime.value) {
            Toast.info(json["hrzzmb-000152"],1)
            return
        }
        if (!overtimeData.overtimeendtime.value) {
            Toast.info(json["hrzzmb-000153"],1)
            return
        }
        for (const key in needRequired) {
            if(!overtimeData[key].value&&key!=='overtimebegintime'&&key!=='overtimeendtime'){
                Toast.info(needRequired[key]+'不能为空',1)
                break
            }
        }

    }
    getLanguage = (routerData) => {
        getMultiLang({
            domainName: "hrzz",
            moduleId: "hrzzmb",
            other:true,
            callback: (json, status, init) => {
                this.setState({
                    json: json,
                    header:{
                        name:json["hrzzmb-000150"],
                        rText:json["hrzzmb-000151"]
                    }
                },()=>{
                    const {header} = this.state
                    editNav(header,this.leftClick,this.rightClick)
                    if(routerData&&routerData.id) {
                        this.setState({
                            routerData:routerData
                        },()=>{
                            this.queryById(routerData.id)
                        })
                    } else {
                        this.initFormdata()
                        this.initTemplate()
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
            window.location.hash ='?&c=60657030&p=60657030'
            routerData =  this.props.location.query
        } else {
            routerData = urlData
        }
        this.getLanguage(routerData)
        let showNav = getSession("showNav")
        if(!showNav){
            setSession("showNav",1)
        }
    }

    //回调
    onConfirm = (date)=>{
        this.onClose()
        let { curAttrcode,data,json } = this.state
        this.timeCheck(date)
        let form = this.state.store.getFormData("overtime_card")
        let vals = {
            key: curAttrcode,
            type: "string",
            display:date.display,
            value: date.value
        }
        let model = this.contactData(vals)
        this.setFormData(curAttrcode, date)
        let datas = data.rows[0].values
        //    let timelength = 0
        if(datas.overtimebegintime.value&&datas.overtimeendtime.value){
            //    let model = this.state.store.getFormData("overtime_card")
            let vals = {
                key: curAttrcode,
                value: data.rows[0].values[curAttrcode].value
            }
            this.edidtAfterHandle(vals,model)
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
    onOk = (val) =>{
        let {choiceData} = this.state
        choiceData.show = false
        choiceData.person = [...val]
        this.setState({
            choiceData
        },()=>{
            this.commitForm(choiceData)
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
        let {store, data,enableSubmit,visible,json,choiceData} = this.state
        let id = data&&data.rows[0].values.pk_overtime?data.rows[0].values.pk_overtime.value:""
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
        return (
            <div className="overtime">
                <DHeader title={this.state.header.name} leftClick={this.leftClick} type={"wide"} rText={this.state.header.rText} rightClick={this.rightClick} />
                <PopChoice showModel={choiceData.show} chData={choiceData.data} onOk={this.onOk} onCancel={this.onCancel}/>
                <Container
                    hideHeader={true}
                    store={store}
                    cardName="overtime_card"
                    data={data}
                    onAfterHandle={this.onAfterHandle}
                />
                <TimePicker defaultTime = {new Date()} json={json} timeFormat = {"dateTime"} onCancel={this.onClose} onConfirm ={this.onConfirm} visible={visible} min={min}/>
                <div className={`footer ${!enableSubmit?"":"active"}`}
                >
                    <div onClick={this.saveBill}>{json["hrzzmb-000117"]}</div>
                    <div onClick={this.commitBill}>{json["hrzzmb-000023"]}</div>
                </div>
            </div>
        )
    }
}

export default Index;