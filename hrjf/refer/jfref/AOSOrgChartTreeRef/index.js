/**
 * Created by tianxfc on 2019/01/16.
 * 组织级节点 行政体系下 选择日期不为空的组织参照
 */
import { high } from 'nc-lightapp-front';

const { Refer } = high;

export default function (props = {}) {
    var conf = { multiLang: { domainName: 'hrjf', currentLocale: 'zh-CN',  moduleId: 'refer6005'},
        refType: 'tree',
        refName: 'jf6005-000041',
        placeholder: 'jf6005-000041',
        refCode: 'hrjf.refer.AOSOrgChartTreeRef',
        queryTreeUrl: '/nccloud/hrjf/ref/AOSOrgChartTreeRef.do',
        rootNode: { refname: 'jf6005-000041', refpk: 'root' ,isleaf: false},
        columnConfig: [{name: [ 'jf6005-000002', 'jf6005-000003'],
        	code: [ 'refcode', 'refname' ]
        }],
        isMultiSelectedEnabled: false,
    };

    return <Refer {...Object.assign(conf, props)} />
}
