import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

/**
 * 操作前（复制，新增，删除，修改）校验
 * @param pk_org                string : 全局： GLOBLE00000000000000'；  集团：getBusinessInfo() || {groupId: '0001HR100000000005M3'};
 * @param pk_post        object : 查询条件
 * @param operate      number : operate：0:新增；2:修改；5:复制；6:新增或复制取消
 * @returns {Promise<any>}
 * @constructor
 */
export default function StdValidateAction(pk_org,pk_post,operate,postcode) {
    const postData = {
        pk_org,
        pk_post,
        operate,
        postcode
    };

    return new Promise( ((resolve, reject) => {
        proFetch({
            url: '/nccloud/hrjf/poststd/StdValidateAction.do',
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