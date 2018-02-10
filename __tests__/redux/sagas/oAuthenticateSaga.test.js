import * as constansActions from 'redux/constansActions';
import * as sagas from 'redux/sagas/oAuthenticateSaga';
import { call, put, takeEvery } from 'redux-saga/effects';
import { signInSuccess, signInError } from 'redux/actions/entities/authenticateActions';
import api from 'configApi/apiAuth';
import { cloneableGenerator } from 'redux-saga/utils';
import { delay } from 'redux-saga';
import { headers } from 'data/headersData';
import { openPopupOAuthSignIn } from 'redux/utils/popup';
import { replace } from 'react-router-redux';
import { updateHeadersClient } from 'redux/sagas/headersSaga';
import { user } from 'data/userData';
import { validateTokenRequest } from 'redux/actions/entities/oAuthenticateActions';

describe('oAuthenticateSaga', () => {
    describe('watcher test', () => {
        it('watchOAuthSignIn test', () => {
            const generator = sagas.watchOAuthSignIn();
            const expectedValue = takeEvery(constansActions.OAUTHENTICATE_REQUEST, sagas.oAuthSignIn);
            const actualValue = generator.next().value;
            expect(actualValue).toEqual(expectedValue);
        });
        it('watchValidateToken test', () => {
            const generator = sagas.watchValidateToken();
            const expectedValue = takeEvery(constansActions.VALIDATE_TOKEN_REQUEST, sagas.validateToken);
            const actualValue = generator.next().value;
            expect(actualValue).toEqual(expectedValue);
        });
    });
    describe('oAuthSignIn Saga test', () => {
        global.open = () => {
            return {
                location: {
                    search: ''
                },
                close: () => {}
            };
        };
        const action = { type: constansActions.OAUTHENTICATE_REQUEST, payload: 'facebook' };
        const generator = sagas.oAuthSignIn(action);
        const popup = openPopupOAuthSignIn('facebook');
        it('must call listenForCredentials', () => {
            const actualValue = generator.next().value;
            expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(call(sagas.listenForCredentials, popup, 'facebook')));
        });
    });
    describe('listenForCredentials Saga test', () => {
        describe('if location search empty', () => {
            const popup = {
                location: {
                    search: ''
                },
                closed: false,
                close: jest.fn()
            };
            const generator = sagas.listenForCredentials(popup, 'facebook');
            it('must call delay with 20 ms', () => {
                const actualValue = generator.next().value;
                expect(actualValue).toEqual(call(delay, 20));
            });
            it('must call listenForCredentials again', () => {
                const actualValue = generator.next().value;
                expect(actualValue).toEqual(call(sagas.listenForCredentials, popup, 'facebook'));
            });
        });
        describe('if location search valid', () => {
            const popup = {
                location: {
                    search: `?auth_token=${headers['access-token']}&blank=true&client_id=${headers['client']}&config=&expiry=100000&uid=${headers['uid']}`
                },
                closed: false,
                close: jest.fn()
            };
            const generator = sagas.listenForCredentials(popup, 'facebook');
            it('must call validateTokenRequest if popup location exist and valid headers', () => {
                const actualValue = generator.next().value;
                expect(actualValue).toEqual(put(validateTokenRequest(headers)));
            });
            it('must call popup close if popup location exist and valid headers', () => {
                generator.next();
                expect(popup.close).toHaveBeenCalledTimes(1);
            });
        });
        describe('if close popup', () => {
            const popup = {
                location: {
                    search: ''
                },
                closed: true,
                close: jest.fn()
            };
            const generator = sagas.listenForCredentials(popup, 'facebook');
            it('must call signInError if popup close', () => {
                const actualValue = generator.next().value;
                expect(actualValue).toEqual(put(signInError()));
            });
        });
    });
    describe('validateToken Saga test', () => {
        const action = { type: constansActions.VALIDATE_TOKEN_REQUEST, payload: headers };
        const generator = cloneableGenerator(sagas.validateToken)(action);
        let clone = null;
        it('must call api.authentications.validateToken', () => {
            const actualValue = generator.next().value;
            clone = generator.clone();
            expect(actualValue).toEqual(call(api.authentications.validateToken, headers));
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
    describe('getAllParams test', () => {
        it('should not return params if location null', () => {
            const params = sagas.getAllParams(null);
            expect(params).toEqual(null);
        });
        it('should not return params if location empty', () => {
            const location = {search: ''};
            const params = sagas.getAllParams(location);
            expect(params).toEqual(null);
        });
        it('should return params if if search include params and question mark', () => {
            const location = {
                search: `?auth_token=${headers['access-token']}&blank=true&client_id=${headers['client']}&config=&expiry=100000&uid=${headers['uid']}`
            };
            const expectedValue = {
                'auth_token': headers['access-token'],
                'blank': 'true',
                'client_id': headers['client'],
                'config': '',
                'expiry': '100000',
                'uid': headers['uid']
            };
            const params = sagas.getAllParams(location);
            expect(params).toEqual(expectedValue);
        });
        it('should return params if search include params and not question markk', () => {
            const location = {
                search: `auth_token=${headers['access-token']}&blank=true&client_id=${headers['client']}&config=&expiry=100000&uid=${headers['uid']}`
            };
            const expectedValue = {
                'auth_token': headers['access-token'],
                'blank': 'true',
                'client_id': headers['client'],
                'config': '',
                'expiry': '100000',
                'uid': headers['uid']
            };
            const params = sagas.getAllParams(location);
            expect(params).toEqual(expectedValue);
        });
    });
});
