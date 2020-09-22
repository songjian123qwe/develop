import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.less'
import { BrowserRouter as Router, Route, Switch,Link} from "react-router-dom"
import Index from '../containers/Index/Index'
import MyTrip from '../containers/MyTrip/MyTrip'
import TripOrder from '../containers/TripOrder/TripOrder'
import TripProcess from '../containers/TripProcess/TripProcess'
import ReviseTrip from '../containers/ReviseTrip/ReviseTrip'
import thirdLog from '../../../login/third-log-method/index'; 
class BusinessTrip extends Component{
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
                            <Route exact path="/" component={Index} />
                            <Route path="/mytrip" component={MyTrip} />
                            <Route path="/triporder" component={TripOrder} />
                            <Route path="/index" component={Index} />
                            <Route path="/tripprocess" component={TripProcess} />
                            <Route path="/triprevise" component={ReviseTrip} />
                        </Switch>
                </Router>
            </React.Fragment>
        )
    }
}

thirdLog(() => {
    ReactDOM.render(<BusinessTrip/>, document.getElementById('app'));
});
