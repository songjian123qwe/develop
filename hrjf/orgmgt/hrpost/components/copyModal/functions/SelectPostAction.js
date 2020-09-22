/**
 * 查询部门下岗位信息
 */

import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default function SelectPostAction(pk_dept) {
    let postData = {
        pk_dept
    };
    return new Promise(resolve => {
        proFetch({
            url: '/nccloud/hrjf/post/SelectPostAction.do',
            body: postData,
        })
            .then((res) => {
                if (res.success) {
                    resolve(res)
                }
            });
    })
}
