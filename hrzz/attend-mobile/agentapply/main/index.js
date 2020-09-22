import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.less'
import { BrowserRouter as Router, Route, Switch,Link} from "react-router-dom"
import Index from '../containers/Index/Index'
import AgentRecord from '../containers/AgentRecord/AgentRecord'
import OvertimeOrder from '../containers/OvertimeOrder/OvertimeOrder'
import LeaveOrder from '../containers/LeaveOrder/LeaveOrder'
import thirdLog from '../../../login/third-log-method/index'; 

class AgentApply extends Component{
    constructor (props) {
        super(props);
        this.state = {
        }
    }
    
    render () {
        const localtion = window.location.pathname
        return (
            <React.Fragment>
               <Router basename={localtion}>
                   <Switch>
                       <Route path='/' exact component={Index}></Route>
                       <Route path='/index' component={Index}></Route>
                       <Route path='/agentrecord' component={AgentRecord}></Route>
                       <Route path='/overtimeorder' component={OvertimeOrder}></Route>
                       <Route path='/leaveorder' component={LeaveOrder}></Route>
                   </Switch>
               </Router>
            </React.Fragment>
        )
    }
}

thirdLog(() => {
    ReactDOM.render(<AgentApply/>, document.getElementById('app'));
});
