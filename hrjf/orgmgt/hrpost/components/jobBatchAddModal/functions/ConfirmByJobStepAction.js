/**
 * 确认岗位
 */

import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default function ConfirmByJobStepAction(multiSelectPostByJob) {
    let postData = {
        multiSelectPostByJob
    };
    return new Promise(resolve => {
        proFetch({
            url: '/nccloud/hrjf/post/ConfirmByJobStepAction.do',
            body: postData,
        })
            .then((res) => {
                if (res.success) {
                    resolve(res)
                }
            });
    })
}
