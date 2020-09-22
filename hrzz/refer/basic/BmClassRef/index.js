/**
 * Created by hukai on 2018/8/27.
 */
import {high} from 'nc-lightapp-front';

const {Refer} = high;

export default function (props = {}) {
    var conf = {
        multiLang: {domainName: 'hrzz', currentLocale: 'zh-CN', moduleId: 'refer6065'},
        refType: 'grid',
        refName: 'refer-000000',
        placeholder: 'refer-000000',
        refCode: 'hrzz.refer.BMClassRef',
        queryGridUrl: '/nccloud/hrzz/bmfile/BmClassGridModel.do',
        columnConfig: [{
            name: ['refer-000001', 'refer-000002'],
            code: ['refcode', 'refname']
        }],/* 国际化处理： 编码,名称*/
        isMultiSelectedEnabled: true
    };

    return <Refer {...Object.assign(conf, props)} />
}
