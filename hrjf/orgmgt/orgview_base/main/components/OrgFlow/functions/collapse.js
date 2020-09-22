import $ from 'jquery';
import initTreeData from "./initTreeData";
import drawPoint from "./drawPoint";

/**
 * 只操作当前节点数据，子节点isCollapsed状态不变，如果收起当前节点收起，则所有子节点收起，
 *如果当前节点展开，则根据子节点自身状态判断是否要展开
 */
export default function collapse(node, isAll) {
    //flag： 收起展开标志，false 展开状态，需要收起,并调用collapse方法将数据isCollapsed置为true
    const flag = node.getIsCollapsed(), children = node.getChildren(), nodeId = node.getId();
    if (children && children.length) {
        children.forEach(child => {
            let id = child.getId(), el = $('#' + id);
            if (!flag) {
                //不能用display:none样式，否则该节点位置会改变，如果有连线操作的话线条会乱....这句当我没说
                $('#' + nodeId).addClass('collapsed');
                el.css('display', 'none');
                this.instance.hide(el, true);
                node.collapse();
            } else {
                node.expand(isAll);
                if (!el.length) {
                    //initTreeData.call(this);
                    drawPoint.call(this, child);
                    el = $('#' + id);
                }
                $('#' + nodeId).removeClass('collapsed');
                el.css('display', 'flex');
                this.instance.show(el, true);
            }
            subCollapse.call(this, child, flag);
        })
    }
}

/**
 *操作子节点，如果flag=false 此时为收起操作，如果当前子节点isCollapsed状态为false说明是展开状态，需要收起，
 *如果是true,说明已经收起，不需要操作；
 *反之，如果flag=true，此时为展开操作，如果当前子节点isCollapsed状态为false说明之前是展开状态，需要再次展开，
 *如果是true,说明之前就是收起状态，此时不能展开
 */
function subCollapse(node, flag) {
    const subFlag = node.getIsCollapsed(), children = node.getChildren(), nodeId = node.getId();
    if ((!flag && subFlag) || (flag && subFlag)) return;
    if (children && children.length) {
        children.forEach(child => {
            let id = child.getId(), el = $('#' + id);
            if (!flag) {
                $('#' + nodeId).addClass('collapsed');
                //el.css('visibility', 'hidden');
                el.css('display', 'none');
                this.instance.hide(el, true);
            } else {
                if (!el.length) {
                    //initTreeData.call(this);
                    drawPoint.call(this, child);
                    el = $('#' + id);
                }
                //el.css('visibility', 'visible');
                el.css('display', 'flex');
                $('#' + nodeId).removeClass('collapsed');
                this.instance.show(el, true);
            }
            subCollapse.call(this, child, flag);
        })
    }
}