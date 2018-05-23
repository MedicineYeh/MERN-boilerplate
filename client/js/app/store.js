import {applyMiddleware, createStore} from 'redux';
import {createLogger} from 'redux-logger';

import thunk from 'redux-thunk';
import multi from 'redux-multi';
import promiseMiddleware from 'redux-promise-middleware';
import {routerMiddleware} from 'react-router-redux';

import history from './history';
import reducer from './reducer';


const middlewares = [
    multi,
    promiseMiddleware(),
    thunk,
    // Intercepting and dispatching navigation actions
    routerMiddleware(history),
    createLogger({
        collapsed: (getState, action, logEntry) => !logEntry.error,
        duration: true,
    }),
];

function configureStore(reducer, initialState) {
    const store = createStore(reducer, initialState);

    // Enable Webpack hot module replacement for reducers
    if (module.hot) {
        module.hot.accept('./reducer', () => {
            const nextRootReducer = require('./reducer').default;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}

export default configureStore(reducer, applyMiddleware(...middlewares));
