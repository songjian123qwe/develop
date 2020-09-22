/**
 *  指派人员
 * Created by shenzaifang on 2019-05-20
 */
import {hrAjax} from "../../../public/mobile/utils/snRequestMeta";

export function appoint(content, billid) {
    let body = {
        content,
        billid
    };
    let data = {
        url: "/nccloud/hrzz/dimission/DimissionApplyAssignCommitAction.do",
        body
    };
    return hrAjax(data)
}