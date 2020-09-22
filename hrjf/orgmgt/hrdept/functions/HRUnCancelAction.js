/**
 * 查询 取消撤销部门
 */

import proFetch from '../../../public/functions/project-fetch'

export default function HRUnCancelAction(pk_dept,pk_org) {
    let postData = {
        pk_dept,
        pk_org
    };
    return proFetch({
        url: '/nccloud/hrjf/hrdept/HRUnCancelAction.do',
        body: postData,
    })
        .then((res) => {
            if (res.success) {
                if(res.data){
                    let formData = {
                        deptuncancel: {
                            rows: res.data.deptuncancel.rows
                        }
                    };
                    let values = res.data.deptuncancel.rows[0].values;
                    if(values){
                        this.props.form.setFormItemsRequired('deptuncancel',{'vName':values.newVer.value})
                    }
                    this.props.form.setAllFormValue(formData);
                }
                this.props.form.setFormStatus('deptuncancel','edit');
            }
        });
}
