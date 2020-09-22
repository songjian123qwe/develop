import React from "react";
import {getAppPageConfig} from 'src/hrpub/common/utils/utils';
import RowOperator from "../components/RowOperator";

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
            meta.setMeta(this.processTemplate(res.template, res.button));
            button.setButtons(res.button);
        });
    };

    // 处理模版数据
    processTemplate = (template, btnConf = []) => {
        const {props: {main: {language}}, action} = this.comp;

        const billCodeItem = template['list'].items.find(item => item.attrcode === 'bill_code');
        if (billCodeItem) {
            billCodeItem.render = (text, record, index) => {
                return (
                    <span
                        className="simple-table-title"
                        style={{color: '#007ace', cursor: 'pointer'}}
                        onClick={() => {
                            action.formAct.checkOneBill(record)
                        }}
                    >
                        {record && record['bill_code'] && record['bill_code'].value}
                    </span>
                );
            };
        }

        if (btnConf.findIndex(btn => btn.key === 'file_manage') > -1) {
            template['list'].items.push({
                attrcode: 'opr',
                itemtype: 'customer',
                hyperlinkflag: false,
                label: language['hrzzpc-000091'], /* 国际化处理： 附件管理*/
                width: '120px',
                textAlign: 'center',
                visible: true,
                fixed: 'right',
                render: (text, record, index) => {
                    return <a style={{cursor: 'pointer'}}>
                        <i className="icon iconfont icon-fujianshenpi" onClick={() => {
                            action.formAct.fileManage(record)
                        }}/>
                    </a>
                }
            });
        }

        template['list'].items.push({
            itemtype: 'customer',
            width: '164px',
            label: language['hrzzpc-000084'],/* 国际化处理： 操作*/
            visible: true,
            fixed: 'right',
            attrcode: 'opr',
            render: (text, record, index) => {
                return <RowOperator
                    btnConf={btnConf}
                    language={language}
                    record={record}
                    onClick={action.formAct.tabBtnClick}
                />
            }
        });

        return template
    };

    // 初始化
    didMount = () => {
        if (window.location.href.match('localhost:3006')) {
            window.location.hash = `#/ifr?page=20198162232323`;
        }
        this.getLanguage(() => {
            this.getTemplate();
        });
        this.comp.action.btnAct.updateBtnStatus();
        this.comp.action.tableAct.getData();
    };
}