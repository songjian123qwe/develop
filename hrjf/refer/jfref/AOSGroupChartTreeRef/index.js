/**
 * Created by tianxfc on 2019/01/16.
 * 组织机构图-集团节点行政体系 日期非空组织参照
 */
import { high } from 'nc-lightapp-front';

const { Refer } = high;

export default function (props = {}) {
    var conf = { multiLang: { domainName: 'hrjf', currentLocale: 'zh-CN',  moduleId: 'refer6005'},
        refType: 'tree',
        refName: 'jf6005-000042',
        placeholder: 'jf6005-000042',
        refCode: 'hrjf.refer.AOSGroupChartTreeRef',
        queryTreeUrl: '/nccloud/hrjf/ref/AOSGroupChartTreeRef.do',
        rootNode: { refname: 'jf6005-000042', refpk: 'root' ,isleaf: false},
        columnConfig: [{name: [ 'jf6005-000002', 'jf6005-000003'],
        	code: [ 'refcode', 'refname' ]
        }],
        isMultiSelectedEnabled: false,
    };

    return <Refer {...Object.assign(conf, props)} />
}
