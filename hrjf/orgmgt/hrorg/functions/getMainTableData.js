
import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default (data) => {
    return proFetch({
        url: '/nccloud/hrjf/orginfo/OrgInfoQueryAction.do',
        data: data,
        method: 'post'
    });
};
