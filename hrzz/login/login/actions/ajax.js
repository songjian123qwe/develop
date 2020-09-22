import ajax from '../../../public/mobile/utils/ajax';

import Toast from 'antd-mobile/lib/toast';

export default function({
    success,
    error,
    ...others
}) {

    return new Promise((resolve, reject) => {

        ajax({
            success: (res) => {
                typeof success === 'function' && success(res);
                resolve(res);
            },
            error: (e) => {
                if(typeof error === 'function') {
                    error(e);
                }
                else {
                    let errorMsg = '';
                    if(e && e.data) {
                        if(e.data.error && e.data.error.message) {
                            errorMsg = e.data.error.message
                        }
                        else {
                            errorMsg = JSON.stringify(e.data);
                        }
                    }
                    else {
                        errorMsg = JSON.stringify(e);
                    }
                    Toast.fail(errorMsg, 3, null, false);
                }
                reject(e);
            },
            ...others
        });

    });

}