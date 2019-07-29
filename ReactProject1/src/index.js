import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './code/Login';
import Register from './code/Register';
import HomePage from './code/HomePage';
import * as serviceWorker from './serviceWorker';
import {Router, Route} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import Echarts from './code/ColumnarECharts'

const history = createBrowserHistory();

ReactDOM.render(
    <Router history={history}>
        <div>
            <Route exact={true} path="/" component={App}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <Route path="/homepage" component={HomePage}/>
            <Route path="/echarts" component={Echarts}/>
        </div>
    </Router>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
