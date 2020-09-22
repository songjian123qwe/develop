import deepCopy from 'src/hrpub/common/utils/deep-copy';
import {find} from './getData';
export function certificateContentMatch1(html, con) {
    let str = deepCopy(html);
    let data = deepCopy(con);
    let reg = /\$\{(.+?)\}/g;
    let regResult = (str.match(reg));
    if (regResult !== null && regResult !== undefined) {
        let dataArr = data.split(',');
        for (let i = 0; i < regResult.length; i++) {
            if (typeof dataArr[i] == "undefined" || dataArr[i] == null || dataArr[i] == "") {
                str = str.replace(regResult[i], '<p style = "display: inline-block; width: 70px; border-bottom: 1px solid #000; margin-left: 2px; margin-right: 2px">' + '' + '</p>');
            } else {
                str = str.replace(regResult[i], '<p style = "border-bottom: 1px solid #000; display: inline-block">' + dataArr[i] + '</p>');
            }
        }
    }
    return str
}

export function certificateContentMatch(map, con) {
    let firstMapArr = deepCopy(map);//总的map带着block的对象
    let data = deepCopy(con);
    let DidArray = [];//所有的text合集
    let styleArray = [];//所有的style合集
    let emptyStyle = [];
    let shouldDidArr = []; // 第一次处理之后的结果 （由&包裹）
    let willDidArr = [];
    let lengthArr = []

    if (data !== "") {
        firstMapArr.blocks.map((item, index) => {
            DidArray.push(item.text);
            if (item.inlineStyleRanges) {
                styleArray.push(item.inlineStyleRanges);
            } else {
                styleArray.push(emptyStyle)
            }
        })
        let wi = 0
        DidArray.map((item, index) => {
            let reg = /\$\{(.+?)\}/g;
            let regResult = (item.match(reg));
            if (regResult !== null && regResult !== undefined) {
                let dataArr = data.split(',');
                let result = item
                for (let i = 0; i < regResult.length; i++) {
                    if (typeof dataArr[wi + i] == "undefined" || dataArr[wi + i] == null || dataArr[wi + i] == "") {
                        result = result.replace(regResult[i], '&    ' + '    &')
                    } else {
                        result = result.replace(regResult[i], '&   ' + dataArr[wi + i] + '   &');
                    }
                }
                shouldDidArr.push(result)
                wi = wi + regResult.length
                lengthArr.push(regResult.length)
            }
            if (regResult == null || regResult == undefined) {
                let result = item
                lengthArr.push(0)
                shouldDidArr.push(result)
            }

        })
        shouldDidArr.map((item, index) => {
            for (let i = 0; i < lengthArr[index]; i++) {
                let style = { style: 'UNDERLINE' }
                if (i == 0) {
                    style.offset = find(item, '&', i)
                    style.length = find(item, '&', i + 1) - style.offset
                } else {
                    style.offset = find(item, '&', i * 2)
                    style.length = find(item, '&', 2 * i + 1) - style.offset
                }
                styleArray[index].push(style)
            }
        })
        shouldDidArr.map(item => {
            let result = item
            result = result.replace(/&/g, " ");
            willDidArr.push(result)
        })
        firstMapArr.blocks.map((item, index) => {
            item.text = willDidArr[index];
            item.inlineStyleRanges = styleArray[index]
        })
    }
    let finallyMap = { "map": firstMapArr }
    return JSON.stringify(finallyMap);
}
