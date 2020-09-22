const INLINE_STYLES = [
	{ key: 1, label: 'B', styleName: 'BOLD', title: '加粗', iconClassName: '' },
	{ key: 2, label: 'I', styleName: 'ITALIC', title: '斜体', iconClassName: 'italic' },
	{ key: 3, label: 'U', styleName: 'UNDERLINE', title: '下划线', iconClassName: 'underline' },
	{ key: 4, label: 'S', styleName: 'DELETE', title: '删除线', iconClassName: 'line-through' },
	{ key: 5, label: 'M', styleName: 'BORDER_BOTTOM', title: '下边界下划线', iconClassName: 'border_bottom' }
	// { key: 5, label: 'T', styleName: 'BG', title: '代码块', iconClassName: 'bg' }
];
const InlineStyleMap = {
	BOLD: {
		fontWeight: 'bold'
	},
	ITALIC: {
		fontStyle: 'italic'
	},
	UNDERLINE: {
		textDecoration: 'underline'
	},
	DELETE: {
		textDecoration: 'line-through'
	},
	BORDER_BOTTOM: {
		borderBottom: '1px solid #000'
	}
};
export { INLINE_STYLES, InlineStyleMap };
