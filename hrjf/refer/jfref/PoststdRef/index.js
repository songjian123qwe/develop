/**
 * Created by wwb on 2018/8/23.
 */
/**
 * Created by wwb on 2018/8/23.
 */
import { high } from 'nc-lightapp-front';

const { Refer } = high;

export default function (props = {}) {
    var conf = { multiLang: { domainName: 'hrjf', currentLocale: 'zh-CN',  moduleId: 'refer6005'},
        refType: 'gridTree',
        refName: 'jf6005-000040',/* 国际化处理： 基准岗位*/
        placeholder: '',/* 国际化处理： */
        refCode: 'hrjf.refer.PoststdRef',
        queryTreeUrl: '/nccloud/hrjf/ref/PostSeriesTreeRef.do',
        queryGridUrl: '/nccloud/hrjf/ref/PoststdGridRef.do',
        rootNode: { refname: 'jf6005-000032', refpk: 'root' ,isleaf: false},/* 国际化处理： 岗位序列*/
        columnConfig: [{
            name: [ 'jf6005-000002', 'jf6005-000003' ],/* 国际化处理： 编码,名称*/
            code: [ 'refcode', 'refname' ]
        }],
        isMultiSelectedEnabled: false,
    };

    return <Refer {...Object.assign(conf, props)} />
}

