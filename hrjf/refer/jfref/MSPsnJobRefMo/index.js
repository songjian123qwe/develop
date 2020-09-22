/**
 * Created by wwb on 2018/8/23.
 */
import { high } from 'nc-lightapp-front';

const { Refer } = high;

export default function (props = {}) {
    var conf = {
        multiLang: { domainName: 'hrjf', currentLocale: 'zh-CN', moduleId: 'refer6005' },
        refType: 'gridTree',
        refName: 'jf6005-000044',
        placeholder: 'jf6005-000044',
        refCode: 'hrjf.refer.MSPsnJobRef',
        queryTreeUrl: '/nccloud/hrjf/ref/MSPsnJobTreeRef.do',
        queryGridUrl: '/nccloud/hrjf/ref/MSPsnJobGridRef.do',
        rootNode: { refname: 'jf6005-000043', refpk: 'root', isleaf: false },
        columnConfig: [{
            name: ['jf6005-000002', 'jf6005-000003'],
            code: ['refcode', 'refname']
        }],
        isMultiSelectedEnabled: true,
    };

    return <Refer {...Object.assign(conf, props)} />
}