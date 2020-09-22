/**
 * 创建部门新版本
 */
import {
    toast
} from 'nc-lightapp-front';
import proFetch from '../../../public/functions/project-fetch'

export default function HRDeptVersionSaveAction(pk_dept, vname, vno, vstartdate) {
    let postData = {
        pk_dept,
        vname,
        vno,
        vstartdate
    };
    return proFetch({
        url: '/nccloud/hrjf/hrdept/HRDeptVersionSaveAction.do',
        body: postData,
    })
        .then((res) => {
            if (res.success) {
                toast({color: "success", content: this.state.json['jf6005-000043']});/* 国际化处理： 保存成功！！！*/
                // 关闭页面
                this.closeInfoModal();
            }
        });
}
