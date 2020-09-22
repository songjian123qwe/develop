/**
 * 岗位变更 合并执行
 */

import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default function PostMergeExecAction(formdata, pk_post, pkd_post) {
    let postData = {
        formdata,
        pk_post,
        pkd_post
    };
    return new Promise(resolve => {
        proFetch({
            url: '/nccloud/hrjf/post/PostMergeExecAction.do',
            body: postData,
        })
            .then((res) => {
                if (res.success) {
                    resolve(res)
                }
            });
    })
}
