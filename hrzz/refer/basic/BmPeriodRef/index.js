/**
 * Created by hukai on 2018/8/27.
 */
import {high} from 'nc-lightapp-front';

const {Refer} = high;

export default function (props = {}) {
    const conf = {
        multiLang: {domainName: 'hrzz', currentLocale: 'zh-CN', moduleId: 'refer6065'},
        refType: 'tree',
        refName: 'refer-000003',
        placeholder: 'refer-000003',
        refCode: 'hrzz.refer.BMAllPeriodRef',
        queryTreeUrl: '/nccloud/hrzz/bmfile/BmAllPeriod.do',
        rootNode: {refname: 'refer-000003', refpk: 'root', isleaf: false},
        isMultiSelectedEnabled: false,
        onlyLeafCanSelect: true
    };

    return <Refer {...Object.assign(conf, props)} />
}
