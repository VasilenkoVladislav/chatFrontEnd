import { all } from 'redux-saga/effects';
import { authSagas } from './authenticateSaga';
import { conversationsSagas } from './conversationsSaga';
import { messagesSagas } from './messagesSaga';
import { oAuthSagas } from './oAuthenticateSaga';
import { registrationSagas } from './registrationSaga';

export default function * rootSaga () {
    yield all([
        ...authSagas,
        ...conversationsSagas,
        ...messagesSagas,
        ...oAuthSagas,
        ...registrationSagas
    ]);
}
