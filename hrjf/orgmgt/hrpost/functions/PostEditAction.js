/**
 * 岗位编辑
 */

import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default function PostEditAction(pk_post,pk_org) {
    let postData = {
        pk_post,
        pk_org
    };
    return new Promise(resolve => {
        proFetch({
            url: '/nccloud/hrjf/post/PostEditAction.do',
            body: postData,
        })
            .then((res) => {
                if (res.success) {
                    resolve(res)
                }
            });
    })
}
