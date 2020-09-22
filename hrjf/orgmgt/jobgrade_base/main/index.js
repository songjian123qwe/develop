/**
 * Created by wanghongxiang on 2018/5/8.
 */
import React, {Component} from 'react';

import {high, createPage, toast, base, getUrlParam, promptBox, print, output, getBusinessInfo} from 'nc-lightapp-front';
import {hrAjax as ajax} from 'src/hrpub/common/utils/utils';
import './index.less'
import {THEME} from "../../../public/theme/theme";

let {NCCheckbox, NCSwitch, NCFormControl} = base;
let formId = 'baseinfo';
let treeId = 'leftTree';

class JobGrade extends Component {
    constructor(props) {
        super(props);
        this.config = props.context;
        this.state = {
            showMode: 'browse',
            showChangePage: false,
            enablestate: true,
            showModal: false,
            value: "test",
            item: {},
            currentname: {},
            showUploader: false,
            target: null,
            groupLists: [],
            billId: '',
            billNo: '',
            inlt: [],
            json: []
        };
        this.update = false,
            this.originFormData = {
                "areaType": "form",
                "rows": [{
                    "values": {
                        "code": {"display": null, "value": null},
                        "name": {"display": null, "value": null},
                        "pk_org": {display: this.state.json['jf6005-000147'], value: "GLOBLE00000000000000"},
                        "enablestate": {"display": null, "value": null},
                        "memo": {"display": null, "value": null},
                        "creator": {"display": null, "value": null},
                        "creationtime": {"display": null, "value": null},
                        "modifier": {"display": null, "value": null},
                        "modifiedtime": {"display": null, "value": null},
                        "pk_group": {"display": null, "value": null},
                        "dataoriginflag": {"display": null, "value": null},
                        "ts": {"display": null, "value": null},
                        "pk_joblevelsys": {"display": null, "value": null}
                    }
                }]
            };/* 国际化处理： 全局*/
        this.ajaxData = {};
        this.copyFormData = {};
        this.copyTableData = [];
        this.copyname = {};
        this.addFlag = false;
        this.treeNode = '';
        this.tempSelectedData = [];
        this.defaultEnable = {};
        this.treeData = [];
        this.businessInfo = {};

        this.root = {//为人员类别树创建一个根节点
            "isleaf": false,
            "key": "ROOT",
            "title": this.state.json['jf6005-000148'],/* 国际化处理： 职级类别*/
            "id": "ROOT",
            "innercode": "ROOT",
            "pid": "",
            "refname": this.state.json['jf6005-000148'],/* 国际化处理： 职级类别*/
            "refpk": "ROOT"
        };
        if (this.config) {
            props.createUIDom(this.config, (data) => {
                this.setState({
                    buttons: data.button || [],
                    context: data.context || {}
                });
                props.meta.setMeta(data && data.template ? data.template : {});
                props.button.setButtons(data && data.button ? data.button : {});
            })
        }
    }

    componentWillMount() {
        let callback = (json, status, inlt) => {
            if (status) {
                this.setState({json, inlt}, () => {
// this.initTemplate(this.props) //在这里可以进行ceateUIDom
                    this.setState({
                        currentname: {
                            value: this.state.json['jf6005-000146'], enableStatus: true/* 国际化处理： 启用状态*/
                        }
                    });
                    this.defaultEnable = {
                        value: this.state.json['jf6005-000146'], enableStatus: true/* 国际化处理： 启用状态*/
                    };

                    this.originFormData.rows[0].values.pk_org.value = this.config.nodeType === 'GLOBE_NODE' ? 'GLOBLE00000000000000' : this.businessInfo.groupId;
                    this.originFormData.rows[0].values.pk_org.display = this.config.nodeType === 'GLOBE_NODE' ? this.state.json['jf6005-000147'] : this.businessInfo.groupName
                }) // 保存json和inlt到页面state中并刷新页面
            }
        };
        this.props.MultiInit.getMultiLang({moduleId: 'jf6005', domainName: 'hrjf', callback})

    }

    // 统一处理按钮事件
    onBtnOperation(prop, btncode, areacode, opt) {
        let billId = this.props.form.getFormItemsValue('baseinfo', 'pk_joblevelsys').value;
        //console.log(btncode)
        switch (btncode) {
            case 'add':
                this.update = false;
                this.props.button.setButtonDisabled('saveadd', false);
                this.caseadd();
                break;
            case 'cancel':
                promptBox({
                    color: 'warning',               // 提示类别默认"success"， "success"/"info"/"warning"/"danger",非必输
                    title: this.state.json['jf6005-000149'],                // 提示标题, 默认不同类别下分别为："已成功"/"帮助信息"/"请注意"/"出错啦",非必输/* 国际化处理： 确认取消*/
                    content: this.state.json['jf6005-000150'],             // 提示内容,非必输/* 国际化处理： 是否确认取消?*/
                    noFooter: false,                // 是否显示底部按钮(确定、取消),默认显示(false),非必输
                    noCancelBtn: false,             // 是否显示取消按钮,，默认显示(false),非必输
                    beSureBtnName: this.state.json['jf6005-000036'],          // 确定按钮名称, 默认为"确定",非必输/* 国际化处理： 确定*/
                    cancelBtnName: this.state.json['jf6005-000008'],         // 取消按钮名称, 默认为"取消",非必输/* 国际化处理： 取消*/
                    hasCloseBtn: true,             //显示“X”按钮，默认不显示，不显示是false，显示是true
                    beSureBtnClick: this.sureCancel.bind(this),   // 确定按钮点击调用函数,非必输
                    // cancelBtnClick: functionCancel,  // 取消按钮点击调用函数,非必输
                    // closeBtnClick:functionClose, //关闭按钮点击调用函数，非必输
                    closeByClickBackDrop: false,//点击遮罩关闭提示框，默认是true点击关闭，阻止关闭是false
                });
                break;
            case 'save':
                this.saveHYX();
                break;
            case 'edit':
                this.update = true;
                this.setButtonDisable();
                this.caseupdate();
                break;
            case 'delete':
                this.casedel();
                break;
            //附件管理
            case 'file':
                if (!this.treeNode) {
                    toast({color: "warning", content: this.state.json['jf6005-000151']});/* 国际化处理： 请先选择节点!*/
                    return false
                }
                this.setState({
                    showUploader: true,
                    billId: billId,
                    //billNo: billNo
                });
                break;
            case 'print_group':
                if (!sessionStorage.getItem('hyx-selectedTreeNode')) {
                    toast({color: "warning", content: this.state.json['jf6005-000316']});/* 国际化处理： 请先选择职级类别*/
                    return;
                }
                let formData = this.props.form.getAllFormValue(formId);
                //console.log(formData)
                let oid = formData.rows[0].values.pk_joblevelsys ? formData.rows[0].values.pk_joblevelsys.value : '';
                print(
                    'pdf',  //支持两类: 'html'为模板打印, 'pdf'为pdf打印
                    '/nccloud/hrjf/joblevel/printAction.do', //后台服务url
                    {
                        funcode: '60052030',      //小应用编码
                        nodekey: 'tbprint',     //模板节点标识
                        oids: [oid],    // 功能节点的数据主键   oids含有多个元素(['1001A41000000000A9LR','1001A410000000009JDD'])时为批量打印
                        appcode: this.config.appcode, // 必填 应用编码
                        //nodekey: '' // 模版标识
                    }
                );
                break;
            case 'output...':
                if (!sessionStorage.getItem('hyx-selectedTreeNode')) {
                    toast({color: "warning", content: this.state.json['jf6005-000316']});/* 国际化处理： 请先选择职级类别*/
                    return;
                }
                let formData1 = this.props.form.getAllFormValue(formId);
                let oid1 = formData1.rows[0].values.pk_joblevelsys ? formData1.rows[0].values.pk_joblevelsys.value : '';
                output({
                    url: '/nccloud/hrjf/joblevel/printAction.do', //后台服务url
                    data: {
                        funcode: '60052030',      //小应用编码
                        nodekey: 'tbprint',     //模板节点标识
                        oids: [oid1],    // 功能节点的数据主键   oids含有多个元素(['1001A41000000000A9LR','1001A410000000009JDD'])时为批量打印
                        outputType: 'output',
                        filename: this.config.nodeType === 'GLOBE_NODE' ? '职级类别-全局' : '职级类别-集团'
                    }
                });
                break;
            case 'saveadd':
                this.saveHYX('add');
                break;
            case 'refresh':
                this.updateButtonStatus('browse');
                this.fetchTreeData();
                sessionStorage.getItem('hyx-selectedTreeNode') !== null ? this.onSelectTreeAfter(sessionStorage.getItem('hyx-selectedTreeNode')) : '';
                break
        }
    }

    sureCancel() {
        this.update = false;
        this.setButtonDisable();
        //console.log(this.copyTableData)
        this.props.cardTable.setTableData('levelinfo', {rows: this.copyTableData});
        Object.keys(this.copyFormData).length !== 0 ? this.props.form.setAllFormValue({'baseinfo': this.copyFormData}) : '';
        ////console.log(this.copyname)
        Object.keys(this.copyname).length !== 0 ? this.setState({
            currentname: this.copyname
        }) : '';
        this.addFlag = false;
        this.browseRightTable();
        this.updateButtonStatus('browse');
        let c = sessionStorage.getItem('hyx-selectedTreeNode');
        if(c){
            this.fetchTableData(c)
        }
    }

    caseadd() {
        this.updateButtonStatus('edit');
        this.editRightTable();
        this.addFlag = true;
        // 缓存下数据
        this.copyTableData = JSON.parse(JSON.stringify(this.props.cardTable.getAllRows('levelinfo')));
        this.copyFormData = this.props.form.getAllFormValue(formId);
        this.copyname = this.state.currentname;
        this.props.cardTable.setTableData('levelinfo', {rows: []});
        this.props.form.EmptyAllFormValue('baseinfo');
        this.props.form.setAllFormValue({'baseinfo': this.originFormData});
        ////console.log(this.defaultEnable)
        this.setState({
            currentname: this.defaultEnable
        })
    }

    casedel() {
        if (!this.treeNode) {
            toast({color: "warning", content: this.state.json['jf6005-000152']});/* 国际化处理： 请选择要删除的内容!*/
            return false
        }
        promptBox({
            color: 'warning',               // 提示类别默认"success"， "success"/"info"/"warning"/"danger",非必输
            title: this.state.json['jf6005-000153'],                // 提示标题, 默认不同类别下分别为："已成功"/"帮助信息"/"请注意"/"出错啦",非必输/* 国际化处理： 确认删除*/
            content: this.state.json['jf6005-000154'],             // 提示内容,非必输/* 国际化处理： 您确定要删除么?*/
            noFooter: false,                // 是否显示底部按钮(确定、取消),默认显示(false),非必输
            noCancelBtn: false,             // 是否显示取消按钮,，默认显示(false),非必输
            beSureBtnName: this.state.json['jf6005-000036'],          // 确定按钮名称, 默认为"确定",非必输/* 国际化处理： 确定*/
            cancelBtnName: this.state.json['jf6005-000008'],         // 取消按钮名称, 默认为"取消",非必输/* 国际化处理： 取消*/
            hasCloseBtn: true,             //显示“X”按钮，默认不显示，不显示是false，显示是true
            beSureBtnClick: this.delHYX.bind(this),   // 确定按钮点击调用函数,非必输
            // cancelBtnClick: functionCancel,  // 取消按钮点击调用函数,非必输
            // closeBtnClick:functionClose, //关闭按钮点击调用函数，非必输
            closeByClickBackDrop: false,//点击遮罩关闭提示框，默认是true点击关闭，阻止关闭是false
        })
    }

    caseupdate() {
        this.copyTableData = JSON.parse(JSON.stringify(this.props.cardTable.getAllRows('levelinfo')));
        //console.log(this.copyTableData)
        this.copyFormData = this.props.form.getAllFormValue(formId);
        this.copyname = Object.assign({}, this.state.currentname);
        this.props.form.setFormStatus(formId, 'edit');
        this.updateButtonStatus('edit');
        this.addFlag = true;
        this.editRightTable()
    }

    // getPkorg () {
    //     if (this.config.nodeType === 'GROUP_NODE') {
    //         ajax ({
    //             url: '/nccloud/hrjf/joblevel/addAction.do',
    //             data: {
    //             },
    //             success: res => {
    //                 if (res.success && res.data.baseinfo) {
    //                     const pk_org = res.data.baseinfo.baseinfo.rows[0].values.pk_org
    //                     this.originFormData.rows[0].values.pk_org = pk_org
    //                     this.defaultEnable = {
    //                         value: this.state.json['jf6005-000146'], enableStatus: res.data.baseinfo.baseinfo.rows[0].values.enablestate.value === '2'/* 国际化处理： 启用状态*/
    //                     }
    //                 }
    //             }
    //         })
    //     }
    // }
    // 按钮是否显示，按钮是否可用
    updateButtonStatus(e) {
        this.props.button.setButtonsVisible({
            'table-add': e === 'edit',
            'table-insert': e === 'edit',
            'table-copy': e === 'edit',
            'table-delete': e === 'edit',
            'save': e === 'edit',
            'cancel': e === 'edit',
            'saveadd': e === 'edit',
            'add': e === 'browse',
            'edit': e === 'browse',
            'delete': e === 'browse',
            'file': e === 'browse',
            'print_group': e === 'browse',
            'refresh': e === 'browse'
        })
    }

    setButtonDisable(e) {
        this.props.button.setButtonDisabled({
            'edit': sessionStorage.getItem('hyx-selectedTreeNode') === null || e,
            'delete': sessionStorage.getItem('hyx-selectedTreeNode') === null || e,
            'file': sessionStorage.getItem('hyx-selectedTreeNode') === null,
            'print_group': sessionStorage.getItem('hyx-selectedTreeNode') === null,
            'print': sessionStorage.getItem('hyx-selectedTreeNode') === null,
            'output...': sessionStorage.getItem('hyx-selectedTreeNode') === null,
            'saveadd': this.update
        })
    }

    //显示停用
    onCheckShowDisable(val) {
        cacheTools.set('checkedVal', val);
        this.onInit();
    }

    //启用
    enableOrNot(e) {
        if (this.config.nodeType === 'GROUP_NODE') {
            const tar = this.props.form.getAllFormValue('baseinfo');
            if (tar.rows[0].values.pk_org.value === "GLOBLE00000000000000") {
                tar.rows[0].values.enablestate.value === '2' ? toast({
                    color: "warning",
                    content: this.state.json['jf6005-000155']
                }) : toast({color: "warning", content: this.state.json['jf6005-000156']});/* 国际化处理： 数据不在管控范围内，不能停用!,数据不在管控范围内，不能启用!*/
                return true
            }
        }
        //////console.log(e)
        if (!this.addFlag && (sessionStorage.getItem('hyx-selectedTreeNode') !== null)) {
            promptBox({
                color: 'warning',               // 提示类别默认"success"， "success"/"info"/"warning"/"danger",非必输
                title: `${this.state.json['jf6005-000007']}${e ? this.state.json['jf6005-000134'] : this.state.json['jf6005-000133']}`,                // 提示标题, 默认不同类别下分别为："已成功"/"帮助信息"/"请注意"/"出错啦",非必输/* 国际化处理： 确认,启用,停用*/
                content: `${this.state.json['jf6005-000167']}${e ? this.state.json['jf6005-000134'] : this.state.json['jf6005-000133']}?`,             // 提示内容,非必输/* 国际化处理： 是否确认要,启用,停用*/
                noFooter: false,                // 是否显示底部按钮(确定、取消),默认显示(false),非必输
                noCancelBtn: false,             // 是否显示取消按钮,，默认显示(false),非必输
                beSureBtnName: this.state.json['jf6005-000036'],          // 确定按钮名称, 默认为"确定",非必输/* 国际化处理： 确定*/
                cancelBtnName: this.state.json['jf6005-000008'],         // 取消按钮名称, 默认为"取消",非必输/* 国际化处理： 取消*/
                hasCloseBtn: true,             //显示“X”按钮，默认不显示，不显示是false，显示是true
                beSureBtnClick: this.ssswitch.bind(this, e),   // 确定按钮点击调用函数,非必输
                // cancelBtnClick: functionCancel,  // 取消按钮点击调用函数,非必输
                // closeBtnClick:functionClose, //关闭按钮点击调用函数，非必输
                closeByClickBackDrop: false,//点击遮罩关闭提示框，默认是true点击关闭，阻止关闭是false
            })
        }
    }

    ssswitch(e) {
        if (!this.addFlag && (sessionStorage.getItem('hyx-selectedTreeNode') !== null)) {
            const g = this.props.form.getAllFormValue(formId);
            const temp = JSON.parse(JSON.stringify(this.state.currentname));
            temp.enableStatus = !temp.enableStatus;
            // this.setState({
            //     currentname: temp
            // })
            const url = (e ? '/nccloud/hrjf/joblevel/enableAction.do' : '/nccloud/hrjf/joblevel/disableAction.do');
            // ////console.log(this.formatDateTime(date1.getTime()))
            ajax({
                url,
                'type': 'post',
                data: {
                    model: (g)
                },
                success: res => {
                    //////console.log('success')
                    //////console.log(res)
                    toast({color: "success"});
                    this.fetchTreeData();
                    this.onSelectTreeAfter(sessionStorage.getItem('hyx-selectedTreeNode'))
                }
            })
        }
    }

    formatDateTime(inputTime) {
        var date = new Date(inputTime);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
    }

    componentDidMount() {
        // 恢复初始状态,并重新请求数据
        this.updateButtonStatus('browse');
        this.setButtonDisable();
        this.fetchTreeData();
        sessionStorage.getItem('hyx-selectedTreeNode') !== null ? this.onSelectTreeAfter(sessionStorage.getItem('hyx-selectedTreeNode')) : '';
        this.businessInfo = getBusinessInfo()


    }

    // 获取左树的数据
    fetchTreeData(e, f) {
        let tempPromise = new Promise(resolve => {
            ajax({
                url: '/nccloud/hrjf/joblevel/treeQueryAction.do',
                data: {
                    'showDisable': sessionStorage.getItem('showDisabledFlag') === 'true',
                    'pk_org': this.config.nodeType === 'GLOBE_NODE' ? 'GLOBLE00000000000000' : this.businessInfo.groupId,
                },
                success: res => {
                    res.data && res.data.forEach(v => {
                        v = Object.assign(v, {
                            value: {
                                editIcon: false, addIcon: false,
                                delIcon: false
                            }
                        })
                    });
                    //console.log('originTree')
                    //console.log(res.data)
                    const rootNode = [{
                        "key": "no",
                        "title": this.state.json['jf6005-000148'],/* 国际化处理： 职级类别*/
                        "refname": this.state.json['jf6005-000148'],/* 国际化处理： 职级类别*/
                        "refpk": "no",
                        "id": "no",
                        "name": this.state.json['jf6005-000148'],/* 国际化处理： 职级类别*/
                        "pid": null,
                        "innercode": null,
                        "code": "12",
                        "children": res.data
                    }];
                    this.props.syncTree.setSyncTreeData(treeId, rootNode);
                    this.addClassForDisAction(res.data);
                    if (f) {
                        res.data && res.data.forEach((v, index) => {
                            try {
                                if (this.treeData && this.treeData.find(c => c.title === v.title) === undefined) {
                                    //console.log(v)
                                    this.onSelectTreeAfter(v.refpk);
                                    this.props.syncTree.setNodeSelected(treeId, v.refpk)
                                } else if (!this.treeData) {
                                    this.onSelectTreeAfter(v.refpk);
                                    this.props.syncTree.setNodeSelected(treeId, v.refpk)
                                }
                            } catch (e) {

                            }
                        })
                    }
                    this.treeData = res.data && JSON.parse(JSON.stringify(res.data));
                    if (e) {
                        this.props.syncTree.setNodeSelected(treeId, e)
                    } else if (e !== 'no') {
                        sessionStorage.getItem('hyx-selectedTreeNode') !== null ? this.props.syncTree.setNodeSelected(treeId, sessionStorage.getItem('hyx-selectedTreeNode')) : ''
                    }
                    resolve()
                }
            })
        });
        return tempPromise

    }

    // 鼠标滑过节点事件
    onMouseEnterEve(key) {
        if (key) {
            let obj = {
                delIcon: false, //false:隐藏； true:显示; 默认都为true显示
                editIcon: false,
                addIcon: true
            };
            this.props.syncTree.hideIcon(treeId, key, obj)
        }
    }

    //让某个节点置灰
    letItGrey(index) {
        document.getElementsByClassName('u-tree-searchable-filter')[index].parentNode.classList.add("list-grey");
    }

    // 给停用的树节点置灰
    addClassForDisAction(tar) {
        tar && tar.length && tar.forEach(v => {
            if (v.nodeData.nodeValue.enablestate === '3') v.titleStyle = {color: 'lightgrey'};
            v.children && this.addClassForDisAction(v.children);
        })
    }

    // 根据选中的左树获取详细信息
    fetchTableData(c) {
        this.browseRightTable();
        this.updateButtonStatus('browse');
        ajax({
            url: '/nccloud/hrjf/joblevel/detailQueryAction.do',
            data: {
                'pk_joblevelsys': c,
                'pk_org': this.config.nodeType === 'GLOBE_NODE' ? 'GLOBLE00000000000000' : this.businessInfo.groupId,
            },
            success: res => {
                if (res.success && res.data && res.data.baseinfo) {
                    this.ajaxData = res.data;
                    // res.data.levelinfo.levelinfo.rows
                    if (res.data.levelinfo) {
                        this.props.cardTable.setTableData('levelinfo', {rows: res.data.levelinfo.levelinfo.rows})
                    } else {
                        this.props.cardTable.setTableData('levelinfo', {rows: []})
                    }
                    const temp = res.data.baseinfo.baseinfo.rows[0].values.name;
                    temp.enableStatus = res.data.baseinfo.baseinfo.rows[0].values.enablestate.value === '2' ? true : false;
                    this.setState({
                        currentname: temp
                    });
                    this.props.form.setAllFormValue({'baseinfo': res.data.baseinfo.baseinfo});
                    //如果选中的是全局数据,则禁用
                    //console.log(this.state.json['jf6005-000157'])/* 国际化处理： 开始全局数据禁用按钮*/
                    //console.log(res.data.baseinfo.baseinfo)
                    let tar = res.data.baseinfo.baseinfo;
                    if (this.config.nodeType === 'GROUP_NODE') {
                        if (tar.rows[0].values.pk_org.value === "GLOBLE00000000000000") {
                            this.setButtonDisable(true)
                        } else {
                            this.setButtonDisable(false)
                        }
                    }
                }
            }
        })
    }

    // 选中左边的树
    onSelectTree(c, d, e) {

        if (c === 'no') {
            return false
        }
        if (this.props.cardTable.getStatus('levelinfo') === 'edit') {
            promptBox({
                color: 'warning',               // 提示类别默认"success"， "success"/"info"/"warning"/"danger",非必输
                title: this.state.json['jf6005-000158'],                // 提示标题, 默认不同类别下分别为："已成功"/"帮助信息"/"请注意"/"出错啦",非必输/* 国际化处理： 确认切换*/
                content: this.state.json['jf6005-000159'],             // 提示内容,非必输/* 国际化处理： 未保存直接切换将丢失数据?*/
                noFooter: false,                // 是否显示底部按钮(确定、取消),默认显示(false),非必输
                noCancelBtn: false,             // 是否显示取消按钮,，默认显示(false),非必输
                beSureBtnName: this.state.json['jf6005-000036'],          // 确定按钮名称, 默认为"确定",非必输/* 国际化处理： 确定*/
                cancelBtnName: this.state.json['jf6005-000008'],         // 取消按钮名称, 默认为"取消",非必输/* 国际化处理： 取消*/
                hasCloseBtn: true,             //显示“X”按钮，默认不显示，不显示是false，显示是true
                beSureBtnClick: this.onSelectTreeAfter.bind(this, c),   // 确定按钮点击调用函数,非必输
                // cancelBtnClick: functionCancel,  // 取消按钮点击调用函数,非必输
                // closeBtnClick:functionClose, //关闭按钮点击调用函数，非必输
                closeByClickBackDrop: false,//点击遮罩关闭提示框，默认是true点击关闭，阻止关闭是false
            })
        } else {
            this.onSelectTreeAfter(c)
        }
    }

    onSelectTreeAfter(c) {
        sessionStorage.setItem('hyx-selectedTreeNode', c);
        this.addFlag = false;
        this.browseRightTable();
        this.treeNode = c;
        this.fetchTableData(c);
        this.setButtonDisable()
    }

    onAfterFormEvent(props, moduleI, key, value) {

    }

    // 修改左树名字
    onChange = (e) => {
        this.setState({value: e});
    };

    // click编辑左树
    onEditTreeClick(item) {
        //////console.log('edit')
        //////console.log(item)
        this.setState({item, value: item.name});
        this.props.modal.show('addNode');
    }

    // 确认编辑
    editForSure() {
        let newItem = Object.assign({}, this.state.item);
        newItem.name = this.state.value;
        newItem.refname = this.state.value;
        newItem.titlename = this.state.value;
        newItem.code = this.state.value;
        this.props.syncTree.editNodeSuccess(treeId, newItem);
        this.closeModal()
    }

    // 点击新增
    onAddTreeClick() {
        //////console.log('add')
    }

    // 确定删除
    functionSureDelete = item => {
        //////console.log(item)
        // delNodeSuceess(id, pk)
        this.props.syncTree.delNodeSuceess(treeId, item.refpk)
    };

    // 删除树的节点
    onDelTreeClick(arg) {
        //////console.log('del')
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
        //////console.log(this)
        this.props.modal.close('addNode')
    }

    //让右边的表格可编辑
    editRightTable() {
        this.props.form.setFormStatus(formId, 'edit');
        this.props.cardTable.setStatus('levelinfo', 'edit')
    }

    browseRightTable() {
        this.props.form.setFormStatus(formId, 'browse');
        this.props.cardTable.setStatus('levelinfo', 'browse')
    }

    tableOpt(props, id) {
        //////console.log(props)
        //////console.log(id)
        switch (id) {
            case 'table-add':
                //console.log(this.props.cardTable.getAllData('levelinfo').rows)
                let data = this.props.cardTable.getAllData('levelinfo').rows;
                data && data.forEach((v, index) => {
                    if (v.status === '3') data.splice(index, 1);
                });
                let index = data.length;
                this.props.cardTable.addRow('levelinfo', index, {
                    'code': {
                        display: this.state.json['jf6005-000161'],
                        value: ''
                    }
                }, true);/* 国际化处理： 组织名称*/
                this.editRightTable();
                this.tableSelected();
                break;
            case 'table-insert':
                if (this.tempSelectedData.length === 0) {
                    toast({color: "warning", content: this.state.json['jf6005-000162']});/* 国际化处理： 请选择要复制或插入的行!*/
                    return
                }
                let _index = this.tempSelectedData[this.tempSelectedData.length - 1].index;
                this.props.cardTable.addRow('levelinfo', _index, {
                    'code': {
                        display: this.state.json['jf6005-000161'],
                        value: ''
                    }
                }, true);/* 国际化处理： 组织名称*/
                this.tableSelected();
                break;
            case 'table-copy':
                if (this.tempSelectedData.length === 0) {
                    toast({color: "warning", content: this.state.json['jf6005-000162']});/* 国际化处理： 请选择要复制或插入的行!*/
                    return
                }
                //console.log(this.tempSelectedData)
                const arr = JSON.parse(JSON.stringify(this.tempSelectedData)).map(item => {
                    item.data.rowid = "";
                    item.data.values.pk_jobrank = null;
                    item.data.values.pk_joblevel = {};
                    item.data.values.pk_joblevelsys = {};
                    item.data.status = 1;
                    item.data.selected = false;
                    return item.data
                });
                arr && arr.forEach(item => {
                    let index_ = this.props.cardTable.getAllData('levelinfo').rows.length;
                    //////console.log('-----')
                    //////console.log(item)
                    this.props.cardTable.addRow('levelinfo', index_, item.values, false)
                });
                this.tableSelected();
                break;
            case 'table-delete':
                if (this.tempSelectedData.length === 0) {
                    toast({color: "warning", content: this.state.json['jf6005-000163']});/* 国际化处理： 请选择要删除的行!*/
                    return
                }
                //////console.log(this.tempSelectedData)
                this.props.cardTable.delRowsByIndex('levelinfo', this.tempSelectedData.map(v => v.index));
                this.tableSelected()
        }
    }

    saveHYX(saveArg) {
        let tableData = this.props.cardTable.getAllRows('levelinfo');
        let formData = this.props.form.getAllFormValue(formId);
        formData.rows[0].values.pk_group = formData.rows[0].values.pk_org;
        // 加入飞空字段校验
        if (!this.props.form.isCheckNow(formId)) {
            return false
        }
        if (!this.props.cardTable.checkTableRequired('levelinfo')) {
            return false
        }
        // formData.rows[0].values.pk_org.value = 'GLOBLE00000000000000'
        formData.rows[0].values.enablestate = this.state.currentname.enableStatus ? {
            "display": this.state.json['jf6005-000110'],/* 国际化处理： 已启用*/
            "scale": "-1",
            "value": "2"
        } : {
            "display": null,
            "scale": "-1",
            "value": "3"
        };
        //////console.log(formData)
        let modelInfo = {
            baseinfo: ({
                rows: formData.rows
            }),
            levelinfo: ({
                rows: tableData
            }),
            'showDisable': sessionStorage.getItem('showDisabledFlag') === 'true'
        };
        let tempdata = {
            "pageid": "60052030p",
            "head": {
                'baseinfo': {
                    "areacode": "baseinfo",
                    "rows": formData.rows
                }
            },
            "bodys": {
                "levelinfo": {
                    "areacode": "levelinfo",
                    "rows": tableData
                }
            }
        };
        ajax({
            url: '/nccloud/hrjf/joblevel/saveAction.do',
            type: 'post',
            data: tempdata,
            success: res => {
                //console.log(res)
                toast({color: "success"});
                if (saveArg === 'add') {
                    this.fetchTreeData('no', false).then(() => {
                        sessionStorage.getItem('hyx-selectedTreeNode') !== null ? this.props.syncTree.setNodeSelected(treeId, sessionStorage.getItem('hyx-selectedTreeNode')) : ''
                    });
                    // this.props.form.setFormStatus(formId,'browse')
                    // this.updateButtonStatus('browse')
                    // this.updateButtonStatus('edit')
                    // this.editRightTable()
                    // this.addFlag = true
                    // this.props.cardTable.setTableData('levelinfo', {rows: []})
                    // this.props.form.setAllFormValue({'baseinfo': this.originFormData})

                    // this.caseadd()
                    this.updateButtonStatus('edit');
                    this.editRightTable();
                    this.addFlag = true;
                    // 缓存下数据
                    this.props.cardTable.setTableData('levelinfo', {rows: []});
                    this.props.form.setAllFormValue({'baseinfo': this.originFormData});
                    ////console.log(this.defaultEnable)
                    this.setState({
                        currentname: this.defaultEnable
                    });
                    this.props.form.setFormItemsValue(formId, {"memo": {"display": '', "value": ''}});
                    this.setState({
                        currentname: {
                            value: this.state.json['jf6005-000146'], enableStatus: true/* 国际化处理： 启用状态*/
                        }
                    });
                    this.props.form.setAllFormValue({'baseinfo': this.originFormData})
                } else {
                    this.fetchTreeData(false, true);
                    // this.props.cardTable.setTableData('levelinfo', {rows: []})
                    this.props.form.setAllFormValue({'baseinfo': this.originFormData});
                    this.props.form.setFormStatus(formId, 'browse');
                    this.updateButtonStatus('browse');
                    sessionStorage.getItem('hyx-selectedTreeNode') !== null ? this.onSelectTreeAfter(sessionStorage.getItem('hyx-selectedTreeNode')) : ''
                }
            }
        })
    }

    delHYX() {
        let temp = this.ajaxData.baseinfo.baseinfo.rows;
        let modelInfo = {
            model: ({rows: temp})
        };
        ajax({
            url: '/nccloud/hrjf/joblevel/delAction.do',
            type: 'post',
            data: modelInfo,
            success: res => {
                if (res.success === true) toast({color: "success", content: this.state.json['jf6005-000164']});/* 国际化处理： 删除成功!*/
                let temp = sessionStorage.getItem('hyx-selectedTreeNode');
                sessionStorage.removeItem('hyx-selectedTreeNode');
                let tar = false;
                try {
                    this.treeData && this.treeData.forEach((v, index) => {
                        if (v.refpk === temp) {
                            if (index === this.treeData.length - 1) {
                                this.onSelectTreeAfter(this.treeData[index - 1].refpk);
                                tar = this.treeData[index - 1].refpk
                                // this.props.syncTree.setNodeSelected(treeId,item.refpk)
                            } else {
                                this.onSelectTreeAfter(this.treeData[index + 1].refpk);
                                tar = this.treeData[index + 1].refpk
                                //this.props.syncTree.setNodeSelected(treeId,item.refpk)
                            }
                        }
                    })
                } catch (e) {

                }

                this.setButtonDisable();
                // 恢复初始状态,并重新请求数据
                this.updateButtonStatus('browse');
                try {
                    this.fetchTreeData(tar);
                    this.props.cardTable.setTableData('levelinfo', {rows: []});
                    this.props.form.setAllFormValue({'baseinfo': this.originFormData})
                } catch (e) {

                }

                // 蜀道难!
                this.setState({
                    currentname: {
                        value: this.state.json['jf6005-000146'], enableStatus: false/* 国际化处理： 启用状态*/
                    }
                })
            }
        })
    }

    tableSelected() {
        let arr = Object.assign([], this.props.cardTable.getCheckedRows('levelinfo'));
        arr && arr.forEach((v, index) => {
            if (v.data.status === '3') arr.splice(index, 1);
        });
        this.tempSelectedData = arr
        //console.log(arr)
    }

    onCheckBoxChange(e) {
        //////console.log('thiss checkbox')
        sessionStorage.setItem('showDisabledFlag', e);
        this.fetchTreeData();
        this.setState({})
    }

    getTableHead = () => {
        let {button} = this.props;
        let {createButtonApp} = button;
        let buttons = this.props.button.getButtons();
        // let status = this.props.getUrlParam("status");
        return (
            <div className="shoulder-definition-area">
                <div className="definition-icons">
                    {createButtonApp({
                        area: 'table-list',//按钮注册中的按钮区域
                        buttonLimit: 10,
                        onButtonClick: (props, id) => {
                            this.tableOpt(props, id);
                        }
                    })}
                </div>
            </div>
        )
    };

    //上传控件
    //this.state.json['jf6005-000168']/* 国际化处理： 附件的关闭点击*/
    onHideUploader = () => {
        this.setState({
            showUploader: false,
            groupLists: []
        })
    };

    //获取当前附件列表
    getGroupList = (list) => {
        //要在state里面顶一个变量，用来存储列表数组
        this.setState({
            groupLists: list
        })
    };

    beforeUpload(billId, fullPath, file, fileList) {
        // 参数：单据id，当前选中分组path、当前上传文件对象，当前文件列表
        // ////console.log(billId, fullPath, file, fileList);
        //
        // const isJPG = file.type === 'image/jpeg';
        // if (!isJPG) {
        //     alert('只支持jpg格式图片')
        // }
        // const isLt2M = file.size / 1024 / 1024 < 2;
        // if (!isLt2M) {
        //     alert('上传大小小于2M')
        // }
        // return isJPG && isLt2M;
        // 备注： return false 不执行上传  return true 执行上传
    }


    render() {
        let {button, search, DragWidthCom, modal, table, form, cardTable, editTable, cardPagination, syncTree} = this.props;
        const {createSyncTree} = syncTree;
        const {createForm} = form;//创建表单，需要引入这个
        const {createCardPagination} = cardPagination;
        let {createModal} = modal;  //模态框
        let {createButtonApp} = button;
        let {NCCreateSearch} = search;
        let {createSimpleTable} = table;
        let {createCardTable} = cardTable;
        let {createEditTable} = editTable;
        const {Refer, ApproveProcess, NCUploader, ApproveDetail} = high;
        let {showUploader, target} = this.state;
        let that = this;
        return (
            <div className="jobgrade-base">
                {/* 头部 header*/}
                <div className="header">
                    {createModal('modal', {noFooter: false})}
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
                            area: 'list',
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
                                    needEdit: false, //不启用编辑
                                    showLine: false, //显示连线
                                    needSearch: true, //是否需要搜索框
                                    onSelectEve: this.onSelectTree.bind(this),//选择
                                    // onMouseEnterEve:this.onMouseEnterEve.bind(this),
                                    clickEditIconEve: this.caseupdate.bind(this), //编辑点击 回调
                                    onMouseEnterEve: this.onMouseEnterEve.bind(this), //鼠标移过事件
                                    clickAddIconEve: this.caseadd.bind(this), //新增点击 回调
                                    clickDelIconEve: this.casedel.bind(this), // 删除点击 回调
                                    showModal: false,
                                    defaultExpandAll: true,

                                })}
                            </div>}
                        // 右卡片区域
                        rightDom={
                            <div className="card-area">
                                <div className={`enable-class ${THEME.fontc}`}>
                                    <span>
                                        {this.state.currentname.value}
                                    </span>
                                    <NCSwitch
                                        checked={this.state.currentname.enableStatus}
                                        onChange={(e) => {
                                            this.enableOrNot(e)
                                        }}
                                        // disabled={this.state.stopDis}
                                    />
                                </div>
                                <div className="nc-bill-form-area">
                                    {createForm(formId, {
                                        onAfterEvent: this.onAfterFormEvent.bind(this)
                                    })
                                    }
                                </div>
                                <div className="nc-bill-table-area">
                                    {createCardTable('levelinfo', {
                                        tableHead: this.getTableHead,
                                        //tableHead:initTableButton,
                                        //onAfterEvent: this.onAfterFormEvent.bind(this),
                                        //onBeforeEvent: this.onAfterFormEvent.bind(this),
                                        // modelSave:this.modelSave.bind(this),
                                        onSelected: this.tableSelected.bind(this),
                                        onSelectedAll: this.tableSelected.bind(this),
                                        showIndex: true,
                                        showCheck: true,
                                        hideAdd: false,
                                        hideModelSave: false
                                    })}
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
                            onChange={this.onChange}
                            size="sm"
                        />
                    </div>, //弹框内容，可以是字符串或dom
                    beSureBtnClick: this.editForSure.bind(this), //点击确定按钮事件
                    cancelBtnClick: this.closeModal.bind(this), //取消按钮事件回调
                    closeModalEve: this.closeModal.bind(this), //关闭按钮事件回调
                    userControl: true,  // 点 确定/取消 按钮后，是否自动关闭弹框.true:手动关。false:自动关,默认false
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

                {showUploader && <NCUploader
                    disableDownload={true}
                    billId={this.state.billId}
                    billNo={this.state.billNo}
                    target={target}
                    // customize = {uploadTrpe:'0'}
                    placement={'bottom'}
                    getGroupList={this.getGroupList}
                    onHide={this.onHideUploader} // 关闭功能
                    beforeUpload={this.beforeUpload}/>
                }
            </div>


        )
    }
}

export default JobGrade;
