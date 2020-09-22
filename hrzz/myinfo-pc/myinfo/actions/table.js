import React from "react";
import TableOperator from "../components/TableOperator";
import {toast, promptBox} from 'nc-lightapp-front';

export default class TableAction {
    constructor(comp) {
        this.comp = comp;
        this.dispatch = this.comp.props.dispatch;
        this.searchedItems = new Set();
    }

    closeCardTable = () => {
        const {props} = this.comp;
        const {main, cardTable} = props;
        const {areaCodeList} = main;
        areaCodeList.forEach(area => cardTable.toggleCardTable(area, false))
    };

    renderTableHead = (area) => {
        const {props} = this.comp;
        const {main} = props;
        const {areaConf, disabledAreas, language} = main;
        return (
            <TableOperator
                language={language}
                area={area}
                areaConf={areaConf}
                disabledAreas={disabledAreas}
                action={this.btnClick}
            />
        )
    };

    getTableData = async (props, areaCode, value) => {
        if (!value || this.searchedItems.has(areaCode)) return;
        this.getDataAct(areaCode);
    };

    getDataAct = async (areaCode) => {
        const {props} = this.comp;
        const {dispatch, cardTable} = props;
        let res = await dispatch({
            type: 'main/getSubData',
            payload: {
                areaCode
            }
        });
        if (res.success) {
            if (res.data && res.data.dataGrid) {
                cardTable.setTableData(areaCode, res.data.dataGrid[areaCode]);
            } else {
                cardTable.setTableData(areaCode, {rows: []});
            }
            this.updateConf(areaCode, res.data);
            this.searchedItems.add(areaCode);
        }
    };

    updateConf = (area, data) => {
        const {props} = this.comp;
        const {main, dispatch} = props;
        const {areaConf, areas, language} = main;
        if (areaConf[area]) {
            areaConf[area].isedit = data.isedit;
            areaConf[area].isneedapp = data.isneedapp;
        } else {
            areaConf[area] = {
                isedit: data.isedit,
                isneedapp: data.isneedapp,
                editing: false
            }
        }
        if (data.isneedapp === 'Y') {
            if (!areas[area].oldName) areas[area].oldName = areas[area].name;
            areas[area].name = areas[area].oldName + ' (' + language['hrzzpc-000104'] + ')'
        }
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
            case 'addLine':
                this.insertLine(area);
                break;
            case 'delete':
                this.deleteLines(area);
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
        const {main, dispatch, cardTable} = props;
        const {areaConf} = main;
        cardTable.setStatus(area, 'edit');
        areaConf[area].editing = true;
        this.addAction(area);
        dispatch({
            type: 'main/update',
            payload: {}
        });
    };

    save = async (area, needCheck = 'Y') => {
        const {props, action} = this.comp;
        const {main, dispatch, cardTable} = props;
        const {areaConf, language} = main;
        const data = cardTable.getAllData(area);
        if (needCheck === 'Y') {
            if (!cardTable.checkTableRequired(area)) return;
            /*if (data.rows.findIndex(row => row.status !== '0') === -1) {
                toast({color: 'warning', content: language['hrzzpc-000079']});
                return;
            }*/
        }

        let param = {
            areaCode: area,
            [area]: data,
            needCheck
        };
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
                        this.hideAction(area);
                        toast({color: 'success', content: language['hrzzpc-000080']});
                        cardTable.setStatus(area, 'browse');
                        areaConf[area].editing = false;
                        //cardtable保存之后数据状态不会改成0，这里干脆重新查一遍算了
                        this.getDataAct(area);
                        /*if (area === 'hi_psndoc_edu') {
                            action.formAct.getFormData();
                        }*/
                        action.formAct.getFormData();
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
        const {main, dispatch, cardTable} = props;
        const {areaConf, language} = main;
        promptBox({
            color: "warning",
            title: language['hrzzpc-000074'],
            content: language['hrzzpc-000081'],
            beSureBtnClick: () => {
                this.hideAction(area);
                cardTable.setStatus(area, 'browse');
                areaConf[area].editing = false;
                this.getDataAct(area);
                dispatch({
                    type: 'main/update',
                    payload: {}
                });
            }
        });
    };

    deleteLines = (area) => {
        const {props} = this.comp;
        const {cardTable, main} = props;
        const {language} = main;
        const checkedRows = (cardTable.getCheckedRows(area) || []).map(row => row.index);
        if (checkedRows.length === 0) {
            toast({color: 'warning', content: language['hrzzpc-000083']});
            return;
        }
        cardTable.delRowsByIndex(area, checkedRows);
    };

    deleteLine = (area, record, index) => {
        const {props} = this.comp;
        const {cardTable} = props;
        cardTable.delRowsByIndex(area, index);
    };

    insertLine = (area, record, index) => {
        const {props} = this.comp;
        const {cardTable} = props;
        cardTable.addRow(area, index);
    };

    addAction = (area) => {
        const {props} = this.comp;
        const {meta, main} = props;
        const {language} = main;
        let template = meta.getMeta();
        if (template[area].items.findIndex(item => item.attrcode === 'opr') > -1) return;
        template[area].items.push({
            itemtype: 'customer',
            width: '120px',
            label: language['hrzzpc-000084'],/* 国际化处理： 操作*/
            visible: true,
            fixed: 'right',
            attrcode: 'opr',
            render: (text, record, index) => {
                return (
                    <div>
                        <a
                            href="javascript:void(0)"
                            className="operator-btn"
                            onClick={() => {
                                this.deleteLine(area, record, index)
                            }}
                        >
                            {language['hrzzpc-000085']}
                        </a>
                        <a
                            href="javascript:void(0)"
                            className="operator-btn"
                            onClick={() => {
                                this.insertLine(area, record, index)
                            }}
                        >
                            {language['hrzzpc-000086']}
                        </a>
                    </div>
                );
            }
        });
        meta.setMeta(template);
    };

    hideAction = (area) => {
        const {props} = this.comp;
        const {meta} = props;
        let template = meta.getMeta();
        const index = template[area].items.findIndex(item => item.attrcode === 'opr');
        if (index === -1) return;
        template[area].items.splice(index, 1);
        meta.setMeta(template);
    };
}