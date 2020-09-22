/**
 * 删除节点：
 * 0.如果该节点是根节点，则不能删除
 * 1.删除节点，
 * 2.删除节点上的endpoint
 * 3.删除节点上的连线
 * (1-3) remove方法一次完成
 * 4.去掉父节点上的该子节点
 * 5.断开该节点与父节点数据连接
 * 6.断开该节点子节点与该节点的数据连接
 * 7.将该节点的子节点放入tempData中备用
 * 8.如果该节点在tempData中，则删除
 * 9.如果该节点是收缩状态，则显示子节点
 * 10.已选中节点置为空
 */
import $ from 'jquery';
import {toast} from 'nc-lightapp-front';
import getTreeData from "./getTreeData";

export function removePoint() {
    if (this.selectedPoint.getIsRoot()) {
        toast({color: "danger", content: this.props.json['jf6005-000484']});/* 国际化处理： 不能删除根节点*/
        return;
    }
    const id = this.selectedPoint.getId(), flag = this.selectedPoint.getIsCollapsed();
    //删除节点
    this.instance.remove(id);
    //如果有父节点 去掉父节点上的该子节点 父节点隐藏收起按钮
    const parent = this.selectedPoint.getParentNode();
    if (parent) {
        parent.removeChild(this.selectedPoint);
        const parentId = parent.getId(), parentChildren = parent.getChildren();
        if (!parentChildren.length) $('#' + parentId).addClass('no-child');
    }
    //断开该节点子节点与该节点的数据连接
    const children = this.selectedPoint.getChildren();
    if (children && children.length) {
        children.forEach(child => {
            child.removeParent();
            //如果该节点是收缩状态，则显示子节点
            if (!flag) expandAll.call(this, child);
        });
    }
    /**
     * 如果根目录在父节点中，将该节点的子节点放入tempData中备用
     * 如果跟目录不再父节点，将父节点放入tempData中，
     * 在子节点中寻找包含根目录的，将包含根目录的子节点变为nodeData
     * 将其他子节点放入tempData中
     */
    if (this.selectedPoint === this.nodeData) {
        children.forEach(child => {
            if (getIsRootData(child)) {
                this.nodeData = child;
            } else {
                this.tempData.push(child);
            }
        })
    } else {
        let isRootData = getIsRootData(this.nodeData);
        if (isRootData) {
            //将该节点的子节点放入tempData中备用
            this.tempData = this.tempData.concat(children);
        } else {
            this.tempData.push(this.nodeData);
            children.forEach(child => {
                if (getIsRootData(child)) {
                    this.nodeData = child;
                } else {
                    this.tempData.push(child);
                }
            })
        }
    }
    //如果该节点在tempData中，则删除
    const index = this.tempData.indexOf(this.selectedPoint);
    if (index > -1) this.tempData.splice(index, 1);

    this.selectedPoint = null;
}

/**
 * 删除连接：
 * 1.删除连接，
 * 2.断开子节点与父节点数据连接
 * 3.将子节点放入tempData中备用
 * 4.已选中节点置为空
 */

export function removeConn() {
    //const {conn, fatherData, childData} = this.selectedCon;
    //删除连接
    this.instance.deleteConnection(this.selectedCon);
    //获取父节点和子节点数据 一般来说数据在临时数据里面的可能性较小，所以先查主数据
    const fatherId = this.selectedCon.sourceId, childId = this.selectedCon.targetId;
    const fatherData = getTreeData(this.nodeData, fatherId) || getTreeData(this.tempData, fatherId);
    const childData = getTreeData(this.nodeData, childId) || getTreeData(this.tempData, childId);
    //断开子节点与父节点数据连接
    fatherData.removeChild(childData);
    if (!fatherData.getChildren().length) $('#' + fatherId).addClass('no-child');
    childData.removeParent();
    //const flag = isTempData(this.tempData, childData.getId());
    let isRootData = getIsRootData(this.nodeData);
    if (isRootData) {
        //将该节点的子节点放入tempData中备用
        this.tempData.push(childData);
    } else {
        this.tempData.push(this.nodeData);
        this.nodeData = childData;
    }

    this.selectedCon = null;
}

function expandAll(node) {
    let id = node.getId(), el = $('#' + id), isCollapsed = node.getIsCollapsed(), children = node.getChildren();
    el.css('visibility', 'visible');
    this.instance.show(el, true);
    if (isCollapsed && children.length) {
        children.forEach(child => expandAll.call(this, child))
    }
}

function getIsRootData(treeData) {
    if (!Array.isArray(treeData)) {
        if (treeData.getIsRoot()) {
            return true;
        } else if (Array.isArray(treeData.getChildren())) {
            let res = getIsRootData(treeData.getChildren());
            if (res) {
                return res;
            }
        }
    } else {
        let length = treeData.length;
        for (let i = 0; i < length; i++) {
            let item = treeData[i];
            if (item.getIsRoot()) {
                return true;
            } else if (Array.isArray(item.getChildren())) {
                let res = getIsRootData(item.getChildren());
                if (res) {
                    return res;
                }
            }
        }
    }
}