export default function getTreeData(treeData, pk) {
    if (!pk) {
        return treeData;
    }
    if(!Array.isArray(treeData)){
        if (treeData.getId() === pk) {
            return treeData;
        } else if (Array.isArray(treeData.getChildren())) {
            let res = getTreeData(treeData.getChildren(), pk);
            if (res) {
                return res;
            }
        }
    }else{
        let length = treeData.length;
        for (let i = 0; i < length; i++) {
            let item = treeData[i];
            if (item.getId() === pk) {
                return item;
            } else if (Array.isArray(item.getChildren())) {
                let res = getTreeData(item.getChildren(), pk);
                if (res) {
                    return res;
                }
            }
        }
    }
}
