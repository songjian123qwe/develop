/**
 *
 * Created by shenzaifang on 2019-08-22
 */
import deepCopy from 'src/hrpub/common/utils/deep-copy';
import do_print from 'src/hrpub/common/utils/print';
import Export from 'src/hrpub/common/utils/exportHtml';

export const COMMON = {
    config: {
        appcode: '60054030',
        pagecode: '60054030p'
    },
    pagecodeValues: {
        p_CurrentstaffQuery: '60054030p_CurrentstaffQuery',
        p_FormerStaffQuery: '60054030p_FormerStaffQuery',
        p_SubordinateQuery: '60054030p_SubordinateQuery',
        p_change: '60054030p_change',
        p_batch: '60054030p_batch'
    },
    list: "postlist",
    printUrl: "/nccloud/hrjf/post/PostPrintAction.do",
    sysPrarms: "JF0003"
};

export const htmlPrint = (props, json, className) => {
    if (className.indexOf('.') < 0) className = '.' + className;
    const el = document.querySelector(className).cloneNode(true);
    let tableId = COMMON.list;
    const tableTmp = deepCopy(props.meta.getMeta()[tableId]);
    let data = deepCopy(props.editTable.getAllRows(tableId));
    boolToStr(data, json);
    do_print(
        el,
        {
            title: json['jf6005-000330'] /* 国际化处理： 节点名称*** */,
            maker: json['jf6005-000519'] /* 国际化处理： 打印人 */,
            date: json['jf6005-000520'] /* 国际化处理： 打印日期 */,
            maxColLen: getTableTmp(tableTmp).length, // 可以显示的长度
            beforeAppend: (tableDataList) => {
                tableDataList[0][0] = getTableTmp(tableTmp);
                return [tableDataList[0]]
            }
        },
        {
            tableTmp: tableTmp,
            data: data
        }
    );
};

/**
 * 输出
 */
export const htmlOutput = (props, json) => {
    let tableId = COMMON.list;
    let dataRows = deepCopy(props.editTable.getAllData(tableId).rows);
    let meta = deepCopy(props.meta.getMeta()[tableId]);
    boolToStr(dataRows, json);
    //输出
    Export(document.querySelector('.u-table-scroll'),
        {
            title: json['jf6005-000330'] /* 国际化处理： 节点名称*** */,
            fileName: json['jf6005-000330'] /* 国际化处理： 节点名称*** */,
            maker: json['jf6005-000521'] /* 国际化处理： 制单人*/,
            date: json['jf6005-000522'] /* 国际化处理： 制表日期*/
        }, {
            data: dataRows,
            meta: meta,
            showCheckBox: false
        });
};

/**
 * 获取表头 隐藏附件操作列
 * @param tmp
 * @returns {Array}
 */
function getTableTmp(tmp) {
    let tableTmp = [];

    let visibleCol = [];

    tmp.items.map((item) => {
        if (item.visible && item.attrcode !== 'opr' && item.attrcode !== 'file') {
            visibleCol.push(item);
        }
    });

    visibleCol.map((col) => {
        tableTmp.push(col.label);
    });

    return tableTmp
}

/**
 * 将booole 值 true/false 修改为 是/否
 * @param dataRows
 * @param json
 */
function boolToStr(dataRows, json) {
    dataRows.forEach(item => {
        let values = item.values;
        for (let key in values) {
            let val = values[key];
            if (typeof val === 'object' && typeof val.value === 'boolean') {
                /*是：否*/
                val.display = val.value ? json['jf6005-000337'] : json['jf6005-000338'];
            }
        }
    });
}
