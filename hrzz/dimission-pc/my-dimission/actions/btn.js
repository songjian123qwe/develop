export default class ButtonAction {
    constructor(comp) {
        this.comp = comp;
    }

    // 第一次进页面的按钮状态
    updateBtnStatus = () => {
        const {props} = this.comp;
        const {button, main} = props;
        const {isEdit, page, handleData,isEditable} = main;
        const isFree = !!(handleData && handleData.workflow_state && handleData.workflow_state.value === '-1');
        const isSubmit = !!(handleData && handleData.workflow_state && handleData.workflow_state.value === '3');
        const showDeptTrans = !!(handleData && handleData.workflow_state && (handleData.workflow_state.value === '1' || handleData.workflow_state.value === '4'));
        const showDisList = !!(handleData && handleData.workflow_state && handleData.workflow_state.value === '5');

        button.setButtonVisible({
            add: ((page === 'main' || page === 'detail') && !isEdit) || (page === 'transItem' && isEditable),
            save: (page === 'detail' || page === 'transItem') && isEdit,
            cancel: (page === 'detail' || page === 'transItem') && isEdit,
            refresh: !isEdit,
            edit: ((isFree && page === 'detail') || (page === 'transItem' && isEditable)) && !isEdit,
            delete: isFree && page === 'detail' && !isEdit,
            submit: (isFree && page === 'detail' && !isEdit) || ((page === 'transItem' && isEditable) && !isEdit),
            callback: isSubmit && page === 'detail' && !isEdit,
            dept_trans: page === 'main' || (showDeptTrans && page === 'detail' && !isEdit),
            file_manage: page === 'detail' && !isEdit,
            check_flow: !!(handleData && handleData.pk_hi_stapply && page === 'detail' && !isEdit),
            dimission_list: showDisList && page === 'detail' && !isEdit
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
                if (page === 'disList') {
                    action.disAct.getTreeData();
                } else if (page === 'transItem') {
                    action.transAct.handleDeptTrans();
                } else if (page === 'main') {
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
                    action.formAct.refresh();
                }
                break;
            case 'edit':
                action.formAct.edit(handleData);
                break;
            case 'delete':
                action.formAct.delete(handleData);
                break;
            case 'submit':
                action.formAct.submit(handleData);
                break;
            case 'callback':
                action.formAct.takeBack(handleData);
                break;
            case 'save':
                action.formAct.save();
                break;
            case 'cancel':
                console.log("取消");
                
                action.formAct.cancel();
                break;
            case 'file_manage':
                action.formAct.fileManage(handleData);
                break;
            case 'check_flow':
                action.formAct.checkWorkflow(handleData);
                break;
            case 'dept_trans':
                action.formAct.showDeptTrans(handleData);
                break;
            case 'dimission_list':
                action.formAct.showDisList(handleData);
                break;
            default:
                break;
        }
    }
}