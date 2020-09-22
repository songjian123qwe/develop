/**
 * 部门参照查询
 */

import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default function DeptRefSelAction(selDeptPks) {
    let postData = {
        selDeptPks
    };
    return new Promise(resolve => {
        proFetch({
            url: '/nccloud/hrjf/post/DeptRefSelAction.do',
            body: postData,
        })
            .then((res) => {
                if (res.success) {
                    resolve(res)
                }
            });
    })
}
