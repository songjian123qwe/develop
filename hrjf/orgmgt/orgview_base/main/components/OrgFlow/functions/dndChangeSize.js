import $ from "jquery";

/**
 * 拖动改变节点大小
 * @param item     拖动对象数据，为节点四个角，需要遍历添加拖动事件
 * @param callback   回调方法，结束拖动后需要改变数据的大小
 */
export default function dndChangeSize(item, callback) {
    /**
     * oldX，oldY: 拖动对象原始位置
     * oldTop，oldLeft: 节点原始位置
     * oldW, oldH: 节点原始大小
     */
    let oldX, oldY, oldTop, oldLeft, oldW, oldH, handleType, newData;
    const id = item.getId();
    const el = $(`#${id}`);
    const tl = $(`#${id}>.jtk-draw-skeleton>.jtk-draw-handle-tl`),
        tr = $(`#${id}>.jtk-draw-skeleton>.jtk-draw-handle-tr`),
        bl = $(`#${id}>.jtk-draw-skeleton>.jtk-draw-handle-bl`),
        br = $(`#${id}>.jtk-draw-skeleton>.jtk-draw-handle-br`);

    tl.bind("mousedown", (e) => start(e, 'tl'));
    tr.bind("mousedown", (e) => start(e, 'tr'));
    bl.bind("mousedown", (e) => start(e, 'bl'));
    br.bind("mousedown", (e) => start(e, 'br'));

    function start(event, type) {
        if (event.button === 0) {
            handleType = type;
            if (type === 'tl') {
                oldX = tl.offset().left;
                oldY = tl.offset().top;
            } else if (type === 'tr') {
                oldX = tr.offset().left;
                oldY = tr.offset().top;
            } else if (type === 'bl') {
                oldX = bl.offset().left;
                oldY = bl.offset().top;
            } else if (type === 'br') {
                oldX = br.offset().left;
                oldY = br.offset().top;
            }
            oldW = item.getWH().w;
            oldH = item.getWH().h;
            oldTop = item.getXY().y;
            oldLeft = item.getXY().x;
            $(document).bind("mousemove", move);
            $(document).bind("mouseup", stop);

        }
        return false;//阻止默认事件或冒泡
    }

    function move(event) {
        const gapX = event.clientX - oldX;
        const gapY = event.clientY - oldY;
        if (handleType === 'tl') {
            newData = {
                left: oldLeft + gapX,
                top: oldTop + gapY,
                width: oldW - gapX,
                height: oldH - gapY
            };
        } else if (handleType === 'tr') {
            newData = {
                left: oldLeft,
                top: oldTop + gapY,
                width: oldW + gapX,
                height: oldH - gapY
            };
        } else if (handleType === 'bl') {
            newData = {
                left: oldLeft + gapX,
                top: oldTop,
                width: oldW - gapX,
                height: oldH + gapY
            };
        } else if (handleType === 'br') {
            newData = {
                left: oldLeft,
                top: oldTop,
                width: oldW + gapX,
                height: oldH + gapY
            };
        }
        el.css(newData);
        return false;//阻止默认事件或冒泡
    }

    function stop() {
        $(document).unbind("mousemove", move);
        $(document).unbind("mouseup", stop);
        callback && callback(newData);
    }
}