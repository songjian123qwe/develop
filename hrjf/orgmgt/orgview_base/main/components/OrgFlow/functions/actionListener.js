import {removePoint, removeConn} from './remove';
import $ from "jquery";

/**
 * 监听键盘和鼠标右键事件
 */
export default function () {
    document.onkeydown = (e) => {
        let _key = window.event.keyCode;
        if (((isMac() && _key === 8) || (!isMac() && _key === 46)) && (this.selectedPoint || this.selectedCon)) {
            if (this.selectedPoint) {
                removePoint.call(this);
            } else {
                removeConn.call(this);
            }
        }
    };
    document.getElementById('container').oncontextmenu = (e) => {
        e.preventDefault();
        this.clearSelected();
    };
    window.onclick = () => {
        $("#right-menu").remove();
    };
}

function isMac() {
    return /macintosh|mac os x/i.test(navigator.userAgent);
}