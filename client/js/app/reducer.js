import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import features from './features';

const reducers = {};
// Setup all reducers which are used in this module
features.filter((feature) => feature.reducer).forEach((feature) => {
    reducers[feature.constants.NAME] = feature.reducer;
});
// Setup other routerReducer for history accesses
reducers.router = routerReducer;

const appReducer = combineReducers(reducers);

// Flush out the (sensitive) data when logged out to prevent
// data leak when switching between users with different permissions.
const rootReducer = (state, action) => {
    if (action.type === 'CLEAR_STORE') {
        /* Code for handling Redux persist
        Object.keys(state).forEach((key) => {
            storage.removeItem(`persist:${key}`);
        });
        */
        state = undefined;
    }

    return appReducer(state, action);
};

export default rootReducer;
