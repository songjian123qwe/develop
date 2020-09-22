/**
 * 岗位变更 撤销执行
 */

import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default function PostChangeCancelExecAction(formdata, pk_post) {
    let postData = {
        formdata,
        pk_post
    };
    return new Promise(resolve => {
        proFetch({
            url: '/nccloud/hrjf/post/PostChangeCancelExecAction.do',
            body: postData,
        })
            .then((res) => {
                if (res.success) {
                    resolve(res)
                }
            });
    })
}
