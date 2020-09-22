import {saveValidate} from 'src/hrpub/common/utils/utils';
/**
 * 格式化 显示顺序
 * @param data  formdataValue.rows[0].values
 * @param pageShow  是否用于页面展示  true：是
 */
function formatDisplayOrder(data, pageShow) {
    //表单数据
    let headData = data;
    // 如果没有 displayorder 属性 则退出
    if (!headData.hasOwnProperty('displayorder')) {
        return
    }
    if (pageShow) {
        let displayorderValue = headData.displayorder.value;
        // 如果displayorderValue 是999999 则不显示
        data.displayorder.value = (displayorderValue === '999999' ? '' : displayorderValue);
        displayorderValue = null;
    } else {
        //表单数据
        let displayorderVal = headData.displayorder.value;
        if (!displayorderVal || displayorderVal === '') {
            // 显示顺序默认值为 999999
            headData.displayorder.value = '999999';
        }
        displayorderVal = null;
    }

}

/**
 * 本地调试添加黑色背景
 */
function addBlackStyle() {
    document.querySelector('body').classList.add('workbench-black', 'nc-lightapp-front-black');
    let a1 = document.createElement('link');
    a1.href = '/nccloud/resources/platform/nc-lightapp-front/nc-lightapp-front-black.css';
    a1.rel = "stylesheet";
    document.querySelector('head').appendChild(a1);
    document.querySelector('body').classList.remove('nc-no-theme')
}

/**
 * saveValidate() 校验
 *
 * @param props
 * @param pageid        1、为template模板是template的pageid；  2、非template模板时，为表格/表单ID
 * @param formId        1、一主多子或一主一子时主集的id；  2、单个表格/表单时相应的表格/表单id
 * @param bodys_code    一主多子时 子集的 tableid
 * @param billType      编辑关联项适配中的billinfo中的billType值：'card'/'extcard'/'grid'/'form'
 * @param tableType     值为 "editTable" / "cardTable"
 * @param templetid     非template模板时才用到 template模板同级的相应的模板的pageid
 * @returns {Promise<any>}
 */

export {
    formatDisplayOrder,
    addBlackStyle,
    saveValidate,
}
