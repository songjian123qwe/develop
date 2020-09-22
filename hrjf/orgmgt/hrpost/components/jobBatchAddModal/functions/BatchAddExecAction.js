/**
 * 批增  执行
 */

import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default function BatchAddExecAction(postinf,addType) {
    let postData = {
        addType,
        postinf
    };
    return new Promise(resolve => {
        proFetch({
            url: '/nccloud/hrjf/post/BatchAddExecAction.do',
            body: postData,
        })
            .then((res) => {
                if (res.success) {
                    resolve(res)
                }
            });
    })
}
