import WebStore from './webstore';

function persistence(storageType, valueType, ciperType) {
    var defaultExpires = 60 * 15; //exp: 60 * 10 expires in 60 min.

    var defaultStorageType = 'localStorage';

    var wsCacheMap = {
        sessionStorage: new WebStore({
            storage: 'sessionStorage'
        }, valueType, ciperType),
        localStorage: new WebStore({
            storage: 'localStorage'
        }, valueType, ciperType)
    };

    // 启动前手动清除已过期数据
    wsCacheMap.sessionStorage.deleteAllExpires();
    wsCacheMap.localStorage.deleteAllExpires();
    var wsCache = wsCacheMap[storageType] || wsCacheMap[defaultStorageType];

    this.isSupport = function () {
        return wsCache.isSupported();
    };
    this.getData = function (cacheKey) {
        return wsCache.get(cacheKey);
    };

    this.setData = function (cacheKey, data, error) {
        try {
            var value = wsCache.get(cacheKey);

            if (!value) {
                var exp = defaultExpires;
                try {
                    wsCache.set(cacheKey, data, { exp: new Date('Fri, 31 Dec 9999 23:59:59 UTC') });
                    //wsCache.set(cacheKey, data);
                } catch (e) {
                    console.log(e);
                    if (typeof error === 'function') {
                        error();
                    }
                }
            }


        } catch (e) {
            console.error(e);
        }
    };
    //xuyangt     
    this.removeData = function (cacheKey) {
        return localStorage.removeItem(cacheKey);
    }

}

export default persistence;
