export default function AddCondition(temp, values, key) {
    function handlerQueryRefer(temp, key, values) {
        let items = temp.items;
        items.map(val => {
            if (val.itemtype !== 'refer') return;
            if (key) {
                if (val.attrcode === key) {
                    val.queryCondition = function () {
                        return values
                    }
                }
            } else {
                val.queryCondition = function () {
                    return values
                }
            }


        });

        return temp
    }

    return handlerQueryRefer(temp, key, values)
}

export async function addPkorgRefer(props, values) {
    let template = props.meta.getMeta();

    function handlerQueryRefer(template, values) {
        if (!template.hasOwnProperty('items')) return;
        let items = template.items;
        items.map(val => {
            if (val.itemtype !== 'refer') return;
            let tempVlues = {};
            if(val.queryCondition){
                if(typeof val.queryCondition === 'function'){
                    tempVlues = val.queryCondition();
                }
                if(typeof val.queryCondition === 'object'){
                    tempVlues = val.queryCondition;
                }
            }
            val.queryCondition = function () {
                return Object.assign({},tempVlues,values)
            }
        });
    }

    let keys = Object.keys(template);
    keys.map(key => {
        if (typeof template[key] === 'object') {
            handlerQueryRefer(template[key], values)
        }
    });

    await new Promise(resolve => {
        props.meta.setMeta(template, () => {
            resolve();
        });
    });
}
