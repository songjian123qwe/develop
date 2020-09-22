import CommonAction from 'src/hrpub/common/actions';
import ProcessTmp from './processTemplate';

import { getBusinessInfo } from 'nc-lightapp-front';
import { snCreateUIDom, getAppPageConfig } from 'src/hrpub/common/utils/utils';
let businessInfo = getBusinessInfo() || {};

export default class MainAction extends CommonAction {
    constructor(comp) {
        super();
        this.comp = comp;
    }

    extend = [ProcessTmp]
    appConfig = getAppPageConfig();
    // appConfig = {
    //     appcode: '60651120',
    //     pagecode: '60651120p'
    // }

    // 处理模版
    processTemplate = (res) => {
        return this.selfProcessTemplate(res);
    }

    // 获取多语
    getCurrentLanguage = () => {
        const { props } = this.comp;
        const {
            dispatch,
            MultiInit
        } = props;
        MultiInit.getMultiLang({
            moduleId: 'ga6013',
            domainName: 'hrzz',
            callback: (json, status, init) => {
                dispatch({
                    type: 'emp/update',
                    payload: {
                        language: json
                    }
                });
            }
        });
    }

    getTemplate = (callback) => {
        const { props, action } = this.comp;
        const {
            meta,
            button,
            createUIDom
        } = props;
        return new Promise((resolve, reject) => {
            createUIDom(this.appConfig, (data = {}) => {
                console.log(data)
                let setmeta = this.processTemplate(this.processTemplates(data.template)) || {}
                meta.setMeta(setmeta, this.afterGetTemplate);
                button.setButtons(data.button || {});
                this.pubSub.publish('getMainTableData');
                this.update({
                    context: data.context,
                    templateFlag: true
                })
            });
        });
    }

    processTemplates = (template) => {
        const { props, action } = this.comp;
        const {
            exam,
            button
        } = props;
        // 给每个字段添加查询对象
        template['psninfo'].items.map((items) => {
            if (items.attrcode === 'pk_psnjob') {
                items.queryCondition = {};
            }
            if (items.attrcode === 'lic_no') {
                items.queryCondition = {};
            }
        });
        return template
    }

    // 初始化
    didMount = async () => {
        if (window.location.href.match('localhost:3006')) {
            window.location.hash = '#/ifr?page=2019'
        }
        this.getCurrentLanguage();
        this.getTemplate();
        this.comp.action.btnAct.initPageButton();
        this.subscribe();
        this.getMainTableHeight();
        // this.background();
        this.cardbackground();
    }
    //  获取内容页面高度，并且设置表格高度
    getMainTableHeight = () => {
        if (window.getComputedStyle) {
            let app = document.getElementById('app');
            let height = window.getComputedStyle(app).height.replace('px', '');
            this.update({
                pageHeight: height
            });
        }
    }
    afterGetTemplate = () => {
        this.routePage();
    } 
    // 根据url判断是进入到编辑页面还是进入到主页面表格
    routePage = async () => {
        const { props, action } = this.comp;
        const { getUrlParam, emp } = props;

        let scene = getUrlParam('scene');
        let id = getUrlParam('id');
        let status = getUrlParam('status');
        if (!scene && status) {
            scene = 'approvesce'
        }
        await this.update({
            pk_licbor: id
        })

        if (scene !== 'approvesce') {
            this.update({
                page: 'main'
            });
            return;
        }

        await this.update({
            orgValue: {
                refpk: businessInfo.groupId
            },
            fromApprove: true,
            page: 'edit'
        });
        // let methodsName = status === 'browse' ? 'toBrowsePage' : 'toEditPage'
        action.formAct.toBrowsePage();
    }

    // 本节点更新
    update = async (obj) => {
        const { props } = this.comp;
        const { dispatch } = props;

        await dispatch({
            type: 'emp/update',
            payload: obj
        });
    }
    // 事件订阅部分
    subscribe = () => {
        const { comp: { action }, pubSub } = this;
        pubSub.subscribe('getMainTableData', (...args) => {
            action.tableAct.getMainTableData(...args);
        });
        pubSub.subscribe('addOperatorButton', (...args) => {
            action.addOperatorButton(...args);
        })
        pubSub.subscribe('toBrowsePage', (...args) => {
            action.formAct.toBrowsePage(...args)
        })
    }

    // 通用关闭弹窗
    closeModal = (field) => {
        return () => {
            const { props } = this.comp;
            const { dispatch, emp } = props;
            dispatch({
                type: 'emp/update',
                payload: {
                    [field]: false
                }
            });
        }
    }
    background = () => {
        document.querySelector('body').classList.add('workbench-black', 'nc-lightapp-front-black')
        var a1 = document.createElement('link')
        a1.href = '/nccloud/resources/platform/nc-lightapp-front/nc-lightapp-front-black.css'
        a1.rel = "stylesheet"
        document.querySelector('head').appendChild(a1);
        document.querySelector('body').classList.remove('nc-no-theme')
    }
    cardbackground = () => {
        const { props } = this.comp;
        const { emp } = props;
        if (document.getElementsByTagName('body')[0].getAttribute('class').indexOf('nc-lightapp-front-black') > -1) {
            this.update({
                dark: true
            })
        }
    }
}

