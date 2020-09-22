/**
 * Created by wwb on 2018/8/23.
 */
import { high } from 'nc-lightapp-front';

const { Refer } = high;

export default function (props = {}) {
    var conf = { multiLang: { domainName: 'hrjf', currentLocale: 'zh-CN',  moduleId: 'refer6005'},
        refType: 'tree',
        refName: 'jf6005-000000',/* 国际化处理： HR组织*/
        placeholder: 'jf6005-000000',/* 国际化处理： HR组织*/
        refCode: 'hrjf.refer.AOSHROrgTreeRef',
        queryTreeUrl: '/nccloud/hrjf/ref/AOSHROrgTreeRef.do',
        rootNode: { refname: 'jf6005-000001', refpk: 'root' ,isleaf: false},/* 国际化处理： 人力资源组织*/
        columnConfig: [{name: [ 'jf6005-000002', 'jf6005-000003'],/* 国际化处理： 编码,名称*/
        	code: [ 'refcode', 'refname' ]
        }],
        isMultiSelectedEnabled: false,
    };

    return <Refer {...Object.assign(conf, props)} />
}
