import React from "react";
import {toast, promptBox} from 'nc-lightapp-front';

const imageList = ['.png', '.jpg', '.gif', '.jpeg'];

export default class FormAction {
    constructor(comp) {
        this.comp = comp;
        this.dispatch = this.comp.props.dispatch;
    }

    getFormData = () => {
        const {props} = this.comp;
        const {main, form, dispatch} = props;
        const {areas, areaCodeList} = main;
        areaCodeList.forEach(async area => {
            if (areas[area] && areas[area].moduletype === 'form') {
                if (area === 'bd_psndoc') {
                    let res = await dispatch({
                        type: 'main/getPsnDoc',
                        payload: {
                            areaCode: area
                        }
                    });
                    if (res.success) {
                        form.setAllFormValue({[area]: res.data[area][area]});
                        this.updateConf(area, res.data);
                    }
                } else {
                    let res = await dispatch({
                        type: 'main/getSubData',
                        payload: {
                            areaCode: area
                        }
                    });
                    if (res.success) {
                        form.setAllFormValue({[area]: res.data.dataForm[area]});
                        this.updateConf(area, res.data);
                    }
                }
            }
        });
    };

    getOneFormData = async (area) => {
        const {props} = this.comp;
        const {form, dispatch} = props;
        if (area === 'bd_psndoc') {
            let res = await dispatch({
                type: 'main/getPsnDoc',
                payload: {
                    areaCode: area
                }
            });
            if (res.success) {
                form.setAllFormValue({[area]: res.data[area][area]});
                this.updateConf(area, res.data);
            }
            this.getPhoto();
        } else {
            let res = await dispatch({
                type: 'main/getSubData',
                payload: {
                    areaCode: area
                }
            });
            if (res.success) {
                form.setAllFormValue({[area]: res.data.dataForm[area]});
                this.updateConf(area, res.data);
            }
        }
    };

    updateConf = (area, data) => {
        const {props} = this.comp;
        const {main, dispatch} = props;
        const {areaConf} = main;
        if (areaConf[area]) {
            areaConf[area].isedit = data.isedit;
            areaConf[area].isneedapp = data.isneedapp;
        } else {
            areaConf[area] = {
                isedit: data.isedit,
                isneedapp: data.isneedapp,
                editing: false,
                changed: false
            }
        }
        dispatch({
            type: 'main/update',
            payload: {}
        });
    };

    getPhoto = async () => {
        const {props} = this.comp;
        const {dispatch} = props;
        let res = await dispatch({
            type: 'main/getPhoto',
            payload: {
                areaCode: 'bd_psndoc'
            }
        });
        if (res.success) {
            dispatch({
                type: 'main/update',
                payload: {
                    tempImg: res.data.image,
                    imageData: res.data.image
                }
            });
        }
    };

    uploadImg = (result, file) => {
        const {props} = this.comp;
        const {dispatch, main} = props;
        const {language} = main;
        let filename = file.name;
        let fileExt = filename.substring(filename.lastIndexOf('.'));
        if (imageList.includes(fileExt.toLowerCase())) {
            dispatch({
                type: 'main/update',
                payload: {
                    tempImg: result,
                    photoChange: true
                }
            });
        } else {
            toast({
                color: 'danger',
                content: language['hrzzpc-000082']
            });
        }
    };

    afterEditForm = (props, moduleId, key, value, oldValue) => {
        const {main, dispatch} = props;
        const {areaConf} = main;
        if (areaConf[moduleId].changed) return;
        areaConf[moduleId].changed = true;
        dispatch({
            type: 'main/update',
            payload: {}
        });
    };

    btnClick = (btn, area) => {
        switch (btn) {
            case 'edit':
                this.edit(area);
                break;
            case 'save':
                this.save(area);
                break;
            case 'cancel':
                this.cancel(area);
                break;
            default:
                break;
        }
    };

    edit = (area) => {
        const {props} = this.comp;
        const {main, dispatch, form} = props;
        const {areaConf} = main;
        form.setFormStatus(area, 'edit');
        areaConf[area].editing = true;
        dispatch({
            type: 'main/update',
            payload: {}
        });
    };

    save = async (area, needCheck = 'Y') => {
        const {props} = this.comp;
        const {main, dispatch, form} = props;
        const {areaConf, tempImg, photoChange, language} = main;
        if (needCheck === 'Y') {
            if (!form.isCheckNow(area)) return;
            /*if (!areaConf[area].changed && !photoChange) {
                toast({color: 'warning', content: language['hrzzpc-000079']});
                return;
            }*/
        }
        const data = form.getAllFormValue(area);
        let param = {
            areaCode: area,
            [area]: data,
            needCheck
        };
        if (area === 'bd_psndoc' && photoChange) {
            param.isphotochange = 'Y';
            param.image = tempImg;
        }
        let res = await dispatch({
            type: 'main/saveData',
            payload: param
        });
        if (res.success) {
            if (res.data) {
                promptBox({
                    color: "warning",
                    title: language['hrzzpc-000074'],
                    content: res.data,
                    beSureBtnClick: () => {
                        this.save(area, 'N')
                    }
                });
            } else {
                needCheck === 'Y' ? this.save(area, 'N') :
                    function () {
                        toast({color: 'success', content: language['hrzzpc-000080']});
                        form.setFormStatus(area, 'browse');
                        areaConf[area].editing = false;
                        areaConf[area].changed = false;
                        this.getOneFormData(area);
                        dispatch({
                            type: 'main/update',
                            payload: {}
                        });
                    }.call(this)
            }
        }
    };

    cancel = (area) => {
        const {props} = this.comp;
        const {main, dispatch, form} = props;
        const {areaConf, imageData, language} = main;
        promptBox({
            color: "warning",
            title: language['hrzzpc-000074'],
            content: language['hrzzpc-000081'],
            beSureBtnClick: () => {
                form.cancel(area);
                areaConf[area].editing = false;
                areaConf[area].changed = false;
                dispatch({
                    type: 'main/update',
                    payload: {
                        tempImg: imageData,
                        photoChange: false
                    }
                });
            }
        });
    };
}