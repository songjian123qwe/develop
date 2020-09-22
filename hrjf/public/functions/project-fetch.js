// 总结一些ajax 的重复的地方，封装掉

/**
 * 
 * @param data:<object(url, body)>
 * 
*/

import {
    toast
} from 'nc-lightapp-front';
import {hrAjax} from 'src/hrpub/common/utils/utils';

export default (data) => {

    return new Promise((resolve, reject) => {

        hrAjax({
            url: data.url,
            method: 'post',
            data: data.body,
            success: (res) => {
                resolve(res);
                if(!res.success){
                    toast({
                        color: 'danger',
                        content: err.message
                    });
                }

            },
            error: (err) => {
                reject(err);
                toast({
                    color: 'danger',
                    content: err.message
                });
            }
        });

    });
}
