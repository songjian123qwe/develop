/**
 * 获取组织体系版本化数据
 *              type:  "3":人力资源组织体系；  "4":行政组织体系；   "org":组织版本化
 */
import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default (type, data={}) => {
    if(type==='org'){
        return proFetch({
            url: '/nccloud/hrjf/orginfo/OrgInfoQueryVNOAction.do',
            body: data,
        });
    }else{
        data["type"] = type;
        return proFetch({
            url: '/nccloud/hrjf/orginfo/OrgInfoStruVersionAction.do',
            method: 'post',
            body: data
        });
    }
};
