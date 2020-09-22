/**
 * Created by wanghongxiang on 2018/5/21.
 */
import { high } from 'nc-lightapp-front';

const { Refer } = high;

export default function (props = {}) {
    var conf = { multiLang: {  domainName: 'hrzz', currentLocale: 'zh-CN',  moduleId: 'refer6065'},
        refType: 'grid',
        refName: 'refer-000004',/* 国际化处理： 证书类型*/
        placeholder: 'refer-000004',/* 国际化处理： 证书类型*/
        refCode: 'nc.ui.licensedoc.ref.LicenseDocRefModel',
        queryGridUrl: '/nccloud/hrga/ref/LicenseDocGridRef.do',
        columnConfig: [{name: [  'refer-000005' ,'refer-000006'],code: [ 'refcode', 'refname' ]}],/* 国际化处理： 编码,名称*/
        isMultiSelectedEnabled: false
    };

    return <Refer {...Object.assign(conf, props)} />
}
