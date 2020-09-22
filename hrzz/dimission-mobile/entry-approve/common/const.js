/**
 *
 * Created by shenzaifang on 2019-08-08
 */
export const COMMON = {
    title:'hrzzmb-000132',//'录用审批'
    config: {
        pagecode: '606520P0_APPR',
        appcode: '606520P0'
    },
    formId: 'card', //模板tableId
    hasEvent:false,// 是否有编辑前/后事件   false：没有编辑前/后事件；true：有编辑前/后事件
    queryOneUrl: '/nccloud/hrzz/entryappr/EntryApprQueryOneAction.do', // 查询单个 接口url
    saveUrl: '/nccloud/hrzz/entryappr/EntryApprSaveAction.do', // 保存 接口url

    /**-------------------------------非必须分割--------------------------------*/

    beforeEditUrl: '/nccloud/hrzz/partappr/PartApprBeforeEditAction.do', // 编辑前 接口url
    afterEditUrl: '/nccloud/hrzz/partappr/PartApprAfterEditAction.do', // 编辑后 接口url
    billid: "1001CE10000000002QEC",// 测试用billid
};
