/**
 * 查询 撤销部门
 */

import proFetch from '../../../public/functions/project-fetch'

export default function HRCancelAction(pk_dept,pk_org) {
    let postData = {
        pk_dept,
        pk_org
    };
    return proFetch({
        url: '/nccloud/hrjf/hrdept/HRCancelAction.do',
        body: postData,
    })
        .then((res) => {
            if (!res.success||!res.data) {
                return
            }
            let formData = {
                deptcancel: {
                    rows: res.data.deptcancel.rows
                }
            };
            this.props.form.setAllFormValue(formData);
            let values = res.data.deptcancel.rows[0].values;
            if(values){
                this.props.form.setFormItemsRequired('deptcancel',{'vName':values.newVer.value})
            }
            this.props.form.setFormStatus('deptcancel','edit');
        });
}
