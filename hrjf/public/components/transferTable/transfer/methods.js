import {
    toast
} from 'nc-lightapp-front';



// 公共配置 常量
export const DEFAULT = {
    CACHE_DATA: {}, // 不同情况的初始数据
    ALL_DATA: {}, //初始表格的全数据
    AFTER_DEL_DATA: {} //进行深度删除后的数据，作为删除后的操作的初始数据   zhanghengh  18/07/05  	为了在浏览态删除后，编辑态取消不会将删除的数据在显示出来
};

/**33
 *设置当前的行
 * change zhanghengh 28/5/29
 * @param {*} tableId  表格id
 * mofify by zhanghengh @18/05/29 增加注释
 */
export function focusRowByIndex(tableId, index) {
    // 目前是单选
    this.state.table[tableId].currentIndex = index;
    this.setState({
        table: this.state.table
    });
}

/**49
 * 设置当前点击行
 * add by  zhangheng 18/07/04
 * @param {*} tableId 表格id
 * index  索引
 */
export function setClickRowIndex(tableId, data) {
    this.state.table[tableId].currentkInfo = data;
    this.setState({
        table: this.state.table
    });
}

/**10
 * modify by yanggqm @18/03/04
 *  modify by  zhanghengh  @18/5/5  在内部分别存储不同情况的初始表格数据
 * 设置表格数据，同时缓存数据，取消时调用
 * @param  tableId   meta的id号
 * @param  data      传入的data数据
 * @param  isCache     是否缓存
 * 解决思路：
 * 		1、给不同的tableId配对应的data
 * 		2、不论第几次给tableId对应table来setTableData，都要把最新的data存下来
 *
 */
export function setTableData(tableId, data, isCache = true) {
    if (typeof tableId == "string") {
        let checkData = data && data.rows && Array.isArray(data.rows);
        if (checkData) {
            // 加入
            data.rows = data.rows.map((e, i) => {
                e.rowid =
                    e.rowid ||
                    String(new Date().getTime()).slice(-5) +
                    Math.random().toString(12);
                e.status = e.status || "0";
                return e;
            });

            // 设置分页的allpks
            if (data.hasOwnProperty("allpks")) {
                // 存储到本地缓存中，卡片翻页需要用 以后如果做缓存可能用
                // CacheTools.set("allpks", data.allpks);
            } else {
                if (data.rows.length > 0) {
                    data.allpks = this.state.table[tableId]
                        ? this.state.table[tableId].allpks
                        : [];
                } else {
                    data.allpks = [];
                }
            }

            let tempData = data;
            tempData.model = this.state.table[tableId]
                ? this.state.table[tableId].model
                : null; //记录渲染表格数据之前的侧拉框状态
            tempData.operType = this.state.table[tableId]
                ? this.state.table[tableId].operType
                : null; //记录渲染表格数据之前的侧拉框类型
            tempData.modelIndex = this.state.table[tableId]
                ? this.state.table[tableId].modelIndex
                : null; //记录渲染表格数据之前序号信息

            if (isCache) {
                //为了让表格可以进行单一的渲染，然后添加了这个判断条件，不进行缓存，只为表格设置数据 zhanghengh
                _saveCache(tableId, tempData); //zh  CACHE_DATA: {}, // 不同情况的初始数据 ALL_DATA: {}//初始表格的全数据
                _saveAllData(tableId, null); // TODO 将缓存的全数据指为null zh
            }

            let table = {
                ...this.state.table,
                [tableId]: tempData
            };
            this.setState(
                {
                    table
                },
                () => {
                    /*let temp = this.state.table[tableId].rows;
                    temp.map((item, indexx) => {
                        for (let keys in item.values) {
                            this.editTableInitValue[`${indexx}**${keys}`] =
                                item.values[keys] && item.values[keys].value;
                        }
                    });*/
                    // 调用selectedChange事件
                    if (this.state.table[tableId].selectedChange) {
                        this.state.table[tableId].selectedChange(
                            { ...this.props, ...this.output },
                            tableId,
                            0
                        );
                    }
                }
            );
            return false;
        }
        return false;
    }
    toast({ content: `${this.state.json['jf6005-000002']}`, color: "warning" });/* 国际化处理： 第一个参数必须为字符串*/
    return false;
}

/**
 *    工具函数
 */
/**
 * 存储情况的初始数据
 * add by zhangheng   18/5/5
 * @param {*} tableId 表格id
 * @param {*} data 需要缓存的数据
 */
function _saveCache(tableId, data) {
    DEFAULT.CACHE_DATA[tableId] = JSON.parse(JSON.stringify(data)); //先换成json.parse
}
/**
 * 进行深度删除后的数据，作为删除后的操作的初始数据
 * add by zhangheng   18/7/5
 * @param {*} tableId 表格id
 * @param {*} data 需要缓存的数据
 */
function _saveAfterDel(tableId, data) {
    DEFAULT.AFTER_DEL_DATA[tableId] = JSON.parse(JSON.stringify(data)); //先换成json.parse
}
/**
 * 缓存数据方法  筛选时的全数据
 * add by zhangheng   18/5/5
 * @param {*} tableId 表格id
 * @param {*} data 需要缓存的数据
 * mofify by zhanghengh @18/05/17  当data是null的时候不用深拷贝
 */
function _saveAllData(tableId, data) {
    if (data) {
        DEFAULT.ALL_DATA[tableId] = JSON.parse(JSON.stringify(data)); //先换成json.parse
    } else {
        DEFAULT.ALL_DATA[tableId] = data;
    }
}
