/**
 * Created by wwb on 2018/8/23.
 */
import { high } from 'nc-lightapp-front';

const { Refer } = high;

export default function (props = {}) {
    var conf = { multiLang: { domainName: 'hrjf', currentLocale: 'zh-CN',  moduleId: 'refer6005'},
        refType: 'gridTree',
        refName: 'jf6005-000024',/* 国际化处理： 职务*/
        placeholder: 'jf6005-000024',/* 国际化处理： 职务*/
        refCode: 'hrjf.refer.JobTypeJobRef',
        queryTreeUrl: '/nccloud/hrjf/ref/JobTypeTreeRef.do',
        queryGridUrl: '/nccloud/hrjf/ref/JobTypeJobGridRef.do',
        rootNode: { refname: 'jf6005-000025', refpk: 'root' ,isleaf: false},/* 国际化处理： 职务类别*/
        columnConfig: [{
            name: [ 'jf6005-000026', 'jf6005-000027' ],/* 国际化处理： 职务编码,职务名称*/
            code: [ 'refcode', 'refname']
        }],
        isMultiSelectedEnabled: false,
    };

    return <Refer {...Object.assign(conf, props)} />
}
