import $ from "jquery";
import {myBrowser} from 'src/hrpub/common/utils/utils';
import html2canvas from "./html2canvas";
import canvg from "./canvg";

/**
 * @param fileName 导出图片名称downloadImg
 * @param scale 定义任意放大倍数 支持小数 默认两倍大小
 */
export default function (fileName, inlt, scale = 2) {
    const langFlag = !inlt || ['tradchn', 'simpchn'].indexOf(inlt) > -1;
    const canvasEl = $('#canvas'), container = $('#container');
    /*const width = Math.max(canvasEl.prop('scrollWidth'), container.outerWidth()),
        height = Math.max(canvasEl.prop('scrollHeight'), container.outerHeight());*/
    const width = canvasEl.prop('scrollWidth') + 10,
        height = canvasEl.prop('scrollHeight') + 10;
    canvasEl.css({
        height: height,
        width: width
    });
    const cloneEl = canvasEl.clone();
    canvasEl.css({
        height: '',
        width: ''
    });
    //由于svg无法引入和读取CSS，这里需要手动设置部分样式
    //可以考虑将部分样式放在组件style中或者有别的方法，将来有待改进
    const window = cloneEl.find('.window ').filter(function () {
        return $(this).css("display") !== "none"
    });
    window.css({
        zIndex: 24,
        cursor: 'pointer',
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#ffffff'
    });

    const windowHeader = window.find('.window-header');
    windowHeader.css({
        padding: '10px 3px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        minHeight: '40px'
    });

    const pointContent = window.find('.point-content');
    pointContent.css({
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%'
    });

    const pointTable = window.find('.point-table');
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

    //svg会出现两个xmlns  ie浏览器下删除一个xmlns属性
    if (myBrowser() === 'IE') {
        const svgItem = cloneEl.find('svg');
        svgItem.removeAttr("xmlns");
        const tempDiv = document.createElement('div');
        tempDiv.setAttribute('style', `position: relative;height: ${height}px;width:${width}px;`);
        tempDiv.setAttribute('id', 'download-canvas');
        tempDiv.innerHTML = cloneEl.html();
        document.body.style.overflow = 'hidden';
        document.body.appendChild(tempDiv);
        const nodesToRecover = [];
        const nodesToRemove = [];
        const svgElem = $('#download-canvas').find('svg');//divReport为需要截取成图片的dom的id
        svgElem.each(function (index, node) {
            const parentNode = node.parentNode;
            const svg = new XMLSerializer().serializeToString(node);

            const canvas = document.createElement('canvas');
            canvg(canvas, svg);
            if (node.style.position) {
                canvas.style.position += node.style.position;
                canvas.style.left += node.style.left;
                canvas.style.top += node.style.top;
            }

            nodesToRecover.push({
                parent: parentNode,
                child: node
            });
            parentNode.removeChild(node);

            nodesToRemove.push({
                parent: parentNode,
                child: canvas
            });

            parentNode.appendChild(canvas);
        });

        html2canvas(document.getElementById('download-canvas')).then(canvas => {
            document.body.removeChild(tempDiv);
            const arr = canvas.toDataURL("image/png").split(',');
            const mime = arr[0].match(/:(.*?);/)[1];
            const bstr = atob(arr[1]);
            let n = bstr.length;
            const u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            navigator.msSaveBlob(new Blob([u8arr], {type: mime}), (fileName || "download") + ".png");
        });
    } else {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;

        const tempImg = new Image();
        tempImg.setAttribute('crossOrigin', 'anonymous');
        tempImg.addEventListener('load', onTempImageLoad);
        tempImg.src = 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${width * scale}px" height="${height * scale}px"><foreignObject width="100%" height="100%" style="background: #ffffff">
            <div xmlns="http://www.w3.org/1999/xhtml" style="line-height: 1">
             ${cloneEl.html()}
            </div></foreignObject></svg>`);

        const targetImg = document.createElement('img');
        targetImg.style.position = 'absolute';
        document.body.appendChild(targetImg);

        function onTempImageLoad(e) {
            ctx.drawImage(e.target, 0, 0);
            document.body.removeChild(targetImg);
            download(fileName || '', canvas.toDataURL("image/png"));
        }
    }
}

function download(fileName, content) {
    const blob = dataURLtoBlob(content);
    const aLink = document.createElement('a');
    aLink.download = fileName;
    aLink.href = URL.createObjectURL(blob);
    aLink.click();
}

function dataURLtoBlob(dataurl) {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type: mime});
}
