import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';
import {conventFontToLocal} from './convert';

export default function getImageConf(callback) {
    proFetch({
        url: '/nccloud/hrjf/orgchart/valiHasConfigAction.do',
        body: {},
    })
        .then((res) => {
            if (res.success) {
                res.data.data.common_font = conventFontToLocal(res.data.data.common_font);
                callback && callback(res.data.data);
            }
        });
}
