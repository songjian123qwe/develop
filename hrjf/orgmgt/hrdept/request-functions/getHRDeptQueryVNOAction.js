/**
 * 查询部门新版本
 */

import proFetch from '../../../public/functions/project-fetch'

export default (data) => {

    return proFetch({
        url: '/nccloud/hrjf/hrdept/HRDeptQueryVNOAction.do',
        body: data,
    });
};
