/**
 * 业务单元版本信息
 *  pk_org:织主键
    pk_vid:版本主键
    type:类型
 */

import proFetch from '../../../public/functions/project-fetch'

export default function OrgUnitCardVersionQueryAction(pk_dept, pk_vid) {
    let postData = {
        pk_dept,
        pk_vid
    };
    return new Promise(((resolve, reject) => {
        proFetch({
            url: '/nccloud/hrjf/hrdept/HRDeptVersionQueryAction.do',
            body: postData,
        })
            .then((res) => {
                if (res.success) {
                    resolve(res);
                }
            });
    }))
}
