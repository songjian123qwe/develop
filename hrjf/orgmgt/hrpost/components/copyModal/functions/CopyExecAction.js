/**
 * 复制执行
 */

import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

/**
 *
 * @param copyConfirmStep  从第四步获取
 * @returns {Promise<any>}
 * @constructor
 */
export default function CopyExecAction(copyConfirmStep) {
    let postData = {
        copyConfirmStep
    };
    return new Promise(resolve => {
        proFetch({
            url: '/nccloud/hrjf/post/CopyExecAction.do',
            body: postData,
        })
            .then((res) => {
                if (res.success) {
                    resolve(res)
                }
            });
    })
}
