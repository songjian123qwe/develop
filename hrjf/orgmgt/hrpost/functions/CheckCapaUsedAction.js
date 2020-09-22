/**
 * 岗位素质能力子集编辑
 */

import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default function CheckCapaUsedAction() {
    let postData = {
    };
    return new Promise(resolve => {
        proFetch({
            url: '/nccloud/hrjf/job/CheckCapaUsedAction.do',
            body: postData,
        })
            .then((res) => {
                if (res.success) {
                    resolve(res)
                }
            });
    })
}
