/**
 * 确认岗位
 */

import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default function ConfirmByStdStepAction(multiSelectPostByStd	) {
    let postData = {
        multiSelectPostByStd
    };
    return new Promise(resolve => {
        proFetch({
            url: '/nccloud/hrjf/post/ConfirmByStdStepAction.do',
            body: postData,
        })
            .then((res) => {
                if (res.success) {
                    resolve(res)
                }
            });
    })
}
