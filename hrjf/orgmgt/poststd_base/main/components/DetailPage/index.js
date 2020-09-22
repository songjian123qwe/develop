/**
 * 详情页
 */
import React, {Component} from 'react';

import './index.less';
import {high, createPage, base, getUrlParam, promptBox, toast, cardCache, cacheTools} from 'nc-lightapp-front';
import Refer from '../../../../../refer/jfref/JobLevelGridRef';
import AddCondition from "../../../../../public/functions/addCondition";
import QueryOneAction from "./functions/QueryOneAction";
import SaveAction from "./functions/SaveAction";
import QueryOneSucc from "./functions/QueryOneSucc";
import CapaSelAction from "../../../../hrpost/functions/CapaSelAction";
import {THEME} from "../../../../../public/theme/theme";
import {COMMON} from "../../common/common";
import {saveValidate} from "../../../../../public/functions/orgtools";

let {setDefData, getDefData} = cardCache;
const {NCButton, NCAnchor, NCScrollLink, NCScrollElement} = base;
const formId = COMMON.poststd_card;
const tableIdArr = [];
const conf = COMMON.referConfig;

class DetailPage extends Component {
    constructor(props) {
        super(props);
        this.chooseTableId = ''; // table  表 点击新增或插入时 赋值； 参照选择时运用
        // 职级职等参照需要
        this.levelAdd = false; //职级职等增加标志   false: 插入；  true: 增加；
        this.intType = null; //职务类别：1：职务； 2：岗位序列
        this.pk_filtertype = null; // 根据intType 决定值； 当intType为1时 取 职务的值；为2时取岗位序列的值
        this.pk_post = this.props.pk_post;
        this.levelrelationChange = false;
        this.selectedManagerRow = {};
        this.copyManagerRow = {};
        // tableIdArr.map((item) => {
        props.gridrelationTable.map((item) => {
            if (item.moduletype !== 'table') return;
            let tableId = item.code;
            tableIdArr.push(tableId);
            this.selectedManagerRow[tableId] = {
                index: 0,
                row: null
            };
            this.copyManagerRow[tableId] = {
                index: 0,
                row: null
            }
        });
        this.state = {
            json: props.json,
            gridrelationTable: props.gridrelationTable,
            isEditing: props.isEditing,
            rowPks: [],
            inheritflag: false, // 完全继承来源标志  false: 知己职能表格可编辑  false: 职级职等表格不可编辑
            getQueryCondition: {}, // 职级参照查询条件
            loaddingData: false, // 加载数据
        };
    }

    componentWillReceiveProps(nextprops) {
        let nextjson = JSON.stringify(nextprops.json);
        let thisjson = JSON.stringify(this.props.json);
        if (nextjson !== thisjson || this.props.isEditing !== nextprops.isEditing) {
            this.setState({
                json: nextprops.json,
                isEditing: nextprops.isEditing,
            })
        }
        let nextGrid = JSON.stringify(nextprops.gridrelationTable);
        let thisGrid = JSON.stringify(this.props.gridrelationTable);
        if (nextGrid !== thisGrid) {
            nextprops.gridrelationTable.map((item) => {
                if (item.moduletype !== 'table') return;
                let tableId = item.code;
                tableIdArr.push(tableId);
                this.selectedManagerRow[tableId] = {
                    index: 0,
                    row: null
                };
                this.copyManagerRow[tableId] = {
                    index: 0,
                    row: null
                }
            });
        }

    }

    checkBtnDisable(tableid, key) {
        // 是否可编辑的 列表  岗位能力素质指标
        const disableTableId = ["om_postcapa"];
        // 如果是非编辑态 则各按钮均不能点击
        if (!this.props.isEditing) {
            return true
        }
        // 编辑态 待确定可编辑的表格
        if (disableTableId.includes(tableid)) {
            // 修改时 根据 详情信息返回的数据 确定表格是否可编辑
            return this.state.cpFlag
        }
        //   如果完全继承来源 则 职级职等部门不可编辑
        if (tableid === 'poststd_levelrelation') {
            if (key === 'inset' || key === 'copy' || key === 'paste') {

                return true
            }
            let inheritflag = this.props.form.getFormItemsValue(formId, 'inheritflag').value;
            return this.state.inheritflag || inheritflag
        }
        return false
    }

    getCardTableHead = (tableid) => {
        return (
            <div className='shoulder-definition-area'>
                <div className='definition-icons'>
                    <NCButton
                        colors="secondary"
                        onClick={() => {
                            this.orgmanagersAddInfo(tableid)
                        }}
                        disabled={this.checkBtnDisable(tableid, 'add')}
                    >
                        {this.state.json['jf6005-000083']}{/* 国际化处理： 新增行*/}
                    </NCButton>
                    <NCButton
                        colors="secondary"
                        onClick={() => {
                            this.orgmanagersInsertInfo(tableid)
                        }}
                        disabled={this.checkBtnDisable(tableid, 'inset')}
                    >
                        {this.state.json['jf6005-000084']}{/* 国际化处理： 插入行*/}
                    </NCButton>
                    <NCButton
                        colors="default"
                        onClick={() => {
                            this.orgmanagersDelInfo(tableid)
                        }}
                        disabled={this.checkBtnDisable(tableid, 'delete')}
                    >
                        {this.state.json['jf6005-000085']}{/* 国际化处理： 删除行*/}
                    </NCButton>

                    <NCButton
                        colors="secondary"
                        onClick={() => {
                            this.orgmanagersCopyInfo(tableid)
                        }}
                        disabled={this.checkBtnDisable(tableid, 'copy')}
                        // disabled={true}
                    >
                        {this.state.json['jf6005-000086']}{/* 国际化处理： 复制行*/}
                    </NCButton>
                    <NCButton
                        colors="secondary"
                        onClick={() => {
                            this.orgmanagersPasteInfo(tableid)
                        }}
                        disabled={this.checkBtnDisable(tableid, 'paste')}
                        // disabled={true}
                    >
                        {this.state.json['jf6005-000087']}{/* 国际化处理： 粘贴行*/}
                    </NCButton>
                </div>
            </div>
        );
    };

    addLevelrelation() {
        // 职务的值
        let pk_job = this.props.form.getFormItemsValue(formId, 'pk_job').value;
        // 岗位序列
        let pk_postseries = this.props.form.getFormItemsValue(formId, 'pk_postseries').value;

        if (!pk_job && !pk_postseries) {
            toast({
                color: "info",
                content: this.state.json['jf6005-000324']/* 国际化处理： 请先设置职务或者岗位序列*/
            });
            return
        }

        this.intType = pk_job ? 1 : 2;
        this.pk_filtertype = pk_job ? pk_job : pk_postseries;

        this.setState({
            getQueryCondition: () => {
                return {
                    intType: this.intType,
                    pk_filtertype: this.pk_filtertype
                }
            }
        }, () => {
            document.getElementById('refer-container-button').click();
        });
    }

    /**
     * 新增行
     */
    orgmanagersAddInfo = (tableid) => {
        if (tableid === 'poststd_levelrelation') {
            this.chooseTableId = tableid;
            // 如果是职级职等 true表示新增   false:
            this.levelAdd = true;
            this.addLevelrelation();
        } else {
            this.props.cardTable.addRow(tableid)
        }
    };

    /**
     * 插入行
     */
    orgmanagersInsertInfo(tableid) {
        let index;
        if (this.selectedManagerRow[tableid].index || this.selectedManagerRow[tableid].index === 0) {
            index = this.selectedManagerRow[tableid].index;
        }
        if (tableid === 'poststd_levelrelation') {
            // 如果是职级职等 则显示参照弹窗
            this.levelAdd = false;
            this.addLevelrelation();
        }
        this.props.cardTable.addRow(tableid, index)
    }

    /**
     * 删除行
     */
    orgmanagersDelInfo(tableid) {
        if (this.chooseTableId !== tableid || !this.selectedManagerRow[tableid].row) {
            toast({
                color: "danger",
                content: this.state.json['jf6005-000325']/* 国际化处理： 请先选择数据！*/
            });
            return
        }
        let _this = this;
        promptBox(
            {
                color: "warning",
                title: this.state.json['jf6005-000056'], /* 国际化处理： 提示*/
                content: this.state.json['jf6005-000057'], /* 国际化处理： 您确定要删除吗？*/
                beSureBtnClick: () => {
                    _this.props.cardTable.delRowsByIndex(tableid, _this.selectedManagerRow[tableid].index, (tableId, index, table) => {
                        if (index >= table.rows.length) {
                            _this.selectedManagerRow[tableid] = {
                                row: null,
                                index: null
                            }
                        }
                    });
                }
            }
        )
    }

    /**
     * 复制
     */
    orgmanagersCopyInfo(tableid) {
        if (this.chooseTableId !== tableid || !this.selectedManagerRow[tableid].row) {
            toast({
                color: "danger",
                content: this.state.json['jf6005-000325']/* 国际化处理： 请先选择数据！*/
            });
            return
        }
        this.copyManagerRow[tableid].row = this.selectedManagerRow[tableid].row;
        this.copyManagerRow[tableid].row.values.pk_post_sub.value = null;

        // pk_post_sub
        this.copyManagerRow[tableid].index = this.selectedManagerRow[tableid].index;
        toast({
            color: "success",
            content: this.state.json['jf6005-000058']/* 国际化处理： 请先设置职务或者岗位序列*/
        })

    }

    /**
     * 粘贴
     */
    orgmanagersPasteInfo(tableid) {
        if (!this.copyManagerRow[tableid].row) {
            toast({
                color: "danger",
                content: this.state.json['jf6005-000326']/* 国际化处理： 没有复制行，不能粘贴！*/
            });
            return
        }
        // let data = this.copyManagerRow[tableid].row;
        let index = this.copyManagerRow[tableid].index || 0;
        this.props.cardTable.pasteRow(tableid, index);
    }

    /**
     * 点击table 行
     * @param record
     * @param index
     * @param e
     */
    orgmanagerRowClick(props, tableid, record, index, e) {
        this.chooseTableId = tableid;
        this.selectedManagerRow[tableid].row = record;
        this.selectedManagerRow[tableid].index = index;
    }

    /**
     * 新增职级职等
     * @param data
     */
    referChange(data) {
        this.levelrelationChange = true;
        data.map(item => {
            item.values.pk_joblevel.display = item.refname;
            // '0'初始态, '1'已修改, '2'新增, '3'删除
            item.status = '2';
        });
        this.props.cardTable.setTableData("poststd_levelrelation", {rows: data});
        this.props.cardTable.setStatus("poststd_levelrelation", 'edit');

    }

    onBeforeEvent(props, tableid, key, value, index, record) {
        if (tableid !== 'poststd_levelrelation') {
            return true
        }
        let meta = this.props.meta.getMeta();
        let pk_joblevel = record.values.pk_joblevel.value;
        if (key === 'jobrank') {
            // 职务的值
            let pk_job = this.props.form.getFormItemsValue(formId, 'pk_job').value;
            // 岗位序列
            let pk_postseries = this.props.form.getFormItemsValue(formId, 'pk_postseries').value;

            if (!pk_job && !pk_postseries) {
                toast({
                    color: "info",
                    content: this.state.json['jf6005-000324']/* 国际化处理： 请先设置职务或者岗位序列*/
                });
                return true
            }

            this.intType = pk_job ? 1 : 2;
            this.pk_filtertype = pk_job ? pk_job : pk_postseries;

            let queryCondition = {
                intType: this.intType,
                pk_filtertype: this.pk_filtertype,
                pk_joblevel
            };
            AddCondition(meta["poststd_levelrelation"], {
                ...queryCondition
            }, key);
            meta["poststd_levelrelation"].items.map(item => {
                if (item.attrcode === 'jobrank') {
                    item.isMultiSelectedEnabled = true;
                }
            });
            this.props.meta.setMeta(meta);
        } else if (key === 'defaultrank') {
            //console.log(record.values.jobrank.value)
            if (!record.values.jobrank.value) {
                toast({color: "warning", content: this.state.json['jf6005-000309']})/* 国际化处理： 请先设置职等!*/
                return false
            }
            const arr_str = record.values.jobrank.value;
            //console.log(arr)
            meta[tableid].items.map((obj) => {
                if (obj.attrcode === 'defaultrank') {//参照设置为多选
                    obj.queryCondition = () => ({
                        'intType': this.intType,
                        'pk_filtertype': this.pk_filtertype,
                        'pk_joblevel': pk_joblevel,
                        "filterPks": arr_str
                    })
                }
            });
            props.meta.setMeta(meta);
        }
        return true
    }

    onTableAfterEvent(props, tableid, key, value, record, index, recordval) {
        if (tableid === 'poststd_levelrelation' && key === 'jobrank') {
            if (value.length === 1) {
                let defaultrank = {
                    display: value[0].refname,
                    scale: "-1",
                    value: value[0].refpk
                };
                this.props.cardTable.setValByKeyAndRowId(tableid, record[0].rowid, 'defaultrank', defaultrank)
            }
        }
        // 能力素质指标  根据名称 显示或删除
        if (tableid === "om_postcapa" && key === "pk_capa") {
            let pk_capa = value.refpk;
            // 当清除人员编码后 本行数据清空
            if (!pk_capa) {
                let values = recordval.values;
                let keys = ['indicode', 'pk_capa', 'pk_indi_type', 'scorestandard', 'pk_capa_grade'];
                for (let key in values) {
                    if (keys.includes(key)) {
                        let item = values[key];
                        item.display = null;
                        item.value = null;
                    }
                }
                props.table.updateDataByIndexs(tableid, [{
                    index: index,
                    data: {status: recordval.status, values: values}
                }]);
                return true
            }
            let meta = props.meta.getMeta();
            meta[tableid].items.map((obj) => {
                if (obj.attrcode === 'pk_capa_grade') {//参照设置为多选
                    obj.queryCondition = () => ({
                        pk_indi: pk_capa
                    })
                }
            });
            props.meta.setMeta(meta);

            let model = {
                rows: [recordval]
            };
            CapaSelAction(model, pk_capa).then(res => {
                // 最后的设置的值未确定
                if (res.data[tableid] && res.data[tableid].rows && res.data[tableid].rows[0] && res.data[tableid].rows[0].values) {
                    let values = res.data[tableid].rows[0].values;
                    props.table.updateDataByIndexs(tableid, [{
                        index: index,
                        data: {status: recordval.status, values: values}
                    }]);
                }
            })
        }
        return true
    }

    /**
     * 检测表格的重复
     * @param rows
     * @param tableid
     * @returns {boolean}
     */
    checkTableRepeat(rows, tableid) {
        let temparr = [];
        let unRepeat = true;
        rows.map(rowsItem => {
            let equipmentno;
            if (tableid === 'om_postequipment') {
                equipmentno = rowsItem.values.equipmentno.value;
            } else if (tableid === 'om_postpower') {
                equipmentno = rowsItem.values.powername.value;
            } else if (tableid === 'om_postcont') {
                equipmentno = rowsItem.values.pk_contactobj.value;
            } else if (tableid === 'poststd_levelrelation') {
                //职级职等 列表的默认职级只能有一个
                if (rowsItem.values.defaultlevel && rowsItem.values.defaultlevel.value) {
                    equipmentno = rowsItem.values.defaultlevel.value;
                } else {
                    return
                }

            }
            if (!unRepeat) return;
            if (temparr.includes(equipmentno)) {
                unRepeat = false;
                return false;
            } else {
                temparr.push(equipmentno)
            }
        });
        return unRepeat
    }

    checkTableForm() {
        let formCheck = this.props.form.isCheckNow(formId);
        // 如果form有必填项为空 则退出
        if (!formCheck) return false;
        let tableIds = [];
        let unRepeat = true;
        this.props.gridrelationTable.map(item => {
            if (!unRepeat) return;
            if (item.moduletype !== 'table') return;
            let rows = this.props.cardTable.getAllRows(item.code);
            if (!rows || rows.length < 1) {
                return
            }
            tableIds.push(item.code);
            if (item.code === 'om_postpower') {
                unRepeat = this.checkTableRepeat(rows, item.code);
                if (!unRepeat) {
                    toast({
                        color: "danger",
                        content: this.state.json['jf6005-000317']
                    });
                    /* 国际化处理： 岗位工作权限的权限名称不能重复！*/
                }
                return false
            } else if (item.code === 'om_postcont') {
                unRepeat = this.checkTableRepeat(rows, item.code);
                if (!unRepeat) {
                    toast({
                        color: "danger",
                        content: this.state.json['jf6005-000318']
                    });
                    /* 国际化处理： 岗位接触对象的接触对象不能重复！！*/
                }
                return false
            } else if (item.code === 'om_postequipment') {
                unRepeat = this.checkTableRepeat(rows, item.code);
                if (!unRepeat) {
                    toast({
                        color: "danger",
                        content: this.state.json['jf6005-000319'] //content: "岗位办公设备的设备编号不能重复！"
                    });
                    /* 国际化处理： 保存成功！！！*/
                }
                return false
            } else if (item.code === 'poststd_levelrelation') {
                unRepeat = this.checkTableRepeat(rows, item.code);
                if (!unRepeat) {
                    toast({
                        color: "danger",
                        content: this.state.json['jf6005-000336'] //content: "默认职级只能有一个"
                    });
                    /* 国际化处理： 保存成功！！！*/
                }
                return false
            }
        });
        // 如果table有重复的 则退出
        if (!unRepeat) return false;
        let tableCheck = this.props.cardTable.checkTableRequired(tableIds);
        return tableCheck
    }

    /**
     * 保存
     * @param callback  // 暂时未用到
     * @param syncCorpJob   是否同步岗位信息想操作：0:无操作，1:同步；2:不同步
     */
    postSaveAction(callback, syncCorpJob = 0) {
        if (!this.checkTableForm()) {
            return
        }
        let bodys = {};
        let head = {};
        head[formId] = this.props.form.getAllFormValue(formId);
        //清空pk_level_source；
        head[formId].rows[0].values.pk_level_source.value = '';
        let pageid = this.props.templatePageId;
        let bodys_code = this.props.gridrelationTable.map(item => {
            if (item.moduletype !== 'table') return;
            let tableId = item.code;
            let data = this.props.cardTable.getAllData(tableId);
            if (data.rows.length > 0) {
                if (tableId === 'poststd_levelrelation') {
                    // 处理职级职等列表数据
                    this.dealLevelData(data);
                }
                bodys[tableId] = data;
                bodys[tableId]['areacode'] = tableId;
            }
            return item.code;
        });
        saveValidate(this.props, pageid, formId, bodys_code, 'extcard').then(()=>{
            // operate  3 新增  4：修改
            if (this.props.isNewAddFlag) {
                // 新增
                this.addSave(bodys, head, 3, syncCorpJob, callback);
            } else {
                // 修改
                this.editSave(bodys, head, 4, syncCorpJob, callback);
            }
        })
    }

    /**
     * 新增保存
     * @param bodys
     * @param head
     * @param operate
     * @param syncCorpJob
     * @param callback
     */
    addSave(bodys, head, operate, syncCorpJob, callback) {
        SaveAction(this.props.pageid, bodys, head, operate, syncCorpJob)
            .then(res => {
                this.saveSuccess(res, callback);
            })
    }

    /**
     * 修改保存
     * @param bodys
     * @param head
     * @param operate
     * @param syncCorpJob
     * @param callback
     */
    editSave(bodys, head, operate, syncCorpJob, callback) {
        SaveAction(this.props.pageid, bodys, head, operate, syncCorpJob)
            .then(res => {
                if (res.data.status === '300') {
                    promptBox(
                        {
                            color: "warning",
                            title: this.state.json['jf6005-000056'], /* 国际化处理： 提示*/
                            content: res.data.msg,
                            beSureBtnClick: () => {
                                this.editSave(bodys, head, operate, 1, callback)
                            },
                            cancelBtnClick: () => {
                                this.editSave(bodys, head, operate, 2, callback)
                            }
                        }
                    );
                }
                if (res.data.status !== '200') return;
                this.saveSuccess(res, callback);
            })
    }

    /**
     * 保存成功函数
     * @param res  返回函数
     * @param callback 回调函数
     */
    saveSuccess(res, callback) {
        // 弹窗提示
        toast({color: 'success', content: this.state.json['jf6005-000043']});
        this.levelrelationChange = false;
        let dataObj = res.data.dataResult || res.data.data;
        // 页面显示为浏览态
        this.setDetailStatus(false);
        if (callback && typeof callback === 'function') {
            // 设置分页组件状态
            if (dataObj && dataObj.head) {
                this.setCardPage(dataObj.head[formId].rows[0].values.pk_post.value);
            }
            this.emptyDetailPage();
            callback();
            return
        }
        // 设置分页组件状态
        this.setCardPage(res.data);
        // 设置状态为 非编辑态
        this.props.updateState({
            isEditing: false
        }, () => {
            this.props.updateButtonStatus();
        });

        // 清空详情页数据
        this.emptyDetailPage();
        this.setState({
            loaddingData: true
        }, () => {
            let pk_post = this.props.pk_post;
            QueryOneSucc.call(this, pk_post, {}, res, setDefData, AddCondition, tableIdArr);
        });
        // 恢复新增状态为 false
        this.props.updateState({
            isNewAddFlag: false
        }, () => {
            this.props.updateButtonStatus();
        });
    }

    /**
     * 设置分页组建状态
     * @param res
     */
    setCardPage(res) {
        let allpks = cacheTools.get('allpks');
        if (!Array.isArray(allpks)) {
            allpks = [];
        }
        if (typeof res === 'string') {
            if (!allpks.includes(res)) {
                allpks.push(res);
                cacheTools.set('allpks', allpks);
            }
            this.props.cardPagination.setCardPaginationId({id: res, status: 1});
            return;
        }
        let dataObj = res.dataResult || res.data;
        let om_post_values = dataObj.head[formId].rows[0].values;
        if (!om_post_values.pk_post) return;
        let pkpost = om_post_values.pk_post.value;
        let postFlag = om_post_values.postFlag.value;
        let postcode = om_post_values.postcode.value; // 岗位编码  附件已用
        // 如果 翻页组件中不包含该 post 则添加进去
        if (!allpks.includes(pkpost)) {
            allpks.push(pkpost);
        }
        this.props.updateState({
            pk_post: pkpost,
            postFlag,
            postcode
        }, () => {
            this.props.updateButtonStatus();
        });
        cacheTools.set('allpks', allpks);
        this.props.cardPagination.setCardPaginationId({id: pkpost, status: 1});

    }

    /**
     * 新增
     */
    add() {
        this.emptyDetailPage();
        let record = getDefData('hrjf', 'poststd');
        let values = {};
        //设置所属组织
        values.pk_org = {
            display: this.props.groupName === 'GLOBLE00000000000000' ? this.state.json['jf6005-000147'] : this.props.groupName,
            scale: "-1",
            value: this.props.pk_org,
        };

        // 设置成立日期
        let now = new Date();
        let month = now.getMonth() + 1;
        // 兼容ie 月数小于10必需加'0'
        if (month < 10) {
            month = '0' + month;
        }
        values.builddate = {
            value: now.getFullYear() + '-' + month + '-' + now.getDate()
        };

        // 设置启用状态  (已启用)
        values.enablestate = {
            display: this.state.json["jf6005-000110"],
            scale: "-1",
            value: "2"
        };

        if (record) {
            let recordValues = record.values;

            // 设置岗位序列
            if (recordValues.hasOwnProperty('pk_postseries')) {
                values.pk_postseries = recordValues.pk_postseries;
            }

            // 设置职级来源
            if (recordValues.hasOwnProperty('pk_post')) {
                values.pk_level_source = {
                    value: recordValues.postname.value || recordValues.pk_postseries.display
                };
            }

            // 设置直接上级  非岗位 不设置直接上级
            if (recordValues.hasOwnProperty('pk_poststd') && recordValues.pk_poststd.value && recordValues.hasOwnProperty('pk_post')) {
                values.suporior = recordValues.pk_post;
                if (values.suporior.value) {
                    values.suporior.display = recordValues.postname.value;
                }
            }
        }

        this.props.form.setFormItemsValue(formId, values)
    }

    /**
     * 处理职级职等列表数据
     * @param data
     */
    dealLevelData(data) {
        let dataRows = data.rows;
        // 如果没有数据 退出
        if (dataRows.length < 1) {
            return
        }
        // 如果数据没有发生改变 退出
        if (dataRows[0].status === '0') {
            return
        }
        // 如果数据没有新增 退出
        if (dataRows[0].status !== '2') {
            return
        }
        let source = getDefData('hrjf_hrpost', 'hrjf.hrpost.poststd_levelrelation');
        // 修改前如果没有数据 退出
        if (!source) {
            return
        }
        let sourceRow = source.rows;
        sourceRow.map(item => {
            item.status = '3'
        });
        data.rows = dataRows.concat(sourceRow);
    }

    /**
     * 编辑
     */
    edit() {
        this.setState({
            isEditing: true
        }, () => {
            this.props.setDetailPageStatus('edit')
        })
    }

    /**
     * 基本信息 编辑后事件
     */
    onAfterEvent(props, moduled, itemId, finalValue, oldValue, val) {
        if (itemId === 'inheritflag') {
            // 完全继承来源标志  false: 知己职能表格可编辑  false: 职级职等表格不可编辑
            this.setState({
                inheritflag: val
            });
        }
        if (itemId === 'pk_job' || itemId === 'pk_postseries') {
            // 当所属职务 或 岗位序列发生变化后清空 职级职等列表
            this.props.cardTable.setTableData('poststd_levelrelation', {rows: []})
        }
    }

    /**
     * 清空详情页数据
     */
    emptyDetailPage() {
        this.props.form.EmptyAllFormValue(formId);
        tableIdArr.map(tableId => {
            this.props.cardTable.toggleCardTable(tableId, false);
            this.props.cardTable.setTableData(tableId, {rows: []})
        });
    }

    /**
     * 设置详情页状态
     * @param isEdit    true:  'edit'(编辑态)；   false:  browse(浏览态)
     */
    setDetailStatus(isEdit) {
        let val = isEdit ? 'edit' : 'browse';
        this.props.form.setFormStatus(formId, val);
        tableIdArr.map(tableId => {
            // 关闭table
            this.props.cardTable.toggleCardTable(tableId, false);
            // 设置table状态
            this.props.cardTable.setStatus(tableId, val);
        });
    }

    /**
     * 获取详情数据
     */
    getDetailInfo(param = {}) {
        let pk_post = param.pk_post || this.props.pk_post;
        // 清空详情页数据
        this.emptyDetailPage();
        if (!pk_post) return;
        this.setState({
            loaddingData: true
        });
        QueryOneAction(this.props.pk_org, pk_post).then(res => {
            QueryOneSucc.call(this, pk_post, param, res, setDefData, AddCondition, tableIdArr)
        })
    }

    render() {
        let {form, cardTable} = this.props;
        const {createForm} = form;
        const {createCardTable} = cardTable;
        const {gridrelationTable} = this.props;
        const {loaddingData} = this.state;
        return (
            <div
                style={{display: this.props.isDetail ? '' : 'none'}}>
                {/*职级制等table  新增的参照*/}
                <div style={{display: 'none'}}>
                    <Refer
                        {...conf}
                        onChange={this.referChange.bind(this)}
                        queryCondition={this.state.getQueryCondition}
                        clickContainer={<button id='refer-container-button'/>}
                        value={this.state.rowPks}
                    />
                </div>

                <div className={`hrpostDetailPage ${THEME.bgc}`}>
                    <NCAnchor>
                        {gridrelationTable && gridrelationTable.map(item => {
                            return <NCScrollLink to={item.code} spy={true} key={item.code}
                                                 smooth={true} duration={300} offset={-100}>
                                <p>{item.name}</p>
                            </NCScrollLink>
                        })}
                    </NCAnchor>
                    <NCScrollElement name={formId}>
                        <div>
                            {createForm(formId, {
                                onAfterEvent: this.onAfterEvent.bind(this)
                            })}
                        </div>
                    </NCScrollElement>
                    <div>
                        {
                            (!loaddingData) && gridrelationTable && gridrelationTable.map(item => {
                                return item.moduletype === 'table' ?
                                    <NCScrollElement name={item.code} key={item.code}>
                                        <div>
                                            {createCardTable(item.code, {
                                                onRowClick: this.orgmanagerRowClick.bind(this),
                                                pageSize: 1000,
                                                tableHead: () => {
                                                    return this.getCardTableHead(item.code)
                                                },
                                                onBeforeEvent: this.onBeforeEvent.bind(this),
                                                onAfterEvent: this.onTableAfterEvent.bind(this)
                                            })}
                                        </div>
                                    </NCScrollElement> : null
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default DetailPage
