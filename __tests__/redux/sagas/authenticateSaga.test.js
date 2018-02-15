import * as constansActions from 'redux/constansActions';
import * as sagas from 'redux/sagas/authenticateSaga';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { signInSuccess, signInError, signOutSuccess, signOutError } from 'redux/actions/entities/authenticateActions';
import api from 'configApi/apiAuth';
import { cloneableGenerator } from 'redux-saga/utils';
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
    describe('signIn Saga test', () => {
        const data = {
            email: 'v@v.com',
            password: 'aa123456'
        };
        const action = { type: constansActions.SIGN_IN_REQUEST, payload: data };
        const generator = cloneableGenerator(sagas.signIn)(action);
        let clone = null;
        it('must call api.authentications.signIn', () => {
            const actualValue = generator.next().value;
            clone = generator.clone();
            expect(actualValue).toEqual(call(api.authentications.signIn, data));
        });
        it('must call updateHeadersClient if request to API return success', () => {
            const actualValue = generator.next({data: user.info, headers}).value;
            expect(actualValue).toEqual(call(updateHeadersClient, headers));
        });
        it('must call signInSuccess if request to API return success', () => {
            const actualValue = generator.next().value;
            expect(actualValue).toEqual(put(signInSuccess(user.info)));
        });
        it('must call replace to / if request to API return success', () => {
            const actualValue = generator.next().value;
            expect(actualValue).toEqual(put(replace('/')));
        });
        it('must call signInError if request to API return error', () => {
            const actualValue = clone.next({error: 'Error'}).value;
            expect(actualValue).toEqual(put(signInError()));
        });
    });
    describe('signOut Saga test', () => {
        const generator = cloneableGenerator(sagas.signOut)();
        let clone = null;
        it('must call select getHeadersState', () => {
            const actualValue = generator.next().value;
            expect(actualValue).toEqual(select(getHeadersState));
        });
        it('must call api.authentications.signOut', () => {
            const actualValue = generator.next(headers).value;
            clone = generator.clone();
            expect(actualValue).toEqual(call(api.authentications.signOut, headers));
        });
        it('must call api.authentications.signOut if request to API return success', () => {
            const actualValue = generator.next({}).value;
            expect(actualValue).toEqual(put(signOutSuccess()));
        });
        it('must call replace to /sign_in if request to API return success', () => {
            const expectedValue = generator.next({}).value;
            expect(expectedValue).toEqual(put(replace('/sign_in')));
        });
        it('must call signOutError if request to API return error', () => {
            const actualValue = clone.next({error: 'Error'}).value;
            expect(actualValue).toEqual(put(signOutError()));
        });
    });
});
