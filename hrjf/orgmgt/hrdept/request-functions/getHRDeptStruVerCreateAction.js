/**
 * 部门机构版本化创建
 */

import proFetch from '../../../public/functions/project-fetch'

export default (data) => {

    return proFetch({
        url: '/nccloud/hrjf/hrdept/HRDeptStruVerCreateAction.do',
        body: data,
    });
};
