/**
 *
 * Created by shenzaifang on 2019-05-20
 */
import {hrAjax} from "../../../public/mobile/utils/snRequestMeta";

export function delFile(billId,fullPath,pk_doc) {
    let body = {
        billId,
        fullPath,
        pk_doc
    };
    let data = {
        url: "/nccloud/platform/attachment/delete.do",
        body
    };
    return hrAjax(data)
}