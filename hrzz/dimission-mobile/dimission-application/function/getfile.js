/**
 *
 * Created by shenzaifang on 2019-05-20
 */
import {hrAjax} from "../../../public/mobile/utils/snRequestMeta";

export function getFile(billId) {
    let body = {
        billId,
        fullPath:billId
    };
    let data = {
        url: "/nccloud/platform/attachment/query.do",
        body
    };
    return hrAjax(data)
}