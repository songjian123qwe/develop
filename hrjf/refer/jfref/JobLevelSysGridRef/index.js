/**
 * Created by wwb on 2018/8/23.
 */
import { high } from 'nc-lightapp-front';

const { Refer } = high;

export default function (props = {}) {
    var conf = { multiLang: { domainName: 'hrjf', currentLocale: 'zh-CN',  moduleId: 'refer6005'},
        refType: 'grid',
        refName: 'jf6005-000020',/* 国际化处理： 职级体系*/
        placeholder: 'jf6005-000020',/* 国际化处理： 职级体系*/
        refCode: 'hrjf.refer.JobLevelSysGridRef',
        queryGridUrl: '/nccloud/hrjf/ref/JobLevelSysGridRef.do',
        columnConfig: [{name: [ 'jf6005-000018', 'jf6005-000019' ],code: [ 'refcode', 'refname']}],/* 国际化处理： 职级类别编码,职级类别名称*/
        isMultiSelectedEnabled: false,
    };

    return <Refer {...Object.assign(conf, props)} />
}
