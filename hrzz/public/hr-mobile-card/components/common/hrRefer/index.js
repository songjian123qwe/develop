import React from 'react'
import './index.less'
import {InputToSpan} from "../hrInputItem";
import ReferPanel from '../referPanel';
import {isT, Maybe} from "../../../utils";
import {langCheck} from "../../../../mobile/utils/utils";

let referPanelNode = {};
export default class HrRefer extends React.Component {
    showReferPanel = async () => {
        let key = this.props.attrcode || this.props.code;
        let result = await this.props.onBeforeHandle();
        if (!result) {
            return
        }
        referPanelNode[key].show();
    };

    getDisplay = (value) => {
        return isT(value, 'Object') ? Maybe.of(value).getValue(['display']) : value
    };

    render() {
        let props = this.props;
        let {editable, classname, refVal, disabled, isFieldChange, showIsChangedIndicator} = props;
        const display = this.getDisplay(refVal);
        let content = editable && (!disabled) ? (
            <div
                className={"am-list-item am-list-item-middle hr-input-item "
                + (showIsChangedIndicator && isFieldChange ? ' am-filed-changed ' : '') + classname}
                onClick={this.showReferPanel}>
                <div className="am-list-line">
                    <div className="am-list-content">
                        {this.props.label}
                        <i style={{color: '#e14c46', display: props.required ? '' : 'none'}}>*</i>
                    </div>
                    {display ? <div className="am-input-control">
                        {
                            display
                        }
                    </div> : <div className="am-list-extra">
                        {langCheck("0000PUB-000018")}
                    </div>}
                    <div className="am-list-arrow am-list-arrow-horizontal"/>
                </div>
            </div>
        ) : (
            <InputToSpan {...props}>
                {this.props.label}
            </InputToSpan>
        );
        return (
            <React.Fragment>
                {
                    content
                }
                <ReferPanel {...props}
                            ref={node => referPanelNode[props.attrcode || props.code] = node}/>
            </React.Fragment>
        )
    }
}
