/**
 * Created by wwb on 2018/8/23.
 */
import { high } from 'nc-lightapp-front';

const { Refer } = high;

export default function (props = {}) {
    var conf = { multiLang: { domainName: 'hrjf', currentLocale: 'zh-CN',  moduleId: 'refer6005'},
        refType: 'tree',
        refName: 'jf6005-000033',/* 国际化处理： 岗位序列HR*/
        placeholder: 'jf6005-000033',/* 国际化处理： 岗位序列HR*/
        refCode: 'hrjf.refer.PostSeriesTreeRef',
        queryTreeUrl: '/nccloud/hrjf/ref/PostSeriesTreeRef.do',
        rootNode: { refname: 'jf6005-000033', refpk: 'root' ,isleaf: false},/* 国际化处理： 岗位序列HR*/
        columnConfig: [{name: [ 'jf6005-000034', 'jf6005-000035' ],code: [ 'refcode', 'refname' ]}],/* 国际化处理： 岗位序列编码,岗位序列名称*/
        isMultiSelectedEnabled: false,
    };

    return <Refer {...Object.assign(conf, props)} />
}
