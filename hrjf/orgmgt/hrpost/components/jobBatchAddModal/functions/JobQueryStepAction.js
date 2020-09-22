/**
 * 职务查询
 */

import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default function JobQueryStepAction() {
    let postData = {

    };
    return new Promise(resolve => {
        proFetch({
            url: '/nccloud/hrjf/post/JobQueryStepAction.do',
            body: postData,
        })
            .then((res) => {
                if (res.success) {
                    resolve(res)
                }
            });
    })
}
