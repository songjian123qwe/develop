import NativeObj from 'src/hrzz/public/mobile/utils/jsbridge/index'
import { compatibleNavImg } from 'src/hrzz/public/mobile/utils/index'
import { Toast, Modal } from 'antd-mobile';

// export const errHandle  = (err) =>{
//     Modal.alert('提示', err.message||err.data.error.message, [
//         { text: '确定' },
//     ])
// }

export const editNav = (header, leftClick = () => {}, rightClick = () => {}, showRight) => {

    let parameters = {}
    let cbs = {
        leftClick: leftClick,
        rightClick: rightClick
    }
    parameters = {
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
        ]
    }

    if (showRight) {
        parameters.rightItems = [
            {
                title: header.rText,
                fontSize: 2,
                callback: 'rightClick'
            }
        ]
    } else {
        parameters.rightItems = []
    }


    let data = {
        'function': 'configNavBar',
        'parameters': parameters
    }
    NativeObj.configNavBar(data, cbs)
}