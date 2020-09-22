/**
 * Created by wwb on 2018/8/23.
 */
import { high } from 'nc-lightapp-front';

const { Refer } = high;

export default function (props = {}) {
    var conf = { multiLang: { domainName: 'hrjf', currentLocale: 'zh-CN',  moduleId: 'refer6005'},
        refType: 'grid',
        refName: 'jf6005-000021',/* 国际化处理： 职等HR*/
        placeholder: 'jf6005-000021',/* 国际化处理： 职等HR*/
        refCode: 'hrjf.refer.JobRankGridRef',
        queryGridUrl: '/nccloud/hrjf/ref/JobRankGridRef.do',
        columnConfig: [{name: [ 'jf6005-000022', 'jf6005-000023' ],code: [ 'refcode', 'refname' ]}],/* 国际化处理： 职等编码,职等名称*/
        isMultiSelectedEnabled: false,
    };

    return <Refer {...Object.assign(conf, props)} />
}
