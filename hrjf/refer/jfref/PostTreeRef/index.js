/**
 * Created by wwb on 2018/8/23.
 */
import {high} from 'nc-lightapp-front';

const {Refer} = high;

export default function (props = {}) {
    var conf = {
        multiLang: {domainName: 'hrjf', currentLocale: 'zh-CN', moduleId: 'refer6005'},
        refType: 'tree',
        refName: 'jf6005-000036',/* 国际化处理： 岗位HR*/
        placeholder: 'jf6005-000036',/* 国际化处理： 岗位HR*/
        refCode: 'hrjf.refer.PostTreeRef',
        queryTreeUrl: '/nccloud/hrjf/ref/PostTreeRef.do',
        rootNode: {refname: 'jf6005-000037', refpk: 'root', isleaf: false},/* 国际化处理： 岗位*/
        columnConfig: [{
            name: ['jf6005-000038', 'jf6005-000039', 'jf6005-000005', 'jf6005-000009'],/* 国际化处理： 岗位编码,岗位名称,部门,公司*/
            code: ['refcode', 'refname', "org_dept.name", "org_orgs.name"]
        }],
        treeConfig: {
            name: ['jf6005-000038', 'jf6005-000039', 'jf6005-000005', 'jf6005-000009'],/* 国际化处理： 岗位编码,岗位名称,部门,公司*/
            code: ['refcode', 'refname', 'org_dept.name', 'org_orgs.name']
        },//树表中显示内容配置，如果觉得不需要联系guobgf
        isMultiSelectedEnabled: false,
    };

    return <Refer {...Object.assign(conf, props)} />
}
