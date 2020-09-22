import {promptBox, toast} from 'nc-lightapp-front';

export default class HeaderAction {
    constructor(comp) {
        this.comp = comp;
        this.dispatch = this.comp.props.dispatch;
    }

    startPeriodChange = (value) => {
        const {props} = this.comp;
        const {dispatch, main} = props;
        const {endPeriod, language} = main;
        if (endPeriod.refpk && value.refpk > endPeriod.refpk) {
            toast({color: 'danger', content: language['hrzzpc-000132']});
            dispatch({
                type: 'main/update',
                payload: {
                    startPeriod: {},
                    bmClass: []
                }
            });
            return;
        }
        dispatch({
            type: 'main/update',
            payload: {
                startPeriod: value,
                bmClass: []
            }
        });
    };

    endPeriodChange = (value) => {
        const {props} = this.comp;
        const {dispatch, main} = props;
        const {startPeriod, language} = main;
        if (startPeriod.refpk && value.refpk < startPeriod.refpk) {
            toast({color: 'danger', content: language['hrzzpc-000133']});
            dispatch({
                type: 'main/update',
                payload: {
                    endPeriod: {},
                    bmClass: []
                }
            });
            return;
        }
        dispatch({
            type: 'main/update',
            payload: {
                endPeriod: value,
                bmClass: []
            }
        });
    };

    bmClassChange = async (value) => {
        const {props} = this.comp;
        const {dispatch} = props;
        await dispatch({
            type: 'main/update',
            payload: {
                bmClass: value
            }
        });
        this.pubSub.publish('getAllTableData');
    };
}