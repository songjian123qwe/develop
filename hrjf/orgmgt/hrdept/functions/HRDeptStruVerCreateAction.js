/**
 * 部门机构版本化创建
 */

import ajaxHRDeptStruVerCreateAction from '../request-functions/getHRDeptStruVerCreateAction.js';

export default function HRDeptStruVerCreateAction(model,pk_org) {
    let postData = {
        model,
        pk_org
    };
    return new Promise((resolve => {
        ajaxHRDeptStruVerCreateAction(postData)
            .then((res) => {
                resolve(res)
            });
    }))
}
