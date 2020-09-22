/**
 * 岗位取消
 */

import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default function PostCancelAction(bill_code,pk_org) {
    let postData = {
        bill_code,
        pk_org
    };
    return new Promise(resolve => {
        proFetch({
            url: '/nccloud/hrjf/post/PostCancelAction.do',
            body: postData,
        })
            .then((res) => {
                if (res.success) {
                    resolve(res)
                }
            });
    })
}
