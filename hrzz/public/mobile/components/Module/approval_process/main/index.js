import './index.less'
import React, {Component} from 'react';
import ListProcess from '../components/ListProcess'

/**
 * 审批流程历史
 * @param processData [arr] 流程数据
 * @function formatData 给ncc提供的数据格式静态方法
 * processData说明
 * {
    endTime:eValue.dealdate.value || '', // 处理时间
    examineText:(eValue.checknote.value + eValue.approveresult.value) || '', // 批语+审批意见
    approvestatus:eValue.approvestatus_value.value || 0, // 审批状态编码 0进行中 1已完成
    approvestatusName:eValue.approvestatus.value || '', // 审批状态文案
    assigneeName:eValue.dealman.value || '', // 审批人
 * }
 * 
 * eg: <ApprovalProcess processData={processData}/>
 * 
 */
class ApprovalProcess extends Component{
    constructor (props) {
        super(props);
        this.state = {
        }
    }
    static formatData(arr, initiator = true){
        // 手动设置 发起人数据
        if(initiator) {
            let first = arr[0] || {}
            let apply = {
                dealdate:first.values.senddate || {}, // 处理时间
                checknote:{}, // 批语
                approveresult:{}, // 审批意见
                approvestatus_value:first.values.status || {}, // 审批状态编码 0进行中 1已完成
                approvestatus: {value: '发起申请'} , // 审批状态文案
                dealman:first.values.sendman || {}, // 审批人
            }
            arr.unshift({values:apply})
        }
        return arr.map((e) => {
            let eValue = e.values || {}
            return  {
                   endTime:eValue.dealdate.value || '', // 处理时间
                   examineText:(eValue.checknote.value?eValue.checknote.value:"" + eValue.approveresult.value?eValue.approveresult.value:"") || '', // 批语+审批意见
                   approvestatus:eValue.approvestatus_value.value || 0, // 审批状态编码 0进行中 1已完成
                   approvestatusName:eValue.approvestatus.value || '', // 审批状态文案
                   assigneeName:eValue.dealman.value || '', // 审批人
                }
        })
    }
    render () {
        let processData = this.props.processData
        let contentDom = processData.reverse().map((item,index) => {
            item.index=index
            item.length=processData.length
            return (
                <ListProcess params={item} />
            )
        })
        return (
            <div class="main_approval_process" > 
                {
                    contentDom
                }
            </div>
        )
    }
}
export default ApprovalProcess 