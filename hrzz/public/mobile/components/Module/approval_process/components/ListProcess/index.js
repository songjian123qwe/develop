import './index.less'
import React, {Component} from 'react';
import {Avoid} from '../../../../../components/index.js'
import {formatTime} from '../../../../../utils/index.js'

class ListProcess extends Component{
    constructor (props) {
        super(props);
        this.state = {
            index:props.index // 排序
        }
    }
    newreviseStyle(approveobj) {

        // 控制左侧线的状态
        let lineState = approveobj.length === approveobj.index+1 ? true : false
        // 控制左侧圆点的样式        
        let iconState = Number(approveobj.approvestatus) === 0 ? '' : 'red'
        // 当前审批条目颜色
        let applyColor = Number(approveobj.approvestatus) === 0 ? 'green' : 'gray'
        // 审批时间
        let endTime = approveobj.endTime || ''
        // let endTime = !!approveobj.endTime ? formatTime(new Date(approveobj.endTime),'yyyy-MM-dd hh:mm') : ''
        // 是否显示审批时间
        let isShowTime = true
        // 审批人名称
        let assigneeName = approveobj.assigneeName
        // 审批状态
        // let taskSourceName = approveobj.taskSource ? '审批中' : '通过'
        let taskSourceName = approveobj.approvestatusName
        // 加签
        let add = approveobj.task4Singer ? '加签' : ''
        // 代办
        let agency = approveobj.task4Agent ? '代办' : ''
        // 改派
        let forward = approveobj.task4Reassignment ? '改派' : ''
        // 审批意见
        let examineText = approveobj.examineText
        // 是否显示审批意见
        let isShowExamine = examineText ? true : false
        // 头像信息
        let photo = approveobj.assignPic || ''
        // 抄送人信息
        let copyMessages=approveobj.copyMessages || '' 
        // 抄送人是否显示
        let opinionIsShow=approveobj.opinionIsShow || ''
        // 是否是审批模块
        let isApprove=!!approveobj.formKey?((approveobj.formKey.split("_").pop() == 'approve' ) ? true : false):false
        // 是否是申请模块
        let isApply=!!approveobj.formKey?((approveobj.formKey.split("_").pop() == 'apply' ) ? true : false):false
        
        return {
            lineState,
            iconState, 
            applyColor,
            endTime,
            isShowTime,
            assigneeName,
            taskSourceName,
            add,
            agency,
            forward,
            examineText,
            isShowExamine,
            photo,
            copyMessages
        };
    }
    
    render () {
        let showObj = this.newreviseStyle(this.props.params)
        return (
            <div class="approve-list" > 
            {/* 条目前的圆点 */}
            <div class={showObj.lineState ? 'list-icon firstline' : 'list-icon'}>
                <span class={`icon-bg ${showObj.iconState}`}>
                    <i class={`icon hrfont ${showObj.applyColor}`}></i>
                </span>
            </div>
            {/* // 右侧部分 */}
            <div class="process-detail">
                {/* 头像信息 */}
                <div class="person-photo">
                    <Avoid
                        name={showObj.assigneeName}
                        src={showObj.photo}
                        level="level3"
                    ></Avoid>
                </div>
                {/* 流程信息 */}
                <div class="process-main">
                    <div class="list_top">
                        <span class="process-name">{showObj.assigneeName}</span>
                        <span class="right" >{showObj.isShowTime ? showObj.endTime : ''}</span>
                    </div>
                    <div class="list_text">
                        <span class={`process-status ${showObj.applyColor}`}>{showObj.taskSourceName}</span> 
                        <span class="process-status blue" >{showObj.add}</span>
                        <span class="process-status blue" >{showObj.agency}</span>
                        <span class="process-status orange" >{showObj.forward}</span>
                    </div>
                    <p class={`list_examine ${showObj.isShowExamine ? '':'none'}`}>
                    {/* <p class={`list_examine ${showObj.isShowExamine ? 'show-more':''}`} > */}
                        <span class="message-title">{'审批意见'}：</span>
                        <span class="message-list" ref="list_examine">{showObj.examineText}</span>
                        {/* <DMore 
                            v-show="moreBool" 
                            class="more-btn" 
                            @moreFun="toggleMore"
                            :showName="lang.showMore"
                            :hideName="lang.hideMore"
                            fontSize=".24rem"
                            ></DMore> */}
                    </p>
                    {/* <p v-if="flowData.copyMessages.length>0" class="copy-message">
                        <span class="message-title">{{lang.CCList}}：</span>
                        <span class="message-list" v-for="(k,m) in flowData.copyMessages" key='m' ><span >{{k.copyUserName}}{{flowData.copyMessages.length==(1+m)?'':'、'}}</span></span>
                    </p> */}
    
                </div>
    
            </div>
            
        </div>
        )
    }
}

export default ListProcess