import $ from 'jquery';
import TreeNode from './initData';
import drawPoint from './drawPoint';

export default function addNew(info) {
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
    const containerEl = $('#container');
    //计算新增节点位置，在容器中心
    const {common_height, common_width} = this.props.hisImageConf,
        elW = containerEl.width(), elH = containerEl.height(),
        scrollL = containerEl.scrollLeft(), scrollT = containerEl.scrollTop();
    newData.setWH(common_width, common_height);
    newData.setXY(scrollL + elW / 2 - common_width / 2, scrollT + elH / 2 - common_height / 2);
    this.tempData.push(newData);
    drawPoint.call(this, newData, true);
    this.selectPoint(newData);
}

function getUUID() {
    return String(new Date().getTime()).slice(-5) + Math.round(Math.random() * 1e8).toString();
}