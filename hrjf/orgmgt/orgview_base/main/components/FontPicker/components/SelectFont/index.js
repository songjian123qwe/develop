import React, {Component} from 'react';
import './index.less';
import {base} from 'nc-lightapp-front';
import {sizeList} from './data';

const {NCModal, NCButton, NCCheckbox} = base;
const {Header: NCModalHeader, Body: NCModalBody, Footer: NCModalFooter} = NCModal;

class SelectFont extends Component {
    constructor(props) {
        super(props);
        this.state = {
            family: '',
            size: '',
            bold: false,
            italic: false,
        };
        this.closeModal = this.closeModal.bind(this);
        this.selectOne = this.selectOne.bind(this);
        this.beSure = this.beSure.bind(this);
        this.modalEnterHandle = this.modalEnterHandle.bind(this);
    }

    modalEnterHandle() {
        const {family, size, style} = this.props;
        this.setState({
            family,
            size,
            bold: style === 1 || style === 3,
            italic: style === 2 || style === 3,
        })
    }

    closeModal() {
        this.props.onClose && this.props.onClose();
    }

    selectOne(item) {
        this.setState(item);
    }

    beSure() {
        const {bold, italic} = this.state;
        let style = 0;
        if (bold) {
            style += 1;
        }
        if (italic) {
            style += 2;
        }
        this.state.style = style;
        this.props.selectedFont(this.state);
        this.closeModal();
    }

    render() {
        const {family, size, italic, bold} = this.state;
        const {visible, familyList, json} = this.props;
        return (
            <NCModal
                show={visible}
                onHide={this.closeModal}
                backdrop={'static'}
                className='select-font'
                onEntered={this.modalEnterHandle}
            >
                <NCModalHeader
                    closeButton={true}
                >
                    {json['jf6005-000420']}{/* 国际化处理： 选择字体*/}
                </NCModalHeader>
                <NCModalBody>
                    <div className='picker'>
                        <div className='top'>
                            <div className='left'>
                                <div className='title'>{json['jf6005-000421']}:</div>
                                {/* 国际化处理： 字体*/}
                                <input value={family} readOnly className='font-family'/>
                                <div className='selection'>
                                    {
                                        familyList.map(item => <div key={item}
                                                                    className={item === family ? 'selected' : ''}
                                                                    onClick={() => this.selectOne({family: item})}>{item}</div>)
                                    }
                                </div>
                            </div>
                            <div className='right'>
                                <div className='style'>
                                    <div className='title'>{json['jf6005-000422']}</div>
                                    {/* 国际化处理： 样式*/}
                                    <div className='checkboxes'>
                                        <NCCheckbox colors="dark" checked={bold}
                                                    onChange={() => this.selectOne({bold: !bold})}>
                                            {json['jf6005-000423']}{/* 国际化处理： 粗体*/}
                                        </NCCheckbox>
                                        <NCCheckbox colors="dark" checked={italic}
                                                    onChange={() => this.selectOne({italic: !italic})}>
                                            {json['jf6005-000424']}{/* 国际化处理： 斜体*/}
                                        </NCCheckbox>
                                    </div>
                                </div>
                                <div className='size'>
                                    <div className='title'>{json['jf6005-000503']}</div>
                                    {/* 国际化处理： 大小*/}
                                    <input type='number' value={size} readOnly className='font-size'/>
                                    <div className='selection'>
                                        {
                                            sizeList.map(item => <div key={item}
                                                                      className={item === size ? 'selected' : ''}
                                                                      onClick={() => this.selectOne({size: item})}>{item}</div>)
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='bottom'>
                            <input className='result' defaultValue={'abcABC123'}
                                   style={{
                                       fontSize: size,
                                       fontFamily: family,
                                       fontWeight: bold ? 'bold' : 'normal',
                                       fontStyle: italic ? 'italic' : 'normal'
                                   }}/>
                        </div>
                    </div>
                </NCModalBody>
                <NCModalFooter>
                    <NCButton
                        colors="primary"
                        onClick={this.beSure}
                    >
                        {json['jf6005-000007']}{/* 国际化处理： 确认*/}
                    </NCButton>
                    <NCButton
                        shape="border"
                        onClick={this.closeModal}
                    >
                        {json['jf6005-000008']}{/* 国际化处理： 取消*/}
                    </NCButton>
                </NCModalFooter>
            </NCModal>
        );
    }
}


export default SelectFont;
