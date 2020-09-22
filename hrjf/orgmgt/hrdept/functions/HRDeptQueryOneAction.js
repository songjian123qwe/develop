/**
 * 查询卡片数据
 */

import ajaxHRDeptQueryOneAction from '../request-functions/getHRDeptQueryOneAction.js';

export default function HRDeptQueryOneAction(pk_dept) {

    let postData = {
        pk_dept
    };

    return new Promise((resolve, reject) => {
        ajaxHRDeptQueryOneAction(postData)
            .then((res) => {
                resolve(res);
            })
            .catch(reason => {
                reject(reason)
            });
    })
}
