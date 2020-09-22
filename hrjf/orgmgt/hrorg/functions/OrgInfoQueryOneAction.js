/**
 * 查询某个组织的详情
 */
import {
    toast
} from 'nc-lightapp-front';
import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default (data) => {

    return proFetch({
        url: '/nccloud/hrjf/orginfo/OrgInfoQueryOneAction.do',
        data,
    });

}
