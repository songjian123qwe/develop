import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';
import setPostData from "./setPostData";

export default function getPostInfo(pk_postseries) {
    const {pk_org, form, editTable} = this.props;

    if (!pk_postseries || pk_postseries === 'custom_root') {
        form.EmptyAllFormValue('baseInfo');
        editTable.setTableData('postseries_levelrelation', {
            rows: []
        });
        return;
    }

    const postData = {
        pk_org, pk_postseries,
    };

    return proFetch({
        url: '/nccloud/hrjf/postseries/detailAction.do',
        body: postData,
    })
        .then((res) => {
            if (res.success) {
                setPostData.call(this, res.data)
            }
        });
}