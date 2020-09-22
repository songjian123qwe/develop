import NativeObj from '../../../public/mobile/utils/jsbridge/index'
import {correctHttp} from '../../../public/mobile/utils/utils'
class previewImg {
    pictureFiles=[]
    normalFiles =  []
    correctHttp = (url) => {
       let origin = location.origin+"/"
       return  url.replace(/(http|https):\/\/(.*?)\//g, origin)
    }
    handleFiledata =  () => {
        let pictures = [];
        let normal = [];
       files.forEach(item => {
            let fileArr = item.url.split(".");
            fileArr.reverse();
            let fileType = fileArr[0];
            if( fileType == 'jpg' || fileType == 'jpeg' || fileType == 'gif' || fileType == 'png' ){
                pictures.push(item);
                normal.push(null);
            }else{
                pictures.push(null);
                normal.push(item);
            }
        });
        this.pictureFiles = pictures;
        this.normalFiles = normal;
    }
    //图片预览
    viewPic(index, ispic) {
        if (ispic) {
          let filesArr = [];
          let fileIndex = 0;
          let selectedIndex;
          this.pictureFiles.forEach((item, i) => {
            if (!!item) {
              filesArr.push(item.previewUrl);
              if (index == i) {
                selectedIndex = fileIndex;
              }
              fileIndex++;
            }
          });
          let params = {
            images: filesArr,
            index: selectedIndex
          };
          console.log(params);
          NativeObj.previewImImage(params, responseData => {});
        } else {
          let file;
          this.normalFiles.forEach((item, i) => {
            if (!!item) {
              if (index == i) {
                file = item;
              }
            }
          });
          let params = {
            fid: correctHttp(file.url),
            fidex: file.id,
            from_type: 5,
            filename: file.filename
          };
          console.log(params, params.fid);
          NativeObj.previewFile(params, responseData => {});
        }
      }
       //工具函数
     fileTypeImgSrc(obj) {
        //附件对应的图片类型
        let fileArr = obj.url.split(".");
        fileArr.reverse();
        let fileType = fileArr[0];
        let src = "";
        let isPic = false;
        switch (fileType) {
          case "doc":
            src = "../../images/word.png";
            break;
          case "docx":
            src = "../../images/word.png";
            break;
          case "xls":
            src = "../../images/excel.png";
            break;
          case "xlsx":
            src = "../../images/excel.png";
            break;
          case "ppt":
            src = "../../images/ppt.png";
            break;
          case "pptx":
            src = "../../images/ppt.png";
            break;
          case "pdf":
            src = "../../images/pdf.png";
            break;
          case "jpg":
            src = correctHttp(obj.url);
            isPic = true;
            break;
          case "jpeg":
            src = correctHttp(obj.url);
            isPic = true;
            break;
          case "gif":
            src = correctHttp(obj.url);
            isPic = true;
            break;
          case "png":
            src = correctHttp(obj.url);
            isPic = true;
            break;
          case "txt":
            src = "../../images/word.png";
            break;
          case "zip":
            src = "../../images/zip.png";
            break;
          case "rar":
            src = "../../images/rar.png";
            break;
          default:
            src = "../../images/default.png";
            break;
        }
        return { src, isPic };
      },
}
export default new previewImg