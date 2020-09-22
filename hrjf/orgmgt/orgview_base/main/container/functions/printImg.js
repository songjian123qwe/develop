import $ from "jquery";
import {myBrowser} from "src/hrpub/common/utils/utils";

export default function printImg(inlt) {
    const langFlag = !inlt || ['tradchn', 'simpchn'].indexOf(inlt) > -1;
    const canvasEl = $('#canvas');
    const width = canvasEl.prop('scrollWidth') + 10,
        height = canvasEl.prop('scrollHeight') + 10;
    /*canvasEl.css({
        height: height,
        width: width
    });*/
    const cloneEl = canvasEl.clone();
    /*canvasEl.css({
        height: '',
        width: ''
    });
    cloneEl.css({
        height: '',
        width: ''
    });*/
    //由于svg无法引入和读取CSS，这里需要手动设置部分样式
    //可以考虑将部分样式放在组件style中或者有别的方法，将来有待改进
    const windowEl = cloneEl.find('.window').filter(function () {
        return $(this).css("display") !== "none"
    });
    windowEl.css({
        zIndex: 24,
        cursor: 'pointer',
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#ffffff'
    });

    const windowHeader = windowEl.find('.window-header');
    windowHeader.css({
        padding: '10px 3px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        minHeight: '40px'
    });

    const pointContent = windowEl.find('.point-content');
    pointContent.css({
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%'
    });

    const pointTable = windowEl.find('.point-table');
    if (langFlag) {
        pointTable.css({
            display: 'table'
        });
    }

    const workSplit = pointTable.find('.window-split');
    if (langFlag) {
        workSplit.css({
            display: 'table-row'
        });
    }

    const workSplitDiv1 = pointTable.find('.window-split>div');
    workSplitDiv1.css({
        display: langFlag ? 'table-cell' : 'block',
        padding: '3px 0'
    });

    const workSplitDiv2 = pointTable.find('.window-split>div>div');
    workSplitDiv2.css({
        height: '2px',
        width: '100%',
        background: '#000000'
    });

    const workItem = pointTable.find('.window-item');
    workItem.css({
        width: '100%',
        whiteSpace: 'nowrap',
        display: 'table-row'
    });

    const workItemDiv = workItem.find('div');
    workItemDiv.css({
        display: 'table-cell',
        whiteSpace: 'normal',
        wordBreak: 'break-all',
        padding: '5px 3px'
    });

    const workItemFirstDiv = workItem.find('div:first-child');
    workItemFirstDiv.css({
        paddingRight: '5px',
        whiteSpace: 'nowrap',
        textAlign: 'right'
    });

    const workItemLastDiv = workItem.find('div:last-child');
    workItemLastDiv.css({
        width: '100%'
    });

    const imgItem = workItem.find('.img-item');
    imgItem.css({
        width: '80px'
    });

    const all = cloneEl.find('*');
    all.css({
        boxSizing: 'border-box'
    });

    if (myBrowser() === 'IE') {
        const newWin = window.open('');
        newWin.document.body.innerHTML = (`
            <div style='line-height: 1; transform-origin: 0% 0% 0px;'> 
                ${cloneEl.html()}
            </div>
    `);
        newWin.focus();
        newWin.print();
        newWin.close();
    } else {
        const iframe = document.createElement('IFRAME');
        let doc = null, head = null;
        // width:100%;height:400px; z-index: 9999
        iframe.setAttribute('style', 'position:absolute;width:0px;height:0px;top:0;left: 0;display: none;');
        const newWin = window.open('');
        newWin.document.body.appendChild(iframe);
        doc = iframe.contentWindow.document;
        /**
         * A4纸实际大小为297*210
         * A4纸大小大概为1500*1060
         * 如果height/width超过1500/1060,则纵向打印 此时如果宽度超过1060则缩放，
         * 否则横向打印，此时如果宽度超过1500，则缩放
         */
        const width_a4 = 1500, height_a4 = 1060;
        const ratio_a4 = width_a4 / height_a4, ratio = height / width;
        const direction = ratio > ratio_a4 ? 'portrait' : 'landscape';
        let zoom = 1;
        if (direction === 'portrait') {
            if (width > height_a4) {
                zoom = height_a4 / width;
            }
        } else {
            if (width > width_a4) {
                zoom = width_a4 / width;
            }
        }
        doc.write(`
            <style style="text/css"  media="print">  
                @page { 
                    size: A4 ${direction}
                }             
            </style>
            <div style='line-height: 1;transform: scale(${zoom}); transform-origin: 0% 0% 0px;'> 
                ${cloneEl.html()}
            </div>
    `);
        doc.close();
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
        iframe.onload = function (e) {
            document.body.removeChild(iframe);
        };
        newWin.close();
    }
}
