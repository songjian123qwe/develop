import axios from 'axios';
import ViewModel from './viewmodel/viewmodel';
let { setGlobalStorage, getGlobalStorage } = ViewModel;
import Gzip from './gzip';
/**
 * 获取缓存是否需要加密的标识
 */
export default function getStoreCipherFlag(cckk) {
    // 标识请求过一次，或放入localStorage
    let storeCipher = localStorage.getItem('storeCipher')
    //若取不到，还未发过请求
    // if (storeCipher === null) {
    //     let gziptools = new Gzip();
    //     let gzip = getGlobalStorage('localStorage', 'gzip');
    //     let reqData = {
    //         sysParamJson: {
    //             busiaction: '查询storage加密开关',
    //             pagecs: cckk
    //         }
    //     };
    //     let gzipSwitch = gzip == "1";
    //     reqData = gzipSwitch ? gziptools.zip(JSON.stringify(reqData)) : reqData;
    //     axios({
    //         method: 'post',
    //         url: '/nccloud/platform/localstorage/switch.do',
    //         data: reqData,
    //         withCredentials: true
    //     })
    //         .then((res) => {
    //             if (res.data) {
    //                 let gData = gzipSwitch ? gziptools.unzip(res.data) : JSON.parse(res.data);
    //                 if (gData.success || res.success) {
    //                     if (gData.data) {
    //                         localStorage.setItem('storeCipher', 1);
    //                     } else {
    //                         localStorage.setItem('storeCipher', 0);
    //                     }
    //                 } else {
    //                     throw new Error(gData.error);
    //                 }
    //             }
    //         })
    //         .catch((res) => {
    //             //请求失败；开关默认开启，即默认加密
    //             localStorage.setItem('storeCipher', 1);
    //         });
    // }
}
