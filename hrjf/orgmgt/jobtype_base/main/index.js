/**
 * Created by wanghongxiang on 2018/5/8.
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { high, createPage, toast, base, getUrlParam, promptBox, print, output, getBusinessInfo } from 'nc-lightapp-front';
import {hrAjax as ajax} from 'src/hrpub/common/utils/utils';
import './index.less'
import Transfer from '../../../public/excomponents/Transfer'
import referOfJobLevel from '../../../refer/jfref/JobLevelGridRef'
import {THEME} from "../../../public/theme/theme";


const { NCAffix, NCRow, NCCol, NCCheckbox, NCButton, NCSwitch, NCMenu, NCItem, NCIcon, NCFormControl, NCModal, NCTransfer } = base;
const formId = 'jobtype';
const tableId = 'levelrel';
const treeId = 'leftTree';
let {Refer} = high;

class JobType extends Component {
    constructor(props) {
        super(props);
        this.config = props.context;
        this.state = {
            showMode: 'browse',
            showChangePage: false,
            enableStatus: {},
            showModal: false,
            value: "test",
            item: {},
            //穿梭
            selectType: 'onlySelf', // 从左到右的方式 'onlySelf':自己;    'default':全部包含子节点
            targetKeys: [],//展示在右边列表的数据的 key 集合
            allkeys: [], // 所有的节点key集合
            selectedKeys: [],
            dataSource: [],
            topTargetKeys: [],
            transferData:{
                leftTreeData:[],
                rightTreeData:[]
            },
            oldTransferData : {
                oldLeftTreeData : [],
                oldRightTreeData : []
            },
            disabled: {
                pre: true,
                nex: false,
                com: true,
                can: false,
            },
            isStepOne:true,
            inlt: [],
            json: []
        };
        this.originFormData = { "areaType": "form", "rows": [{ "values": { "pk_jobtype": { "display": null, "value": null }, "jobtypecode": { "display": null, "value": null }, "jobtypename": { "display": null, "value": null }, "father_pk": { "display": null, "value": null }, "innercode": { "display": null, "value": null }, "type_level": { "display": null, "value": null }, "creator": { "display": null, "value": null }, "creationtime": { "display": null, "value": null }, "modifier": { "display": null, "value": null }, "modifiedtime": { "display": null, "value": null }, "pk_group": { "display": null, "value": null }, "pvtjobgrade": { "display": null, "value": null }, "dataoriginflag": { "display": null, "value": null }, "pk_joblevelsys": { "display": null, "value": null }, "inheritflag": { "display": null, "value": null }, "pk_grade_source": { "display": null, "value": null }, "pk_level_source": { "display": null, "value": null }, "sourcetype": { "display": null, "value": null }, "ts": { "display": null, "value": null }, "pk_org": { "display": null, "value": null }, "enablestate": { "display": null, "value": null }, "jobtypedesc": { "display": null, "value": null } } }] };
        this.businessInfo = '';
        this.treeAjaxData = {};
        this.ajaxData = {};
        this.copyFormData = {};
        this.copyTableData = {};
        this.copyname = {};
        this.addFlag = false;
        this.isAdd = false;
        this.treeNode = '';
        this.fatherNode = '';
        this.addNode = '';
        this.tempSelectedData = [];
        this.intType = '';
        this.pk_filtertype = '';
        this.oldJobLevelPks = [];
        this.treeData = [];
        this.treeDataList = [];
        this.firstTableData = { rows: [] }
        // this.root = {//为人员类别树创建一个根节点
        //     "isleaf": false,
        //     "key": "ROOT",
        //     "title": this.state.json['jf6005-000148'],/* 国际化处理： 职级类别*/
        //     "id": "ROOT",
        //     "innercode": "ROOT",
        //     "pid": "",
        //     "refname": this.state.json['jf6005-000148'],/* 国际化处理： 职级类别*/
        //     "refpk": "ROOT"
        // };
        if (this.config) {
            props.createUIDom(this.config, (data) => {
                this.setState({
                    buttons: data.button || [],
                    context: data.context || {}
                })
                props.meta.setMeta(data && data.template ? data.template : {});
                props.button.setButtons(data && data.button ? data.button : {});
            })
        };
    }
//     componentWillMount() {
//         let callback = (json, status, inlt) => {
//             if (status) {
//                 this.setState({json, inlt},() => {
// // this.initTemplate(this.props) //在这里可以进行ceateUIDom
//                 }) // 保存json和inlt到页面state中并刷新页面
//             }
//         };
//         this.props.MultiInit.getMultiLang({moduleId: 'jf6005', domainName: 'hrjf',cb: ()=> {
//                 this.setState({
//                     enableStatus: {
//                         display: this.state.json['jf6005-000146'],/* 国际化处理： 启用状态*/
//                         value: true
//                     }
//                 })
//         }})
//
//     }
    componentWillMount() {
        let callback = (json, status, inlt) => {
            if (status) {
                this.setState({json, inlt},() => {
// this.initTemplate(this.props) //在这里可以进行ceateUIDom
//                    this.setState({
//                     enableStatus: {
//                         display: this.state.json['jf6005-000146'],/* 国际化处理： 启用状态*/
//                         value: true
//                     }
//                 })
                    this.setState({
                        enableStatus: {
                            display: this.state.json['jf6005-000146'],/* 国际化处理： 启用状态*/
                            value: true
                        }
                    })
                }) // 保存json和inlt到页面state中并刷新页面
            }
        };
        this.props.MultiInit.getMultiLang({moduleId: 'jf6005', domainName: 'hrjf',callback})
    }
    componentDidMount() {
        window.location.hash = 'c=' + this.config.appcode;
        this.businessInfo = getBusinessInfo() || {groupId: '0001A910000000000BQB', groupName:'霍格沃茨魔法学院'}
        //console.log(this.businessInfo)
        this.updateButtonStatus('browse');
        this.fetchTreeData();
        if(sessionStorage.getItem('hyx-selectedTreeNode') !== null){
            let tempTreeNode = sessionStorage.getItem('hyx-selectedTreeNode');
            this.onSelectTree(tempTreeNode);
        }
    }
    // 统一处理按钮事件
    onBtnOperation(prop, btncode) {
        //console.log(btncode)
        switch (btncode) {
            case 'add':
                this.addAfter();
                break;
            case 'edit':
                this.editAfter();
                break;
            case 'cancel':
                this.cancelAfter();
                break;
            case 'save':
                this.saveAfter();
                break
            case 'saveadd':
                this.saveAfter('add');
                break
            case 'delete':
                if (!sessionStorage.getItem('hyx-selectedTreeNode')) {
                    toast({ color: "warning", content: this.state.json['jf6005-000193'] });/* 国际化处理： 请先选择职务类别*/
                    return;
                }
                if (!this.treeNode) {
                    toast({ color: "warning", content: this.state.json['jf6005-000152'] })/* 国际化处理： 请选择要删除的内容!*/
                } else {
                    promptBox({
                        color: 'warning',               // 提示类别默认"success"， "success"/"info"/"warning"/"danger",非必输
                        title: this.state.json['jf6005-000153'],                // 提示标题, 默认不同类别下分别为："已成功"/"帮助信息"/"请注意"/"出错啦",非必输/* 国际化处理： 确认删除*/
                        content: this.state.json['jf6005-000154'],             // 提示内容,非必输/* 国际化处理： 您确定要删除么?*/
                        noFooter: false,                // 是否显示底部按钮(确定、取消),默认显示(false),非必输
                        noCancelBtn: false,             // 是否显示取消按钮,，默认显示(false),非必输
                        beSureBtnName: this.state.json['jf6005-000036'],          // 确定按钮名称, 默认为"确定",非必输/* 国际化处理： 确定*/
                        cancelBtnName: this.state.json['jf6005-000008'],         // 取消按钮名称, 默认为"取消",非必输/* 国际化处理： 取消*/
                        hasCloseBtn: true,             //显示“X”按钮，默认不显示，不显示是false，显示是true
                        beSureBtnClick: this.deleleteAfter.bind(this),   // 确定按钮点击调用函数,非必输
                        // cancelBtnClick: functionCancel,  // 取消按钮点击调用函数,非必输
                        // closeBtnClick:functionClose, //关闭按钮点击调用函数，非必输
                        closeByClickBackDrop: false,//点击遮罩关闭提示框，默认是true点击关闭，阻止关闭是false
                    })
                }
                break;
            //复制
            case 'copy':
                this.copyAfter();
                break;
            case 'print_group':
                if (!sessionStorage.getItem('hyx-selectedTreeNode')) {
                    toast({ color: "warning", content: this.state.json['jf6005-000193'] });/* 国际化处理： 请先选择职务类别*/
                    return;
                }
                let formData = this.props.form.getAllFormValue(formId);
                let oid = formData.rows[0].values.pk_jobtype? formData.rows[0].values.pk_jobtype.value : ''
                //console.log(oid)
                print(
                    'pdf',  //支持两类: 'html'为模板打印, 'pdf'为pdf打印
                    '/nccloud/hrjf/jobtype/JobTypePrintAction.do', //后台服务url
                    {
                        funcode: '60053010',      //小应用编码
                        nodekey: 'tbprint',     //模板节点标识
                        oids: [oid],    // 功能节点的数据主键   oids含有多个元素(['1001A41000000000A9LR','1001A410000000009JDD'])时为批量打印
                        appcode: '60053010', // 必填 应用编码
                        //nodekey: '' // 模版标识
                    }
                )
                break;
            case 'output...':
                if (!sessionStorage.getItem('hyx-selectedTreeNode')) {
                    toast({ color: "warning", content: this.state.json['jf6005-000193'] });/* 国际化处理： 请先选择职务类别*/
                    return;
                }
                let formData1 = this.props.form.getAllFormValue(formId);
                let oid1 = formData1.rows[0].values.pk_jobtype? formData1.rows[0].values.pk_jobtype.value : ''
                output({
                    url: '/nccloud/hrjf/jobtype/JobTypePrintAction.do',
                    data: {
                        funcode: '60053010',      //小应用编码
                        nodekey: 'tbprint',     //模板节点标识
                        oids: [oid1],    // 功能节点的数据主键   oids含有多个元素(['1001A41000000000A9LR','1001A410000000009JDD'])时为批量打印
                        outputType: 'output',
                        filename: this.config.nodeType === 'GLOBE_NODE' ? '职务类别-全局' : '职务类别-集团'
                    }
                })
                break;
            case 'refresh':
                location.reload();
                break;
        }
    }
    //add按钮
    addAfter() {
        this.copyData();// 缓存下数据
        this.addFlag = true;
        this.isAdd = true;
        this.props.form.setFormItemsDisabled(formId, {//设置不可编辑项
            'pk_grade_source': true
        })
        let tempdata = {
            'pk_jobtype': sessionStorage.getItem('hyx-selectedTreeNode'),
            'pk_org':  this.config.nodeType === 'GLOBE_NODE' ? 'GLOBLE00000000000000' : this.businessInfo.groupId,
        }
        ajax({
            url: '/nccloud/hrjf/jobtype/JobTypeAddAction.do',
            type: "POST",
            data: tempdata,
            success: res => {
                //重置表内容
                //console.log('ressss')
                //console.log(res)
                this.props.syncTree.setNodeDisable(treeId, true);
                this.updateButtonStatus('edit');//更新按钮
                this.props.button.setButtonDisabled('saveadd', false)
                this.fatherNode = res.data.defaultValue.jobtype.rows[0].values.father_pk.value || 'nopk';
                this.props.form.setAllFormValue({'jobtype': res.data.defaultValue.jobtype});
                this.props.cardTable.setTableData(tableId,{rows: []});
                this.editRightTable();//设置表单表格可编辑及禁用状态
                this.setState({//设置启用状态
                    enableStatus: {
                        display: this.state.json['jf6005-000146'],/* 国际化处理： 启用状态*/
                        value: res.data.defaultValue.jobtype.rows[0].values.enablestate.value === '2' ? true : false,
                    }
                })
                if(this.props.form.getFormItemsValue(formId,'inheritflag').value !== true) {
                    this.props.button.setButtonDisabled(['grade_set','delline'], false);
                    this.props.cardTable.setStatus(tableId, 'browse');
                }
            },
            error: err => {
                toast({ color: "warning", content: err.message })
            }
        })

    }
    //edit按钮
    editAfter() {
        this.props.cardTable.setStatus(tableId, 'edit');
        this.setState({
            isDisabled: true
        })
        this.copyData();// 缓存下数据
        if (!sessionStorage.getItem('hyx-selectedTreeNode')) {
            toast({ color: "warning", content: this.state.json['jf6005-000193'] });/* 国际化处理： 请先选择职务类别*/
            return;
        } else {
            ajax({
                url: '/nccloud/hrjf/jobtype/JobTypeEditAction.do',
                type: "POST",
                data: {
                    'pk_jobtype': sessionStorage.getItem('hyx-selectedTreeNode'),
                    'pk_org': this.config.nodeType === 'GLOBE_NODE' ? 'GLOBLE00000000000000' : this.businessInfo.groupId,
                },
                success: res => {
                    this.props.syncTree.setNodeDisable(treeId, true);
                    this.updateButtonStatus('edit');//更新按钮
                    this.props.button.setButtonDisabled('saveadd', true);//禁用saveadd按钮
                    this.editRightTable();//设置表单表格可编辑
                    //this.props.form.setFormItemsDisabled(formId, { 'pk_joblevelsys': false });
                    //重置表内容
                    //res.data.headValue ? this.props.form.setAllFormValue({'jobtype': res.data.headValue.jobtype}) : '';
                    //res.data.bodyValue ? this.props.cardTable.setTableData('levelrel', res.data.bodyValue.levelrel || {rows: []}) : '';
                    this.setState({//设置启用状态
                        enableStatus: {
                            display: this.copyname,
                            value: res.data.headValue.jobtype.rows[0].values.enablestate.value === '2' ? true : false,
                        }
                    })
                    if(this.props.form.getFormItemsValue(formId,'inheritflag').value === true) {
                        this.props.form.setFormItemsDisabled(formId,{'pk_joblevelsys': true});
                        this.props.button.setButtonDisabled(['grade_set','delline'], true);
                        this.props.cardTable.setStatus(tableId, 'browse');
                    }else{
                        this.props.button.setButtonDisabled(['grade_set','delline'], false);
                        this.props.cardTable.setStatus(tableId, 'edit');
                        this.editRightTable();//设置表单表格可编辑
                    }
                },
                error: err => {
                    toast({ color: "warning", content: err.message });
                }
            })
        }
    }

    //设置按钮是否禁用
    setButtonDisable (e = true) {
        this.props.button.setButtonDisabled({
            'edit': sessionStorage.getItem('hyx-selectedTreeNode') === null || e,
            'delete': sessionStorage.getItem('hyx-selectedTreeNode') === null  || e,
            'copy': sessionStorage.getItem('hyx-selectedTreeNode') === null,
            'print_group': sessionStorage.getItem('hyx-selectedTreeNode') === null,
            'print': sessionStorage.getItem('hyx-selectedTreeNode') === null,
            'print_link': sessionStorage.getItem('hyx-selectedTreeNode') === null,
        })
    }
    //cancel按钮
    cancelAfter() {
        this.props.button.setButtonDisabled('saveadd', false);
        this.browseRight();//设置表只读
        this.updateButtonStatus('browse');//更新只读状态按钮
        this.props.syncTree.setNodeDisable(treeId, false);

        //从缓存取回表数据
        if (!sessionStorage.getItem('hyx-selectedTreeNode')) {
            this.props.form.EmptyAllFormValue(formId);
            this.browseRight();//设置表只读
            this.updateButtonStatus('browse');//更新只读状态按钮
        } else {
            Object.keys(this.copyFormData).length !== 0 ? this.props.form.setAllFormValue({ 'jobtype': this.copyFormData }) : '';
            //console.log(this.firstTableData)
            //this.props.cardTable.setTableData(tableId, this.firstTableData);
            //this.props.cardTable.resetTableData(tableId)
            //this.firstTableData
            if (this.addFlag === true) {
                //console.log('mengyuan')
                this.props.cardTable.setTableData(tableId, this.firstTableData);
            } else {
                if(sessionStorage.getItem('hyx-selectedTreeNode') !== null){
                    let tempTreeNode = sessionStorage.getItem('hyx-selectedTreeNode');
                    this.onSelectTree(tempTreeNode);
                }
            }
            this.setState({//设置启用状态
                enableStatus: {
                    display: this.copyname,
                    value: this.copyFormData.rows[0].values.enablestate.value === '2' ? true : false,
                },
                isDisabled: false
            })
        }
        this.addFlag = false;
    }
    //save按钮
    saveAfter(saveArg) {
        //保存表数据
        let formData = this.props.form.getAllFormValue(formId);
        let tableDataO = this.props.cardTable.getAllRows(tableId);
        let tableData = []
        tableDataO&&tableDataO.forEach(v => {
            if (v.status !== '3') {
                tableData.push(v)
            }
        })
        // formData.rows[0].values.pk_org.value = 'GLOBLE00000000000000';
        // 加入飞空字段校验
        //console.log(formData)
        if (!this.props.form.isCheckNow(formId)) {
            return false
        }
        if (!this.props.cardTable.checkTableRequired(tableId)) {
            return false
        }
        //console.log('tempData')
        //设置传输data
        let tempdata = {
            "pageid": "60053010p",
            "head": {
                'rows': formData.rows
            },
            "body": {
                'rows': tableData
            },
            pk_org: this.config.nodeType === 'GLOBE_NODE' ? 'GLOBLE00000000000000' : this.businessInfo.groupId,
        }
        //console.log(tempdata)
        let endSave = new Promise((resolve,reject) => {
            ajax({
                url: '/nccloud/hrjf/jobtype/JobTypeSaveAction.do',
                type: 'POST',
                data: tempdata,
                success: res => {
                    resolve(res);
                },
                error: err => {
                    reject(err);
                }
            });
        })
        endSave.then(res => {
            this.updateButtonStatus('browse');
            this.browseRight();
            this.props.syncTree.setNodeDisable(treeId, false);
            if(this.isAdd === true){
                if(saveArg === 'add'){
                    this.fetchTreeData().then(res => {
                    //     let catchAddItem = () => {
                    //         let arr = [];
                    //         let lastItem = {};
                    //         this.props.syncTree.getSyncTreeValue(treeId,this.fatherNode)&&this.props.syncTree.getSyncTreeValue(treeId,this.fatherNode).children&&this.props.syncTree.getSyncTreeValue(treeId,this.fatherNode).children.forEach(item => {
                    //             arr.push(Date.parse(item.nodeData.nodeValue.creationtime));
                    //         });
                    //         console.log(arr)
                    //         let max = Math.max(...arr);
                    //         this.props.syncTree.getSyncTreeValue(treeId,this.fatherNode)&&this.props.syncTree.getSyncTreeValue(treeId,this.fatherNode).children&&this.props.syncTree.getSyncTreeValue(treeId,this.fatherNode).children.forEach(item => {
                    //             if(Date.parse(item.nodeData.nodeValue.creationtime) === max){
                    //                 lastItem = item;
                    //             }
                    //         });
                    //         this.addNode = lastItem.refpk;
                    //     }
                    // catchAddItem();
                        //console.log(this.treeDataList)
                        // 新增后选中开始
                        let arr = [];
                        let lastItem = {};
                        this.treeDataList && this.treeDataList.length && this.treeDataList.forEach(item => {
                            arr.push(Date.parse(item.nodeData.nodeValue.creationtime));
                        })
                        let max = Math.max(...arr)
                        this.treeDataList && this.treeDataList.length && this.treeDataList.forEach(item => {
                            if(Date.parse(item.nodeData.nodeValue.creationtime) === max){
                                lastItem = item;
                            }
                        });
                        this.addNode = lastItem.refpk;
                        // console.log(this.addNode)
                        this.props.syncTree.setNodeSelected(treeId, this.addNode)

                        // 新增后选中结束

                    this.onSelectTree(this.addNode).then(res => {
                        this.isAdd = false;
                        this.addAfter()
                    });
                })
                }else{
                    this.fetchTreeData().then(res => {
                        // 新增后选中开始
                        let arr = [];
                        let lastItem = {};
                        this.treeDataList && this.treeDataList.length && this.treeDataList.forEach(item => {
                            arr.push(Date.parse(item.nodeData.nodeValue.creationtime));
                        })
                        let max = Math.max(...arr)
                        this.treeDataList && this.treeDataList.length && this.treeDataList.forEach(item => {
                            if(Date.parse(item.nodeData.nodeValue.creationtime) === max){
                                lastItem = item;
                            }
                        });
                        this.addNode = lastItem.refpk;
                        //console.log(this.addNode)
                        this.props.syncTree.setNodeSelected(treeId, this.addNode)

                        // 新增后选中结束
                        this.onSelectTree(this.addNode);
                        this.isAdd = false;
                    });
                }
            }else{
                this.fetchTreeData();
                if(formData.rows[0].values.pk_jobtype.value !== undefined){
                    this.onSelectTree(formData.rows[0].values.pk_jobtype.value);
                }
            }
        },err =>{
            toast({ color: "warning", content: err.message });
        })
    }
    // 给停用的树节点置灰
    addClassForDisAction(tar) {
        tar && tar.length && tar.forEach(v => {
            if (v.nodeData.nodeValue.enablestate === '3') v.titleStyle = {color: 'lightgrey'};
            v.children && this.addClassForDisAction(v.children);
        })
    }
    //delete按钮
    deleleteAfter() {
        //this.treeDataList
        // //console.log(this.treeDataList)
        // //console.log(this.treeNode)
        // //console.log(this.treeDataList.findIndex(v=>v.refpk===this.treeNode))
        let _index = this.treeDataList.findIndex(v=>v.refpk===this.treeNode)
        ajax({
            url: '/nccloud/hrjf/jobtype/JobTypeDeleteAction.do',
            type: 'post',
            data: {
                'pk_jobtype': this.treeNode,
                'pk_org': this.config.nodeType === 'GLOBE_NODE' ? 'GLOBLE00000000000000' : this.businessInfo.groupId,
            },
            success: res => {
                if (res.success === true) toast({color:"success",content:this.state.json['jf6005-000164']});/* 国际化处理： 删除成功!*/
                sessionStorage.removeItem('hyx-selectedTreeNode');
                // 恢复初始状态,并重新请求数据
                this.updateButtonStatus('browse');
                this.props.form.EmptyAllFormValue(formId);
                this.props.cardTable.setTableData(tableId,{rows: []});
                this.setState({
                    enableStatus: {
                        display: this.state.json['jf6005-000146'],/* 国际化处理： 启用状态*/
                        value: true
                    }
                });
                this.fetchTreeData().then(()=>{
                    try {
                        if (this.treeDataList.length < _index + 1) {
                            _index--
                        }
                        this.props.syncTree.setNodeSelected(treeId,this.treeDataList[_index].refpk);
                        this.onSelectTree(this.treeDataList[_index].refpk)
                    } catch (e) {

                    }
                })
            },
            error: err => {
                toast({ color: "warning", content: err.message });
            }
        })
    }
    //copy复制按钮
    copyAfter(){
        //console.log(this.config.nodeType === 'GLOBE_NODE' ? 'GLOBLE00000000000000' : this.businessInfo.groupId)
        ajax({
            url: '/nccloud/hrjf/jobtype/JobTypeCopyStep1Action.do',
            data: {
                'pk_org': this.config.nodeType === 'GLOBE_NODE' ? 'GLOBLE00000000000000' : this.businessInfo.groupId,
            },
            type: 'GET',
            success: res => {
                this.setState({
                    transferData: {
                        leftTreeData: res.data,
                        rightTreeData: []
                    }
                })
            },
            error: err => {
                toast({ color: "warning", content: err.message })
            }
        });
        this.previousStep()
        this.props.modal.show('copyTable');
    }
    //缓存当前表数据
    copyData() {
        this.copyFormData = this.props.form.getAllFormValue(formId);
        this.copyTableData = this.props.cardTable.getAllData(tableId);
        this.copyname = this.state.enableStatus.display;
    }
    // 按钮是否显示，按钮是否可用
    updateButtonStatus(e) {
        this.props.button.setButtonsVisible({
            'grade_set': e === 'edit',
            'delline': e === 'edit',
            'save': e === 'edit',
            'cancel': e === 'edit',
            'saveadd': e === 'edit',
            'copy': e === 'browse',
            'add': e === 'browse',
            'edit': e === 'browse',
            'delete': e === 'browse',
            'print_group': e === 'browse',
            'refresh': e === 'browse'
        })
    }
    //设置右表状态只读
    browseRight() {
        this.props.form.setFormStatus(formId, 'browse');
        this.props.cardTable.setStatus(tableId, 'browse');
    }
    //设置表单表格可编辑及禁用状态
    editRightTable() {
        this.props.form.setFormStatus(formId, 'edit');
        this.props.cardTable.setStatus(tableId, 'edit');
        //设置不可编辑项
        //this.props.form.getFormItemsValue(formId, 'father_pk').value === undefined || this.props.form.getFormItemsValue(formId, 'father_pk').value === "" ? this.props.form.setFormItemsDisabled(formId, { 'pk_joblevelsys': false }) : this.props.form.setFormItemsDisabled(formId, { 'pk_joblevelsys': true });
        this.props.form.setFormItemsDisabled(formId, { 'pk_joblevelsys': !!this.props.form.getFormItemsValue(formId, 'father_pk').value })
        this.props.form.setFormItemsDisabled(formId, {
            'pk_org': true,
            'enablestate': true,
        })
        //设置内容的必输性
        this.props.form.setFormItemsRequired(formId, { 'jobtypecode': true, 'jobtypename': true });
    }
    //启用停用切换事件
    enableOrNot(e) {

        const tempdata = this.ajaxData.headValue.jobtype.rows[0].values.pk_jobtype.value;//获取pk_jobtype值
        const tempEnableStatus = this.state.enableStatus;
        const tempUrl = e ? '/nccloud/hrjf/jobtype/JobTypeUnUseAction.do' : '/nccloud/hrjf/jobtype/JobTypeUseAction.do';

        if (!this.addFlag) {
            if (this.config.nodeType === 'GROUP_NODE') {
                const tar = this.props.form.getAllFormValue('jobtype')
                if (tar.rows[0].values.pk_org.value === "GLOBLE00000000000000") {
                    tar.rows[0].values.enablestate.value === '2' ? toast({color:"warning",content:this.state.json['jf6005-000155']}) : toast({color:"warning",content:this.state.json['jf6005-000156']})/* 国际化处理： 数据不在管控范围内，不能停用!,数据不在管控范围内，不能启用!*/
                    return true
                }
            }
            promptBox({
                color: 'warning',               // 提示类别默认"success"， "success"/"info"/"warning"/"danger",非必输
                title: `${this.state.json['jf6005-000007']}${e?this.state.json['jf6005-000134']:this.state.json['jf6005-000133']}`,                // 提示标题, 默认不同类别下分别为："已成功"/"帮助信息"/"请注意"/"出错啦",非必输/* 国际化处理： 确认,启用,停用*/
                content: `${this.state.json['jf6005-000167']}${e?this.state.json['jf6005-000134']:this.state.json['jf6005-000133']}?`,             // 提示内容,非必输/* 国际化处理： 是否确认要,启用,停用*/
                noFooter: false,                // 是否显示底部按钮(确定、取消),默认显示(false),非必输
                noCancelBtn: false,             // 是否显示取消按钮,，默认显示(false),非必输
                beSureBtnName: this.state.json['jf6005-000036'],          // 确定按钮名称, 默认为"确定",非必输/* 国际化处理： 确定*/
                cancelBtnName: this.state.json['jf6005-000008'],         // 取消按钮名称, 默认为"取消",非必输/* 国际化处理： 取消*/
                hasCloseBtn:true,             //显示“X”按钮，默认不显示，不显示是false，显示是true
                beSureBtnClick: () => {
                    ajax({
                        url: tempUrl,
                        'type': 'post',
                        data: {
                            'pk_jobtype': tempdata,
                            'pk_org': this.config.nodeType === 'GLOBE_NODE' ? 'GLOBLE00000000000000' : this.businessInfo.groupId,
                        },
                        success: res => {
                            toast({ color: "success" });
                            this.onSelectTreeAfter(sessionStorage.getItem('hyx-selectedTreeNode'));
                            this.setState({//成功后改变状态
                                enableStatus: {
                                    display: tempEnableStatus.display,
                                    value: !tempEnableStatus.value,
                                }
                            })
                            this.fetchTreeData()
                        },
                        error: err => {
                            toast({ color: "warning", content: err.message });
                        }
                    })
                },   // 确定按钮点击调用函数,非必输
                // cancelBtnClick: functionCancel,  // 取消按钮点击调用函数,非必输
                // closeBtnClick:functionClose, //关闭按钮点击调用函数，非必输
                closeByClickBackDrop:false,//点击遮罩关闭提示框，默认是true点击关闭，阻止关闭是false
            })

        }
    }
    //获取左树的数据
    fetchTreeData() {
        let fetchTreeDataDone = new Promise((resolve,reject) => {
            ajax({
                url: '/nccloud/hrjf/jobtype/JobTypeQueryAction.do',
                data: {
                    'showUnUseDataFlag': sessionStorage.getItem('showDisabledFlag') === 'true',
                    'pk_org': this.config.nodeType === 'GLOBE_NODE' ? 'GLOBLE00000000000000' : this.businessInfo.groupId
                },
                success: res => {
                    resolve(res);
                },
                error: err => {
                    reject(err)
                    toast({ color: "warning", content: err.message });
                }
            })
        })
        fetchTreeDataDone.then(res => {
            this.treeAjaxData = res.data;
            res.data&&res.data.forEach(v => {
                v = Object.assign(v, { value: { editIcon: false } })
            })
            this.addClassForDisAction(res.data);
            const temp = [
                {
                    code: "1",
                    iconBox: {addIcon: true, delIcon: true, editIcon: true},
                    id: "1002HR100000000003RG",
                    innercode: "B2UL",
                    key: "1002HR100000000003RG",
                    name: this.state.json['jf6005-000198'],/* 国际化处理： 职务类别*/
                    nodeData: {
                        creationtime: "2013-04-18 13:14:05",
                        creator: "1002HR100000000003MV",
                        dataoriginflag: null,
                        dr: "0",
                        enablestate: "2",
                        father_pk: null,
                        inheritflag: false,
                        innercode: "B2UL",
                        jobtypecode: "1",
                        jobtypedesc: null,
                        jobtypename: this.state.json['jf6005-000198'],/* 国际化处理： 职务类别*/
                        jobtypename2: null,
                        jobtypename3: null,
                        m_isDirty: false,
                        modifiedtime: "2018-11-07 16:49:28",
                        modifier: "1002A710000000003K4N",
                        pk_grade_source: "1002HR100000000003RG",
                        pk_group: "0001HR100000000005M3",
                        pk_joblevelsys: "1002A7100000000081CV",
                        pk_jobtype: "1002HR100000000003RG",
                        pk_level_source: "1002HR100000000003RG",
                        pk_org: "GLOBLE00000000000000",
                        pvtjobgrade: true,
                        sealflag: null,
                        seq: null,
                        sourcetype: "0",
                        status: "0",
                        ts: "2018-11-07 16:49:28",
                        type_level: null,
                        usedflag: true
                    },
                    pid: null,
                    refname: this.state.json['jf6005-000198'],/* 国际化处理： 职务类别*/
                    refpk: "nopk",
                    title: this.state.json['jf6005-000198'],/* 国际化处理： 职务类别*/
                    children: res.data || []
                }
            ]
            this.treeData = res.data
            this.treeDataList = this.toList(this.treeData)
            this.props.syncTree.setSyncTreeData(treeId, temp);//设置树数据
            //
            //设置刷新选中
            if(sessionStorage.getItem('hyx-selectedTreeNode') !== null){
                let treeNode = sessionStorage.getItem('hyx-selectedTreeNode');
                this.props.syncTree.setNodeSelected(treeId,sessionStorage.getItem('hyx-selectedTreeNode'));
                //重载展开选中节点的父节点
                this.props.syncTree.openNodeByPk(treeId,'nopk');
                let open = (treeData) =>{
                    treeData&&treeData.forEach(item => {
                        if(item.refpk === treeNode){
                            return;
                        }else{
                            item.children&&item.children.forEach(item2 => {
                                if(item2.refpk === treeNode){
                                    this.props.syncTree.openNodeByPk(treeId,item.refpk);
                                }else{
                                    open(item.children);
                                }
                            })
                        }
                    })
                }
                open(res.data);
            };
            //
            //console.log('res.data')
            // //console.log(res.data)


        })
        return fetchTreeDataDone;
    }
    //选中左边的树
    onSelectTree(c, d, e) {
        if (c === 'nopk') {
            sessionStorage.removeItem('hyx-selectedTreeNode')
            this.props.form.EmptyAllFormValue(formId);
            this.props.cardTable.setTableData(tableId, { rows: [] } );
            this.setState({//设置启用状态
                enableStatus: {
                    display: this.state.json['jf6005-000146'],/* 国际化处理： 启用状态*/
                    value: true
                },
                isDisabled: true
            })
            this.ajaxData = {}
            return false
        }else{
            this.setState({
                isDisabled: false
            })
        }
        return this.onSelectTreeAfter(c);
    }
    //选中后调用
    onSelectTreeAfter(c) {
        sessionStorage.setItem('hyx-selectedTreeNode', c);
        this.addFlag = false;
        this.treeNode = c;
        return this.fetchTableData(c);
    }
    //根据选中的左树获取详细信息
    fetchTableData(c) {
        this.browseRight() ;
        this.updateButtonStatus('browse');
        let fetchTableDataDone = new Promise((resolve,reject) => {
            ajax({
                url: '/nccloud/hrjf/jobtype/JobTypeQueryOneAction.do',
                data: {
                    'pk_jobtype': c,
                    'pk_org': this.config.nodeType === 'GLOBE_NODE' ? 'GLOBLE00000000000000' : this.businessInfo.groupId,
                },
                success: res => {
                    resolve(res);
                }
            })
        });
        fetchTableDataDone.then(res => {
            //console.log(res)
            // if (res.data&&res.data.headValue&&res.data.headValue.jobtype&&res.data.headValue.jobtype.rows)
            try {
                if (res.data.headValue.jobtype.rows[0].values.inheritflag.value) {
                    res.data.headValue.jobtype.rows[0].values.pk_grade_source = res.data.headValue.jobtype.rows[0].values.father_pk
                } else {
                    res.data.headValue.jobtype.rows[0].values.pk_grade_source = res.data.headValue.jobtype.rows[0].values.jobtypename
                    res.data.headValue.jobtype.rows[0].values.pk_grade_source.display = res.data.headValue.jobtype.rows[0].values.pk_grade_source.display ? res.data.headValue.jobtype.rows[0].values.pk_grade_source.display : res.data.headValue.jobtype.rows[0].values.pk_grade_source.value

                }

            } catch (e) {

            }

            ////console.log('girl')
            ////console.log(res.data)
            this.ajaxData = res.data;
            if (res.data.headValue) {
                // //console.log(JSON.stringify(this.props.form.getAllFormValue('jobtype')))
                this.props.form.setAllFormValue({ 'jobtype': res.data.headValue.jobtype });//设置表数据
                this.setState({//设置启用状态
                    enableStatus: {
                        display: res.data.headValue.jobtype.rows[0].values.jobtypename.value,
                        value: res.data.headValue.jobtype.rows[0].values.enablestate.value === '2' ? true : false,
                    }
                })
                if (this.config.nodeType === 'GROUP_NODE') {
                    //console.log('group_node')
                    //console.log(res.data.headValue.jobtype.rows[0].values)
                    res.data.headValue.jobtype.rows[0].values.pk_org.value === "GLOBLE00000000000000" ? this.setButtonDisable(true) : this.setButtonDisable(false)
                } else {

                }
            };
            if (res.data.bodyValue) {
                this.props.cardTable.setTableData(tableId, res.data.bodyValue.levelrel);
                this.firstTableData = JSON.parse(JSON.stringify(res.data.bodyValue.levelrel))
            }else{
                this.props.cardTable.setTableData(tableId, { rows: [] } );
                this.firstTableData = { rows: [] }
            }

            this.copyData()
        });
        return fetchTableDataDone;
    }
    //表单编辑后事件
    onAfterFormEvent(props, moduleId, key, value, oldValue) {
        let {value: val} = value;
        //console.log('~~~')
        //console.log(value)
        //console.log(oldValue)
        //console.log(moduleId)
        //console.log('----')
        if (moduleId === 'jobtype') {
            switch (key) {
                case 'father_pk':
                    if (value.display === null || value.display !== oldValue.display) {
                        this.props.cardTable.setTableData(tableId, { rows: [] });
                    }
                    if (val !== null) {
                        ajax({
                            url: '/nccloud/hrjf/jobtype/JobTypeQueryOneAction.do',
                            data: {
                                'pk_jobtype': val,
                                'pk_org': this.config.nodeType === 'GLOBE_NODE' ? 'GLOBLE00000000000000' : this.businessInfo.groupId,
                            },
                            success: res => {
                                this.props.form.setFormItemsValue('jobtype', {
                                    'pk_joblevelsys': res.data.headValue.jobtype.rows[0].values.pk_joblevelsys
                                });
                                this.props.form.setFormItemsDisabled(formId, {
                                    'pk_joblevelsys': true
                                })
                            }
                        })
                    } else {
                        this.props.form.setFormItemsValue('jobtype', {
                            'pk_joblevelsys': { 'display': null, 'value': null }
                        });
                        this.props.form.setFormItemsDisabled(formId, {
                            'pk_joblevelsys': false
                        })
                    }
                    break;
                case 'inheritflag':
                    if(val === true){
                        this.props.button.setButtonDisabled(['grade_set','delline'], true);
                        this.props.cardTable.setTableData(tableId, { rows: [] });
                    }else{
                        this.props.cardTable.setTableData(tableId, { rows: [] });
                        this.props.button.setButtonDisabled(['grade_set','delline'], false);
                        this.editRightTable();//设置表单表格可编辑
                    }
                    break;
                case 'pk_joblevelsys':
                    if (value.display === null || value.display !== oldValue.display) {
                        this.props.cardTable.setTableData(tableId, { rows: [] });
                    }
                    break
                default:
                    break;
            }
        }
    }
    // 修改左树名字
    onTreeNameChange = (e) => {
        this.setState({ value: e });//记录编辑后的name
    }
    // 点击左树编辑按钮
    onEditTreeClick(item) {
        this.setState({ item, value: item.name });
        this.props.modal.show('addNode');//模态框显示  使用方法
    }
    // 确认编辑
    editForSure() {
        let newItem = Object.assign({}, this.state.item);//拷贝item
        //将编辑后name赋给newitem
        newItem.name = this.state.value;
        newItem.refname = this.state.value;
        newItem.titlename = this.state.value;
        newItem.code = this.state.value;
        this.props.syncTree.editNodeSuccess(treeId, newItem);//修改树节点
        this.closeModal();
    }
    // 点击新增
    onAddTreeClick() {
        ////console.log('add')
    }
    // 确定删除
    functionSureDelete = item => {
        ////console.log(item)
        // delNodeSuceess(id, pk)
        this.props.syncTree.delNodeSuceess(treeId, item.refpk)
    }
    // 删除树的节点
    onDelTreeClick(arg) {
        promptBox({
            color: 'warning',               // 提示类别默认"success"， "success"/"info"/"warning"/"danger",非必输
            title: this.state.json['jf6005-000153'],                // 提示标题, 默认不同类别下分别为："已成功"/"帮助信息"/"请注意"/"出错啦",非必输/* 国际化处理： 确认删除*/
            content: this.state.json['jf6005-000160'],             // 提示内容,非必输/* 国际化处理： 您确定要删除所选数据么?*/
            noFooter: false,                // 是否显示底部按钮(确定、取消),默认显示(false),非必输
            noCancelBtn: false,             // 是否显示取消按钮,，默认显示(false),非必输
            beSureBtnName: this.state.json['jf6005-000036'],          // 确定按钮名称, 默认为"确定",非必输/* 国际化处理： 确定*/
            cancelBtnName: this.state.json['jf6005-000008'],         // 取消按钮名称, 默认为"取消",非必输/* 国际化处理： 取消*/
            hasCloseBtn: true,             //显示“X”按钮，默认不显示，不显示是false，显示是true
            beSureBtnClick: this.functionSureDelete.bind(this, arg),   // 确定按钮点击调用函数,非必输
            // cancelBtnClick: functionCancel,  // 取消按钮点击调用函数,非必输
            // closeBtnClick:functionClose, //关闭按钮点击调用函数，非必输
            closeByClickBackDrop: false,//点击遮罩关闭提示框，默认是true点击关闭，阻止关闭是false
        })
    }
    // 关闭弹出框
    closeModal() {
        this.props.modal.close('addNode')
    }
    //table左侧选择框回调
    tableSelected() {
        let arr = Object.assign([], this.props.cardTable.getCheckedRows(tableId));//获取选中的行,拷贝数据
        this.tempSelectedData = arr;
    }
    //table左侧全选回调
    tableSelectedAll() {
        let arr = Object.assign([], this.props.cardTable.getCheckedRows(tableId));//获取选中的行,拷贝数据
        this.tempSelectedData = arr;
    }
    onCheckBoxChange(e) {
        sessionStorage.setItem('showDisabledFlag', e)
        this.fetchTreeData()
    }
    //获取表头按钮
    getTableHead = () => {
        let { button: { createButtonApp } } = this.props;
        return (
            <div className="grade_table" >
                {createButtonApp({
                    area: 'table-list2',//按钮注册中的按钮区域
                    onButtonClick: (props, id) => {this.tableOpt(props, id);}
                })}
                {createButtonApp({
                    area: 'table-list',//按钮注册中的按钮区域
                    onButtonClick: (props, id) => {this.tableOpt(props, id);}
                })}

            </div>
        )
    }

    // 点击参照前的事件
    onBeforeEvents = (props, moduleId, key, value, changedrows, record,index) => {
        //console.log('onBeforeEvents')
        let formData1 = this.props.form.getAllFormValue(formId);
        //console.log(formData1)
        //console.log(record)
        // if (!formData1.rows[0].values.pk_jobtype.value) {
        //     toast({color:"warning",content:this.state.json['jf6005-000179']})/* 国际化处理： 请先选择职务类别!*/
        //     this.props.cardTable.setColEditableByKey('levelrelation2','pk_joblevel',false)
        // }
        let meta = props.meta.getMeta()
        let child = this.treeDataList.find(v=>v.refpk === formData1.rows[0].values.pk_jobtype.value)
        let father = child&&child.nodeData&&this.treeDataList.find(v=>v.refpk === child.nodeData.nodeValue.father_pk)
        // //console.log(this.toList(this.treeData))
        ////console.log(this.props.syncTree.createTreeData(this.treeData))
        let father_pk = formData1.rows[0].values&&formData1.rows[0].values.father_pk.value

        if(key === 'pk_joblevel') {
            meta[moduleId].items.map((obj) => {
                if (true) {//项目分类参照
                    obj.queryCondition = function () {
                        return {
                            "intType": 0,
                            "pk_filtertype":formData1.rows[0].values.pk_jobtype.value
                        }
                    }
                }
            });
            props.meta.setMeta(meta);
        } else if (key === 'jobrank') {
            meta[moduleId].items.map((obj) => {
                if (obj.attrcode === 'jobrank') {//参照设置为多选
                    //console.log(obj)
                    obj.isMultiSelectedEnabled = true
                    //if (father||father_pk) {
                    if (father_pk) {
                        obj.queryCondition = () => ({
                            'intType': 0,
                            'pk_filtertype': father_pk || (father&&father.nodeData.nodeValue.pk_jobtype) || '',
                            'pk_joblevel': record.values.pk_joblevel.value,
                            'pk_org': this.config.nodeType === 'GLOBE_NODE' ? 'GLOBLE00000000000000' : this.businessInfo.groupId,
                            'pk_group': this.config.nodeType === 'GLOBE_NODE' ? 'GLOBLE00000000000000' : this.businessInfo.groupId
                        })
                    } else {
                        obj.queryCondition = () => ({
                            'intType': 4,
                            'pk_filtertype': formData1.rows[0].values.pk_joblevelsys.value,
                            'pk_joblevel': record.values.pk_joblevelsys.value,
                            'pk_org': this.config.nodeType === 'GLOBE_NODE' ? 'GLOBLE00000000000000' : this.businessInfo.groupId,
                            'pk_group': this.config.nodeType === 'GLOBE_NODE' ? 'GLOBLE00000000000000' : this.businessInfo.groupId
                        })
                    }
                }
            });
            props.meta.setMeta(meta);
        } else if (key === 'defaultrank') {
            const arr_str = record.values.jobrank.value
            if (!arr_str) {
                //toast({ color: "warning", content: '请先选择对应职等' })
                toast({color:"warning",content:this.state.json['jf6005-000309']})/* 国际化处理： 请先设置职等!*/
                return false
            }
            const arr = arr_str ? arr_str.split(',') : []
            meta[moduleId].items.map((obj) => {
                if (obj.attrcode === 'defaultrank') {//参照设置为多选
                    obj.queryCondition = () => ({
                        'intType': father_pk ? 0 : 4,
                        //'pk_filtertype': JSON.parse(sessionStorage.getItem('treeNodeData')).nodeData.nodeValue.pk_jobtype,
                        'pk_filtertype': father_pk ? father_pk : formData1.rows[0].values.pk_joblevelsys.value,
                        'pk_joblevel': record.values.pk_joblevel.value,
                        "filterPks": arr_str
                    })
                }
            });
            props.meta.setMeta(meta);
        }
        return true;
    }
    // 点击后事件
    onAfterEvent = (props, moduleId, key, value, changedrows,index,record) => {
        const { newvalue,rowid } = changedrows[0]
        //console.log(moduleId)
        //console.log(key)
        //console.log(value)
        //console.log(changedrows)
        //console.log(index)
        if (key === 'jobrank') {
            if (value&&value.length === 1) {
                let temp = {
                    display: value[0]&&value[0].values&&value[0].values.jobrankname.value || value[0].display,
                    value: value[0].values&&value[0].values.pk_jobrank.value|| value[0].refpk
                }
                ////console.log( this.props.cardTable.getValByKeyAndIndex('levelrelation', index, 'defaultrank'))
                this.props.cardTable.setValByKeyAndIndex('levelrel', index, 'defaultrank', temp)
            } else if (!value || value&&value.length === 0) {
                this.props.cardTable.setValByKeyAndIndex('levelrel', index, 'defaultrank', {
                    display: null,
                    value: null
                })
            }
            let _rank =  this.props.cardTable.getValByKeyAndIndex('levelrel', index, 'defaultrank');
           !!(_rank.value&&value&&value.length&&value.find(v=>v.refpk===_rank.value) === undefined)&&(this.props.cardTable.setValByKeyAndIndex('levelrel', index, 'defaultrank', {display: null,value: null}))

        }
    }

    //递归syncTree数据到列状
    toList = (tar) => {
        let _array = []
        function dis(foo) {
            if (foo&&foo.length) {
                foo.forEach(v=>{
                    _array.push(v)
                    if (v.children&&v.children.length) {
                        return dis(v.children)
                    }
                })
            }
            return _array
        }
        return dis(tar)
    }

    //表右肩按钮点击事件
    tableOpt(props, id) {
        switch (id) {
            case 'grade_set':
                this.grade_setAfter();
                break;
            case 'delline':
                this.delLineAfter();
                break;
        }
    }
    grade_setAfter() {
        this.props.cardTable.setStatus(tableId, 'edit');
        let tempPk_joblevelsys = this.props.form.getAllFormValue(formId).rows[0].values.pk_joblevelsys.value;
        let tempDataO =  this.props.cardTable.getAllRows(tableId);
        let tempData = []
        tempDataO&&tempDataO.forEach(v => {
            if (v.status !== '3') tempData.push(v)
        })
        let tempFather_pk = this.props.form.getAllFormValue(formId).rows[0].values.father_pk.value;
        let grade_setAfter = new Promise((resolve,reject) => {
            ajax({
                url: '/nccloud/hrjf/jobtype/JobTypeAddLineCheckAction.do',
                type: 'post',
                data: {
                    "pk_joblevelsys": tempPk_joblevelsys,
                    'model': {rows: tempData},
                    'father_pk': tempFather_pk,
                    'pk_org': this.config.nodeType === 'GLOBE_NODE' ? 'GLOBLE00000000000000' : this.businessInfo.groupId,
                } ,
                success: res => {
                    resolve(res);
                    //console.log(res);
                    this.intType = res.data.intType;
                    this.pk_filtertype = res.data.pk_filtertype;
                    this.oldJobLevelPks = res.data.oldJobLevelPks;
                },
                error: err => {
                    reject(err)
                    toast({ color: "warning", content: err.message })
                }
            })
        });
        grade_setAfter.then(res => {
            let data2 = this.props.cardTable.getVisibleRows(tableId)
            this.setState({
                referValue: data2 ? data2.map(v=>({refpk: v.values.pk_joblevel.value})) : []
            })
            document.getElementById("referButton").click();
        })
    }
    delLineAfter() {
        let formData = this.props.form.getAllFormValue(formId);
        let tableData = this.props.cardTable.getVisibleRows(tableId);
        // 若表格数据为空,给另外一个提示
        // if (tableData.length === 0 || !tableData) {
        //     toast({ color: "warning", content: this.state.json['jf6005-000332'] });/* 国际化处理： 请选择要删除的行!*/
        //     return false
        // }
        let tempData =  this.props.cardTable.getCheckedRows(tableId) || [];
        //console.log(tempData)
        if (this.addFlag) {
            if (tempData&&tempData.length === 0) {//临时选择数据长度
                toast({ color: "warning", content: this.state.json['jf6005-000163'] });/* 国际化处理： 请选择要删除的行!*/
                return;
            }
            this.props.cardTable.delRowsByIndex(tableId, tempData.map(v=>{return v.index}));//通过index删除出下标
        } else {
            ajax({
                url: '/nccloud/hrjf/jobtype/JobTypeDelLineAction.do',
                type: 'post',
                data: {
                    "head": {
                        'rows': formData.rows
                    },
                    'sub': {rows: tempData},
                    'pk_org': this.config.nodeType === 'GLOBE_NODE' ? 'GLOBLE00000000000000' : this.businessInfo.groupId,
                },
                success: res => {
                    //console.log(res);
                    if (tempData&&tempData.length === 0) {//临时选择数据长度
                        toast({ color: "warning", content: this.state.json['jf6005-000163'] });/* 国际化处理： 请选择要删除的行!*/
                        return;
                    }
                    this.props.cardTable.delRowsByIndex(tableId, tempData.map(v=>{return v.index}));//通过index删除出下标
                }
            })
        }

    }
    //transfer功能
    previousStep() {
        this.setState({
            isStepOne: true,
            disabled: {
                pre: true,
                nex: false,
                com: true,
                can: false,
            }
        });
    }
    nextStep() {
        if(this.state.transferData&&this.state.transferData.rightTreeData&&this.state.transferData.rightTreeData.length > 0){
            let tempTreeData =  this.state.transferData.rightTreeData;
            let tempData = {
                param_str: '',
                'pk_org': this.config.nodeType === 'GLOBE_NODE' ? 'GLOBLE00000000000000' : this.businessInfo.groupId,
            };
            let arr = [];
            let findRefpk = (tempTreeData) => {
                tempTreeData&&tempTreeData.forEach(item => {
                    arr.push(item.refpk);
                    if(item.hasOwnProperty('children')){
                        findRefpk(item.children)
                    }
                })
                return arr.reverse();
            }
            findRefpk(tempTreeData);
            tempData.param_str = arr.join(',');
            ajax({
                url: '/nccloud/hrjf/jobtype/JobTypeCopyStep2Action.do',
                type: 'POST',
                data: tempData,
                success: res => {
                    this.setState({
                        isStepOne: false,
                        disabled: {
                            pre: false,
                            nex: true,
                            com: false,
                            can: false,
                        }
                    });
                    this.props.cardTable.setTableData('copylist', res.data.copylist);
                    this.props.cardTable.setStatus('copylist','edit')
                },
                error: err => {
                    toast({ color: "warning", content: err.message })
                }
            });
        }else {
            toast({ color: "warning", content: this.state.json['jf6005-000211'] })/* 国际化处理： 请选择要复制的职务类别!*/
        }
    }
    transferComplete() {
        try {
            if (!this.props.cardTable.checkTableRequired('copylist')) {
                return false
            }
        } catch (error) {

        }

        let tempData =  this.props.cardTable.getAllRows('copylist');
        //console.log(tempData)

        //console.log('tempData')
        //console.log(tempData)
        ajax({
            url: '/nccloud/hrjf/jobtype/JobTypeCopyDoneAction.do',
            type: 'POST',
            data: {
                pk_jobtype: sessionStorage.getItem('hyx-selectedTreeNode'),
                model: {rows: tempData},
                'pk_org': this.config.nodeType === 'GLOBE_NODE' ? 'GLOBLE00000000000000' : this.businessInfo.groupId,
            },
            success: res => {
                this.props.modal.close('copyTable');
                this.fetchTreeData().then(res=> {
                    this.props.syncTree.openNodeByPk(treeId, this.treeNode);
                });


            }
        });
    }
    transferCancle () {
        this.setState({
            isStepOne: true,
            selectType: 'onlySelf',
            disabled: {
                pre: true,
                nex: false,
                com: true,
                can: false,
            }
        });
        this.props.modal.close('copyTable');
    }
    onBeforeFormEvents= (props, moduleId, key, value, changedrows) => {
        //console.log('----')
        //console.log(props)
        //console.log(moduleId)
        //console.log(key)
        //console.log('----')
        let meta = props.meta.getMeta()
        if(key === 'father_pk') {
            meta[moduleId].items.map((obj) => {
                if (obj.attrcode === 'father_pk') {//参照设置为多选
                    obj.queryCondition = () => ({
                        "pk_org": this.config.nodeType === 'GLOBE_NODE' ? 'GLOBLE00000000000000' : this.businessInfo.groupId,
                    })
                }
            });
            props.meta.setMeta(meta);
        } else if (key === 'pk_joblevelsys') {
            meta[moduleId].items.map((obj) => {
                if (obj.attrcode === 'pk_joblevelsys') {//参照设置为多选
                    obj.queryCondition = () => ({
                        "pk_org": this.config.nodeType === 'GLOBE_NODE' ? 'GLOBLE00000000000000' : this.businessInfo.groupId,
                    })
                }
            });
            props.meta.setMeta(meta);
        }
        return true;
    }
    //让某个节点置灰
    letItGrey (index) {
        document.getElementsByClassName('u-tree-searchable-filter')[index].parentNode.classList.add("list-grey");
    }

    render() {
        let { button, search, DragWidthCom, modal, table, form, cardTable, editTable, cardPagination, syncTree } = this.props;
        const { createSyncTree } = syncTree
        const { createForm } = form;//创建表单，需要引入这个
        const { createCardPagination } = cardPagination;
        let { createModal } = modal;  //模态框
        let { createButtonApp } = button;
        let { NCCreateSearch } = search;
        let { createSimpleTable } = table;
        let { createCardTable } = cardTable;
        let { createEditTable } = editTable;
        let referButton = (<button id="referButton"></button>)
        let transferContentOne = (
            <div className="trans" style={{'padding': 0,'margin': 0,'overflow':'scroll'}}>
                <Transfer
                        {...this.props}
                        TransferId={'org_transferid'}  //id,必填
                        title={{left: this.state.json['jf6005-000212'], right: this.state.json['jf6005-000213']}}/* 国际化处理： 待选职务类别,已选职务类别*/
                        leftTreeData={this.state.transferData.leftTreeData}
                        rightTreeData={this.state.transferData.rightTreeData}
                        selectType = {this.state.selectType}  // 设置节点选中方式
                        hiddenAllMoveBtns = {false} // 设置是否显示全部移动按钮
                        rightFixed = {false} //  右树有固定的数据时需要设置为true。
                        referLeftTree = {false} // 左树为参照树
                        // onRef={this.onRef}
                        value={this.state.transferData}
                        // disableBtns={!this.state.editPageFlag}//禁用按钮
                        leftTreeConfig={{
                            defaultExpandAll: true,
                            defaultExpandedKeys: this.state.allkeys
                        }}
                        rightTreeConfig={{
                            defaultExpandAll: true
                        }}
                    />
                <div className="title">
                    {/*{this.config.pageTitle}*/}
                    <span className="show-off-checkbox">
                            <NCCheckbox
                                // checked={sessionStorage.getItem('showDisabledFlag') === 'true'}
                                onChange={e=>{
                                    e?this.setState({
                                        selectType: 'onlyChild', // 从左到右的方式 'onlySelf':自己;    'default':全部包含子节点
                                    }):this.setState({
                                        selectType: 'onlySelf', // 从左到右的方式 'onlySelf':自己;    'default':全部包含子节点
                                    })
                                }}
                            >{this.state.json['jf6005-000013']}</NCCheckbox>{/* 国际化处理： 包含所有下级*/}
                        </span>

                </div>
                <div class="u-modal-footer u-modal-footer-inner">
                    <NCButton colors="default" disabled={this.state.disabled.pre} onClick={this.previousStep.bind(this)}>{this.state.json['jf6005-000009']}</NCButton>{/* 国际化处理： 上一步*/}
                    <NCButton colors="default" disabled={this.state.disabled.nex} onClick={this.nextStep.bind(this)}>{this.state.json['jf6005-000006']}</NCButton>{/* 国际化处理： 下一步*/}
                    <NCButton colors="primary" disabled={this.state.disabled.com} onClick={this.transferComplete.bind(this)}>{this.state.json['jf6005-000010']}</NCButton>{/* 国际化处理： 完成*/}
                    <NCButton colors="default" disabled={this.state.disabled.can} onClick={this.transferCancle.bind(this)}>{this.state.json['jf6005-000008']}</NCButton>{/* 国际化处理： 取消*/}
                </div>
            </div>
        );
        let transferContentTwo = (
            <div>
                {createCardTable('copylist',
                    {
                        showIndex: true,
                        showCheck: false,//显示复选框
                    }
                )}
                <div class="u-modal-footer u-modal-footer-inner">
                    <NCButton colors="default" disabled={this.state.disabled.pre} onClick={this.previousStep.bind(this)}>{this.state.json['jf6005-000009']}</NCButton>{/* 国际化处理： 上一步*/}
                    <NCButton colors="default" disabled={this.state.disabled.nex} onClick={this.nextStep.bind(this)}>{this.state.json['jf6005-000006']}</NCButton>{/* 国际化处理： 下一步*/}
                    <NCButton colors="primary" disabled={this.state.disabled.com} onClick={this.transferComplete.bind(this)}>{this.state.json['jf6005-000010']}</NCButton>{/* 国际化处理： 完成*/}
                    <NCButton colors="default" disabled={this.state.disabled.can} onClick={this.transferCancle.bind(this)}>{this.state.json['jf6005-000008']}</NCButton>{/* 国际化处理： 取消*/}
                </div>
            </div>
        );
        let transferContent = () => {
            if(this.state.isStepOne === true) {
                return transferContentOne;
            }else {
                return transferContentTwo;
            }
        }

        return (
            <div className="jobtype-base">
                {/* 头部 header*/}
                <div className="header">
                    {createModal('modal', { noFooter: false })}
                    {/* 标题 title*/}
                    <div className="title">
                        {/*{this.config.pageTitle}*/}
                        <span className="show-off-checkbox">
                            <NCCheckbox
                                checked={sessionStorage.getItem('showDisabledFlag') === 'true'}
                                onChange={this.onCheckBoxChange.bind(this)}
                            >{this.state.json['jf6005-000130']}</NCCheckbox>{/* 国际化处理： 显示停用*/}
                        </span>

                    </div>
                    {/* 按钮组 btn-group*/}
                    <div className="btn-group">
                        {createButtonApp({
                            area: 'head',
                            buttonLimit: 3,
                            onButtonClick: this.onBtnOperation.bind(this),
                            popContainer: document.querySelector('.header-button-area')
                        })}
                    </div>
                </div>
                {/* 树卡区域 */}
                <div className="tree-card">
                    <DragWidthCom
                        // 左树区域
                        leftDom={
                            <div className="tree-area">
                                {createSyncTree({
                                    treeId: treeId,
                                   // needEdit: true, //不启用编辑
                                    showLine: false, //显示连线
                                    needSearch: true, //是否需要搜索框
                                    onSelectEve: this.onSelectTree.bind(this),//选择
                                    // onMouseEnterEve:this.onMouseEnterEve.bind(this),
                                    needEdit:false,
                                    // clickEditIconEve: this.onEditTreeClick.bind(this), //编辑点击 回调
                                    // clickAddIconEve: this.onAddTreeClick.bind(this), //新增点击 回调
                                    // clickDelIconEve: this.onDelTreeClick.bind(this), // 删除点击 回调
                                    showModal: false,
                                    defaultExpandAll : true,

                                })}
                            </div>}
                        // 右卡片区域
                        rightDom={
                            <div className="card-area">
                                <div className={`enable-class ${THEME.fontc}`}>
                                    <span>
                                        {this.state.enableStatus.display}
                                    </span>
                                    <NCSwitch
                                        checked={this.state.enableStatus.value}
                                        onChange={(e) => { this.enableOrNot(e)
                                        }}
                                        disabled={this.state.isDisabled}
                                    />
                                </div>
                                <div className="nc-bill-form-area">
                                    {createForm(formId, {
                                        onAfterEvent: this.onAfterFormEvent.bind(this),
                                        onBeforeEvent: this.onBeforeFormEvents.bind(this),
                                    })
                                    }
                                </div>
                                <div className="nc-bill-table-area">
                                    {createCardTable(tableId,
                                        {
                                            tableHead: this.getTableHead,//右侧肩部功能区创建
                                            onBeforeEvent: this.onBeforeEvents,
                                            onAfterEvent: this.onAfterEvent,
                                            onSelected: this.tableSelected.bind(this),//左侧选择列单个选择框回调
                                            onSelectedAll: this.tableSelectedAll.bind(this),
                                            showCheck: true,//显示复选框
                                        }
                                    )}
                                </div>
                            </div>
                        }     //右侧区域dom
                        defLeftWid='20%'      // 默认左侧区域宽度，px/百分百
                    />
                </div>
                {createModal('addNode', {
                    title: this.state.json['jf6005-000165'],// 弹框表头信息/* 国际化处理： 修改内容*/
                    content: <div>
                        <NCFormControl
                            value={this.state.value}
                            placeholder={this.state.json['jf6005-000166']}/* 国际化处理： 请输入修改后的内容*/
                            onChange={this.onTreeNameChange.bind(this)}
                            size="sm"
                        />
                    </div>, //弹框内容，可以是字符串或dom
                    beSureBtnClick: this.editForSure.bind(this), //点击确定按钮事件
                    cancelBtnClick: this.closeModal.bind(this), //取消按钮事件回调
                    closeModalEve: this.closeModal.bind(this), //关闭按钮事件回调
                    userControl: false,  // 点 确定/取消 按钮后，是否自动关闭弹框.true:手动关。false:自动关,默认false
                    size: 'lg', //  模态框大小 sm/lg/xlg
                    noFooter: false, //是否需要底部按钮,默认有footer,有false,没有true
                    rightBtnName: this.state.json['jf6005-000008'], //左侧按钮名称,默认‘取消’/* 国际化处理： 取消*/
                    leftBtnName: this.state.json['jf6005-000036'], //右侧按钮名称， 默认‘确定’/* 国际化处理： 确定*/
                    className: 'junior', /*
                               简单型junior -> 宽度410PX 高度210PX .【这个暂时别用，简单提示使用promptBox 或者 this.props.ncmodal的createModal】
                               中型senior -> 宽度520PX 高度根据内容自适应，最小值268，最大高度限制420，如modal主体还要承modal主体区出现滚动条
                               复杂型combine  -> 宽度680PX 高度根据内容自适应，最小值268，最大高度限制570，如modal主体还要承载modal主体区出现滚动条
                               头部和底部固定高度
                               不写的话默认走size设定大小
                              */
                    closeByClickBackDrop: false,//点击遮罩关闭提示框，true是点击关闭，false是阻止关闭,默认是false
                    hasBackDrop: true,//显示遮罩层，显示是true，不显示是false，默认是true
                })}

                {createModal('copyTable', {
                    title: this.state.json['jf6005-000214'],// 弹框表头信息/* 国际化处理： 复制职务类别*/
                    content: transferContent(),
                    beSureBtnClick: this.editForSure.bind(this), //点击确定按钮事件
                    cancelBtnClick: this.closeModal.bind(this), //取消按钮事件回调
                    closeModalEve: this.closeModal.bind(this), //关闭按钮事件回调
                    userControl: false,  // 点 确定/取消 按钮后，是否自动关闭弹框.true:手动关。false:自动关,默认false
                    size: 'xlg', //  模态框大小 sm/lg/xlg
                    noFooter: true, //是否需要底部按钮,默认有footer,有false,没有true
                    rightBtnName: this.state.json['jf6005-000008'], //左侧按钮名称,默认‘取消’/* 国际化处理： 取消*/
                    leftBtnName: this.state.json['jf6005-000036'], //右侧按钮名称， 默认‘确定’/* 国际化处理： 确定*/
                    className: '', /*
                               简单型junior -> 宽度410PX 高度210PX .【这个暂时别用，简单提示使用promptBox 或者 this.props.ncmodal的createModal】
                               中型senior -> 宽度520PX 高度根据内容自适应，最小值268，最大高度限制420，如modal主体还要承modal主体区出现滚动条
                               复杂型combine  -> 宽度680PX 高度根据内容自适应，最小值268，最大高度限制570，如modal主体还要承载modal主体区出现滚动条
                               头部和底部固定高度
                               不写的话默认走size设定大小
                              */
                    closeByClickBackDrop: false,//点击遮罩关闭提示框，true是点击关闭，false是阻止关闭,默认是false
                    hasBackDrop: true,//显示遮罩层，显示是true，不显示是false，默认是true
                })}

                {createModal('gradeTable', {
                    title: this.state.json['jf6005-000215'],// 弹框表头信息/* 国际化处理： 职级参照*/
                    content: (
                        <div>

                        </div>
                    ),
                    beSureBtnClick: this.editForSure.bind(this), //点击确定按钮事件
                    cancelBtnClick: this.closeModal.bind(this), //取消按钮事件回调
                    closeModalEve: this.closeModal.bind(this), //关闭按钮事件回调
                    userControl: false,  // 点 确定/取消 按钮后，是否自动关闭弹框.true:手动关。false:自动关,默认false
                    size: 'xlg', //  模态框大小 sm/lg/xlg
                    noFooter: true, //是否需要底部按钮,默认有footer,有false,没有true
                    rightBtnName: this.state.json['jf6005-000008'], //左侧按钮名称,默认‘取消’/* 国际化处理： 取消*/
                    leftBtnName: this.state.json['jf6005-000036'], //右侧按钮名称， 默认‘确定’/* 国际化处理： 确定*/
                    className: '', /*
                               简单型junior -> 宽度410PX 高度210PX .【这个暂时别用，简单提示使用promptBox 或者 this.props.ncmodal的createModal】
                               中型senior -> 宽度520PX 高度根据内容自适应，最小值268，最大高度限制420，如modal主体还要承modal主体区出现滚动条
                               复杂型combine  -> 宽度680PX 高度根据内容自适应，最小值268，最大高度限制570，如modal主体还要承载modal主体区出现滚动条
                               头部和底部固定高度
                               不写的话默认走size设定大小
                              */
                    closeByClickBackDrop: false,//点击遮罩关闭提示框，true是点击关闭，false是阻止关闭,默认是false
                    hasBackDrop: true,//显示遮罩层，显示是true，不显示是false，默认是true
                })}
                {
                    referOfJobLevel({
                        onChange: e=>{
                            //console.log('eeeeeeeeeeeeee')
                            //console.log(e)
                            let tempPk_joblevel = [];
                            let tempDataO =  this.props.cardTable.getAllRows(tableId);
                            let tempData = []
                            tempDataO&&tempDataO.forEach(v => {
                                if (v.status !== '3') {
                                    tempData.push(v)
                                }
                            })
                            e&&e.forEach(item => {
                                tempPk_joblevel.push(item.values?item.values.pk_joblevel.value : item.refpk);
                            })
                            ajax({
                                url: '/nccloud/hrjf/jobtype/JobTypeAddLineDoneAction.do',
                                type: 'post',
                                data:  {
                                    'pk_joblevel': tempPk_joblevel.join(','),
                                    'model': {rows: tempData},
                                    'pk_org': this.config.nodeType === 'GLOBE_NODE' ? 'GLOBLE00000000000000' : this.businessInfo.groupId,
                                },
                                success: res => {
                                    //console.log(res);
                                    this.props.cardTable.setTableData(tableId,res.data ? res.data.levelrel : {rows: []});

                                },
                                error: err => {
                                    toast({ color: "warning", content: err.message })
                                }
                            })
                        },
                        clickContainer: referButton,
                        value: this.state.referValue,
                        queryCondition: () => {
                            //console.log(this.intType)
                            return {
                                "intType": this.intType,
                                "pk_filtertype": this.pk_filtertype,
                            }
                        },
                        isMultiSelectedEnabled: true,
                    })
                }
            </div>


        )
    }
}
let JobGradeModal = createPage({})(JobType)
// ReactDOM.render(<JobGradeModal />, document.querySelector('#app'));
export default JobType;
