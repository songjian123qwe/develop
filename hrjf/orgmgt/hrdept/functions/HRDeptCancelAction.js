/**
 * 取消
 */

import {
    toast
} from 'nc-lightapp-front';
import ajaxHRDeptCancelAction from '../request-functions/getHRDeptCancelAction.js';
import HRDeptQueryOneAction from "./HRDeptQueryOneAction";

export default function HRDeptCancelAction(pk_org,bill_code) {
    let postData = {
        pk_org,
        bill_code
    };

    return new Promise((resolve, reject) => {
        ajaxHRDeptCancelAction(postData)
            .then((res) => {
                if (res.success) {
                    resolve(res);
                } else {
                    toast({
                        color: 'danger',
                        content: res.error.message
                    });
                }

            });
    });

}
