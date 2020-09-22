/**
 * 部门主管
 */

import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default function UserManagerAction(model, pk_org) {
    let postData = {
        model,
        pk_org
    };
    return proFetch({
        url: '/nccloud/hrjf/orginfo/UserManagerAction.do',
        body: postData,
    })
}
