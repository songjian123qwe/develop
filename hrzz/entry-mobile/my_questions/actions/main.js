import {Toast, Modal} from 'antd-mobile';
import NativeObj from '../../../public/mobile/utils/jsbridge/index.js'
import Gzip from '../../../public/mobile/utils/gzip'
import Cipher, {opaqueDecrypt} from "../../../public/mobile/utils/cipher";
import {hrRouter, compatibleNavImg} from '../../../public/mobile/utils/index';
import {getMultiLang} from 'src/hrzz/public/mobile/utils/getMultiLang'


export default class Main {

    constructor(comp) {
        this.comp = comp;
    }

    // appConfig = {
    //     appcode:'60652070',
    //     pagecode:'60652070nccloud'
    // }


    didMount = () => {
        window.location.hash =
            "?&c=60652070&p=60652070nccloud&ar=0001Z510000000065KV7&id=0";
        this.getMultiLangFunc()
        this.init()


    }

    // 卸载
    willUnMount = () => {

    }

    didUpdate = () => {

    }

    leftClick = () => {
        const {props} = this.comp
        const {dispatch, exam} = props
        if (exam.examine) {
            dispatch({
                type: 'exam/update',
                payload: {
                    examine: false
                }
            });
        } else {
            let url = '/hrzz/entry-mobile/staff_enquiries/main/index.html'
            hrRouter.push(url)
        }

    }

    getMultiLangFunc = () => {
        const {props} = this.comp
        const {dispatch, exam} = props
        getMultiLang({
            domainName: 'hrzz',
            moduleId: 'hrzzmb',
            callback: (json, status, init) => {
                dispatch({
                    type: 'exam/update',
                    payload: {
                        json: json,
                        selectInfo: json['hrzzmb-000020'] //必选
                    }
                });
                this.editNav(json['hrzzmb-000261']) //我要提问
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
            ],
            rightItems: []
        }
        let data = {
            'function': 'configNavBar',
            'parameters': parameters
        }
        NativeObj.configNavBar(data, cbs)
    }


    // 页面初始化
    init = async () => {
        const {props} = this.comp
        const {dispatch, exam} = props
        try {
            let res = await dispatch({
                type: 'exam/questionInitAction',
                payload: {
                    info: {
                        appcode: '60652070'
                    }
                },

            });
            if (res.success) {
                let arr = []
                // 获取类别
                res.data.type.forEach((item) => {
                    arr.push(
                        {
                            label: item.name,
                            value: item.pk_defdoc
                        }
                    )
                })
                dispatch({
                    type: 'exam/update',
                    payload: {
                        formData: res.data.formData,
                        tab: arr
                    }
                });
            }
        } catch (e) {
            throw(e)
        }
    }


    // 提交
    submit = async () => {
        const {props} = this.comp;
        const {dispatch, exam} = props;
        if (!exam.text) {
            // 请填写问题描述！
            Toast.info(exam.json['hrzzmb-000262'])

            return
        }
        if (!exam.selectValue) {
            // 请选择问题分类！
            Toast.info(exam.json['hrzzmb-000263'])
            return
        }

        // Toast.loading('加载中...', 0, () => {
        //     console.log("信息填写不完整")
        // },true);

        let config = {
            headers: {'Content-Type': 'multipart/form-data'}
        }; //添加请求头


        let formData = JSON.parse(JSON.stringify(exam.formData.card))
        formData.rows[0].values.title.value = exam.text
        formData.rows[0].values.type.value = exam.selectValue

        let param = new FormData(); //创建form对象
        exam.fileData.forEach((item) => {
            let index = item.name.lastIndexOf('.');
            let fileStyle = item.name.substr(index + 1);
            //平台组件不支持JPEG格式的图片，在这里改为JPG格式
            if (fileStyle.toUpperCase() === 'JPEG') {
                const renameReportFile = new File([item], item.name.substr(0, index + 1) + 'jpg', {type: 'image/jpg'});
                param.append('file', renameReportFile);
            } else {
                param.append('file', item)
            }
        });
        param.append('formData', JSON.stringify({model: formData}))

//////////////////////////////////////


        try {
            let res = await dispatch({
                type: 'exam/questionCommitAction',
                payload: {
                    postData: {
                        data: param,
                        headers: {'Content-Type': 'multipart/form-data'}
                    },
                    info: {
                        appcode: '60652070'
                    }
                }
            });
            if (res.success) {
                if (res.data.content) {
                    // 判断是否有指派
                    dispatch({
                        type: 'exam/update',
                        payload: {
                            examine: true,
                            peopleArr: [],
                            billid: res.data.billid,
                            peopleListData: res.data.content
                        }
                    });
                } else {
                    dispatch({
                        type: 'exam/update',
                        payload: {
                            browsing: true
                        }
                    });
                    // 提交成功
                    Modal.alert(exam.json['hrzzmb-000016'], '', [
                        {text: exam.json['hrzzmb-000003']},
                        // 确定
                    ])
                }
            }
        } catch (e) {
            throw(e)
        }


//////////////////////////////////////

// return
        // let gziptools = new Gzip();
        // axios.post('/nccloud/hrzz/question/QuestionCommitAction.do', param, config)
        // .then((res)=> {
        //     Toast.hide()
        //     let data;
        //     if (res.data.data||res.data.error) {
        //         data = res.data
        //     } else{
        //         data = this.unZip(res.data)
        //     }

        //     if(data.success === true) {

        //         if(data.data.content){
        //             // 判断是否有指派
        //             dispatch({
        //                 type: 'exam/update',
        //                 payload: {
        //                     examine:true,
        //                     peopleArr:[],
        //                     billid:data.data.billid,
        //                     peopleListData:data.data.content
        //                 }
        //             });
        //         } else {
        //             dispatch({
        //                 type: 'exam/update',
        //                 payload: {
        //                     browsing:true
        //                 }
        //             });
        //             Modal.alert('提交成功', '', [
        //                 { text: '确定'},
        //                 ])
        //         }
        //     } 
        //     else {
        //         Modal.alert('提示', data.error.message, [
        //             { text: '确定'},
        //             ])
        //     }
        // })
        // .catch((err)=> {
        //     Toast.hide()
        //     let data;
        //     if(err.data.error) {
        //         data = err.data
        //     } else{
        //         data = this.unZip(err.data)
        //     }
        //     Modal.alert('提示', data.error.message, [
        //         { text: '确定'},
        //         ])
        // });
    }


    // 确定指派
    examineFun = async () => {
        const {props} = this.comp
        const {dispatch, exam} = props


        if (exam.peopleArr.length === 0) {
            // 请指派审核人员
            Toast.info(exam.json['hrzzmb-000119'])
            return
        }
        let arr = []

        exam.peopleListData.content[0].assginUsers.forEach(item => {
            exam.peopleArr.forEach(j => {
                if (item.pk === j) {
                    arr.push(item)
                }
            })
        })
        exam.peopleListData.content[0].assginUsers = arr
        dispatch({
            type: 'exam/update',
            payload: {
                peopleListData: exam.peopleListData
            }
        });

        try {
            let res = await dispatch({
                type: 'exam/questionAssignCommitAction',
                payload: {
                    postData: {
                        content: exam.peopleListData,
                        billid: exam.billid
                    },
                    info: {
                        appcode: '60652070'
                    }

                }
            });
            if (res.success) {
                if (res.data.errorMsg) {
                    // 提示、确定
                    Modal.alert(exam.json['hrzzmb-000002'], res.data.errorMsg, [
                        {text: exam.json['hrzzmb-000003'], onPress: () => this.leftClick()},
                    ])
                } else {
                    // 提交成功、确定
                    Modal.alert(exam.json['hrzzmb-000016'], '', [
                        {text: exam.json['hrzzmb-000003'], onPress: () => this.leftClick()},
                    ])
                    dispatch({
                        type: 'exam/update',
                        payload: {
                            browsing: true
                        }
                    });
                }
            }
        } catch (e) {
            throw(e)
        }

    }
}