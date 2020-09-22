import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';
import setPostData from "./setPostData";
import {toast} from 'nc-lightapp-front';

export default function checkPostInfo(pk_postseries, callback) {
    if (!pk_postseries || pk_postseries === 'custom_root') {
        callback && callback();
        return;
    }
    const {pk_org} = this.props;

    const postData = {
        pk_org, pk_postseries,
    };

    return proFetch({
        url: '/nccloud/hrjf/postseries/detailAction.do',
        body: postData,
    })
        .then((res) => {
            if (res.success) {
                //setPostData.call(this, res.data)
                callback && callback();
            }
        });
}