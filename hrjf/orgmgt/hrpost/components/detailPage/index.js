/**
 * 详情页
 */
import React, {Component} from 'react';

import './index.less';
import {high, createPage, base, getUrlParam, promptBox, toast, cardCache, cacheTools,print,output} from 'nc-lightapp-front';
import PostSaveAction from "../../functions/PostSaveAction";
import Refer from '../../../../refer/jfref/JobLevelGridRef';
import AddCondition from "../../../../public/functions/addCondition";
import NCBackBtn from 'src/hrpub/common/components/hr-back';
import CapaSelAction from "../../functions/CapaSelAction";
import PostStdSelAction from "../../functions/PostStdSelAction";
import {THEME} from "../../../../public/theme/theme";
import {saveValidate} from "../../../../public/functions/orgtools";
import {COMMON} from "../../common/common";

const {NCButton, NCAnchor, NCScrollLink, NCScrollElement} = base;
let {getDefData} = cardCache;
const formId = 'om_post';
const conf = {
    refType: 'grid',
    refName: 'jf6005-000015', /* 国际化处理： 职级*/
    placeholder: 'jf6005-000015', /* 国际化处理： 职级*/
    refCode: 'hrjf.refer.JobLevelGridRef',
    queryGridUrl: '/nccloud/hrjf/ref/JobLevelGridRef.do',
    columnConfig: [{
        name: ['jf6005-000016', 'jf6005-000017', 'jf6005-000018', 'jf6005-000019'],//'职级编码', '职级名称', "职级类别编码", "职级类别名称"
        code: ['refcode', 'refname',
            "om_joblevelsys.code as syscode", "om_joblevelsys.name as sysname"]
    }],
    isMultiSelectedEnabled: true,
    isCacheable: false
};

// setDefData('hr_post_table_record'); // 获取选中的table row信息

class DetailPage extends Component {
    constructor(props) {
        super(props);
        this.chooseTableId = ''; // table  表 点击新增或插入时 赋值； 参照选择时运用
        // 职级职等参照需要
        this.levelAdd = false; //职级职等增加标志   false: 插入；  true: 增加；
        this.intType = null; //职务类别：1：职务； 2：岗位序列
        this.pk_filtertype = null; // 根据intType 决定值； 当intType为1时 取 职务的值；为2时取岗位序列的值
        this.tablePost = this.props.tablePost;
        this.levelrelationChange = false;
        this.selectedManagerRow = {};
        this.copyManagerRow = {};
        props.gridrelationTable.forEach((item) => {
            if (item.moduletype !== 'table') return;
            let tableId = item.code;
            this.selectedManagerRow[tableId] = {
                index: 0,
                row: null
            };
            this.copyManagerRow[tableId] = {
                index: 0,
                row: null
            }
        });
        //  修改基准岗位后，是否带入，只要带入一次，设置为true，点击返回按钮返回到列表页事，设置为false
        this.isChanged = false;
        this.state = {
            json: props.json,
            inlt: props.json,
            isNewAddFlag: props.isNewAddFlag,
            isDetailEdit: props.isDetailEdit,
            rowPks: [],
            inheritflag: false, // 完全继承来源标志  false: 知己职能表格可编辑  false: 职级职等表格不可编辑
            getQueryCondition: {} // 职级参照查询条件
        };
    }

    componentWillReceiveProps(nextprops) {
        let nextjson = JSON.stringify(nextprops.json);
        let thisjson = JSON.stringify(this.props.json);
        let nextinlt = JSON.stringify(nextprops.inlt);
        let thisinlt = JSON.stringify(this.props.inlt);
        if (nextjson !== thisjson || nextinlt !== thisinlt || this.props.isNewAddFlag !== nextprops.isNewAddFlag || this.props.isDetailEdit !== nextprops.isDetailEdit || this.props.tablePost !== nextprops.tablePost) {
            this.tablePost = nextprops.tablePost;
            this.setState({
                json: nextprops.json,
                inlt: nextprops.inlt,
                isNewAddFlag: nextprops.isNewAddFlag,
                isDetailEdit: nextprops.isDetailEdit,
            })
        }
        let nextGrid = JSON.stringify(nextprops.gridrelationTable);
        let thisGrid = JSON.stringify(this.props.gridrelationTable);
        if (nextGrid !== thisGrid) {
            nextprops.gridrelationTable.forEach((item) => {
                if (item.moduletype !== 'table') return;
                let tableId = item.code;
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
        const disableTableId = ['om_posthistory'];
        if (this.props.isUsered) {
            disableTableId.push("om_postcapa")
        }
        // 如果是非编辑态 则各按钮均不能点击
        if (!this.state.isDetailEdit) {
            return true
        }
        // 禁止编辑的表格
        if (disableTableId.includes(tableid)) {
            return true
        }
        //   如果完全继承来源 则 职级职等部门不可编辑
        if (tableid === 'post_levelrelation') {
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
                    {/*<NCPopconfirm trigger='click' placement='left' rootClose={true}>*/}
                    {/*<NCButton*/}
                    {/*style={{width: 70, height: 30}}*/}
                    {/*>*/}
                    {/*{this.state.json['jf6005-000112']}/!* 国际化处理： 修改*!/*/}
                    {/*</NCButton>*/}

                    {/*</NCPopconfirm>*/}

                    {/*<NCPopconfirm trigger='click' placement='right' rootClose={true}>*/}
                    {/*<NCButton*/}
                    {/*style={{width: 70, height: 30}}*/}
                    {/*>*/}
                    {/*{this.state.json['jf6005-000141']}/!* 国际化处理： 新增*!/*/}
                    {/*</NCButton>*/}
                    {/*</NCPopconfirm>*/}
                </div>
            </div>
        );
    };

    /**
     * 翻页插件 按钮点击事件
     */
    pageQueryClick = (props, val) => {
        this.tablePost = val;
        // 查询新一页的数据
        this.props.PostQueryOneAction(val);
    };

    /**
     * 保存编辑
     */
    saveEdit() {
        // 表单验证
        if (!this.props.form.isCheckNow(formId)) {
            return
        }
        promptBox({
            color: 'warning',               // 提示类别默认"success"， "success"/"info"/"warning"/"danger",非必输
            title: this.state.json['jf6005-000050'],                // 提示标题, 默认不同类别下分别为："已成功"/"帮助信息"/"请注意"/"出错啦",非必输/* 国际化处理： 请注意*/
            content: this.state.json['jf6005-000053'],             // 提示内容,非必输/* 国际化处理： 确认要保存更改吗？*/
            noFooter: false,                // 是否显示底部按钮(确定、取消),默认显示(false),非必输
            noCancelBtn: false,             // 是否显示取消按钮,，默认显示(false),非必输
            beSureBtnName: this.state.json['jf6005-000036'],          // 确定按钮名称, 默认为"确定",非必输/* 国际化处理： 确定*/
            cancelBtnName: this.state.json['jf6005-000008'],           // 取消按钮名称, 默认为"取消",非必输/* 国际化处理： 取消*/
            beSureBtnClick: () => {
                this.postSaveAction(2)
            },   // 确定按钮点击调用函数,非必输
            cancelBtnClick: null  // 取消按钮点击调用函数,非必输
        });
    }

    /**
     * 取消编辑
     */
    cancleEdit() {
        promptBox({
            color: 'warning',               // 提示类别默认"success"， "success"/"info"/"warning"/"danger",非必输
            title: this.state.json['jf6005-000050'],                // 提示标题, 默认不同类别下分别为："已成功"/"帮助信息"/"请注意"/"出错啦",非必输/* 国际化处理： 请注意*/
            content: this.state.json['jf6005-000054'],             // 提示内容,非必输/* 国际化处理： 确认要放弃保存更改吗？*/
            noFooter: false,                // 是否显示底部按钮(确定、取消),默认显示(false),非必输
            noCancelBtn: false,             // 是否显示取消按钮,，默认显示(false),非必输
            beSureBtnName: this.state.json['jf6005-000036'],          // 确定按钮名称, 默认为"确定",非必输/* 国际化处理： 确定*/
            cancelBtnName: this.state.json['jf6005-000008'],           // 取消按钮名称, 默认为"取消",非必输/* 国际化处理： 取消*/
            beSureBtnClick: () => {
                this.back();
            },   // 确定按钮点击调用函数,非必输
            cancelBtnClick: null  // 取消按钮点击调用函数,非必输
        });
    }

    /**
     * 保存新增
     */
    saveAdd() {
        // 表单验证
        if (!this.props.form.isCheckNow(formId)) {
            return
        }
        promptBox({
            color: 'warning',               // 提示类别默认"success"， "success"/"info"/"warning"/"danger",非必输
            title: this.state.json['jf6005-000050'],                // 提示标题, 默认不同类别下分别为："已成功"/"帮助信息"/"请注意"/"出错啦",非必输/* 国际化处理： 请注意*/
            content: this.state.json['jf6005-000055'],             // 提示内容,非必输/* 国际化处理： 确认要保存新增吗？*/
            noFooter: false,                // 是否显示底部按钮(确定、取消),默认显示(false),非必输
            noCancelBtn: false,             // 是否显示取消按钮,，默认显示(false),非必输
            beSureBtnName: this.state.json['jf6005-000036'],          // 确定按钮名称, 默认为"确定",非必输/* 国际化处理： 确定*/
            cancelBtnName: this.state.json['jf6005-000008'],           // 取消按钮名称, 默认为"取消",非必输/* 国际化处理： 取消*/
            beSureBtnClick: () => {
                // 保存新增
                this.postSaveAction(1)
            },   // 确定按钮点击调用函数,非必输
            cancelBtnClick: null  // 取消按钮点击调用函数,非必输
        });
    }

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
            getQueryCondition: {
                intType: this.intType,
                pk_filtertype: this.pk_filtertype
            }
        }, () => {
            document.getElementById('refer-container-button').click();
        });
    }

    /**
     * 新增行
     */
    orgmanagersAddInfo = (tableid) => {
        if (tableid === 'post_levelrelation') {
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
        if (tableid === 'post_levelrelation') {
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
                    _this.props.cardTable.delRowsByIndex(tableid, _this.selectedManagerRow[tableid].index);
                    _this.selectedManagerRow[tableid] = {
                        row: null,
                        index: null
                    }
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
        this.props.cardTable.setTableData("post_levelrelation", {rows: data});
        this.props.cardTable.setStatus("post_levelrelation", 'edit');

    }

    onBeforeEvent(props, tableid, key, value, index, record) {
        if (tableid !== 'post_levelrelation') {
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
            AddCondition(meta["post_levelrelation"], {
                ...queryCondition
            }, key);
            meta["post_levelrelation"].items.map(item => {
                if (item.attrcode === 'jobrank') {
                    item.isMultiSelectedEnabled = true;
                }
            });
            this.props.meta.setMeta(meta);
        } else if (key === 'defaultrank') {
            //console.log(record.values.jobrank.value)
            if (!record.values.jobrank.value) {
                toast({color: "warning", content: this.state.json['jf6005-000309']});/* 国际化处理： 请先设置职等!*/
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
        if (tableid === 'post_levelrelation' && key === 'jobrank') {
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
            } else if (tableid === 'post_levelrelation') {
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
        this.props.gridrelationTable.forEach(item => {
            if (!unRepeat) return;
            if (item.moduletype !== 'table') return;
            let rows = this.props.cardTable.getAllRows(item.code);
            if (!rows || rows.length < 1) return;
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
            } else if (item.code === 'post_levelrelation') {
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
     * 保存 ui_state 1:保存新增 按钮；  2：保存 按钮
     */
    postSaveAction(ui_state) {
        if (!this.checkTableForm()) {
            return
        }
        let bodys = {};
        let head = {};
        head[formId] = this.props.form.getAllFormValue(formId);
        this.setBodyData(bodys);

        let data = {
            [formId]: this.props.form.getAllFormValue(formId)
        };
        let tableTypeObj = {};
        let pageid = this.props.templatePageId;
        let bodys_code = this.props.gridrelationTable.map(item => {
            let tableId = item.code;
            let tableData = this.props.cardTable.getAllData(tableId);
            if (tableData) {
                data[tableId] = tableData;
                tableTypeObj[tableId] = 'cardTable';
            }
            return item.code;
        });
        saveValidate(this.props, pageid, formId, bodys_code, 'extcard').then(() => {
            PostSaveAction(bodys, head, ui_state, this.isChanged).then(res => {
                this.levelrelationChange = false;
                // 保存或保存新增后， 基准岗位信息是否带入标志设置为false
                this.isChanged = false;
                this.props.setDetailPageStatus('browse');
                if (ui_state === 1) {
                    // 设置翻页组件状态
                    this.setCardPage(res);
                    //请求新增接口
                    this.props.addPost();
                    return
                } else {
                    this.props.updateState({
                        isDetailEdit: false
                    }, () => {
                        //如果是修改则重新请求数据
                        if (!this.state.isNewAddFlag) {
                            this.props.PostQueryOneAction(this.tablePost);
                        } else {
                            // 设置分页组件状态
                            this.setCardPage(res);
                            toast({color: 'success', content: this.state.json['jf6005-000043']});
                            // 设置详情页数据
                            this.setDetailPageData(res)
                        }
                    });
                }

                this.setState({
                    isNewAddFlag: false,
                    isDetailEdit: false
                })
            })
        })

    }

    /**
     * 设置body数据
     */
    setBodyData = (bodys) => {
        this.props.gridrelationTable.forEach(item => {
            if (item.moduletype !== 'table') return;
            let tableId = item.code;
            let data = this.props.cardTable.getAllData(tableId);
            if (data.rows.length > 0) {
                if (tableId === 'post_levelrelation') {
                    // 处理职级职等列表数据
                    this.dealLevelData(data);
                }
                bodys[tableId] = data;
                bodys[tableId]['areacode'] = tableId;
            }
        });
    };

    /**
     * 设置详情页数据
     * @param res {Object} 接口返回的数据
     * @param status {string} 由选择基准岗位 返回的数据 子集数据修改成新增
     */
    setDetailPageData = (res, status) => {
        this.props.form.EmptyAllFormValue("om_post");
        if (res.data) {
            // 设置详情页数据
            if (res.data.head && res.data.head.om_post) {
                let formdata = {
                    'om_post': {
                        rows: res.data.head.om_post.rows
                    }
                };
                this.props.form.setAllFormValue(formdata);
            }

            if (res.data.head && res.data.head.post_jq) {
                let post_jq_data = {
                    'post_jq': {
                        rows: res.data.head.post_jq.rows
                    }
                };
                this.props.form.setAllFormValue(post_jq_data);
            }
            let tableData = res.data.bodys;

            this.props.gridrelationTable.forEach(item => {
                if (item.moduletype !== 'table') return;
                let tableId = item.code;
                this.props.cardTable.toggleCardTable(tableId, false);
                if (tableData.hasOwnProperty(tableId)) {
                    // 从改变基础岗位 获得的数据 全部修改成新增 岗位变更历史 除外
                    if (status && tableId !== 'om_posthistory') {
                        tableData[tableId].rows.forEach(item => {
                            item.status = status
                        })
                    }
                    this.props.cardTable.setTableData(tableId, tableData[tableId])
                }
            });
        }
    };

    /**
     * 设置分页组建状态
     * @param res
     */
    setCardPage(res) {
        let allpks = cacheTools.get('allpks');
        if (!Array.isArray(allpks)) {
            allpks = [];
        }
        let om_post_values = res.data.head.om_post.rows[0].values;
        if (om_post_values.pk_post) {
            let pkpost = om_post_values.pk_post.value;
            this.tablePost = pkpost;
            allpks.push(pkpost);
            cacheTools.set('allpks', allpks);
            this.props.cardPagination.setCardPaginationId({id: pkpost, status: 1});
        }
    }

    /**
     * 用户列表 头部 button点击事件
     * @param prop
     * @param btncode
     * @param areacode
     * @param opt
     */
    onButtonClick(prop, btncode, areacode, opt) {
        switch (btncode) {
            case 'card_add':
                // 新增
                this.add();
                break;
            case 'card_edit':
                // 编辑
                this.edit();
                break;
            case 'card_refresh':
                // 刷新
                let post = this.tablePost || null;
                // 查询新一页的数据
                this.props.PostQueryOneAction(post);
                break;
            case 'card_print':
                // 打印
                let printOids = [this.tablePost];
                print(
                    'pdf',
                    COMMON.printUrl,
                    {
                        funcode: COMMON.config.appcode,
                        nodekey: 'postinfo',
                        oids: printOids
                    }
                );
                break;
            case 'card_output':
                // 输出
                let outputOids = [this.tablePost];
                output({
                    url: COMMON.printUrl,
                    data: {
                        funcode: COMMON.config.appcode,      //功能节点编码，即模板编码
                        nodekey: 'postinfo',     //模板节点标识
                        oids: outputOids,    // 功能节点的数据主键  oids含有多个元素(['1001A41000000000A9LR','1001A410000000009JDD'])时为批量打印
                        outputType: 'output',
                        filename: this.state.json['jf6005-000330'] // 输出文件名
                    },
                    callback: function () {

                    }
                });
                break;
            default:
                break;
        }
    }

    /**
     * 新增
     */
    add() {
        this.setState({
            isNewAddFlag: true,
            isDetailEdit: true
        }, () => {
            //请求新增接口
            this.props.addPost();
        })
    }

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
        let source = getDefData('hrjf_hrpost', 'hrjf.hrpost.post_levelrelation');
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
     /**
     * 编辑
     */
    edit() {
        this.props.postEditAction(this.tablePost, () => {
            this.setState({
                isDetailEdit: true
            }, () => {
                this.props.setDetailPageStatus('edit')
            })
        });
    }

    /**
     * 返回
     */
    back = () => {
        if (this.state.isNewAddFlag) {
            // 取消函数
            this.props.postCancelAction();
        }
        if (this.state.isDetailEdit) {
            // 返回列表页，改变基准岗位后 是否带入标志设置为false
            this.isChanged = false;
            // 返回浏览态
            this.props.updateState({
                isDetailEdit: false
            }, () => {
                this.setState({
                    isDetailEdit: false
                }, () => {
                    this.props.PostQueryOneAction(this.tablePost);
                    this.props.setDetailPageStatus('browse')
                });
            });
            return
        }

        // 完全继承来源  职级职等列表 可编辑
        this.setState({
            inheritflag: false
        });
        // 返回列表页
        this.props.backButtonClick()
    };

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
            this.props.cardTable.setTableData('post_levelrelation', {rows: []})
        }

        if (itemId === 'pk_poststd' && val.refpk) {
            // 当所属职务 或 岗位序列发生变化后清空 职级职等列表
            promptBox({
                color: 'warning',
                title: this.state.json['jf6005-000512'],
                content: '',
                noFooter: false,
                noCancelBtn: false,
                beSureBtnName: this.state.json['jf6005-000036'],
                cancelBtnName: this.state.json['jf6005-000008'],
                beSureBtnClick: () => {
                    this.isChanged = true;
                    this.selectPoststd(val.refpk);
                },
                cancelBtnClick: null
            });
        }
    }

    /**
     * 基准岗位发生变化后触发
     */
    selectPoststd = (pk_poststd) => {
        let head = {};
        head[formId] = this.props.form.getAllFormValue(formId);
        // let bodys = {};
        // this.setBodyData(bodys);
        PostStdSelAction(head, pk_poststd).then(res => {
            if (!this.isChanged) return;
            // 设置详情页数据
            this.setDetailPageData(res, '2')
        })
    };

    render() {
        let {form, button, cardTable, cardPagination,gridrelationTable, detailLoading} = this.props;
        const {createCardPagination} = cardPagination;
        const {createForm} = form;
        const {createCardTable} = cardTable;
        let {createButtonApp} = button;
        return (
            <div style={{display: this.props.isShowDetail ? '' : 'none'}}>
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
                        {gridrelationTable.length > 0 && gridrelationTable.map(item => {
                            return <NCScrollLink to={item.code} spy={true} key={item.code}
                                                 smooth={true} duration={300} offset={-100}>
                                <p>{item.name}</p>
                            </NCScrollLink>
                        })}
                    </NCAnchor>
                    <div className={'header'}>
                        <div>
                            {/* 国际化处理： 返回*/}
                            <NCBackBtn onClick={this.back} title={this.state.json['jf6005-000022']}/>
                        </div>
                        <div style={{display: this.state.isDetailEdit ? "none" : "flex"}}>

                            {
                                createButtonApp({
                                    area: "card_head",
                                    onButtonClick: (props, btncode) => {
                                        this.onButtonClick(props, btncode, "card_head", this);
                                    }
                                })
                            }
                            {createCardPagination({
                                handlePageInfoChange: this.pageQueryClick
                            })}
                        </div>
                        <div style={{display: this.state.isDetailEdit ? "" : "none"}}>
                            <NCButton shape="border" colors="primary"
                                      onClick={this.saveEdit.bind(this)}>{this.state.json['jf6005-000066']}</NCButton>{/* 国际化处理： 保存*/}
                            <NCButton shape="border" colors="primary" onClick={this.saveAdd.bind(this)}
                                      disabled={!this.state.isNewAddFlag}>{this.state.json['jf6005-000067']}</NCButton>{/* 国际化处理： 保存新增*/}
                            <NCButton shape="border" colors="default"
                                      onClick={this.cancleEdit.bind(this)}>{this.state.json['jf6005-000008']}</NCButton>{/* 国际化处理： 取消*/}
                        </div>
                    </div>
                    <NCScrollElement name={formId}>
                        <div>
                            {createForm(formId, {
                                onAfterEvent: this.onAfterEvent.bind(this)
                            })}
                        </div>
                    </NCScrollElement>
                    <div>
                        {
                            (!detailLoading) && gridrelationTable.length > 0 && gridrelationTable.map(item => {
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
