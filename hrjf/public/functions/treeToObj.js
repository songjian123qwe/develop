/**
 * 将树形数据 转化成扁平对象数据
 * @param data  formdataValue.rows[0].values
 * @param pageShow  是否用于页面展示  true：是
 */
export function treeToObj(data, key) {
    if (!Array.isArray(data)) {
        console.error("data is not Array");
        return {}
    }
    let temp = {};

    function format(data) {
        data.map(item => {
            temp[item[key]] = item;
            if(item.hasOwnProperty('children')){
                format(item.children);
            }
        })
    }

    format(data);
    return temp
}
