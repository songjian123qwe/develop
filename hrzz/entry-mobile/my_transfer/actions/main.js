import React, {Component} from 'react';
import {Toast, Modal} from 'antd-mobile';
import NativeObj from '../../../public/mobile/utils/jsbridge/index.js'
import Gzip from '../../../public/mobile/utils/gzip'
import Cipher, {opaqueDecrypt} from "../../../public/mobile/utils/cipher";
import {CreateMeta} from '../../../public/hr-mobile-card/index';
import {hrRouter, compatibleNavImg} from '../../../public/mobile/utils/index';
import {getMultiLang} from "../../../public/mobile/utils/getMultiLang";
import PropTypes from "prop-types";
import excel from '../../img/excel.png'
import pdf from '../../img/pdf.png'
import word from '../../img/word.png'
import pic from '../../img/imglogo.png'
import ajax from '../../../public/mobile/utils/ajax'
import proFetch from '../../../public/mobile/utils/project-fetch';

if (new RegExp(/localhost:3006/g).test(window.location.href)) {
    sessionStorage.setItem('showNav', 'true');
}

export default class main {
    constructor(comp) {
        this.comp = comp;
    }

    didMount = () => {
        window.location.hash =
            "?&c=60652045&p=60652045nccloud&ar=0001Z510000000065KV7&id=0";
        this.getLanguage(this.initOne)
    }

    // 卸载
    willUnMount = () => {

    }

    didUpdate = () => {

    }
    getLanguage = (callbackFn) => {
        const {props} = this.comp
        const {dispatch, exam, editNav} = props
        getMultiLang({
            domainName: 'hrzz',
            moduleId: 'hrzzmb',
            callback: (json, status, init) => {
                // 变动类型
                dispatch({
                    type: 'exam/update',
                    payload: {
                        json: json
                    }
                });
                editNav(json['hrzzmb-000285']);
                callbackFn && callbackFn();
            }
        })
    };
    // 页面初始化
    initOne = async () => {
        const {props} = this.comp
        const {dispatch, exam} = props
        const {json} = exam
        proFetch({
            url: '/nccloud/hrzz/transapply/TransApplyNewAction.do',
            data: {rqCode: 'querypersonsettings'},
            info: {
                appcode: '60652045'
            },
            loading:true,
            success: (res) => {
                let meta = res.data.temp.areas;
                let formData = null
                meta[exam.newFormId].items.map(item => {
                    let queryCondition = {};
                    if (item.code === 'pk_trnstype') {
                        queryCondition = {
                            "GridRefActionExt": "nccloud.web.hrzz.transapply.action.TransTypeRefSqlBuilder",
                        };
                    }

                    if (!item.hasOwnProperty('queryCondition')) {
                        item.queryCondition = {};
                    }
                    Object.assign(item.queryCondition || {}, queryCondition)
                });

                // // 模拟动态获取模板与数据
                let getMeta = CreateMeta(meta, {});

                if (res.data.editstate) {
                    this.initTwo(res.data.transMode, res.data.transType)
                    dispatch({
                        type: 'exam/update',
                        payload: {
                            editstate: res.data.editstate
                        }
                    });
                } else {
                    dispatch({
                        type: 'exam/update',
                        payload: {
                            chiocLock: true,
                            store: getMeta,
                            editstate: res.data.editstate,
                            formData
                        }
                    });
                }
            },
            error: (err) => {
                if (!err.data) {
                    throw err
                }
                Modal.alert(json['hrzzmb-000002'], err.data.error.message, [
                    {
                        text: json['hrzzmb-000003'], onPress: () => {
                            NativeObj.closePage()
                        }, style: 'default'
                    }
                ])
            }
        })
    }
    // 第二部页面初始化
    initTwo = async (transMode, transType) => {
        const {props} = this.comp
        const {dispatch, exam} = props
        try {
            let res = await dispatch({
                type: 'exam/transApplyInitAction',
                payload: {
                    postData: {
                        transMode,//调配方式
                        transType//业务类型
                    },
                    info: {
                        appcode: '60652045'
                    }
                }
            });
            if (res.success) {

                let meta = res.data.temp.areas;
                let formDataTwo = res.data.formData[exam.formId]
                // // 模拟动态获取模板与数据
                meta[exam.formId].items.map(item => {
                    let queryCondition = {};
                });
                let getMeta = CreateMeta(meta, {
                    onBeforeHandle: this.editBefore,
                    onAfterHandle: this.onAfterHandle
                });
                dispatch({
                    type: 'exam/update',
                    payload: {
                        chiocLock: false,
                        storeTwo: getMeta,
                        transMode,//调配方式
                        transType,//业务类型
                        formDataTwo
                    }
                });
                this.query(formDataTwo.rows[0].values.pk_hi_stapply.value)
            }
        } catch (e) {
            throw(e)
        }
    }

// 获取图片
    query = async (id) => {
        const {props} = this.comp
        const {dispatch, exam} = props
        if (!id) return;

        try {
            let res = await dispatch({
                type: 'exam/query',
                payload: {
                    postData: {
                        billId: id,
                        fullPath: id
                    },
                    info: {
                        appcode: '60652045'
                    }
                }
            });
            if (res.success) {
                dispatch({
                    type: 'exam/update',
                    payload: {
                        fileData: res.data
                    }
                });
                res.data.forEach((item, index) => {
                    this.fileFormat(item, index)
                })
            }
        } catch (e) {
            throw(e)
        }
    }
    // 编辑前事件
    editBefore = async (key) => {
        const {props} = this.comp
        const {dispatch, exam} = props
        let formData = exam.storeTwo.getFormData(exam.formId);

        try {
            let res = await dispatch({
                type: 'exam/transBeforeEditAction',
                payload: {
                    postData: {
                        formData,
                        key,
                        tansMode: exam.transMode
                    },
                    info: {
                        appcode: '60652045'
                    }
                }
            });
            if (res.success) {
                exam.storeTwo.setFieldProps(key, exam.formId, {queryCondition: res.data.refParam})

                dispatch({
                    type: 'exam/update',
                    payload: {
                        pk_org: res.data.refParam.pk_org
                    }
                });
            }
        } catch (e) {
            throw(e)
        }
        return true
    }
    // 编辑后事件
    onAfterHandle = async (data) => {
        const {props} = this.comp
        const {dispatch, exam} = props
        let formData = exam.storeTwo.getFormData(exam.formId);
        try {
            let res = await dispatch({
                type: 'exam/transAfterEditAction',
                payload: {
                    postData: {
                        formData,
                        key: data.key,
                        pk_org: exam.pk_org,
                        page_code: exam.pagecode
                    },
                    info: {
                        appcode: '60652045'
                    }
                }
            });
            if (res.success) {
                let {formData, visible, disable, required} = res.data;
                this.setFormItemsVisible(exam.formId, visible);
                this.setFormItemsDisabled(exam.formId, disable);
                this.setFormItemsRequired(exam.formId, required);
                exam.storeTwo.setFormEditStatus(true)
                dispatch({
                    type: 'exam/update',
                    payload: {
                        formDataTwo: formData[exam.formId]
                    }
                });
            }
        } catch (e) {
            throw(e)
        }

    };


    setFormItemsVisible(formId, data) {
        const {props} = this.comp
        const {dispatch, exam} = props
        if (typeof data !== 'object') {
            return
        }
        for (let key in data) {
            exam.storeTwo.setFieldProps(key, formId, {visible: data[key]})
        }
    }

    setFormItemsDisabled(formId, data) {
        const {props} = this.comp
        const {dispatch, exam} = props
        if (typeof data !== 'object') {
            return
        }
        for (let key in data) {
            exam.storeTwo.setFieldProps(key, formId, {disabled: data[key]})
        }
    }

    setFormItemsRequired(formId, data) {
        const {props} = this.comp
        const {dispatch, exam} = props
        if (typeof data !== 'object') {
            return
        }
        for (let key in data) {
            exam.storeTwo.setFieldProps(key, formId, {required: data[key]})
        }
    }

    // 提交
    submit = async () => {
        const {props} = this.comp;
        const {dispatch, exam} = props;
        let lock = exam.storeTwo.checkAllFields(exam.formId)
        let formDataValue = exam.storeTwo.getFormData(exam.formId)
        if (!lock) return;
        // Toast.loading('加载中...', 0, () => {
        //     console.log("信息填写不完整")
        // },true);

        // let config = {
        //     headers: { 'Content-Type': 'multipart/form-data' }
        // }; //添加请求头
        let formData = JSON.parse(JSON.stringify(formDataValue))

        let param = new FormData(); //创建form对象
        let keepFiles = []
        exam.fileData.forEach((item, index) => {
            if (!item.pk_doc) {
                let index = item.name.lastIndexOf('.');
                let fileStyle = item.name.substr(index + 1);
                //平台组件不支持JPEG格式的图片，在这里改为JPG格式
                if (fileStyle.toUpperCase() === 'JPEG') {
                    const renameReportFile = new File([item], item.name.substr(0, index + 1) + 'jpg', {type: 'image/jpg'});
                    param.append('file', renameReportFile);
                } else {
                    param.append('file', item)
                }
            } else {
                keepFiles.push(item)
            }
        });
        param.append('keepFiles', JSON.stringify(keepFiles))
        param.append('formData', JSON.stringify({model: formData}))
        try {
            let res = await dispatch({
                type: 'exam/questionCommitAction',
                payload: {
                    postData: {
                        data: param,
                        headers: {'Content-Type': 'multipart/form-data'}
                    },
                    info: {
                        appcode: '60652045'
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

                    // 提交成功
                    Modal.alert(exam.json['hrzzmb-000016'], '', [
                        {
                            text: exam.json['hrzzmb-000003'], onPress: () => {
                                NativeObj.closePage()
                            }
                        },
                        // 确定
                    ])
                }
            }
        } catch (e) {
            throw(e)
        }
    }

// 保存检验
    savaCheck = async () => {
        const {props} = this.comp;
        const {dispatch, exam, leftClick} = props;
        let formDataValue = exam.storeTwo.getFormData(exam.formId)


        try {
            let res = await dispatch({
                type: 'exam/transSaveCheckAction',
                payload: {
                    postData: {
                        editstate: exam.editstate,
                        formData: formDataValue,
                        isapprove: false,
                        pagecode: exam.pagecode
                    },
                    info: {
                        appcode: '60652045'
                    }

                }
            });
            if (res.success) {
                if (res.data.warning && res.data.confirmMsg) {
                    // 提示/确定
                    Modal.alert(exam.json['hrzzmb-000002'], res.data.warningMsg, [
                        {
                            text: exam.json['hrzzmb-000003'], onPress: () => {
                                Modal.alert(exam.json['hrzzmb-000002'], res.data.confirmMsg, [
                                    {text: exam.json['hrzzmb-000024']},
                                    {text: exam.json['hrzzmb-000003'], onPress: () => this.submit()},
                                ])
                            }
                        },
                    ])

                } else if (res.data.warning && !res.data.confirmMsg) {
                    Modal.alert(exam.json['hrzzmb-000002'], res.data.warningMsg, [
                        {text: exam.json['hrzzmb-000003'], onPress: () => this.submit()},
                    ])
                } else if (res.data.warning === false && res.data.confirmMsg) {
                    Modal.alert(exam.json['hrzzmb-000002'], res.data.confirmMsg, [
                        {text: exam.json['hrzzmb-000024']},
                        {text: exam.json['hrzzmb-000003'], onPress: () => this.submit()},
                    ])
                } else {
                    this.submit()
                }
            }
        } catch (e) {
            throw(e)
        }
    }

    // 确定指派
    examineFun = async () => {
        const {props} = this.comp
        const {dispatch, exam, leftClick} = props


        if (exam.peopleArr.length === 0) {
            Toast.info(exam.json['hrzzmb-000119'])//请指派审核人员
            return
        }
        let arr = []
        exam.peopleListData.content[0].uservos.forEach(item => {
            exam.peopleArr.forEach(j => {
                if (item.userpk === j) {
                    arr.push(item)
                }
            })
        })
        exam.peopleListData.content[0].uservos = arr
        dispatch({
            type: 'exam/update',
            payload: {
                peopleListData: exam.peopleListData
            }
        });

        try {
            let res = await dispatch({
                type: 'exam/transApplyAssignCommitAction',
                payload: {
                    postData: {
                        content: exam.peopleListData,
                        billid: exam.billid
                    },
                    info: {
                        appcode: '60652045'
                    }

                }
            });
            if (res.success) {
                if (res.data.errorMsg) {
                    Modal.alert(exam.json['hrzzmb-000002'], res.data.errorMsg, [
                        {text: exam.json['hrzzmb-000003'], onPress: () => leftClick()},
                    ])
                } else {

                    Modal.alert(exam.json['hrzzmb-000016'], '', [
                        {text: exam.json['hrzzmb-000003'], onPress: () => NativeObj.closePage()},
                    ])
                }
            }
        } catch (e) {
            throw(e)
        }

    }


    // 判断当前文件格式
    fileFormat = (file, ind) => {
        const {props} = this.comp
        const {dispatch, exam} = props

        let index = file.name.lastIndexOf('.')
        let fileStyle = file.name.substr(index + 1)
        if (fileStyle.length === 4) {
            fileStyle = fileStyle.substr(0, 3)
        }
        let fileStyleStr = fileStyle.toUpperCase()


        if (fileStyleStr === 'PDF') {
            let urlImg = exam.urlImg
            urlImg[ind] = pdf
            dispatch({
                type: 'exam/update',
                payload: {
                    urlImg: urlImg
                }
            });


        } else if (fileStyleStr === 'XLS') {
            let urlImg = exam.urlImg
            urlImg[ind] = excel
            dispatch({
                type: 'exam/update',
                payload: {
                    urlImg: urlImg
                }
            });

        } else if (fileStyleStr === 'DOC') {
            let urlImg = exam.urlImg
            urlImg[ind] = word
            dispatch({
                type: 'exam/update',
                payload: {
                    urlImg: urlImg
                }
            });

        } else if (
            fileStyleStr === 'JPE' ||
            fileStyleStr === 'PNG' ||
            fileStyleStr === 'JPG'
        ) {
            if (file.previewUrl) {

                let urlImg = exam.urlImg
                urlImg[ind] = file.previewUrl
                dispatch({
                    type: 'exam/update',
                    payload: {
                        urlImg: urlImg
                    }
                });

            } else {
                try {
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
                } catch (e) {

                }
            }

        }

    }
}