export default class ButtonAction {
    constructor(comp) {
        this.comp = comp;
    }

    // 第一次进页面的按钮状态
    updateBtnStatus = () => {
        const {props} = this.comp;
        const {button, main} = props;
        const {page, workflow_state} = main;
        button.setButtonVisible({
            refresh: page === 'main',
            approve: page === 'detail' && workflow_state === '7',
            reject: page === 'detail' && workflow_state === '7'
        });
    };

    // 按钮点击回调
    headerClick = async (props, btnCode) => {
        const {action} = this.comp;
        if (btnCode === 'refresh') action.tableAct.getTableData();
        switch (btnCode) {
            case 'refresh':
                action.tableAct.getTableData();
                break;
            case 'approve':
                action.formAct.approveBill();
                break;
            case 'reject':
                action.formAct.rejectBill();
                break;
            default:
                break;
        }
    }
}