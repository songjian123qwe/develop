import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default function addNewPost() {
    const {pk_org, pk_postseries, form, editTable, disabledAllArea} = this.props;

    const postData = {
        pk_org,
        father_pk: pk_postseries === 'custom_root' ? '' : pk_postseries
    };

    return proFetch({
        url: '/nccloud/hrjf/postseries/addAction.do',
        body: postData,
    })
        .then((res) => {
            if (res.success) {
                if (res.data.baseInfo) {
                    form.setAllFormValue({'baseInfo': res.data.baseInfo});
                } else {
                    form.EmptyAllFormValue('baseInfo');
                }
                if (res.data.postseries_levelrelation) {
                    editTable.setTableData('postseries_levelrelation', {
                        rows: res.data.postseries_levelrelation.postseries_levelrelation.rows
                    });
                } else {
                    editTable.setTableData('postseries_levelrelation', {
                        rows: []
                    });
                }
                disabledAllArea(true);
            }
        });
}
