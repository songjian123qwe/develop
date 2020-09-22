/**
 * 设置目标部门更名信息(设置替换内容)
 */

import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default function CopyRenameStepAction(pk_dept,selDeptPks) {
    let postData = {
        pk_dept,
        selDeptPks
    };
    return new Promise(resolve => {
        proFetch({
            url: '/nccloud/hrjf/post/CopyRenameStepAction.do',
            body: postData,
        })
            .then((res) => {
                if (res.success) {
                    resolve(res)
                }
            });
    })
}
