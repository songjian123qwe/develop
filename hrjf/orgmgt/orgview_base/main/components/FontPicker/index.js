import React, {Component} from 'react';
import './index.less';
import SelectFont from "./components/SelectFont";
import {base} from 'nc-lightapp-front';
import ColorPicker from "../ColorPicker";

const {NCButton} = base;

class FontPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            /*fontFamily: '黑体',
            fontSize: 16,
            bold: false,
            italic: false,
            fontColor: '#000000',*/
            selectFontVisible: false
        };
        this.colorClick = this.colorClick.bind(this);
        this.selectColor = this.selectColor.bind(this);
        this.selectedFont = this.selectedFont.bind(this);
    }

    selectColor(value) {
        this.props.onChange({
            common_font_color: value
        })
    }

    colorClick() {
        this.colorNode.selectColor();
    }

    selectedFont(font) {
        this.props.onChange({
            common_font: {
                family: font.family,
                size: font.size,
                style: font.style
            }
        })
    }

    render() {
        const {selectFontVisible} = this.state;
        const {json} = this.props;
        const {common_font_color} = this.props.value;
        const {family, size, style} = this.props.value.common_font;
        return (
            <div className='font-picker'>
                <div className='font-display'>
                    {/* <div className='cross-title'>字体</div>*/}
                    <div className='content'>
                        <div style={{
                            fontSize: size,
                            fontFamily: family,//familyList.find(item => item.title === family).value,
                            fontWeight: style === 1 || style === 3 ? 'bold' : 'normal',
                            fontStyle: style === 2 || style === 3 ? 'italic' : 'normal',
                            color: common_font_color
                        }}>{family}</div>
                        <NCButton onClick={() => this.setState({
                            selectFontVisible: true
                        })}>{json['jf6005-000421']}{/* 国际化处理： 字体*/}
                        </NCButton>
                        <div className='color-picker-container'>
                            <ColorPicker
                                json={json}
                                ref={node => this.colorNode = node}
                                value={common_font_color}
                                onChange={this.selectColor}/>
                        </div>
                        {/*<input onChange={this.selectColor}
                               defaultValue={common_font_color}
                               value={common_font_color}
                               ref={node => this.colorNode = node}
                               type='color'
                               style={{display: 'none'}}/>*/}
                        <NCButton onClick={this.colorClick}>{json['jf6005-000425']}</NCButton>{/* 国际化处理： 颜色*/}
                    </div>
                </div>
                <SelectFont {...this.props.value.common_font}
                            json={json}
                            familyList={this.props.familyList}
                            visible={selectFontVisible}
                            selectedFont={this.selectedFont}
                            onClose={() => this.setState({
                                selectFontVisible: false
                            })}/>
            </div>
        );
    }
}


export default FontPicker;
