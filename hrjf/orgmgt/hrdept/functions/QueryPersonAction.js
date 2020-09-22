/**
 * 联查人员
 */

import ajaxQueryPersonAction from '../request-functions/getQueryPersonAction.js';

export default function QueryPersonAction(pk_dept, pk_org) {
    let postData = {
        pk_dept: pk_dept,
        pk_org: pk_org
    };
    return ajaxQueryPersonAction(postData)
        .then((res) => {
            if (res.success) {
                if (res.data) {
                    if (res.data.deptbudget && res.data.deptbudget.deptbudget) {
                        let formData = {
                            deptbudget: {
                                rows: res.data.deptbudget.deptbudget.rows
                            }
                        };
                        this.props.form.setAllFormValue(formData);
                    }
                    if (res.data.deptpsn && res.data.deptpsn.deptpsn) {
                        this.props.editTable.setTableData('deptpsn', res.data.deptpsn.deptpsn);
                    }
                }
            }
        });
}
