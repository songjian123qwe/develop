/**
 * 岗位变更 取消撤销执行
 */

import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default function PostUnCancelExecAction(formdata, pk_post) {
    let postData = {
        formdata,
        pk_post
    };
    return new Promise(resolve => {
        proFetch({
            url: '/nccloud/hrjf/post/PostUnCancelExecAction.do',
            body: postData,
        })
            .then((res) => {
                if (res.success) {
                    resolve(res)
                }
            });
    })
}
