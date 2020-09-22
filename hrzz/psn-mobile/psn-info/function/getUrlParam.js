export default function () {
    let queryString = window.location.search || window.location.hash, result = {};
    if (queryString.includes('?')) {
        queryString = queryString.split('?')[1];
    } else {
        queryString = queryString.substring(1);
    }
    if (queryString) {
        let paramsArr = queryString.split('&');
        if (paramsArr && paramsArr instanceof Array) {
            paramsArr.forEach((item) => {
                if (item.indexOf('=') !== -1 && item.split('=') && item.split('=') instanceof Array) {
                    result[item.split('=')[0]] = decodeURIComponent(item.split('=')[1]);
                }
            });
        }
    }
    return result;
}