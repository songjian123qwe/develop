


import CommonAction from '../../../../hrpub/common/actions';
import { getQueryCondition } from '../../../../hrpub/common/utils/utils';
import { cacheTools } from 'nc-lightapp-front';
export default class TableAction extends CommonAction {
    constructor(comp) {
        super();

        this.action = comp.action;
        this.comp = comp;
    }

    // 所有action实例化之后，将按钮的map绑定一下
    didAllInstance = () => {
        this.setRowClickHandleMap();
    }

    getMainTableData = async ({
        conditions,
        queryCondition,
        pageInfo,
        pk_org,
        orderBeginTime,
        billstate,  // all 
        orderEndTime,
        // oid,
        billTime,  // custom   oneweek onemonth threemonth 这个是time?
        time
    } = {}) => {
        const { props } = this.comp;
        const { search, emp, meta, dispatch, editTable } = props;
        // 保证调用方式有两种，传参，如果没有传惨就从store拿
        !queryCondition && (queryCondition = emp.queryCondition);
        !pageInfo && (pageInfo = emp.pageInfo);
        !pk_org && (pk_org = emp.orgValue ? emp.orgValue.refpk : '');
        !orderBeginTime && (orderBeginTime = emp.orderBeginTime);
        !billstate && (billstate = emp.orderStatus);
        !orderEndTime && (orderEndTime = emp.orderEndTime);
        let template = meta.getMeta();
        let oid = template['querybill'].oid;

        !time && (time = emp.orderTimeRange)
        let postData = {
            ...queryCondition,
            pageInfo: {
                ...pageInfo,
                pageIndex: pageInfo.pageIndex
            },
            pk_org,
            beginTime: orderBeginTime,
            billState: billstate.join(','),
            endTime: orderEndTime,
            oid,
            billTime: time
        };
        // let postData = {};

        // 如果是用户自定义时间范围则时间范围字段置空
        postData.time === 'custom' && (postData.time = '');



        try {
            let res = await dispatch({
                type: 'emp/getMainTableData',
                payload: {
                    postData: postData
                }
            });
            if (res.success) {
                let allpks = [];

                if (res.data && res.data.list) {
                    let pageInfo = this.deepCopy(res.data.list.pageInfo);

                    this.update({
                        pageInfo: {
                            ...pageInfo,
                            pageIndex: parseInt(pageInfo.pageIndex)
                        },
                        // tableSelectAll: false
                    });
                    allpks = res.data.list.rows.map((item) => {
                        return item.values['pk_licbor'].value;
                    })
                    editTable.setTableData('list', res.data.list, false);
                }
                else {
                    editTable.setTableData('list', { rows: [] }, false);
                }
                cacheTools.set('allpks', allpks);
            }
        }
        catch (e) {
            console.error(`getMainTableData: ${e}`);
        }
    }
    // 当用户点击了全部选择按钮
    // selectAll = (props, tableId, status) => {
    //     this.update({
    //         tableSelectAll: status
    //     });
    // }

    setRowClickHandleMap = () => {  // 这是之前的
        this.rowClickHandleMap = {
            // 删除
            'delete': this.action.rowAct.deleteRows,
            // 修改
            'edit': this.action.rowAct.editOnes,
            // 复制
            'copy': this.action.rowAct.copyOnes,
            // 附件管理
            'file_manager': this.action.btnAct.fileManager,
            // 查看审批详情
            'approveinfo': this.action.rowAct.previewApproveInfo,
            //刷新
            'refresh': this.action.formAct.toBrowsePage
        }
    }

    // 行上的操作按钮点击
    rowClickHandle = (key, record, index) => {
        let selectedRows = [record];
        this.rowClickHandleMap[key](selectedRows);
    }

    // 主页面主表格行双击事件
    doubleClick = (record, index, fProps, e) => {
        const { action } = this.comp;

        action.formAct.toBrowsePage(record);
    }

    // 主页面表格选中一行
    selectOneRow = (platformProps, tableId, record, index, status) => {
        const { props, action } = this.comp;
        const { editTable, emp } = props;

        let tableRows = editTable.getAllRows('list');
        let checkedRows = editTable.getCheckedRows('list');

        this.update({
            tableSelectAll: tableRows.length === checkedRows.length
        });
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
}