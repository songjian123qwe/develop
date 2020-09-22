/**
 * 岗位素质能力子集编辑
 */

import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default function CapaSelAction( model,pk_capa) {
    let postData = {
        model,
        pk_capa
    };
    return new Promise(resolve => {
        proFetch({
            url: '/nccloud/hrjf/post/CapaSelAction.do',
            body: postData,
        })
            .then((res) => {
                if (res.success) {
                    resolve(res)
                }
            });
    })
}
