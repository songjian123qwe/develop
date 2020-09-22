/**
 * 保存  人力资源/行政组织体系版本化信息
 */
import {
    toast
} from 'nc-lightapp-front';
import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default (data) => {

    return proFetch({
        url: '/nccloud/hrjf/orginfo/OrgInfoStruVersionSaveAction.do',
        method: 'post',
        data: data
    });

}
