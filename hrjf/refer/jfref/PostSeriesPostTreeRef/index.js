/**
 * Created by wwb on 2018/8/23.
 */
import { high } from 'nc-lightapp-front';

const { Refer } = high;

export default function (props = {}) {
    var conf = { multiLang: { domainName: 'hrjf', currentLocale: 'zh-CN',  moduleId: 'refer6005'},
        refType: 'gridTree',
        refName: 'jf6005-000031',/* 国际化处理： 岗位(左岗位序列树)*/
        placeholder: 'jf6005-000031',/* 国际化处理： 岗位(左岗位序列树)*/
        refCode: 'hrjf.refer.PostSeriesPostTreeRef',
        queryTreeUrl: '/nccloud/hrjf/ref/PostSeriesPostTreeRef.do',
        queryGridUrl: '/nccloud/hrjf/ref/PostSeriesPostGridRef.do',
        rootNode: { refname: 'jf6005-000032', refpk: 'root' ,isleaf: false},/* 国际化处理： 岗位序列*/
        columnConfig: [{
            name: [ 'jf6005-000002', 'jf6005-000003' ,'jf6005-000005', 'jf6005-000009'],/* 国际化处理： 编码,名称,部门,公司*/
            code: [ 'refcode', 'refname' ,"org_dept.name","org_orgs.name"]
        }],
        isMultiSelectedEnabled: false,
    };

    return <Refer {...Object.assign(conf, props)} />
}
