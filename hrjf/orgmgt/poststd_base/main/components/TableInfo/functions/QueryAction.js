import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

/**
 * 列表查询
 * @param pk_org                string : 全局： GLOBLE00000000000000'；  集团：getBusinessInfo() || {groupId: '0001HR100000000005M3'};
 * @param queryCondition        object : 查询条件
 * @param showSealDataFlag      boolen : 是否停用
 * @param uiState               string : 'list' 首页, 'card' 详情页
 * @returns {Promise<any>}
 * @constructor
 */
export default function QueryAction(pk_org,queryCondition,showSealDataFlag,uiState) {
    const postData = {
        pk_org,
        ...queryCondition,
        showSealDataFlag,
        uiState
    };

    return new Promise( ((resolve, reject) => {
        proFetch({
            url: '/nccloud/hrjf/poststd/QueryAction.do',
            body: postData,
        })
            .then((res) => {
                if (res.success) {
                    resolve(res)
                }
            });
        })
    );
}