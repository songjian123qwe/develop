export default class TableAction {
    constructor(comp) {
        this.comp = comp;
        this.dispatch = this.comp.props.dispatch;
    }

    getTableData = async () => {
        const {props, action} = this.comp;
        const {dispatch, main} = props;
        const {billid, selectDoc} = main;
        if (!billid) return;
        try {
            let res = await dispatch({
                type: 'main/getData',
                payload: {
                    billid,
                    pk_defdoc: selectDoc
                }
            });
            if (res.success) {
                this.setTableData(res.data);
            }
        } catch (e) {
        }
    };

    setTableData = (data = {}) => {
        const {props: {table}} = this.comp;
        if (data.entryflowlist && data.entryflowlist.entryflowlist) {
            table.setAllTableData('entryflowlist', {
                rows: data.entryflowlist.entryflowlist.rows
            });
        } else {
            table.setAllTableData('entryflowlist', {
                rows: []
            });
        }
    };
}