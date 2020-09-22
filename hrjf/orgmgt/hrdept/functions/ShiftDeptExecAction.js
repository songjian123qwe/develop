/**
 * 组织内转移 执行
 */
import {
    toast
} from 'nc-lightapp-front';
import proFetch from '../../../public/functions/project-fetch'

export default function ShiftDeptExecAction(formdata, pk_dept, pk_org) {
    let postData = {
        formdata,
        pk_dept,
        pk_org
    };
    return new Promise((resolve, reject) => {
        proFetch({
            url: '/nccloud/hrjf/hrdept/ShiftDeptExecAction.do',
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
