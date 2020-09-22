


import upload from './upload-new';
import { hrAjax,snCreateUIDom} from 'src/hrpub/common/utils/utils'
import {toast} from 'nc-lightapp-front';
import language from '../../../../hrhi/infomaintenance/keypersonmanage/language'
// import language from '../../language';

export default function() {
    return new Promise((resolve,reject)=>{
        upload({
            name: 'webfiles',
            action: '/nccloud/hrjf/organize/importAction.do',
            multiple: true,
            onResult: (res) => {
                if(res.success) {
                    toast({
                        color: 'success',
                        content: res.data
                    });
                    resolve(res)
                }
                else {
                    toast({
                        color: 'danger',
                        content: res.message
                    });
                }
            },
            onChange: (e) => {
                let fileList = e.target.files;
                let fileLength = fileList.length;
                let size = 0;
                Array.prototype.map.call(fileList, (file) => {
                    size += file.size;
                });

                if(fileLength > 100) {
                    toast({
                        color: 'danger',
                        content: language['hi6007-000186'] // 上传文件数量不得多于100个
                    });
                    return false
                }
                if(size / 1048576 > 20) {
                    toast({
                        color: 'danger',
                        content: language['hi6007-000187'] // 上传文件大小不得大于20兆
                    });
                    return false
                }
                
                return true;
            },
            body: {
            
            },
            webkitdirectory: false
        });
    })
    

}