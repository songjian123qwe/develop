let urlOption = {};

export function getUrlParam(key) {
    let searchStr = window.location.search.replace('?', '');
    let hashStr = window.location.hash.replace('#', '');
    if (urlOption && key && urlOption[key]) {
        return urlOption[key]
    }
    searchStr.split('&').forEach((optStr) => {
        let index = optStr.indexOf('=');
        let key = optStr.substring(0, index);
        let value = optStr.substring(index + 1);
        urlOption[key] = value
    });
    hashStr.split('&').forEach((optStr) => {
        let index = optStr.indexOf('=');
        let key = optStr.substring(0, index);
        let value = optStr.substring(index + 1);
        if (key) {
            urlOption[key] = value
        }
    });
    if (key) {
        return urlOption[key];
    }
    return urlOption;
}