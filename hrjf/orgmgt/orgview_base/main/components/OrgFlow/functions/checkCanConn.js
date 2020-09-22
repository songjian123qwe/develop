/**
 * @param params
 * @returns {boolean}
 * 判断是否可以连接
 * 1.不能连接自己
 * 2.如果target已经有人连了，不能再连上去
 * 3.如果target是source的祖先，则不能连接，防止循环连接产生
 * 4.如果可以连，则关联两个数据
 * 5.从临时数据中删除已关联数据，一般来说目标节点为临时数据，
 *  只有一种情况，目标节点为根节点，这个时候源节点为临时数据
 *  并且需要用源节点的数据来替换主数据
 */
import $ from 'jquery';
import getTreeData from "./getTreeData";

export default function checkCanConn(params) {
    const sourceId = params.sourceId, targetId = params.targetId;
    //不能连接自己
    if (sourceId === targetId) return false;
    //一般来说子节点大概率来自临时数据，所以先查临时数据，如果有parentNode，说明已经被连接了，不能再连
    const childData = getTreeData(this.tempData, targetId) || getTreeData(this.nodeData, targetId);
    if (childData.getParentNode()) return false;
    //一般来说父节点大概率来自主数据，所以先查主数据
    const fatherData = getTreeData(this.nodeData, sourceId) || getTreeData(this.tempData, sourceId);
    //如果target是source的祖先，则不能连接，防止循环连接产生
    if (isAncestor(fatherData, targetId)) return false;
    //可以连接，关联父子节点数据
    $('#' + sourceId).removeClass('no-child');
    fatherData.addChild(childData);
    childData.setParent(fatherData);
    //从临时数据中删除子节点
    let index = this.tempData.indexOf(childData);
    if (index > -1) {
        this.tempData.splice(index, 1);
    } else {
        //获取父节点的祖先节点
        const ancestorData = getAncestor(fatherData);
        this.nodeData = ancestorData;
        index = this.tempData.indexOf(ancestorData);
        if (index > -1) this.tempData.splice(index, 1);
    }
    return true;
};

/**
 * @param node  当前需要判断的节点
 * @param id    目标节点ID
 *  判断当前节点的祖先是否是id为传入id的节点，如果是
 */
function isAncestor(node, id) {
    const fatherNode = node.getParentNode();
    if (!fatherNode) return false;
    if (fatherNode.getId() === id) return true;
    return isAncestor(fatherNode, id);
}

function getAncestor(node) {
    const fatherNode = node.getParentNode();
    if (!fatherNode) return node;
    return getAncestor(fatherNode);
}