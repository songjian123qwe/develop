
import Common from '../../../../hrpub/common/actions';
import { cacheTools } from 'nc-lightapp-front';
export default class RowHandle extends Common {
    constructor(comp) {
        super();
        this.comp = comp;
    }

    //指派弹窗确定事件
    getResult = async (value) => {
        const { props, action } = this.comp
        const { emp, form, editTable } = props
        let record = []
        if (emp.page !== 'main') {
            record = this.deepCopy(form.getAllFormValue('card').rows[0]);
        } else {
            record = editTable.getClickRowIndex('list').record;
        }
        await this.submitOnes(record, value)
    }

    // //指派弹窗取消事件
    turnOff = () => {
        const { props } = this.comp
        const { dispatch } = props
        this.update({
            compositedata: null,
            compositedisplay: false,
        })
    }

    // 获取选中的数据
    getSelectedRows = (selectedRows) => {
        const { props } = this.comp;
        const { emp, editTable } = props;

        if (!selectedRows) {
            selectedRows = [];
        }

        if (selectedRows.length > 0) {
            if (emp.tableSelectAll) {
                //获取表格数据
                selectedRows = editTable.getAllRows('list');
            }
            else {
                //获取选中行数据
                selectedRows = editTable.getCheckedRows('list').map((item) => {
                    return item.data;
                });
            }
        }

        if (selectedRows.length <= 0) {
            this.toast({
                color: 'warning',
                content: emp.language['ga6013-000005'] // 请先勾选待操作的数据!
            });
            return false
        }
        return selectedRows
    }

    // 提交某个单据 selectedRows = [],compositepostdata = null
    submitOnes = async (record, compositepostdata = {}) => {
        const { props, action } = this.comp;
        const { emp, dispatch, button } = props;
        let billids = [];
        // selectedRows = this.getSelectedRows(selectedRows);
        if (record) {
            billids.push(record.values.pk_licbor.value);
            this.update({ pk_licbor: record.values.pk_licbor.value })
        } else {
            billids.push(emp.pk_licbor)
        }
        let postData = {
            billids: billids
        };

        // postData.pk_licbor = selectedRows.map((item) => {
        //     return item.values['pk_licbor'].value
        // });

        if (compositepostdata && compositepostdata.content) {
            postData = Object.assign({}, postData, { content: compositepostdata })
        }
        this.promptBox({
            color: "warning",
            title: emp.language["ga6013-000060"],/* 国际化处理： 提示*/
            content: emp.language["ga6013-000061"],/* 国际化处理： 是否确认提交*/
            beSureBtnClick: async () => {
                try {
                    let res = await dispatch({
                        type: 'emp/submitBill',
                        payload: {
                            postData: postData
                        }
                    });
                    if (res.success) {
                        if (res.data) {
                            if (res.data.content) { // 是否返回content
                                this.update({
                                    compositedisplay: true,
                                    compositedata: res.data.content
                                })
                                return;
                            }
                        } else {
                            if (this.checkErrorMsg(res)) {
                                this.toast({
                                    color: 'success',
                                    content: emp.language['ga6013-000006'] // 提交成功
                                });
                                this.update({ compositedisplay: false, compositedata: null })
                            }

                        }
                        if (emp.page !== 'main') {
                            action.formAct.toBrowsePage();
                        }
                        this.pubSub.publish('getMainTableData');
                    }

                }
                catch (e) {
                }
            }
        });
    }

    // 收回
    callbackOnes = async (record) => {
        const { props, action } = this.comp;
        const { dispatch, emp } = props;

        // selectedRows = this.getSelectedRows(selectedRows);

        // if (record) {
        //     let postData = {
        //         pk_licbor: [],
        //         pk_org: emp.orgValue.refpk
        //     };
        // }
        // postData.pk_licbor = selectedRows.map((item) => {
        //     return item.values['pk_licbor'].value;
        // });
        let billids = [];
        // selectedRows = this.getSelectedRows(selectedRows);
        if (record) {
            billids.push(record.values.pk_licbor.value)
        } else {
            billids.push(emp.pk_licbor)
        }
        let postData = {
            billids: billids
        };
        try {
            let res = await dispatch({
                type: 'emp/callbackBill',
                payload: {
                    postData: postData
                }
            });

            if (res.success && this.checkErrorMsg(res)) {
                this.toast({
                    color: 'success',
                    content: emp.language['ga6013-000007'] // 收回成功
                });

                // 浏览页面  返回浏览态时的按钮显示

            }
        }
        catch (e) {
        }
        this.pubSub.publish('getMainTableData');

    }

    // 修改
    editOnes = (record) => {
        const { action } = this.comp;

        // selectedRows = this.getSelectedRows(selectedRows);

        if (record) {
            action.formAct.toEditPage(record);
        }
    }

    // 删除主表格行
    deleteRows = async (record) => {
        const { props, action } = this.comp;
        const { emp, dispatch, cardPagination, button } = props;
        let result = true;

        // selectRows = action.rowAct.getSelectedRows(selectRows);
        if (record) {
            this.promptBox({
                color: "warning",
                title: emp.language['ga6013-000008'],/* 国际化处理： 提示*/
                content: emp.language['ga6013-000009'],/* 国际化处理： 确定要删除所选数据吗？*/
                beSureBtnClick: async () => {
                    let billids = [record.values.pk_licbor.value]
                    let postData = {
                        billids: billids
                    }
                    try {
                        let res = await dispatch({
                            type: 'emp/deleteTableRows',
                            payload: {
                                postData: postData
                            }
                        });

                        if (res.success && this.checkErrorMsg(res)) {
                            this.toast({
                                color: 'success',
                                content: emp.language['ga6013-000010'] // 删除成功
                            });
                            if (emp.addPageStatus === 'browse') {
                                let allpks = cacheTools.get('allpks') || [];
                                let index = 0;
                                let len = allpks.length;
                                len && allpks.map((v, i) => {
                                    if (v == billids) {
                                        allpks.splice(i, 1);
                                        if (i < len - 1) {
                                            index = i;
                                        } else if (i == len - 1) {
                                            index = i - 1;
                                        }
                                    }
                                })
                                cacheTools.set('allpks', allpks);
                                cardPagination.setCardPaginationId({ id: allpks[index], status: 1 });
                                if (cacheTools.get('allpks').length <= 0) {
                                    this.update({
                                        page: 'main'
                                    });

                                    button.setButtonVisible(emp.visible_main);
                                    this.pubSub.publish('getMainTableData');
                                    return;
                                } else {
                                    // 渲染下一条数据
                                    action.formAct.toBrowsePage({
                                        values: {
                                            pk_licbor: {
                                                value: allpks[index]
                                            }
                                        }
                                    });
                                }
                            }
                            this.pubSub.publish('getMainTableData');
                        }
                    }
                    catch (e) {
                        result = false;
                    }

                }
            });



            // selectRows.map((item) => {
            //     postData.pk_licbor.push(item.values.pk_licbor['value']);
            // });

            // return result;
        }
    }

    // 复制一个单据   
    // copyOnes = async (selectRows) => {
    //     const { props, action } = this.comp;
    //     const { emp, dispatch } = props;

    //     selectRows = action.rowAct.getSelectedRows(selectRows);
    //     if (selectRows) {
    //         let postData = {
    //             pk_licbor: selectRows[0].values['pk_licbor'].value,
    //             pk_org: emp.orgValue.refpk
    //         };
    //         try {
    //             let res = await dispatch({
    //                 type: 'emp/copyOneBill',
    //                 payload: {
    //                     postData: postData
    //                 }
    //             });

    //             if (res.success && this.checkErrorMsg(res)) {
    //                 action.formAct.toEditPage(selectRows, res.data.form.head.card);
    //             }
    //         }
    //         catch (e) {
    //         }
    //     }
    // }

    // 检查返回值里是否有 errorMsg
    checkErrorMsg = (res) => {
        if (res && res.data && (res.data.errorMsg || res.data.message)) {
            this.toast({
                color: 'danger',
                content: res.data.errorMsg || res.data.message
            });
            return false
        }

        return true;
    }

    // 查看审批详情 
    previewApproveInfo = (selectedRows) => {
        const rowData = selectedRows.values;
        let billType = rowData['pk_billtype'].value || '6101';
        let pk_licbor = selectedRows.values['pk_licbor'].value;

        this.update({
            approveModalVisible: true,
            approveBillType: billType,
            approveBillId: pk_licbor
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