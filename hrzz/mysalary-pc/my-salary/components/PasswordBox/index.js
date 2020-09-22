import React from 'react'

import render from '../../../../../hrpub/common/frame/render';

import {connect} from '../../../../../hrpub/common/store';

import wageEnquiry from './action/action'

import './index.less';



const CardView = render({
    actions: {
        wageEnquiry:wageEnquiry
    },
    state:{
        btlineClass:'input-btline',
        // codeTime:60,
        codeTimeName: '',
       
        codeFlag:true,//验证码正确
        eye:false,//密码不可见
        password:null, // 输入的密码
        errtip:'',// 密码校验
        disableCode:true,
        disablePass:true,
    }
})(({props, action, state}) => {
    const { form } = props;
    return (
       <div>
           {[action.wageEnquiry.wageEnquiry(),action.wageEnquiry.toEmail(),action.wageEnquiry.setWageEnquiry()]}
       </div>
        
    );

});
export default connect(CardView);