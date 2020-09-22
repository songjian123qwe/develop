/**
 * 基准岗位发生变化后触发
 */

import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

/**
 * 选择基准岗位
 * @param head {Object}
 * @param pk_poststd {string} ''
 * @returns {Promise<any>}
 * @constructor
 */
export default function PostStdSelAction(head, pk_poststd) {
    let pageid = "0001Z700APPN60054030";
    let templetid = "1002Z71000000000ANI7";
    let postData = {
        head,
        pk_poststd,
        pageid,
        templetid
    };
    return new Promise(resolve => {
        proFetch({
            url: '/nccloud/hrjf/post/PostStdSelAction.do',
            body: postData,
        })
            .then((res) => {
                if (res.success) {
                    resolve(res)
                }
            });
    })
}
