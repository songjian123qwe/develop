/**
 * 保存
 */
import {
    toast,
    cardCache
} from 'nc-lightapp-front';
// 缓存数据配置
const {getDefData} = cardCache;
import ajaxHRDeptSaveAction from '../request-functions/getHRDeptSaveAction.js';
import HRDeptAddAction from "./HRDeptAddAction";

/**
 *
 * @param formId
 * @param gridrelationTable [{code:'tableId1'},{code:'tableId2'}]
 * @param ui_state  1:新增；   2：修改
 * @param addFlag  true:保存新增；   false：保存
 * @constructor
 */
export default function HRDeptSaveAction(formId, gridrelationTable, ui_state, addFlag = false) {

    let formdataValue = this.props.form.getAllFormValue(formId);
    let approvedept = formdataValue.rows[0].values.approvedept.value;
    let approvenum = formdataValue.rows[0].values.approvenum.value;

    //表单数据
    let displayorderVal = formdataValue.rows[0].values.displayorder.value;
    if (!displayorderVal || displayorderVal === '') {
        // 显示顺序默认值为 999999
        formdataValue.rows[0].values.displayorder.value = '999999';
    }

    let pageid = "0001Z70PAGEN60051030";
    let templetid = this.state.templatePageId;

    let postData = {
        "bodys": {},
        "head": {
            "hrdept": formdataValue
        },
        approvenum,
        approvedept,
        pageid,
        templetid,
        ui_state
    };
    gridrelationTable.forEach(item => {
        let tableId = item.code;
        let tableData = this.props.cardTable.getAllData(tableId);
        if (tableData) {
            tableData.areacode = tableId;
            postData.bodys[tableId] = tableData;
        }
    })
    return ajaxHRDeptSaveAction(postData)
        .then((res) => {
            if (!res.success) {
                return
            }
            // 返回浏览态
            this.baseBrowseState();
            // 如果是新增 左树添加新增的分支
            if (this.state.newAddPageFlag && res.data && res.data.head && res.data.head.hrdept) {

                let datas = {
                    "key": "",
                    "title": "",
                    "refname": "",
                    "refpk": "",
                    "id": "",
                    "name": "",
                    "pid": "",
                    "innercode": "",
                    "code": "",
                    "nodeData": {
                        "nodeValue": {}
                    },
                };
                let tempData = res.data.head.hrdept.rows[0].values;
                for (let key in tempData) {
                    datas.nodeData.nodeValue[key] = tempData[key].value;
                    if (key === "name") {
                        datas.title = tempData[key].value;
                        datas.refname = tempData[key].value;
                        datas.name = tempData[key].value;
                    }
                    if (key === "code") {
                        datas.code = tempData[key].value;
                    }
                    if (key === "pk_dept") {
                        datas.key = tempData[key].value;
                        datas.id = tempData[key].value;
                        datas.refpk = tempData[key].value;
                    }

                }
                this.allRefPk.push(datas.refpk);
                let leftTreeData = getDefData('hrdept', 'hrjf.hrdept.leftTree');
                datas.pid = tempData.pk_fatherorg.value || leftTreeData[0].refpk;
                this.props.syncTree.addNodeSuccess('leftTree', datas);
                if (!addFlag) {
                    // 如果非保存新增 则定位到新增的支树上
                    this.pk_dept = tempData.hasOwnProperty('pk_dept') ? tempData.pk_dept.value : null;
                    this.pk_org = tempData.hasOwnProperty('pk_org') ? tempData.pk_org.value : null;
                    setTimeout(() => {
                        this.props.syncTree.setNodeSelected('leftTree', datas.refpk);
                    }, 10);
                } else {
                    this.props.syncTree.setNodeDisable('leftTree', true);
                }
            }

            // 如果是新增保存  则请求新增服务
            if (addFlag) {
                HRDeptAddAction.call(this, this.pk_dept, this.pk_org, formId);
                return
            }

            //  非保存新增时，设置右表数据
            if (!res.data) return;
            //清空表单
            this.emptyRightData();
            //表单数据
            let headData = res.data.head[formId].rows[0].values;

            //    是否撤销
            let hrcanceled = headData.pk_dept.value;
            // 设置按钮状态
            this.setBtnDisSta({
                stop: !hrcanceled,              //撤销
                uncancel: !!hrcanceled,          //取消撤销
            });
            if (!this.state.newAddPageFlag) {
                // 是否有修改名称 决定是否修改左树名称
                let chooseNode = this.props.syncTree.getSelectNode('leftTree');
                chooseNode.refname = headData.name.value;
                this.props.syncTree.editNodeSuccess('leftTree', chooseNode);
            }

            if (headData.hasOwnProperty('displayorder')) {
                let displayorderValue = headData.displayorder.value;
                // 如果displayorderValue 是999999 则不显示
                res.data.head[formId].rows[0].values.displayorder.value = (displayorderValue === '999999' ? '' : displayorderValue);
            }
            // 设置billNo  附件用
            if (headData.hasOwnProperty('code')) {
                this.billNo = headData.code.value
            }
            //设置表单为所选树节点数据
            let formData = {};
            formData[formId] = res.data.head[formId];
            this.props.form.setAllFormValue(formData);
            //设置表单项enablestate可用
            this.props.form.setFormItemsDisabled(formId, {enablestate: false});
            this.props.button.setButtonDisabled({Print: false, Output: false});
            // 新增时 显示批准文号批准单位  非新增时不显示
            this.props.form.setFormItemsVisible(formId, {approvenum: false});
            this.props.form.setFormItemsVisible(formId, {approvedept: false});

            let bodys = res.data.bodys;
            gridrelationTable.forEach(item => {
                let tableId = item.code;
                let tableData = {rows: []};
                if (bodys.hasOwnProperty(tableId)) {
                    tableData = bodys[tableId]
                }
                this.props.cardTable.setTableData(tableId, tableData);
            });
            toast({color: "success", content: this.state.json['jf6005-000043']});/* 国际化处理： 保存成功！！！*/
        });
}
