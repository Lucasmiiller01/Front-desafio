import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Form from './componets/delivery/form';
import List from './componets/delivery/list';
import Profile from './componets/delivery/profile';
import Header from './componets/partials/header';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';
ReactDOM.render(
    <Router>
        <Header/>
            <Switch>
                <Route path="/" exact={true} component={Form} />
                <Route path="/List" component={List} />
                <Route path="/delivery/:id" component={Profile} />
            </Switch>
    </Router>
, document.getElementById('root'));


serviceWorker.unregister();
