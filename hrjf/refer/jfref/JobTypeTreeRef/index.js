/**
 * Created by wwb on 2018/8/23.
 */
import { high } from 'nc-lightapp-front';

const { Refer } = high;

export default function (props = {}) {
    var conf = { multiLang: { domainName: 'hrjf', currentLocale: 'zh-CN',  moduleId: 'refer6005'}, multiLang: { domainName: 'hrjf', currentLocale: 'zh-CN',  moduleId: 'refer6005'},
        refType: 'tree',
        refName: 'jf6005-000028',/* 国际化处理： 职务类别HR*/
        placeholder: 'jf6005-000028',/* 国际化处理： 职务类别HR*/
        refCode: 'hrjf.refer.JobTypeTreeRef',
        queryTreeUrl: '/nccloud/hrjf/ref/JobTypeTreeRef.do',
        rootNode: { refname: 'jf6005-000025', refpk: 'root' ,isleaf: false},/* 国际化处理： 职务类别*/
        columnConfig: [{name: [ 'jf6005-000029', 'jf6005-000030' ],code: [ 'refcode', 'refname' ]}],/* 国际化处理： 职务类别编码,职务类别名称*/
        isMultiSelectedEnabled: false,
    };

    return <Refer {...Object.assign(conf, props)} />
}
