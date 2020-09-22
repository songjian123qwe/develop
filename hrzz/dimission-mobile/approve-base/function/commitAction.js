/**
 *
 * Created by shenzaifang on 2019-05-20
 */
import {hrAjax} from "../../../public/mobile/utils/snRequestMeta";

export function commitAction(formData,COMMON) {
    let body = {
        formData
    };
    return hrAjax({
        url: COMMON.saveUrl,
        body
    })
}
