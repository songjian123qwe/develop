/**
 * 參考 https://github.com/jcubic/sysend.js/blob/master/sysend.js
 * 
 * 
 * 共享  程文博 在使用  供应链也在使用
 */

import ViewModel from './viewmodel/viewmodel';

let { setGlobalStorage, getGlobalStorage, removeGlobalStorage, getDecryptData } = ViewModel;
let uniq_prefix = '___broadcast___';
let re = new RegExp('^' + uniq_prefix);

let callbacks = {};

function broadcast(event, message) {
    setGlobalStorage('localStorage', uniq_prefix + event, JSON.stringify(message));
    // clean up localstorage
    setTimeout(function () {
        removeGlobalStorage('localStorage', uniq_prefix + event);
    }, 0);
}

function proxy(url) {
    // TODO
}

function recieve(e) {
    if (e.key.match(re)) { // localStorage.setItem時  ___broadcast___ 前缀   如 localStorage.setItem('___broadcast___XXXX')
        let key = e.key.replace(re, '');
        let value = getDecryptData(e.newValue) || getGlobalStorage('localStorage', e.key);
        let obj = value ? JSON.parse(value) : '';
        obj &&
            callbacks[key] &&
            callbacks[key].forEach(function (fn) {
                fn(obj, key);
            });
    }
}

let isBind = false;

function on(event, fn, unique = true, newBind = false) {
    if (newBind) {
        window.addEventListener('storage', recieve, false)
    }
    !isBind && window.addEventListener('storage', recieve, false);
    isBind = true;
    if (!callbacks[event] || unique) {
        callbacks[event] = [];
    }
    callbacks[event].push(fn);
}

function off(event, fn) {
    isBind = false;
    window.removeEventListener('storage', recieve);
    if (callbacks[event]) {
        if (fn) {
            for (var i = callbacks[event].length; i--;) {
                if (callbacks[event][i] == fn) {
                    callbacks[event].splice(i, 1);
                }
            }
        } else {
            callbacks[event] = [];
        }
    }
}

function offAll() {
    isBind = false;
    window.removeEventListener('storage', recieve);
    if (callbacks) {
        callbacks = {};
    }
}

export { broadcast, proxy, on, off, offAll };
