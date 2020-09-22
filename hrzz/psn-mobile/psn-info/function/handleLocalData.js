import NativeObj from 'src/hrzz/public/mobile/utils/jsbridge';

const isLocal = sessionStorage.getItem('showNav') === 'true',
    isMobileWebPage = sessionStorage.getItem('mobile-web-page') === 'true';

function save(key, value, callback = () => {
}) {
    if (isMobileWebPage) {
        callback();
        return;
    }
    if (isLocal) {
        localStorage.setItem(key, JSON.stringify(value));
        callback()
    } else {
        NativeObj.setYYStorage(key, JSON.stringify(value), callback)
    }
}

function get(key, callback = () => {
}) {
    if (isMobileWebPage) {
        callback();
        return;
    }
    if (isLocal) {
        let data = localStorage.getItem(key);
        callback(data && JSON.parse(data))
    } else {
        NativeObj.getYYStorage(key, (data) => {
            callback(data && JSON.parse(data))
        })
    }
}

function remove(key, callback = () => {
}) {
    if (isMobileWebPage) {
        callback();
        return;
    }
    if (isLocal) {
        localStorage.removeItem(key);
        callback()
    } else {
        NativeObj.removeYYStorage(key, () => {
            callback()
        })
    }
}

let handleLocalData = {
    save,
    get,
    remove
};

export default handleLocalData;