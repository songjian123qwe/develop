/**
 *
 * Created by shenzaifang on 2019-08-05
 */
export const COMMON = {
    poststd_card: "poststd", //基准岗位表单 模板ID
    referConfig: {
        refType: 'grid',
        refName: 'jf6005-000015', /* 国际化处理： 职级*/
        placeholder: 'jf6005-000015', /* 国际化处理： 职级*/
        refCode: 'hrjf.refer.JobLevelGridRef',
        queryGridUrl: '/nccloud/hrjf/ref/JobLevelGridRef.do',
        columnConfig: [{
            name: ['jf6005-000016', 'jf6005-000017', 'jf6005-000018', 'jf6005-000019'],//'职级编码', '职级名称', "职级类别编码", "职级类别名称"
            code: ['refcode', 'refname',
                "om_joblevelsys.code as syscode", "om_joblevelsys.name as sysname"]
        }],
        isMultiSelectedEnabled: true,
        isCacheable: false
    }
}
