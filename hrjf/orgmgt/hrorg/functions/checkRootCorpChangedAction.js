/**
 * 判断是否需要提示变更公司根节点
 */
import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default (data) => {

    return proFetch({
        url: '/nccloud/hrjf/orginfo/CheckRootCorpChangedAction.do',
        body: data
    });
};
