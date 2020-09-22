/**
 * 岗位删除
 */

import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';
import {
    toast,
    cacheTools
} from 'nc-lightapp-front';

export default function PostDeleteAction(pk_post) {
    let postData = {
        pk_post
    };
    return new Promise(resolve => {
        proFetch({
            url: '/nccloud/hrjf/post/PostDeleteAction.do',
            body: postData,
        })
            .then((res) => {
                if (res.success) {
                    let allpks = cacheTools.get('allpks');
                    if (!Array.isArray(allpks)) {
                        allpks = [];
                    } else {
                        let index = allpks.indexOf(pk_post);
                        allpks.splice(index, 1);
                    }
                    cacheTools.set('allpks', allpks);
                    if (res.data) {
                    }
                    resolve(res);
                    toast({color: "success", content: this.state.json['jf6005-000164']});/* 国际化处理： 删除成功！*/
                }
            });
    })
}
