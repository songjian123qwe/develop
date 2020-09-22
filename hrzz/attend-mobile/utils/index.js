import NativeObj from '../../public/mobile/utils/jsbridge/index'
import {compatibleNavImg} from '../../public/mobile/utils/index'

import {Toast,Modal} from 'antd-mobile';
export const errHandle  = (err,json) =>{
    Modal.alert(json['hrzzmb-000002'], err.message ||err.data.message, [
        { text: json['hrzzmb-000003'] },
    ])
}
// 单据状态样式统一设置
export const orderState = (state) => {
     const objState =  {
        "-1":{
            font:"自由",
            style: {background:"#f3f3f3","color":"#888","border":"1px solid #888"}
        },
        
         "3":{
            font:"提交",
            style: {background:"#f3f3f3","color":"#888","border":"1px solid #888"}
        },
        "2":{
            font:"审批进行中",
            style: {background:"#9ecdf4","color":"#2DA0F3","border":"1px solid #2DA0F3"}
        },
        "1":{
            font:"审批通过",
            style: {background:"#ebf7f6","color":"#1FBFA7","border":"1px solid #1FBFA7"}
        },
        "0":{
            font:"审批未通过",
            style: {background:"#f6ebec","color":"#BD3646","border":"1px solid #BD3646"}
        },
       
     }
     return objState[state]
}
// 时间格式兼容
export const timeFormate = (state) => {
    return state.replace(/-/g,"/")
}

export const editNav = (header,leftClick = ()=> {},rightClick = ()=> {}) =>{

    let parameters={}
    let cbs={
        leftClick: leftClick,
        rightClick: rightClick
    }
    parameters={
        leftItems: [
            {
                callback: 'leftClick',   
                icon: compatibleNavImg(location.origin+'/nccloud/resources/hrzz/public/mobile/static/icon/zuo.png')
            }
        ],
        centerItems: [
            {
                title: header.name,
            }
        ],
        rightItems: [
            {
                title: header.rText,
                fontSize: 2,
                callback: 'rightClick'
            }
        ]
    }
    let data = { 
        'function': 'configNavBar', 
        'parameters': parameters
    }
    NativeObj.configNavBar(data, cbs)
}