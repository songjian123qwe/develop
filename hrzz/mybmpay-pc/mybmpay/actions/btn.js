export default class ButtonAction {
    constructor(comp) {
        this.comp = comp;
    }

    // 按钮点击回调
    headerClick = (props, btnCode) => {
        this.pubSub.publish('getAllTableData');
    };
}