import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ApproveComponent from "../../approve-base/container";
import {COMMON} from "../common/const";
import thirdLog from "../../../login/third-log-method"

class EditApprove extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <div className={'edit-approve'}>
                <ApproveComponent
                    COMMON={COMMON}
                />
            </div>
        )
    }
}

thirdLog(()=>{
    ReactDOM.render(<EditApprove/>, document.getElementById('app'));
});
