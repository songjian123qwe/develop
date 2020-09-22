/**
 *
 * Created by shenzaifang on 2019-08-08
 */
export const COMMON = {
    title:'hrzzmb-000133',//'兼职审批'
    config: {
        pagecode: '606520F0_APPR',
        appcode: '606520F0'
    },
    formId: 'card', //模板tableId
    hasEvent:true,// 是否有编辑前/后事件   false：没有编辑前/后事件；true：有编辑前/后事件
    queryOneUrl: '/nccloud/hrzz/partappr/PartApprQueryOneAction.do', // 查询单个 接口url
    saveUrl: '/nccloud/hrzz/partappr/PartApprSaveAction.do', // 保存 接口url

    /**-------------------------------非必须分割--------------------------------*/

    beforeEditUrl: '/nccloud/hrzz/partappr/PartApprBeforeEditAction.do', // 编辑前 接口url
    afterEditUrl: '/nccloud/hrzz/partappr/PartApprAfterEditAction.do', // 编辑后 接口url
    billid: '1001AB1000000000AJO7',// 测试用billid
};
