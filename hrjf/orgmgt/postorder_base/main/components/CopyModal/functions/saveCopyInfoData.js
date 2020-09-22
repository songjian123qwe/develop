import {hrAjax as proFetch} from 'src/hrpub/common/utils/utils';

export default function saveCopyInfoData() {
    const {editTable, pk_org, syncTree, pk_postseries, refreshAll} = this.props;
    const allRows = editTable.getAllRows('copyinfo');
    const requireFlag = editTable.checkRequired('copyinfo', allRows);
    if (!requireFlag) return;
    const fatherVo = syncTree.getSyncTreeValue('postOrder', pk_postseries);
    const postData = {
        pk_org,
        pk_father: !pk_postseries || pk_postseries === 'custom_root' ? '' : pk_postseries,
        pk_joblevelsys: !pk_postseries || pk_postseries === 'custom_root' ? '' : fatherVo.nodeData.nodeValue.pk_joblevelsys,
        grid: JSON.stringify({
            model: {
                areacode: 'copyinfo',
                rows: allRows
            }
        })
    };

    return proFetch({
        url: '/nccloud/hrjf/postseries/saveCopyAction.do',
        body: postData,
    })
        .then((res) => {
            if (res.success) {
                this.closeModal();
                refreshAll();
            }
        });
}