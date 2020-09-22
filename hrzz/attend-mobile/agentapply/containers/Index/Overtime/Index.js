import React, { Component } from 'react';
import ajax from '../../../../../public/mobile/utils/ajax';
import {   List,  Toast } from 'antd-mobile';
import { Container, CreateMeta } from 'src/hrzz/public/hr-mobile-card/index';
import 'antd-mobile/dist/antd-mobile.css'
import './index.less'
import {timeFormate,errHandle} from '../../../../utils/index'
import TimePicker from '../../../../components/TimePicker/TimePicker'
import PopChoice from '../../../../components/PopChoice/PopChoice'
import {debounce} from "../../../../../public/mobile/utils/utils";

const url = {
    defaultAction:'/nccloud/hrkq/insteadapply/OvertimeAddDefaultAction.do',
    mergeRequest:'/nccloud/platform/pub/mergerequest.do',
    queryById:'/nccloud/hrkq/insteadapply/QueryByIdAction.do',
    saveAction: "/nccloud/hrkq/overtime/SaveAction.do",
    commitAction: "/nccloud/hrkq/overtime/CommitAction.do"
}

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
            choiceData:{
                data:[],
                show:false,
                person:null
              },
            content:null

        }
    }
    // 日期跳转
    dateClick = () => {
        const {store} = this.state
        let {rightClick} = this.props
        let data = store.getFormData('overtimeinstead_card')
        let time = timeFormate(data.rows[0].values.overtimebegintime.value)
        rightClick(time)
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
                Toast.hide()
                data.overtimeinstead_card.items.forEach((item)=>{
                    if(item.attrcode === "otapplylength"){
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

                this.handleMeta(data.overtimeinstead_card)

                let getMeta = CreateMeta(data, {
                    onAfterHandle: this.onAfterHandle
                })
                this.setState({
                    templateData:data,
                    store: getMeta
                })
                const {routerData} = this.state
                if(JSON.stringify(routerData) &&routerData.id){
                    this.state.store.setFormEditStatus(true,"edit")
                } else {
                    this.state.store.setFormEditStatus(true,"add")
                }
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

        let model = store.getFormData('overtimeinstead_card')
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
        if(val.key === "pk_psndoc"){
            this.setFormData("",{})
        }
    }
    //获取时长
    getTimeLength = (date,model) => {
        if(date.key === "overtimeendtime"){
            let begintime = timeFormate(model.rows[0].values.overtimebegintime.value)
            let endtime = timeFormate(date.value)
            console.log(begintime,endtime)
            let timelength = (new Date(endtime).getTime()  - new Date(begintime).getTime())/(60*60*1000)
            return timelength.toFixed(2)
        } else {
            let endtime = timeFormate(model.rows[0].values.overtimeendtime.value)
            let begintime = timeFormate(date.value)
            console.log(begintime,endtime)
            let timelength = (new Date(endtime).getTime()  - new Date(begintime).getTime())/(60*60*1000)
            return timelength.toFixed(2)
        }


    }
    // 自定义组件
    handleMeta = ({items}) => {
        const {json} = this.props
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
        ajax({
            url: url.defaultAction,
            noNeedShowError: false,
            data: {
                operat: 0
            },
            success: (result) => {
                Toast.hide()
                result.data.overtimeinstead_card.rows[0].values.isallnight.value = "N"
                this.setState({
                    data:result.data.overtimeinstead_card
                })
                this.state.store.setFormEditStatus(true,"add")
            },
            error: (err) =>{
                Toast.hide()
                errHandle(err,json)
            }
        })
    }
    // 获取单据信息
    queryById(id){
        const {json} = this.props
        Toast.loading(json["hrzzmb-000001"],0)
        ajax({
            url: url.queryById,
            noNeedShowError: false,
            data: {
                billtype:"6QJB",
                pk:id
            },
            success: (result) => {
                Toast.hide()
                let data = result.data.overtime.overtimeinstead_card
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
                this.state.store.setFieldProps('isallnight', 'overtimeinstead_card', {visible: false})
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
                this.state.store.setFieldProps('isallnight', 'overtimeinstead_card', {visible: false})
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
            this.state.store.setFieldProps('isallnight', 'overtimeinstead_card', {visible: true})
        } else {
            this.state.store.setFieldProps('isallnight', 'overtimeinstead_card', {visible: false})
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
        const {data} = this.state
        let form = this.state.store.getFormData("overtimeinstead_card")
        data.rows[0].values.remark = form.rows[0].values.remark
        data.rows[0].values.pk_psndoc = form.rows[0].values.pk_psndoc
        if(key){
            data.rows[0].values[key] = {display,value}
        }
        this.setState({
            data:data
        })
    }
    //保存数据
    saveBill = () => {
        if (!debounce()) return;
        const {store} = this.state
        const {json} = this.props
        if(!this.checkData()){
            this.warnToast()
            // 数据参数不全
            return
        }
        let data = store.getFormData('overtimeinstead_card')
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
        const {store,enableSubmit,content} = this.state
        const {json} = this.props
        let data = store.getFormData('overtimeinstead_card')
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
        const {data} = this.state
        if(!data){
            return
        }
        let overtimeData = data.rows[0].values
        console.log(overtimeData)
        let condition =  Object.keys(overtimeData).every((item)=>{
            if(item==="otapplylength"||item==="overtimeendtime"||item==="overtimebegintime"){
                return !!overtimeData[item].value
            } else {
                return true
            }
        })
       return condition

    }
    warnToast = () => {
        const {data} = this.state
        const {json} = this.props
        let overtimeData = data.rows[0].values
        console.log(overtimeData.overtimebegintime.value)
        if (!overtimeData.overtimebegintime.value) {
            Toast.info(json["hrzzmb-000152"],1)
            return
        }
        if (!overtimeData.overtimeendtime.value) {
            Toast.info(json["hrzzmb-000153"],1)
            return
        }
    }
    // 初始化数据
    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        let routerData =nextProps.routerData
        if(routerData&&routerData.id) {
            this.setState({
                routerData:routerData
            },()=>{
                this.queryById(routerData.id)
            })
        }
    }

    componentWillMount() {
            const {routerData} = this.props
            console.log("routerData",routerData)
           if(!routerData){
            this.initFormdata()
            this.initTemplate()
           }


    }


    //回调
    onConfirm = (date)=>{
        const {json } = this.props
       this.onClose()
       let { curAttrcode,data } = this.state
       this.timeCheck(date)
       let form = this.state.store.getFormData("overtimeinstead_card")
       let vals = {
           key: curAttrcode,
           type: "string",
           display:date.display,
           value: date.value
       }
       this.setFormData(curAttrcode, date)
       let datas = data.rows[0].values
       let timelength = 0
       if(datas.overtimebegintime.value&&datas.overtimeendtime.value){
           timelength = this.getTimeLength(vals,data)
           console.log(timelength)
           this.setFormData("otapplylength",{
               display:timelength+json["hrzzmb-000154"],
               value:timelength
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
        let {store, data,enableSubmit,visible,choiceData} = this.state
        let id = data&&data.rows[0].values.pk_overtime?data.rows[0].values.pk_overtime.value:""
        const {json} = this.props
        return (
            <div className="overtime">
                <Container
                    hideHeader={true}
                    store={store}
                    cardName="overtimeinstead_card"
                    data={data}
                    onAfterHandle={this.onAfterHandle}
                />
                <PopChoice showModel={choiceData.show} chData={choiceData.data} onOk={this.onOk} onCancel={this.onCancel}/>
                <TimePicker json={json} defaultTime = {new Date()} timeFormat = {"dateTime"} onCancel={this.onClose} onConfirm ={this.onConfirm} visible={visible}/>
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
