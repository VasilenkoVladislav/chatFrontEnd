import * as constansActions from 'redux/constansActions';
import * as sagas from 'redux/sagas/authenticateSaga';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { signInSuccess, signInError, signOutSuccess, signOutError } from 'redux/actions/entities/authenticateActions';
import api from 'configApi/apiAuth';
import { getHeadersState } from 'redux/selectors/entities/headersSelectors';
import { headers } from 'data/headersData';
import { replace } from 'react-router-redux';
import { updateHeadersClient } from 'redux/sagas/headersSaga';
import { user } from 'data/userData';

describe('authenticateSaga', () => {
    describe('watcher test', () => {
        it('watchSignIn test', () => {
            const generator = sagas.watchSignIn();
            const expectedValue = takeLatest(constansActions.SIGN_IN_REQUEST, sagas.signIn);
            const actualValue = generator.next().value;
            expect(actualValue).toEqual(expectedValue);
        });
        it('watchSignOut test', () => {
            const generator = sagas.watchSignOut();
            const expectedValue = takeLatest(constansActions.SIGN_OUT_REQUEST, sagas.signOut);
            const actualValue = generator.next().value;
            expect(actualValue).toEqual(expectedValue);
        });
    });
    describe('signIn Saga test (success)', () => {
        const data = {
            email: 'v@v.com',
            password: 'aa123456'
        };
        const action = { type: constansActions.SIGN_IN_REQUEST, payload: data };
        const generator = sagas.signIn(action);
        it('must call api.authentications.signIn', () => {
            const actualValue = generator.next().value;
            expect(actualValue).toEqual(call(api.authentications.signIn, user.info.email, 'aa123456'));
        });
        it('must call updateHeadersClient', () => {
            const actualValue = generator.next({data: user.info, headers}).value;
            expect(actualValue).toEqual(call(updateHeadersClient, headers));
        });
        it('must call signInSuccess', () => {
            const actualValue = generator.next().value;
            expect(actualValue).toEqual(put(signInSuccess(user.info)));
        });
        it('must call replace to /', () => {
            const actualValue = generator.next().value;
            expect(actualValue).toEqual(put(replace('/')));
        });
    });
    describe('signIn Saga test (error)', () => {
        const data = {
            email: 'email',
            password: 'password'
        };
        const action = { type: constansActions.SIGN_IN_REQUEST, payload: data };
        const generator = sagas.signIn(action);
        it('must call api.authentications.signIn', () => {
            const actualValue = generator.next().value;
            expect(actualValue).toEqual(call(api.authentications.signIn, 'email', 'password'));
        });
        it('must call signInError', () => {
            const actualValue = generator.next({error: 'Error'}).value;
            expect(actualValue).toEqual(put(signInError()));
        });
    });
    describe('signOut Saga test (success)', () => {
        const generator = sagas.signOut();
        it('must call select getHeadersState', () => {
            const actualValue = generator.next().value;
            expect(actualValue).toEqual(select(getHeadersState));
        });
        it('must call api.authentications.signOut', () => {
            const actualValue = generator.next(headers).value;
            expect(actualValue).toEqual(call(api.authentications.signOut, headers));
        });
        it('must call api.authentications.signOut', () => {
            const actualValue = generator.next({}).value;
            expect(actualValue).toEqual(put(signOutSuccess()));
        });
        it('must call replace to /sign_in', () => {
            const expectedValue = generator.next({}).value;
            expect(expectedValue).toEqual(put(replace('/sign_in')));
        });
    });
    describe('signOut Saga test (error)', () => {
        const generator = sagas.signOut();
        it('must call select getHeadersState', () => {
            const actualValue = generator.next().value;
            expect(actualValue).toEqual(select(getHeadersState));
        });
        it('must call api.authentications.signOut', () => {
            const actualValue = generator.next({}).value;
            expect(actualValue).toEqual(call(api.authentications.signOut, {}));
        });
        it('must call signOutError', () => {
            const actualValue = generator.next({error: 'Error'}).value;
            expect(actualValue).toEqual(put(signOutError()));
        });
    });
});
