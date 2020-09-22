/**
 *
 * Created by shenzaifang on 2019-08-01
 */
import {getAppPageConfig} from 'src/hrpub/common/utils/utils';
let config = getAppPageConfig()||{};

export const COMMON = {
    config:{
        appcode: config.appcode||'60051010',
        pagecode: config.pagecode||'60051010p'
    },
    buttonGroup: 'head',
    buttonGroupCard: 'card_head',
    searchId: 'orgquery',
    orglist: 'orglist',
    orgInfFormId: 'hrorginfo',  // 组织信息模板Id
    orgtype: 'orgtype',         // 组织职能模板ID
    corp: 'corp',               // 法人公司模板Id
    hrorg: 'hrorg',             // 人力资源模板Id
    adminorg: 'adminorg',       // 行政组织模板Id
    orgmanagers: 'orgmanagers', // 组织主管模板id
    orgDetailPage: {
        browse: "browse",
        edit: "edit",
        cancle: 'cancle'
    },
    cacheConfig: {
        dataSource: 'hrjf.org.orgunit.orgunit'
    },
    pagecodeValues: {
        'p_orgdept': '60051010p_orgdept',
        'p_orgversion': '60051010p_orgversion',
        'p_StruVersion': '60051010p_StruVersion',
        'p_queryStuVersion': '60051010p_queryStuVersion',
    },
};
