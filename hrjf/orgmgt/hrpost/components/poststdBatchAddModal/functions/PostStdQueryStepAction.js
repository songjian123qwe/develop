/**
 * 基准岗位查询
 */

import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default function PostStdQueryStepAction() {
    let postData = {

    };
    return new Promise(resolve => {
        proFetch({
            url: '/nccloud/hrjf/post/PostStdQueryStepAction.do',
            body: postData,
        })
            .then((res) => {
                if (res.success) {
                    resolve(res)
                }
            });
    })
}
