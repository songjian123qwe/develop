/**
 * 联查岗位
 */

import proFetch from '../../../public/functions/project-fetch'

export default (data) => {

    return proFetch({
        url: '/nccloud/hrjf/hrdept/QueryPostAction.do',
        body: data,
    });
};
