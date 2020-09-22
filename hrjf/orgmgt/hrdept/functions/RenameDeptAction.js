/**
 * 部门更名
 */

import ajaxRenameDeptAction from '../request-functions/getRenameDeptAction.js';

export default function RenameDeptAction(pk_dept,pk_org) {
    let postData = {
        pk_dept,
        pk_org
    };
    return ajaxRenameDeptAction(postData)
        .then((res) => {
            if (res.success) {
                let formData = {
                    rename: {
                        rows: []
                    }
                };
                if(res.data){
                    formData.rename.rows = res.data.rename.rows;
                    let values = res.data.rename.rows[0].values;
                    if(values){
                        this.props.form.setFormItemsRequired('rename',{'vName':values.newVer.value})
                    }
                }
                this.props.form.setAllFormValue(formData);
                this.props.form.setFormStatus('rename','edit');
            }
        });
}
