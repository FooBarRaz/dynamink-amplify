import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import CreateTargetSite from "./feautures/links/create/CreatePage";
import { store } from './app/store';
import { Provider } from 'react-redux';

const routing = (
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route path="/create">
                        <CreateTargetSite/>
                    </Route>
                    <Route path="/">
                        <App/>
                    </Route>
                </Switch>
            </Router>
        </Provider>
    </React.StrictMode>
)
ReactDOM.render(
    routing,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

