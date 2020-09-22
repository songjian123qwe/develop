/**
 * Created by wwb on 2018/8/23.
 */
import { high } from 'nc-lightapp-front';

const { Refer } = high;

export default function (props = {}) {
    var conf = {
        multiLang: { domainName: 'hrjf', currentLocale: 'zh-CN', moduleId: 'refer6005' },
        refType: 'gridTree',
        refName: 'jf6005-000005',
        placeholder: 'jf6005-000005',
        refCode: 'hrjf.refer.ManageScopeAOSDeptRef',
        queryTreeUrl: '/nccloud/hrjf/ref/ManageScopeAOSDeptTreeRef.do',
        queryGridUrl: '/nccloud/hrjf/ref/ManageScopeAOSDeptGridRef.do',
        rootNode: { refname: 'jf6005-000042', refpk: 'root', isleaf: false },
        columnConfig: [{
            name: ['jf6005-000002', 'jf6005-000003'],
            code: ['refcode', 'refname']
        }],
        isMultiSelectedEnabled: true,
    };

    return <Refer {...Object.assign(conf, props)} />
}