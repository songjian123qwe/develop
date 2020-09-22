// 初始化按钮状态

export default function updateButtonStatus() {
    const {isEditing, pk_postseries} = this.state;
    const flag = !pk_postseries || pk_postseries === 'custom_root';
    this.props.button.setButtonVisible({
        add: !isEditing,
        edit: !isEditing,
        delete: !isEditing,
        copy: !isEditing,
        print_group: !isEditing,
        print_link: !isEditing,
        print: !isEditing,
        output: !isEditing,
        refresh: !isEditing,
        save: isEditing,
        cancel: isEditing
    });

    this.props.button.setButtonDisabled({
        add: false,
        edit: flag,
        delete: flag,
        copy: false,
        print_group: flag,
        print_link: flag,
        print: flag,
        output: flag,
        refresh: false,
        addline: !isEditing,
        delline: !isEditing
    });
}
