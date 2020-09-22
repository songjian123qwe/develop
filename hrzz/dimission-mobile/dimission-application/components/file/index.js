/**
 *
 * Created by shenzaifang on 2019-05-21
 */
import React, {Component} from 'react';
import './index.less';
import {COMMON} from "../../util/util";
import upload from "./upload";
import Modal from "antd-mobile/lib/modal";
import Toast from "antd-mobile/lib/toast";
import {delFile} from "../../function/delete";

const fileType = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pps', 'ppsx', 'pdf'];

class FileComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            json: {},
            fileval: '',
            fileArr: props.fileArr  //fileId:(new Date()).getTime(),
            // fileName,
            // fileSize,
            // fileUrl,
            // file
        };
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

    componentDidMount() {

    }

    del = (item) => {
        if (item.hasOwnProperty('pk_doc')) {
            delFile(item.billId, item.fullPath, item.pk_doc).then(res => {
                if (!res.success) {
                    Modal.alert(this.state.json['hrzzmb-000029'], res.message);//
                    return
                }
                let index;

                this.state.fileArr.forEach((fileItem, fileIndex) => {
                    if (fileItem.pk_doc && (fileItem.pk_doc === item.pk_doc)) {
                        index = fileIndex
                    }
                });

                let fileArr1 = this.state.fileArr;
                fileArr1.splice(index, 1);
                this.setFileArr(fileArr1);
            })
            return;
        }
        let fileId = item.fileId;
        let delIndex;
        this.state.fileArr.forEach((item, index) => {
            if (item.fileId === fileId) {
                delIndex = index
            }
        });
        let fileArr = this.state.fileArr;
        fileArr.splice(delIndex, 1);
        this.setFileArr(fileArr)
    };

    fileUpload = (e) => {
        let files = Array.from(e.target.files);
        let flag = true;
        files = files.filter(file => {
            let nameArr = file.name.split('.');
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
            Toast.info(`${this.state.json["hrzzmb-000031"]}${fileType.join(',')}${this.state.json["hrzzmb-000032"]}`)
        }
        let filesLength = files.length;
        let fileArrLength = this.state.fileArr.length;
        if (filesLength + fileArrLength > 4) {
            Modal.alert(this.state.json['hrzzmb-000029'], this.state.json["hrzzmb-000033"]);// 最多可上传4个文件
            return;
        }
        files.map((file, index) => {
            this.loadFile(file)
        })
    };

    loadFile = (file) => {
        let fileArr = this.state.fileArr;
        if (window.FileReader) {
            let fr = new FileReader();
            fr.onloadend = (e) => {
                // let fileSize = file.size * 100 / 1024;
                let fileSize = this.getSize(file.size);
                let fileName = file.name;
                let fileUrl = e.target.result;
                let fileObj = {
                    fileId: (new Date()).getTime(),
                    fileName,
                    fileSize,
                    fileUrl,
                    file
                };
                fileArr.push(fileObj);
                this.setFileArr(fileArr)
            };
            fr.readAsDataURL(file);
        }
    };

    setFileArr(fileArr) {
        // this.state.fileArr = fileArr;
        this.setState({
            fileArr
        }, () => {
            //this.props.updateState({fileArr})
        })
    }

    commit = () => {
        if (!this.props.store) {
            Toast.fail(this.state.json["hrzzmb-000034"], 1.5, null, true);//请填写信息
            return
        }
        let formData = this.props.store.getFormData(COMMON.formId);
        let check = this.props.store.checkAllFields(COMMON.formId);
        if (!check) return;
        let fileArr = this.state.fileArr;
        upload({
            formData,
            fileArr,
            onResult: (res) => {
                if (res.success) {
                    if (res.data && res.data && res.data.content) {
                        this.props.updateState({
                            billid: res.data.billid,
                            peopleListData: res.data.content
                        });
                        return
                    }
                    Modal.alert(this.state.json["hrzzmb-000035"], this.state.json["hrzzmb-000016"], [
                        {
                            text: this.state.json['hrzzmb-000003'],
                            onPress: () => {
                                this.props.leftClick()
                            }
                        }
                    ]);
                } else {
                    let message = res.message || res.error.message;
                    Modal.alert(this.state.json['hrzzmb-000029'], message)
                }
            },
            json: this.state.json,
            props: this.props
        });
    };

    getSize = (size) => {
        if (isNaN(size)) return size;
        size = Number(size);
        let fileSize = size * 100 / 1024;
        fileSize = parseInt(fileSize);
        fileSize = fileSize / 100;
        if (fileSize > 1024) {
            fileSize = fileSize * 100 / 1024;
            fileSize = parseInt(fileSize);
            fileSize = fileSize / 100 + "M";
        } else {
            fileSize += 'KB';
        }
        return fileSize;
    }

    render() {
        let {fileArr, fileval} = this.state;
        return (
            <div className="file-component">
                <div className={'file-top'}>
                    {/*附件*/}
                    <div className={'file-title'}>{this.state.json["hrzzmb-000022"]}<span>({fileArr.length}/4)</span>
                    </div>
                    {fileArr.length < 4 ? <div className={'file-icon'}>
                        <span className="icon hrfont">&#xe692;</span>
                        <form
                            className={'form-dom'}
                            encType="multipart/form-data"
                            method="post"
                            name="fileinfo"
                            action={'/nccloud/hrzz/dimission/DimissionApplyCommitAction.do'}
                        >
                            <input type="file" name="webfiles" value={fileval} multiple={'multiple'}
                                   onChange={this.fileUpload} ref={node => {
                                this.inputFile = node
                            }}/>
                        </form>
                    </div> : <div></div>}
                </div>
                {fileArr.map(item => {
                    return <div className={'file-item'}>
                        <div className={'file-img'}>
                            <img src={item.fileUrl || item.previewUrl} alt=""/>
                        </div>
                        <div className={'file-desc'}>
                            <div className={'file-name'}>{item.fileName || item.name}</div>
                            <div className={'file-size'}>{this.getSize(item.fileSize)}</div>
                        </div>
                        <div className={'file-del'} onClick={() => {
                            this.del(item)
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

export default FileComponent;
