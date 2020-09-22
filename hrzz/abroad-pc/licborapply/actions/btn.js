
import Common from 'src/hrpub/common/actions';

export default class ButtonAction extends Common {
    constructor(comp) {
        super();
        this.action = comp.action;
        this.comp = comp;
    }

    didAllInstance = () => {
        this.setBtnHandleMap();
    }

    // 生成按钮map
    setBtnHandleMap = () => {
        this.buttonHandleMap = {
            // 查询
            'search': this.showSearchModal,
            // 刷新
            'refresh': this.refresh,
            // 新增
            'add': this.action.formAct.toAddPage,
            // 删除
            'del': this.action.rowAct.deleteRows,
            // 修改
            'edit': this.action.formAct.toEditPage,
            // 提交
            'commit': this.action.rowAct.submitOnes,
            // 收回
            'callback': this.action.rowAct.callbackOnes,
            // 打印
            'print': this.printTable,
            // 输出
            'out': this.outputTable,
            // 'attachment': this.fileManager
        }
    }

    // 刷新
    refresh = () => {
        const { props } = this.comp;
        const {
            emp
        } = props;
        this.pubSub.publish('getMainTableData');
    }

    // 第一次进页面的按钮状态
    initPageButton = () => {
        const { props } = this.comp;
        const {
            button,
            emp
        } = props;
        //按钮可见
        button.setButtonVisible(emp.visible_main);
        button.setButtonDisabled({
            add: false,
            edit: false,
            del: false,
            search: false,
            commit: false,
            aux_function: false,   // 更多
            save: false,
            cancel: false,
            refresh: false,
        });
    }

    // 按钮点击回调
    headerClick = (props, btnCode) => {
        if (typeof this.buttonHandleMap[btnCode] === 'function') {
            this.buttonHandleMap[btnCode]();
        }
    }

    // 展示查询弹窗
    showSearchModal = () => {
        const { props } = this.comp;
        const { search } = props;
        search.openAdvSearch('querybill', true);
    }
    // 确认查询
    toSearch = () => {
        const { props } = this.comp;
        const { search, emp, dispatch } = props;

        this.pubSub.publish('getMainTableData', { queryCondition: search.getQueryInfo('querybill', true) });
        this.update({
            queryCondition: search.getQueryInfo('querybill', true)
        });
    }

    // 人力组织改变
    // changeOrg = (value) => {
    //     const {props} = this.comp;
    //     const {
    //         button,
    //         emp
    //     } = props;
    //     if(value) {
    //         button.setButtonVisible(emp.visible_main)
    //     }
    //     this.update({
    //         orgValue: value
    //     });
    //     setTimeout(()=>{
    //         this.pubSub.publish('getMainTableData', {
    //             pk_org: value.refpk
    //         });
    //     },400)
    // }

    // 打印
    printTable = () => {
        const { props } = this.comp;
        const { emp, editTable, meta } = props;

        let tableWrapper = document.getElementById('mainTable');

        this.print(tableWrapper, {
            title: emp.language['ga6013-000001'],//证照借阅申请
            maker: emp.language['ga6013-000002'], // 制作者
            date: emp.language['ga6013-000003'], // 制作日期
            tableInfo: {
                data: editTable.getAllRows('list'),
                tableTmp: meta.getMeta()['list']
            },
            beforeAppend: (data) => {
                data[0].map((item, rowIndex) => {
                    delete item[0];
                });
                data[1].map((item) => {
                    item.length = item.length - 2;
                });
                return data;
            }
        });
    }

    // 输出
    outputTable = () => {
        const { props } = this.comp;
        const { emp, editTable, meta } = props;

        let tableWrapper = document.getElementById('mainTable');
        let tableData = editTable.getAllData('list');

        this.exportHtml(tableWrapper, {
            fileName: emp.language['ga6013-000001'] // 证照借阅申请
        }, {
            meta: meta.getMeta()['list'],
            data: tableData.rows,
            showIndex: false
        });
    }

    // 附件管理
    fileManager = (record) => {
        const {props} = this.comp;
        const { emp, getUrlParam } = props;
        let pk_licbor;
        if(record){
             pk_licbor = record.values['pk_licbor'].value;
        }else{
            pk_licbor = getUrlParam('id');
        }
        this.update({
            fileManagerBillId: pk_licbor,
            fileManagerModalVisible: true,
            isDisableUpload: !(record.values['approve_state'] && record.values['approve_state'].value === '-1')
        });
    }


    // 本节点更新
    update = async (obj) => {
        const { props } = this.comp;
        const { dispatch } = props;

        await dispatch({
            type: 'emp/update',
            payload: obj
        });
    }
}