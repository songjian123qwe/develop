/**
 * 取消
 */

import proFetch from '../../../public/functions/project-fetch'

export default (data) => {

    return proFetch({
        url: '/nccloud/hrjf/hrdept/HRDeptCancelAction.do',
        body: data,
    });
};
