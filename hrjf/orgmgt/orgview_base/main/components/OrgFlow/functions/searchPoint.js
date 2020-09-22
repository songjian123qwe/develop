import $ from "jquery";

export default function searchPoint(value) {
    const resultNode = findId.call(this, value);
    if (resultNode) {
        this.lastFindId = resultNode.getId();
        this.selectPoint(resultNode);
        const container = $('#container'), {x, y} = resultNode.getXY(), {w, h} = resultNode.getWH(),
            containerH = container.outerHeight(), containerW = container.outerWidth();
        //滑动到相应位置
        if (container.scrollLeft() < x + w - containerW) {
            container.animate({scrollLeft: x + w - containerW});
        }
        if (container.scrollTop() < y + h - containerH) {
            container.animate({scrollTop: y + h - containerH});
        }
        if (container.scrollLeft() > x) {
            container.animate({scrollLeft: x});
        }
        if (container.scrollTop() > y) {
            container.animate({scrollTop: y});
        }
    } else {
        this.lastFindId = '';
    }
}

function findId(value) {
    const {
        base_displaybudget, base_displayactualbudget,
        base_displaydm, base_displaydmpost
    } = this.props.hisImageConf;
    let flag = false, firstNode = null, resultNode = null, lastId = this.lastFindId;
    if (!lastId) flag = true;
    const search = function (node) {
        const id = node.getId(), info = node.getInfo(), children = node.getChildren(),
            orgType = node.getOrgType(), isCustom = node.getIsCustom(), isCollapsed = node.getIsCollapsed();
        if ((isCustom && ((info.name && info.name.indexOf(value) > -1)
            || (info.code && info.code.indexOf(value) > -1) ||
            (info.display_text && info.display_text.indexOf(value) > -1))) ||
            (orgType === 'post' && ((info.postname && info.postname.indexOf(value) > -1)
                || (info.postcode && info.postcode.indexOf(value) > -1))) ||
            (orgType !== 'post' && ((info.name && info.name.indexOf(value) > -1)
                || (info.code && info.code.indexOf(value) > -1)))
            || (base_displaybudget === "Y" && (info.budget_self && info.budget_self.indexOf(value) > -1)) ||
            (base_displayactualbudget === "Y" && (info.budget_actual && info.budget_actual.indexOf(value) > -1)) ||
            (base_displaydm === "Y" && (info.principal && info.principal.indexOf(value) > -1)) ||
            (base_displaydm === "Y" && base_displaydmpost === "Y" && (info.principal_post && info.principal_post.indexOf(value) > -1))) {
            if (flag) {
                resultNode = node;
                return true;
            } else {
                if (!firstNode) firstNode = node;
                if (id === lastId) flag = true;
            }
        }
        if (!isCollapsed && children && children.length) {
            return children.find(child => search(child));
        }
    };

    if (search(this.nodeData) || this.tempData.find(item => search(item))) {
        return resultNode;
    } else {
        return firstNode;
    }
}