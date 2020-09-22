/**
 *
 * Created by shenzaifang on 2019-05-20
 */
import {hrAjax} from "../../../public/mobile/utils/snRequestMeta";

export function saveCheck(formData,COMMON) {
    let body = {
        editstate: true,//编辑状态   新增 - false ; 修改 - true
        isapprove: true,	//是否审批	boolean	申请 - false ; 审批 - true
        formData,
        pagecode: COMMON.config.pagecode, //	页面编码	string	申请或审批界面的页面编码
    };
    return hrAjax({
        url:COMMON.saveCheckUrl,
        body
    })
}
