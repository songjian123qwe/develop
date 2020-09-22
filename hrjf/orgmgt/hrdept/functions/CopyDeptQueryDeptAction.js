/**
 * 复制部门待选部门查询
 */
import {
    toast
} from 'nc-lightapp-front';
import proFetch from '../../../public/functions/project-fetch'

export default function CopyDeptQueryDeptAction(pk_org) {
    let postData = {
        pk_org
    };
    return new Promise((resolve, reject) => {
        proFetch({
            url: '/nccloud/hrjf/hrdept/CopyDeptQueryDeptAction.do',
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
