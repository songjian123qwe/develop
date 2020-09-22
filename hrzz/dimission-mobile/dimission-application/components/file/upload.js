/**
 *
 * Created by shenzaifang on 2019-05-22
 */
import Modal from "antd-mobile/lib/modal";
import Toast from "antd-mobile/lib/toast";
import {commitAction} from "../../function/commitAction";

export default function upload({
                                   formData,
                                   fileArr,
                                   onResult,
                                   json,
                                   props
                               }) {

    let values = formData.rows[0].values;
    for (let key in values) {
        if (key === "pk_trnstype" || key === "sreason") {
            if (Array.isArray(values[key].display)) {
                values[key].display = values[key].display[0];
            }
            values[key].value = values[key].value;
            if (!values[key].value) {
                formData = false;
            }
        }
    }
    let model = {
        model: formData
    };

    let postData = new FormData(); //创建form对象
    postData.append('formData', JSON.stringify(model));
    fileArr.forEach((item) => {
        if (!item.pk_doc) {
            postData.append('file', item.file)
        }
    });
    Toast.loading(json["hrzzmb-000001"], 0, null, null);
    commitAction(postData).then(res => {
        onResult && onResult(res);
        Toast.hide();
    }).catch((err) => {
        Toast.hide();
        let alertMsg;
        if (typeof err === 'object' && err.data && err.data.error && err.data.error.message) {
            alertMsg = err.data.error.message
        } else {
            let str = err.toString();
            alertMsg = str.slice(str.indexOf(':') + 1);
        }

        Modal.alert(json['hrzzmb-000029'], alertMsg)
    });
}
