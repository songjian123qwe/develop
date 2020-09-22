/**
 * 选择岗位
 */

import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default function MultiSelectPostByJobStepAction(selDeptPks,selJobPks) {
    let postData = {
        selDeptPks,
        selJobPks
    };
    return new Promise(resolve => {
        proFetch({
            url: '/nccloud/hrjf/post/MultiSelectPostByJobStepAction.do',
            body: postData,
        })
            .then((res) => {
                if (res.success) {
                    resolve(res)
                }
            });
    })
}
