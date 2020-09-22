import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {DButton, DTextarea, DatePicker} from '../../../public/mobile/components/index'
import TextareaBox from '../common/TextareaBox/index'
import ajax from '../../../public/mobile/utils/ajax';
import Upload from '../common/up.js'
import {compatibleNavImg, formatTime, getAppPageConfig} from '../../../public/mobile/utils/index.js'
import {getMultiLang} from '../../../public/mobile/utils/getMultiLang'
import NativeObj from '../../../public/mobile/utils/jsbridge/index.js'
import thirdLog from "../../../login/third-log-method";
import {Toast, Modal, List, Checkbox} from 'antd-mobile';
import './index.less'
import excel from '../../img/excel.png'
import pdf from '../../img/pdf.png'
import word from '../../img/word.png'
import pic from '../../img/imglogo.png'

const CheckboxItem = Checkbox.CheckboxItem;

class EnterpriseProList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibile: false, //提示弹框
            visibileText: false, //总结弹框
            text: '',//总结
            textInfo: '',//文本变化存储
            timeValue: '',
            maxNum: '100',
            billid: null,
            fileData: [],
            formData: {},
            config: getAppPageConfig(),
            json: {},
            urlImg: [],
            examine: false, //是否显示指派人员列表
            peopleListData: {}, //指派人员列表
            peopleArr: []//选中人员数组
        }
    }

    componentDidMount() {
        window.location.hash = '?&c=60652040&p=60652040&ar=0001Z510000000065KV7&id=0'
        // this.editNav('转正申请')
        this.getMultiLangFunc()


    }

    leftClick = () => {
        if (this.state.examine === false) {
            NativeObj.closePage()
        } else {
            this.info()
            this.setState({
                examine: false
            })
        }

    }

    getMultiLangFunc = () => {
        getMultiLang({
            domainName: 'hrzz',
            moduleId: 'hrzzmb',
            callback: (json, status, init) => {
                this.setState({
                    json: json,
                    text: json['hrzzmb-000014'],
                }, () => {
                    this.info()
                    this.editNav(this.state.json['hrzzmb-000013'])
                    // 转正申请
                })
            }
        })
    }

    editNav(title) {

        let parameters = {}
        let cbs = {
            goBack: this.leftClick
        }
        parameters = {
            leftItems: [
                {
                    callback: 'goBack',
                    icon: compatibleNavImg(location.origin + '/nccloud/resources/hrzz/public/mobile/static/icon/zuo.png')
                }
            ],
            centerItems: [
                {
                    title: title,
                }
            ]
        }
        let data = {
            'function': 'configNavBar',
            'parameters': parameters
        }
        NativeObj.configNavBar(data, cbs)
    }

    enclosureInfo = () => {
        let billid = this.state.formData.card.rows[0].values.pk_hi_regapply.value
        ajax({
            url: '/nccloud/platform/attachment/query.do',
            data: {
                billId: billid,
                fullPath: billid
            },
            info: {
                appcode: this.state.config.appcode
            },
            success: (res) => {
                // Toast.hide()
                if (res.success === true) {

                    this.setState({
                        fileData: res.data
                    })
                    res.data.forEach((item, index) => {
                        this.fileFormat(item, index)
                    })

                }
            },
            error: (err) => {

                // Modal.alert(this.state.json['hrzzmb-000002'], err.data.error.message, [
                //     { text: this.state.json['hrzzmb-000003'], onPress: () => this.leftClick() },
                //     ])
                // // Toast.hide()
            }
        })

    }
    info = () => {
        Toast.loading(this.state.json['hrzzmb-000001'], 0, () => {
            console.log("信息填写不完整")
        }, true);

        ajax({
            url: '/nccloud/hrzz/regapply/RegApplyInitAction.do',
            info: {
                appcode: this.state.config.appcode
            },
            success: (res) => {
                Toast.hide()
                if (res.success === true) {

                    if (res.data.auth === true) {

                        if (Object.keys(res.data.formData.card.rows[0].values.memo).length > 0) {
                            this.setState({
                                text: res.data.formData.card.rows[0].values.memo.value
                            })
                        }

                        if (Object.keys(res.data.formData.card.rows[0].values.regulardate).length > 0) {
                            this.setState({
                                timeValue: new Date(res.data.formData.card.rows[0].values.regulardate.value),
                            })
                        }
                        this.setState({
                            formData: res.data.formData
                        }, () => {
                            this.enclosureInfo()
                        })
                    } else {
                        Modal.alert(this.state.json['hrzzmb-000002'], res.data.authMsg, [
                            {text: this.state.json['hrzzmb-000003'], onPress: () => this.leftClick()},
                        ])
                    }

                }
            },
            error: (err) => {

                Modal.alert(this.state.json['hrzzmb-000002'], err.message||err.data.message||err.data.error.message,  [
                    {text: this.state.json['hrzzmb-000003'], onPress: () => this.leftClick()},
                ])
                Toast.hide()
            }
        })

    }


    // 文本框点击确定
    clickSureText = () => {
        this.setState({
            visibileText: false,
            text: this.state.textInfo ? this.state.textInfo : this.state.json['hrzzmb-000014'],
            // 非必填
        })
        window.scrollTo(0, 0);
    }

    // 关闭弹窗公共方法
    clickCancelText = (name) => {
        return () => {
            this.setState({
                [name]: false
            })
            window.scrollTo(0, 0);
        }
    }

    // 判断当前文件格式
    fileFormat = (file, ind) => {


        let index = file.name.lastIndexOf('.')
        let fileStyle = file.name.substr(index + 1)
        if (fileStyle.length === 4) {
            fileStyle = fileStyle.substr(0, 3)
        }
        let fileStyleStr = fileStyle.toUpperCase()


        if (fileStyleStr === 'PDF') {
            // this.state.urlImg = [...this.state.urlImg,pdf]
            this.state.urlImg[ind] = pdf


        } else if (fileStyleStr === 'XLS') {
            // this.state.urlImg = [...this.state.urlImg,excel]
            this.state.urlImg[ind] = excel

        } else if (fileStyleStr === 'DOC') {
            // this.state.urlImg = [...this.state.urlImg,word]
            this.state.urlImg[ind] = word

        } else if (
            fileStyleStr === 'JPE' ||
            fileStyleStr === 'PNG' ||
            fileStyleStr === 'JPG'
        ) {
            if (file.previewUrl) {
                this.state.urlImg[ind] = file.previewUrl
            } else {
                let oFileReader = new FileReader();
                let _this = this
                oFileReader.onloadend = function () {
                    // base64 = this.result;
                    // _this.state.urlImg = [..._this.state.urlImg,this.result]
                    _this.state.urlImg[ind] = this.result
                    _this.setState(_this.state)
                };

                oFileReader.readAsDataURL(file)
            }

        }
        this.setState(this.state)

    }

    // 指派人员多选事件
    onChange = (val) => {
        if (this.state.peopleArr.indexOf(val) >= 0) {
            this.state.peopleArr.splice(this.state.peopleArr.indexOf(val), 1)
        } else {
            this.state.peopleArr.push(val)
        }
        this.setState(this.state)

    }

    peopleList = () => {
        return (
            <div
                className="peopleList">
                <List renderHeader={() => this.state.json['hrzzmb-000119']}>
                    {this.state.peopleListData.content[0].uservos.map(i => (
                        <CheckboxItem key={i.userpk} onChange={() => this.onChange(i.userpk)}>
                            {i.username}
                        </CheckboxItem>
                    ))}
                </List>
                <div className="btnSure" onClick={this.examineFun}>{this.state.json['hrzzmb-000003']}</div>

            </div>
        )
    }
    // 提交
    submit = () => {
        if (!this.state.timeValue) {
            Toast.info(this.state.json['hrzzmb-000015'])
            return
        }

        Toast.loading(this.state.json['hrzzmb-000001'], 0, () => {
            console.log("信息填写不完整")
        }, true);

        // let config = {
        //     headers: { 'Content-Type': 'multipart/form-data' }
        // }; //添加请求头

        let formData = JSON.parse(JSON.stringify(this.state.formData.card))
        formData.rows[0].values.regulardate.value = formatTime(this.state.timeValue, 'yyyy-MM-dd')
        formData.rows[0].values.memo.value = this.state.text === this.state.json['hrzzmb-000014'] ? '' : this.state.text
        // this.state.billid && (formData.rows[0].values.pk_hi_regapply.value = this.state.billid)
        let param = new FormData(); //创建form对象
        this.state.fileData.forEach((item, index) => {
            if (!item.pk_doc) {
                //param.append('file', item)
                let index = item.name.lastIndexOf('.');
                let fileStyle = item.name.substr(index + 1);
                //平台组件不支持JPEG格式的图片，在这里改为JPG格式
                if (fileStyle.toUpperCase() === 'JPEG') {
                    const renameReportFile = new File([item], item.name.substr(0, index + 1) + 'jpg', {type: 'image/jpg'});
                    param.append('file', renameReportFile);
                } else {
                    param.append('file', item)
                }
            }

        });
        param.append('formData', JSON.stringify({model: formData}))


        ////////////////////////////////////////
        ajax({
            url: '/nccloud/hrzz/regapply/RegApplyCommitAction.do',
            data: param,
            info: {
                appcode: this.state.config.appcode,
            },
            headers: {'Content-Type': 'multipart/form-data'},
            success: (res) => {
                Toast.hide()
                if (res.success === true) {
                    if (res.data.content) {
                        this.setState({
                            examine: true,
                            peopleArr: [],
                            billid: res.data.billid,
                            peopleListData: res.data.content
                        })
                    } else {
                        Modal.alert(this.state.json['hrzzmb-000016'], '', [
                            {text: this.state.json['hrzzmb-000003'], onPress: () => this.leftClick()},
                        ])
                    }

                } else {
                    Modal.alert(this.state.json['hrzzmb-000002'], res.data.error.message, [
                        {text: this.state.json['hrzzmb-000003']},
                    ])
                }
            },
            error: (err) => {
                Modal.alert(this.state.json['hrzzmb-000002'], err.message||err.data.message||err.data.error.message, [
                    {text: this.state.json['hrzzmb-000003']},
                ])
                Toast.hide()
            }
        })
        ///////////////////////////////////////
        //     let gziptools = new Gzip();
        //     axios.post('/nccloud/hrzz/regapply/RegApplyCommitAction.do', param, config)
        //     .then((res)=> {
        //         Toast.hide()
        //         let data;
        //         if (res.data.data||res.data.error) {
        //             data = res.data
        //         } else{
        //             data = this.unZip(res.data)
        //         }

        //         if(data.success === true) {
        //             if(data.data.content){
        //                 this.setState({
        //                     examine:true,
        //                     peopleArr:[],
        //                     billid:data.data.billid,
        //                     peopleListData:data.data.content
        //                 })
        //             } else {
        //                 Modal.alert(this.state.json['hrzzmb-000016'], '', [
        //                     { text: this.state.json['hrzzmb-000003'], onPress: () => this.leftClick() },
        //                     ])
        //             }

        //         }
        //         else {
        //             Modal.alert(this.state.json['hrzzmb-000002'], data.error.message, [
        //                 { text: this.state.json['hrzzmb-000003']},
        //                 ])
        //         }
        //     })
        //     .catch((err)=> {
        //         Toast.hide()
        //         let data;
        //         if(err.data.error) {
        //             data = err.data
        //         } else{
        //             data = this.unZip(err.data)
        //         }
        //         Modal.alert(this.state.json['hrzzmb-000002'], data.error.message, [
        //             { text: this.state.json['hrzzmb-000003']},
        //             ])
        //     });

    }

    // 确定审核人员
    examineFun = () => {
        Toast.loading(this.state.json['hrzzmb-000001'], 0, () => {
            console.log("信息填写不完整")
        }, true);

        if (this.state.peopleArr.length === 0) {
            Toast.info(this.state.json['hrzzmb-000119'])
            return
        }
        let arr = []

        this.state.peopleListData.content[0].uservos.forEach(item => {
            this.state.peopleArr.forEach(j => {
                if (item.userpk === j) {
                    arr.push(item)
                }
            })
        })
        this.state.peopleListData.content[0].uservos = arr
        this.setState(this.state)

        ajax({
            url: '/nccloud/hrzz/regapply/RegApplyAssignCommitAction.do',
            data: {
                content: this.state.peopleListData,
                billid: this.state.billid
            },
            success: (res) => {
                Toast.hide()
                if (res.success === true) {
                    if (res.data.errorMsg) {
                        Modal.alert(this.state.json['hrzzmb-000016'], res.data.errorMsg, [
                            {text: this.state.json['hrzzmb-000003'], onPress: () => this.leftClick()},
                        ])
                    } else {
                        Modal.alert(this.state.json['hrzzmb-000016'], '', [
                            {text: this.state.json['hrzzmb-000003'], onPress: () => NativeObj.closePage()},
                        ])
                    }

                }


            },
            error: (err) => {

                Modal.alert(this.state.json['hrzzmb-000002'], err.data.error.message, [
                    {text: this.state.json['hrzzmb-000003'], onPress: () => this.leftClick()},
                ])
                Toast.hide()
            }
        })
    }

    // 打开文本框
    textareaOpen = () => {
        this.setState({
            visibileText: true,
            textInfo: this.state.text === this.state.json['hrzzmb-000014'] ? '' : this.state.text,
        })
    }

    // 文字变化函数
    textChange = (text) => {
        this.setState({
            textInfo: text
        })
    }

    textBlur = () => {
        window.scrollTo(0, 0);
    }

    imgChange = (file) => {

        if (this.state.fileData.length + Array.from(file).length > 4) {
            Toast.info(this.state.json['hrzzmb-000017'])
            // 最多传4张！
            return
        } else {

            this.state.fileData = [...this.state.fileData, ...Array.from(file)]
            this.setState(this.state)
            this.state.fileData.forEach((item, index) => {
                this.fileFormat(item, index)
            })
        }
    }
    // 时间变化函数
    dateChange = (time) => {
        this.setState({
            timeValue: time
        })
    }

    deleteImg = (index, billId, fullPath, pk_doc) => {
        return () => {
            if (pk_doc) {
                ajax({
                    url: '/nccloud/platform/attachment/delete.do',
                    data: {
                        billId,
                        fullPath,
                        pk_doc
                    },
                    info: {
                        appcode: this.state.config.appcode
                    },
                    success: (res) => {
                        // Toast.hide()
                        if (res.success === true) {

                            this.state.fileData.splice(index, 1)
                            this.state.urlImg.splice(index, 1)
                            this.setState(this.state)

                        }
                    },
                    error: (err) => {

                        Modal.alert(this.state.json['hrzzmb-000002'], err.data.error.message, [
                            {text: this.state.json['hrzzmb-000003'], onPress: () => this.leftClick()},
                        ])
                        // Toast.hide()
                    }
                })
            } else {
                this.state.fileData.splice(index, 1)
                this.state.urlImg.splice(index, 1)
                this.setState(this.state)
            }
        }


    }


    // 字节转kb
    getImgSize = (str64) => {
        let str = str64.replace('data:image/jpeg;base64,', '');//这里根据自己上传图片的格式进行相应修改

        let strLength = str.length;
        let fileLength = parseInt(strLength - (strLength / 8) * 2);

        // 由字节转换为KB
        let size = "";
        size = (fileLength / 1024).toFixed(2);
        return parseInt(size);
    }
    // 图片列表
    imgList = () => {

        let imgList = this.state.fileData.map((item, idx) => {
            return (
                <div className="imgup clearfix" key={idx}>
                    <img className="fl" src={this.state.urlImg[idx]}/>
                    <div className="name fl">
                        <p>{item.name}</p>
                        <p>{item.size ? (item.size / 1024).toFixed(2) : (item.fileSize / 1024).toFixed(2)}KB</p>
                    </div>
                    <i className="hrfont fr"
                       onClick={this.deleteImg(idx, item.billId, item.fullPath, item.pk_doc)}>&#xe78e;</i>
                </div>
            )
        })

        return (
            <div className="imgBox">
                {imgList}
            </div>
        )


    }


    render() {
        return (
            <div className="main-order">
                <ul>
                    <li className="clearfix">
                        {/* 入职日期 */}
                        <span className="fl rgb46">{this.state.json['hrzzmb-000018']}</span>
                        <span
                            className="fr rgb130">{this.state.formData.card && this.state.formData.card.rows[0].values.begin_date.value}</span>
                    </li>
                    <li className="clearfix">
                        {/* 转正日期 */}
                        <span className="fl rgb46">{this.state.json['hrzzmb-000019']}</span>
                        <span style={{width: '70%'}} className="timer fr"><DatePicker
                            mode='date'
                            name=''
                            extra={this.state.json['hrzzmb-000020']} //必选
                            value={this.state.timeValue}
                            onChange={this.dateChange}
                        /></span>
                    </li>
                    <li>
                        <p className="rgb46 clearfix">
                            {/* 试用期工作总结 */}
                            <span className="fl">{this.state.json['hrzzmb-000021']}</span>
                            <span className="fr textinfo rgb130" onClick={this.textareaOpen}>{this.state.text}</span>
                        </p>
                    </li>
                    <li>
                        <p className="rgb46 clearfix">
                            {/* 附件 */}
                            <span className="fl">{this.state.json['hrzzmb-000022']}</span>
                            {
                                this.state.fileData.length < 4 ? (<i className="fr rgb130 hrfont hr-enclosure">
                                    <Upload
                                        changed={this.imgChange}
                                        json={this.state.json}
                                    />
                                </i>) : null
                            }

                        </p>
                        {this.state.fileData.length > 0 ? this.imgList() : null}

                    </li>
                </ul>
                <div>
                    {
                        this.state.visibileText === true ? (<TextareaBox
                            onClick={this.clickSureText}
                            onCancel={this.clickCancelText('visibileText')}
                            value={this.state.textInfo}
                            textChange={this.textChange}
                            textBlur={this.textBlur}
                            json={this.state.json}
                            maxNum={this.state.maxNum}
                        />) : null
                    }
                </div>
                {/* 提交 */}
                {this.state.examine === true ? this.peopleList() : null}
                <DButton type='submit' onClick={this.submit} title={this.state.json['hrzzmb-000023']}/>
            </div>
        )
    }
}
thirdLog(()=>{
    ReactDOM.render(<EnterpriseProList/>, document.getElementById('app'));
})
