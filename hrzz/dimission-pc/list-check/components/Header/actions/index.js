export default class HeaderAction {
    constructor(comp) {
        this.comp = comp;
        this.dispatch = this.comp.props.dispatch;
    }

    // 自定义订单时间范围
    back = async () => {
        const {action, props} = this.comp;
        const {dispatch} = props;
        await dispatch({
            type: 'main/update',
            payload: {
                page: 'main'
            }
        });
        action.tableAct.getTableData();
        action.btnAct.updateBtnStatus();
    }
}