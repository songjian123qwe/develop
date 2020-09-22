/**
 * 下级人员查询
 */

import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default function PostSubordinateQuery(pk_post,level) {
    let postData = {
        level,
        pk_post
    };
    return new Promise(resolve => {
        proFetch({
            url: '/nccloud/hrjf/post/PostSubordinateQuery.do',
            body: postData,
        })
            .then((res) => {
                if (res.success) {
                    resolve(res)
                }
            });
    })
}
