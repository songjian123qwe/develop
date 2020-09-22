/**
 * 部门合并 查询
 */
import {
    toast
} from 'nc-lightapp-front';
import proFetch from '../../../public/functions/project-fetch'

export default function MergeDeptAction(pk_dept) {
    let postData = {
        pk_dept
    };
    return proFetch({
        url: '/nccloud/hrjf/hrdept/MergeDeptAction.do',
        body: postData,
    })
        .then((res) => {
            if (res.success) {
                this.props.form.setFormStatus('deptmerge','edit');
                let formData = {
                    deptmerge: {
                        rows: []
                    }
                };
                if(res.data){
                    formData.deptmerge.rows = res.data.deptmerge.rows;
                    let values = res.data.deptmerge.rows[0].values;
                    if(values){
                        this.props.form.setFormItemsRequired('deptmerge',{'vName':values.newVer.value})
                    }
                }
                this.props.form.setAllFormValue(formData);
            }else{
                toast({
                    color: 'danger',
                    content: res.error.message
                });
            }
        });
}
