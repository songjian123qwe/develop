/**
 * 保存
 */

import proFetch from '../../../public/functions/project-fetch'

export default (data) => {

    return proFetch({
        url: '/nccloud/hrjf/hrdept/HRDeptSaveAction.do',
        body: data,
    });
};
