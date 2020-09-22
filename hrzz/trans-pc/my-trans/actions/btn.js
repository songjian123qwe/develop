export default class ButtonAction {
    constructor(comp) {
        this.comp = comp;
    }

    // 第一次进页面的按钮状态
    updateBtnStatus = () => {
        const {props} = this.comp;
        const {button, main} = props;
        const {isEdit, page, handleData} = main;
        const isFree = !!(handleData && handleData.approve_state && handleData.approve_state.value === '-1');
        const isSubmit = !!(handleData && handleData.approve_state && handleData.approve_state.value === '3');

        button.setButtonVisible({
            add: !isEdit,
            save: page === 'detail' && isEdit,
            cancel: page === 'detail' && isEdit,
            refresh: !isEdit,
            edit: isFree && page === 'detail' && !isEdit,
            del: isFree && page === 'detail' && !isEdit,
            search: false,
            commit: isFree && page === 'detail' && !isEdit,
            recover: isSubmit && page === 'detail' && !isEdit,
            aux_function: false,
            more: false,
            file_manage: page === 'detail' && !isEdit,
            check_flow: !!(handleData && handleData.pk_hi_stapply && page === 'detail' && !isEdit)
        });
    };

    // 按钮点击回调
    headerClick = async (props, btnCode) => {
        const {action} = this.comp;
        const {dispatch, main} = props;
        const {page, handleData} = main;
        switch (btnCode) {
            case 'add':
                action.formAct.add();
                break;
            case 'refresh':
                if (page === 'main') {
                    await dispatch({
                        type: 'main/update',
                        payload: {
                            pageInfo: {
                                pageSize: 10,
                                pageIndex: 0,
                                total: 0,
                                totalPage: 1
                            }
                        }
                    });
                    action.tableAct.getData();
                } else {
                    action.formAct.refresh()
                }
                break;
            case 'edit':
                action.formAct.edit(handleData);
                break;
            case 'del':
                action.formAct.delete(handleData);
                break;
            case 'commit':
                action.formAct.submit(handleData);
                break;
            case 'recover':
                action.formAct.takeBack(handleData);
                break;
            case 'save':
                action.formAct.save();
                break;
            case 'cancel':
                action.formAct.cancel();
                break;
            case 'file_manage':
                action.formAct.fileManage(handleData);
                break;
            case 'check_flow':
                action.formAct.checkWorkflow(handleData);
                break;
            default:
                break;
        }
    }
}