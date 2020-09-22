


import CommonAction from 'src/hrpub/common/components/reportQuery/action/index';


export default class ReportQuery extends CommonAction {
    constructor(props) {
        super(props);
    }

    appConfig={
        pagecode: '60059920p',
        appcode: '60059920'
    }

    changeOrgValue = (v) => {
        this.dispatch({
            type: 'reportQuery/update',
            payload: {
                orgValue: v
            }
        });

        this.comp.action.ReportQuery.init();
    }
}
