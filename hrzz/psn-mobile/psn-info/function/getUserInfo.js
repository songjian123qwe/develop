import NativeObj from 'src/hrzz/public/mobile/utils/jsbridge';

const isLocal = /127.0.0.1|localhost/.test(window.location.hostname);

export default function (callback) {
    if (isLocal) {
        const userInfo = JSON.parse(localStorage.getItem('STOREFORINFODATA') || '{}');
        callback(userInfo);
    } else {
        NativeObj.getUserInformation(res => {
            if (res) {
                const userInfo = JSON.parse(res);
                callback(userInfo.data || {});
            }
        })
    }
}