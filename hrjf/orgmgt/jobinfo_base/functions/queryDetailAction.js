/**
 *
 * Created by shenzaifang on 2019-07-30
 */
import {hrAjax} from 'src/hrpub/common/utils/utils';
import {COMMON} from "../common/common";

export function queryDetailAction(pk_job) {
    return new Promise(resolve => {
        hrAjax({
            url: '/nccloud/hrjf/job/queryDetailAction.do',
            data: {
                pk_job
            },
            success: res => {
                this.copyjobData.left5 = res.data;
                let {bodys, head} = res.data;
                this.state.gridrelationTable.forEach(item=>{
                    let tableId = item.code;
                    if(bodys.hasOwnProperty(tableId)){
                        this.props.cardTable.setTableData(tableId, {rows: bodys[tableId].rows});
                    }else{
                        this.props.cardTable.setTableData(tableId, {rows: []});
                    }
                });

                if (bodys.hasOwnProperty(COMMON.levelrelationId)) {
                    let levelrelation = bodys[COMMON.levelrelationId];
                    this.setState({
                        referValue: levelrelation.rows.map(v => ({refpk: v.values.pk_joblevel.value}))
                    })
                } else {
                    this.setState({
                        referValue: []
                    })
                }
                let basedetail = head[COMMON.basedetailId];
                let isEnable = null;
                if (basedetail) {
                    this.props.form.setAllFormValue({[COMMON.basedetailId]: basedetail});
                    this.props.form.setAllFormValue({'basememo': basedetail})
                    isEnable = basedetail.rows[0].values.enablestate;
                }
                this.setState({
                    isEnable
                });
                resolve(res)
            }
        })
    })
}
