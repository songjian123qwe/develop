/**
 * 复制
 */

import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default function CopySaveAction(pk_org, pk_post, postcode, postname) {
    let postData = {
        pk_org,
        pk_post,
        postcode,
        postname
    };
    return new Promise(resolve => {
        proFetch({
            url: '/nccloud/hrjf/poststd/CopySaveAction.do',
            body: postData,
        })
            .then((res) => {
                if (res.success) {
                    resolve(res)
                }
            });
    })
}
