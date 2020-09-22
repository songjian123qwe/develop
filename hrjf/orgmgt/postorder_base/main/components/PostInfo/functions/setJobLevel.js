import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default function setJobLevel(pk_postseries) {
    const {pk_org, form} = this.props;

    const postData = {
        pk_org, pk_postseries,
    };

    return proFetch({
        url: '/nccloud/hrjf/postseries/detailAction.do',
        body: postData,
    })
        .then((res) => {
            if (res.success) {
                form.setFormItemsValue('baseInfo', {'pk_joblevelsys': res.data.head.baseInfo.rows[0].values.pk_joblevelsys})
            }
        });
}