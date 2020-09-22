/**
 * 新增
 */

import proFetch from '../../../public/functions/project-fetch'

export default (data) => {
    return proFetch({
        url: '/nccloud/hrjf/hrdept/HRDeptAddAction.do',
        body: data,
    });
};
