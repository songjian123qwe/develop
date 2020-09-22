/**
 * 跨组织转移 查询
 */
import {
    toast
} from 'nc-lightapp-front';
import proFetch from '../../../public/functions/project-fetch'

export default function OuterShiftDeptAction(pk_org) {
    let postData = {
        pk_org
    };
    return new Promise((resolve, reject) => {
        proFetch({
            url: '/nccloud/hrjf/hrdept/OuterShiftDeptAction.do',
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
