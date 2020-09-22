import $ from 'jquery';
import TreeNode from './initData';
import drawPoint from './drawPoint';

export default function addSubPoint(info) {
    const testData = {
        nodeVO: {
            id: getUUID(),
            orgType: info.orgType,
            values: {
                code: info.code,
                name: info.name,
                display_text: info.display_text
            }
        }
    };
    let newData = new TreeNode(testData);
    let {common_height, common_width} = this.props.hisImageConf;
    common_height = Number(common_height);
    common_width = Number(common_width);
    newData.setWH(common_width, common_height);
    /**
     * 计算新增节点坐标，
     * 1. 纵向的时候
     * 如果父节点没有子节点，则坐标X 为父节点x + 父节点宽度 + 40px ,Y为父节点坐标Y
     * 如果父节点有子节点，则先找到最后一个子节点
     * 新节点的坐标X 最后一个子节点坐标X, Y为最后一个子节点坐标Y + 最后一个子节点高度 + 20
     * 2.横向的时候
     * 如果父节点没有子节点，则坐标Y 为父节点Y + 父节点高度 + 40px ,X为父节点坐标X
     * 如果父节点有子节点，则先找到最后一个子节点
     * 新节点的坐标Y 最后一个子节点坐标Y, X为最后一个子节点坐标X + 最后一个子节点宽度 + 20
     * 3.页面滑动到相应位置
     * 4.选中该节点
     */
    const id = this.selectedPoint.getId(), {w, h} = this.selectedPoint.getWH(),
        children = this.selectedPoint.getChildren(), pos = this.selectedPoint.getXY();
    const parentNode = $('#' + id), container = $('#container'),
        containerH = container.outerHeight(), containerW = container.outerWidth();
    const top = pos.y, left = pos.x;
    if (this.state.isLandscape) {
        if (!children.length) {
            newData.setXY(left + w + 40, top);
            parentNode.removeClass('no-child');
            if (container.scrollLeft() < left + w + 50 + common_width - containerW) {
                let timer = setTimeout(function () {
                    container.animate({scrollLeft: left + w + 50 + common_width - containerW});
                    clearTimeout(timer);
                }, 0);
            }
        } else {
            const lastNode = children[children.length - 1];
            const {x, y} = lastNode.getXY(), {w, h} = lastNode.getWH();
            newData.setXY(x, y + h + 20);
            if (container.scrollTop() < y + h + 30 + common_height - containerH) {
                let timer = setTimeout(function () {
                    container.animate({scrollTop: y + h + 30 + common_height - containerH});
                    clearTimeout(timer);
                }, 0);
            }
        }

    } else {
        if (!children.length) {
            newData.setXY(left, top + h + 40);
            parentNode.removeClass('no-child');
            if (container.scrollTop() < top + h + 50 + common_height - containerH) {
                let timer = setTimeout(function () {
                    container.animate({scrollTop: top + h + 50 + common_height - containerH});
                    clearTimeout(timer);
                }, 0)
            }
        } else {
            const lastNode = children[children.length - 1];
            const {x, y} = lastNode.getXY(), {w, h} = lastNode.getWH();
            newData.setXY(x + w + 20, y);
            if (container.scrollLeft() < x + w + 30 + common_width - containerW) {
                let timer = setTimeout(function () {
                    container.animate({scrollLeft: x + w + 30 + common_width - containerW});
                    clearTimeout(timer);
                }, 0);
            }
        }
    }
    this.selectedPoint.addChild(newData);
    newData.setParent(this.selectedPoint);
    drawPoint.call(this, newData);
    this.selectPoint(newData);
}

function getUUID() {
    return String(new Date().getTime()).slice(-5) + Math.round(Math.random() * 1e8).toString();
}