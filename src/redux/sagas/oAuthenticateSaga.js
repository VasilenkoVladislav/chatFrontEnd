import { signInSuccess, signInError } from 'redux/actions/entities/authenticateActions';
import { takeEvery, put, call } from 'redux-saga/effects';
import { VALIDATE_TOKEN_REQUEST, OAUTHENTICATE_REQUEST } from 'redux/constansActions';
import api from 'configApi/apiAuth';
import { delay } from 'redux-saga';
import { oAuthTokenFormat } from 'default/tokenFormat';
import { openPopupOAuthSignIn } from 'redux/utils/popup';
import queryString from 'query-string';
import { replace } from 'react-router-redux';
import { updateHeadersClient } from 'redux/sagas/headersSaga';
import { validateTokenRequest } from 'redux/actions/entities/oAuthenticateActions';

export function * oAuthSignIn ({payload}) {
    const popup = openPopupOAuthSignIn(payload);
    yield call(listenForCredentials, popup, payload);
}

export function * validateToken ({payload}) {
    const { data, headers } = yield call(api.authentications.validateToken, payload);
    if (data && headers) {
        yield call(updateHeadersClient, headers);
        yield put(signInSuccess(data));
        yield put(replace('/'));
    } else {
        yield put(signInError());
    }
}

export function * listenForCredentials (popup, payload) {
    const params = getAllParams(popup.location);
    if (params) {
        const validCredentials = oAuthTokenFormat(params);
        yield put(validateTokenRequest(validCredentials));
        popup.close();
    } else if (popup.closed) {
        yield put(signInError());
    } else {
        yield call(delay, 20);
        yield call(listenForCredentials, popup, payload);
    }
}

export function getAllParams (location) {
    try {
        const rawQs = location ? location.search : '';
        const qs = rawQs.replace('?', '');
        return qs ? queryString.parse(qs) : null;
    } catch (e) {
        // empty
    }
}

export function * watchOAuthSignIn () {
    yield takeEvery(OAUTHENTICATE_REQUEST, oAuthSignIn);
}

export function * watchValidateToken () {
    yield takeEvery(VALIDATE_TOKEN_REQUEST, validateToken);
}

export const oAuthSagas = [
    watchOAuthSignIn(),
    watchValidateToken()
];
