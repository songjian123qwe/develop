import {promptBox, toast} from 'nc-lightapp-front';

export default class FormAction {
    constructor(comp) {
        this.comp = comp;
        this.dispatch = this.comp.props.dispatch;
    }

    approveBill = () => {
        const {props: {main: {language, billid}}, action} = this.comp;
        promptBox({
            color: "warning",
            title: language['hrzzpc-000074'],
            content: language['hrzzpc-000119'],
            beSureBtnClick: async () => {
                let res = await this.dispatch({
                    type: 'main/approve',
                    payload: {billid}
                });
                if (res.success) {
                    await this.dispatch({
                        type: 'main/update',
                        payload: {
                            workflow_state: '5'
                        }
                    });
                    toast({color: 'success', content:language['hrzzpc-000165'] || "审核成功!"});
                    action.btnAct.updateBtnStatus();
                }
            }
        });
    };

    rejectBill = () => {
        const {props: {main: {language, billid}}, action} = this.comp;
        promptBox({
            color: "warning",
            title: language['hrzzpc-000074'],
            content: language['hrzzpc-000120'],
            beSureBtnClick: async () => {
                let res = await this.dispatch({
                    type: 'main/reject',
                    payload: {billid}
                });
                if (res.success) {
                    await this.dispatch({
                        type: 'main/update',
                        payload: {
                            workflow_state: '5'
                        }
                    });
                    action.btnAct.updateBtnStatus();
                }
            }
        });
    }
}