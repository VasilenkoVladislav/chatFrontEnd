import * as constansActions from 'redux/constansActions';
import * as sagas from 'redux/sagas/registrationSaga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { registrationSuccess, registrationError } from 'redux/actions/entities/registrationActions';
import api from 'configApi/apiAuth';
import { cloneableGenerator } from 'redux-saga/utils';
import { headers } from 'data/headersData';
import { replace } from 'react-router-redux';
import { signInSuccess } from 'redux/actions/entities/authenticateActions';
import { updateHeadersClient } from 'redux/sagas/headersSaga';
import { user } from 'data/userData';

describe('registrationSaga', () => {
    describe('watcher test', () => {
        it('watchRegistration test', () => {
            const generator = sagas.watchRegistration();
            const expectedValue = takeLatest(constansActions.REGISTRATION_REQUEST, sagas.registration);
            const actualValue = generator.next().value;
            expect(actualValue).toEqual(expectedValue);
        });
    });
    describe('registration Saga test', () => {
        const data = {
            email: 'v@v.com',
            name: 'Vladislav',
            password: 'aa123456',
            confirm_password: 'aa123456'
        };
        const action = { type: constansActions.REGISTRATION_REQUEST, payload: data };
        const generator = cloneableGenerator(sagas.registration)(action);
        let clone = null;
        it('must call api.registrations.registration', () => {
            const actualValue = generator.next().value;
            clone = generator.clone();
            expect(actualValue).toEqual(call(api.registrations.registration, data));
        });
        it('must call registrationSuccess if request to API return success', () => {
            const actualValue = generator.next({data: user.info, headers}).value;
            expect(actualValue).toEqual(put(registrationSuccess()));
        });
        it('must call updateHeadersClient if request to API return success', () => {
            const actualValue = generator.next().value;
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
        it('must call registrationError if request to API return error', () => {
            const actualValue = clone.next({error: 'Error'}).value;
            expect(actualValue).toEqual(put(registrationError()));
        });
    });
});
