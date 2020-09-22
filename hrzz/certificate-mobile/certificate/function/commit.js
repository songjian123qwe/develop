import Toast from 'antd-mobile/lib/toast';
import 'antd-mobile/lib/toast/style/css';
import {hrAjax} from "../../../public/mobile/utils/snRequestMeta";
    export function commitAction(formData, toastContent) {

        let data = {
            url: "/nccloud/hrzz/prove/SubmitAction.do",
            headers: {'Content-Type': 'multipart/form-data'},
            body:formData
        };
        return hrAjax(data)
    }


