
import Modal from 'antd-mobile/lib/modal';

export const insertString = (str, index, item) => {
    var temp = str.split('');
    temp.splice(index, 0, item);
    return temp.join("")
}

export function uuidv4() {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

export function confirm(title,onOk,getLang){
    Modal.alert(title, '', [{
        text: getLang("00014","取消"), 
        onPress: () => {}
    }, {
        text: getLang("00032","确定"), 
        onPress: () => {
            onOk();
        }
    }])
}

let urlOption = {};
export function getUrlParam(key) {
    let searchStr = window.location.search.replace('?', '');
    let hashStr = window.location.hash.replace('#', '');

    if(urlOption && key && urlOption[key]) {
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
        
        if(key) {
            urlOption[key] = value
        }
    });
    
    if(key) {
        return urlOption[key];
    }
    return urlOption;
}