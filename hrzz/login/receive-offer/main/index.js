import http from '../../refuse-offer/main/ajax';
import './index.less';

import clearObj from '../../third-login/main/clear';

clearObj.clear();

function postData() {

    let param = window.top.location.search.substring(1);
    let formData = {};
    let form = document.getElementById('form');
    let frame = document.getElementById('tar');

    form.action = form.action + '?' + param;

    frame.onload = function() {

        let resStr = frame.contentWindow.document.body.innerText;

        let res = JSON.parse(resStr);

        if(res.success || typeof res === 'string') {
            let sMsg = document.querySelector('.zt');
            let sPic = document.querySelector('.bg-pic');
            
            sMsg.style.display = 'block';
            sPic.style.display = 'inline-block';
        }
        else {
            let eMsg = document.querySelector('.errMsg');
            
            eMsg.innerHTML = res.error.message;
        }
    }

    form.submit();

    // param = param.split('&');

    // param.map((item) => {
    //     item = item.split('=');

    //     formData[item[0]] = item[1];
    // });

    // http.ajax({
    //     url: '/nccloud/hrzz/entry/AcceptOfferAction.do',
    //     type: 'post',
    //     data: formData,
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    //     },
    //     success: function(res, status, xhr) {
            
    //         if(res.success) {
    //             let sMsg = document.querySelector('.zt');
    //             let sPic = document.querySelector('.bg-pic');
    //             sMsg.style.display = 'block';
    //             sPic.style.display = 'inline-block';
    //         }
    //         else {
    //             let eMsg = document.querySelector('.errMsg');
    //             eMsg.innerHTML = res.error.message;
    //         }
            
    //     }
    // })
}   

    

postData();