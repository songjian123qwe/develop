/**
 * Created by wwb on 2018/8/23.
 */
import { high } from 'nc-lightapp-front';

const { Refer } = high;

export default function (props = {}) {
    var conf = {
        multiLang: { domainName: 'hrjf', currentLocale: 'zh-CN',  moduleId: 'refer6005'},
        refType: 'grid',
        refName: 'jf6005-000015',/* 国际化处理： 职级*/
        placeholder: 'jf6005-000015',/* 国际化处理： 职级*/
        refCode: 'hrjf.refer.JobLevelGridRef',
        queryGridUrl: '/nccloud/hrjf/ref/JobLevelGridRef.do',
        columnConfig: [{
        	name: [ 'jf6005-000016', 'jf6005-000017','jf6005-000018','jf6005-000019' ],/* 国际化处理： 职级编码,职级名称,职级类别编码,职级类别名称*/
        	code: [ 'refcode', 'refname',
                    "om_joblevelsys.code", "om_joblevelsys.name" ]
        }],
        isMultiSelectedEnabled: false,
    };

    return <Refer {...Object.assign(conf, props)} />
}
