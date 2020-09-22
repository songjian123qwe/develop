import {Maybe} from 'src/hrpub/common/utils/utils';
/**
 *
 * 添加超链接
 * @param data   data.template['orglist']
 * @param key    需添加超链接的 key
 * @param clickFun  点击后触发的函数名称
 * @param val    需要显示的值
 * @param langName    多语时的文本 值 ""||"2"||"3"
 */
export default function tableRowAddLink(data, key, clickFun, val,langName="") {
    const nameItem = data.items.find(item => item.attrcode === key);
    if (nameItem) {
        nameItem.itemtype= 'customer';
        let keyName = key+langName;
        nameItem.render = (text, record, index) => {
            let displayName = Maybe.of(record).getValue(['values', keyName, val])||Maybe.of(record).getValue([keyName, val]);
            if(!displayName){
                displayName = Maybe.of(record).getValue(['values', key, val])||Maybe.of(record).getValue([key, val]);
            }
            return (
                <a style={{
                    "cursor": 'pointer', "display": 'block',
                    "text-overflow": 'ellipsis',
                    "overflow": 'hidden',
                    "white-space": 'nowrap'
                }}
                   onClick={() => {
                       clickFun && typeof clickFun === 'function' && clickFun(record, index)
                   }}
                >
                    {displayName}
                </a>
            );
        };
    }
};

