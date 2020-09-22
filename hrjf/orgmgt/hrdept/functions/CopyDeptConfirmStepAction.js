/**
 * 部门复制规则目标部门设置
 */
import {
    toast
} from 'nc-lightapp-front';
import proFetch from '../../../public/functions/project-fetch'

/**
 *
 * @param codePrefixType  目标部门编码前缀：0: 1:目标业务单元编码 2:目标业务单元中上级部门编码
 * @param createDate      目标部门成立日期
 * @param namePrefixType  目标部门名称前缀：0: 1:目标业务单元名称 2:目标业务单元简称 3:目标业务单元中上级部门
 * @param deptAdjust      待复制部门信息
 * @param selOrgPks       已选择业务单元主键串
 * @returns {Promise<any>}
 * @constructor
 */
export default function CopyDeptConfirmStepAction(codePrefixType,createDate,namePrefixType,deptAdjust,selOrgPks) {
    let postData = {
        codePrefixType,
        createDate,
        namePrefixType,
        deptAdjust,
        selOrgPks
    };
    return new Promise((resolve, reject) => {
        proFetch({
            url: '/nccloud/hrjf/hrdept/CopyDeptConfirmStepAction.do',
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
