
import { high } from 'nc-lightapp-front';

const { Refer } = high;

export default function (props = {}) {
    var conf = { 
        multiLang: {  
            domainName: 'hrys', 
            currentLocale: 'zh-CN',  
            moduleId: 'ys6003'
        },
        refType: 'grid',
        refName: 'ys6003-000031',/* 国际化处理： 年度预算项目*/
        placeholder: 'ys6003-000031',/* 国际化处理： 年度预算项目*/
        refCode: 'hrys.refer.basicSetting.AnnualBudgetProjectGridRef',
        queryGridUrl: '/nccloud/hrys/ref/BudgetitemCodeRefModel.do',
        columnConfig: [{name: [ 'ys6003-000029', 'ys6003-000030','ys6003-000121'],code: [ 'refcode', 'refname','budget_type_name']}],/* 国际化处理： 项目编码,项目名称*/
        isShowUnit: false,
        isMultiSelectedEnabled: false
    };

    return <Refer {...Object.assign(conf, props)} />
}
