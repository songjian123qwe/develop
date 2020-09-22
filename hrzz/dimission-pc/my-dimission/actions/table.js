import React from "react";
import {toast, promptBox} from 'nc-lightapp-front';
import handlePks from './handleAllpks';

export default class TableAction {
    constructor(comp) {
        this.comp = comp;
        this.dispatch = this.comp.props.dispatch;
    }

    //获取表格高度
    getTableHeight = () => {
        const mainTable = document.getElementsByClassName('layout-content-wrapper');
        let tableHeight = 0;
        if (mainTable[0]) {
            tableHeight = mainTable[0].clientHeight - 74
        }
        return tableHeight;
    };

    getData = async () => {
        const {props, action} = this.comp;
        const {dispatch, main, table} = props;
        const {pageInfo} = main;
        let res = await dispatch({
            type: 'main/getData',
            payload: {
                pageInfo
            }
        });
        if (res.success) {
            if (res.data) {
                table.setAllTableData('list', {
                    rows: res.data['list'].rows
                });
                handlePks.set(res.data['list'].rows.map(row => row.values.pk_hi_stapply.value));
                dispatch({
                    type: 'main/update',
                    payload: {
                        pageInfo: res.data['list'].pageInfo || {
                            pageSize: 10,
                            pageIndex: 1,
                            total: 0,
                            totalPage: 1
                        }
                    }
                });
            } else {
                table.setAllTableData('list', {
                    rows: []
                });
                handlePks.set([]);
                dispatch({
                    type: 'main/update',
                    payload: {
                        pageInfo: {
                            pageSize: 10,
                            pageIndex: 1,
                            total: 0,
                            totalPage: 1
                        }
                    }
                });
            }
        }
    };

    pageSizeChange = async (pageSize) => {
        const {props} = this.comp;
        const {dispatch, main} = props;
        const {pageInfo} = main;
        await dispatch({
            type: 'main/update',
            payload: {
                pageInfo: {
                    ...pageInfo,
                    pageSize,
                    pageIndex: 1
                }
            }
        });
        this.getData();
    };

    changePage = async (pageIndex) => {
        const {props} = this.comp;
        const {dispatch, main} = props;
        const {pageInfo} = main;
        await dispatch({
            type: 'main/update',
            payload: {
                pageInfo: {
                    ...pageInfo,
                    pageIndex: pageIndex
                }
            }
        });
        this.getData();
    }
}