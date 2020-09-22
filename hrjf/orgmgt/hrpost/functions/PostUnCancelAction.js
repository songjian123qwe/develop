/**
 * 岗位变更 取消撤销查询
 */

import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default function PostUnCancelAction(pk_post) {
    let postData = {
        pk_post
    };
    return new Promise(resolve => {
        proFetch({
            url: '/nccloud/hrjf/post/PostUnCancelAction.do',
            body: postData,
        })
            .then((res) => {
                if (res.success) {
                    resolve(res)
                }
            });
    })
}
