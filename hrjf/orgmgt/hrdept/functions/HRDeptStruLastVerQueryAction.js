/**
 * 查询 部门机构版本化
 */

import proFetch from '../../../public/functions/project-fetch'

export default function HRDeptStruLastVerQueryAction(pk_org) {
    let postData = {
        pk_org:pk_org
    };
    return proFetch({
        url: '/nccloud/hrjf/hrdept/HRDeptStruLastVerQueryAction.do',
        body: postData,
    })
        .then((res) => {
            if (res.success) {
                if(res.data){
                    let formData = {
                        deptStruversion: res.data.deptStruversion
                    };
                    this.props.form.setAllFormValue(formData);
                }
                this.props.form.setFormStatus('deptStruversion','edit');
            }
        });
}
