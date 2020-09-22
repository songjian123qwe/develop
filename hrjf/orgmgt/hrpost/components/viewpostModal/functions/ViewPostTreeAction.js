/**
 * 岗位树查询
 */

import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

/**
 *
 * @param pk_org       组织
 * @param showDisable  是否显示撤销
 * @returns {Promise<any>}
 * @constructor
 */
export default function ViewPostTreeAction(pk_org,showDisable) {
    let postData = {
        pk_org,
        showDisable
    };
    return new Promise(resolve => {
        proFetch({
            url: '/nccloud/hrjf/post/ViewPostTreeAction.do',
            body: postData,
        })
            .then((res) => {
                if (res.success) {
                    resolve(res)
                }
            });
    })
}
