/**
 * 部门合并 选择人员
 */
import {
    toast
} from 'nc-lightapp-front';
import proFetch from '../../../public/functions/project-fetch'

/**
 *
 * @param backupPostVO        缓存接受部门岗位数据   选择岗位时获得
 * @param deptmerge           部门选择设置   第一步的表单信息
 * @param mergeWrapperVO      缓存数据   选择岗位时获得
 * @param savedPostVO         缓存已保存岗位数据   从第三步返回第二步时获得
 * @param mergedpsninf        人员数据
 * @returns {Promise<T | never>}
 * @constructor
 */
export default function MergeDeptExecAction(backupPostVO,deptmerge,mergeWrapperVO,savedPostVO,mergedpsninf) {
    let postData = {
        backupPostVO,
        deptmerge,
        mergeWrapperVO,
        savedPostVO,
        mergedpsninf
    };
    return proFetch({
        url: '/nccloud/hrjf/hrdept/MergeDeptExecAction.do',
        body: postData,
    })
        .then((res) => {
            if (res.success) {
                this.props.refresh();
                if (!res.data) {
                    return
                }
                if (res.data === 'success') {
                    toast({
                        color: 'success',
                        content: this.state.json["jf6005-000348"] /*合并成功！*/
                    });
                } else {
                    toast({
                        color: 'success',
                        content: this.state.json["jf6005-000348"] + this.state.json["jf6005-000508"]/*合并成功！*/
                    });
                }
                this.closeInfoModal()
            } else {
                toast({
                    color: 'danger',
                    content: res.error.message
                });
            }
        });
}
