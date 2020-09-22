import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';
import {toast} from 'nc-lightapp-front';

export default function saveNewPost() {
    const {pk_org, form, editTable} = this.props;
    const flag = form.isCheckNow('baseInfo');
    if (!flag) return;
    const baseRows = form.getAllFormValue('baseInfo').rows;
    if (!baseRows[0].values.father_pk.value && baseRows[0].values.inheritflag.value) {
        toast({color: "danger", content: this.state.json['jf6005-000307']});
        return;
    }
    const tableRows = editTable.getAllRows('postseries_levelrelation');

    if (tableRows.find(item => item.values.jobrank.value && item.values.jobrank.value.length > 0 && !item.values.defaultrank.value)) {
        toast({color: "danger", content: this.state.json['jf6005-000310']});
        return;
    }
    if (tableRows.filter(item => item.values.defaultlevel.value).length > 1) {
        toast({color: "danger", content: this.state.json['jf6005-000311']});
        return;
    }
    const postData = {
        pk_org,
        head: JSON.stringify({
            model: {
                areacode: 'baseInfo',
                rows: baseRows
            }
        }),
        bodys: JSON.stringify({
            model: {
                areacode: 'postseries_levelrelation',
                rows: tableRows
            }
        })
    };

    return proFetch({
        url: '/nccloud/hrjf/postseries/saveAction.do',
        body: postData,
    })
        .then((res) => {
            if (res.success) {
                toast({color: "success", content: this.state.json['jf6005-000043']});
                const pk = res.data.head.baseInfo.rows[0].values.pk_postseries.value;
                const pkName = res.data.head.baseInfo.rows[0].values.postseriesname.value;
                this.afterSavePost(pk, pkName);
            }
        });
}