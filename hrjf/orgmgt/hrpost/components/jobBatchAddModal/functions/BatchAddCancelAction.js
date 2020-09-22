/**
 * 批增  取消
 */

import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default function BatchAddCancelAction(autoCodeMap) {
    let postData = {
        autoCodeMap
    };
    return new Promise(resolve => {
        proFetch({
            url: '/nccloud/hrjf/post/BatchAddCancelAction.do',
            body: postData,
        })
            .then((res) => {
                if (res.success) {
                    resolve(res)
                }
            });
    })
}
