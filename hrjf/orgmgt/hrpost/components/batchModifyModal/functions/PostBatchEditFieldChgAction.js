/**
 * 批改信息项变化 岗位批改
 */

import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default function PostBatchEditFieldChgAction(field_code,selPostPks) {
    let postData = {
        field_code,
        selPostPks
    };
    return new Promise(resolve => {
        proFetch({
            url: '/nccloud/hrjf/post/PostBatchEditFieldChgAction.do',
            body: postData,
        })
            .then((res) => {
                if (res.success) {
                    resolve(res)
                }
            });
    })
}
