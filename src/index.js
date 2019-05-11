import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Form from './componets/register/form';
import Header from './componets/partials/header';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';
ReactDOM.render(
    <Router>
        <Header/>
            <Switch>
                <Route path="/" exact={true} component={Form} />
                <Route path="/register" component={Form} />
            </Switch>
    </Router>
, document.getElementById('root'));


serviceWorker.unregister();
