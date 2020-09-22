import proFetch from "../../../../../public/functions/project-fetch";
import setPostData from "./setPostData";

/**
 * 启用停用
 * @param flag
 */
export default function enableAction(flag) {
    const {form, editTable} = this.props;
    const postData = {
        head: JSON.stringify({
            model: {
                areacode: 'baseInfo',
                rows: form.getAllFormValue('baseInfo').rows
            }
        }),
        bodys: JSON.stringify({
            model: {
                areacode: 'postseries_levelrelation',
                rows: editTable.getAllRows('postseries_levelrelation')
            }
        })
    }, url = flag ? '/nccloud/hrjf/postseries/enbleAction.do' : '/nccloud/hrjf/postseries/disableAction.do';

    proFetch({
        url,
        body: postData,
    })
        .then((res) => {
            if (res.success) {
                if (res.success) {
                    setPostData.call(this, res.data);
                    updateTreeData.call(this, flag);
                }
            }
        });
}

function updateTreeData(flag) {
    const {syncTree, pk_postseries} = this.props;
    let treeData = syncTree.getSyncTreeValue('postOrder');
    updateClassForCur(treeData, pk_postseries, flag);
}

function updateClassForCur(treeData, pk_postseries, flag) {
    treeData.length && treeData.some(v => {
        if (v.key === pk_postseries) {
            v.titleStyle = flag ? {} : {color: 'lightgrey'};
            v.nodeData.nodeValue.enablestate = flag ? '2' : '3';
            return true;
        }
        v.children && updateClassForCur(v.children, pk_postseries, flag);
    })
}
