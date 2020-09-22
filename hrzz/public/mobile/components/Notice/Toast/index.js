import React, {Component} from 'react';
import {Toast, NoticeBar} from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import Svg from "../../Svg";
import {langCheck} from '../../../utils/utils';
// import "./index.less";
import Alert from '../../Alert';
/**
 * @param {String} status 状态标识
 * @param {String} msg 提示信息
 * @param {Number} duration 显示时间 单位秒
 * @param {String} url 跳转url （ 预警需要 ）
 * @param {Number} day 授权剩余天数 （ 过期预警需要 ）
 */
const Notice = ({status, msg = langCheck('0000PUB-000020'), duration = 6, url, day, ...toastApi}) => {/* 国际化处理： 操作成功*/
    // let { langCheck } = window;
    //预警、过期警告走Notice
    if (['earlyWarning', 'overdueWarning'].includes(status)) {
        let Obj = {
            mode: 'closable',
            marqueeProps: {loop: false, leading: 500, trailing: 800, fps: 40, style: {}}
        };
        notification.config({
            placement: "topRight",
            top: 105
        });

        switch (status) {
            // 成功
            case "success":
                Object.assign(Obj, {
                    icon: (
                        <Svg width={25} height={25} xlinkHref={"#icon-wancheng"}/>
                    ),
                    message: langCheck('0000PUB-000021'),/* 国际化处理： 已成功！*/
                    description: msg
                })
                break;
            // 警告
            case "warning":
                Object.assign(Obj, {
                    icon: <Svg width={25} height={25} xlinkHref={"#icon-zhuyi1"}/>,
                    mmessage: langCheck('0000PUB-000022'),/* 国际化处理： 请注意！*/
                    description: msg
                })
                break;
            // 报错
            case "error":
                Object.assign(Obj, {
                    icon: <Svg width={25} height={25} xlinkHref={"#icon-shibai"}/>,
                    message: langCheck('0000PUB-000023'),/* 国际化处理： 出错啦！*/
                    description: msg
                })
                break;
            // 类型错误
            case "typeError":
                Object.assign(Obj, {
                    icon: <Svg width={25} height={25} xlinkHref={"#icon-shibai"}/>,
                    message: langCheck('0000PUB-000024'),/* 国际化处理： 操作失败！*/
                    description: msg
                })
                break;
            // 预警
            case "earlyWarning":
                Object.assign(Obj, {
                    mode: 'link',
                    onClick: () => {
                        window.open(url, '_blank')
                    },
                    icon: <Svg width={25} height={25} xlinkHref={"#icon-shibai"}/>,
                    message: langCheck('0000PUB-000024'),/* 国际化处理： 操作失败！*/
                    description: msg
                })
                break;
            // 过期警告
            case "overdueWarning":
                Object.assign(Obj, {
                    icon: <Svg width={25} height={25} xlinkHref={"#icon-zhuyi1"}/>,
                    message: `${langCheck('0000PUB-000028')}${day}${langCheck('0000PUB-000029')}`,/* 国际化处理： 您的授权将在,天后到期，请注意及时续费*/
                    description: null
                })
                break;
            case "simpleSuccess":
                Object.assign(Obj, {
                    icon: (
                        <Svg width={25} height={25} xlinkHref={"#icon-wancheng"}/>
                    ),
                    message: msg,
                    description: null
                })
                break;
            default:
                break;
        }
        return (
            <NoticeBar{...Obj}>
                {Obj.message}
            </NoticeBar>
        )
    } else {
        let onClose = () => {
        }
        switch (status) {
            case 'error':
            case 'typeError':
            case 'fail':
                Alert({
                    status: 'error',
                    msg
                });
                break;
            case 'simpleSuccess':
            case 'success':
            case 'Success':
                Alert({
                    status: 'success',
                    msg
                });
                break;
            case 'loading':
                Toast.loading(msg, duration = 0, onClose)
                break;
            case 'close':
                Toast.hide()
                break;
        }
        //Toast({ color: status, content: msg, ...toastApi })
    }
};

export default Notice;
