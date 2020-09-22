import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.less'
import { BrowserRouter as Router, Route, Switch,Link} from "react-router-dom"
import Index from '../containers/Index/Index'
import MyOvertime from '../containers/MyOvertime/MyOvertime'
import OvertimeOrder from '../containers/OvertimeOrder/OvertimeOrder'
import Signin from '../containers/Signin/index'
import thirdLog from '../../../login/third-log-method/index'; 

class Overtime extends Component{
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
                       <Route path='/myovertime' component={MyOvertime}></Route>
                       <Route path='/overtimeorder' component={OvertimeOrder}></Route>
                       <Route path='/signin' component={Signin}></Route>
                   </Switch>
               </Router>
            </React.Fragment>
        )
    }
}

thirdLog(() => {
    ReactDOM.render(<Overtime/>, document.getElementById('app'));
});
