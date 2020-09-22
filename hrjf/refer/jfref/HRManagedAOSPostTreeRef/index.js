/**
 * Created by wwb on 2018/8/23.
 */
import { high } from 'nc-lightapp-front';

const { Refer } = high;

export default function (props = {}) {
    var conf = { multiLang: { domainName: 'hrjf', currentLocale: 'zh-CN',  moduleId: 'refer6005'},
        refType: 'gridTree',
        refName: 'jf6005-000037',
        placeholder: 'jf6005-000043',
        refCode: 'hrjf.refer.HRManagedAOSPostRef',
        queryTreeUrl: '/nccloud/hrjf/ref/HRManagedAOSPostTreeRef.do',
        queryGridUrl: '/nccloud/hrjf/ref/HRManagedAOSPostGridRef.do',
        rootNode: { refname: 'jf6005-000043', refpk: 'root' ,isleaf: false},
        columnConfig: [{
            name: [ 'jf6005-000002', 'jf6005-000003' ],/* 国际化处理： 编码,名称*/
            code: [ 'refcode', 'refname' ]
        }],
        isMultiSelectedEnabled: false,
    };

    return <Refer {...Object.assign(conf, props)} />
}
