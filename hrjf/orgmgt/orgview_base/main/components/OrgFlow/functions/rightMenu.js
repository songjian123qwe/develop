import $ from "jquery";
import {removePoint} from "./remove";
import collapse from "./collapse";
import expandSub from "./expandSub";

export default function (event, node) {
    $("#right-menu").remove();
    getRightMenu.call(this, node);
    const menu = $("#right-menu"), container = $("#container"),
        {top, left} = container.offset(), container_width = container.width(),
        menu_width = menu.outerWidth(), container_height = container.height(),
        menu_height = menu.outerHeight(), headerH = 54;
    /**
     * 计算弹出框位置，鼠标相对于屏幕的坐标，减去容器相对于屏幕的坐标，再加上容器滚动的距离
     * 如果鼠标相对屏幕的坐标加上弹出框的大小，超过了容器的大小，则说明弹出框会超出容器
     * 这个时候坐标减去弹出框大小，让弹出框出现在容器内部
     * 加上header高度
     */
    let x0 = event.clientX - left, y0 = event.clientY - top + headerH;
    if (event.clientX - left + menu_width > container_width) {
        x0 -= menu_width;
    }
    if (event.clientY - top + menu_height > container_height) {
        y0 -= menu_height;
    }
    menu.css({
        left: x0,
        top: y0
    });
    //事件委托
    menu.click((e) => {
        e.stopPropagation();
        if (!e.target.id || e.target.id === 'right-menu' || e.target.classList.contains('disabled')) return;
        switch (e.target.id) {
            case 'expandSub':
                expandSub.call(this, node);
                break;
            case 'expandAll':
                collapse.call(this, node, true);
                break;
            case 'collapseAll':
                collapse.call(this, node);
                break;
            case 'subDept':
                this.showDeptData(node);
                break;
            case 'subPost':
                this.showPostData(node);
                break;
            case 'member':
                this.showMemberData(node);
                break;
            case 'addSub':
                this.addNew('sub');
                break;
            case 'edit':
                this.addNew('edit', node);
                break;
            case 'delete':
                removePoint.call(this);
                break;
            default:
                break;
        }
        $("#right-menu").remove();
    })
}

function getRightMenu(node) {
    const bodyEl = $("#container"), orgType = node.getOrgType(), isCustom = node.getIsCustom(),
        isRoot = node.getIsRoot(),
        childrenFlag = !!node.getChildren().length, isCollapsed = node.getIsCollapsed();
    const {json} = this.props;
    let menu = `<div id='right-menu'>`;
    menu += `<div class="menu-item ${childrenFlag && isCollapsed ? '' : 'disabled'}" id="expandSub">
                    ${json['jf6005-000485']}
                </div>
                <div class="menu-item ${childrenFlag && isCollapsed ? '' : 'disabled'}" id="expandAll">
                    ${json['jf6005-000486']}
                </div>
                <div class="menu-item ${childrenFlag && !isCollapsed ? '' : 'disabled'}" id="collapseAll">
                    ${json['jf6005-000487']}
                </div>`;
    menu += `<div class="split-line"/>`;
    if (orgType === 'org') {
        menu += `<div class="menu-item ${isCustom ? 'disabled' : ''}" id="subDept">
                    ${json['jf6005-000488']}
                </div>`;
    }
    if (orgType === 'dept' || orgType === 'virtualDept') {
        menu += `<div class="menu-item ${isCustom ? 'disabled' : ''}" id="subPost">
                    ${json['jf6005-000489']}
                </div>`;
    }
    menu += `<div class="menu-item ${isCustom ? 'disabled' : ''}" id="member">
                    ${json['jf6005-000490']}
                </div>`;
    menu += `<div class="split-line"/>`;
    menu += `<div class="menu-item" id="addSub">
                    ${json['jf6005-000491']}
                </div>`;
    if (isCustom) {
        menu += `<div class="menu-item" id="edit">
                    ${json['jf6005-000492']}
                </div>`;
    }
    menu += `<div class="menu-item ${isRoot ? 'disabled' : ''}" id="delete">
                   ${json['jf6005-000113']}
                </div>`;
    menu += `</div>`;
    bodyEl.append(menu);
}

