/**
 * 跨组织转移 执行
 */
import {
    toast
} from 'nc-lightapp-front';
import proFetch from '../../../public/functions/project-fetch'

export default function OuterShiftDeptExecAction(outerShiftDeptInf, outerShiftPsn, transruleInf) {
    let postData = {
        outerShiftDeptInf,
        outerShiftPsn,
        transruleInf
    };
    return new Promise((resolve, reject) => {
        proFetch({
            url: '/nccloud/hrjf/hrdept/OuterShiftDeptExecAction.do',
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
