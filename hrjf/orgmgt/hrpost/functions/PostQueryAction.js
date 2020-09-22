/**
 * 岗位查询
 */

import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';
import {cacheTools} from 'nc-lightapp-front';

export default function PostQueryAction(func_type, pk_org, showDisable, typePk, pageInfo, tableId) {
    let {
        queryOid,
        searchModalValue,
    } = this.state;

    if (!searchModalValue) {
        searchModalValue = this.props.search.getQueryInfo("postquery", true);
    }
    let data = {
        oid: queryOid,
        ...searchModalValue,
    };
    let postData = {
        ...data,
        pageInfo,
        func_type,
        pk_org,
        showDisable,
        typePk
    };
    return proFetch({
        url: '/nccloud/hrjf/post/PostQueryAction.do',
        body: postData,
    })
        .then((res) => {
            if (!res.success || !res.data) {
                this.updateState({
                    pageInfo: {
                        pageIndex: 1,
                        pageSize: 10,
                        total: 0,
                        totalPage: 0
                    },
                    isDetailEdit: false,
                    isShowDetail: false
                });
                cacheTools.set('allpks', []);
                return
            }
            let pageInfo = res.data.postlist.pageInfo;
            this.updateState({
                pageInfo,
                isDetailEdit: false,
                isShowDetail: false
            });
            let postlist = res.data.postlist;
            let falg = true;
            if (postlist) {
                this.props.editTable.setTableData(tableId, postlist);
                let allpks = [];
                postlist.rows.map(item => {
                    allpks.push(item.values.pk_post.value)
                });
                cacheTools.set('allpks', allpks);
                falg = allpks.length < 1
            }

            this.setBtnDisSta({
                print: falg,             // 打印
                output: falg,            // 输出
            });
        });
}
