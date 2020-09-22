
import {
    output,
    print
} from 'nc-lightapp-front';
import { getAppPageConfig } from 'src/hrpub/common/utils/utils';
import Common from 'src/hrpub/common/actions';
export default class Main extends Common {
    constructor(comp) {
        super();
        this.comp = comp;
    }

    didAllInstance = () => {
        this.setButtonHandleMap();
    }

    // 设置按钮事件map
    setButtonHandleMap = () => {
        const { action } = this.comp;

        this.buttonHandleMap = {
            'browse_status': {
                'save': this.saveAddPage,
                'cancel': this.cancelFormEdit,
                'edit': this.toAddPageEditStatus,
                'commit': this.submitFromCard,
                'recover': this.callbackFromCard,
                'del': this.deleteBill,
                'copy': action.rowAct.copyOnes,
                'print': this.printIt,
                'out': this.output,
                'cardrpt': this.jointSearch,
                'add': action.formAct.toAddPage,
                'refresh': this.refresh,
                'attachment': this.file
            }
        };
    }
    refresh = (selectedRows) => {
        const { action } = this.comp;
        action.formAct.toBrowsePage(selectedRows[0])
    }
    // 从卡片页面提交
    submitFromCard = async (selectedRows) => {
        const { action } = this.comp;

        await action.rowAct.submitOnes(selectedRows[0]);

        action.formAct.toBrowsePage(selectedRows[0]);
    }

    // 从卡片页面收回
    callbackFromCard = async (selectedRows) => {
        const { action } = this.comp;

        await action.rowAct.callbackOnes(selectedRows[0]);
        action.formAct.toBrowsePage(selectedRows[0]);
    }

    // 删除一个申请单据
    deleteBill = (selectedRows) => {
        this.comp.action.rowAct.deleteRows(selectedRows[0])
    }

    // 新增页面头部按钮点击处理
    addHeaderClick = (btnCode) => {
        const { props } = this.comp;
        const { form } = props;
        return (props, bCode) => {

            let selectedRows = [{
                ...form.getAllFormValue('card').rows[0]
            }];
            let handle = this.buttonHandleMap[btnCode];

            if (typeof handle === 'function') {
                handle(selectedRows);
            }
            else {
                typeof handle[bCode] === 'function' && handle[bCode](selectedRows);
            }
        }
    }

    // 从浏览态变成编辑态
    toAddPageEditStatus = (selectedRows) => {
        this.comp.action.formAct.toEditPage(selectedRows[0]);
    }

    // 新增页面保存
    saveAddPage = () => {
        const { props, action } = this.comp;
        const { dispatch, form, emp } = props;
        // model.rows[0].values.pk_psndoc = 'pk_psnjob.pk_psndoc.name' 
        if (form.isCheckNow('card')) {
            let postData = {
                formData: form.getAllFormValue('card'),
                // pk_org: emp.orgValue.refpk
            };

            dispatch({
                type: 'emp/addPageSave',
                payload: {
                    postData: postData
                }
            })
                .then(async (res) => {
                    if (res.success) {
                        this.toast({
                            color: 'success',
                            content: emp.language['ga6013-000011'] // 保存成功
                        });
                        await this.pubSub.publish('getMainTableData');
                        action.formAct.toBrowsePage(res.data.formData.card.rows[0]);
                    }
                });
        }
    }

    file = (selectedRows) => {
        const { action } = this.comp;
        action.btnAct.fileManager(selectedRows[0])
    }

    // 返回按钮返回主页面表格
    goToBackMainPage = () => {
        const { props } = this.comp;
        const { dispatch, button, emp } = props;

        this.update({
            page: 'main'
        });

        button.setButtonVisible(emp.visible_main);
        this.pubSub.publish('getMainTableData');
    }

    // 表单编辑前
    formBeforeEdit = async (platFormProps, formId, key, value, data) => {
        const { props } = this.comp;
        const { emp, dispatch, form, meta } = props;
        if ('lic_no' === key || 'pk_psnjob' === key) {
            let formData = form.getAllFormValue('card');
            try {
                let res = await dispatch({
                    type: 'emp/formEditBefore',
                    payload: {
                        postData: {
                            key: key,
                            formData: formData,
                        }
                    }
                });
                let template = meta.getMeta();

                if (res.data && res.data.refParam) {
                    if (res.data) {
                        template['psninfo'].items.map((items) => {
                            if ('lic_no' === key) {
                                if (items.attrcode === key) {
                                    Object.assign(items.queryCondition, {
                                        "GridRefActionExt": "nccloud.web.hrzz.licensebor.sqlbuilder.licnoRefSqlBuilder"
                                    }, res.data.refParam);
                                }
                            }
                            else if ('pk_psnjob' === key) {
                                if (items.attrcode === key) {
                                    Object.assign(items.queryCondition, {
                                        // "pk_org": emp.orgValue.refpk,
                                        "GridRefActionExt": "nccloud.web.hr.ref.ga.LicensePsnRefSqlBuilder"
                                    }, res.data.refParam);
                                }
                            }

                        });
                    }
                }
                meta.setMeta(template);
            }
            catch (e) {
                return false
            }
        }
        return true;
    }

    // 表单编辑后
    formAfterEdit = async (platFormProps, formId, key, value, preVal) => {
        const { props } = this.comp;
        const { emp, dispatch, form, meta } = props;
        let formData = form.getAllFormValue('card');
        if ('lic_no' === key || 'pk_psnjob' === key) {
            let postData = {
                key: key,
                formData: formData,
            };


            let res = await dispatch({
                type: 'emp/formEditAfter',
                payload: {
                    postData: postData
                }
            });
            if (res.data && res.data.formData) {
                form.setAllFormValue({ card: res.data.formData.head.card });
            }
        }
    }

    // 取消编辑
    cancelFormEdit = () => {
        const { props, action } = this.comp;
        const { emp, dispatch, form, meta, button } = props;

        this.promptBox({
            color: 'info',
            title: emp.language['ga6013-000012'], // '确认取消',
            content: emp.language['ga6013-000013'], // '是否确认取消
            beSureBtnClick: () => {
                let formValue = form.getAllFormValue('card');
                // let pk_licbor = formValue.rows[0].values['pk_licbor'].value;
                if (emp.page === 'add') {
                    this.cancelPost(formValue);
                } else {
                    this.showHistoryData(); // 否则进入浏览态
                    action.formAct.toBrowsePage(formValue.rows[0]);
                }
            }
        });
    }

    // 根据存储的数据展示编辑前
    showHistoryData = () => {
        const { props } = this.comp;
        const { emp, dispatch, form } = props;

        if (emp.addPageHistoryData) {  // 保存的页面信息
            form.setAllFormValue({
                card: emp.addPageHistoryData
            });
            this.update({
                addPageHistoryData: null
            });
        }
    }

    // 新增取消需要请求一个接口
    cancelPost = async (formValue) => {
        const { props, action } = this.comp;
        const { emp, dispatch, form } = props;

        let postData = {
            // billid: formValue.rows[0].values.pk_licbor.value
            formData: formValue
        };

        let res = await dispatch({
            type: 'emp/cancelAdd',
            payload: {
                postData: postData
            }
        });
        if (res.success) {
            this.goToBackMainPage();
        }
    }

    // 打印
    printIt = () => {
        const { props } = this.comp;
        const {
            emp
        } = props;
        let formValue = this.comp.props.form.getAllFormValue('card');
        print('pdf', '/nccloud/hrzz/licensebor/LicborapplyPrintAction.do', {
            appcode: getAppPageConfig().appcode, // 
            nodekey: getAppPageConfig().appcode,
            filename: emp.language['ga6013-000001'],
            oids: [formValue.rows[0].values['pk_licbor'].value]
        });
    }

    // 输出
    output = () => {
        const { props } = this.comp;
        const {
            emp
        } = props;
        let formValue = this.comp.props.form.getAllFormValue('card');
        output({
            url: '/nccloud/hrzz/licensebor/LicborapplyPrintAction.do',
            data: {
                appcode: getAppPageConfig().appcode,
                nodekey: getAppPageConfig().appcode,
                oids: [formValue.rows[0].values['pk_licbor'].value],
                outputType: 'output',
                filename: emp.language['ga6013-000001']
            },
            callback: () => {
            }
        });
    }

    // 联查人员卡片
    jointSearch = async () => {
        const { props, action } = this.comp;
        const { emp, dispatch, form, meta, button } = props;

        let formData = form.getAllFormValue('card');
        let formValues = formData.rows[0].values;
        let postData = {
            allPsnPk: formValues['pk_psndoc'].value,
            pk_org: formValues['pk_org'].value,
            selRow: 0
        };

        try {
            let res = await dispatch({
                type: 'emp/jointPsnCard',
                payload: {
                    postData: postData
                }
            });

            if (res.success) {
                location.port ? window.open("uclient://start/http://" + location.hostname + ":" + location.port + res.data) : window.open("uclient://start/http://" + location.hostname + res.data)
            }
        }
        catch (e) {

        }
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