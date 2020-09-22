import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {DTextarea} from '../../../../public/mobile/components/index'
import './index.less'



class TextareaBox extends Component{
    constructor (props) {
        super(props);
    }
    componentWillMount () {
    }
    render () {
        const {
            onClick = () => {},
            onCancel = () => {},
            textChange = ()=> {},
            textBlur = ()=> {},
            value,
            json,
            maxFault,
            maxNum
        } = this.props;
        return (
            <div class="textareabg" > 
                <div className="box">
                    <DTextarea
                        placeholder = {json['hrzzmb-000014']}
                        maxNum = {maxNum}
                        maxFault = {maxFault}
                        value = {value}
                        textChange = {textChange}
                        textBlur = {textBlur}
                    />
                    <div className="control clearfix">
                    {/* 取消 */}
                        <span className="cancle fl" onClick={onCancel}>{json['hrzzmb-000024']}</span>
                        <span className="line"></span>
                        {/* 完成 */}
                        <span className="confirm fr" onClick={onClick}>{json['hrzzmb-000025']}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default TextareaBox