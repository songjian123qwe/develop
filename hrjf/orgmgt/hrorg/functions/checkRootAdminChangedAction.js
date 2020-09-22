/**
 * 判断是否需要提示变更行政组织根节点
 */
import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';
export default (data) => {

    return proFetch({
        url: '/nccloud/hrjf/orginfo/CheckRootAdminChangedAction.do',
        body: data,
    });
};
