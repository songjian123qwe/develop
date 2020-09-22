/**
 *
 * Created by shenzaifang on 2019-08-01
 */
import proFetch from '../../../public/functions/project-fetch'

/**
 *
 * @returns {Promise<any>}
 * @constructor
 */
export default function CheckCapaUsedAction() {
    let postData = {
    };
    return new Promise((resolve, reject) => {
        proFetch({
            url: '/nccloud/hrjf/job/queryDetailAction.do',
            body: postData,
        })
            .then((res) => {
                if (res.success) {
                    resolve(res)
                }
            });
    })
}

