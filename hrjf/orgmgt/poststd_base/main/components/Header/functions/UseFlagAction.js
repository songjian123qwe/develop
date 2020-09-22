import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

/**
 * 列表查询
 * @param pk_org                string : 全局： GLOBLE00000000000000'；  集团：getBusinessInfo() || {groupId: '0001HR100000000005M3'};
 * @param pk_post        object : 查询条件
 * @param enablestate      string : 2 启用      3 停用
 * @returns {Promise<any>}
 * @constructor
 */
export default function UseFlagAction(pk_org, pk_post, enablestate) {
    const postData = {
        pk_org,
        pk_post,
        enablestate
    };

    return new Promise(((resolve, reject) => {
            proFetch({
                url: '/nccloud/hrjf/poststd/UseFlagAction.do',
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