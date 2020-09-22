/**
 * 执行 取消撤销部门
 */
import {
    toast
} from 'nc-lightapp-front';
import proFetch from '../../../public/functions/project-fetch'

export default function HRUnCancelExecAction(formdata, pk_dept, pk_org) {
    let postData = {
        formdata,
        pk_dept,
        pk_org
    };
    return proFetch({
        url: '/nccloud/hrjf/hrdept/HRUnCancelExecAction.do',
        body: postData,
    })
        .then((res) => {
            if (!res.success) {
                toast({
                    color: 'danger',
                    content: res.error.message
                });
                return;
            }
            if (res.data === 'success') {
                toast({
                    color: 'success',
                    content: this.state.json["jf6005-000399"] /*取消撤销成功！*/
                });
            } else {
                toast({
                    color: 'success',
                    content: this.state.json["jf6005-000399"] + this.state.json["jf6005-000508"]/*取消撤销成功！*/
                });
            }

            // 取消字体的灰色
            let treeData = this.props.syncTree.getSyncTreeValue(this.props.treeId, pk_dept);
            treeData.titleStyle = {};
            this.props.syncTree.editNodeSuccess(this.props.treeId, treeData);

            // 重新请求数据
            this.props.HRDeptQueryOneAction();

            this.props.form.setFormStatus('deptuncancel', 'edit');
            // 关闭弹窗
            this.closeInfoModal()
        });
}
