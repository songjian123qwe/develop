/**
 *
 * Created by shenzaifang on 2019-05-20
 */

//获取页面参数
export function getUrlParam(pop) {
    if (!pop) return;
    let result;

    let queryString = window.location.search || window.location.hash;
    if (queryString.includes('?')) {
        queryString = queryString.split('?')[1];
    } else {
        queryString = queryString.substring(1);
    }
    if (queryString) {
        let paramsArr = queryString.split('&');
        if (paramsArr && paramsArr instanceof Array) {
            paramsArr.forEach((item) => {
                if (item.indexOf('=') != -1 && item.split('=') && item.split('=') instanceof Array) {
                    if (item.split('=')[0] === pop) {
                        if (item.split('=')[1]) {
                            result = decodeURIComponent(item.split('=')[1]);
                        }
                    }
                }
            });
        }
    }
    return result || null;
}

export function addQueryCondition(key, meta, queryCondition) {
    if (!key || !meta) return;
    if(!meta.hasOwnProperty('items')) return;
    let items = meta.items;
    if(!Array.isArray(items))return;
    items.forEach(item=>{
        let code = item.attrcode||item.code;
        if(code!==key) return;
        item.queryCondition = queryCondition
    })

}
