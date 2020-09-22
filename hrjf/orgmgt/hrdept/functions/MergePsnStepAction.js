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
 * @param takeOverpost        新岗位  第二步右边的数据
 * @returns {Promise<T | never>}
 * @constructor
 */
export default function MergePsnStepAction(backupPostVO,deptmerge,mergeWrapperVO,savedPostVO,takeOverpost) {
    let postData = {
        backupPostVO,
        deptmerge,
        mergeWrapperVO,
        savedPostVO,
        takeOverpost
    };
    return proFetch({
        url: '/nccloud/hrjf/hrdept/MergePsnStepAction.do',
        body: postData,
    })
        .then((res) => {
            if (res.success) {

                let step = this.state.stepsCurrent + 1;
                this.updateState({
                    stepsCurrent: step
                },()=>{
                    let clientH = this.tableBox3.clientHeight;
                    if(clientH<130){
                        this.tableBox3.style.height = '130px';
                    }
                });
                if (!res.data) {
                    return
                }
                if(res.data.mergedpsninf){
                    // 设置合并人员列表数据
                    this.props.editTable.setTableData('mergedpsninf',res.data.mergedpsninf.mergedpsninf)
                }

                // 缓存数据
                this.mergeWrapperVO = res.data.mergeWrapperVO;
                this.savedPostVO = res.data.savedPostVO || null;

            } else {
                toast({
                    color: 'danger',
                    content: res.error.message
                });
            }
        });
}
