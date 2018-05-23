import React from 'react';
import {Provider} from 'react-redux';
import {Route} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';
import axios from 'axios';

import route from './route';
import history from './history';
import store from './store';

import {reAuthenticate} from 'src/auth/actions';

// Setup user token if exist at the page load
if (localStorage.getItem('jwtToken')) {
    store.dispatch(reAuthenticate(localStorage.getItem('jwtToken')));
}

// Add a request interceptor to global axios requests
axios.interceptors.request.use((config) => {
    // Add JWT token before the request is sent if the url includes auth
    if (config.url.includes('/api/auth/')) {
        config.headers.authorization = localStorage.getItem('jwtToken');
    }
    return config;
}, (error) => Promise.reject(error));


const App = () => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Route component={route} />
        </ConnectedRouter>
    </Provider>
);

// Hot reloading support for development mode
const hot = (__DEV__) ? require('react-hot-loader').hot : undefined;
const exportedApp = (__DEV__) ? hot(module)(App) : App;
export default exportedApp;
