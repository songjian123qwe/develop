// 左树查询子节点

import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default (data) => {

    let type = data.treeType || 'orgRange';

    let reqUrl = '/nccloud/hrhi/psndoc/PsndocTreeFirstChildAction.do';

    if(type === 'adminOrg') {
        reqUrl = '/nccloud/hrhi/psndoc/PsndocTreeAosFirstChildAction.do';
    }

    return proFetch({
        url: reqUrl,
        body: {
            include_cancle_dept: data['include_cancle_dept'],
            pk_org: data['pk_org'],
            tree_node_id: data['tree_node_id']
        }
    });


};
