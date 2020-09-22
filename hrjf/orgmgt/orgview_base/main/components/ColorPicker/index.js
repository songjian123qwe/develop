import React, {Component} from 'react';
import './index.less';
import {base} from 'nc-lightapp-front';
import SketchPicker from './react-color';

const {NCModal, NCButton} = base;
const {Header: NCModalHeader, Body: NCModalBody, Footer: NCModalFooter} = NCModal;

class ColorPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: '',
            selectColorVisible: false
        };
        this.selectColor = this.selectColor.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleChangeComplete = this.handleChangeComplete.bind(this);
        this.beSure = this.beSure.bind(this);
    }

    selectColor() {
        this.setState({
            selectColorVisible: true,
            color: this.props.value
        })
    }

    closeModal() {
        this.setState({
            selectColorVisible: false
        })
    }

    beSure() {
        this.props.onChange(this.state.color);
        this.closeModal();
    }

    handleChangeComplete(value) {
        this.setState({
            color: value.hex
        })
    }

    render() {
        const {color, selectColorVisible} = this.state;
        const {json, value} = this.props;
        return (
            <div>
                <div className='color-display'
                     style={{'background-color': value}}
                     onClick={this.selectColor}/>
                <NCModal
                    show={selectColorVisible}
                    onHide={this.closeModal}
                    backdrop={'static'}
                    className='color-picker-modal'
                    size='sm'
                >
                    <NCModalHeader
                        closeButton={true}
                    >
                        {json['jf6005-000509']}
                    </NCModalHeader>
                    <NCModalBody>
                        <div className='sketch-color-picker'>
                            <SketchPicker
                                color={color}
                                onChangeComplete={this.handleChangeComplete}
                            />
                        </div>
                    </NCModalBody>
                    <NCModalFooter>
                        <NCButton
                            colors="primary"
                            onClick={this.beSure}
                        >
                            {json['jf6005-000007']}
                        </NCButton>
                        <NCButton
                            shape="border"
                            onClick={this.closeModal}
                        >
                            {json['jf6005-000008']}
                        </NCButton>
                    </NCModalFooter>
                </NCModal>
            </div>
        );
    }
}


export default ColorPicker;
