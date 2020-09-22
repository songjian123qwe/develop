import React, {Component} from 'react';
import {Modal} from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import './index.less';
import {langCheck} from "../../utils/utils";
console.log(langCheck)
const alert = Modal.alert;

const Alert = (param) => {
    const {
        status,
        icon,
        title,
        msg,
        confirmText = langCheck("0000PUB-000284"),
        confirmAct = () => {
        },
        cancelText = langCheck("0000PUB-000000"),
        cancelAct = () => {
        },
        actions
    } = param;
    let Icon = null;
    if (icon) {
        Icon = icon;
    } else {
        switch (status) {
            case 'error':
                Icon = <i className={"icon hrfont hr-close04"}/>;
                break;
            case 'success':
                Icon = <i className={"icon hrfont hr-complete"}/>;
                break;
            case 'warning':
            case 'confirm':
                Icon = <i className={"icon hrfont hr-exclamation"}/>;
                break;
            default:
                break;
        }
    }
    const header = <div className='alert-header'>
        {Icon}
        {title ? <span>title</span> : null}
    </div>;
    let handles = [];
    console.log(status,actions)
    if (status === 'confirm') {
        console.log("confirm")
        handles = [{text: cancelText, onPress: () => cancelAct()},
            {text: confirmText, onPress: () => confirmAct()}]
    } else {
        console.log("confirmdddd",langCheck('0000PUB-000080'))
        handles = [{text: langCheck('0000PUB-000080')||"确定", onPress: () => confirmAct()}]
    }
    if (actions) {
        handles = actions;
    }
    alert(header, msg, handles);
};

export default Alert;
