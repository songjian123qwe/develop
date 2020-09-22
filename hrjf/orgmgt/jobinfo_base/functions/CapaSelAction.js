/**
 * 岗位素质能力子集编辑
 */

import {hrAjax as ajax} from 'src/hrpub/common/utils/utils';

export default function CapaSelAction( model,pk_capa) {
    let postData = {
        model,
        pk_capa
    };
    return new Promise(resolve => {
        ajax({
            url: '/nccloud/hrjf/job/CapaSelAction.do',
            body: postData,
        })
            .then((res) => {
                if (res.success) {
                    resolve(res)
                }
            });
    })
}
