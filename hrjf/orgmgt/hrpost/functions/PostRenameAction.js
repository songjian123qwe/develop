/**
 * 更名查询
 */

import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default function PostRenameAction(pk_post) {
    let postData = {
        pk_post
    };
    return new Promise(resolve => {
        proFetch({
            url: '/nccloud/hrjf/post/PostRenameAction.do',
            body: postData,
        })
            .then((res) => {
                if (res.success) {
                    resolve(res)
                }
            });
    })
}
