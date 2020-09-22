/**
 *  leftTransferId={'testt_left'}                           //左边表格id
    rightTransferId={'testt_right'}                         //右边表格id
    leftTreeData={lefttableData}                            //左边表格数据
    rightTreeData={righttableData}                          // 右边表格数据
    leftTreeConfig={}                                       // 左边表格配置（editTable的config）
    rightTreeConfig={}                                      // 右边表格配置（editTable的config）
    title={{left: '待选行政组织', right: '已选行政组织'}}       // 左右两边的title设置
    valueChange={this.valChange.bind(this)} // 未设置        // 左右的表格穿梭后的事件
    disableBtns={!this.state.editPageFlag}                  // 穿梭按钮的是否可用性
    isCheckoutRollback                                      // 是否启用校验回滚操作 默认false不启用
 */
import React, {Component} from 'react';
import {
    base,
    deepClone
} from 'nc-lightapp-front';

import Treetransfer from './transfer/treeTransfer';
import { hrAjax as ajax } from 'src/hrpub/common/utils/utils';

/**
 * 创建穿梭框
 */
export default class Transfer extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            pk_org: props.pk_org || '',
            toRightData: [],// 添加到右边的数据
            disableBtns: this.props.disableBtns,
            value: this.props.value ? this.props.value : {},//穿梭框返回的结果
            leftTransferId: this.props.leftTransferId,//穿梭框id
            rightTransferId: this.props.rightTransferId,//穿梭框id
            leftTreeData: this.props.leftTreeData || {rows: []},//左树初始化数据
            rightTreeData: this.props.rightTreeData || {rows: []},//右树初始化数据
            beforeMove: this.props.beforeMove,//异动前事件
            afterMove: this.props.afterMove,//移动后事件
            leftTreeConfig: this.props.leftTreeConfig || {
                showCheck: true,
                showPagination: false, // 是否展示分页
                showIndex: true,
                height: 306,
                showTotal: false, // 是否展示合计行 这个有bug 不好用
            },//左树配置，为对象{}
            rightTreeConfig: this.props.rightTreeConfig || {
                showCheck: true,
                showPagination: false, // 是否展示分页
                showIndex: true,
                height: 306,
                showTotal: false, // 是否展示合计行 这个有bug 不好用
            },//右树配置，为对象{}
            onBeforeEvents: this.props.onBeforeEvents || {},
            isCheckoutRollback: this.props.isCheckoutRollback || false
        };
        this.oldLeftTreeVal = deepClone(this.state.leftTreeData.rows); // 左边的原始数据
        this.oldRightTreeVal = deepClone(this.state.rightTreeData.rows); // 右边的原始数据
    }

    componentDidMount() {
        if (this.state.leftTreeData) {
            // this.props.editTable.setTableData(this.state.leftTransferId, this.state.leftTreeData);
            this.setLeftData(this.state.leftTreeData);
        }
        if (this.state.rightTreeData) {
            // debugger
            this.state.rightTreeData.rows.forEach(item => {
                item.disabled = true;
                if (item.values) {
                    for (let key in item.values) {
                        item.values[key].disabled = true;
                    }
                }
            });
            let rightData = deepClone(this.state.rightTreeData);
            this.setRightData(rightData);
        }
    }

    componentWillReceiveProps(nextprops) {
        let nextLeftData = JSON.stringify(nextprops.leftTreeData);
        let thisLeftData = JSON.stringify(this.props.leftTreeData);
        let nextRightData = JSON.stringify(nextprops.rightTreeData);
        let thisRightData = JSON.stringify(this.props.rightTreeData);
        if (nextLeftData !== thisLeftData || nextRightData !== thisRightData) {
            this.setState({
                leftTreeData: nextprops.leftTreeData,
                rightTreeData: nextprops.rightTreeData,

            }, () => {
                if (this.state.leftTreeData) {
                    this.oldLeftTreeVal = deepClone(this.state.leftTreeData.rows); // 左边的原始数据
                    this.setLeftData(this.state.leftTreeData);
                }
                if (this.state.rightTreeData) {
                    // debugger
                    this.state.rightTreeData.rows.forEach(item => {
                        item.disabled = true;
                        if (item.values) {
                            for (let key in item.values) {
                                item.values[key].disabled = true;
                            }
                        }
                    });
                    this.oldRightTreeVal = deepClone(this.state.rightTreeData.rows); // 右边的原始数据
                    let rightData = deepClone(this.state.rightTreeData);
                    this.setRightData(rightData);
                }
            })
        }
    }

    /**
     * 从右侧移动到左侧时回滚占用的编码
    */
    rollbackData = async (rowData) =>{
        let { pk_org } = this.state;
        if( !rowData.length ) return [];
        let post_codes = [], pk_posts = [];
        rowData.map((item, index)=>{
            if(item.data){
                post_codes.push(item.data.values.postcode.value);
                pk_posts.push(item.data.values.pk_post.value);
            }else{
                post_codes.push(item.values.postcode.value);
                pk_posts.push(item.values.pk_post.value);
            }
        })

        await ajax({
            url: '/nccloud/hrjf/hrdept/MergePostRollBackCodesAction.do',
            data: {
                pk_org: pk_org,
                pk_posts: pk_posts,
                post_codes: post_codes
            },
            success: res => {
                if( res.success ){
                    // debugger
                    let data = res.data;
                    for( let i in  data){
                        rowData.map((item, key) =>{
                            if( item.data){
                                if( item.data.values.pk_post.value === i ){
                                    item.data.values.postcode.value = data[i];
                                }
                            }else{
                                if( item.values.pk_post.value === i ){
                                    item.values.postcode.value = data[i];
                                }
                            }
                        })
                    }
                }
            }
        })
        return rowData;
    }

    // 左侧移动到右侧进行校验和编码的重新赋值
    mergePostCodes = async ( rowData )=>{
        let { rightTransferId, editTable } = this.props;
        let { pk_org } = this.state;
        let pk_posts = [];
        rowData.map((item, index)=>{
            if(item.data){
                pk_posts.push(item.data.values.pk_post.value);
            }else{
                pk_posts.push(item.values.pk_post.value);
            }
        })
        await ajax({
            url: '/nccloud/hrjf/hrdept/MergePostCreateCodesAction.do',
            data: {
                pk_org: pk_org,
                pk_posts: pk_posts
            },
            success: res => {
                if( res.success ){
                    let data = res.data;
                    if(!!data){
                        let isDisabled = data.isEditable;
                        let pkAndCodes = data.pkAndCodes;
                        let rowid;
                        if( isDisabled === 'N' ){
                            isDisabled = false;
                        }else{
                            isDisabled = true;
                        }
                        this.setState({
                            isEditCode: isDisabled
                        })
                        for( let i in  pkAndCodes){
                            rowData.map((item, key) =>{
                                if( item.data){
                                    if( item.data.values.pk_post.value === i ){
                                        item.data.values.postcode.value = pkAndCodes[i];
                                    }
                                }else{
                                    if( item.values.pk_post.value === i ){
                                        item.values.postcode.value = pkAndCodes[i];
                                    }
                                }
                                // rowid = item.data ? item.data.rowid : item.rowid;
                                // editTable.setEditableByKey(rightTransferId, rowid, 'postcode', isDisabled);
                            })
                        }
                    }
                }
            }
        })
        return rowData;
    }


    /**
     * 添加到左树
     * let data0 = [
     {
                data: {
                    rowid: "896140.9a34ba8ba346656",
                    selected: true,
                    status: "0",
                    values: {}
                },
                index: 0
            }
     ];
     */
    toLeft = async () => {
        let { isCheckoutRollback } = this.state;
        let data0 = [];

        // 根据是否显示checkbox 决定如何取值
        if (!this.state.rightTreeConfig.showCheck) {
            let clickData = this.props.editTable.getClickRowIndex(this.state.rightTransferId);
            if(clickData){
                data0 = [
                    {
                        data: clickData.record,
                        index: clickData.index
                    }
                ]
            }
        } else {
            data0 = this.props.editTable.getCheckedRows(this.state.rightTransferId);

        }

        //向左侧移动时调用编码回滚接口
        if(isCheckoutRollback){
            let newData0 = [];
            data0.map((item, index)=>{
                this.state.toRightData.find((v)=>{
                    if( item.data.rowid === v.rowid ){
                        newData0.push(item);
                    }
                })
            })
            data0 = await this.rollbackData(newData0);
        }

        // 如果没有选中则退出
        if (data0.length < 1) return;

        let data = deepClone(data0);
        let num = this.props.editTable.getNumberOfRows(this.state.leftTransferId);
        let currToRight = [];
        let toLeft = []; //转移到左边的数据
        for (let i = 0, len = data.length; i < len; i++) {
            let temp = data[i];
            // 删除从左到右表的数据
            this.state.toRightData.forEach((item, index) => {
                if (item.rowid === temp.data.rowid) {
                    // 向左表添加数据 (数据需要从this.state.toRightData取)
                    toLeft.push(temp.data);
                    // 从右表删除数据
                    this.props.editTable.deleteTableRowsByRowId(this.state.rightTransferId, temp.data.rowid, true);
                    num++;
                } else {
                    currToRight.push(item);
                }
            });
        }
        let leftData = this.props.editTable.getAllRows(this.state.leftTransferId);
        this.setLeftData({rows: leftData.concat(toLeft)});
        this.state.toRightData = currToRight;
        this.valueChange();
    };

    /**
     * 添加到右树
     */
    toRight = async () => {
        let { isCheckoutRollback } = this.state;
        let data0 = [];
        if (!this.state.leftTreeConfig.showCheck) {
            let clickData = this.props.editTable.getClickRowIndex(this.state.leftTransferId);
            if(clickData){
                data0 = [
                    {
                        data: clickData.record,
                        index: clickData.index
                    }
                ]
            }

        } else {
            data0 = this.props.editTable.getCheckedRows(this.state.leftTransferId);

        }
        if (data0.length < 1) return;
        //判断移动时是否需要调用接口
        if( isCheckoutRollback ){
            data0 = await this.mergePostCodes(data0);
        }
        let data = deepClone(data0);
        data.forEach(item => {
            item.data.selected = false;
        });
        let toRight = [];  // 转移到右边的数据，最后传给 this.state.toRightData  和 右边表格中
        data.forEach(item => {
            toRight.push(item.data);
        });
        let leftRows0 = this.props.editTable.getAllRows(this.state.leftTransferId);
        let leftRows = deepClone(leftRows0);
        let newLeftRows = leftRows.filter(item1 => {
            return data.every(function (item2) {
                return item2.data.rowid !== item1.rowid
            })
        });
        let rightData = this.props.editTable.getAllRows(this.state.rightTransferId);
        this.state.toRightData = this.state.toRightData.concat(deepClone(toRight));
        this.setLeftData({rows: newLeftRows});
        this.setRightData({rows: rightData.concat(toRight)});
        this.valueChange();
    };

    /**
     * 全部添加到左边
     */
    allToLeft = async () => {
        let { isCheckoutRollback } = this.state;
        let data = deepClone(this.state.toRightData);
        if (data.length < 1) return;
        let rightData = deepClone(this.oldRightTreeVal);
        let leftData = deepClone(this.oldLeftTreeVal);
        //向左侧移动时调用编码回滚接口
        if(isCheckoutRollback){
            this.rollbackData(data);
        }
        rightData.forEach(item => {
            item.disabled = true;
        });
        this.setLeftData({rows: leftData});
        this.setRightData({rows: rightData});

        // 清空从左传向右的数据
        this.state.toRightData = [];
        this.valueChange();
    };

    /**
     * 全部添加到右边
     */
    allToRight = async () => {
        let { isCheckoutRollback, leftTransferId, rightTransferId } = this.state;
        let rightData = deepClone(this.oldRightTreeVal);
        let leftData = deepClone(this.oldLeftTreeVal);
        // this.state.toRightData = deepClone(leftData);
        let newRightData = rightData; //此处是为了兼容不需在移动时调用接口的操作
        //判断移动时是否需要调用接口
        if(isCheckoutRollback){
            newRightData = deepClone(this.props.editTable.getAllRows(rightTransferId));
            let newtLeftData = deepClone(this.props.editTable.getAllRows(leftTransferId));
            if (newtLeftData.length < 1) return;
            leftData = await this.mergePostCodes(newtLeftData);
        }
        this.state.toRightData =  this.state.toRightData.concat(deepClone(leftData));
        this.setLeftData({rows: []});
        rightData.forEach(item => {
            item.disabled = true;
        });
        this.setRightData({rows: newRightData.concat(leftData)});
        this.valueChange();
    };

    /**
     * 穿梭后触发的事件
     */
    valueChange() {
        let leftData = deepClone(this.oldLeftTreeVal);
        let rightData = deepClone(this.oldRightTreeVal);

        leftData = leftData.filter(item1 => {
            return this.state.toRightData.every(function (item2) {
                return item2.rowid !== item1.rowid
            })
        });
        rightData = rightData.concat(this.state.toRightData);
        this.state.toRightData.forEach(item => {
            leftData.forEach(lItem => {
                if (lItem.rowid === item.rowid) {

                }
            })
        });

        if (this.props.valueChange && typeof this.props.valueChange === 'function') {
            this.props.valueChange({
                leftData,
                rightData
            })
        }

    }

    updateState = () => {
        this.setState({});
    };

    /**
     * 左树区域
     */
    leftArea = () => {
        const {editTable, leftTransferId} = this.props;
        const {createEditTable} = editTable;
        const {leftTreeConfig} = this.state;
        const tableConfig = {};
        const clickFunObj = {
            onRowClick: (props, moduleid, record, index, e) => {
                let config = this.state.leftTreeConfig;
                // if(!tableConfig.showCheck){
                //     this.props.editTable.selectAllRows(leftTransferId, false);
                //     this.props.editTable.selectTableRows(leftTransferId, index, true);
                // }
                if (
                    config &&
                    typeof config.onRowClick === "function"
                ) {
                    config.onRowClick.call(
                        this,
                        {...this.props},
                        leftTransferId,
                        record,
                        index,
                        e
                    );
                }
            },
            onRowDoubleClick: (record, index, e, f) => {
                let config = this.state.leftTreeConfig;
                if (
                    config &&
                    typeof config.onRowDoubleClick === "function"
                ) {
                    config.onRowDoubleClick.call(
                        this,
                        {...this.props},
                        leftTransferId,
                        record,
                        index,
                        e
                    );
                }
            }
        };
        Object.assign(tableConfig, leftTreeConfig, clickFunObj);
        return (
            <div>
                {createEditTable(leftTransferId, tableConfig)}
            </div>
        )
    };


    setLeftData = (data) => {
        this.props.editTable.setTableData(this.state.leftTransferId, data);
    };
    setRightData = (data) => {
        this.props.editTable.setTableData(this.state.rightTransferId, data);
    };

    /**
     * 关闭右侧行编辑弹窗；
     * @param props
     */
    onAfterEvent(props) {
        props.editTable.setStatus(this.state.rightTransferId, 'browse')
    }

    /**
     * 右树区域
     */
    rightArea = () => {
        const {editTable, rightTransferId} = this.props;
        const {createEditTable} = editTable;
        const {rightTreeConfig, isEditCode} = this.state;
        const tableConfig = {
            onCloseModel: this.onAfterEvent.bind(this),
            tableModelConfirm: this.onAfterEvent.bind(this),
            onBeforeEvent: this.state.onBeforeEvents.bind(this)
        };
        const clickFunObj = {
            onRowClick: (props, moduleid, record, index, e) => {
                let config = this.state.rightTreeConfig;
                // if(!tableConfig.showCheck){
                //     this.props.editTable.selectAllRows(rightTransferId, false);
                //     this.props.editTable.selectTableRows(rightTransferId, index, true);
                // }
                if (
                    config &&
                    typeof config.onRowClick === "function"
                ) {
                    config.onRowClick.call(
                        this,
                        {...this.props},
                        rightTransferId,
                        record,
                        index,
                        e
                    );
                }
            },
            onRowDoubleClick: (record, index, e, f) => {
                if (!record.hasOwnProperty('disabled') || !record.disabled) {
                    this.props.editTable.openModel(this.state.rightTransferId, 'edit', record, index);
                    this.props.editTable.setEditableRowKeyByIndex(this.state.rightTransferId, index, 'postcode', isEditCode);
                }
                let config = this.state.rightTreeConfig;
                if (
                    config &&
                    typeof config.onRowDoubleClick === "function"
                ) {
                    config.onRowDoubleClick.call(
                        this,
                        {...this.props},
                        rightTransferId,
                        record,
                        index,
                        e
                    );
                }
            }
        };
        Object.assign(tableConfig, rightTreeConfig, clickFunObj);
        return (
            <div>
                {createEditTable(rightTransferId, tableConfig)}
            </div>
        )
    };

    /**
     * 删除行
     * @param index
     * @returns {function()}
     */
    onDelete = (index) => {
        return () => {
            const dataSource = [...this.state.dataSource];
            dataSource.splice(index, 1);
            this.setState({dataSource});
        }
    };

    /**
     * 添加行
     */
    handleAdd = () => {
        const {count, dataSource} = this.state;
        const newData = {
            b: this.state.json['jf6005-000019'],/* 国际化处理： 女*/
            a: `${this.state.json['jf6005-000021']}`,/* 国际化处理： 凤姐*/
            c: 32,
            d: `100 100 100`,
            key: `100 100 100`,
            _checked: true
        };
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1
        });
    };

    /**
     * 合并到某左/右树
     * @param fixedList
     * @param fromTree
     */
    mergeToFixedTree = (fixedList, fromTree) => {
        console.log(this.state.json['jf6005-000020'])/* 国际化处理： 合并到某左/右树*/
    };

    render() {
        return (
            <Treetransfer
                title={this.props.title}
                toRight={this.toRight.bind(this)}
                toLeft={this.toLeft.bind(this)}
                allToLeft={this.allToLeft.bind(this)}
                fullscreen={this.props.fullscreen}
                allToRight={this.allToRight.bind(this)}
                leftArea={this.leftArea.bind(this)}
                leftSearch={() => {
                    console.log("leftSearch")
                }}
                rightSearch={() => {
                    console.log("leftSearch")
                }}
                disableBtns={this.state.disableBtns}
                rightArea={this.rightArea.bind(this)}/>
        )
    }
}

