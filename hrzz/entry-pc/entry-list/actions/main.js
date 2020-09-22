import React from "react";
import {getAppPageConfig} from "src/hrpub/common/utils/utils";

export default class MainAction {
    constructor(comp) {
        this.comp = comp;
    }

    appConfig = getAppPageConfig();

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
    getTemplate = () => {
        const {props} = this.comp;
        const {
            meta,
            button,
            dispatch,
            createUIDom
        } = props;

        createUIDom(this.appConfig, (res) => {
            dispatch({
                type: 'main/update',
                payload: {
                    context: res.context
                }
            });
            meta.setMeta(res.template);
            button.setButtons(res.button);
        });
    };

    // 初始化
    didMount = () => {
        if (window.location.href.match('localhost:3006')) {
            window.location.hash = `#/ifr?page=20198162232323`;
        }
        this.getLanguage(() => {
            this.getTemplate();
        });
        this.comp.action.treeAct.getTreeData();
    };
}