/**
 * 复制取消
 */

import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

/**
 *
 * @param autoCodeMap  从第三步获取
 * @returns {Promise<any>}
 * @constructor
 */
export default function CopyCancelAction(autoCodeMap) {
    let postData = {
        autoCodeMap
    };
    return new Promise(resolve => {
        proFetch({
            url: '/nccloud/hrjf/post/CopyCancelAction.do',
            body: postData,
        })
            .then((res) => {
                if (res.success) {
                    resolve(res)
                }
            });
    })
}
