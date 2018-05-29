import axios from 'src/common/myAxios';
import {push} from 'react-router-redux';

import * as t from 'src/user/actionTypes';
import {ok, fail} from 'src/common/actionHelpers';

export function reAuthorize(token, redirectTo) {
    if (typeof token !== 'string') throw Error('invalid argument: token must be a string');

    return async (dispatch) => {
        try {
            const response = await axios.post('/api/reauth', {token});
            dispatch({type: ok(t.REAUTH_USER), payload: response.data});
            if (redirectTo) dispatch(push(redirectTo));
        } catch (err) {
            dispatch({type: fail(t.REAUTH_USER), payload: err.response.data.error});
        }
    };
}

export function signup(user, redirectTo = '/') {
    return async (dispatch) => {
        try {
            const response = await axios.post('/api/signup', user);
            dispatch({type: ok(t.AUTH_USER), payload: response.data});
            dispatch(push(redirectTo));
        } catch (err) {
            dispatch({type: fail(t.AUTH_USER), payload: err.response.data.error});
        }
    };
}

export function login(user, redirectTo = '/') {
    return async (dispatch) => {
        dispatch({type: t.AUTH_USER});
        try {
            const response = await axios.post('/api/login', user);
            dispatch({type: ok(t.AUTH_USER), payload: response.data});
            dispatch(push(redirectTo));
        } catch (err) {
            dispatch({type: fail(t.AUTH_USER), payload: 'Incorrect username/password'});
        }
    };
}

export function logout() {
    return [{type: ok(t.UNAUTH_USER)}, {type: 'CLEAR_STORE'}];
}
