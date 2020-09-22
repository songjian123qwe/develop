import React, {Component} from 'react';
import './index.less'
import { getMultiLang } from '../../../public/mobile/utils/getMultiLang'
class FirstGroup extends Component{
    constructor (props) {
        super(props);
        this.state={
            json: {}
        }
    }
    componentWillMount () {
        this.getMultiLangFunc()
    }
    getMultiLangFunc = () => {
        getMultiLang({
            domainName:'hrzz',
            moduleId: 'hrzzmb',
            callback: (json,status,init) =>{
                this.setState({
                    json:json,
                },()=>{
                })
            }
        })
    }
    render () {
        const {
            firstClick = ()=>{},
        } = this.props;
        return (
            <div class="handover-default"  >
                <div class="default-frame">
                    <i class="icon hrfont hr-preview "></i>
                </div>
                <div class="default-add" onClick={firstClick}>
                    <i class="icon hrfont hr-plus02 "></i>
                    <span class="add-txt">{this.state.json['hrzzmb-000115']/* 国际化处理： 创建一条交接事项*/}</span>
                </div>
            </div>
        )
    }
}
export default FirstGroup
