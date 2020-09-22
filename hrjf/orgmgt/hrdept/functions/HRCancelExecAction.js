/**
 * 撤销部门 执行
 */
import {
    toast
} from 'nc-lightapp-front';
import proFetch from '../../../public/functions/project-fetch'

export default function HRCancelExecAction(formdata, pk_dept, pk_org) {
    let postData = {
        formdata,
        pk_dept,
        pk_org
    };
    return proFetch({
        url: '/nccloud/hrjf/hrdept/HRCancelExecAction.do',
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

            let treeData = this.props.syncTree.getSyncTreeValue(this.props.treeId, pk_dept);
            treeData.titleStyle = {color: 'lightgrey'};
            this.props.syncTree.editNodeSuccess(this.props.treeId, treeData);

            // 重新请求数据
            this.props.HRDeptQueryOneAction();

            if (res.data === 'success') {
                toast({
                    color: 'success',
                    content: this.state.json["jf6005-000400"] /*撤销成功！*/
                });
            } else {
                toast({
                    color: 'success',
                    content: this.state.json["jf6005-000400"] + this.state.json["jf6005-000508"]/*撤销成功！*/
                });
            }

            // this.props.form.setFormStatus('deptcancel', 'edit');
            // 关闭弹窗
            this.closeInfoModal()
        });
}
