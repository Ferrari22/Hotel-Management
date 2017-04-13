import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';

import LoginDesign from './LoginDesign.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';

ReactDOM.render((
    <Router>
        <Route path="/" component={LoginDesign}>
            <IndexRoute component={Login} />
            <Route path="login" component={Login} />
            <Route path="register" component={Register} />
        </Route>
    </Router>
), document.getElementById('root'));