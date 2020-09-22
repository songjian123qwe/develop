import React, { Component } from "react";
import Toast from "antd-mobile/lib/toast";
import 'antd-mobile/lib/toast/style/css'
import './index.less';
import docImage from 'src/hrzz/public/mobile/static/images/word@2x.png';
// const fileTypeWanted = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pps', 'ppsx', 'pdf'];
const fileTypeWanted = ['doc', 'docx'];
class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            json: {},
            fileval: '',
            fileArr: props.fileArr || [],
            fileName: [],
            fileSize: 0,
            fileUrl: '',
            fileType: ''
        }
    }
    fileUpload = (e) => {
        //这里的files是一个数组，包含选中的几个文件
        //每一个文件中包含 name,type,size
        let files = Array.from(e.target.files);
        let flag = true;
        files = files.filter(file => {
            // nameArr数组里面 是单个文件的名字和类型
            let nameArr = file.name.split('.');
            let length = nameArr.length;
            // 即名字和类型必须都要有
            if (length < 1) {
                flag = false;
                return false
            }
            // 判断类型
            if (fileTypeWanted.includes(nameArr[length - 1])) {
                return true
            }
            flag = false;
            return false;
        });
        if (files) {

        }
        if (!flag) {
            Toast.info(this.props.json['hrzzmb-000260'] || '')
        }
        files.map((file, index) => {
            this.loadFile(file);
        })
    }
    loadFile = (file) => {
        let fileArr = this.state.fileArr;
        if (window.FileReader) {
            // FileReader 对象允许Web应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容
            let fr = new FileReader();
            // 处理loadend事件。该事件在读取操作结束时（要么成功，要么失败）触发。
            fr.onloadend = (e) => {
                let fileSize = this.getSize(file.size);
                let fileName = file.name;
                let fileType = file.type;
                let fileUrl = e.target.result;
                if (this.state.fileArr.length > 0) {
                    for (let i = 0; i < this.state.fileArr.length; i++) {
                        if (this.state.fileArr[i].fileUrl === fileUrl) {
                            return;
                        }
                    }
                }
                //文件对象 包含本次上传的所有的文件信息
                let fileObj = {
                    fileId: (new Date()).getTime(),
                    fileName,
                    fileSize,
                    fileUrl,
                    fileType,
                    file
                };
                //所有的文件信息
                fileArr.push(fileObj);
                this.setFileArr(fileArr);
                this.props.toMainPage(fileArr);
            };
            fr.readAsDataURL(file);
        }
    }
    getSize = (size) => {
        const num = 1024.00;
        let filesize;
        if (!size) {
            return '';
        } else if (size < num) {
            return filesize = size + 'B';
        } else if (size < Math.pow(num, 2)) {
            return filesize = (size / num).toFixed(2) + 'KB';
        } else {
            return filesize = (size / Math.pow(num, 2)).toFixed(2) + 'M';
        }
    }
    setFileArr = (fileArr) => {
        this.setState(
            {
                fileArr: fileArr
            }
        )
    }

    componentWillReceiveProps(nextprops) {
        let nextJson = JSON.stringify(nextprops.json);
        let thisJson = JSON.stringify(this.props.json);
        let nextfileArr = JSON.stringify(nextprops.fileArr);
        let thisfileArr = JSON.stringify(this.props.fileArr);
        if (nextfileArr !== thisfileArr) {
            this.setState({
                fileArr: nextprops.fileArr
            })
        }
        if (nextJson !== thisJson) {
            this.setState({
                json: nextprops.json
            })
        }
    }

    //文件删除
    fileDel(item) {
        let index;
        this.state.fileArr.forEach((fileItem, fileIndex) => {
            if (item.fileId == fileItem.fileId) {
                index = fileIndex;
            }
        })
        let fileArr1 = this.state.fileArr;
        fileArr1.splice(index, 1);
        this.setFileArr(fileArr1);
    }
    render() {
        return (
            <div className='file-component'>
                <div className='file-upload'>
                    <div className='file-component-left'>
                        <span>{this.props.json['hrzzmb-000022'] || '附件'}</span><span style={{ color: '#D2D2D2', marginLeft: '0.1rem', fontSize: '0.32rem' }}>{this.props.json['hrzzmb-000146'] || '(仅支持word文件)'}</span>
                    </div>
                    <div className='file-component-right'>
                        <span className="icon hrfont" style={{ color: '#108ee9' }}>&#xe692;</span>
                        <form
                            className="file-choose"
                            encType="multipart/form-data"
                            method="post"
                            name="fileinfo"
                            // 规定向何处提交表单的地址（URL）（提交页面）。
                            action={'/nccloud/hrzz/prove/SubmitAction.do'}
                        >
                            <input type="file" value={this.state.fileval} name="mobilefiles" multiple={'multiple'}
                                onChange={(e) => this.fileUpload(e)} ref={node => {
                                    this.inputFile = node
                                }} />
                        </form>
                    </div>
                </div>
                {/* 显示要上传的文件 */}
                {
                    this.state.fileArr.map((item, index) => {
                        let fileName = '';
                        if(item.fileName.length >= 18){
                            fileName = item.fileName.slice(0,17) + '...';
                        }else{
                            fileName = item.fileName;
                        }
                        return (
                            <div className="file-item">
                                <div className="file-img">
                                    <img src={docImage} alt="" />
                                    {/* <img src={item.fileUrl || item.previewUrl} alt=""/>  */}
                                </div>
                                <div className="file-details">
                                    <span>{fileName}</span>
                                    <span className="file-details-down">{item.fileSize}</span>
                                </div>
                                <div className="file-del" onClick={() => this.fileDel(item)}>
                                    <span className="icon hrfont">&#xe78e;</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default Upload;