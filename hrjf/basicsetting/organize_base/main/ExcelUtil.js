import XLSX from 'xlsx';
import { hrAjax} from 'src/hrpub/common/utils/utils'
 
export default class ExcelUtil extends Object {
  /**
   * @param header
   * @param data
   * @param fileName
   */
  static export(header, data, fileName = '职位管理.xls') {
    let header2 = header
      .map(
        (item, i) =>
          Object.assign({}, { [String.fromCharCode(65 + i) + 1]: { k: item.key, v: item.title } })
      )
      .reduce((prev, next) => Object.assign({}, prev, next));
    let rows = {};
    if (data && data.length > 0) {
      rows = data
        .map(
          (item, i) =>
            header.map(
              (elem, j) =>
                Object.assign(
                  {},
                  { [String.fromCharCode(65 + j) + (i + 2)]: { v: item[elem.key] } }
                )
            )
        )
        .reduce((prev, next) => prev.concat(next))
        .reduce((prev, next) => Object.assign({}, prev, next));
    }
 
    let lines = Object.assign({}, header2, rows);
    let position = Object.keys(lines);
    let ref = `${position[0]}:${position[position.length - 1]}`;
    let cols = header.map((item, i) => Object.assign({}, { wpx: 150 }));
 
    let workbook = {
      SheetNames: ['Sheet'],
      Sheets: {
        Sheet: Object.assign({}, lines, {
          '!ref': ref,
          '!cols': cols,
        }),
      },
    };
 
    XLSX.writeFile(workbook, fileName);
  }
 
  /**
   * import file
   * <input type='file' accept='.xlsx, .xls' onChange={(e)=>{ExcelUtil.import(e)} }/>
   * @param file
   */
  static import(file){
          // 获取上传的文件对象
          const { files } = file.target;
          // 通过FileReader对象读取文件
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file.target.files[0]);
          fileReader.onload = event => {
              try {
                  const { result } = event.target;
                  // 以二进制流方式读取得到整份excel表格对象
                  const workbook = XLSX.read(result, { type: 'binary' });
                  let data = []; // 存储获取到的数据
                  // 遍历每张工作表进行读取（这里默认只读取第一张表）
                  for (const sheet in workbook.Sheets) {
                      if (workbook.Sheets.hasOwnProperty(sheet)) {
                          // 利用 sheet_to_json 方法将 excel 转成 json 数据
                          data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                          // break; // 如果只取第一张表，就取消注释这行
                      }
                  }
              let resdata=[];
              for(var i in data){
                if(i==0){
                  continue
                }
                if(data.length-1 == i){
                  continue
                }
                resdata.push(data[i])
              }
              console.log(resdata,'ttttttttttttttttttttyyyyyyyyyyyyyyyyyyyy')
              hrAjax({
                  url: '/nccloud/hrjf/organize/importAction.do',
                  data: {resdata},
                  // headers:{'Content-Type': 'multipart/form-data'},
                  success: (res) => {
                           
                  }
                  }) 
              } catch (e) {
                  // 这里可以抛出文件类型错误不正确的相关提示
                  console.log('文件类型不正确');
                  return;
              }
              
          };
          file.target.value='';
          //document.querySelector('#fileInfo').value = null
          
          // 以二进制方式打开文件
          //fileReader.readAsBinaryString(files[0]);
  }
}