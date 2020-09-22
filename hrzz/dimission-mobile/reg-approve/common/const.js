/**
 *
 * Created by shenzaifang on 2019-08-08
 */
export const COMMON = {
    title:'hrzzmb-000138',//'转正审批'
    config: {
        pagecode: '60652040_APPR',
        appcode: '60652040'
    },
    formId: 'card', //模板tableId
    hasEvent:true,// 是否有编辑前/后事件   false：没有编辑前/后事件；true：有编辑前/后事件
    queryOneUrl: '/nccloud/hrzz/regappr/RegApprQueryOneAction.do', // 查询单个 接口url
    saveUrl: '/nccloud/hrzz/regappr/RegApprSaveAction.do', // 保存 接口url

    /**-------------------------------非必须分割--------------------------------*/

    beforeEditUrl: '/nccloud/hrzz/regappr/RegApprBeforeEditAction.do', // 编辑前 接口url
    afterEditUrl: '/nccloud/hrzz/regappr/RegApprAfterEditAction.do', // 编辑后 接口url
    billid: '1001AB1000000000N3RG',// 测试用billid
};
