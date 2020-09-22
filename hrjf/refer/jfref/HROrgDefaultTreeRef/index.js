/**
 * Created by tianxfc on 2019/01/16.
 * 集团级节点 人力资源组织  日期为空对应的人力资源组织参照
 */
import { high } from 'nc-lightapp-front';

const { Refer } = high;

export default function (props = {}) {
    var conf = { multiLang: { domainName: 'hrjf', currentLocale: 'zh-CN',  moduleId: 'refer6005'},
        refType: 'tree',
        refName: 'jf6005-000001',
        placeholder: 'jf6005-000001',
        refCode: 'hrjf.refer.HROrgDefaultTreeRef',
        queryTreeUrl: '/nccloud/hrjf/ref/HROrgDefaultTreeRef.do',
        rootNode: { refname: 'jf6005-000001', refpk: 'root' ,isleaf: false},
        columnConfig: [{name: [ 'jf6005-000002', 'jf6005-000003'],
        	code: [ 'refcode', 'refname' ]
        }],
        isMultiSelectedEnabled: false,
    };

    return <Refer {...Object.assign(conf, props)} />
}
