import { all } from 'redux-saga/effects';
import { authSagas } from './authenticateSaga';
import { oAuthSagas } from './oAuthenticateSaga';
import { registrationSagas } from './registrationSaga';

export default function * rootSaga () {
    yield all([
        ...authSagas,
        ...registrationSagas,
        ...oAuthSagas
    ]);
}
