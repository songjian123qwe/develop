/**
 *
 * Created by shenzaifang on 2019-05-20
 */
import proFetch from './project-fetch';

export function hrAjax(data) {
    return new Promise((resolve, reject) => {
        const {body, ...config} = data;
        proFetch({
            data: body,
            loading: false,
            noNeedShowError: true,
            ...config,
        }).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        })
    });
}
