import Gzip from '../gzip';
const aeskey = '4fa8959db7b4423a99f056e299914128';
import {encrypt, decrypt} from '../cipher';

/**
* Cache Constructor
*/
function WebStore(options, serializeType, ciperType) {
    'use strict';

    this._maxExpireDate = new Date('Fri, 31 Dec 9999 23:59:59 UTC');
    this._defaultExpire = this._maxExpireDate;
    

    this.defaultSerializer = {
        serialize(item) {
            return JSON.stringify(item);
        },
        deserialize(data) {
            return data && JSON.parse(data);
        }
    };

    if (serializeType === 'gzip') {
        let g = new Gzip();
        this.defaultSerializer = {
            serialize(item) {
                // let storeCipher = localStorage.getItem('storeCipher') == '0' ? false : true;
                // if (ciperType === 'aes' && storeCipher && item) {
                //     let gData = g.zip(JSON.stringify(item));
                //     return encrypt(gData, aeskey);
                // } else {
                    return g.zip(JSON.stringify(item));
                //}
            },
            deserialize(data) {
                // let storeCipher = localStorage.getItem('storeCipher') == '0' ? false : true;
                // if (ciperType === 'aes' && storeCipher && data) {
                //     let resData = decrypt(data, aeskey)
                //     return resData && g.unzip(resData);
                // } else {
                    return data && g.unzip(data);
                //}
            }
        };
    }

    this._extend = function (obj, props) {
        for (var key in props) obj[key] = props[key];
        return obj;
    }

    this._isStorageSupported = function (storage) {
        var supported = false;
        if (storage && storage.setItem) {
            supported = true;
            var key = '__' + Math.round(Math.random() * 1e7);
            try {
                storage.setItem(key, key);
                storage.removeItem(key);
            } catch (err) {
                supported = false;
            }
        }
        return supported;
    }

    // get storage instance
    this._getStorageInstance = function (storage) {
        var type = typeof storage;
        if (type === 'string' && window[storage] instanceof Storage) {
            return window[storage];
        }
        return storage;
    }





    this._isQuotaExceeded = function (e) {
        var quotaExceeded = false;
        if (e) {
            if (e.code) {
                switch (e.code) {
                    case 22:
                        quotaExceeded = true;
                        break;
                    case 1014:
                        // Firefox
                        if (e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                            quotaExceeded = true;
                        }
                        break;
                }
            } else if (e.number === -2147024882) {
                // Internet Explorer 8
                quotaExceeded = true;
            }
        }
        return quotaExceeded;
    }

    // cache item constructor
    this.CacheItemConstructor = function (value, exp) {
        this._isValidDate = function (date) {
            return Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date.getTime());
        }
        this._getExpiresDate = function (expires, now) {
            now = now || new Date();

            if (typeof expires === 'number') {
                expires = expires === Infinity ?
                    this._maxExpireDate : new Date(now.getTime() + expires * 1000);
            } else if (typeof expires === 'string') {
                expires = new Date(expires);
            }

            if (expires && !this._isValidDate(expires)) {
                throw new Error('`expires` parameter cannot be converted to a valid Date instance');
            }

            return expires;
        }
        // createTime
        this.c = (new Date()).getTime();
        exp = exp || this._defaultExpire;
        var expires = this._getExpiresDate(exp);
        // expiresTime
        this.e = expires.getTime();
        this.v = value;

    }

    this._isCacheItem = function (item) {
        if (typeof item !== 'object') {
            return false;
        }
        if (item) {
            if ('c' in item && 'e' in item && 'v' in item) {
                return true;
            }
        }
        return false;
    }

    // check cacheItem If effective
    this._checkCacheItemIfEffective = function (cacheItem) {
        var timeNow = (new Date()).getTime();
        return timeNow < cacheItem.e;
    }

    this._checkAndWrapKeyAsString = function (key) {
        if (typeof key !== 'string') {
            console.warn(key + ' used as a key, but it is not a string.');
            key = String(key);
        }
        return key;
    };
    // default options
    this.defaults = {
        storage: 'localStorage',
        exp: Infinity  //An expiration time, in seconds. default never .
    };
    this.opt = this._extend(this.defaults, options);

    this.expires = this.opt.exp;
    this.storage = this._getStorageInstance(this.opt.storage);
    this._isSupported = this._isStorageSupported(this.storage);

    if (this.expires && typeof this.expires !== 'number' && !this._isValidDate(expires)) {
        throw new Error('Constructor `exp` parameter cannot be converted to a valid Date instance');
    } else {
        this._defaultExpire = this.expires;
    }


    this.quotaExceedHandler = function (key, val, options) {
        console.warn('Quota exceeded!');
        if (options && options.force === true) {
            var deleteKeys = this.deleteAllExpires();
            console.warn('delete all expires CacheItem : [' + deleteKeys + '] and try execute `set` method again!');
            try {
                options.force = false;
                this.set(key, val, options);
            } catch (err) {
                console.warn(err);
            }
        }
    };
    this.isSupported = function () {
        return this._isSupported;
    };
    this.set = function (key, val, options) {

        key = this._checkAndWrapKeyAsString(key);

        options = this._extend({ force: true }, options);

        if (val === undefined) {
            return this.storage.removeItem(key);
        }

        var value = this.defaultSerializer.serialize(val);

        var cacheItem = new this.CacheItemConstructor(value, options.exp);
        try {
            this.storage.setItem(key, this.defaultSerializer.serialize(cacheItem));
        } catch (e) {
            if (_isQuotaExceeded(e)) { //data wasn't successfully saved due to quota exceed so throw an error
                this.quotaExceedHandler(key, value, options, e);
            } else {
                console.error(e);
            }
        }

        return val;
    };
    this.get = function (key) {
        key = this._checkAndWrapKeyAsString(key);
        var cacheItem = null;
        try {
            cacheItem = this.defaultSerializer.deserialize(this.storage.getItem(key));
        } catch (e) {
            return null;
        }
        if (this._isCacheItem(cacheItem)) {
            if (this._checkCacheItemIfEffective(cacheItem)) {
                var value = cacheItem.v;
                return this.defaultSerializer.deserialize(value);
            } else {
                this.storage.removeItem(key);
            }
        }
        return null;
    };

    this.deleteItem = function (key) {
        key = this._checkAndWrapKeyAsString(key);
        this.storage.removeItem(key);
        return key;
    };

    this.deleteAllExpires = function () {
        var length = this.storage.length;
        var deleteKeys = [];
        var _this = this;
        for (var i = 0; i < length; i++) {
            var key = this.storage.key(i);
            var cacheItem = null;
            try {
                cacheItem = this.defaultSerializer.deserialize(this.storage.getItem(key));
            } catch (e) { }

            if (cacheItem !== null && cacheItem.e !== undefined) {
                var timeNow = (new Date()).getTime();
                if (timeNow >= cacheItem.e) {
                    deleteKeys.push(key);
                }
            }
        }
        deleteKeys.forEach(function (key) {
            _this.storage.removeItem(key);
        });
        return deleteKeys;
    };

    this.clear = function () {
        this.storage.clear();
    };

    this.add = function (key, value, options) {
        key = this._checkAndWrapKeyAsString(key);
        options = this._extend({ force: true }, options);
        try {
            var cacheItem = this.defaultSerializer.deserialize(this.storage.getItem(key));
            if (!this._isCacheItem(cacheItem) || !this._checkCacheItemIfEffective(cacheItem)) {
                this.set(key, value, options);
                return true;
            }
        } catch (e) {
            this.set(key, value, options);
            return true;
        }
        return false;
    };

    this.replace = function (key, value, options) {
        key = this._checkAndWrapKeyAsString(key);
        var cacheItem = null;
        try {
            cacheItem = this.defaultSerializer.deserialize(this.storage.getItem(key));
        } catch (e) {
            return false;
        }
        if (this._isCacheItem(cacheItem)) {
            if (this._checkCacheItemIfEffective(cacheItem)) {
                this.set(key, value, options);
                return true;
            } else {
                this.storage.removeItem(key);
            }
        }
        return false;
    };

    this.touch = function (key, exp) {
        key = this._checkAndWrapKeyAsString(key);
        var cacheItem = null;
        try {
            cacheItem = this.defaultSerializer.deserialize(this.storage.getItem(key));
        } catch (e) {
            return false;
        }
        if (this._isCacheItem(cacheItem)) {
            if (this._checkCacheItemIfEffective(cacheItem)) {
                this.set(key, this.get(key), { exp });
                return true;
            } else {
                this.storage.removeItem(key);
            }
        }
        return false;
    }
};


export default WebStore;