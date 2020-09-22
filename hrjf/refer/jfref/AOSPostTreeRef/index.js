/**
 * Created by wwb on 2018/8/23.
 */
import { high } from 'nc-lightapp-front';

const { Refer } = high;

export default function (props = {}) {
    var conf = { multiLang: { domainName: 'hrjf', currentLocale: 'zh-CN',  moduleId: 'refer6005'},
        refType: 'gridTree',
        refName: 'jf6005-000004',/* 国际化处理： 岗位(左部门树)*/
        placeholder: 'jf6005-000004',/* 国际化处理： 岗位(左部门树)*/
        refCode: 'hrjf.refer.DeptPostTreeRef',
        queryTreeUrl: '/nccloud/hrjf/ref/AOSDeptTreeRef.do',
        queryGridUrl: '/nccloud/hrjf/ref/AOSPostGridRef.do',
        rootNode: { refname: 'jf6005-000005', refpk: 'root' ,isleaf: false},/* 国际化处理： 部门*/
        columnConfig: [{
            name: [ 'jf6005-000002', 'jf6005-000003' ],/* 国际化处理： 编码,名称*/
            code: [ 'refcode', 'refname' ]
        }],
        isMultiSelectedEnabled: false,
    };

    return <Refer {...Object.assign(conf, props)} />
}
