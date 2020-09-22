import { high,base} from 'nc-lightapp-front';  // 从nc-lightapp-front引入high 高阶组件。
const { NCUploader } = high;               // 从 高阶组件引入NCUploader。
const {NCIcon,NCButton} = base;

import React from 'react';
import './index.less';
// import BtnAction from '../../actions/button.js'
import UploadAction from '../../actions/upload.js'
import {render, connect} from 'src/hrpub/common/frame';



const Wrapper = render({
    actions: {
        // btnAct: BtnAction,
        // proveAct:ProveAction,
        upload:UploadAction
    }
})(({props, state, action}) => {
    const {exam,form} = props;
    return (
        <div className="upload">
                 <NCUploader  
                    billId={exam.uploadBillid} 
                    billNo={exam.uploadBillCode}
                    placement={'bottom'}
                    // getGroupList = {this.getGroupList}
                    uploadTitle = {exam.uploadBillType}
                    onHide={action.upload.onHideUploader} // 关闭功能
                    // beforeUpload={this.beforeUpload} 
                    customInterface={
                        {
                            queryLeftTree:"/nccloud/platform/attachment/lefttree.do",
                            queryAttachments: "/nccloud/platform/attachment/query.do"
                        }
                    }
                />
                {/* <If condition ={exam.uploadBillstate !== '-1'}>
                    {
                       action.upload.mask() 
                    }
                </If> */}
                
        </div>

    );

});

export default connect(Wrapper);