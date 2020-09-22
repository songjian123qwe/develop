import ajax from './ajax';
import {Toast, Modal} from 'antd-mobile';
import {langCheck} from 'src/hrzz/public/mobile/utils/utils'

const showLoading = () => {
    Toast.loading(langCheck('hrzzmb-000001', false, null, "hrzzmb"), 0)
};

const hideLoading = () => {
    Toast.hide()
};

export default ({
                    data,
                    url,
                    loading,
                    headers,
                    info,
                    noNeedShowError = false, //判断是否抛错，默认需要
                    ...other
                }) => {
    !loading && showLoading();
    return new Promise((resolve, reject) => {
        ajax({
            url: url,
            method: 'post',
            data: data,
            info,
            headers,
            success: (res) => {
                hideLoading();
                resolve(res);
            },
            error: (err) => {
                hideLoading();
                // 提示
                !noNeedShowError && Modal.alert(langCheck('hrzzmb-000002', false, null, "hrzzmb"), err.data && err.data.message, [
                    {text: langCheck('hrzzmb-000003', false, null, "hrzzmb")},
                ]);
                // 确定
                // Toast.fail(err.message||err.data.error.message);
                reject({
                    ...err.data,
                    data: {
                        error: {
                            message: err.data.message
                        }
                    },
                    success: false
                });
            },
            ...other
        });
    });
}