import {promptBox, toast} from 'nc-lightapp-front';

export default class HeaderAction {
    constructor(comp) {
        this.comp = comp;
        this.dispatch = this.comp.props.dispatch;
    }

    // 自定义订单时间范围
    back = async () => {
        const {props: {main: {language, page, lastPage, handleData}, form}, action} = this.comp;
        if (page === 'transItem' || page === 'disList') {
            await this.dispatch({
                type: 'main/update',
                payload: {
                    page: lastPage === 'detail' ? 'detail' : 'main',
                    isEdit: false,
                    transSearched: false
                }
            });
            action.btnAct.updateBtnStatus();
            if (lastPage === 'detail') {
                action.formAct.checkOneBill(handleData);
            } else {
                action.tableAct.getData();
            }
        } else {
            let status = form.getFormStatus('card');
            if (status === 'browse') {
                await this.dispatch({
                    type: 'main/update',
                    payload: {
                        page: 'main',
                        isEdit: false
                    }
                });
                action.btnAct.updateBtnStatus();
                action.tableAct.getData();
            } else {
                promptBox({
                    color: "warning",
                    title: language['hrzzpc-000074'],
                    content: language['hrzzpc-000081'],
                    beSureBtnClick: async () => {
                        const {action} = this.comp;
                        let formData = form.getAllFormValue('card');
                        let res = await this.dispatch({
                            type: 'main/cancel',
                            payload: {model: formData}
                        });
                        if (res.success) {
                            await this.dispatch({
                                type: 'main/update',
                                payload: {
                                    page: 'main',
                                    isEdit: false
                                }
                            });
                            action.btnAct.updateBtnStatus();
                            action.tableAct.getData();
                        }
                    }
                });
            }
        }
    }
}