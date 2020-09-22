/**
 * 联查岗位
 */

import ajaxQueryPostAction from '../request-functions/getQueryPostAction.js';

export default function QueryPostAction(pk_dept, pk_org) {
    let postData = {
        pk_dept:pk_dept,
        pk_org:pk_org
    };
    return ajaxQueryPostAction(postData)
        .then((res) => {
            if (res.success) {
                this.props.editTable.setTableData('deptpost',res.data.deptpost);
            }
        });
}
