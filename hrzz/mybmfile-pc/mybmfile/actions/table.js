import React from "react";

export default class TableAction {
    constructor(comp) {
        this.comp = comp;
        this.dispatch = this.comp.props.dispatch;
    }

    getAllTableData = async () => {
        const {props} = this.comp;
        const {dispatch, main, meta} = props;
        const {startPeriod, endPeriod, bmClass, language} = main;
        if (!startPeriod.refpk || !endPeriod.refpk || !bmClass || bmClass.length === 0) {
            return;
        }
        try {
            let res = await dispatch({
                type: 'main/getTemplate',
                payload: {
                    starttime: startPeriod.refpk.slice(0, -2) + '-' + startPeriod.refpk.slice(-2),
                    endttime: endPeriod.refpk.slice(0, -2) + '-' + endPeriod.refpk.slice(-2),
                    pk_bm_class: bmClass.map(item => item.refpk).join()
                }
            });
            if (res.success) {
                await dispatch({
                    type: 'main/update',
                    payload: {
                        allPeriod: []
                    }
                });
                let allPeriod = res.data.periodtime || [];
                //res.data.template.bm_info.items.forEach(item => item.istotal = item.itemtype === 'number');
                //const area = JSON.stringify(res.data.template.bm_info);
                let template = meta.getMeta();
                template = {};
                template.gridrelation = {};
                allPeriod.forEach(period => {
                    const tempArea = res.data.template[period].bm_info;
                    tempArea.items.forEach(item => item.istotal = item.itemtype === 'number');
                    tempArea.code = period;
                    tempArea.name = language['hrzzpc-000130'] + period;
                    template[period] = tempArea;
                    template.gridrelation[period] = {
                        srcAreaCode: period,
                        tabRelation: [period]
                    }
                });
                const sumArea = res.data.sumtemplet.bm_info;
                sumArea.items.forEach(item => item.istotal = false);
                /*const index = sumArea.items.findIndex(item => item.attrcode === 'classname');
                if (index !== -1) {
                    sumArea.items.splice(index, 1);
                }*/
                sumArea.code = 'SUM';
                sumArea.name = language['hrzzpc-000131'];
                template.SUM = sumArea;
                template.gridrelation['SUM'] = {
                    srcAreaCode: 'SUM',
                    tabRelation: ['SUM']
                };
                meta.setMeta(template);
                allPeriod.push('SUM');
                dispatch({
                    type: 'main/update',
                    payload: {
                        allPeriod
                    }
                });
                this.getBmFileData();
            }
        } catch (e) {
            console.log(e)
        }
    };

    getBmFileData = async () => {
        const {props} = this.comp;
        const {dispatch, main, cardTable} = props;
        const {startPeriod, endPeriod, bmClass, allPeriod} = main;
        try {
            let res = await dispatch({
                type: 'main/getData',
                payload: {
                    starttime: startPeriod.refpk.slice(0, -2) + '-' + startPeriod.refpk.slice(-2),
                    endttime: endPeriod.refpk.slice(0, -2) + '-' + endPeriod.refpk.slice(-2),
                    pk_bm_class: bmClass.map(item => item.refpk).join()
                }
            });
            if (res.success) {
                allPeriod.forEach(period => {
                    cardTable.setTableData(period, {rows: res.data[period].bm_info.rows});
                });
                cardTable.toggleCardTable(allPeriod, true);
            }
        } catch (e) {

        }
    }
}