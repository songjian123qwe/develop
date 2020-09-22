/**
 * 查询部门新版本
 */

import proFetch from '../../../public/functions/project-fetch'
import {
    cacheTools
} from 'nc-lightapp-front';

export default function HRDeptQueryVNOAction(pk_dept) {
    let postData = {
        pk_dept:pk_dept
    };
    return proFetch({
        url: '/nccloud/hrjf/hrdept/HRDeptQueryVNOAction.do',
        body: postData,
    })
        .then((res) => {
            if (res.success) {
                if(res.data){
                    let formData = {
                        dept_v_head: {
                            rows: res.data.dept_v_head.dept_v_head.rows
                        }
                    };
                    this.props.form.setAllFormValue(formData);
                    this.props.table.setAllTableData('dept_v', res.data.dept_v.dept_v);
                    let allPkorg = [];
                    let rows  = res.data.dept_v.dept_v.rows;
                    rows.map(item=>{
                        let values = item.values;
                        if(values.hasOwnProperty('pk_vid')){
                            allPkorg.push(values.pk_vid.value)
                        }
                    });
                    cacheTools.set('allpks', allPkorg);
                }else{
                    cacheTools.set('allpks', []);
                }
                this.props.form.setFormStatus('dept_v_head','edit');
            }
        });
}
