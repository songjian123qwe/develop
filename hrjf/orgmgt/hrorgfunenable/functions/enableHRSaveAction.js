/**
 * 保存
 */
import {
    toast
} from 'nc-lightapp-front';
import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';
export default (data) => {

    return proFetch({
        url: '/nccloud/hrjf/orgenable/EnableHRSaveAction.do',
        method: 'post',
        body: data
    });

}
