/**
 *
 * Created by wanfhmr on 2019-06-20
 */
import React, {Component} from "react";
import ajax from "../../../public/mobile/utils/ajax"
import {hrAjax} from "../../../public/mobile/utils/snRequestMeta"
import "./index.less";
import {Toast, Modal} from "antd-mobile";

const fileType = ["jpg", "jpeg", "png", "gif", "bmp", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "pps", "ppsx", "pdf"];
const url = {
    upload:"/nccloud/platform/attachment/upload.do",
    deleteImg:"/nccloud/platform/attachment/delete.do",
    queryImg:"/nccloud/platform/attachment/query.do"
}
let work = require('../../images/word.png')
let xls = require('../../images/excel.png')
let ppt = require('../../images/ppt.png')
let pdf = require('../../images/pdf.png')

const imgData = {
    doc:work,
    docx:work,
    xls:xls,
    xlsx:xls,
    ppt:ppt,
    pptx:ppt,
    pdf:pdf,
    pps:pdf,
    ppsx:pdf
}
class ImgUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            callData:[],  //返回数据
        };
    }
    //formData数据拼接处理
    formData = (files) =>{
        console.log(files)
        let from =  new FormData()
        const {billId} = this.props
        from.append("billId",billId)
        from.append("fullPath",billId)
        from.append("pk_billtypecode","")
        from.append("billcode","")
        from.append("uploadTrpe",0)
        from.append("file",files)
        this.uploadData(from).then((res)=>{
            console.log("uploadAjaxResult = ",res)
          if(res.success&&res.data){
            let  {callData} = this.state
            let {callback} = this.props
            let  imgurl = res.data[0]
            let origin = location.origin
            if (imgurl.previewUrl) {
                let index = imgurl.previewUrl.indexOf('/fs')
                let newd =  imgurl.previewUrl.replace(`${imgurl.previewUrl.slice(0,index)}`,origin)
                imgurl.previewUrl = newd
            } else {
                let types = files.name.match(/\.(.*)/)[1]
                imgurl.previewUrl = imgData[types]
            }

            callData.push(imgurl)
            callback(callData.length)
            this.setState({
                callData
            })
          }else{
              let val = res.message||res.data.error.message||'失败'
              Modal.alert('',val)
          }
        }).catch(function (error) {
            console.log(error);
            let val = error.message||error.data.error.message
            Modal.alert('',val)
          })
      }
    // 上传方法
    uploadData = (from) =>{
        let data = {
            url: url.upload,
            headers: {"Content-Type": "multipart/form-data"},
            body:from
        };
        let formData = hrAjax(data)
        return  formData
    }
    //删除图片
    deleteImg = (index) => {
        let delIndex = index;
        let {callData} = this.state;
        let {callback} = this.props
        let value = callData[index]
        let data = {
            "uploadTrpe":"0",
            "billId":value.billId,
            "fullPath":value.fullPath,
            "pk_doc":value.pk_doc,
            "pk_billtypecode":"",
            "billcode":""
        }
        ajax({
            url: url.deleteImg,
            noNeedShowError: false,
            data: data,
            success: (result) => {
                console.log(result)
              if(result.success){
                callData.splice(delIndex, 1);
                callback(callData.length)
                this.setState({
                    callData
                })
              }
            },
            error: (err) =>{
                Toast.info(err,2)
            }
        })


    };
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
    // 上传触发事件
    fileUpload = (e) => {
        const {maxNum} = this.props
        let files = Array.from(e.target.files);
        let flag = true;
        files = files.filter(file => {
            let nameArr = file.name.split(".");
            let length = nameArr.length;
            if (length < 1) {
                flag = false;
                return false
            }
            if (fileType.includes(nameArr[length - 1])) {
                return true
            }
            flag = false;
            return false;
        });
        if (!flag) {
            Toast.info("不支持此类文件上传")
        }
        let filesLength = files.length;
        let fileArrLength = this.state.callData.length;
        if (filesLength + fileArrLength >maxNum ) {
            Modal.alert("最多可上传4个文件");// 最多可上传4个文件
            return;
        }
        files.map((file, index) => {
            this.formData(file)
        })

    };

    componentWillReceiveProps(nextProps) {
        const {isRequest,billId} = this.props
        if(nextProps.isRequest&&nextProps.billId){
            this.queryImg(nextProps.billId)
        }
    }

    componentDidMount() {

    }

    render() {
        let {callData} = this.state
        const {json={}} = this.props
        const  {maxNum = 4,isRequest=false,billId="",isrequire=false,callback = ()=>{}} = this.props
          // 图片尺寸转化
          const imgSize =(file)=>{
              console.log(file)
            let fileSize = file.fileSize * 100 / 1024;
            fileSize = parseInt(fileSize);
            fileSize = fileSize / 100;
            if (fileSize > 1024) {
                fileSize = fileSize * 100 / 1024;
                fileSize = parseInt(fileSize);
                fileSize = fileSize / 100 + "M";
            } else {
                fileSize += "KB";
            }
            return  fileSize
        }
        return (
            <div className="file-component">
                <div className={"file-top"}>
                    {/*附件*/}
                    <div className="file-title"><span className="title">{json["hrzzmb-000022"]}</span>{isrequire?<span className="active">*</span>:""}<span>({callData.length}/{maxNum})</span>
                    </div>
                    {callData.length < maxNum ? <div className="file-icon">
                        <span className="icon hrfont">&#xe692;</span>
                        <form
                            className="form-dom"
                            encType="multipart/form-data"
                            method="post"
                            name="fileinfo"
                        >
                            <input type="file" name="webfiles"  multiple={"multiple"}
                                   onChange={this.fileUpload} ref={node => {
                                this.inputFile = node
                            }}/>
                        </form>
                    </div> : <div></div>}
                </div>
                {callData.map((item,index) => {
                    return <div className="file-item">
                        <div className="file-img">
                            <img src={item.previewUrl} alt=""/>
                        </div>
                        <div className="file-desc">
                            <div className="file-name">{item.name}</div>
                            <div className="file-size">{imgSize(item)}</div>
                        </div>
                        <div className="file-del" onClick={() => {
                            this.deleteImg(index)
                        }
                        }>
                            <span className="icon hrfont">&#xe808;</span>
                        </div>
                    </div>
                })}
            </div>
        );
    }
}

export default ImgUpload;
