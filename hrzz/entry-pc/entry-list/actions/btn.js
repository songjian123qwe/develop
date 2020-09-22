export default class ButtonAction {
    constructor(comp) {
        this.comp = comp;
    }

    // 按钮点击回调
    headerClick = async (props, btnCode) => {
        const {action} = this.comp;
        if (btnCode === 'refresh') action.treeAct.getTreeData();
    }
}