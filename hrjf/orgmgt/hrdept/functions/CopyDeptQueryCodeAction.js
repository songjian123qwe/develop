/**
 * 查询 目标位置部门编码
 */

import proFetch from '../../../public/functions/project-fetch'

export default function CopyDeptQueryCodeAction(targetOrg,pk_dept,pk_org,moduleId,index) {
    let postData = {
        targetOrg,
        pk_dept,
        pk_org
    };
    return proFetch({
        url: '/nccloud/hrjf/hrdept/CopyDeptQueryCodeAction.do',
        body: postData,
    })
        .then((res) => {
            if (res.success) {
                if(res.data){
                    // 最后的设置的值未确定
                    if (res.data[moduleId] && res.data[moduleId].rows && res.data[moduleId].rows[0] && res.data[moduleId].rows[0].values) {
                        let values = res.data[moduleId].rows[0].values;
                        this.props.editTable.setValByKeyAndIndex(moduleId, index, 'deptcode', values.deptcode);
                        this.props.editTable.setValByKeyAndIndex(moduleId, index, 'pk_dept', values.pk_dept);
                        values = null;
                    }
                }
            }
        });
}
