/**
 * 职能组织停用/启用
 */
import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default (data) => {

    return proFetch({
        url: '/nccloud/hrjf/orginfo/OrgTypeEnableAction.do',
        data: data,
        method: 'post'
    });

}
