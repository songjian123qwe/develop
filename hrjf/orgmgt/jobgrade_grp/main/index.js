/**
 * Created by wanghongxiang on 2018/5/8.
 */
import JobGrade from '../../jobgrade_base/main'
import {createPage} from 'nc-lightapp-front';
import {createBillinfoPage} from "../../../public/functions/createBillinfoPage";

let config = {
    appcode: '60052040',
    pagecode: '60052040p',
    //nodeTitle: this.state.json['jf6005-000174'],/* 国际化处理： 职等-集团*/
    nodeType: 'GROUP_NODE'
};

let condition = {
    pagecodeValues: {}
};
if (window.location.href.match(/(localhost|127\.0\.0\.1):3006/g)) {
    condition.config = config;
}
createBillinfoPage(condition, JobGrade, {context: config}).then(res => res = null);
