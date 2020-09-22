/**
 * Created by wwb on 2018/8/23.
 */
import {high} from 'nc-lightapp-front';
const {Refer} = high;
export default function (props = {}) {
    var conf = {
        unitProps: {
            multiLang: {
                domainName: 'uapbd',
                currentLocale: 'zh-CN',
                moduleId: 'refer_uapbd',
            },
            queryTreeUrl: '/nccloud/riaorg/ref/AdminOrgDefaultTreeRef.do',
            refType: "tree",
            //isMultiSelectedEnabled:true
            placeholder: '',/* 国际化处理： 集团*/
            refName: 'refer-000176',/* 国际化处理： 集团*/
            rootNode: {refname: 'refer-000176', refpk: 'root'},/* 国际化处理： 集团*/
            queryCondition: {
                TreeRefActionExt: "nccloud.web.hrhi.pub.sqlbuilder.OrgRefSqlBuilder"
            }
        },
        multiLang: {domainName: 'hrjf', currentLocale: 'zh-CN', moduleId: 'refer6005'},
        refType: 'tree',
        refName: 'jf6005-000006',/* 国际化处理： HR部门*/
        placeholder: 'jf6005-000006',/* 国际化处理： HR部门*/
        refCode: 'hrjf.refer.HRDeptTreeRef',
        queryTreeUrl: '/nccloud/hrjf/ref/HRDeptTreeRef.do',
        rootNode: {refname: 'jf6005-000005', refpk: 'root', isleaf: false},/* 国际化处理： 部门*/
        columnConfig: [{
            name: ['jf6005-000007', 'jf6005-000008', 'jf6005-000009'],/* 国际化处理： 部门编码,部门名称,公司*/
            code: ['refcode', 'refname', "org_orgs.name"]
        }],
        isMultiSelectedEnabled: false
    };
    return <Refer {...Object.assign(conf, props)} />
}
