/**
 * 业务单元版本信息
 *  pk_org:织主键
    pk_vid:版本主键
    type:类型
 */

import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default function OrgUnitCardVersionQueryAction(pk_org, pk_vid) {
    let postData = {
        pk_org,
        pk_vid
    };
    return proFetch({
        url: '/nccloud/hrjf/orginfo/OrgUnitCardVersionQueryAction.do',
        body: postData,
    })
}
