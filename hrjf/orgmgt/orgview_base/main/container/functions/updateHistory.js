import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';
import {toast} from 'nc-lightapp-front';

export default function updateHistory(info, callback) {
    const params = {
        pk_org: info.pk_org.value,
        pk_group: info.pk_group.value,
        "pk_om_orgchart": info.pk_om_orgchart.value,
        "code": info.code.value,
        "name": info.name.value,
        "createdate": info.createdate.value,
        "remark": info.remark.value
    };
    proFetch({
        url: '/nccloud/hrjf/orgchart/snapshotInfoUpdateAction.do',
        body: params
    })
        .then((res) => {
            if (res.success) {
                this.getHistory();
                toast({
                    color: 'success',
                    content: this.state.json['jf6005-000499']/* 国际化处理： 更新成功*/
                });
                callback && callback();
            }
        });
}
