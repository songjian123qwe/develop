/**
 *
 * Created by shenzaifang on 2019-05-20
 */
import {hrAjax} from "../../../public/mobile/utils/snRequestMeta";

export function initAction() {
    let body = {

    };
    let data = {
        url: "/nccloud/hrzz/dimission/DimissionApplyInitAction.do",
        body
    };
    return hrAjax(data)
}