/**
 * 跨组织转移 确认部门岗位信息
 */
import {
    toast
} from 'nc-lightapp-front';
import proFetch from '../../../public/functions/project-fetch'

/**
 *
 * @param selDeptPks  已选择的部门主键
 * @param transrule   部门转移规则
 * @returns {Promise<any>}
 * @constructor
 */
export default function OuterShiftDeptInfStepAction(selDeptPks,transrule) {
    let postData = {
        selDeptPks,
        transrule
    };
    return new Promise((resolve, reject) => {
        proFetch({
            url: '/nccloud/hrjf/hrdept/OuterShiftDeptInfStepAction.do',
            body: postData,
        })
            .then((res) => {
                if (res.success) {
                    resolve(res)
                }else{
                    toast({
                        color: 'danger',
                        content: res.error.message
                    });
                }
            });
    })
}
