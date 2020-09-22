/**
 * @constructor
 * 组织机构图数据构造函数
 * 更改为构造函数+原型设计模式 将数据暴露出来，方便看数据
 */
export default function TreeNode(treeData, parentNode) {
    this.x = treeData.x;
    this.y = treeData.y;
    this.width = treeData.width;
    this.height = treeData.height;
    this.nodeVO = treeData.nodeVO;
    this.children = (!treeData.children ? [] : treeData.children).map((data) => new TreeNode(data, this));
    this.parent = parentNode;
    this.collapsed = treeData.collapsed === true;
    this.m_isDirty = treeData.m_isDirty === true;
    this.status = treeData.status || '0';
    this.visible = treeData.visible === undefined || treeData.visible;
    this.isRoot = treeData.isRoot;
}

TreeNode.prototype.expand = function (all) {
    if (!this.collapsed) return;
    this.collapsed = false;
    if (all) this.children.forEach(function (node) {
        node.expand(all)
    });
    this.setVisible(true);
};

TreeNode.prototype.collapse = function (all) {
    if (this.collapsed) return;
    this.collapsed = true;
    if (all) this.children.forEach(function (node) {
        node.collapse(all)
    });
    this.setVisible(false);
};

TreeNode.prototype.getIsCollapsed = function () {
    return this.collapsed;
};

TreeNode.prototype.setXY = function (x0, y0) {
    this.x = Number(x0);
    this.y = Number(y0);
};

TreeNode.prototype.getXY = function () {
    return {x: this.x, y: this.y};
};

TreeNode.prototype.setWH = function (w0, h0) {
    this.width = Number(w0);
    this.height = Number(h0);
};

TreeNode.prototype.getWH = function () {
    return {w: this.width, h: this.height};
};

TreeNode.prototype.getChildren = function () {
    return this.children;
};

TreeNode.prototype.addChild = function (child) {
    const children = this.getChildren();
    children.push(child);
};

TreeNode.prototype.removeChild = function (child) {
    const children = this.getChildren(), index = children.indexOf(child);
    if (index === -1) return;
    children.splice(index, 1);
};

TreeNode.prototype.removeParent = function () {
    this.parent = null;
};

TreeNode.prototype.setParent = function (parentNode) {
    this.parent = parentNode;
};

TreeNode.prototype.getParentNode = function () {
    return this.parent;
};

TreeNode.prototype.getInfo = function () {
    return this.nodeVO.values;
};

TreeNode.prototype.getId = function () {
    return this.nodeVO.id;
};

TreeNode.prototype.getOrgType = function () {
    let orgType = this.nodeVO.orgType;
    if(this.nodeVO.values.depttype === '1'){
        orgType = 'virtualDept';
    }
    return orgType;
};

TreeNode.prototype.getStatus = function () {
    return this.nodeVO.status;
};

TreeNode.prototype.getIsCustom = function () {
    //自定义的节点中不包含pk_org这个属性，
    // 但同时集团节点也没有这个属性，
    // 现在组织机构图中不会出现集团节点，
    //如果以后出现，需要在这里做集团节点的特殊判断
    return !this.nodeVO.values.hasOwnProperty("pk_org");
};

TreeNode.prototype.setVisible = function (flag) {
    this.children.forEach(function (node) {
        node.visible = flag;
        if (!flag) {
            node.setVisible(flag);
        } else {
            if (!node.collapsed) {
                node.setVisible(flag);
            }
        }
    });
};

TreeNode.prototype.getVisible = function () {
    return this.visible;
};

TreeNode.prototype.setNodeVO = function (value) {
    this.nodeVO = value;
};

TreeNode.prototype.getIsRoot = function () {
    return this.isRoot;
};

/*

export default function TreeNode(treedata, parentNode) {
    let [x, y, w, h] = [0, 0, 160, 90],
        data = treedata,
        children = [],
        parent = parentNode,
        isCollapsed = true;

    this.expand = function (all) {
        if (isCollapsed) return;
        isCollapsed = true;
        if (all) children.forEach(function (node) {
            node.expand(all)
        });
    };

    this.collapse = function (all) {
        if (!isCollapsed) return;
        isCollapsed = false;
        if (all) children.forEach(function (node) {
            node.collapse(all)
        });
    };

    this.getIsCollapsed = function () {
        return isCollapsed;
    };

    this.setXY = function (x0, y0) {
        x = x0;
        y = y0;
    };

    this.getXY = function () {
        return {x: x, y: y};
    };

    this.setWH = function (w0, h0) {
        w = Number(w0);
        h = Number(h0);
    };

    this.getWH = function () {
        return {w: w, h: h};
    };

    this.getChildren = function () {
        return children;
    };

    this.addChild = function (child) {
        const children = this.getChildren();
        children.push(child);
    };

    this.removeChild = function (child) {
        const children = this.getChildren(), index = children.indexOf(child);
        if (index === -1) return;
        children.splice(index, 1);
    };

    this.removeParent = function () {
        parent = null;
    };

    this.setParent = function (parentNode) {
        parent = parentNode;
    };

    this.getParentNode = function () {
        return parent;
    };

    this.getInfo = function () {
        return data.values;
    };

    this.getId = function () {
        return data.id;
    };

    this.getOrgType = function () {
        return data.orgType;
    };

    this.getStatus = function () {
        return data.status;
    };

    this.getIsCustom = function () {
        return data.isCustom
    };

    children = (!treedata.children ? [] : treedata.children).map((data) => new TreeNode(data, this));
};*/
