/**
 * 确认复制岗位信息
 */

import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default function CopyConfirmStepAction(copyRenameStep,pk_dept,selDeptPks,selPostPks) {
    let postData = {
        copyRenameStep,
        pk_dept,
        selDeptPks,
        selPostPks
    };
    return new Promise(resolve => {
        proFetch({
            url: '/nccloud/hrjf/post/CopyConfirmStepAction.do',
            body: postData,
        })
            .then((res) => {
                if (res.success) {
                    resolve(res)
                }
            });
    })
}
