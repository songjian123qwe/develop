import React, {Component} from 'react';
import './index.less'
class FirstGroup extends Component{
    constructor (props) {
        super(props);
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
                    <span class="add-txt">创建一条交接事项</span>
                </div>
            </div>
        )
    }
}
export default FirstGroup

// ReactDOM.render(<FirstGroup/>, document.getElementById('app'));