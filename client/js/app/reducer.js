import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import features from './features';

const reducers = {};
// Setup all reducers which are used in this module
features.filter((feature) => feature.reducer).forEach((feature) => {
    reducers[feature.constants.NAME] = feature.reducer;
});
// Setup other reducers
reducers.router = routerReducer;

export default combineReducers(reducers);
