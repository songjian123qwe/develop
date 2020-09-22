/**
 * 点击启用按钮
 */
import {
    toast
} from 'nc-lightapp-front';
import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default (data) => {

    return proFetch({
        url: '/nccloud/hrjf/orginfo/OrgInfoEnableAction.do',
        data,
    });

}
