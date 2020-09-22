/**
 * 部门更名执行
 */

import proFetch from '../../../public/functions/project-fetch'

export default (data) => {

    return proFetch({
        url: '/nccloud/hrjf/hrdept/RenameDeptExecAction.do',
        body: data,
    });
};
