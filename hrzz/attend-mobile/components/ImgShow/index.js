import React, { Component } from 'react';
import ajax from '../../../public/mobile/utils/ajax'
import './index.less'
import {Toast, Modal} from "antd-mobile";
const url = {
    queryImg:"/nccloud/platform/attachment/query.do"
}
class ImgSshow extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            callData:[]
        }
    }
    //图片查询
    queryImg = (id) =>{
        ajax({
            url: url.queryImg,
            noNeedShowError: false,
            data: {
                "uploadTrpe":"0",
                "billId":id,
                "fullPath":id,
            },
            success: (result) => {
                console.log(result)
                if(result.success){
                    this.setState({
                        callData:result.data
                    })
                }
            },
            error: (err) =>{
                Toast.info(err,2)
            }
        })
       
    } 
    componentDidMount() {
        const {billId} = this.props
        this.queryImg(billId)
    }
    
    render() {
        const {callData} = this.state
        const {json={}} = this.props
        return (
            <div className="imgShow">
               {callData.length>0? <h4 className="title">{json["hrzzmb-000022"]}</h4>:""}
               {callData.length>0?<div className="imgbox">
               {callData.map((item)=>{
                    return (
                        <div className="img">
                            <img src={item.previewUrl}/>
                         </div>
                    )
                })}
               </div>:""}
            </div>
        );
    }
}

export default ImgSshow;
