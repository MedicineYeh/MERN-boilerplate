import axios from 'src/common/myAxios';
import {push} from 'react-router-redux';

import * as t from 'src/user/actionTypes';
import {ok, fail} from 'src/common/actionHelpers';

const authAction = (type, response) => ({type: type, payload: response.data});
const authError = (type, response) => ({type: type, payload: response.data.error});

export function reAuthorize(token, redirectTo) {
    if (typeof token !== 'string') throw Error('invalid argument: token must be a string');

    return (dispatch) => {
        axios.post('/api/reauth', {token}).then((response) => {
            dispatch(authAction(ok(t.REAUTH_USER), response));
            if (redirectTo) dispatch(push(redirectTo));
        }).catch((err) => dispatch(authError(fail(t.REAUTH_USER), err.response)));
    };
}

export function signup(user, redirectTo = '/') {
    return (dispatch) => {
        axios.post('/api/signup', user).then((response) => {
            dispatch(authAction(ok(t.AUTH_USER), response));
            dispatch(push(redirectTo));
        }).catch((err) => dispatch(authError(fail(t.AUTH_USER), err.response)));
    };
}

export function login(user, redirectTo = '/') {
    return (dispatch) => {
        dispatch({type: t.AUTH_USER});
        axios.post('/api/login', user).then((response) => {
            dispatch(authAction(ok(t.AUTH_USER), response));
            dispatch(push(redirectTo));
        }).catch((err) => dispatch(
            authError(fail(t.AUTH_USER), {
                data: {
                    error: 'Incorrect username/password',
                },
            })
        ));
    };
}

export function logout() {
    return {type: ok(t.UNAUTH_USER)};
}
