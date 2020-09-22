/**
 * 岗位变更 合并查询
 */

import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default function PostMergeAction(pk_post) {
    let postData = {
        pk_post
    };
    return new Promise(resolve => {
        proFetch({
            url: '/nccloud/hrjf/post/PostMergeAction.do',
            body: postData,
        })
            .then((res) => {
                if (res.success) {
                    resolve(res)
                }
            });
    })
}
