export default class TableAction {
    constructor(comp) {
        this.comp = comp;
        this.dispatch = this.comp.props.dispatch;
    }

    getTableHeight = () => {
        const mainTable = document.getElementsByClassName('layout-content-wrapper');
        let tableHeight = 0;
        if (mainTable[0]) {
            tableHeight = mainTable[0].clientHeight - 38
        }
        return tableHeight;
    };
    browseDetail = async (record,index,props,e)=>{
        // console.log(record)
        // console.log(index)
        const {action} = this.comp;
        const {dispatch} = props;
        await dispatch({
            type: 'main/update',
            payload: {
                page: 'detail',
                billid: record.pk_hi_stapply.value,
                workflow_state: record.workflow_state.value
            }
        });
        action.btnAct.updateBtnStatus();
    }
    getTableData = async () => {
        const {props, action} = this.comp;
        const {dispatch, main} = props;
        try {
            let res = await dispatch({
                type: 'main/getData',
                payload: {}
            });
            if (res.success) {
                this.setTableData(res.data);
            }
        } catch (e) {
        }
    };

    setTableData = (data = {}) => {
        const {props: {table}} = this.comp;
        if (data.depthandoverlist && data.depthandoverlist.depthandoverlist) {
            table.setAllTableData('depthandoverlist', {
                rows: data.depthandoverlist.depthandoverlist.rows
            });
        } else {
            table.setAllTableData('depthandoverlist', {
                rows: []
            });
        }
    };

    checkBill = async (record) => {
        const {props, action} = this.comp;
        const {dispatch} = props;
        await dispatch({
            type: 'main/update',
            payload: {
                page: 'detail',
                billid: record.pk_hi_stapply.value,
                workflow_state: record.workflow_state.value
            }
        });
        action.btnAct.updateBtnStatus();
    }
}