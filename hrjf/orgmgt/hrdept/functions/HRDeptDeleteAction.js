/**
 * 删除节点
 */

import getHRDeptDeleteAction from '../request-functions/getHRDeptDeleteAction.js';
import {toast} from 'nc-lightapp-front';

export default function HRDeptDeleteAction(formId, treeId, pk, formdata, nextRefPK) {
    let postData = {
        formdata
    };
    return getHRDeptDeleteAction(postData)
        .then((res) => {
            if (!res.success) return;
            toast({color: "success", content: this.state.json['jf6005-000164']});
            let index = this.allRefPk.indexOf(pk);
            this.allRefPk.splice(index, 1);
            this.props.syncTree.delNodeSuceess(treeId, pk);
            let selectRecord = this.props.syncTree.getSelectNode(treeId);
            if (selectRecord && selectRecord.refpk === pk) {
                if(nextRefPK){
                    let nodeData = this.props.syncTree.getSyncTreeValue(treeId,nextRefPK);
                    this.setTreeOrgDept(nodeData);
                    this.props.syncTree.setNodeSelected(treeId, nextRefPK);
                    this.HRDeptQueryOneAction();
                    nodeData = null;
                }else{
                    this.emptyRightData();
                }
            }
            index = null;
            selectRecord = null;
        });
}
