import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.less'
import { BrowserRouter as Router, Route, Switch,Link} from "react-router-dom"
import Index from '../containers/Index/Index' // 请假申请
import MyLeave from '../containers/MyLeave/MyLeave' // 我的请假 
import LeaveOrder from '../containers/LeaveOrder/LeaveOrder' // 请假详细
import ReviseLeave from '../containers/ReviseLeave/ReviseLeave' // 销假
import LeaveProcess from '../containers/LeaveProcess/LeaveProcess' // 流程页面
import thirdLog from '../../../login/third-log-method/index';       
						 
class Leave extends Component{
    constructor (props) {
        super(props);
        this.state = {
            json:{}
        }
    }
    
    render () {
        const localtion = window.location.pathname
        return (
            <React.Fragment>
                <Router basename={localtion} >
                        <Switch>
                            <Route exact path="/" component={Index} json={"ddddddd"} />
                            <Route path="/myleave" component={MyLeave} />
                            <Route path="/index" component={Index} />
                            <Route path="/leaveorder" component={LeaveOrder} />
                            <Route path="/leaverevise" component={ReviseLeave} />
                            <Route path="/leaveprocess" component={LeaveProcess} />

                        </Switch>
                </Router>
            </React.Fragment>
        )
    }
}
thirdLog(() => {
    ReactDOM.render(<Leave/>, document.getElementById('app'));
});
