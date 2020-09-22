/**
 * 跨组织转移 确认人员信息
 */
import {
    toast
} from 'nc-lightapp-front';
import proFetch from '../../../public/functions/project-fetch'

/**
 *
 * @param outerShiftDept  确认部门岗位信息
 * @param transruleInf    缓存转移规则信息
 * @returns {Promise<any>}
 * @constructor
 */
export default function OuterShiftPsnInfStepAction(outerShiftDept, transruleInf,userjson) {
    let postData = {
        outerShiftDept,
        transruleInf,
        userjson
    };
    return new Promise((resolve, reject) => {
        proFetch({
            url: '/nccloud/hrjf/hrdept/OuterShiftPsnInfStepAction.do',
            body: postData,
        })
            .then((res) => {
                if (res.success) {
                    resolve(res)
                } else {
                    toast({
                        color: 'danger',
                        content: res.error.message
                    });
                }
            });
    })
}
