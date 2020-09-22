import React, { Component } from 'react';
import './sign.less' 
import NativeObj from '../../../../../../public/mobile/utils/jsbridge/index'
import { formatTime}from '../../../../../../public/mobile/utils/index'
import { setStorage } from '../../../../../../public/mobile/utils/storage'
class sign extends Component {
    constructor(){
        super()
    }
    appsign = (item) =>{
        console.log(item)
            let {json,linkSign=()=>{}} = this.props
           let that = this
            if (item.approveStatus == 2 || item.approveStatus == 3) {
                let submitQuery = {
                    businessKey: item.businessKey,
                    processInstanceId: item.processInstanceId,
                    categoryID: '032000000402',
                    formKey: 'attence_apply',
                    billName: json["hrzzmb-000327"],
                    typecode: 'bill',
                    isReturnNative: false,
                    time:item.markTimeT
                }
                linkSign(submitQuery)
            }else {
               let timeformat = new Date()
                    let  point = {
                        signTime:'',
                        markTimeT:parseInt(item.markTimeT),
                        order:item.order,
                        originalSignState:3,
                        signState: 3,
                        expire:0,
                        // TODO: 取补考勤时间所在的天(兼容跨天)
                        originalFillDate: formatTime(new Date(parseInt(item.markTimeT)),"yyyy-MM-dd")
                    }
                    setStorage('userinfo',{isSeniorVerios:true})
                    setStorage('attend_signRecord',point)
                    let url = `${location.origin}/ncchr/wap/index.html#/attend/attendfill?platform=ykj&pageType=fill&isExpire=0&index=0&hideNav=1`
                    NativeObj.openWindow(url);
            }
    }
    stylestauts = (status) =>{
        if (status == 2) {
           return {color:'#57d9a3',border:"#57d9a3 1px solid",background:"#fff"}
       }else
        if (status == 3) {
           return {color:'#57d9a3',border:"#57d9a3 1px solid",background:"#fff"}
       }else {
           return {color:'#fff',background:"#e14c46",border:"#e14c46 1px solid"}
       }
       
   }
    statusshow = (status) => {
        let {json} = this.props
        if (status == 2) {
            return json["hrzzmb-000326"]
        }else
         if (status == 3) {
            return json["hrzzmb-000326"]
        }else{
            return json["hrzzmb-000327"]
        }
    }
    render() {
        const  {attendArray,json} = this.props
        return (
            <div className="signrecord" >
                <div className="btbody">
                    <div className="bttime">
                        <div className="starttime">
                        {attendArray[0].signTime?<span >{formatTime(new Date(parseInt(attendArray[0].signTime)),'hh:mm')}</span>: <span className="signque" >{json["hrzzmb-000328"]}</span>}
                         {attendArray[0].approveStatus && !(attendArray[0].approveStatus == 4 ) || attendArray[0].signTime&&parseInt(attendArray[0].markTimeT)<parseInt(attendArray[0].signTime) ? <button style={this.stylestauts(attendArray[0].approveStatus)}   onClick={this.appsign.bind(this,attendArray[0])}> {this.statusshow(attendArray[0].approveStatus)}</button>:''}   
                        </div>
                        <div className="endtime">
                        {  attendArray[1].signTime?<span >{formatTime(new Date(parseInt(attendArray[1].signTime)),'hh:mm')}</span>:<span className="signque">{json["hrzzmb-000328"]}</span>}
                        {attendArray[1].approveStatus && !(attendArray[1].approveStatus == 4 ) || attendArray[1].signTime&&parseInt(attendArray[1].markTimeT)>parseInt(attendArray[1].signTime) ? <button style={this.stylestauts(attendArray[1].approveStatus)}   onClick={this.appsign.bind(this,attendArray[1])}> {this.statusshow(attendArray[1].approveStatus)}</button>:''}   
                        </div>
                    </div>
                </div>
        </div>
        );
    }
}
export default sign;