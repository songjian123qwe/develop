import proFetch from 'src/hrpub/common/utils/project-fetch';


export default class {
    name = 'reception'

    data = {
        // back:false,
        language: {},
        status: 'main',//detail
        formStatus:'browse',//edit
        currentEditRowIndex: '', // 当前行索引,
        currentIndex:null,
        lastStatus:null,
        transMode: undefined,
        transSearched: false,
        transType: {},
        billid:'',
        pageInfo: {
            pageSize: 10,
            pageIndex: 1,
            total: 0,
            totalPage: 1
        },
        transItems: [],
        isEdit:false,//是否进入编辑模式
    }

    methods = {
        // 获取表格数据
        getTableData(...args) {
            let store = args[args.length - 1];
            let year = store.getData('bc.yearsSelectValue.key').value;
            let busiAttribute = store.getData('bc.busiAttrSelectValue.key').value;

            return proFetch({
                url: '/nccloud/hrzz/depthandover/PCDeptHandoverAcceptQueryAction.do',
                body: {}
            })
                // .then((res) => {
                //     if(res.success) {
                //         if(Array.isArray(res.data.display)) {
                //             // store.setData('bc.Itemcodes', res.data.Itemcodes);
                //             // store.setData('bc.Items', res.data.Items);
                //             // store.setData('bc.OldPk_budget_item', res.data.OldPk_budget_item);
                //            /* store.setData('bc.yearsSelectList', YearList.map((year) => {
                //                 return {
                //                     key: year,
                //                     label: year
                //                 }
                //             }));*/
                //         }
                //     }
                //     return res;
                // });
        },
        formDetail(postData,store){
            return proFetch({
                url: '/nccloud/hrzz/depthandover/PCDeptHandoverAcceptQueryOneAction.do',
                body: postData
            });
        },
        // 保存编辑数据PCDeptHandoverAcceptSaveAction
        saveForm(postData, store) {
            return proFetch({
                url: '/nccloud/hrzz/depthandover/PCDeptHandoverAcceptSaveAction.do',
                body: postData
            });
        },
         // 提交表格数据
         commitForm(postData, store) {
            return proFetch({
                url: '/nccloud/hrzz/depthandover/PCDeptHandoverAcceptAction.do',
                body: postData
            });
        },
        // BeforeEdit(postData,store){
        //     return proFetch({
        //         url: '/nccloud/hrzz/depthandover/SaveAction.do',
        //         body: postData
        //     });
        // },
        // AfterEdit(postData,store){
        //     return proFetch({
        //         url: '/nccloud/hrzz/depthandover/SaveAction.do',
        //         body: postData
        //     });
        // },
        
    }
}