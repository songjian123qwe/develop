// 初始化按钮状态

export default function disabledEditButton(flag) {

    this.props.button.setButtonDisabled({
        edit: flag,
        delete: flag
    });
}
