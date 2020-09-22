/**
 *
 * Created by shenzaifang on 2019-05-20
 */
import {hrAjax} from "../../../public/mobile/utils/snRequestMeta";
import {COMMON as transCommon} from "../../trans-approve/common/const"

export function beforeAction(key,formData,COMMON) {
    let body = {
        key,
        formData
    };

    if(COMMON.config.appcode===transCommon.config.appcode){
        //调动办理
        body.tansMode = formData.rows[0].values["stapply_mode"].value
    }
    let data = {
        url: COMMON.beforeEditUrl,
        body
    };
    return hrAjax(data)
}
