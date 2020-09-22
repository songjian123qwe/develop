import React, { Component } from 'react';
import StyleButton from './style_button';
import { base } from 'nc-lightapp-front';
import {
	RichUtils,
	SelectionState,
	CompositeDecorator,
	ContentState,
	convertFromRaw,
	EditorState,
	convertFromHTML,
	convertToRaw,
	Modifier,
	CharacterMetadata
} from 'draft-js';
const { NCIcon, NCModal, NCButton, NCTabs, NCUpload, NCFormControl } = base;
// import { INLINE_STYLES } from '../config/inline_type';
export default class AlignControls extends Component {
	constructor(props) {
		super(props);
	}
	setAlign = (type) => {
		const { editorState } = this.props;
		this.props.onChange(RichUtils.toggleBlockType(editorState, type));
	};
	render() {
		const { editorState } = this.props;
		const blockType = editorState
			.getCurrentContent()
			.getBlockForKey(editorState.getSelection().getStartKey())
			.getType();
		return (
			<div className="hrEditor-controls">
				{/* <StyleButton
					iconClassName={''}
					key={''}
					active={'uf-align-justify' === blockType}
					label={''}
					onToggle={this.setAlign}
					style={'uf-align-justify'}
				>
					<NCIcon type="uf-align-justify" />
                </StyleButton> */}
				<StyleButton
					iconClassName={''}
					key={''}
					active={'uf-align-left' === blockType}
					label={''}
					onToggle={this.setAlign}
					style={'uf-align-left'}
				>
					<NCIcon type="uf-align-left" />
				</StyleButton>
				<StyleButton
					iconClassName={''}
					key={''}
					active={'uf-align-center' === blockType}
					label={''}
					onToggle={this.setAlign}
					style={'uf-align-center'}
				>
					<NCIcon type="uf-align-center" />
				</StyleButton>
				<StyleButton
					iconClassName={''}
					key={''}
					active={'uf-align-right' === blockType}
					label={''}
					onToggle={this.setAlign}
					style={'uf-align-right'}
				>
					<NCIcon type="uf-align-right" />
				</StyleButton>
			</div>
		);
	}
}
