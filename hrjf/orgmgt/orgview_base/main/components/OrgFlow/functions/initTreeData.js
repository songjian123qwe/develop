/**
 设置初始数据：
 两个节点之间上下间隔 paddTB;
 两个节点之间左右间隔 paddLR;
 */
import resetNodeWH from "./resetNodeWH";

const paddTB = 10, paddLR = 20;

const layoutTree = function (rootNode, state, config, isResetWH, isHandleLevel) {
    const {isLandscape} = state;
    const nodeWapper = function (node, parentWapper, parentLevel) {
        if (isResetWH) resetNodeWH(node, config);
        let level = parentLevel ? parentLevel + 1 : 1;
        if (isHandleLevel) {
            //只有当前层级等于显示层级的时候才收缩该数据，下面的层级状态仍然为展开
            //这样的结果是展开改数据的时候所有下级全部可以展开
            if (level < Number(state.level)) {
                node.expand();
            }
            if (level === Number(state.level)) {
                node.collapse()
            }
        }
        this.x = 0;
        this.y = 0;
        this.tempX = 0;
        this.tempY = 0;
        this.isCollapsed = node.getIsCollapsed();
        this.visible = node.getVisible();
        this.tempW = node.getWH().w + (isLandscape ? paddLR : paddTB) * 2;
        this.tempH = node.getWH().h + (isLandscape ? paddTB : paddLR) * 2;
        this.w = node.getWH().w + (isLandscape ? paddLR : paddTB) * 2;
        this.h = node.getWH().h + (isLandscape ? paddTB : paddLR) * 2;
        this.node = node;
        this.parentWapper = parentWapper;
        this.children = node.getChildren().map((child) => new nodeWapper(child, this, level));
        this.initNodeXY = function () {
            if (isLandscape) {
                if (this.visible) {
                    this.node.setXY(this.x + paddTB, this.tempY + (this.tempH - this.node.getWH().h) / 2);
                } else {
                    this.node.setXY(this.x + paddTB, this.y + (this.h - this.node.getWH().h) / 2);
                }
            } else {
                if (this.visible) {
                    this.node.setXY(this.tempX + (this.tempW - this.node.getWH().w) / 2, this.y + paddTB);
                }else{
                    this.node.setXY(this.x + (this.w - this.node.getWH().w) / 2, this.y + paddTB);
                }
            }

        }
    };

    const layoutLandscapeWH = function (nodewapper) {
        let w = 0,
            h = 0,
            tempH = 0;
        nodewapper.children.forEach(function (wapper) {
            layoutLandscapeWH(wapper);
            if (wapper.visible) {
                tempH = tempH + wapper.tempH;
            }
            h = h + wapper.h;
            w = wapper.w > w ? wapper.w : w;
        });
        nodewapper.h = nodewapper.h > h ? nodewapper.h : h;
        nodewapper.tempH = nodewapper.tempH > tempH ? nodewapper.tempH : tempH;
        nodewapper.children.forEach(function (wapper) {
            if (h !== 0 && nodewapper.h > h) {
                wapper.h += (nodewapper.h - h) / nodewapper.children.length;
            }
            if (tempH !== 0 && nodewapper.tempH > tempH) {
                wapper.tempH += (nodewapper.tempH - tempH) / nodewapper.children.length;
            }
            wapper.w = w;
        });
    };

    const layoutLandscapeXY = function (nodewapper) {
        //优先计算自己
        const parentWapper = nodewapper.parentWapper;
        if (parentWapper) {
            const curIndex = parentWapper.children.indexOf(nodewapper);
            nodewapper.x = parentWapper.x + parentWapper.w;
            if (curIndex === 0) {
                nodewapper.y = parentWapper.y;
                nodewapper.tempY = parentWapper.tempY;
            } else {
                nodewapper.y = parentWapper.children[curIndex - 1].y + parentWapper.children[curIndex - 1].h;
                nodewapper.tempY = parentWapper.children[curIndex - 1].tempY + parentWapper.children[curIndex - 1].tempH;
            }
            nodewapper.initNodeXY();
            nodewapper.children.forEach(function (wapper) {
                layoutLandscapeXY(wapper);
            });
        } else {
            nodewapper.initNodeXY();
            nodewapper.children.forEach(function (wapper) {
                layoutLandscapeXY(wapper);
            });
        }
    };

    const layoutVerticalWH = function (nodewapper) {
        let w = 0,
            h = 0,
            tempW = 0;
        nodewapper.children.forEach(function (wapper) {
            layoutVerticalWH(wapper);
            if (wapper.visible) {
                tempW = tempW + wapper.tempW;
            }
            w = w + wapper.w;
            h = wapper.h > h ? wapper.h : h;
        });
        nodewapper.w = nodewapper.w > w ? nodewapper.w : w;
        nodewapper.tempW = nodewapper.tempW > tempW ? nodewapper.tempW : tempW;
        nodewapper.children.forEach(function (wapper) {
            if (w !== 0 && nodewapper.w > w) {
                wapper.w += (nodewapper.w - w) / nodewapper.children.length;
            }
            if (tempW !== 0 && nodewapper.tempW > tempW) {
                wapper.tempW += (nodewapper.tempW - tempW) / nodewapper.children.length;
            }
            wapper.h = h;
        });
    };

    const layoutVerticalXY = function (nodewapper) {
        //优先计算自己
        let parentWapper = nodewapper.parentWapper;
        if (parentWapper) {
            let curIndex = parentWapper.children.indexOf(nodewapper);
            nodewapper.y = parentWapper.y + parentWapper.h;
            if (curIndex === 0) {
                nodewapper.x = parentWapper.x;
                nodewapper.tempX = parentWapper.tempX;
            } else {
                nodewapper.x = parentWapper.children[curIndex - 1].x + parentWapper.children[curIndex - 1].w;
                nodewapper.tempX = parentWapper.children[curIndex - 1].tempX + parentWapper.children[curIndex - 1].tempW;
            }
            nodewapper.initNodeXY();
            nodewapper.children.forEach(function (wapper) {
                layoutVerticalXY(wapper);
            });
        } else {
            nodewapper.initNodeXY();
            nodewapper.children.forEach(function (wapper) {
                layoutVerticalXY(wapper);
            });
        }
    };

    const rootWapper = new nodeWapper(rootNode);
    if (isLandscape) {
        layoutLandscapeWH(rootWapper);
        layoutLandscapeXY(rootWapper);
    } else {
        layoutVerticalWH(rootWapper);
        layoutVerticalXY(rootWapper);
    }
};

export default function initTreeData(isResetWH, isHandleLevel) {
    layoutTree(this.nodeData, this.state, this.props.hisImageConf, isResetWH, isHandleLevel);
}