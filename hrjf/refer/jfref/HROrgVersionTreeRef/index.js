/**
 * Created by wwb on 2018/8/23.
 */
import { high } from 'nc-lightapp-front';

const { Refer } = high;

export default function (props = {}) {
    var conf = { multiLang: { domainName: 'hrjf', currentLocale: 'zh-CN',  moduleId: 'refer6005'},
        refType: 'tree',
        refName: 'jf6005-000014',/* 国际化处理： HR业务单元版本*/
        placeholder: 'jf6005-000014',/* 国际化处理： HR业务单元版本*/
        refCode: 'hrjf.refer.HROrgVersionTreeRef',
        queryTreeUrl: '/nccloud/hrjf/ref/HROrgVersionTreeRef.do',
        rootNode: { refname: 'jf6005-000011', refpk: 'root' ,isleaf: false},/* 国际化处理： 业务单元*/
        columnConfig: [{name: [ 'jf6005-000002', 'jf6005-000003' ],code: [ 'refcode', 'refname' ]}],/* 国际化处理： 编码,名称*/
        isMultiSelectedEnabled: false,
    };

    return <Refer {...Object.assign(conf, props)} />
}
