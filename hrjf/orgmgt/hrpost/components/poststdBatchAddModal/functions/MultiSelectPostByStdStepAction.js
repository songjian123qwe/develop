/**
 * 选择岗位
 */

import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default function MultiSelectPostByStdStepAction(selDeptPks,selPostPks) {
    let postData = {
        selDeptPks,
        selPostPks
    };
    return new Promise(resolve => {
        proFetch({
            url: '/nccloud/hrjf/post/MultiSelectPostByStdStepAction.do',
            body: postData,
        })
            .then((res) => {
                if (res.success) {
                    resolve(res)
                }
            });
    })
}
