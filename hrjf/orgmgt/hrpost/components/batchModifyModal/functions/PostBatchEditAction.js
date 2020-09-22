/**
 * 查询 岗位批改
 */

import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default function PostBatchEditAction(selPostPks) {
    let postData = {
        selPostPks
    };
    return new Promise(resolve => {
        proFetch({
            url: '/nccloud/hrjf/post/PostBatchEditAction.do',
            body: postData,
        })
            .then((res) => {
                if (res.success) {
                    resolve(res)
                }
            });
    })
}
