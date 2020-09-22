export default class DisAction {
    constructor(comp) {
        this.comp = comp;
    }

    getTreeData = () => {
        const {props} = this.comp;
        const {dispatch} = props;
        dispatch({
            type: 'main/getTree',
            payload: {}
        })
            .then((res) => {
                this.setTreeData(res.data);
            })
    };

    setTreeData = async (data = {}, isInit) => {
        const {props, action} = this.comp;
        const {syncTree, main} = props;
        const {language, selectDoc} = main;
        const {list = []} = data;
        const children = this.formatTree(list);
        let root = [{
            children,
            code: language['hrzzpc-000117'],
            id: null,
            isOrgStruSort: false,
            innercode: null,
            isleaf: false,
            key: 'root',
            name: language['hrzzpc-000117'],
            nodeData: {
                nodeValue: {}
            },
            pid: null,
            refname: language['hrzzpc-000117'],
            refpk: 'root',
            title: language['hrzzpc-000117']
        }];
        syncTree.setSyncTreeData('dimissionList', root);
        if (isInit) return;
        let selectKey = selectDoc && list.findIndex(item => item.pk_defdoc === selectDoc) > -1 ? selectDoc : 'root';
        syncTree.setNodeSelected('dimissionList', selectKey);
        syncTree.openNodeByPk('dimissionList', ['root']);
        await props.dispatch({
            type: 'main/update',
            payload: {
                selectDoc: selectKey,
                billid: data.billid,
                process: data.finish
            }
        });
        this.getTableData();
    };

    formatTree = (data = []) => {
        return data.map(item => {
                return {
                    children: [],
                    code: item.code,
                    id: null,
                    isOrgStruSort: false,
                    innercode: null,
                    isleaf: true,
                    key: item.pk_defdoc,
                    name: item.name,
                    nodeData: {
                        nodeValue: {}
                    },
                    pid: null,
                    refname: item.name,
                    refpk: item.pk_defdoc,
                    title: item.name
                }
            }
        )
    };

    onTreeSelect = async (pk) => {
        const {props} = this.comp;
        await props.dispatch({
            type: 'main/update',
            payload: {
                selectDoc: pk
            }
        });
        this.getTableData()
    };

    getTableData = async () => {
        const {props, action} = this.comp;
        const {dispatch, main} = props;
        const {billid, selectDoc} = main;
        if (!billid) return;
        try {
            let res = await dispatch({
                type: 'main/getDisData',
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
        if (data.list && data.list.handoverdetailgrid) {
            table.setAllTableData('handoverdetailgrid', {
                rows: data.list.handoverdetailgrid.rows
            });
        } else {
            table.setAllTableData('handoverdetailgrid', {
                rows: []
            });
        }
    };
}