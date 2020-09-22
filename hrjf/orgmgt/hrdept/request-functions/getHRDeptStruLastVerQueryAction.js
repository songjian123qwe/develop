/**
 * 部门结构版本化查询最新版本
 */

import proFetch from '../../../public/functions/project-fetch'

export default (data) => {

    return proFetch({
        url: '/nccloud/hrjf/hrdept/HRDeptStruLastVerQueryAction.do',
        body: data,
    });
};
