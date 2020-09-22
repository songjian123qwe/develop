import {Picker, List, Checkbox, Toast} from 'antd-mobile';
import Uploader from '../../../components/Uploader/up'
import ajax from "../../../../../public/mobile/utils/ajax";

const CheckboxItem = Checkbox.CheckboxItem;
export default class hotProblem {
    constructor(comp) {
        this.comp = comp
    }

    didMount = () => {
        // this.query()
    }


    // 删除图片
    imgDelete = (index) => {
        const {props} = this.comp
        const {dispatch, exam} = props;
        let value = exam.fileData[index];
        if (!value.billId) {
            exam.fileData.splice(index, 1);
            exam.urlImg.splice(index, 1);
            dispatch({
                type: 'exam/update',
                payload: {
                    fileData: exam.fileData,
                    urlImg: exam.urlImg
                }
            });
            return;
        }
        let data = {
            "uploadTrpe": "0",
            "billId": value.billId,
            "fullPath": value.fullPath,
            "pk_doc": value.pk_doc,
            "pk_billtypecode": "",
            "billcode": ""
        };
        ajax({
            url: "/nccloud/platform/attachment/delete.do",
            noNeedShowError: false,
            data: data,
            success: (result) => {
                if (result.success) {
                    exam.fileData.splice(index, 1);
                    exam.urlImg.splice(index, 1);
                    dispatch({
                        type: 'exam/update',
                        payload: {
                            fileData: exam.fileData,
                            urlImg: exam.urlImg
                        }
                    });
                }
            },
            error: (err) => {
                Toast.info(err, 2)
            }
        })
    };
    // 图片列表
    questionImg = () => {
        const {props} = this.comp
        const {dispatch, exam} = props
        let arr = [{name: 'a'}, {name: 'b'}, {name: 'c'}]
        let questionContent = exam.fileData.map((item, idx) => {
            return (
                <li className="crumbs-list fl" key={idx}>
                    <img src={exam.urlImg[idx]}/>
                    <i
                        style={{display: exam.browsing ? 'none' : ''}}
                        className="hrfont hr-close"
                        onClick={() => this.imgDelete(idx)}
                    />
                </li>
            )
        })
        return (
            <div>
                {/* 附件 */}
                <p>{exam.json['hrzzmb-000022']}</p>
                <ul>
                    {questionContent}
                    <li style={{
                        display: exam.urlImg.length >= 4 || exam.browsing === true ? 'none' : ''
                    }}>
                        <i className="hrfont hr-plus02"></i>
                        <Uploader
                            json={exam.json}
                            changed={this.imgChange}
                        />
                    </li>
                </ul>
            </div>
        )

    }

    imgChange = async (file) => {
        const {props} = this.comp
        const {dispatch, exam} = props
        if (exam.fileData.length + Array.from(file).length > 4) {
            Toast.info(exam.json['hrzzmb-000017'])
            // 最多传4张！
        } else {
            let res = await dispatch({
                type: 'exam/update',
                payload: {
                    fileData: [...exam.fileData, ...Array.from(file)]
                }
            });
            if (res) {
                let arr = [...exam.fileData, ...Array.from(file)]
                arr.forEach((item, index) => {
                    props.main.fileFormat(item, index)
                })
            }
        }
    };

    // 指派人员多选事件
    onChange = (val) => {
        const {props} = this.comp
        const {dispatch, exam} = props
        if (exam.peopleArr.indexOf(val) >= 0) {
            exam.peopleArr.splice(exam.peopleArr.indexOf(val), 1)
        } else {
            exam.peopleArr.push(val)
        }
        dispatch({
            type: 'exam/update',
            payload: {
                peopleArr: exam.peopleArr
            }
        });

    }


    // 指派弹窗

    peopleList = () => {
        const {props} = this.comp
        const {dispatch, exam} = props
        return (
            <div
                className="peopleList">
                {/* 请指派审核人员 */}
                <List renderHeader={() => exam.json['hrzzmb-000119']}>
                    {exam.peopleListData.content[0].uservos.map(i => (
                        <CheckboxItem key={i.userpk} onChange={() => this.onChange(i.userpk)}>
                            {i.username}
                        </CheckboxItem>
                    ))}
                </List>
                {/* 确定 */}
                <div className="btnSure" onClick={props.main.examineFun}>{exam.json['hrzzmb-000003']}</div>

            </div>
        )
    }


}