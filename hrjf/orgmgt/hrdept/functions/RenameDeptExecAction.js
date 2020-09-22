/**
 * 部门更名执行
 */

import ajaxRenameDeptExecAction from '../request-functions/getRenameDeptExecAction.js';

export default function RenameDeptExecAction(formdata,pk_dept,pk_org,callback) {
    let postData = {
        formdata,
        pk_dept,
        pk_org
    };
    return ajaxRenameDeptExecAction(postData)
        .then((res) => {
            if (res.success) {
                // 页面重新请求数据
                this.refresh();
                if (callback && typeof callback === 'function') {
                    callback(res);
                }
            }
        });
}
