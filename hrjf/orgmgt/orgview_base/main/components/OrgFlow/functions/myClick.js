/**
 * 防止拖拽时同时触发点击
 * @param el 需要添加click事件的dom
 * @param action  click事件
 * @param time  鼠标点下抬起间隔时间
 *
 * flag: 是否已经超过时间间隔，如果超过不再触发点击事件
 * timer: 计时器，如果鼠标抬起或者超过时间间隔则删除计时器
 */

let flag, timer;

export default function myClick(el, action, time = 500) {
    el.contextmenu((e) => {
        e.stopPropagation();
        e.preventDefault();
    });
    el.mousedown((e) => {
        if (e.button !== 0) return;
        flag = true;
        timer = setTimeout(() => {
            flag = false;
            clearTimeout(timer);
        }, time)
    });
    el.mouseup((e) => {
        if (e.button !== 0) return;
        if (flag) {
            clearTimeout(timer);
            action();
        }
    })
}