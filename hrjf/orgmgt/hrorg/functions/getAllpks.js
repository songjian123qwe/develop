import {
    cardCache,
} from 'nc-lightapp-front';

let {setDefData} = cardCache;
export default (data, key = 'refpk') => {
    let allPks = [];

    function getpk(data) {
        if (Array.isArray(data)) {
            data.forEach(item => {
                getpk(item)
            })
        } else {
            allPks.push(data.values[key].value);
            if (data["children"]) {
                let children = data["children"];
                // 设置缓存数据 树状表 异步调用
                let childKey = key === 'refpk' ? data.values.pk_org.value : data.values[key].value;
                setDefData('org_table_tree_orglist', childKey, children);
                if (Array.isArray(children)) {
                    children.forEach((item) => {
                        getpk(item);
                    })
                }
            }
        }
    }

    getpk(data);

    return allPks;

}
