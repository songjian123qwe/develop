/**
 *
 * Created by shenzaifang on 2019-08-08
 */
export const COMMON = {
    title:'hrzzmb-000149',//'调动审批'
    config: {
        pagecode: '60652045_APPR',
        appcode: '60652045'
    },
    formId: 'card', //模板tableId
    hasEvent:true,// 是否有编辑前/后事件   false：没有编辑前/后事件；true：有编辑前/后事件
    queryOneUrl: '/nccloud/hrzz/transapply/TransApprQueryOneAction.do', // 查询单个 接口url
    saveUrl: '/nccloud/hrzz/transapply/TransApprSaveAction.do', // 保存 接口url

    /**-------------------------------非必须分割--------------------------------*/

    beforeEditUrl: '/nccloud/hrzz/transapply/TransBeforeEditAction.do', // 编辑前 接口url
    afterEditUrl: '/nccloud/hrzz/transapply/TransAfterEditAction.do', // 编辑后 接口url
    saveCheckUrl: '/nccloud/hrzz/transapply/TransSaveCheckAction.do', // 编辑后 接口url
    billid: '1001CE10000000003658',// 测试用billid
};
