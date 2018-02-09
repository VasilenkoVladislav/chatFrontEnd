import { put, call, takeLatest } from 'redux-saga/effects';
import { registrationSuccess, registrationError } from 'redux/actions/entities/registrationActions';
import api from 'configApi/apiAuth';
import { REGISTRATION_REQUEST } from 'redux/constansActions';
import { replace } from 'react-router-redux';
import { signInSuccess } from 'redux/actions/entities/authenticateActions';
import { updateHeadersClient } from 'redux/sagas/headersSaga';

function * registration ({payload}) {
    const { data, headers } = yield call(api.registrations.registration, payload);
    if (data && headers) {
        yield put(registrationSuccess());
        yield call(updateHeadersClient, headers);
        yield put(signInSuccess(data));
        yield put(replace('/'));
    } else {
        yield put(registrationError());
    }
}

function * watchRegistration () {
    yield takeLatest(REGISTRATION_REQUEST, registration);
}

export const registrationSagas = [
    watchRegistration()
];
