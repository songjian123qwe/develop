/**
 * 修改
 */
import {
    toast
} from 'nc-lightapp-front';
import ajaxHRDeptEditAction from '../request-functions/getHRDeptEditAction.js';

export default function HRDeptEditAction(pk_org, pk_dept, formId) {
    let postData = {
        pk_dept,
        pk_org
    };
    return ajaxHRDeptEditAction(postData)
        .then((res) => {
            if (!res.success) {
                return
            }
            // 右侧表单进入编辑状态
            this.baseBrowseState(true);
            // 修改页面
            this.state.newAddPageFlag = false;
            // 设置编码的可编辑性
            this.props.form.setFormItemsDisabled(formId, {code: !res.data.isCodeEditable});
            // 设置页面状态为编辑状态
            this.setState({
                editPageFlag: true
            })
        });
}
