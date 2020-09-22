/**
 * 获取page_param
 */

import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';
import {COMMON} from "../common/common";

export default function getPageParam(pk_org) {
    let postData = {
        pk_org,
        sysPrarms: [COMMON.sysPrarms]
    };
    return new Promise(resolve => {
        proFetch({
            url: '/nccloud/hrhi/sysparam/SysinitParamQueryAction.do',
            body: postData,
        })
            .then((res) => {
                if (res.success) {
                    resolve(res)
                }
            });
    })
}
