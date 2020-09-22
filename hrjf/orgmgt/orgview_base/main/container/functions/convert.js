/**
 * 后台字体格式为 ‘family=Dialog,name=Dialog.plain,style=plain,size=16’
 * plain: 正常
 * bold： 粗体
 * italic： 斜体
 * bolditalic： 粗体加斜体
 * 本地字体格式为   {
            fontFamily: '黑体',
            fontSize: 16,
            bold: false,
            italics: false
        }
 * @param fontStr
 * @returns
 */
export function conventFontToLocal(fontStr) {
    let fontObj = {};
    fontStr.split(',').forEach(item => {
        let [key, value] = item.split('=');
        if (key === 'size' || key === 'style') value = Number(value);
        fontObj[key] = value;
    });
    return fontObj;
}

export function conventFontToServer(fontObj) {
    return Object.entries(fontObj).map(item => {
        if (item[0] === 'style') item[1] = item[1] + "";
        return item[0] + '=' + ((item[1] === undefined || item[1] === null) ? '' : item[1])
    }).join(',')
}