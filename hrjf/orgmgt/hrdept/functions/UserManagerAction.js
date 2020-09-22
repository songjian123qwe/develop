/**
 * 部门主管
 */

import proFetch from '../../../public/functions/project-fetch'

export default function UserManagerAction(model, pk_dept, pk_org) {
    let postData = {
        model,
        pk_dept,
        pk_org
    };
    return new Promise(((resolve, reject) => {
        proFetch({
            url: '/nccloud/hrjf/hrdept/UserManagerAction.do',
            body: postData,
        })
            .then((res) => {
                if (res.success) {
                    resolve(res);
                }
            });
    }))
}
