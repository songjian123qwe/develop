import React, { Component } from 'react';
import XLSX from 'xlsx';
import ExcelUtil from './ExcelUtil'; 
import ReactDOM from 'react-dom';
import findDomNode from 'react-dom';
import { createPage, base, toast, print, high, promptBox, cacheTools } from 'nc-lightapp-front';
import { hrAjax,snCreateUIDom} from 'src/hrpub/common/utils/utils'
import OrgRefer from '../../../../hrpub/common/components/referSearch/org';
import { transRadio, formatDate, getAppPageConfig, getQueryCondition,handleHash } from '../../../../hrpub/common/utils/utils.js'
import '../../../../hrpub/common/static/fonts/iconfont.css'
import ReferSearch from "../../../../hrpub/common/components/referSearch/org";
import './index.less'
import HrTree from '../../../../hrpub/common/components/hrTree'
import EmptyImg from '../../../../hrpub/common/components/emptyImg/index';
import { fromJS } from 'immutable';
import PrintHtml from '../../../../hrpub/common/utils/print'
import { totalTable } from 'src/hrpub/common/components/hr-table'
import Pagination from 'src/hrpub/common/components/Pagination'
import deepCopy from 'src/hrpub/common/utils/deep-copy';
import Export from 'src/hrpub/common/utils/exportHtml';
import { COMMON } from '../../../orgmgt/hrpost/common/common';
import ImportPhotos from './importPhotos'
import NCBackBtn from 'src/hrpub/common/components/hr-back';

let { NCTable, NCSelect, NCTabs, NCButton, NCCheckbox, NCCol, NCRow, NCOption, NCModal, NCSwitch, NCTree, NCIcon, NCFormControl, NCPopconfirm, NCDatePicker, NCInput,NCScrollElement } = base;
let { Refer } = high;
let outProp = null;
const handle = (e) => {
    if (e.type === 'click') {
        const el = document.querySelector(".dragWidthCom_left");
        const head = document.querySelector(".sn-header-refer");
        if ((el && el.contains(e.target)) || (head && head.contains(e.target))) {
            e.stopPropagation()
            e.preventDefault()
            var that = outProp;
            promptBox(
                {
                    color: "warning",
                    title: outProp.state.json['i6013-000050'],
                    content: outProp.state.json['i6013-000442'],
                    leftBtnName: outProp.state.json['i6013-000008'],
                    rightBtnName: outProp.state.json['i6013-000009'],
                    beSureBtnClick: function () {
                        that.onBtnOperation(that.props, 'save', '', that);
                    }
                }
            );
            return;
        }
    }
}
//参照
const conf = {
    multiLang: { domainName: 'hrjf', currentLocale: 'zh-CN',  moduleId: 'refer6005'},
    refType: 'grid',
    refName: 'jf6005-000015',
    placeholder: 'jf6005-000015',
    refCode: 'hrjf.refer.JobLevelGridRef',
    queryGridUrl: '/nccloud/hrjf/ref/JobLevelGridRef.do',
    columnConfig: [{
        name: ['jf6005-000016', 'jf6005-000017', 'jf6005-000018', 'jf6005-000019'],
        code: ['refcode', 'refname',
            "om_joblevelsys.code as syscode", "om_joblevelsys.name as sysname"]
    }],
    isMultiSelectedEnabled: true,
    isCacheable: false
};
const formId = 'jobinfo';//卡片组件Id
const tableId = 'rangetable';
const format = "YYYY-MM-DD";
let dateInputPlaceholder;
const moduleId = "i6013"
const domainName = "hrwa"
const lefttreeId = 'tree111'
class Category extends Component {
    constructor(props) {
        super(props);
        this.config = {
            pagecode: '60060010p',
            appcode: '60060010'
        };
        this.nodeType = props.nodeType;
        outProp = this;
        this.tableMeta = {}
        this.formMeta = {}
        this.state = { 
            json: [],
            showMode: 'browse',
            cardModel:false,
            pageInfo: {
                pageIndex: 0,
                pageSize: 10,
                total: 0,
                totalPage: 0
            },
            refcc:"",
            row_id: '',
            data:[],
            deleterows:true,
            getQueryCondition: {},
            editPageFlag:false
        };
        this.initBtn = this.initBtn.bind(this)
        this.onLevel = this.onLevel.bind(this)
        this.onJobrank = this.onJobrank.bind(this)
    }
    //选着多选框
    onSelectedFn = (props, moduleId, record, index, status) => {
        let arr = JSON.parse(JSON.stringify(this.props.editTable.getCheckedRows('hrjobinfofrom')));
        this.setState({
            selectedRows: arr
        })
    };

    onSelectedLevel = (props, moduleId, record, index, status) => {
        let arr = JSON.parse(JSON.stringify(this.props.editTable.getCheckedRows('postLevelrelation')));
        this.setState({
            selectedRows: arr
        })
    };
    
    componentDidMount() {
        //初始化按钮
        this.initBtn();
        let props = this.props
        if (window.location.href.match('localhost:3006')) window.location.hash = '#/ifr?page=201981519'

        let callback = (json, status, inlt) => {
            if (status) {
                this.lang = json
                this.setState({ json, inlt }, () => {
                })//存json和inlt到页面state中并刷新页面
            }
        }
        this.props.MultiInit.getMultiLang({ moduleId: 'jf6005', domainName: 'hrjf', callback })
        this.config = getAppPageConfig()
        props.createUIDom(this.config, (data) => {
            let template = data.template;
            let oid = template.hrjobinfofrom.oid;
            this.initMeta(template,this);
            props.button.setButtons(data && data.button ? data.button : {});
            props.meta.setMeta(data && data.template ? template : {});
            this.setState({
                oid,
                pageid: data.template.pageid
            })
        });
    }

    initBtn(){
        this.props.button.setButtonsVisible({
            addsave:false,
            canclsave:false,
            updatesave:false
        })
        this.loadListData();
    }
    headerButtonClick (props,code) {
        if(code === 'add') {
            this.setState({
                cardModel:true,
                editPageFlag:true
            })
            props.button.setButtonsVisible({
                add:false,
                edit:false,
                delete:false,
                edit:false,
                query:false,
                change:false,
                more:false,
                partsystem:false,
                print:false,
                addsave:true,
                canclsave:true,
                Import:false,
                export:false,
                refresh:false
            })
            props.form.setFormStatus('hrjobinfoadd','edit')
            this.props.form.EmptyAllFormValue('hrjobinfoadd')
            this.props.editTable.setTableData('postLevelrelation', { rows: [] })
        }else if(code === 'delete'){
            this.onSelectedFn()
            let pkarr = this.state.selectedRows
            if (!pkarr.length) {
                toast({color: "warning", content: this.state.json['jf6005-000205']});
                return
            }
            if (this.state.showMode === 'browse') {
                promptBox({
                    color: 'warning',
                    title: this.state.json['jf6005-000153'],
                    content: this.state.json['jf6005-000160'],
                    noFooter: false,
                    noCancelBtn: false,
                    beSureBtnName: this.state.json['jf6005-000036'],
                    cancelBtnName: this.state.json['jf6005-000008'],
                    hasCloseBtn: true,
                    beSureBtnClick: this.functionSureDelete,
                    closeByClickBackDrop: false,
                })
            }else{
                this.functionSureDelete()
            }
            
        }else if(code === 'query'){
            props.search.openAdvSearch('hrjobinfoquery', true);

        }else if(code === 'canclsave'){
            this.setState({
                cardModel:false
            })
            props.button.setButtonsVisible({
                add:true,
                delete:true,
                edit:true,
                query:true,
                change:true,
                more:true,
                partsystem:true,
                print:true,
                addsave:false,
                canclsave:false,
                Import:true,
                export:true,
                updatesave:false,
                refresh:true
            })
            this.setState({
                editPageFlag:false
            })
        }else if(code === 'addsave'){
                promptBox({
                    color: 'warning',
                    title: this.state.json['jf6005-000050'],
                    content: this.state.json['jf6005-000053'],
                    noFooter: false,
                    noCancelBtn: false,
                    beSureBtnName: this.state.json['jf6005-000036'],
                    cancelBtnName: this.state.json['jf6005-000008'],
                    beSureBtnClick: () => {
                        this.enableHRSaveAction()
                    },
                    cancelBtnClick: null
                });
        }else if(code === 'updatesave'){
            promptBox({
                color: 'warning',
                title: this.state.json['jf6005-000050'],
                content: this.state.json['jf6005-000053'],
                noFooter: false,
                noCancelBtn: false,
                beSureBtnName: this.state.json['jf6005-000036'],
                cancelBtnName: this.state.json['jf6005-000008'],
                beSureBtnClick: () => {
                    this.updateSaveAction()
                },
                cancelBtnClick: null
            });
            props.button.setButtonsVisible({
                updatesave:false
            })
        }else if(code === 'Import'){
            ImportPhotos().then((res)=>{
                this.loadListData()
            })
        }else if(code === 'export'){
            let json = this.state.json;
            let dataRows = deepCopy(this.props.editTable.getAllData('hrjobinfofrom').rows);
            let meta = deepCopy(this.props.meta.getMeta()['hrjobinfofrom']);
            this.boolToStr(dataRows, this.state.json)
            //输出
            Export(document.querySelector('.u-table-scroll'),
                {
                    title: this.state.json['jf6005-000524'],
                    fileName: this.state.json['jf6005-000524'],
                    maker: this.state.json['jf6005-000521'],
                    date: this.state.json['jf6005-000522']
                }, {
                    data: dataRows,
                    meta: meta,
                    showCheckBox: false
                });
        }else if(code === 'refresh'){
                    this.refresh()
        }
    }
    //保存
    enableHRSaveAction(){
        let formData = this.props.form.getAllFormValue("hrjobinfoadd");
        let totalData = this.props.editTable.getAllData('postLevelrelation')
        let requestParam = {
            totalData: {
            model: totalData,
            pageid: '660060010p'
            },
            formData,
            tablerows:'tablerows'
        };
        hrAjax({
            url: '/nccloud/hrjf/organize/addBaseAction.do',
            data: requestParam,
            success: (result) => {
                if(result.data==='success'){
                    this.props.button.setButtonsVisible({
                        addsave:false,
                        canclsave:true
                    })
                    toast({color: "warning", content: this.state.json['jf6005-000043']});
                }else if(result.data==='repeat'){
                    toast({color: "warning", content: this.state.json['jf6005-000526']});
                }
                this.loadListData();
            }
        })
    }
    //更新保存
    updateSaveAction(){
        let formData = this.props.form.getAllFormValue("hrjobinfoadd");
        let totalData = this.props.editTable.getAllData('postLevelrelation')
        let requestParam = {
            totalData: {
            model: totalData,
            pageid: '660060010p'
        },
        formData
        };
        hrAjax({
            url: '/nccloud/hrjf/organize/addBaseAction.do',
            data: requestParam,
            success: (result) => {
                if(result.data === 'zcrepeat'){
                   toast({color: "warning", content: this.state.json['jf6005-000527']});
                }else if(result.data==='success'){
                    this.props.button.setButtonsVisible({
                        addsave:false,
                        canclsave:true
                    })
                    toast({color: "warning", content: this.state.json['jf6005-000043']});
                    this.loadListData();
                }
            }
        })
    }
    
    //导出
    boolToStr(dataRows, json) {
        dataRows.forEach(item => {
            let values = item.values;
            for (let key in values) {
                let val = values[key];
                if (typeof val === 'object' && typeof val.value === 'boolean') {
                    /*是：否*/
                    val.display = val.value ? this.state.json['jf6005-000337'] : this.state.json['jf6005-000338'];
                }
            }
        });
    }
    //新增行
    rowButtonClick(props,code){
        this.onSelectedLevel()
        let pkarr = this.state.selectedRows
        if(code === 'newrow'){
            let pk_job = this.props.form.getFormItemsValue('hrjobinfoadd', 'pk_jobinfo').value;
            let pk_postseries = this.props.form.getFormItemsValue('hrjobinfoadd', 'pk_postseries').value;
            if (!pk_postseries) {
                toast({
                    color: "info",
                    content: this.state.json['jf6005-000525']
                });
                return
            }
            this.intType = pk_job ? 2 : 2;
            this.pk_filtertype = pk_job ? pk_job : pk_postseries;
            this.setState({
                getQueryCondition: {
                    intType: this.intType,
                    pk_filtertype: pk_postseries
                }
            }, () => {
                document.getElementById('refer-container-button').click();
            });

        }else if(code === 'deleterow'){
            for(var i in pkarr){
                for(var j in pkarr[i]){
                    this.props.editTable.deleteTableRowsByRowId('postLevelrelation',pkarr[i][j].rowid,true)
                }
                
              }
        }
    }
    //批量删除
    functionSureDelete = () => {
        this.onSelectedFn()
        let pkarr = this.state.selectedRows
        let pkjobarr = []
        pkarr.forEach((v, index) => {
            pkjobarr.push(v.data.values.pk_jobinfo.value);
        });
        hrAjax({
            url: '/nccloud/hrjf/organize/deleteBaseAction.do',
            data: {
                allpks: pkjobarr
            },
            success: (result) => {
                if(result='success'){
                    toast({color: "warning", content: this.state.json['jf6005-000164']});
                    this.loadListData();
                }
            }
        })
        
    };
    initData () {
        // 请求主表单数据
        let {form, button, table, insertTable, search} = this.props;
    }
    //查询事件
    getSearch() {
        let queryParam = getQueryCondition(this.props, 'hrjobinfoquery')
        hrAjax({
            url: '/nccloud/hrjf/organize/queryBaseAction.do',
            data:queryParam,
            success: (result) => {
                if(result.data === 'XIACILAI'){
                    this.props.editTable.setTableData('hrjobinfofrom', { rows: [] })
                } else {
                    let pks = []
                    const { editTable } = this.props
                    let hasData = JSON.stringify(result.data) === '{}' ? false : true;
                    // 翻页数据处理函数
                    let d = result.data.hrjobinfofrom
                    pks = result.data.hrjobinfofrom.allpks
                    if (d) {
                        pks = pks.slice((d.pageInfo.pageIndex - 1) * d.pageInfo.pageSize, d.pageInfo.pageIndex * d.pageInfo.pageSize)
                    }
                    this.setState({
                        pageInfo: result.data.hrjobinfofrom.pageInfo
                    }, () => {
                        editTable.setTableData('hrjobinfofrom', result.data.hrjobinfofrom)
                        cacheTools.set('allpks', result.data.hrjobinfofrom.allpks);
                        editTable.showColByKey('hrjobinfofrom', 'handleArea')
                    })
                }
                
            }
        })
    }
    //每页显示条数
    pageSizeSelect(val) {
        this.state.pageInfo.pageSize = val;
        this.state.pageInfo.pageIndex = 0;
        this.setState(this.state.pageInfo, () => {
            this.queryTableData();
        });
    }

    //分页事件
    paginationEve(key) {
        this.state.pageInfo.pageIndex = key;
        this.setState(this.state.pageInfo, () => {
            this.queryTableData();
        });
    };
    //根据查询条件查table
    queryTableData() {
        let newParam = {
            areaCode: 'hrjobinfofrom',
            pageInfo: {
                pageSize: this.state.pageInfo.pageSize,
                pageIndex: this.state.pageInfo.pageIndex
            },
            selectnum:'selectnum'
        }
        hrAjax({
            url: '/nccloud/hrjf/organize/queryBaseAction.do',
            data: newParam,
            success: (result) => {
                if (result.success) {
                    if (result.data) {
                        let model = result.data.hrjobinfofrom;
                        if (model) {
                            this.props.editTable.setTableData('hrjobinfofrom', result.data.hrjobinfofrom)
                            cacheTools.set('allpks', result.data.hrjobinfofrom.allpks);
                            this.props.editTable.showColByKey('hrjobinfofrom', 'handleArea')

                        } else {
                            this.props.table.setAllTableData('hrjobinfofrom', {rows: [], allpks: []});
                            this.setState({
                                pageInfo: {
                                    pageIndex: '0',
                                    pageSize: '10',
                                    total: '0',
                                    totalPage: '0'
                                }
                            });
                        }
                    }
                } else {
                    this.props.table.setAllTableData('hrjobinfofrom', {rows: []});
                }
            }
        })
        
    }
    //查询
    loadListData(){
        let r = {};
        r.pageInfo = {
            "pageIndex": this.state.pageIndex,
            "pageSize": this.state.pageSize,
            "totalPage": this.state.totalPage
        }
        hrAjax({
            url: '/nccloud/hrjf/organize/queryBaseAction.do',
            success: (result) => {
                if(result.data=='XIACILAI' ){
                    this.props.editTable.setTableData('hrjobinfofrom', { rows: [] })
                }else{
                    let pks = []
                    const { editTable } = this.props
                    let hasData = JSON.stringify(result.data) === '{}' ? false : true;
                    // 翻页数据处理函数
                    let d = result.data.hrjobinfofrom
                    pks = result.data.hrjobinfofrom.allpks
                    if (d) {
                        pks = pks.slice((d.pageInfo.pageIndex - 1) * d.pageInfo.pageSize, d.pageInfo.pageIndex * d.pageInfo.pageSize)
                    }
                    this.setState({
                        pageInfo: result.data.hrjobinfofrom.pageInfo
                    }, () => {
                        editTable.setTableData('hrjobinfofrom', result.data.hrjobinfofrom)
                        cacheTools.set('allpks', result.data.hrjobinfofrom.allpks);
                        editTable.showColByKey('hrjobinfofrom', 'handleArea')
                    })
                }
            }
        })
    }

    // 删除单据
    deleteDisputedData(record) {
        let json = this.state.json;
        promptBox({
            color: "warning",
            title: json['jf6005-000056'],
            content: json['jf6005-000154'],
            beSureBtnClick: this.beSureBtnClick.bind(this, record)
        })
    }
    beSureBtnClick(record){
        hrAjax({
            url: '/nccloud/hrjf/organize/deleteBaseAction.do',
            data: {
                allpks: [ record.values.pk_jobinfo.value ]
            },
            success: (result) => {
                if(result='success'){
                    toast({color: "warning", content: this.state.json['jf6005-000164']});
                    this.loadListData();
                }
            }
        })
    }

    // 修改
    updateDisputedData(record){
        this.props.button.setButtonsVisible({
            add:false,
            delete:false,
            edit:false,
            query:false,
            change:false,
            more:false,
            partsystem:false,
            print:false,
            addsave:false,
            canclsave:true,
            updatesave:true,
            Import:false,
            export:false,
            refresh:false
        })
        this.props.form.setFormStatus('hrjobinfoadd','edit')
        this.setState({
            cardModel:true,
            editPageFlag:true
        })
        hrAjax({
            url: '/nccloud/hrjf/organize/eidtBaseAction.do',
            data: {
                allpks: [ record.values.pk_jobinfo.value ]
            },
            success: (result) => {
                this.props.form.setAllFormValue({'hrjobinfoadd':result.data.hrjobinfoadd});
            }
        })
        if(record.values.pk_postseries.value!=null){
            hrAjax({
                url: '/nccloud/hrjf/organize/queryPostseries.do',
                data: {allpks:[record.values.pk_postseries.value]},
                success: (result) => {
                    
                    this.props.editTable.setStatus('postLevelrelation', 'edit')
                    this.props.editTable.setTableData('postLevelrelation', result.data.postLevelrelation)
                }
            })
        }
        
    }
    //操作
    initMeta(template,opt){
        let json = this.state.json;
        let data = template.hrjobinfofrom.items
        data.map((item)=>{
            if(item.attrcode==''){
                
            }
            item.textAlign='center'
        })
        data.push({
            attrcode: 'handleArea',
            itemtype: 'customer',
            hyperlinkflag: false,
            label: json['jf6005-000102'], 
            width: '170px',
            textAlign: 'center',
            visible: true,
            fixed: 'right',
            render(text, record, index) {
                return (
                    <div>
                        <span style={{color: '#0073E1', cursor: 'pointer',marginRight: '24px'}}
                            onClick={() =>{opt.updateDisputedData(record)}}>
                            {json['jf6005-000112']}
                        </span>
                        <span style={{color: '#0073E1', cursor: 'pointer',marginRight: '24px'}}
                            onClick={() =>{opt.deleteDisputedData(record)}}>
                            {json['jf6005-000113']}
                        </span>
                    </div>
                )
            }
        });
    }
    //table编辑前
    onLevel(props ,moduleId, item, index,value, record){
        if(item.dataIndex == 'defaultrank'){
            toast({color: "warning", content: this.state.json['jf6005-000309']});
            return false
        }
        return true
    }
    //table编辑后
    onJobrank(props, moduleId, key, value, changedrows, index, record){
        if(key == 'jobrank'){
            props.editTable.setValByKeyAndIndex('postLevelrelation',index,'defaultrank',{'value':value.refcode,'display':value.refcode})
            return true
        }
        if(this.setState.deleterows===true){
            props.editTable.setTableData('postLevelrelation', { rows: [] })
            return true
        }
        return true
    }
    //form编辑前
    addOnAfterEvent(props, moduleId, key, value,oldValue){
        if(key=='pk_postseries'&& value.refname==null){
            props.editTable.setTableData('postLevelrelation', { rows: [] }) 
        }
    }
    /**
     * 新增职级职等
     * @param data
     */
    referChange(data) {
        data.map(item => {
            item.values.pk_joblevel.display = item.refname;
            item.status = '2';
        });
        this.props.editTable.setTableData("postLevelrelation", {rows: data});
        this.props.editTable.setStatus("postLevelrelation", 'edit');
    }

    /**
     * 返回按钮 编辑态
     */
    backButtonClick() {
        this.setState({
            cardModel:false,
            editPageFlag:false
        })
        this.props.button.setButtonsVisible({
            add:true,
            edit:false,
            delete:true,
            edit:false,
            query:true,
            change:false,
            addsave:false,
            canclsave:false,
            Import:true,
            export:true,
            refresh:true
        })
        this.loadListData();
    }
    /**
    * 刷新右表
    */
    refresh() {
        // 点击刷新按钮
        this.loadListData();
    }
    
    render() {
        let { button, form, editTable,syncTree, search, modal,pageInfo,cardTable,disabled } = this.props;
        let {NCCreateSearch} = search;
        const { createSyncTree } = syncTree;
        let { createModal } = modal;
        const {createCardTable} = cardTable;
        return (
            <div className="salaryAuthority nc-bill-card">
                <header className="nc-bill-header-area">
                    {this.state.editPageFlag &&<NCBackBtn onClick={this.backButtonClick.bind(this)}
                            title={this.state.json['jf6005-000022']}></NCBackBtn>}
                    <div className="search fl">
                    </div>
                    <div className="search fl" >
                    </div>
                    
                    <div className="fr">{button.createButtonApp({area:'list',onButtonClick: this.headerButtonClick.bind(this)})}</div>
                </header>
                <div style={{display: 'none'}}>
                    {search.NCCreateSearch({
                        onlyShowAdvArea: false,
                        showAdvSearchPlanBtn: true,
                        saveSearchPlan: true,
                        onlyShowSuperBtn: true,
                        replaceSuperBtn: this.state.json['jf6005-000063']
                    })}
                </div>
                <div style={{display:this.state.cardModel === false?'block':'none'}} id='listTable'>
                    {
                        editTable.createEditTable('hrjobinfofrom',{
                            onSelected: this.onSelectedFn,
                            showCheck: true,
                            height: 630
                        })
                    }
                    {/* <div style={{ display: this.state.showPagi ? '' : 'none' }}> */}
                    <div>
                        <Pagination
                            total={this.state.pageInfo.total}
                            pageSize={this.state.pageInfo.pageSize}
                            // showQuickJumper={true}
                            showSizeChanger={true}
                            // current = {state.pageInfo.pageIndex}
                            onChange={this.paginationEve.bind(this)}
                            onShowSizeChange={this.pageSizeSelect.bind(this)}
                        />
                    </div>
                </div>
                <div className="createfrom" style={{display:this.state.cardModel === true?'block':'none'}}>
                    {
                        form.createForm('hrjobinfoadd',{
                            onAfterEvent:this.addOnAfterEvent,
                            onBeforeEvent:this.aadOnBeforeEvent
                        })
                    }
                    <div>
                    <div className="newfr">{button.createButtonApp({area:'listrow',onButtonClick: this.rowButtonClick.bind(this)})}</div>
                    {
                    <NCScrollElement>
                        <div>
                            {
                                editTable.createEditTable('postLevelrelation',{
                                    onSelected: this.onSelectedLevel,
                                    showCheck: true,
                                    onBeforeEvent:this.onLevel,
                                    onAfterEvent:this.onJobrank,
                                    height:500
                                })
                            }
                        </div>
                    </NCScrollElement>
                    }
                </div>
                </div>
                <div className="copyWrapper" style={{
                    float: 'right',
                    display: 'none'
                   }}>
                    {
                        NCCreateSearch('hrjobinfoquery', {
                            clickSearchBtn: this.getSearch.bind(this),
                            onlyShowAdvArea: false,
                            oid: this.state.oid,
                        })
                    }
                </div>
                <div style={{display: 'none'}}>
                    <Refer
                        {...conf}
                        onChange={this.referChange.bind(this)}
                        queryCondition={this.state.getQueryCondition}
                        clickContainer={<button id='refer-container-button'/>}
                        value={this.state.rowPks}
                    />
                </div>
                
            </div>
        )
    }
}
export default Category



