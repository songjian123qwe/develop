/**
 * 在职人员查询
 */

import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default function PostCurrentStaffQuery(pk_post) {
    let postData = {
        pk_post
    };
    return new Promise(resolve => {
        proFetch({
            url: '/nccloud/hrjf/post/PostCurrentStaffQuery.do',
            body: postData,
        })
            .then((res) => {
                if (res.success) {
                    resolve(res)
                }
            });
    })
}
