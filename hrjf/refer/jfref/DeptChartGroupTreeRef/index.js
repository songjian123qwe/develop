/**
 * Created by tianxfc on 2019/01/18.
 */
import { high } from 'nc-lightapp-front';

const { Refer } = high;

export default function (props = {}) {
    var conf = { multiLang: { domainName: 'hrjf', currentLocale: 'zh-CN',  moduleId: 'refer6005'},
        refType: 'gridTree',
        refName: 'jf6005-000005',
        placeholder: 'jf6005-000005',
        refCode: 'hrjf.refer.DeptChartGroupTreeRef',
        queryTreeUrl: '/nccloud/hrjf/ref/DeptChartGroupTreeRef.do',
        queryGridUrl: '/nccloud/hrjf/ref/DeptChartGroupGridRef.do',
        rootNode: { refname: 'jf6005-000042', refpk: 'root' ,isleaf: false},
        columnConfig: [{
            name: [ 'jf6005-000002', 'jf6005-000003' ],/* 国际化处理： 编码,名称*/
            code: [ 'refcode', 'refname' ]
        }],
        isMultiSelectedEnabled: false,
    };

    return <Refer {...Object.assign(conf, props)} />
}
