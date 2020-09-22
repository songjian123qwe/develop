/**
 * Created by wwb on 2018/8/23.
 */
import { high } from 'nc-lightapp-front';

const { Refer } = high;

export default function (props = {}) {
    var conf = {
        multiLang: { domainName: 'hrjf', currentLocale: 'zh-CN', moduleId: 'refer6005' },
        refType: 'tree',
        refName: 'jf6005-000042',
        placeholder: 'jf6005-000042',
        refCode: 'hrjf.refer.AOSOrgRef',
        queryTreeUrl: '/nccloud/hrjf/ref/AOSOrgRef.do',
        rootNode: { refname: 'jf6005-000042', refpk: 'root', isleaf: false },/* 国际化处理： 部门*/
        columnConfig: [{
            name: ['jf6005-000002', 'jf6005-000003'],
            code: ['refcode', 'refname']
        }],
        isMultiSelectedEnabled: true,
    };

    return <Refer {...Object.assign(conf, props)} />
}