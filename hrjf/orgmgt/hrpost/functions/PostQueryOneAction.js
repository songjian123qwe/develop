/**
 * 岗位查询
 */

import {
    cardCache
} from 'nc-lightapp-front';

let {setDefData, getDefData} = cardCache;
import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';
import AddCondition from "../../../public/functions/addCondition";

export default function PostQueryOneAction(pk_post, pk_org, cb) {
    // 清空详情页数据
    this.emptyDetailPage();
    this.props.button.setButtonDisabled({
        "card_edit": !pk_post,
        "card_refresh": !pk_post,
        "card_print": !pk_post,
        "card_output": !pk_post
    });
    if(!pk_post){
        return
    }
    let postData = {
        pk_post,
        pk_org
    };
    this.updateState({
        detailLoading: true
    });
    return proFetch({
        url: '/nccloud/hrjf/post/PostQueryOneAction.do',
        body: postData,
    })
        .then((res) => {
            if (!res.success) {
                return
            }
            if(cb && typeof cb === 'function'){
                cb()
            }
            this.props.cardPagination.setCardPaginationId({id: pk_post, status: 1});
            if (res.data) {
                // 设置详情页数据
                if (res.data.head && res.data.head.om_post) {
                    let rowValues = res.data.head.om_post.rows[0].values;
                    let formdata = {
                        'om_post': {
                            rows: res.data.head.om_post.rows
                        }
                    };
                    this.props.form.setAllFormValue(formdata);
                    let queryCondition = {
                        // isShowAll: false,
                        // isShowDisbleOrg: true,
                        // pk_group:this.businessInfo.groupId,
                        // pk_hrorg:this.state.queryActionPkorg,
                        pk_org: rowValues.pk_org.value
                    };
                    let meta = this.props.meta.getMeta();
                    AddCondition(meta["om_post"], {
                        ...queryCondition
                    }, 'pk_dept');
                    // 岗位基本信息 直接上级参照当前组织的岗位
                    AddCondition(meta["om_post"], {
                        "pk_hrorg": this.state.queryActionPkorg,
                        GridRefActionExt: 'nccloud.web.hrjf.post.sqlbuilder.SuporiorSQLBuilder',
                        isShowDisable: false,
                        pk_org:rowValues.pk_org.value
                    }, 'suporior');
                    this.props.meta.setMeta(meta);
                }

                this.updateState({
                    detailLoading: false
                },()=>{
                    let tableData = res.data.bodys;

                    this.state.gridrelationTable.forEach(item => {
                        if (item.moduletype !== 'table') return;
                        let tableId = item.code;
                        this.props.cardTable.toggleCardTable(tableId, false);
                        if (tableData.hasOwnProperty(tableId)) {
                            this.props.cardTable.setTableData(tableId, tableData[tableId]);
                            if (tableId === 'post_levelrelation') {
                                setDefData('hrjf_hrpost', 'hrjf.hrpost.post_levelrelation', tableData[tableId])
                            }
                        } else {
                            if (tableId === 'post_levelrelation') {
                                setDefData('hrjf_hrpost', 'hrjf.hrpost.post_levelrelation', null);
                            }
                            this.props.cardTable.setTableData(tableId, {rows: []})
                        }
                    });

                    if(this.state.isDetailEdit){
                        this.setDetailPageStatus('edit');
                    }else{
                        this.setDetailPageStatus('browse');
                    }
                });
            }
        });
}
