/**
 * 联查人员
 */

import proFetch from '../../../public/functions/project-fetch'

export default (data) => {

    return proFetch({
        url: '/nccloud/hrjf/hrdept/QueryPersonAction.do',
        body: data,
    });
};
