// 初始化按钮状态

export default function updateButtonStatus() {
    const {isEditing, isDetail, postFlag, pk_post, postcode} = this.state;
    this.props.button.setButtonVisible({
        add: !isEditing,
        edit: !isEditing,
        delete: !isEditing,
        copy: !isEditing,
        query: !isDetail,
        refresh: !isDetail,
        enable: !isDetail, //启用
        // enable: !isDetail, //启用
        file: !isEditing,
    });

    this.props.button.setButtonDisabled({
        add: false,
        edit: !postFlag,
        delete: !postFlag,
        copy: !postFlag,
        query: false,
        refresh: false,
        // enable_group: !isDetail,
        enable: true,//  启用,
        disable: true,//  停用
        file: !isDetail || !pk_post,
        print: isDetail || !pk_post,
        output: !isDetail || !pk_post
    });
}
