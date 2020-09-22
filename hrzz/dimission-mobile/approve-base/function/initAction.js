/**
 *
 * Created by shenzaifang on 2019-05-20
 */
import {hrAjax} from "../../../public/mobile/utils/snRequestMeta";

export function initAction(billid,COMMON) {
    let body = {
        billid
    };
    let data = {
        url: COMMON.queryOneUrl,
        body
    };
    return hrAjax(data)
}
