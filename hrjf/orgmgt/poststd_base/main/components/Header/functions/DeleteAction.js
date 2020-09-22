import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

/**
 * 删除
 * @param pk_org                string : 全局： GLOBLE00000000000000'；  集团：getBusinessInfo() || {groupId: '0001HR100000000005M3'};
 * @param pk_post        object : 查询条件
 * @returns {Promise<any>}
 * @constructor
 */
export default function DeleteAction(pk_org,pk_post) {
    const postData = {
        pk_org,
        pk_post
    };

    return new Promise( ((resolve, reject) => {
        proFetch({
            url: '/nccloud/hrjf/poststd/DeleteAction.do',
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