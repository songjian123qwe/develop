/**
 * 执行 岗位批改
 */

import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default function PostBatchEditExecAction(model,selPostPks) {
    let postData = {
        model,
        selPostPks
    };
    return new Promise(resolve => {
        proFetch({
            url: '/nccloud/hrjf/post/PostBatchEditExecAction.do',
            body: postData,
        })
            .then((res) => {
                if (res.success) {
                    resolve(res)
                }
            });
    })
}
