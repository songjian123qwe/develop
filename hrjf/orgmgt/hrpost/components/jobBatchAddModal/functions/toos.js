/**
 * 给树型数据  添加classname
 * @param data Array  树形数据数组
 * @param key  根据那个树形添加classname
 */
export function addGray(data, key) {

    function addClass(data) {
        data.map(item => {
            let nodeValue = item.nodeData.nodeValue;
            if (!nodeValue.hasOwnProperty(key)) {
                item.className = 'gray'
            }
            if (item.hasOwnProperty('children') && Array.isArray(item.children) && item.children.length > 0) {
                addClass(item.children)
            }
        });
    }

    if (Array.isArray(data)) {
        addClass(data)
    } else {
        addClass([data])
    }
}