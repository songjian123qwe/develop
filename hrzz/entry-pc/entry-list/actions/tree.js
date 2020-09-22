export default class TreeAction {
    constructor(comp) {
        this.comp = comp;
    }

    didMount = () => {
        this.setTreeData([], true);
    };

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
            code: language['hrzzpc-000116'],
            id: null,
            isOrgStruSort: false,
            innercode: null,
            isleaf: false,
            key: 'root',
            name: language['hrzzpc-000116'],
            nodeData: {
                nodeValue: {}
            },
            pid: null,
            refname: language['hrzzpc-000116'],
            refpk: 'root',
            title: language['hrzzpc-000116']
        }];
        syncTree.setSyncTreeData('entryList', root);
        if (isInit) return;
        let selectKey = selectDoc && list.findIndex(item => item.pk_defdoc === selectDoc) > -1 ? selectDoc : 'root';
        syncTree.setNodeSelected('entryList', selectKey);
        syncTree.openNodeByPk('entryList', ['root']);
        await props.dispatch({
            type: 'main/update',
            payload: {
                selectDoc: selectKey,
                billid: data.billid,
                process: data.finish
            }
        });
        action.tableAct.getTableData();
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
        const {props, action} = this.comp;
        await props.dispatch({
            type: 'main/update',
            payload: {
                selectDoc: pk
            }
        });
        action.tableAct.getTableData()
    };
}