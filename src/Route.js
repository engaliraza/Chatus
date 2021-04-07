import React, { Component } from 'react';
import { Route, Router,Switch } from 'react-router-dom';
import history from './History';
import Sign from './components2/signin';
import Messages from './components2/messages';
class Routers extends Component {
    render() {
        return (
            <Router history={history}>
                    <Switch>
                    <Route exact path="/"               component={Sign}/>
                    <Route exact path="/messanger"      component={Messages} />
                    
                    </Switch>
                
            </Router>
        )
    }
}


export default Routers;