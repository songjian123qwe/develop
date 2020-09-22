export default function removeLeaf() {
    const {syncTree} = this.props;
    let lastPk = this.state.pk_postseries;
    const lastLeafVal = syncTree.getSyncTreeValue('postOrder', lastPk);
    const lastFatherPk = lastLeafVal.nodeData.nodeValue.father_pk || 'custom_root';
    const lastFatherVal = syncTree.getSyncTreeValue('postOrder', lastFatherPk);
    const lastIndex = lastFatherVal.children.findIndex(item => item.refpk === lastPk);
    syncTree.delNodeSuceess('postOrder', lastPk);
    const newFatherVal = syncTree.getSyncTreeValue('postOrder', lastFatherPk);
    let newPk = '';
    if (!newFatherVal.children || newFatherVal.children.length === 0) {
        newPk = newFatherVal.refpk
    } else {
        const newIndex = Math.min(lastIndex, newFatherVal.children.length - 1);
        newPk = newFatherVal.children[newIndex].refpk;
    }
    syncTree.setNodeSelected('postOrder', newPk);
    this.setState({
        pk_postseries: newPk
    });
    syncTree.openNodeByPk('postOrder', newPk);
}
