import React from "react";
import {getAppPageConfig} from "src/hrpub/common/utils/utils";

const {appcode, pagecode} = getAppPageConfig();
export default class MainAction {
    constructor(comp) {
        this.comp = comp;
    }

    appConfig = {
        pagecode,
        appcode
    };

    // 获取多语
    getLanguage = (backFn) => {
        const {props} = this.comp;
        const {
            dispatch,
            MultiInit
        } = props;

        MultiInit.getMultiLang({
            moduleId: 'hrzzpc',
            domainName: 'hrzz',
            callback: async (json, status, init) => {
                await dispatch({
                    type: 'main/update',
                    payload: {
                        language: json
                    }
                });
                backFn && backFn();
            }
        });
    };

    // 获取模版信息
    getTemplate = async () => {
        const {props, action} = this.comp;
        const {dispatch, meta} = props;

        let res = await dispatch({
            type: 'main/getTemplate',
            payload: {}
        });
        if (res.success) {
            meta.setMeta(this.processTemplate(res.data.allArea));
            const disabledAreas = this.getDisabledAreas(res.data);
            await dispatch({
                type: 'main/update',
                payload: {
                    disabledAreas,
                    areas: res.data.allArea,
                    areaCodeList: res.data.areaCodeList
                }
            });
            action.tableAct.closeCardTable();
            action.formAct.getFormData();
            action.formAct.getPhoto();
        }
    };

    getDisabledAreas = (data) => {
        let tempAreas = [];
        data.areaCodeList.forEach(area => {
            const index = data.allArea[area].items.findIndex(item => item.visible && !item.disabled);
            if (index === -1) tempAreas.push(area);
        });
        return tempAreas;
    };

    // 处理模版数据
    processTemplate = (template) => {
        try {
            let index = template.bd_psndoc.items.findIndex(item => item.attrcode === 'photo');
            if (index > -1) template.bd_psndoc.items.splice(index, 1);
        } catch (e) {

        }
        return template;
    };

    // 初始化
    didMount = () => {
        if (window.location.href.match('localhost:3006')) {
            window.location.hash = `#/ifr?page=20198162232323`;
        }
        this.getLanguage(() => {
            this.getTemplate();
        });
    };
}