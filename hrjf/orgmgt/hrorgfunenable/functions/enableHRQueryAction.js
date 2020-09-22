/**
 * 查询
 */
import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default (data) => {

    return proFetch({
        url: '/nccloud/hrjf/orgenable/EnableHRQueryAction.do',
        method: 'post',
        body: data
    });

}
