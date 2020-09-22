// 获取表格的数据

import proFetch from '../../../public/functions/project-fetch'

export default (data) => {

    return proFetch({
        url: '/nccloud/hrjf/hrdept/HRDeptQueryAction.do',
        body: data,
    });
};
