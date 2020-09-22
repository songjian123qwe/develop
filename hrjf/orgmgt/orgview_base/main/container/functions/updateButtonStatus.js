// 初始化按钮状态

export default function updateButtonStatus() {
    const {page, orgVal} = this.state;
    const {nodeType} = this.props;
    this.props.button.setButtonVisible({
        save: page === 'img',
        build: page === 'main',
        refresh: page === 'main',
        more: page === 'img'
    });
    this.props.button.setButtonDisabled({
        build: nodeType === 'ORG_NODE' && (!orgVal || !orgVal.refpk),
        refresh: nodeType === 'ORG_NODE' && (!orgVal || !orgVal.refpk)
    });
}
