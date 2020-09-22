/**
 * 部门合并 取消
 */
import {
    toast
} from 'nc-lightapp-front';
import proFetch from '../../../public/functions/project-fetch'

/**
 *
 * @param backupPostVO        缓存接受部门岗位数据   选择岗位时获得
 * @param mergeWrapperVO      缓存数据   选择岗位时获得
 * @param savedPostVO         缓存已保存岗位数据   从第三步返回第二步时获得
 * @param callback
 * @returns {Promise<T | never>}
 * @constructor
 */
export default function MergeDeptCancelAction(backupPostVO,mergeWrapperVO,savedPostVO,callback) {
    let postData = {
        backupPostVO,
        mergeWrapperVO,
        savedPostVO
    };
    return proFetch({
        url: '/nccloud/hrjf/hrdept/MergeDeptCancelAction.do',
        body: postData,
    })
        .then((res) => {
            if (res.success) {

                if (!res.data) {
                    return
                }
                if(callback && typeof callback === 'function'){
                    callback(res);
                }
            } else {
                toast({
                    color: 'danger',
                    content: res.error.message
                });
            }
        });
}
