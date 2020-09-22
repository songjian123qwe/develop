import {DTextarea} from '../../../../../public/mobile/components/index'
import { Picker, List, Checkbox } from 'antd-mobile';
import Uploader from '../../../components/Uploader/up'
import Zmage from 'react-zmage'
import excel from '../../../../img/excel.png'
import pdf from '../../../../img/pdf.png'
import word from '../../../../img/word.png'
import pic from '../../../../img/imglogo.png'
const CheckboxItem = Checkbox.CheckboxItem;
export default class hotProblem {
    constructor(comp) {
        this.comp = comp
    }

    didMount = () => {
    }


    // 删除图片
    imgDelete = (index) => {
        const {props} = this.comp
        const {dispatch,exam} = props
        return () => {
            exam.fileData.splice(index,1)
            exam.urlImg.splice(index,1)
            dispatch({
                type: 'exam/update',
                payload: {
                    fileData: exam.fileData,
                    urlImg: exam.urlImg
                }
            });
        }
    }
    // 图片列表
    questionImg = () => {
        const {props} = this.comp
        const {dispatch,exam} = props
        let arr = [{name:'a'},{name:'b'},{name:'c'}]
        let questionContent = exam.fileData.map((item,idx)=>{
            return (
                <li className="crumbs-list fl" key={idx} onClick={this.crumbsClick}>
                    <Zmage
                    preset="mobile"
                    backdrop="black"
                    controller={{
                        // 关闭按钮
                        close: false,
                        // 缩放按钮
                        zoom: false,
                        // 下载按钮
                        download: false,
                        // 旋转按钮
                        rotate: false,
                    }}
                    src={exam.urlImg[idx]} />
                    <i 
                        style={{display:exam.browsing?'none':''}}
                        className="hrfont hr-close"
                        onClick={this.imgDelete(idx)}
                    ></i>
                </li>
            )
        })
        return (
            <div>
            {/* 问题截图（非必填） */}
                <p>{exam.json['hrzzmb-000264']}</p>
                <ul>
                    {questionContent}
                    <li style={{
                        display:exam.urlImg.length>=4||exam.browsing===true?'none':''
                    }}>
                        <i className="hrfont hr-plus02"></i>
                        <Uploader
                            json={exam.json}
                            changed = {this.imgChange}
                        />
                    </li>
                </ul>
            </div>
        )
        
    }

    imgChange = async (file) => {
        const {props} = this.comp
        const {dispatch,exam} = props
        if(exam.fileData.length + Array.from(file).length>4) {
            Toast.info(exam.json['hrzzmb-000017'])
            // 最多传4张！
            return
        } else {

            let res = await dispatch({
                type: 'exam/update',
                payload: {
                    fileData: [...exam.fileData,...Array.from(file)]
                }
            });
            if(res) {
                
                let arr = [...exam.fileData,...Array.from(file)]
                arr.forEach((item,index) => {
                    this.fileFormat(item,index)
                })
            }
        }
    }

    // 判断当前文件格式
    fileFormat = (file,ind) => {
        const {props} = this.comp
        const {dispatch,exam} = props

        let index = file.name.lastIndexOf('.')
        let fileStyle = file.name.substr(index + 1)
        if (fileStyle.length === 4) {
            fileStyle = fileStyle.substr(0, 3)
        }
        let fileStyleStr =  fileStyle.toUpperCase()
        

        if(fileStyleStr === 'PDF') {
            let urlImg = exam.urlImg
            urlImg[ind] = pdf
            dispatch({
                type: 'exam/update',
                payload: {
                    urlImg: urlImg
                }
            });


        } else if (fileStyleStr === 'XLS'){
            let urlImg = exam.urlImg
            urlImg[ind] = excel
            dispatch({
                type: 'exam/update',
                payload: {
                    urlImg: urlImg
                }
            });

        } else if(fileStyleStr === 'DOC') {
            let urlImg = exam.urlImg
            urlImg[ind] = word
            dispatch({
                type: 'exam/update',
                payload: {
                    urlImg: urlImg
                }
            });

        } else if(
                fileStyleStr === 'JPE'||
                fileStyleStr === 'PNG'|| 
                fileStyleStr === 'JPG'
            ) {
            if(file.previewUrl) {

                let urlImg = exam.urlImg
                    urlImg[ind] = file.previewUrl
                    dispatch({
                        type: 'exam/update',
                        payload: {
                            urlImg: urlImg
                        }
                    });
                
            } else {
                let oFileReader = new FileReader();
                let _this = this
                oFileReader.onloadend = function () {
                    let urlImg = exam.urlImg
                    urlImg[ind] = this.result
                    dispatch({
                        type: 'exam/update',
                        payload: {
                            urlImg: urlImg
                        }
                    });
                };

            oFileReader.readAsDataURL(file)
            }
            
        }
        
    }
    // 选择问题分类
    selectType = (value) => {
        const {props} = this.comp
        const {dispatch,exam} = props
        if(exam.browsing===true) {
            return
        }
        exam.tab.forEach((item)=> {
            if(item.value===value[0]) {
                dispatch({
                    type: 'exam/update',
                    payload: {
                        selectInfo: item.label,
                        selectValue: item.value
                    }
                });
            }
            
        })
    }
    textChange = (value) => {
        const {props} = this.comp
        const {dispatch,exam} = props
        dispatch({
            type: 'exam/update',
            payload: {
                text:value
            }
        });
    }
    // 上部文本
    questionContent = () => {
        const {props} = this.comp
        const {dispatch,exam} = props
        return (
            <div>
                <p className="title clearfix">
                {/* 请选择问题分类、问题分类 */}
                    <span className="fl">{exam.browsing===false?exam.json['hrzzmb-000263']:exam.json['hrzzmb-000265']}</span>
                    <span className="fr">
                    {
                        exam.browsing?(<div>{exam.selectInfo}</div>):
                    
                    <Picker onOk={this.selectType} data={exam.tab} cols={1} okText={exam.json['hrzzmb-000003']} dismissText={exam.json['hrzzmb-000024']} className="forss">
                    <div>{exam.selectInfo}<i
                    style={{display:exam.browsing===true?'none':''}}
                    className="hrfont hr-drop-down02"></i></div>
                    </Picker>}
                    </span>
                </p>
                <div className="textArea">
                {
                    exam.browsing===true?(<p>{exam.text}</p>):<DTextarea
                    placeholder = {exam.json['hrzzmb-000266']} //请留言
                    maxNum = {80}
                    maxFault = {'k'}
                    // value = {}
                    textChange = {this.textChange}
                    // textBlur = {textBlur}
                />
                }
                    
                </div>  
            </div>
            
        )
    }


    // 指派人员多选事件
    onChange = (val) => {
        const {props} = this.comp
        const {dispatch,exam} = props
        if(exam.peopleArr.indexOf(val) >= 0) {
            exam.peopleArr.splice(exam.peopleArr.indexOf(val),1)
        } else {
            exam.peopleArr.push(val)
        }
        dispatch({
            type: 'exam/update',
            payload: {
                peopleArr:exam.peopleArr
            }
        });
    
    }
    
    

    // 指派弹窗

    peopleList = () => {
        const {props} = this.comp
        const {dispatch,exam} = props
        return (
            <div
                className="peopleList">
                {/* 请指派审核人员 */}
                <List renderHeader={() => exam.json['hrzzmb-000119']}> 
                    {exam.peopleListData.content[0].assginUsers.map(i => (
                    <CheckboxItem key={i.pk} onChange={() => this.onChange(i.pk)}>
                        {i.name}
                    </CheckboxItem>
                    ))}
                </List>
                {/* 确定 */}
                <div className="btnSure"  onClick = {props.main.examineFun}>{exam.json['hrzzmb-000003']}</div>
                
            </div>
        )
    }


   

}