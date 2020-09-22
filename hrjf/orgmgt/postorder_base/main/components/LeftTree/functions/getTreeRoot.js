// 获取左树的根节点

import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default (data) => {
    return proFetch({
        url: '/nccloud/hrjf/postseries/treeAction.do',
        body: {
            pk_org: data.pk_org,
            showDisable: data.showDisable
        }
    });
};
