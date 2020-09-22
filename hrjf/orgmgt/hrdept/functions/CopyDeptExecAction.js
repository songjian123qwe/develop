/**
 * 部门复制执行
 */
import {
    toast
} from 'nc-lightapp-front';
import proFetch from '../../../public/functions/project-fetch'

/**
 *
 * @param selDeptPks  已选择部门主键串
 * @param targetOrg   目标部门设置
 * @param userjson    目标部门 岗位信息
 * @param copyPosts   是否复制岗位信息
 * @returns {Promise<any>}
 * @constructor
 */
export default function CopyDeptExecAction(selDeptPks,targetOrg,userjson,copyPosts) {
    let postData = {
        selDeptPks,
        targetOrg,
        userjson,
        copyPosts
    };
    return new Promise((resolve, reject) => {
        proFetch({
            url: '/nccloud/hrjf/hrdept/CopyDeptExecAction.do',
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
