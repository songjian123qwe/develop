/**
 * 部门条件查询
 */

import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default function DeptQuerySelAction(conditions) {
    let postData = conditions;
    return new Promise(resolve => {
        proFetch({
            url: '/nccloud/hrjf/post/DeptQuerySelAction.do',
            body: postData,
        })
            .then((res) => {
                if (res.success) {
                    resolve(res)
                }
            });
    })
}
