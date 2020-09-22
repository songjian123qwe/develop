/**
 *
 * Created by shenzaifang on 2019-05-20
 */
import {hrAjax} from "../../../public/mobile/utils/snRequestMeta";
import {COMMON as transCommon} from "../../trans-approve/common/const"

export function afterAction(key,formData,COMMON) {
    let body = {
        key,
        // area_code,
        formData
    };
    if(COMMON.config.appcode===transCommon.config.appcode){
        body.page_code = COMMON.config.pagecode
    }
    let data = {
        url: COMMON.afterEditUrl,
        body
    };
    return hrAjax(data)
}
