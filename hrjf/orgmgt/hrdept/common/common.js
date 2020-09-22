/**
 *
 * Created by shenzaifang on 2019-08-22
 */
import {getAppPageConfig} from 'src/hrpub/common/utils/utils'
let config = getAppPageConfig();
export const COMMON = {
    config: {
        appcode: config.appcode||'60051030',
        pagecode: config.pagecode||'60051030p'
    },
    pagecodeValues: {
        'p_deptchange': '60051030p_change',
        'p_deptpost': '60051030p_post',
        'p_deptpsn': '60051030p_psn',
        // 'financeorg_v': '10100ORG_financeorgversion',
        'p_StruVersion': '60051030p_StruVersion',
        'p_deptversion': '60051030p_deptversion',
        'p_deptversionQuery': '60051030p_deptversionQuery',
        'p_copy': '60051030p_copy',
    }
};
