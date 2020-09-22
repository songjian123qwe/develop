import $ from 'jquery';
import initTreeData from "./initTreeData";
import drawPoint from "./drawPoint";

/**
 * @param node
 * 展开下级节点,如果下级节点为展开状态，则收起下级节点的下级节点
 */
export default function expandSub(node) {
    const children = node.getChildren(), nodeId = node.getId();
    if (children && children.length) {
        children.forEach(child => {
            let flag = child.getIsCollapsed(), id = child.getId(), el = $('#' + id);
            node.expand();
            if (!flag) child.collapse();
            if (!el.length) {
                //initTreeData.call(this);
                drawPoint.call(this, child);
                el = $('#' + id);
            }
            $('#' + nodeId).removeClass('collapsed');
            el.css('display', 'flex');
            this.instance.show(el, true);
        })
    }
}