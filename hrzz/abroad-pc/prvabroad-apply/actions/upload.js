import CommonAction from './common';
import { createElement } from 'react';

export default class Upload extends CommonAction{
    constructor(comp) {
        super();
        this.comp = comp;
    }

    mask = () =>{
        const { props} = this.comp;
        const {exam} = props;
        if(exam.uploadBillstate !== '-1' && exam.uploadBillstate !== '' && exam.fromApprove == false){
            let maskParents = null;
            setTimeout(() => {
                let mask = document.createElement('div')
                mask.className='mask'
                // mask.innerHTML='ssssss';
                maskParents = document.getElementsByClassName('lightapp-component-ncuploader')[0];
                maskParents.appendChild(mask)
                console.log(maskParents)
            }, 1000);
        }
       

    }
    // 确认搜索
    onHideUploader = () => {
        const { props, action} = this.comp;
        const {
            exam,
            button,
            dispatch
        } = props;
         dispatch({
            type:'exam/update',
            payload:{
                showUploader:false,
                uploadBillid:'',
                uploadBillType:'',
                uploadBillCode:'',
                uploadBillstate:''
            }
        })
    }
    getGroupList(list) {
    }
    beforeUpload(billId, fullPath, file, fileList) {
        // 参数：单据id，当前选中分组path、当前上传文件对象，当前文件列表
        // const isLt2M = file.size / 1024 / 1024 < 10;
        // if (!isLt2M) {
        //     alert(this.props.json['gx6008-000117'])/* 国际化处理： 上传大小小于2M*/
        // }
        // return isLt2M;
        return true
        // 备注： return false 不执行上传  return true 执行上传
    }
}