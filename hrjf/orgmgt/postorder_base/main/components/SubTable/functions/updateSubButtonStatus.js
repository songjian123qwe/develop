// 初始化按钮状态
/**
 *
 * @param inheritflag 是否完全继承
 * @param isEditing 是否编辑状态
 */
export default function updateSubButtonStatus(inheritflag, isEditing) {
    this.props.editTable.setStatus('postseries_levelrelation', isEditing && !inheritflag ? 'edit' : 'browse');
    this.props.button.setButtonDisabled({
        addline: inheritflag || !isEditing,
        delline: inheritflag || !isEditing
    });
}