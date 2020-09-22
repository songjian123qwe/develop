/**
 * 部门更名
 */

import proFetch from '../../../public/functions/project-fetch'

export default (data) => {

    return proFetch({
        url: '/nccloud/hrjf/hrdept/RenameDeptAction.do',
        body: data,
    });
};
