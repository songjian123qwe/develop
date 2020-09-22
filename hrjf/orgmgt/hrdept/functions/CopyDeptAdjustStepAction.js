/**
 * 部门复制规则设置
 */
import {
    toast
} from 'nc-lightapp-front';
import proFetch from '../../../public/functions/project-fetch'

/**
 *
 * @param selDeptPks 已选择部门主键串 @mock='1001A0100000000015ZI,1001A010000000001E2C'
 * @returns {Promise<any>}
 * @constructor
 */
export default function CopyDeptAdjustStepAction(selDeptPks) {
    let postData = {
        selDeptPks
    };
    return new Promise((resolve, reject) => {
        proFetch({
            url: '/nccloud/hrjf/hrdept/CopyDeptAdjustStepAction.do',
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
