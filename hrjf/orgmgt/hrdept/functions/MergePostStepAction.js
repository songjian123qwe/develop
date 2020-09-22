/**
 * 部门合并 选择岗位
 */
import {
    toast
} from 'nc-lightapp-front';
import proFetch from '../../../public/functions/project-fetch'

export default function MergePostStepAction(deptmerge) {
    let postData = {
        deptmerge
    };
    return proFetch({
        url: '/nccloud/hrjf/hrdept/MergePostStepAction.do',
        body: postData,
    })
        .then((res) => {
            if (res.success) {

                let step = this.state.stepsCurrent + 1;
                this.updateState({
                    stepsCurrent: step
                });
                if (!res.data) {
                    return
                }
                // 缓存数据
                this.backupPostVO = res.data.backupPostVO;
                this.mergeWrapperVO = res.data.mergeWrapperVO;
                this.savedPostVO = res.data.savedPostVO || null;

                let leftData, rightData;
                leftData = res.data.mergedpost ? res.data.mergedpost.mergedpostinf : {rows: []};
                rightData = res.data.takeOverpost ? res.data.takeOverpost.mergedpostinf : {rows: []};
                this.updateState({
                    leftData,
                    rightData
                },()=>{
                    this.newPostData = rightData.rows;
                })
            } else {
                toast({
                    color: 'danger',
                    content: res.error.message
                });
            }
        });
}
