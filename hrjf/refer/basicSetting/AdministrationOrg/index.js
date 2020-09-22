
import { high } from 'nc-lightapp-front';

const { Refer } = high;

export default function (props = {}) {
    var conf = { 
        multiLang: {  
            domainName: 'hrys', 
            currentLocale: 'zh-CN',  
            moduleId: 'ys6003'
        },
        refType: 'tree',
        refName: 'ys6003-000127',/* 国际化处理： 行政组织体系*/
        placeholder: 'ys6003-000127',/* 国际化处理： 行政组织体系*/
        refCode: 'hrys.refer.basicSetting.AdministrationOrg',
        queryTreeUrl: '/nccloud/hrys/ref/BudAOSOrgRefModel.do',
        columnConfig: [{name: [ 'ys6003-000029', 'ys6003-000030'],code: [ 'refcode', 'refname' ]}],/* 国际化处理： 项目编码,项目名称*/
    };

    return <Refer {...Object.assign(conf, props)} />
}
