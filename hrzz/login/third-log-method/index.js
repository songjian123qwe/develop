
import ThirdLogin from './methods/main';

import clearObj from '../third-login/main/clear';

let tlHr = new ThirdLogin();

export default (callback) => {

    if(!tlHr.code || /127.0.0.1|localhost/.test(window.location.hostname)) {
        typeof callback === 'function' && callback();
    }
    else {
        if(!(/127.0.0.1|localhost/.test(window.location.hostname))){
            clearObj.clear()
        }
        tlHr.init()
            .then(() => {
                if(typeof callback === 'function') {
                    callback();
                }
            });
    }
}