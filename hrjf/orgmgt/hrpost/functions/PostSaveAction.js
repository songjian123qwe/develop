/**
 * 岗位保存
 */

import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default function PostSaveAction(bodys, head, ui_state, isChanged) {
    let pageid = "0001Z700APPN60054030";
    let templetid = "1002Z71000000000ANI7";
    let postData = {
        bodys,
        head,
        pageid,
        templetid,
        ui_state,
        isChanged
    };
    return new Promise(resolve => {
        proFetch({
            url: '/nccloud/hrjf/post/PostSaveAction.do',
            body: postData,
        })
            .then((res) => {
                if (res.success) {
                    resolve(res)
                }
            });
    })
}
