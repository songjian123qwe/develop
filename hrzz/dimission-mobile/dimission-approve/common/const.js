/**
 *
 * Created by shenzaifang on 2019-08-08
 */
export const COMMON = {
    title:'hrzzmb-000118',//'离职审批'
    config: {
        pagecode: '60652050p_audit',
        appcode: '60652050'
    },
    formId: 'card', //模板tableId
    hasEvent:true,// 是否有编辑前/后事件   false：没有编辑前/后事件；true：有编辑前/后事件
    queryOneUrl: '/nccloud/hrzz/dimission/DimissionAuditQueryOneAction.do', // 查询单个 接口url
    saveUrl: '/nccloud/hrzz/dimission/DimissionAuditSaveAction.do', // 保存 接口url

    /**-------------------------------非必须分割--------------------------------*/

    beforeEditUrl: null, // 编辑前 接口url
    afterEditUrl: '/nccloud/hrzz/dimission/DimissionAuditAfterEditAction.do', // 编辑后 接口url
    billid: "1001CE10000000002QEC",// 测试用billid
};
