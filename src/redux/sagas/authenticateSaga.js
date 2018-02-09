import { put, call, takeLatest, select } from 'redux-saga/effects';
import { SIGN_IN_REQUEST, SIGN_OUT_REQUEST } from 'redux/constansActions';
import { signInSuccess, signInError, signOutSuccess, signOutError } from 'redux/actions/entities/authenticateActions';
import api from 'configApi/apiAuth';
import { getHeadersState } from 'redux/selectors/entities/headersSelectors';
import { replace } from 'react-router-redux';
import { updateHeadersClient } from 'redux/sagas/headersSaga';

export function * signIn ({payload}) {
    const { email, password } = payload;
    const { data, headers } = yield call(api.authentications.signIn, email, password);
    if (data && headers) {
        yield call(updateHeadersClient, headers);
        yield put(signInSuccess(data));
        yield put(replace('/'));
    } else {
        yield put(signInError());
    }
}

export function * signOut () {
    const headers = yield select(getHeadersState);
    const { error } = yield call(api.authentications.signOut, headers);
    if (!error) {
        yield put(signOutSuccess());
        yield put(replace('/sign_in'));
    } else {
        yield put(signOutError());
    }
}

export function * watchSignIn () {
    yield takeLatest(SIGN_IN_REQUEST, signIn);
}

export function * watchSignOut () {
    yield takeLatest(SIGN_OUT_REQUEST, signOut);
}

export const authSagas = [
    watchSignIn(),
    watchSignOut()
];
